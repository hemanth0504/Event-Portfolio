import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";

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
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import Profile from "./components/Profile";



function App() {
  const location = useLocation();
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();



useEffect(() => {
  if (!user) checkAuth();
}, [checkAuth, user]);
  

  useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);

  if (checkingAuth) {
  return <div className="text-center mt-20">Checking authentication...</div>;
}




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
            <Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
           <Route path='/profile' element={user ? <Profile /> : <Navigate to='/login' />} />
           <Route
  path='/purchase-success'
  element={<PurchaseSuccessPage />}
/>

					<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />


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
