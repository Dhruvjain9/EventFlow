import "../stylesheets/about.css";

function About() {
  return (
    <main className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <h1>About EventFlow</h1>
        <p>
          EventFlow is a practical exploration of how real-world web applications are designed,
          built, and refined through hands-on experience.
        </p>
      </section>

      {/* PROJECT STORY */}
      <section className="about-block">
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

      {/* ABOUT ME – SPLIT LAYOUT */}
      <section className="about-me">
        {/* LEFT – IMAGE */}
        <div className="about-me-image">
          {/* Replace src with your actual image */}
          <img
            src="/images/profile.jpeg"
            alt="About me"
          />
        </div>

        {/* RIGHT – CONTENT */}
        <div className="about-me-content">
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

      {/* WHAT THE PLATFORM DOES */}
      <section className="about-block">
        <p>
          EventFlow allows users to explore events, apply meaningful filters, and complete
          bookings through a guided flow. Behind the scenes, the platform handles authentication,
          protected routes, and dynamic data rendering — mirroring real product behavior.
        </p>

        <p>
          The focus is on clarity and usability: the interface stays simple while the logic
          remains robust and extendable.
        </p>

        <p>
          EventFlow is not considered a finished product. It is a foundation that will continue
          to evolve. Future improvements may include richer personalization, better performance,
          and more advanced user dashboards.
        </p>

        <p>
          The goal is not just to add features, but to improve the overall quality of the system
          as understanding grows.
        </p>
      </section>

      {/* CLOSING */}
      <section className="about-block">
        <p>
          Building real things is the fastest way to learn. EventFlow exists as proof of that
          mindset — learning by designing, breaking, fixing, and improving.
        </p>
      </section>
    </main>
  );
}

export default About;
