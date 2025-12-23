import {
  User,
  Lock,
  UserPenIcon,
} from "lucide-react";

export const studentPages = [
  
  {
    label: "My Profile",
    path: "/student/profile",
    icon: User,
  },{
    label: "Edit Profile",
    path: "/student/edit-profile",
    icon: UserPenIcon,
  },
  {
    label: "Change Password",
    path: "/student/change-password",
    icon: Lock,
  },
];
