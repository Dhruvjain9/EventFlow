import { useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import "../stylesheets/booking.css";

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();

  const event = location.state?.event;
  const user = JSON.parse(localStorage.getItem("user"));

  const [tickets, setTickets] = useState(1);

  if (!event || !user) {
    return <Navigate to="/404" replace />;
  }

  const totalPrice = tickets * event.ticketPrice;

  const proceedToPayment = () => {
    navigate("/payment", {
      state: {
        event,
        user,
        tickets,
        totalPrice,
      },
    });
  };

  return (
    <main className="booking-page">
      {/* HERO HEADER (LIKE EVENTS) */}
      <section className="booking-hero">
        <h1>Checkout</h1>
        <p>Review your booking and complete payment</p>
      </section>

      {/* MAIN CONTENT */}
      <section className="booking-content">
        {/* LEFT CONTAINER */}
        <div className="booking-left">
          {/* EVENT DETAILS */}
          <div className="card">
            <h2>Event Details</h2>

            <div className="event-detail-row">
              <span>Location</span>
              <strong>{event.venue}</strong>
            </div>

            <div className="event-detail-row">
              <span>Date</span>
              <strong>{event.date}</strong>
            </div>

            <div className="event-detail-row">
              <span>Price per ticket</span>
              <strong>${event.ticketPrice}</strong>
            </div>
          </div>

          {/* TICKETS */}
          <div className="card">
            <h2>Tickets</h2>

            <div className="ticket-stepper">
              <button
                onClick={() => setTickets((t) => Math.max(1, t - 1))}
                disabled={tickets === 1}
              >
                −
              </button>

              <span>{tickets}</span>

              <button
                onClick={() => setTickets((t) => Math.min(10, t + 1))}
                disabled={tickets === 10}
              >
                +
              </button>
            </div>
          </div>

          {/* USER DETAILS */}
          <div className="card">
            <h2>Your Details</h2>

            <div className="event-detail-row">
              <span>Name</span>
              <strong>{user.name}</strong>
            </div>

            <div className="event-detail-row">
              <span>Email</span>
              <strong>{user.email}</strong>
            </div>

            <div className="event-detail-row">
              <span>Age</span>
              <strong>{user.age}</strong>
            </div>
          </div>
        </div>

        {/* RIGHT CONTAINER – RECEIPT */}
        <aside className="booking-right">
          <div className="receipt">
            <h2>Summary</h2>

            <div className="receipt-row">
              <span>
                {tickets} × Ticket
              </span>
              <span>${event.ticketPrice}</span>
            </div>

            <div className="receipt-divider" />

            <div className="receipt-total">
              <span>Total</span>
              <strong>${totalPrice}</strong>
            </div>

            <button className="checkout-btn" onClick={proceedToPayment}>
              Proceed to Checkout
            </button>

            <p className="secure-text">
              🔒 Secure checkout · No payment details stored
            </p>
            <p className="secure-text">
              <span class="material-symbols-outlined">
                warning
              </span>
              This is a demo website for learning and testing purposes only.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Booking;
