import React, { useEffect, useState, useContext } from "react";
import DrPanelLayout from "../../components/DrPanelLayout";
import axiosInstance from "../../utils/axiosInstance";
import { userContext } from "../../context/userContext";
import { API_PATHS } from "../../utils/apiPath";
import { Loader2 } from "lucide-react";

const PatientHistory = () => {
  const { user } = useContext(userContext);
  const doctorId = user?.id || user?._id;
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    if (!doctorId) return setLoading(false);
    try {
      setLoading(true);
      // Assuming same endpoint returns all appointments and we filter completed/prescribed ones
      const res = await axiosInstance.get(`${API_PATHS.DOCTORS.GET_APPOINTMENTS}/${doctorId}`);
      const data = res.data.data || [];
      // keep completed or with prescription
      const filtered = data.filter(a => a.status === "completed" || a.prescription);
      setHistory(filtered.sort((a,b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)));
    } catch (err) {
      console.error("Fetch history error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line
  }, [doctorId]);

  return (
    <DrPanelLayout>
      <h1 className="text-2xl font-semibold mb-6">Patient History</h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      ) : history.length === 0 ? (
        <p className="text-gray-500">No patient history yet.</p>
      ) : (
        <div className="space-y-4">
          {history.map((h) => (
            <div key={h._id} className="bg-white p-4 rounded-2xl shadow">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-semibold">{h.patientName}</p>
                  <p className="text-sm text-gray-500">{h.patientEmail} • {h.patientPhone}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(h.appointmentDate).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-sm text-gray-600">{h.status}</span>
                </div>
              </div>

              <div className="mt-3 border-t pt-3">
                <h4 className="font-medium">Prescription</h4>
                {h.prescription ? (
                  <div className="text-sm text-gray-700">
                    <p><strong>Diagnosis: </strong>{h.prescription.diagnosis || "-"}</p>
                    <p><strong>Medicines: </strong>{h.prescription.medicines || "-"}</p>
                    <p><strong>Notes: </strong>{h.prescription.notes || "-"}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No prescription recorded for this appointment.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </DrPanelLayout>
  );
};

export default PatientHistory;
