import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import { studentPages } from "../../assets/student.js";

const StudentLayout = () => {
  return (
    <div className="flex">
      <Sidebar pages={studentPages} />
      <main className="flex-1 p-6 bg-[#0B0F19] min-h-screen py-20 md:py-5">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
