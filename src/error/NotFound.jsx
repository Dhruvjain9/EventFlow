import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./css/notfound.css";

function NotFound() {
  const orbRef = useRef(null);
  const cardRef = useRef(null);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(1);

useEffect(() => {
  const moveOrb = () => {
    const padding = 100;

    const x = gsap.utils.random(
      padding,
      window.innerWidth - padding
    );

    const y = gsap.utils.random(
      padding,
      window.innerHeight - padding
    );

    gsap.to(orbRef.current, {
      left: x,
      top: y,
      duration: Math.max(0.6, 1.4 - speed * 0.1),
      ease: "power2.inOut",
      onComplete: moveOrb,
    });
  };

  moveOrb();
}, [speed]);


  // Orb movement
  useEffect(() => {
    const moveOrb = () => {
      gsap.to(orbRef.current, {
        x: gsap.utils.random(-200, 200),
        y: gsap.utils.random(-120, 120),
        duration: Math.max(0.6, 1.4 - speed * 0.1),
        ease: "power2.inOut",
        onComplete: moveOrb,
      });
    };
    moveOrb();
  }, [speed]);

  const hitOrb = () => {
    setScore((s) => s + 1);
    setSpeed((s) => s + 0.5);

    gsap.fromTo(
      orbRef.current,
      { scale: 1 },
      {
        scale: 1.6,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      }
    );
  };

  return (
    <main className="notfound-page">
      <div className="notfound-card" ref={cardRef}>
        <h1>404</h1>
        <h2>Page Not Found</h2>

        <p>
          This page escaped the flow.  
          Catch the <strong>404 orb</strong> to unlock your way back.
        </p>

        <div className="score">
          Score: <span>{score}</span>
        </div>

        {score > 0 && (
          <Link to="/">
            <button>Return Home</button>
          </Link>
        )}
      </div>

      {/* GAME ORB */}
      <div
        ref={orbRef}
        className="orb"
        onClick={hitOrb}
        title="Catch me"
      >
        404
      </div>
    </main>
  );
}

export default NotFound;
