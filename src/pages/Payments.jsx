import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { use, useState } from "react";
import "../stylesheets/payment.css";
import Loader from "../components/Loader";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { event, user, tickets } = location.state || {};

  const [method, setMethod] = useState("card"); // card | upi
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);

  if (!event || !user || !tickets) {
    return <Navigate to="/401" replace />;
  }

  const total = tickets * event.ticketPrice;
  const tax = Math.round(total * 0.1);
  const grandTotal = total + tax;

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
      const res = await fetch("https://eventflow-backend-production-6fc4.up.railway.app/submitBooking.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payment failed");
      navigate("/BookingSuccess", {
        state: {
          bookingId: data.booking_id,
          event,
          fromCheckout: true
        },
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {loading && <Loader text="Processing payment..." />}

    <main className="payment-page">
      {/* HERO */}
      <header className="payment-hero">
        <h1>Secure Payment</h1>
        <p>Choose a payment method and complete your booking</p>
      </header>

      <div className="payment-container">
        {/* LEFT */}
        <section className="payment-form">
          <h2>Payment Method</h2>

          {/* METHOD TOGGLE */}
          <div className="payment-tabs">
            <button
              className={method === "card" ? "active" : ""}
              onClick={() => setMethod("card")}
              type="button"
            >
            <span className="material-symbols-outlined">
                payment_card
            </span>
              Card
            </button>

            <button
              className={method === "upi" ? "active" : ""}
              onClick={() => setMethod("upi")}
              type="button"
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
                  <input type="text" placeholder="John Doe" required />
                </label>

                <label>
                  Card Number
                  <input type="text" placeholder="1234 5678 9012 3456" required />
                </label>

                <div className="row">
                  <label>
                    Expiry
                    <input type="text" placeholder="MM/YY" required />
                  </label>

                  <label>
                    CVV
                    <input type="password" placeholder="***" required />
                  </label>
                </div>
              </>
            )}

            {method === "upi" && (
              <label>
                UPI ID
                <input type="text" placeholder="name@upi" required />
              </label>
            )}

            <label>
              Transaction ID
              <input
                type="text"
                placeholder="Enter transaction reference"
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

        {/* RIGHT */}
        <section className="payment-summary">
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
            <p className="secure-note">
              <span class="material-symbols-outlined">
                warning
              </span>
              This is a demo website for learning and testing purposes only.
            </p>
        </section>
      </div>
    </main>
    </>
  );
}

export default Payment;
