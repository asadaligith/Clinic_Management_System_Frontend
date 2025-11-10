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
import PatientBooking from "./patient/PatientBooking";
import AvailableDoctors from './admin/admindashboard/AvailableDoctors'
import ProtectedRoute from "./components/layouts/ProtectedRoute";


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
         {/* Public Routes */}
        <Route path="/"  element={<Root/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup"  element={<Signup/>} />

        {/* Patient Routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute allowedRoles={["patient"]}>
                <Home />
              </ProtectedRoute>}
            />
       
        <Route path="/about"  element={<About/>} />
        <Route path="/contact"  element={<Contact/>} />
        <Route path="/appointment"  element={<Appointments/>} />
        <Route path="/doctors"  element={<Doctors/>} />
        <Route path="/history"  element={<History/>} />
         {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>}
          />
          {/* Doctor Routes */}
          <Route
            path="/drdashboard"
            element={
              <ProtectedRoute allowedRoles={["doctor"]}>
                <DoctorDashboard />
              </ProtectedRoute>
            }/>

        <Route
            path="/add-doctors"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddDoctors />
              </ProtectedRoute>}
          />
          <Route
            path="/doctors-list"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AvailableDoctors />
              </ProtectedRoute>}
          />

        <Route path="/booking/:id" element={<PatientBooking/>} />
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
