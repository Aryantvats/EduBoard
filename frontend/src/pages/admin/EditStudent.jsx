import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    enrollmentDate: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/admin/students/${id}`
      );

      if (data.success) {
        setFormData({
          name: data.student.name,
          email: data.student.email,
          course: data.student.course,
          enrollmentDate: data.student.enrollmentDate?.slice(0, 10),
        });
      }
    } catch {
      toast.error("Failed to load student");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `/api/v1/admin/students/${id}`,
        formData
      );

      if (data.success) {
        toast.success("Student updated");
        navigate("/admin/students");
      }
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return <p className="text-white px-4">Loading...</p>;
  }

  return (
    <div className="space-y-5 text-white max-w-2xl mx-auto px-4 sm:px-6 md:px-0">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-400">
        Edit Student
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-indigo-400 p-4 sm:p-6 space-y-4"
      >
        {["name", "email", "course"].map((field) => (
          <input
            key={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field}
            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-400/40"
          />
        ))}

        <input
          type="date"
          name="enrollmentDate"
          value={formData.enrollmentDate}
          onChange={handleChange}
          className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-400/40"
        />

        <button
          className="w-full sm:w-auto bg-indigo-500 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
