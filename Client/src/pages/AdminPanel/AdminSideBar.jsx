import { ChartNoAxesColumn, Megaphone, ShieldCheck, Users } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
  const navItem =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200";

  const active =
    "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md";

  return (
    <aside className="hidden lg:flex flex-col w-[260px] min-h-screen border-r">
      <div className="flex flex-col h-[calc(100vh-64px)] mt-16 p-6">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Admin Panel
          </h1>
          <p className="text-sm text-gray-500">
            System administration
          </p>
        </div>

        <nav className="flex flex-col gap-3 flex-1">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `${navItem} ${isActive ? active : ""}`
            }
          >
            <ChartNoAxesColumn size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="users"
            className={({ isActive }) =>
              `${navItem} ${isActive ? active : ""}`
            }
          >
            <Users size={20} />
            User Management
          </NavLink>

          <NavLink
            to="courses"
            className={({ isActive }) =>
              `${navItem} ${isActive ? active : ""}`
            }
          >
            <ShieldCheck size={20} />
            Course Oversight
          </NavLink>

          <NavLink
            to="announcements"
            className={({ isActive }) =>
              `${navItem} ${isActive ? active : ""}`
            }
          >
            <Megaphone size={20} />
            System Announcements
          </NavLink>
        </nav>

        <div className="pt-6 border-t text-xs text-gray-400">
          © 2026 LMS
        </div>
      </div>
    </aside>
  );
};

export default AdminSideBar;
