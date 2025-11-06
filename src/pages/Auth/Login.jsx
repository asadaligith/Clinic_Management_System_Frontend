import React, { useState } from 'react'
import Input from '../../input/Input'
import { validateEmail } from '../../utils/helper';
import drPic from '../../assets/images/drPic.png'


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
            <div className='flex justify-center mb-6'>
                <img src={drPic} alt="Logo" className="w-28 h-28 md:w-33 md:h-33 object-cover rounded-full shadow-lg border-4 border-white hover:scale-105 transition-transform duration-300 ease-in-out" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-blue-700 mb-3 text-center">
                ZAIB CLINIC</h1>
            <h2 className="text-black text-xl md:text-2xl font-bold mb-6 text-center">Login</h2>

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
                 <p className="text-center text-gray-500 text-md mt-8">
                    Don’t have an account?{" "}
                    <a
                        href="/signup"
                        className="text-blue-600 hover:underline font-bold"
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
