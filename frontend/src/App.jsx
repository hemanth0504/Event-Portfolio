import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Work from "./pages/Work"
import Navbar from "./components/Navbar"
import Contact from "./pages/Contact"


function App() {

  return (
    <>
   <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/work" element={<Work/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>

   </div>
    </>
  )
}

export default App
