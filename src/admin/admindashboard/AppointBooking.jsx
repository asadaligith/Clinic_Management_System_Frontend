import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layouts/AdminLayout'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'


const AppointBooking = () => {
    const [getappointment, setGetappointment] = useState([])
    const [loading, setLoading] = useState(true)

    const fethAppointment = async ()=>{
        try {
            const response = await axiosInstance.get(API_PATHS.APPOINTMENTS.GET_ALL)
            console.log("FETCHED APPOINTMENTS RESPONSE:", response);
            setGetappointment(response.data || []);
        } catch (error) {
            console.error("Error Fething Appointment ")
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fethAppointment()
    },[])

     if (loading) {
    return (
      <AdminLayout activeMenue="appointbooking">
        <p className="text-center text-gray-500">Loading appointments...</p>
      </AdminLayout>
    );
  }

  if (getappointment.length === 0) {
    return (
      <AdminLayout activeMenue="appointbooking">
        <p className="text-center text-gray-500">No appointments found.</p>
      </AdminLayout>
    );
  }


  return (
    <AdminLayout activeMenue="appointbooking">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        All Appointments
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
            {getappointment.map((appt, i) => (
            <tr key={appt._id} className="border-t hover:bg-blue-50 transition">
              <td className="p-3">{i + 1}</td>
              <td className="p-3">{appt.patientName}</td>
              <td className="p-3">{appt.doctor?.name || "N/A"}</td>
              <td className="p-3">{appt.doctor?.date || "—"}</td>
              <td className="p-3 text-green-600 font-medium">
                {appt.status || "Booked"}
              </td>
              
            </tr>
          ))} 
          </tbody>
        </table>
      </div>
        
    </AdminLayout>
  )
}

export default AppointBooking