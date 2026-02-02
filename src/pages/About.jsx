import "../stylesheets/about.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const heroRef = useRef(null);
  const blocksRef = useRef([]);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // HERO animation
    gsap.from(heroRef.current.children, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
    });

    // TEXT BLOCKS
    blocksRef.current.forEach((block) => {
      gsap.from(block.children, {
        scrollTrigger: {
          trigger: block,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });
    });

    // ABOUT ME split animation
    gsap.from(imageRef.current, {
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 75%",
      },
      x: -60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(contentRef.current.children, {
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 75%",
      },
      x: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
    });
  }, []);

  return (
    <main className="about-page">
      {/* HERO */}
      <section className="about-hero" ref={heroRef}>
        <h1>About EventFlow</h1>
        <p>
          EventFlow is a practical exploration of how real-world web applications are designed,
          built, and refined through hands-on experience.
        </p>
      </section>

      {/* PROJECT STORY */}
      <section
        className="about-block"
        ref={(el) => (blocksRef.current[0] = el)}
      >
        <p>
          This project was created with a simple idea in mind: learning by building something
          meaningful. EventFlow is not a demo or a tutorial clone — it is an attempt to simulate
          how actual event platforms work, from discovery to booking and user management.
        </p>

        <p>
          Instead of focusing only on visuals, the project emphasizes structure, flow, and logic.
          Every feature exists because it solves a real problem, not just because it looks good.
        </p>
      </section>

      {/* ABOUT ME */}
      <section className="about-me">
        <div className="about-me-image" ref={imageRef}>
          <img src="/images/profile.jpeg" alt="About me" />
        </div>

        <div className="about-me-content" ref={contentRef}>
          <h2>About Me</h2>

          <p>
            I’m a developer building EventFlow as part of my journey into full-stack development.
            This project represents experimentation, problem-solving, and continuous learning.
          </p>

          <p>
            Rather than relying solely on courses or tutorials, I wanted to understand how
            applications behave in real scenarios — handling state, user sessions, routing,
            and data flow in a way that feels natural to the user.
          </p>

          <p>
            Every challenge faced while building EventFlow has contributed to a deeper
            understanding of how modern web applications are structured and scaled.
          </p>
        </div>
      </section>

      {/* PLATFORM */}
      <section
        className="about-block"
        ref={(el) => (blocksRef.current[1] = el)}
      >
        <p>
          EventFlow allows users to explore events, apply meaningful filters, and complete
          bookings through a guided flow.
        </p>

        <p>
          The focus is on clarity and usability: the interface stays simple while the logic
          remains robust and extendable.
        </p>

        <p>
          EventFlow is not a finished product — it is a foundation that will continue to evolve.
        </p>
      </section>

      {/* CLOSING */}
      <section
        className="about-block"
        ref={(el) => (blocksRef.current[2] = el)}
      >
        <p>
          Building real things is the fastest way to learn. EventFlow exists as proof of that
          mindset — learning by designing, breaking, fixing, and improving.
        </p>
      </section>
    </main>
  );
}

export default About;
