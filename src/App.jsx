import { Link, Routes, Route } from "react-router-dom";

// Styles
import "./App.css";
import "./stylesheets/layout.css";

// Pages
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";
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
            <Link to="/Booking">Booking</Link>
          </div>

        </nav>
      </header>

      <main className="App">
        <section className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Booking" element={<Booking />} />
            <Route path="/BookingSuccess" element={<BookingSuccess />} />
            {/* <Route path="/login" element={<Login />} /> */}
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
