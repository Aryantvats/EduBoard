import { useState } from "react";
import { UserPlus } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    enrollmentDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "/api/v1/admin/students",
        formData
      );

      if (data.success) {
        toast.success("Student added successfully");
        navigate("/admin/students");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add student"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-white max-w-2xl mx-auto px-4 sm:px-6 md:px-0 py-6 sm:py-8">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-indigo-400 uppercase">
          Add Student
        </h1>
        <p className="text-sm sm:text-md text-white mt-1">
          Create a new student record
        </p>
      </div>

      <div className="rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-indigo-400 shadow-lg p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <div className="rounded-xl bg-indigo-500/20 p-3">
            <UserPlus className="text-indigo-400" />
          </div>
          <h2 className="text-base sm:text-lg font-semibold">
            Student Details
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-400/40"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="student@example.com"
              className="w-full rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-400/40"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Course
            </label>
            <input
              type="text"
              name="course"
              required
              value={formData.course}
              onChange={handleChange}
              placeholder="MERN Bootcamp"
              className="w-full rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2.5 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-400/40"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Enrollment Date
            </label>
            <input
              type="date"
              name="enrollmentDate"
              required
              value={formData.enrollmentDate}
              onChange={handleChange}
              className="w-full rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-400/40"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center rounded-xl bg-indigo-500 px-6 py-2.5 text-sm font-semibold hover:bg-indigo-600 transition disabled:opacity-70"
            >
              {loading ? "Saving..." : "Add Student"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/students")}
              className="rounded-xl border border-indigo-400 px-6 py-2.5 text-indigo-300 text-sm font-semibold hover:bg-indigo-500/10 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
