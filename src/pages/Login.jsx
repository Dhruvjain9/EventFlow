import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../stylesheets/login.css";
import Loader from "../components/Loader";
import gsap from "gsap";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mode, setMode] = useState(location.state || "signin");
  const [step, setStep] = useState(1);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");

  // UI state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // GSAP refs
  const cardRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);

  /* ===============================
     PAGE ENTRANCE ANIMATION
  ============================== */
  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(cardRef.current, {
      scale: 0.96,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        infoRef.current,
        {
          x: -40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .from(
        formRef.current,
        {
          x: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.6"
      );
  }, []);

  /* ===============================
     MODE SWITCH ANIMATION
  ============================== */
  useEffect(() => {
    setStep(1);
    gsap.from(formRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.45,
      ease: "power2.out",
    });
  }, [mode]);

  /* ===============================
     GEOLOCATION
  ============================== */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          if (data?.address?.country) {
            setCountry(data.address.country);
          }
        } catch {
          console.log("Could not get location");
        }
      },
      () => console.log("Location permission denied")
    );
  }, []);

  /* ===============================
     SUBMIT HANDLER
  ============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload =
      mode === "signin"
        ? { email, password }
        : {
            name,
            email,
            password,
            Age: Number(age),
            Location: country,
          };

    try {
      const res = await fetch(
        "https://eventflow-backend-production-6fc4.up.railway.app/auth.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode, ...payload }),
        }
      );

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.error || "Authentication failed");
      }

      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError(err.message);
      gsap.from(".auth-error", {
        x: 10,
        duration: 0.08,
        repeat: 3,
        yoyo: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <Loader
          text={mode === "signin" ? "Signing in..." : "Creating account..."}
        />
      )}

      <main className="auth-page">
        <div className="auth-card" ref={cardRef}>
          {/* LEFT INFO */}
          <div className="auth-info" ref={infoRef}>
            {mode === "signin" ? (
              <>
                <h2>Welcome Back</h2>
                <p>Sign in to continue booking and managing your events.</p>
                <button
                  className="outline"
                  onClick={() => {
                    setMode("signup");
                    setError("");
                  }}
                >
                  Create an Account
                </button>
              </>
            ) : (
              <>
                <h2>Join EventFlow</h2>
                <p>Create an account and start booking amazing events.</p>
                <button
                  className="outline"
                  onClick={() => {
                    setMode("signin");
                    setError("");
                  }}
                >
                  Already have an account?
                </button>
              </>
            )}
          </div>

          {/* RIGHT FORM */}
          <div className="auth-form" ref={formRef}>
            {mode === "signin" ? (
              <>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  {error && <p className="auth-error">{error}</p>}

                  <button type="submit" disabled={loading}>
                    Sign In
                  </button>
                </form>
              </>
            ) : (
              <form className="signup-form" onSubmit={handleSubmit}>
                <div
                  className="signup-slider"
                  style={{
                    transform: `translateX(${step === 1 ? "0%" : "-50%"})`,
                  }}
                >
                  {/* STEP 1 */}
                  <div className="signup-slide">
                    <input
                      type="text"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="next-btn"
                      onClick={() => {
                        if (name && email && password) setStep(2);
                      }}
                    >
                      Next →
                    </button>
                  </div>

                  {/* STEP 2 */}
                  <div className="signup-slide">
                    <label>Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />

                    <div className="signup-actions">
                      <button
                        type="button"
                        className="back-btn"
                        onClick={() => setStep(1)}
                      >
                        ← Back
                      </button>
                      <button type="submit">Create Account</button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
