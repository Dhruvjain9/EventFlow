import { Link } from "react-router-dom";
import "./css/footer.css"

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>EventFlow</h3>
          <p>Discover and book unforgettable events.</p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li>
              <Link to="/Events">Events</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><Link to="/About">About</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} EventFlow. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
