import { NavLink } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";

const Sidebar = ({ pages }) => {
  const { logout, user } = useAppContext();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-[#0A0E17] p-2 rounded-lg text-white border border-white/20"
      >
        <Menu size={20} />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`flex h-screen w-64 flex-col bg-[#0A0E17] text-white border border-white/20
        fixed md:sticky top-0 z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-wide text-indigo-400 ">EduBoard</h1>
            <p className="text-sm text-white mt-1">
              {user?.role?.toUpperCase()} DASHBOARD
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {pages.map((page) => (
            <NavLink
              key={page.path}
              to={page.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition
                ${
                  isActive
                    ? "bg-white text-black font-semibold"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <page.icon size={18} />
              {page.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500/90 py-2.5 text-sm font-semibold hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
