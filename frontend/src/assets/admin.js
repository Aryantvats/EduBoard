import {
  Lock,
  Users,
  UserCircle,
  UserPlus,
} from "lucide-react";

export const adminPages = [
  {
    label: "Students",
    path: "/admin/students",
    icon: Users,
  },
  {
    label: "Add Student",
    path: "/admin/student/add",
    icon: UserPlus,
  },
  {
    label: "Profile",
    path: "/admin/profile",
    icon: UserCircle,
  },
  {
    label: "Change Password",
    path: "/admin/change-password",
    icon: Lock,
  },
];
