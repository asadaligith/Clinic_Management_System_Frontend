import React, { useContext , useState } from 'react'
import drPic from '../../assets/images/drPic.png'
import { validateEmail } from '../../utils/helper';
import Input from '../../input/Input';
import { userContext } from '../../context/userContext';
import {API_PATHS} from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState(null);  
  const [role, setRole] = useState("");

  const {updateUser} = useContext(userContext);
  const navigate = useNavigate();

const handleSignup = async (e)=>{
    e.preventDefault();
    // Signup Validation Logic Here

    if(!fullname){
      setError("Please Enter Your Full Name");
      return;
    }

    if(!validateEmail(email)){
      setError("Please Enter a valid Email adress");
      return;
    }

    if(!password){
      setError("password is required");
      return;
    }
const finalRole = role || "patient";

try {
  const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
    fullname,
    email,
    password,
    role: finalRole,
  });

  const { token, user } = response;
  if (token) {
    localStorage.setItem("token", token);
    updateUser(user);
  }

  // navigate by role
  if (user?.role === "admin") return navigate("/admin");
  if (user?.role === "doctor") return navigate("/drdashboard");
  navigate("/dashboard");
    
  } catch (error) {
      if (error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }
      else if (!error.message.includes("timeout")){
        setError("Registration failed. Please Check your network");
      }
  }
};

  return (
       <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-white to-blue-50 px-4'>
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 md:p-10">

         <div className='flex justify-center mb-6'>
            <img src={drPic} alt="Logo" className="w-28 h-28 md:w-33 md:h-33 object-cover rounded-full shadow-lg border-4 border-white hover:scale-105 transition-transform duration-300 ease-in-out" />
          </div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-3 text-center">
                ZAIB CLINIC </h1>
            <h2 className="text-black text-xl md:text-xl mb-6 text-center font-bold">Create Account</h2>

            {error && (
          <div className="text-red-500 bg-red-100 border border-red-300 rounded-md p-2 text-center mb-4">
            {error}
          </div>
        )}
         
                <form onSubmit={handleSignup}  className="flex flex-col gap-4">
                <Input
                 value={fullname}
                 onChange={(e)=>setFullname(e.target.value)} 
                 label="fullname" 
                 placeholder="Full Name" 
                 type="text"
                  />
                  <Input
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)} 
                 label="email" 
                 placeholder="example@gmail.com" 
                 type="text"
                  />
                  
                <Input
                 value={password} 
                 onChange={(e)=>setPassword(e.target.value)} 
                 label="password" 
                 placeholder="Min 8 Character" 
                 type="password" 
                 />
                
                 {/* 👇 Role Dropdown */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">-- Select Role --</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

                <button className="btn-cls" type='submit'>Signup</button>
            </form>
                 <p className="text-center text-gray-500 text-md mt-8">
                    If already have an account {" "}
                    <a
                        href="/login"
                        className="text-blue-600 hover:underline font-bold"
                    >
                        Login
                    </a>
                </p>
              
        </div>
    </div>
    
  )
}

export default Signup