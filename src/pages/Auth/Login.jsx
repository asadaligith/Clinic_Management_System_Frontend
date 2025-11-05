import React, { useState } from 'react'
import Input from '../../input/Input'
import { validateEmail } from '../../utils/helper';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error , setError] = useState(null);

    const handleLogin = async (e)=>{
        e.preventDefault();
        if(!validateEmail(email)){
            setError("Please Enter a Valid Email");
            return;
        }
        if (!password){
            setError("Enter a Password");
            return;
        }
        setError("");
    }


// Login API Call here


  return (
   <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-white to-blue-50 px-4'>
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 md:p-10">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-3 text-center">
                CLINIC MANAGEMENT SYSTEM</h1>
            <h2 className="text-gray-600 text-md md:text-base mb-6 text-center">Login with Email & Password</h2>

            {error && (
          <div className="text-red-500 bg-red-100 border border-red-300 rounded-md p-2 text-center mb-4">
            {error}
          </div>
        )}
         
                <form onSubmit={handleLogin}  className="flex flex-col gap-4">
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
                <button className="btn-cls" type='submit'>Login</button>
            </form>
                 <p className="text-center text-gray-500 text-sm mt-4">
                    Don’t have an account?{" "}
                    <a
                        href="/signup"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Sign up
                    </a>
                </p>
            
            
        </div>

    </div>
    
  );
};

export default Login

// export default function Test() {
//   return (
//     <div className="flex items-center justify-center h-screen bg-amber-300">
//       <h1 className="text-2xl font-bold">Tailwind is Working ✅</h1>
//     </div>
//   )
// }
