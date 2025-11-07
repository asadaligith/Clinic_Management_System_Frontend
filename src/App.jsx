import React from "react"
import { BrowserRouter as Router, Routes, Route ,Navigate } from "react-router-dom"
import UserProvider from "./context/userContext";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/dashboard/Home";
import { Toaster } from "react-hot-toast";
import About from "./pages/dashboard/About";
import Contact from "./pages/dashboard/Contact";
import Appointments from "./pages/dashboard/Appointments";
import Doctors from "./pages/dashboard/Doctors";
import History from "./pages/dashboard/History";
import AdminDashboard from './admin/admindashboard/AdminDashboard';
import DoctorDashboard from "./admin/admindashboard/DoctorDashboard";
import AddDoctors from "./admin/add/AddDoctors";


const Root =()=>{

  const isauthenticated = !!localStorage.getItem("token");
  
  return(
    isauthenticated ? (<Navigate to="/dashboard" />) : (<Navigate to="/login" />)
  )
}

const App = ()=> {
  

  return (
    <UserProvider>
      <Router>
      <Routes>
        <Route path="/"  element={<Root/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup"  element={<Signup/>} />
        <Route path="/dashboard"  element={<Home/>} />
        <Route path="/about"  element={<About/>} />
        <Route path="/contact"  element={<Contact/>} />
        <Route path="/appointment"  element={<Appointments/>} />
        <Route path="/doctors"  element={<Doctors/>} />
        <Route path="/history"  element={<History/>} />
        <Route path="/admin"  element={<AdminDashboard/>} />
        <Route path="/drdashboard" element={<DoctorDashboard/>} />
        <Route path="/add" element={<AddDoctors/>} />
      </Routes>
      </Router>

      <Toaster
         toastOptions={{
          className: "",
          style: {
          fontSize: '13px'
          },
        }}
      />

    </UserProvider>
  )
}

export default App
