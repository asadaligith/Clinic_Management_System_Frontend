import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { userContext } from "../../context/userContext";
import { Loader2, CalendarDays, Users, Clock, CheckCircle } from "lucide-react";
import DrPanelLayout from "../../components/DrPanelLayout";
import { API_PATHS } from "../../utils/apiPath";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const { user } = useContext(userContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const doctorId = user?.id || user?._id;

  const fetchAppointments = async () => {
    if (!doctorId) return setLoading(false);
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `${API_PATHS.DOCTORS.GET_APPOINTMENTS}/${doctorId}`
      );
      setAppointments(res.data.data || []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, [doctorId]);

  // derived numbers
  const total = appointments.length;
  const pending = appointments.filter(a => a.status === "pending").length;
  const confirmed = appointments.filter(a => a.status === "confirmed").length;
  const completed = appointments.filter(a => a.status === "completed").length;

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
    <DrPanelLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Doctor Dashboard</h1>
        <div className="space-x-2">
          <button
            onClick={() => navigate("/doctor/appointments")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow"
          >
            View All Appointments
          </button>
          <button
            onClick={() => navigate("/doctor/patient-history")}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md"
          >
            Patient History
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow flex items-center gap-4">
          <div className="p-3 rounded-full bg-blue-50"><CalendarDays /></div>
          <div>
            <p className="text-sm text-gray-500">Total Appointments</p>
            <p className="text-xl font-semibold">{total}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow flex items-center gap-4">
          <div className="p-3 rounded-full bg-yellow-50"><Clock /></div>
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-xl font-semibold">{pending}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow flex items-center gap-4">
          <div className="p-3 rounded-full bg-green-50"><CheckCircle /></div>
          <div>
            <p className="text-sm text-gray-500">Confirmed</p>
            <p className="text-xl font-semibold">{confirmed}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow flex items-center gap-4">
          <div className="p-3 rounded-full bg-gray-50"><Users /></div>
          <div>
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-xl font-semibold">{completed}</p>
          </div>
        </div>
      </div>

      {/* Upcoming / Recent appointments */}
      <section>
        <h2 className="text-lg font-medium mb-3">Upcoming / Recent</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments
              .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
              .slice(0, 6)
              .map((appt) => (
                <div key={appt._id} className="bg-white p-4 rounded-2xl shadow flex justify-between">
                  <div>
                    <p className="font-semibold">{appt.patientName}</p>
                    <p className="text-sm text-gray-600">{appt.patientEmail}</p>
                    <p className="text-sm text-gray-600">Phone: {appt.patientPhone || "—"}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(appt.appointmentDate).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      appt.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                      appt.status === "confirmed" ? "bg-green-100 text-green-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {appt.status}
                    </span>
                    <div className="mt-4">
                      <button
                        onClick={() => navigate(`/doctor/appointments`)}
                        className="text-sm px-3 py-1 rounded bg-blue-600 text-white"
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>
    </DrPanelLayout>
  );
};

export default DoctorDashboard;
