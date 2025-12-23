import { useEffect, useState } from "react";
import { Pencil, Search, Trash2, Users } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext.jsx";
import Pagination from "../../components/ui/Pagination.jsx";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token, user } = useAppContext();

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/students");
      if (data.success) {
        setStudents(data.students);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    if (!confirm("Delete this student?")) return;

    try {
      const { data } = await axios.delete(
        `/api/v1/admin/students/${id}`
      );
      if (data.success) {
        toast.success("Student deleted");
        setStudents((prev) =>
          prev.filter((s) => s._id !== id)
        );
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    if (token && user?.role === "admin") {
      fetchStudents();
    }
  }, [token, user]);

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.email} ${student.course}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(
    filteredStudents.length / studentsPerPage
  );

  const startIndex = (currentPage - 1) * studentsPerPage;

  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  return (
    <div className="space-y-6 text-white px-4 sm:px-6 md:px-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide uppercase text-indigo-400">
            Students
          </h1>
          <p className="text-sm sm:text-lg text-white mt-1">
            View and manage all registered students
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white z-10 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl bg-white/10 backdrop-blur-xl border-2 border-indigo-400 pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-400/40"
          />
        </div>
      </div>

      <div className="rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-indigo-400 shadow-lg overflow-hidden">
        <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-indigo-400/40">
          <Users className="text-indigo-400" />
          <h2 className="text-base sm:text-lg font-semibold">
            Student List
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5 text-gray-300">
              <tr>
                <th className="px-4 sm:px-6 py-4 text-left font-medium">
                  Name
                </th>
                <th className="px-4 sm:px-6 py-4 text-left font-medium">
                  Email
                </th>
                <th className="px-4 sm:px-6 py-4 text-left font-medium">
                  Course
                </th>
                <th className="px-4 sm:px-6 py-4 text-left font-medium">
                  Enrolled
                </th>
                <th className="px-4 sm:px-6 py-4 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    Loading students...
                  </td>
                </tr>
              ) : paginatedStudents.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    No matching students found
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student) => (
                  <tr
                    key={student._id}
                    className="hover:bg-white/5 transition"
                  >
                    <td className="px-4 sm:px-6 py-4">
                      {student.name}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      {student.email}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      {student.course}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      {new Date(
                        student.enrollmentDate
                      ).toLocaleDateString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <button
                          onClick={() =>
                            navigate(
                              `/admin/students/edit/${student._id}`
                            )
                          }
                          className="text-indigo-400 hover:text-indigo-300 transition"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() =>
                            deleteStudent(student._id)
                          }
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Students;
