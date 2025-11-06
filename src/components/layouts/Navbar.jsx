import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // for icons (install lucide-react)
import drLogo from "../../assets/images/drPic.png"; // adjust path if needed

const Navbar = ({activeMenue}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
            <a href="#" className="hover:text-blue-200 transition">
              Logout
            </a>
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
          <a href="#" className="block hover:text-blue-200">
            Logout
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
