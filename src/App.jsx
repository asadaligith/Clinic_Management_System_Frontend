import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navigate } from "react-router-dom";
import UserProvider from "./context/userContext";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/dashboard/Home";
import { Toaster } from "react-hot-toast";



const App = ()=> {
  

  return (
    <UserProvider>
      <Router>
      <Routes>
        <Route path="/"  element={<Root/>} />
        <Route path="/login" exact element={<Login/>} />
        <Route path="/signup" exact element={<Signup/>} />
        <Route path="/dashboard" exact element={<Home/>} />
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