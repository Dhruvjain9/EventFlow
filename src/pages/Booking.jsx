import { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import "../stylesheets/booking.css";

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();

  const event = location.state?.event;
  const user = JSON.parse(localStorage.getItem("user"));

  const [tickets, setTickets] = useState(1);

  const heroRef = useRef(null);
  const leftCardsRef = useRef([]);
  const receiptRef = useRef(null);
  const ticketCountRef = useRef(null);
  const totalRef = useRef(null);

  const totalPrice = tickets * event.ticketPrice;

  /* ===============================
     PAGE LOAD ANIMATION
  ============================== */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(heroRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
    })
      .from(
        leftCardsRef.current,
        {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
        },
        "-=0.4"
      )
      .from(
        receiptRef.current,
        {
          x: 40,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.6"
      );
  }, []);

  /* ===============================
     TICKET CHANGE MICRO-ANIMATION
  ============================== */
  useEffect(() => {
    gsap.fromTo(
      ticketCountRef.current,
      { scale: 1.1 },
      { scale: 1, duration: 0.25, ease: "power2.out" }
    );

    gsap.fromTo(
      totalRef.current,
      { scale: 1.05 },
      { scale: 1, duration: 0.3, ease: "power2.out" }
    );
  }, [tickets]);

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

  if (!event || !user) {
    return <Navigate to="/404" replace />;
  }

  return (
    <main className="booking-page">
      {/* HERO HEADER */}
      <section className="booking-hero" ref={heroRef}>
        <h1>Checkout</h1>
        <p>Review your booking and complete payment</p>
      </section>

      {/* MAIN CONTENT */}
      <section className="booking-content">
        {/* LEFT */}
        <div className="booking-left">
          {/* EVENT DETAILS */}
          <div
            className="card"
            ref={(el) => (leftCardsRef.current[0] = el)}
          >
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
          <div
            className="card"
            ref={(el) => (leftCardsRef.current[1] = el)}
          >
            <h2>Tickets</h2>

            <div className="ticket-stepper">
              <button
                onClick={() => setTickets((t) => Math.max(1, t - 1))}
                disabled={tickets === 1}
              >
                −
              </button>

              <span ref={ticketCountRef}>{tickets}</span>

              <button
                onClick={() => setTickets((t) => Math.min(10, t + 1))}
                disabled={tickets === 10}
              >
                +
              </button>
            </div>
          </div>

          {/* USER */}
          <div
            className="card"
            ref={(el) => (leftCardsRef.current[2] = el)}
          >
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

        {/* RIGHT */}
        <aside className="booking-right" ref={receiptRef}>
          <div className="receipt">
            <h2>Summary</h2>

            <div className="receipt-row">
              <span>{tickets} × Ticket</span>
              <span>${event.ticketPrice}</span>
            </div>

            <div className="receipt-divider" />

            <div className="receipt-total">
              <span>Total</span>
              <strong ref={totalRef}>${totalPrice}</strong>
            </div>

            <button className="checkout-btn" onClick={proceedToPayment}>
              Proceed to Checkout
            </button>

            <p className="secure-text">
              🔒 Secure checkout · No payment details stored
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Booking;
