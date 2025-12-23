import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import { adminPages } from "../../assets/admin.js";

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar pages={adminPages} />
      <main className="flex-1 p-6 bg-[#0B0F19] min-h-screen py-20 md:py-5">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
