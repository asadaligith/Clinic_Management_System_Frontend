import React, { useEffect, useState } from 'react'
import Dashboardlayout from '../components/layouts/Dashboardlayout'
import drpic from '../assets/images/drpic.png';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPath';
import { Loader2 } from "lucide-react";
import PatientForm from './patientForm';



const PatientBooking = () => {
    
    const {id} = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDoctordata = async () =>{
        try{
            const response = await axiosInstance.get(`${API_PATHS.DOCTORS.GET_BY_ID}/${id}`);
            console.log("FETCHED DOCTOR RESPONSE:", response);
            console.log("API Response:", response);
            setDoctor(response.data || []);
        } catch(error){
            console.error("Error fetching doctor data:", error);
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(() => {
       if (id) fetchDoctordata();
      }, [id]);

      if (loading) {
    return (
      <Dashboardlayout activeMenue="doctors">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
        </div>
      </Dashboardlayout>
    );
  }




  return (
    <Dashboardlayout activeMenue="booking">
       
    
       <div className="flex flex-col md:flex-row items-center md:items-start bg-white  rounded-2xl shadow-lg p-6 md:p-10 gap-6">

        <div className="shrink-0">
        <img src={drpic} alt="Picture"
            className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-blue-500"/>
       </div>

       <div className="flex-1 space-y-2 text-center md:text-left">
        <h2 className="text-xl font-bold">Dr {doctor?.name || "Loading..."}</h2>
        <p className="text-gray-600">{doctor?.specialization}</p>
        <p className="text-sm text-gray-500 mt-1">Experience: {doctor?.experience} Years</p>
        <p className="text-sm text-gray-500 mt-1">
          Timing: {doctor.timing || "Not Set"} | Days: {doctor?.days || "Not Set"} | Date: {doctor.date ? new Date(doctor.date).toLocaleDateString() : "Not Set"}
        </p>
        doctor details
       </div>

       </div>

        <PatientForm/>

    </Dashboardlayout>
  )
}

export default PatientBooking
