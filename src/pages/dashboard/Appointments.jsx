import React, { useState, useEffect, useContext } from "react";
import Dashboardlayout from "../../components/layouts/Dashboardlayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import toast from "react-hot-toast";
import { userContext } from "../../context/userContext";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(userContext);

  // ✅ Fetch Appointments for logged-in user
  const fetchAppointments = async () => {
    if (!user) return; // safety check

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.APPOINTMENTS.GET_BY_ID}` // backend route: /api/appointments/get-appointment
      );
      // backend returns { success: true, data: [...] }
      setAppointments(response.data.data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to fetch appointments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel Appointment
  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      await axiosInstance.delete(`${API_PATHS.APPOINTMENTS.CANCEL}/${id}`);
      toast.success("Appointment cancelled successfully!");
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment. Please try again.");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]); // fetch again if user changes (login/logout)

  if (loading) {
    return (
      <Dashboardlayout activeMenue="appointments">
        <p className="text-center text-gray-500">Loading appointments...</p>
      </Dashboardlayout>
    );
  }

  if (appointments.length === 0) {
    return (
      <Dashboardlayout activeMenue="appointments">
        <p className="text-center text-gray-500">No appointments found.</p>
      </Dashboardlayout>
    );
  }

  return (
    <Dashboardlayout activeMenue="appointments">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Your Appointments
      </h1>

      <div className="overflow-x-auto shadow-md rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full border-collapse text-sm text-left">
          <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Patient Name</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, i) => (
              <tr key={appt._id} className="border-t hover:bg-blue-50 transition">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{appt.patientName}</td>
                <td className="p-3">{appt.doctor?.name || "N/A"}</td>
                <td className="p-3">{appt.appointmentDate || "—"}</td>
                <td className={`p-3 font-medium ${appt.status === "cancelled" ? "text-red-600" : "text-green-600"}`}>
                  {appt.status || "Booked"}
                </td>
                <td className="p-3 text-center">
                  {appt.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancel(appt._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-sm transition"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Dashboardlayout>
  );
};

export default Appointments;
