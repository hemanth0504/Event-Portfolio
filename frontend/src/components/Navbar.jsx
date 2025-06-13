import { NavLink } from "react-router-dom"



export default function Navbar() {
  return (
    <div className="flex flex-col justify-center items-center m-5"> 
      <div className="flex items-center gap-8 my-8">
 
<span className="font-allura text-6xl tracking-widest font-semibold text-[#2E2E2E]">
  Aadhya Signature Events
</span>



      </div>

    <hr className=" bg-gray-200 border-none h-[1.5px] w-full" />
    <div className="flex items-center justify-center py-5 font-medium">
       
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

      </div>
          <hr className=" bg-gray-200 border-none h-[1.5px] w-full" />


    </div>


  )
}
