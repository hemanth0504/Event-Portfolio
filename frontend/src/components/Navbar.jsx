import { NavLink, useNavigate } from "react-router-dom"
import { ShoppingCart, UserCircle } from "lucide-react";
import axios from "axios";
import {useState } from "react";
import { useAuthContext } from "../context/useAuthContext.jsx";

export default function Navbar() {

  const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
     
const { user, setUser } = useAuthContext();


   const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full px-6">
      {/* Logo/Header */}
      <div className="flex justify-center my-5">
        <span className="font-allura text-6xl tracking-widest font-semibold text-[#2E2E2E]">
          Aadhya Signature Events
        </span>
      </div>

      <hr className="bg-gray-200 border-none h-[1.5px] w-full" />

      {/* Nav + Icons Row */}
      <div className="flex justify-between items-center py-5">
        {/* Center Nav */}
        <ul className="flex gap-6 mx-auto text-sm font-medium text-gray-700">
          <NavLink to='/' className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700" />
          </NavLink>
          <NavLink to='/portfolio' className="flex flex-col items-center gap-1">
            <p>PORTFOLIO</p>
            <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700" />
          </NavLink>
          <NavLink to='/services' className="flex flex-col items-center gap-1">
            <p>RENTAL SERVICES</p>
            <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700" />
          </NavLink>
          <NavLink to='/about' className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700" />
          </NavLink>
          <NavLink to='/contact' className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700" />
          </NavLink>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4 ml-4 relative">
          <ShoppingCart className="w-6 h-6 cursor-pointer" onClick={() => navigate('/cart')} />

      <div className="relative">
  <UserCircle
    className="w-6 h-6 cursor-pointer text-[#2B2B2B]"
    onClick={() => setShowDropdown(!showDropdown)}
  />
  {showDropdown && (
  <div className="absolute right-0 mt-3 w-44 rounded-xl shadow-md z-50 border border-gray-100 bg-white/90 backdrop-blur-sm py-2">
    {user ? (
      <>
        {/* ✅ Show Admin Panel for Admins */}
        {user.role === "admin" && (
          <button
            onClick={() => navigate("/admin")}
            className="w-full text-left px-4 py-2 text-sm text-[#2B2B2B] hover:bg-gray-100 rounded-md transition-colors duration-150"
          >
            Admin Panel
          </button>
        )}
        <button
          onClick={() => navigate("/profile")}
          className="w-full text-left px-4 py-2 text-sm text-[#2B2B2B] hover:bg-gray-100 rounded-md transition-colors duration-150"
        >
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm text-[#2B2B2B] hover:bg-gray-100 rounded-md transition-colors duration-150"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <button
          onClick={() => navigate("/login")}
          className="w-full text-left px-4 py-2 text-sm text-[#2B2B2B] hover:bg-gray-100 rounded-md transition-colors duration-150"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="w-full text-left px-4 py-2 text-sm text-[#2B2B2B] hover:bg-gray-100 rounded-md transition-colors duration-150"
        >
          Register
        </button>
      </>
    )}
  </div>
)}

</div>


        </div>
      </div>

      <hr className="bg-gray-200 border-none h-[1.5px] w-full" />
    </div>
  );
}
