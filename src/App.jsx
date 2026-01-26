import { Link, Routes, Route } from "react-router-dom";

// Styles
import "./App.css";
import "./stylesheets/layout.css";

// Pages
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";
import Events from "./pages/Events"
import NotFound from "./error/NotFound";
// import Login from "./pages/Login";

function App() {
  return (
    <>
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
          </div>

        </nav>
      </header>

      <main className="App">
        <section className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Booking" element={<Booking />} />
            <Route path="/BookingSuccess" element={<BookingSuccess />} />
            <Route path="/Events" element={<Events/>} />
            <Route path="/*" element={<NotFound/>}/>
            {/* <Route path="/login" element={<Login />} /> */}
          </Routes>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>EventFlow</h3>
            <p>Discover and book unforgettable events.</p>
          </div>

          <div className="footer-links">
            <h4>Explore</h4>
            <ul>
              <li><a href="/events">Events</a></li>
              <li><a href="/booking">Booking</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
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
