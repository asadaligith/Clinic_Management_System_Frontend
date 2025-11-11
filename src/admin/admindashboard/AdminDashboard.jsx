import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserMd,
  FaUserInjured,
  FaCalendarCheck,
  FaClipboardList,
  FaListUl,
} from "react-icons/fa";
import AdminLayout from "../../components/layouts/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <Link
          to="/add-doctors"
          className="self-stretch md:self-auto bg-blue-600 text-white px-4 md:px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm flex items-center justify-center"
        >
          + Add New Doctor
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex items-center gap-4">
          <FaUserMd className="text-blue-600 text-3xl" />
          <div>
            <h3 className="text-gray-500">Total Doctors</h3>
            <p className="text-2xl font-semibold text-gray-800">12</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex items-center gap-4">
          <FaUserInjured className="text-green-600 text-3xl" />
          <div>
            <h3 className="text-gray-500">Total Patients</h3>
            <p className="text-2xl font-semibold text-gray-800">45</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex items-center gap-4">
          <FaCalendarCheck className="text-purple-600 text-3xl" />
          <div>
            <h3 className="text-gray-500">Appointments</h3>
            <p className="text-2xl font-semibold text-gray-800">22</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex items-center gap-4">
          <FaClipboardList className="text-red-600 text-3xl" />
          <div>
            <h3 className="text-gray-500">Pending</h3>
            <p className="text-2xl font-semibold text-gray-800">5</p>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white rounded-2xl p-6 shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/doctors-list"
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition shadow-sm"
          >
            <FaListUl /> View Doctors
          </Link>

          <Link
            to="/appointbooking"
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition shadow-sm"
          >
            <FaListUl /> View Appointments
          </Link>

          <Link
            to="/available-patient"
            className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition shadow-sm"
          >
            <FaUserInjured /> View Patients
          </Link>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white rounded-2xl p-6 shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Recent Activities
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li className="border-b pb-2">
            🩺 Dr. Ayesha added to Dermatology Department.
          </li>
          <li className="border-b pb-2">
            👤 New patient <b>Ali Khan</b> registered.
          </li>
          <li className="border-b pb-2">
            📅 Appointment scheduled for <b>Dr. Bilal</b> at 3:00 PM.
          </li>
          <li>✅ Payment confirmed for <b>Patient #203</b>.</li>
        </ul>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
