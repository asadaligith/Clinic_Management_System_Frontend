import React, { useEffect, useState, useContext } from "react";
import DrPanelLayout from "../../components/DrPanelLayout";
import axiosInstance from "../../utils/axiosInstance";
import { userContext } from "../../context/userContext";
import { API_PATHS } from "../../utils/apiPath";
import { Loader2 } from "lucide-react";

const DoctorAppointments = () => {
  const { user } = useContext(userContext);
  const doctorId = user?.id || user?._id;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null); // appointment selected for details/prescription
  const [prescription, setPrescription] = useState({ diagnosis: "", medicines: "", notes: "" });
  const [saving, setSaving] = useState(false);

  const fetchAppointments = async () => {
    if (!doctorId) return setLoading(false);
    try {
      setLoading(true);
      const res = await axiosInstance.get(`${API_PATHS.DOCTORS.GET_APPOINTMENTS}/${doctorId}`);
      setAppointments(res.data.data || []);
    } catch (error) {
      console.error("Fetch appointments error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, [doctorId]);

  const filtered = appointments.filter((a) => {
    if (filter === "all") return true;
    return a.status === filter;
  }).filter((a) => {
    const q = search.toLowerCase();
    return (
      a.patientName?.toLowerCase().includes(q) ||
      a.patientEmail?.toLowerCase().includes(q) ||
      (a.patientPhone || "").toLowerCase().includes(q)
    );
  });

  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.put(`/api/appointments/${id}/status`, { status });
      fetchAppointments();
    } catch (err) {
      console.error("Update status error:", err);
    }
  };

  const openPrescription = (appt) => {
    setSelected(appt);
    setPrescription({
      diagnosis: appt.prescription?.diagnosis || "",
      medicines: appt.prescription?.medicines || "",
      notes: appt.prescription?.notes || ""
    });
  };

  const savePrescription = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      // 1) save prescription
      await axiosInstance.post(`/api/appointments/${selected._id}/prescription`, prescription);

      // 2) mark as completed (optional)
      await axiosInstance.put(`/api/appointments/${selected._id}/status`, { status: "completed" });

      setSelected(null);
      setPrescription({ diagnosis: "", medicines: "", notes: "" });
      fetchAppointments();
    } catch (err) {
      console.error("Save prescription error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DrPanelLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patient, email or phone"
            className="px-3 py-2 rounded-md border"
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 rounded-md border">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-4 shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Patient</th>
                  <th className="py-2">When</th>
                  <th className="py-2">Contact</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a._id} className="border-b hover:bg-gray-50">
                    <td className="py-3">
                      <div className="font-medium">{a.patientName}</div>
                      <div className="text-sm text-gray-500">{a.patientEmail}</div>
                    </td>
                    <td className="py-3">
                      <div>{new Date(a.appointmentDate).toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{a.appointmentTime || "-"}</div>
                    </td>
                    <td className="py-3">{a.patientPhone || "-"}</td>
                    <td className="py-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        a.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        a.status === "confirmed" ? "bg-green-100 text-green-800" :
                        a.status === "completed" ? "bg-gray-100 text-gray-800" :
                        "bg-red-100 text-red-800"
                      }`}>{a.status}</span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        {a.status !== "confirmed" && (
                          <button
                            onClick={() => updateStatus(a._id, "confirmed")}
                            className="px-3 py-1 rounded bg-green-600 text-white text-sm"
                          >
                            Confirm
                          </button>
                        )}
                        {a.status !== "completed" && (
                          <button
                            onClick={() => updateStatus(a._id, "completed")}
                            className="px-3 py-1 rounded bg-indigo-600 text-white text-sm"
                          >
                            Mark Complete
                          </button>
                        )}
                        <button
                          onClick={() => updateStatus(a._id, "cancelled")}
                          className="px-3 py-1 rounded bg-red-600 text-white text-sm"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={() => openPrescription(a)}
                          className="px-3 py-1 rounded border text-sm"
                        >
                          Prescription
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-500">
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Prescription modal / panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Prescription for {selected.patientName}</h3>
              <button onClick={() => setSelected(null)} className="text-gray-600">Close</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Diagnosis</label>
                <input
                  value={prescription.diagnosis}
                  onChange={(e) => setPrescription(prev => ({ ...prev, diagnosis: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Medicines / Instructions</label>
                <textarea
                  value={prescription.medicines}
                  onChange={(e) => setPrescription(prev => ({ ...prev, medicines: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Notes</label>
                <textarea
                  value={prescription.notes}
                  onChange={(e) => setPrescription(prev => ({ ...prev, notes: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => setSelected(null)} className="px-4 py-2 rounded border">
                Cancel
              </button>
              <button
                onClick={savePrescription}
                disabled={saving}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                {saving ? "Saving..." : "Save & Complete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </DrPanelLayout>
  );
};

export default DoctorAppointments;
