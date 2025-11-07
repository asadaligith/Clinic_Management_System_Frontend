import React from "react";
import Dashboardlayout from "../../components/layouts/Dashboardlayout";

const historyData = [
  { date: "05 Oct 2025", doctor: "Dr. Bilal Ahmed", diagnosis: "Dental Cleaning" },
  { date: "10 Sep 2025", doctor: "Dr. Ayesha Khan", diagnosis: "Skin Allergy Treatment" },
];

const History = () => {
  return (
    <Dashboardlayout activeMenue="history">
      <h1 className="text-2xl font-semibold mb-6">Appointment History</h1>
      <div className="overflow-x-auto bg-white shadow rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Diagnosis</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item, i) => (
              <tr key={i} className="border-t hover:bg-blue-50">
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.doctor}</td>
                <td className="p-3">{item.diagnosis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Dashboardlayout>
  );
};

export default History;
