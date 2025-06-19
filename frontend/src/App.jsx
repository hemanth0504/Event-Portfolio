import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

import { useUserStore } from "./stores/useUserStore";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/RentalServices";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllProducts from "./pages/admin/AllProducts";
import AddProduct from "./pages/admin/AddProduct";
import Events from "./pages/Events";
import AllEvents from "./pages/admin/AllEvents";
import AddEvent from "./pages/admin/AddEvent";

function App() {
  const location = useLocation();
  const { user, checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  const isAuthPage = ["/login", "/register"].includes(location.pathname);
  const isAdminPage = location.pathname.startsWith("/admin");

  const showLayout = !isAuthPage && !isAdminPage;

  return (
    <div className="min-h-screen bg-white text-black">
      <ScrollToTop />

      {showLayout && <Navbar />}

      <div className={showLayout ? "px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]" : ""}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
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
              <Route path="/events" element={<Events />} />
            {/* Auth Routes */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

            {/* Admin Protected Routes */}
            <Route
              path="/admin"
              element={
                user?.role === "admin" ? <AdminLayout /> : <Navigate to="/login" />
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AllProducts />} />
              <Route path="add-product" element={<AddProduct />} />
               <Route path="events" element={<AllEvents/>} />
                <Route path="add-event" element={<AddEvent />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AnimatePresence>
      </div>

      {showLayout && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;
