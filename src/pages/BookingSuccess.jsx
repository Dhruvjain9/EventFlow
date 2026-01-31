import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import "../stylesheets/bookingsuccess.css";

function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingId = location.state?.bookingId;
  const event = location.state?.event;
  const fromCheckout = location.state?.fromCheckout;

  // 🎉 Confetti ONLY when coming from checkout
  useEffect(() => {
    if (!bookingId) return <Navigate to="/*" replace />;

    confetti({
      particleCount: 500,
      spread: 80,
      origin: { y: 0.6 },
    });
  }, [bookingId, fromCheckout]);


  return (
    <main className="success-page">
      <div className="success-card">
        <div className="success-icon">✓</div>

        <h1>Booking Confirmed</h1>
        <p className="success-subtitle">
          Your booking has been completed successfully.
        </p>

        <div className="success-highlight">
          Booking ID <strong>{bookingId}</strong>
        </div>

        {event && (
          <div className="success-details">
            <h3>Event Details</h3>

            <div className="detail-row">
              <span>Venue</span>
              <strong>{event.venue}</strong>
            </div>

            <div className="detail-row">
              <span>Date</span>
              <strong>{event.date}</strong>
            </div>

            <div className="detail-row">
              <span>Price per ticket</span>
              <strong>${event.ticketPrice}</strong>
            </div>
          </div>
        )}

        <div className="success-actions">
          <button onClick={() => navigate("/events")}>
            Browse More Events
          </button>

          <button className="secondary" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </div>
    </main>
  );
}

export default BookingSuccess;
