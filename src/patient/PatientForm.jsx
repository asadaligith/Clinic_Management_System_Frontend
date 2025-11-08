import React, { useState } from 'react'
import { API_PATHS } from '../utils/apiPath';
import axiosInstance from '../utils/axiosInstance';
import toast from "react-hot-toast";

const PatientForm = ({doctorId}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    cnic: "",
    phone: "",
    day: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const payload = {
            patientName: formData.patientName,
            email: formData.email,
            phone: formData.phone,
            cnic: formData.cnic,
            doctor: doctorId,
            date: formData.date
        };
        const response = await axiosInstance.post(API_PATHS.APPOINTMENTS.BOOK_APPOINTMENT, payload);
        console.log("Appointment booked successfully:", response.data);
        setFormData({ patientName:"", email:"", phone:"", cnic:"", day:"", date:"" });
        alert(`Appointment booked on ${formData.date} for ${formData.patientName}`);
    } catch(error) {
        console.error("Error booking appointment:", error);
    } finally {
        setLoading(false);
    }

  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-linear-to-br from-blue-100 via-white to-blue-50  shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
        Book Your Appointment
      </h2>
      <form onSubmit={handleBooking} >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="patientName"
            placeholder="Enter your full name"
            value={formData.patientName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* CNIC */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">CNIC</label>
          <input
            type="text"
            name="cnic"
            placeholder="Enter your CNIC"
            value={formData.cnic}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Select Day */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Select Day</label>
          <select
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Choose Day</option>
            <option value="Monday">Monday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Friday">Friday</option>
          </select>
        </div>

        {/* Select Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Select Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <button type="submit"
        disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition"
        >
          {loading ? "Booking..." : "Confirm Appointment"}
        </button>
      </div>
      </form>
    </div>
  )
}

export default PatientForm;
