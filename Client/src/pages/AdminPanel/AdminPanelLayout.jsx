import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";

const AdminPanelLayout = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSideBar />

      <main className="flex-1 bg-gray-50 dark:bg-gray-900 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanelLayout;
