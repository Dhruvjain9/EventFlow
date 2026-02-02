import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import { Routes, Route, useLocation } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Components
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import CursorTrail from "./components/cursortrail";

// Styles
import "./App.css";
import "./stylesheets/layout.css";

// Pages
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";
import Events from "./pages/Events";
import Login from "./pages/Login";
import About from "./pages/About";
import Payment from "./pages/Payments";

// Error pages
import NotFound from "./error/NotFound";
import Unauthorized from "./error/Unauthorised";

gsap.registerPlugin(ScrollSmoother);

function App() {
  const location = useLocation();
  const smootherRef = useRef(null);
  const hideNavbarRoutes = ["/booking", "/payment"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);


  /* ===============================
     SCROLL SMOOTHER (ONE INSTANCE)
  ============================== */
  useEffect(() => {
    if (!smootherRef.current) {
      smootherRef.current = ScrollSmoother.create({
        smooth: 1.2,
        effects: true,
        smoothTouch: 0.1,
      });
    }

    return () => {
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, []);

  /* ===============================
     EFFECT TOGGLES PER ROUTE
  ============================== */
  const disableEffectsOn = ["/login", "/payment", "/401"];
  const effectsEnabled = !disableEffectsOn.includes(location.pathname);

  return (
    <>
      {effectsEnabled && <CursorTrail />}
      {!hideNavbar && <Navbar />}


      {/* SMOOTH SCROLL WRAPPER */}
      <div id="smooth-wrapper">
        <div id="smooth-content">

          <main className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Booking" element={<Booking />} />
              <Route path="/BookingSuccess" element={<BookingSuccess />} />
              <Route path="/Events" element={<Events />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/About" element={<About />} />
              <Route path="/Payment" element={<Payment />} />
              <Route path="/401" element={<Unauthorized />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
      <SpeedInsights />
    </>
  );
}

export default App;
