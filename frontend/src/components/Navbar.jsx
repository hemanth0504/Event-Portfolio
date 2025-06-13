import { NavLink } from "react-router-dom"



export default function Navbar() {
  return (
    <div className="flex items-center justify-between py-5 font-medium">
        <div className="flex items-center">
          <img className="w-36" src="/Logo.jpg" alt="" />
          <span className="text-sm font-Poppins">Aadhya Signature Events</span>
        </div>
    <ul className="hidden sm:flex gap-5 text-sm text-gray-700">

      <NavLink to='/' className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700" />
      </NavLink>
       <NavLink to='/portfolio' className="flex flex-col items-center gap-1">
          <p>PORTFOLIO</p>
          <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700" />
      </NavLink>
       <NavLink to='/services' className="flex flex-col items-center gap-1">
          <p>SERVICES</p>
          <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700" />
      </NavLink>
       <NavLink to='/about' className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700" />
      </NavLink>
       <NavLink to='/contact' className="flex flex-col items-center gap-1">
          <p>CONTACT </p>
          <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700" />
      </NavLink>

    </ul>

    <div className="flex items-center gap-6">

    </div>

      </div>
  )
}
