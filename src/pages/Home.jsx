import { Link } from "react-router-dom";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "../components/Hero";
import "../stylesheets/home.css";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  // 🔥 Scroll animations
  gsap.context(() => {
    gsap.from(".feature", {
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 75%",
      },
      y: 60,
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
    });

    gsap.from(ctaRef.current, {
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <main>
      {/* HERO */}
      <Hero />

      {/* FEATURES */}
      <section className="features" ref={featuresRef}>
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
      <section className="cta" ref={ctaRef}>
        <h2>Ready to Experience Something New?</h2>
        <Link to="/Events">
          <button>Get Started</button>
        </Link>
      </section>
    </main>
  );
}

export default Home;
