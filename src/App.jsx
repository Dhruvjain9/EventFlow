import { useState, useEffect } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";

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

//support pages
import NotFound from "./error/NotFound";
import Unauthorized from "./error/Unauthorised"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const isPaymentPage = location.pathname === "/payment";
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [location.pathname]);

  
  return (
    <>
      {/* NAVBAR */}
      <header>
        <nav>
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
                <Link to="/Login" state={"signin"}>Sign In</Link>
                <Link to="/Login" className="signup-btn" state={"signup"}>Sign Up</Link>
              </>
            ) : (
              <div className="profile-wrapper">
                <span className="material-symbols-outlined profile-icon">
                  account_circle
                </span>
                <span className="greet-profile">
                  Hi{user?.name ? `, ${user.name}` : ""}
                </span>

                <div className="profile-dropdown">
                  {/*<Link to="/profile">Edit Profile</Link>
                  <Link to="/my-bookings">My Bookings</Link>*/}
                  <button
                    disabled={isPaymentPage}
                    className={isPaymentPage ? "logout-disabled" : ""}
                    title={isPaymentPage ? "Finish payment before logging out" : ""}
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

      {/* ROUTES */}
      <main className="App">
        <section className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Booking" element={<Booking />} />
            <Route path="/BookingSuccess" element={<BookingSuccess />} />
            <Route path="/Events" element={<Events />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/About" element={<About />} />
            <Route path="/Payment" element={<Payment />}/>
            <Route path="/*" element={<NotFound />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/401" element={<Unauthorized/>}/>
          </Routes>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>EventFlow</h3>
            <p>Discover and book unforgettable events.</p>
          </div>

          <div className="footer-links">
            <h4>Explore</h4>
            <ul>
              <li>
                <Link to="/Events">Events</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><Link to="/About">About</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} EventFlow. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
