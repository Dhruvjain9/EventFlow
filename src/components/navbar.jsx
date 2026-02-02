import "./css/navbar.css";

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const isPaymentPage = location.pathname === "/payment";
  const user = JSON.parse(localStorage.getItem("user"));

  const navRef = useRef(null);
  const dropdownRef = useRef(null);

  // 🔁 Auth state sync
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setIsLoggedIn(!!storedUser);
  }, [location.pathname]);

  // 🚀 Navbar entrance animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }
    );
  }, []);

  // 📜 Scroll behavior
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) {
        navRef.current.classList.add("nav-scrolled");
      } else {
        navRef.current.classList.remove("nav-scrolled");
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 👤 Dropdown animation
  const toggleDropdown = (open) => {
    if (!dropdownRef.current) return;

    gsap.to(dropdownRef.current, {
      autoAlpha: open ? 1 : 0,
      y: open ? 0 : -10,
      duration: 0.3,
      ease: "power4.out",
      pointerEvents: open ? "auto" : "none",
    });
  };

  return (
    <header ref={navRef}>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="Event Flow" />
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/Events">Events</Link>
          <Link to="/About">About</Link>

          {!isLoggedIn ? (
            <>
              <Link to="/Login" state="signin" className="signin-btn">
                Sign In
              </Link>
              <Link to="/Login" state="signup" className="signup-btn">
                Sign Up
              </Link>
            </>
          ) : (
            <div
              className="profile-wrapper"
              onMouseEnter={() => toggleDropdown(true)}
              onMouseLeave={() => toggleDropdown(false)}
            >
              <span className="material-symbols-outlined profile-icon">
                account_circle
              </span>
              <span className="greet-profile">
                Hi{user?.name ? `, ${user.name}` : ""}
              </span>

              <div className="profile-dropdown" ref={dropdownRef}>
                <button
                  disabled={isPaymentPage}
                  className={isPaymentPage ? "logout-disabled" : ""}
                  title={
                    isPaymentPage
                      ? "Finish payment before logging out"
                      : ""
                  }
                  onClick={() => {
                    if (isPaymentPage) return;
                    localStorage.removeItem("user");
                    localStorage.removeItem("auth_token");
                    setIsLoggedIn(false);
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
