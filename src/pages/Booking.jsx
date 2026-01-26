import { useState } from "react";
import { Navigate, useNavigate, useLocation, Link } from "react-router-dom";
import "../stylesheets/booking.css";

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedEvent = location.state?.event;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [tickets, setTickets] = useState(1);

  if (!selectedEvent) {
    return <Navigate to="/*" replace />;
  }

  const sendData = async (e) => {
    e.preventDefault();

    if (!agree) {
      alert("Please agree to terms and conditions");
      return;
    }

    const payload = {
      name,
      email,
      event_id: selectedEvent.event_id,
      tickets
    };

    try {
      const res = await fetch("http://localhost/api/submitBooking.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      navigate("/BookingSuccess", {
        state: {
          bookingId: data.booking_id,
          event: selectedEvent,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  return (
    <main className="booking-page">
      <div className="booking-card">
        {/* LEFT: EVENT SUMMARY */}
        <div className="booking-summary">
          <h2>Event Details</h2>

          <div className="summary-item">
            <span>Venue</span>
            <strong>{selectedEvent.VENUE}</strong>
          </div>

          <div className="summary-item">
            <span>Date</span>
            <strong>{selectedEvent.DATE}</strong>
          </div>

          <div className="summary-item">
            <span>Ticket Price</span>
            <strong>${selectedEvent.TICKET_PRICE}</strong>
          </div>

          <div className="stepper">
            <button
              type="button"
              onClick={() => setTickets((prev) => Math.max(1, prev - 1))}
              disabled = {tickets === 1}
            >
              −
            </button>

            <input
              type="number"
              value={tickets}
              readOnly
            />

            <button
              type="button"
              onClick={() => setTickets((prev) => Math.min(10, prev + 1))}
              disabled = {tickets === 10}
            >
              +
            </button>
          </div>

        </div>

        {/* RIGHT: FORM */}
        <div className="booking-form-wrapper">
          <h1>Confirm Your Booking</h1>

          <form onSubmit={sendData}>
            <label>
              Full Name
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label>
              Email Address
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              I agree to the terms and conditions
            </label>

            <button type="submit">Confirm Booking</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Booking;
