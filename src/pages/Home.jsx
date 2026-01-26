import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "../stylesheets/home.css"

function Home() {
  const slides = [
    {
        image: "https://images.unsplash.com/photo-1670448257614-be2630bc67fd?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Discover Amazing Events",
        subtitle: "Book experiences you’ll never forget",
    },
    {
        image: "https://images.unsplash.com/photo-1610900603480-c0a85ac8e315?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Live Music & Entertainment",
        subtitle: "Concerts, shows, and festivals near you",
    },
    {
        image: "https://images.unsplash.com/photo-1722505530451-467a0a28b64c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Moments That Matter",
        subtitle: "Create memories with friends and family",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  return (
    <main>
    {/* HERO SLIDESHOW */}
    <section className="hero-carousel">
    <div className="slides">
        {slides.map((slide, index) => (
        <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : ""}`}
            style={{
            backgroundImage: `url(${slide.image})`,
            }}
        >
            <div className="overlay">
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
            <div className="btn-container">
              <Link to="/#signin" className="btn">
                  Sign In
              </Link>
              <Link to="/#signup" className="btn" id="signup">
                  Sign Up
              </Link>
            </div>
            </div>
        </div>
        ))}
    </div>
    </section>

      {/* FEATURES */}
    <section className="features">
      <div className="feature">
        <img
          src="/images/Image2.png"
          alt="Curated Events"
          className="feature-image"
        />
        <h3>Curated Events</h3>
        <p>Handpicked experiences across cities.</p>
      </div>

      <div className="feature">
        <img
          src="/images/Image1.png"
          alt="Easy Booking"
          className="feature-image"
        />
        <h3>Easy Booking</h3>
        <p>Fast, secure, and hassle-free reservations.</p>
      </div>

      <div className="feature">
        <img
          src="/images/Image3.png"
          alt="Trusted Venues"
          className="feature-image"
        />
        <h3>Trusted Venues</h3>
        <p>Top locations with verified organizers.</p>
      </div>
    </section>


      {/* CTA */}
      <section className="cta">
        <h2>Ready to Experience Something New?</h2>

        <Link to="/Events">
          <button>Get Started</button>
        </Link>
      </section>
    </main>
  );
}

export default Home;
