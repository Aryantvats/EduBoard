import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext.jsx";
import Input from "../../components/ui/Input.jsx";

const EditStudentProfile = () => {
  const { student, setStudent } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    course: "",
    phone: "",
    batch: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        course: student.course || "",
        phone: student.phone || "",
        batch: student.batch || "",
        notes: student.notes || "",
      });
    }
  }, [student]);

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
      const { data } = await axios.put("/api/v1/student/update", formData);

      if (data.success) {
        toast.success("Profile updated successfully");

        setStudent((prev) => ({
          ...prev,
          ...formData,
        }));

        navigate("/student/profile");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-white max-w-3xl mx-auto px-4 sm:px-6 md:px-0">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-indigo-400 uppercase">
          Edit Profile
        </h1>
        <p className="text-sm sm:text-lg text-white mt-1">
          Update your personal information
        </p>
      </div>

      <div className="rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-indigo-400 shadow-lg p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <Input
            label="Batch"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
          />

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              className="w-full rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-400/40"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-2.5 text-sm font-semibold hover:bg-indigo-600 transition disabled:opacity-70"
            >
              <Save size={18} />
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/student/profile")}
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

export default EditStudentProfile;
