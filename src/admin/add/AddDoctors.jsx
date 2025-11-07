import React, { useState } from "react";
import toast from "react-hot-toast";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";

const AddDoctors = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    experience: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.post(API_PATHS.DOCTORS.ADD_DOCTOR, formData);
      toast.success("Doctor added successfully!");
      console.log(response.data);
      setFormData({
        name: "",
        email: "",
        specialization: "",
        experience: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error adding doctor:", error);
      toast.error(error.response?.data?.message || "Failed to add doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add New Doctor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Doctor Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter doctor name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Specialization
            </label>
            <input
              type="text"
              name="specialization"
              placeholder="e.g. Cardiologist, Dentist"
              value={formData.specialization}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Experience (in years)
            </label>
            <input
              type="number"
              name="experience"
              placeholder="Enter experience"
              value={formData.experience}
              onChange={handleChange}
              required
              min="0"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Contact Number
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
          >
            {loading ? "Adding Doctor..." : "Add Doctor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctors;
