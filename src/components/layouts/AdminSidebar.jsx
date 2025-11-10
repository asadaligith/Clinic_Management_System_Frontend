import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserMd,
  FaUserInjured,
  FaCalendarCheck,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin" },
    { name: "Doctors", icon: <FaUserMd />, path: "/doctors-list" },
    { name: "Patients", icon: <FaUserInjured />, path: "/patients" },
    { name: "Appointments", icon: <FaCalendarCheck />, path: "/appointments-list" },
  ];

  return (
    <>
      {/* Mobile top bar (shows only on small screens) */}
      <div className="md:hidden flex items-center justify-between bg-blue-700 text-white px-4 py-3 shadow">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
        <button
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-blue-600/80 transition"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      {/* - fixed on md+ so main content can add left margin
          - slide in/out on mobile using translate-x
      */}
      <aside
        className={`bg-linear-to-b from-blue-600 to-blue-700 text-white w-64 h-full fixed md:static top-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 shadow-md`}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-8 border-b border-blue-500">
            <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
            <p className="mt-1 text-sm text-blue-100/80">Manage hospital data</p>
          </div>

          <nav className="flex-1 overflow-y-auto mt-4">
            <ul className="px-2">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <li key={item.name} className="my-1">
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg mx-2 transition group ${
                        active
                          ? "bg-white/10 text-white font-semibold shadow-inner"
                          : "text-blue-50/95 hover:bg-white/5"
                      }`}
                    >
                      <span className="text-lg opacity-95 group-hover:opacity-100">
                        {item.icon}
                      </span>
                      <span className="whitespace-nowrap">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="px-6 py-4 border-t border-blue-500">
            <button
              onClick={() => {
                // keep logic minimal: just close on mobile
                setIsOpen(false);
              }}
              className="w-full text-left text-sm px-3 py-2 rounded-md bg-white/6 hover:bg-white/10 transition"
            >
              Help & Support
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
