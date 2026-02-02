import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import "./css/unauthorised.css";

function Unauthorized() {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const [countdown, setCountdown] = useState(5);

  // Entrance animation
  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(cardRef.current, {
      scale: 0.92,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        cardRef.current.children,
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.4"
      );

    gsap.fromTo(
      imageRef.current,
      { y: -10 },
      {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      }
    );
  }, []);

  // Countdown + redirect
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((c) => c - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <main className="unauthorized-page">
      <div className="unauthorized-card" ref={cardRef}>
        {/* IMAGE */}
        <img
          ref={imageRef}
          src="/images/unauthorized.jpg"
          alt="Unauthorized access"
          className="unauthorized-image"
        />

        <h1>401</h1>
        <h2>Unauthorized</h2>

        <p>You must be logged in to access this page.</p>

        <p className="redirect-note">
          Redirecting to login in <span>{countdown}</span>s…
        </p>

        <button onClick={() => navigate("/login", { replace: true })}>
          Go to Login Now
        </button>
      </div>
    </main>
  );
}

export default Unauthorized;
