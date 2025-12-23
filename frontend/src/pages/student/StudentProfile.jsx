import {
  User,
  Mail,
  BookOpen,
  Calendar,
  Phone,
  Layers,
  StickyNote,
  CheckCircle,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext.jsx";

const StudentProfile = () => {
  const { user, student } = useAppContext();

  return (
    <div className="space-y-6 text-white max-w-3xl mx-auto px-4 sm:px-6 md:px-0">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-indigo-400 uppercase">
          My Profile
        </h1>
        <p className="text-sm sm:text-lg text-white mt-1">
          View your student profile details
        </p>
      </div>

      <div className="rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-indigo-400 shadow-lg p-4 sm:p-6">
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <div className="rounded-2xl bg-indigo-500/20 p-3 sm:p-4">
            <User className="text-indigo-400" size={28} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">
              {student?.name || "--"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 capitalize">
              {user?.role}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <InfoItem
            icon={Mail}
            label="Email"
            value={student?.email || user?.email}
          />
          <InfoItem
            icon={BookOpen}
            label="Course"
            value={student?.course}
          />
          <InfoItem
            icon={Calendar}
            label="Enrollment Date"
            value={
              student?.enrollmentDate
                ? new Date(student.enrollmentDate).toLocaleDateString()
                : "--"
            }
          />
          <InfoItem
            icon={CheckCircle}
            label="Status"
            value={student?.status}
          />
          <InfoItem
            icon={Phone}
            label="Phone"
            value={student?.phone || "--"}
          />
          <InfoItem
            icon={Layers}
            label="Batch"
            value={student?.batch || "--"}
          />
        </div>

        <div className="mt-5 sm:mt-6">
          <div className="flex items-center gap-2 mb-2 text-gray-300">
            <StickyNote size={16} />
            <span className="text-sm font-medium">Notes</span>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-gray-300">
            {student?.notes || "No notes added"}
          </div>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-gray-400">
        This profile is read-only. Editing is available on a separate page.
      </p>
    </div>
  );
};

export default StudentProfile;

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-3 sm:p-4">
    <Icon className="text-indigo-400 mt-1" size={18} />
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-white">
        {value || "--"}
      </p>
    </div>
  </div>
);
