import React, { useEffect, useState } from "react";
import Dashboardlayout from "../../components/layouts/Dashboardlayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { Loader2 } from "lucide-react";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.getDoctors);
      setDoctors(response.data.doctors || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <Dashboardlayout activeMenue="doctors">
      <h1 className="text-2xl font-semibold mb-6">Available Doctors</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
        </div>
      ) : doctors.length === 0 ? (
        <p className="text-center text-gray-500">No doctors available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              {doc.image && (
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              <h2 className="text-lg font-semibold text-gray-800 text-center">
                {doc.name}
              </h2>
              <p className="text-gray-600 text-center">{doc.specialization}</p>
              <p className="text-sm text-gray-500 text-center mt-2">
                Experience: {doc.experience}
              </p>
              <div className="text-center">
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Dashboardlayout>
  );
};

export default Doctors;
