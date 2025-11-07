
import React from "react";
import { FaUserMd, FaUserInjured, FaCalendarCheck, FaClipboardList, FaPlus, FaListUl } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <a href="/add">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          + Add New Doctor
        </button>
        </a>
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

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
         <a href="/add">
             <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            <FaPlus /> Add Doctor
          </button>
         </a>
          <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
            <FaListUl /> View Appointments
          </button>
          <button className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">
            <FaUserInjured /> View Patients
          </button>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-2xl p-6 shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activities</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="border-b pb-2">🩺 Dr. Ayesha added to Dermatology Department.</li>
          <li className="border-b pb-2">👤 New patient <b>Ali Khan</b> registered.</li>
          <li className="border-b pb-2">📅 Appointment scheduled for <b>Dr. Bilal</b> at 3:00 PM.</li>
          <li>✅ Payment confirmed for <b>Patient #203</b>.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
