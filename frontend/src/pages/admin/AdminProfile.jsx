import { User, Mail, Shield } from "lucide-react";
import { useAppContext } from "../../context/AppContext.jsx";

const AdminProfile = () => {
  const { user } = useAppContext();

  return (
    <div className="space-y-6 text-white max-w-2xl mx-auto px-4 sm:px-6 md:px-0">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-indigo-400 uppercase">
          Admin Profile
        </h1>
        <p className="text-sm sm:text-md text-white mt-1">
          View your account details
        </p>
      </div>

      <div className="rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-indigo-400 shadow-lg p-4 sm:p-6">
        <div className="flex items-center gap-4 mb-5 sm:mb-6">
          <div className="rounded-2xl bg-indigo-500/20 p-3 sm:p-4">
            <User className="text-indigo-400" size={28} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold">
              Administrator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Platform Admin Account
            </p>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3 sm:p-4 border border-white/10">
            <Mail className="text-indigo-400" />
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm font-medium">
                {user?.email || "--"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3 sm:p-4 border border-white/10">
            <Shield className="text-indigo-400" />
            <div>
              <p className="text-xs text-gray-400">Role</p>
              <p className="text-sm font-medium capitalize">
                {user?.role || "admin"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs sm:text-sm text-gray-400">
        Admin profile details are read-only.
      </div>
    </div>
  );
};

export default AdminProfile;
