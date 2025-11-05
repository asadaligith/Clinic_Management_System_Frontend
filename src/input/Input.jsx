import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({value, onChange,label, placeholder, type}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglepass = ()=>{
    setShowPassword(!showPassword);
  }

  return (
    <div>
      <label className="text-[15px] text-gray-500">{label}</label>
      <div className='input-box'>
        <input 
          type={type == "password" ? (showPassword ? "text" : "password"): type}
          placeholder={placeholder}
          value={value}
          onChange={(e)=> onChange(e)}
          className='w-full bg-transparent outline-none'
          />

        {type == "password" && (
          <>
            {showPassword ?
            (<FaRegEye size={22} onClick={togglepass} className=""/>)
            : 
            (<FaRegEyeSlash size={22} onClick={togglepass} className=""/>)}
          </>
        )}



      </div>
    </div>
  )
}

export default Input