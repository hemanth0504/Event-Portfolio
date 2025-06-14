import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion} from "framer-motion";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import Home from "./pages/Home.jsx";
import Work from "./pages/Work.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Portfolio from "./pages/Portfolio.jsx";



function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Navbar />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {[
              { path: "/", element: <Home /> },
              { path: "/work", element: <Work /> },
              { path: "/contact", element: <Contact /> },
              { path: "/about", element: <About /> },
              { path: "/portfolio", element: <Portfolio /> },
            ].map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {element}
                  </motion.div>
                }
              />
            ))}
          </Routes>
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
}

export default App;
