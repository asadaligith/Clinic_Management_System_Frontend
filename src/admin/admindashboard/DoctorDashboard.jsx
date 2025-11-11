import React, { useEffect, useState, useContext } from "react";
import AdminLayout from "../../components/layouts/AdminLayout"; // or DoctorLayout if separate
import axiosInstance from "../../utils/axiosInstance";

import { userContext } from "../../context/userContext";
import { Loader2 } from "lucide-react";

const DoctorDashboard = () => {
  const { user } = useContext(userContext); // logged-in doctor info
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      // call doctor endpoint
      const response = await axiosInstance.get(`/appointments/doctor/${user.id}`);
      setAppointments(response.data.data || []);
    } catch (err) {
      console.error("Error fetching doctor appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchAppointments();
  }, [user]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-6">My Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-gray-500">You have no appointments.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appt) => (
            <div key={appt._id} className="bg-white p-5 rounded-2xl shadow">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{appt.patientName}</h3>
                  <p className="text-sm text-gray-600">{appt.patientEmail}</p>
                  <p className="text-sm text-gray-600">Phone: {appt.patientPhone || "—"}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {new Date(appt.appointmentDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">{appt.appointmentTime || "—"}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm ${appt.status === "pending" ? "bg-yellow-100 text-yellow-800" : appt.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {appt.status}
                </span>

                <div className="flex gap-2">
                  {/* Accept / Confirm button example (you need confirm endpoint) */}
                  {/* <button className="px-3 py-1 bg-green-600 text-white rounded">Confirm</button> */}
                  {/* Optionally show more actions */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default DoctorDashboard;
