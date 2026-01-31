import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/unauthorised.css";

function Unauthorized() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 7000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="unauthorized-page">
      <div className="unauthorized-card">
        <h1>401</h1>
        <h2>Unauthorized</h2>

        <p>
          You must be logged in to access this page.
        </p>

        <p className="redirect-note">
          Redirecting to login in...
        </p>

        <button onClick={() => navigate("/login", { replace: true })}>
          Go to Login Now
        </button>
      </div>
    </main>
  );
}

export default Unauthorized;
