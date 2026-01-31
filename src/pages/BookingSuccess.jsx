import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "../stylesheets/bookingsuccess.css";

function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingId = location.state?.bookingId;
  const event = location.state?.event;

  // Guard: prevent direct access / refresh
  if (!bookingId) {
    return <Navigate to="/*" replace />;
  }

  return (
    <main className="success-page">
      <div className="success-card">
        {/* Icon */}
        <div className="success-icon">✓</div>

        <h1>Booking Confirmed</h1>
        <p className="success-subtitle">
          Your booking has been completed successfully.
        </p>

        {/* Booking ID */}
        <div className="success-highlight">
          Booking ID: <strong>{bookingId}</strong>
        </div>

        {/* Event Details */}
        {event && (
          <div className="success-details">
            <h3>Event Details</h3>

            <div className="detail-row">
              <span>Venue</span>
              {event.venue}
            </div>

            <div className="detail-row">
              <span>Date</span>
              {event.date}
            </div>

            <div className="detail-row">
              <span>Price</span>
              ${event.ticketPrice}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="success-actions">
          <button onClick={() => navigate("/events")}>
            Browse More Events
          </button>

          <button
            className="secondary"
            onClick={() => navigate("/")}
          >
            Go Home
          </button>
        </div>
      </div>
    </main>
  );
}

export default BookingSuccess;
