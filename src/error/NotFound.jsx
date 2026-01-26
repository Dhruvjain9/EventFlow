import { Link } from "react-router-dom";
import "./css/notfound.css";

function NotFound() {
  return (
    <main className="notfound-page">
      <div className="notfound-card">
        <h1>404</h1>
        <h2>Page Not Found</h2>

        <p>
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link to="/">
          <button>Go Back Home</button>
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
