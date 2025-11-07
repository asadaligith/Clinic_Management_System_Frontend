import React from "react";
import Dashboardlayout from "../../components/layouts/Dashboardlayout";

const appointments = [
  { date: "12 Nov 2025", doctor: "Dr. Ali Raza", time: "2:00 PM" },
  { date: "15 Nov 2025", doctor: "Dr. Ayesha Khan", time: "10:30 AM" },
];

const Appointments = () => {
  return (
    <Dashboardlayout activeMenue="appointments">
      <h1 className="text-2xl font-semibold mb-6">Your Appointments</h1>
      <div className="space-y-4">
        {appointments.map((appt, i) => (
          <div
            key={i}
            className="bg-linear-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <p className="font-semibold text-gray-700">
              {appt.date} — {appt.time}
            </p>
            <p className="text-gray-600">Doctor: {appt.doctor}</p>
          </div>
        ))}
      </div>
    </Dashboardlayout>
  );
};

export default Appointments;
