import React, { useState, useContext } from "react";
import {
  FaBars,
  FaTimes,
  FaCalendarCheck,
  FaHistory,
  FaSignOutAlt,
  FaUserMd,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext"; // adjust path if needed

const DrPanelSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // get logged-in doctor info + logout function
  const { user, logout } = useContext(userContext);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/login"); // redirect to login after logout
  };

  const menuItems = [
    { name: "Appointments", icon: <FaCalendarCheck />, path: "/doctor/appointments" },
    { name: "Patient History", icon: <FaHistory />, path: "/doctor/patient-history" },
  ];

  return (
    <div className="flex">
      {/* Hamburger Button (for Mobile) */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-linear-to-b from-blue-700 to-blue-500 text-white p-5 transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Doctor Info */}
        <div className="flex items-center gap-3 mb-10 border-b border-blue-300 pb-4">
          <div className="bg-white text-blue-600 p-3 rounded-full shadow-md">
            <FaUserMd size={24} />
         </div>
          <div>
            <h2 className="text-xl font-semibold">
              {user?.fullname || user?.fullName || user?.name || "Dr. Unknown"}
            </h2>
            <p className="text-sm text-blue-200 capitalize">
              {user?.role || "Doctor"}
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg text-lg font-medium transition-all duration-200 hover:bg-blue-400 ${
                  location.pathname === item.path ? "bg-blue-400 shadow-lg" : ""
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}

          {/* Logout Button */}
          <li className="pt-10 mt-10 border-t border-blue-300">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-lg text-lg font-medium bg-red-500 hover:bg-red-600 transition-all duration-200 w-full"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default DrPanelSidebar;
