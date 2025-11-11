import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";

const AvailablePatient = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.PATIENTS.GET_ALL);
      setPatients(res.data.data || []);
    } catch (err) {
      console.error("Error fetching patients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <AdminLayout activeMenue="available-patient">
      <h1 className="text-2xl font-semibold mb-6">Registered Patients</h1>
      {loading ? (
        <p>Loading...</p>
      ) : patients.length === 0 ? (
        <p className="text-gray-500">No patients found.</p>
      ) : (
        <div className="bg-white rounded-xl shadow p-4">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-100 text-left">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, idx) => (
                <tr key={p.email || p._id} className="border-t">
                  <td className="p-2">{idx + 1}</td>
                  <td className="p-2">{p.name || p.fullname || p.patientName}</td>
                  <td className="p-2">{p.email}</td>
                  <td className="p-2">{p.phone || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AvailablePatient;
