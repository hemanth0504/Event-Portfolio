import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import RequireAdmin from "./components/RequireAdmin.jsx";

import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Services from "./pages/RentalServices.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

function App() {
  const location = useLocation();
  const hideLayout = ["/login", "/register", "/admin"].includes(location.pathname);

  return (
    <>
      <ScrollToTop />

      {/* Only show layout if not on auth pages */}
      {!hideLayout && <Navbar />}

      <div className={hideLayout ? "" : "px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Main Routes */}
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Home />
                </motion.div>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<Services />} />

            {/* Auth Routes (no layout) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

              <Route
    path="/admin"
    element={
      <RequireAdmin>
        <AdminDashboard />
      </RequireAdmin>
    }
  />

          </Routes>
        </AnimatePresence>
      </div>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
