import { useState } from "react";
import { Save } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Input from "../components/ui/Input.jsx";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);

    try {
      const { data } = await axios.put(
        "/api/v1/auth/change-password",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }
      );

      if (data.success) {
        toast.success("Password changed successfully");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-white max-w-xl mx-auto px-4 sm:px-6 md:px-0 ">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-indigo-400 uppercase">
          Change Password
        </h1>
        <p className="text-sm sm:text-lg text-white mt-1">
          Update your account password
        </p>
      </div>

      <div className="rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-indigo-400 shadow-lg p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Current Password"
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
          />

          <Input
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />

          <Input
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-2.5 text-sm font-semibold hover:bg-indigo-600 transition disabled:opacity-70"
          >
            <Save size={18} />
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
