import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; 
import { useNavigate } from "react-router-dom";


const Navbar = ({activeMenue}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

   const handleLogout = () => {
    // 1. Clear token or any auth data
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
   };

  return (
    <nav className="bg-linear-to-br from-blue-100 via-white to-blue-50 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
         
           
            <span className="font-bold text-lg md:text-xl">
              Zaib Clinic 
            </span>
        

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center font-medium">
            <a href="/dashboard" className="hover:text-blue-200 transition">
              Home
            </a>
            <a href="/about" className="hover:text-blue-200 transition">
              About
            </a>
            <a href="/appointment" className="hover:text-blue-200 transition">
              Appointments
            </a>
            <a href="/doctors" className="hover:text-blue-200 transition">
              Doctors
            </a>
            <a href="/history" className="hover:text-blue-200 transition">
              History
            </a>
             {isLoggedIn ? (<button onClick={handleLogout}className="hover:text-red-500 transition font-medium">
                Logout
              </button>) :
               (<a href="/login" className="hover:text-blue-500 transition font-medium">
                Login
              </a>)}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-linear-to-br from-blue-100 via-white to-blue-50 px-6 py-4 space-y-3">
          <a href="/dashboard" className="block hover:text-blue-200 ">
            Home
          </a>
          <a href="/about" className="block  hover:text-blue-200">
            Abouts
          </a>
          <a href="/contact" className="block  hover:text-blue-200">
            Contact
          </a>
          <a href="/appointment" className="block hover:text-blue-200">
            Appointments
          </a>
          <a href="/doctors" className="block hover:text-blue-200">
            Doctors
          </a>
          <a href="/history" className="block hover:text-blue-200">
            History
          </a>
           {isLoggedIn ? (<button onClick={handleLogout}
              className="block w-full text-left hover:text-red-500 transition font-medium">
              Logout
            </button>) : 
            (<a href="/login" className="block hover:text-blue-500 transition font-medium">
              Login
            </a>)}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
