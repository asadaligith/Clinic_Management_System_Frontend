import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navigate } from "react-router-dom";
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



const App = ()=> {
  

  return (
    <UserProvider>
      <Router>
      <Routes>
        <Route path="/"  element={<Root/>} />
        <Route path="/login" exact element={<Login/>} />
        <Route path="/signup" exact element={<Signup/>} />
        <Route path="/dashboard" exact element={<Home/>} />
        <Route path="/about" exact element={<About/>} />
        <Route path="/contact" exact element={<Contact/>} />
        <Route path="/appointment" exact element={<Appointments/>} />
        <Route path="/doctors" exact element={<Doctors/>} />
        <Route path="/history" exact element={<History/>} />
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

const Root =()=>{
  const isauthenticated = !!localStorage.getItem("token");
  return(
    isauthenticated ? (<Navigate to="/dashboard" />) : (<Navigate to="/login" />)
  )
}