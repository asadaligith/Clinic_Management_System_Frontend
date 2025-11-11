import React from "react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar (always visible on admin pages) */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* Mobile sidebar */}
      <div className="md:hidden">
        <AdminSidebar />
      </div>

      {/* Main content area */}
      <main className="flex-1 w-full md:ml-5">
        <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
