import React, { useState } from 'react'

const PatientForm = () => {
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

  const handleBooking = () => {
    const { patientName, email, cnic, phone, day, date } = formData;
    if (!patientName || !email || !cnic || !phone || !day || !date) {
      alert("Please fill all fields!");
      return;
    }
    console.log("Appointment data:", formData);
    alert(`Appointment booked on ${day}, ${date} for ${patientName}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-linear-to-br from-blue-100 via-white to-blue-50  shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
        Book Your Appointment
      </h2>

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
        <button
          onClick={handleBooking}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition"
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  )
}

export default PatientForm;
