import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../stylesheets/payment.css";
import Loader from "../components/Loader";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { event, user, tickets } = location.state || {};

  const [method, setMethod] = useState("card");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);

  // GSAP refs
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const summaryRef = useRef(null);

  const total = tickets * event.ticketPrice;
  const tax = Math.round(total * 0.1);
  const grandTotal = total + tax;

  /* ===============================
     GSAP – PAGE INTRO ANIMATION
  ============================== */
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 },
    });

    tl.from(heroRef.current, {
      y: 40,
      opacity: 0,
    })
      .from(
        formRef.current,
        {
          x: -50,
          opacity: 0,
        },
        "-=0.4"
      )
      .from(
        summaryRef.current,
        {
          x: 50,
          opacity: 0,
        },
        "-=0.6"
      );
  }, []);

  /* ===============================
     PAYMENT HANDLER (UNCHANGED)
  ============================== */
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!transactionId.trim()) {
      alert("Transaction ID is required");
      return;
    }

    setLoading(true);

    const payload = {
      booking_id: `EVT-${Date.now()}`,
      user_id: user.id,
      event_id: event.eventId,
      tickets,
      email: user.email,
      transaction_id: transactionId,
      booking_datetime: new Date().toISOString(),
    };

    try {
      const res = await fetch(
        "https://eventflow-backend-production-6fc4.up.railway.app/submitBooking.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payment failed");

      navigate("/BookingSuccess", {
        state: {
          bookingId: data.booking_id,
          event,
          fromCheckout: true,
        },
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (!event || !user || !tickets) {
    return <Navigate to="/401" replace />;
  }

  return (
    <>
      {loading && <Loader text="Processing payment..." />}

      <main className="payment-page">
        {/* HERO */}
        <header className="payment-hero" ref={heroRef}>
          <h1>Secure Checkout</h1>
          <p>Complete your booking safely and securely</p>
        </header>

        {/* CONTENT */}
        <section className="payment-container">
          {/* LEFT – FORM */}
          <section className="payment-form" ref={formRef}>
            <h2>Payment Method</h2>

            <div className="payment-tabs">
              <button
                type="button"
                className={method === "card" ? "active" : ""}
                onClick={() => setMethod("card")}
              >
                <span className="material-symbols-outlined">payment_card</span>
                Card
              </button>

              <button
                type="button"
                className={method === "upi" ? "active" : ""}
                onClick={() => setMethod("upi")}
              >
                <span className="material-symbols-outlined">upi_pay</span>
                UPI
              </button>
            </div>

            <form onSubmit={handlePayment}>
              {method === "card" && (
                <>
                  <label>
                    Cardholder Name
                    <input type="text" required />
                  </label>

                  <label>
                    Card Number
                    <input type="text" required />
                  </label>

                  <div className="row">
                    <label>
                      Expiry
                      <input type="text" required />
                    </label>

                    <label>
                      CVV
                      <input type="password" required />
                    </label>
                  </div>
                </>
              )}

              {method === "upi" && (
                <label>
                  UPI ID
                  <input type="text" required />
                </label>
              )}

              <label>
                Transaction ID
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  required
                />
              </label>

              <button type="submit" disabled={loading}>
                {loading ? "Processing..." : `Pay ₹${grandTotal}`}
              </button>
            </form>
          </section>

          {/* RIGHT – SUMMARY */}
          <aside className="payment-summary" ref={summaryRef}>
            <h2>Receipt</h2>

            <div className="summary-row">
              <span>{event.venue}</span>
            </div>

            <div className="summary-row">
              <span>Tickets × {tickets}</span>
              <strong>₹{total}</strong>
            </div>

            <div className="summary-row">
              <span>Tax (10%)</span>
              <strong>₹{tax}</strong>
            </div>

            <div className="divider" />

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{grandTotal}</strong>
            </div>

            <p className="secure-note">
              🔒 Secure payment · Transaction verified
            </p>
          </aside>
        </section>
      </main>
    </>
  );
}

export default Payment;
