import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { userContext } from "../../context/userContext";
import { Loader2 } from "lucide-react";
import DrPanelLayout from "../../components/DrPanelLayout";
import { API_PATHS } from "../../utils/apiPath";

const DoctorDashboard = () => {
  const { user } = useContext(userContext); // logged-in doctor info
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async (doctorId) => {
    try {
      console.log("Fetching appointments for doctor ID:", doctorId);
      const response = await axiosInstance.get(
        `${API_PATHS.DOCTORS.GET_APPOINTMENTS}/${doctorId}`
      );
      console.log("Appointments response:", response.data);
      setAppointments(response.data.data || []);
    } catch (err) {
      console.error("Error fetching doctor appointments:", err.response || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fallback to _id if id missing
    const doctorId = user?.id || user?._id;
    if (doctorId) {
      fetchAppointments(doctorId);
    } else {
      console.error("Logged-in doctor id is missing", user);
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <DrPanelLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      </DrPanelLayout>
    );
  }

  return (
    <DrPanelLayout activeMenue="drdashboard">
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
                <span className={`px-3 py-1 rounded-full text-sm ${
                  appt.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : appt.status === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {appt.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </DrPanelLayout>
  );
};

export default DoctorDashboard;
