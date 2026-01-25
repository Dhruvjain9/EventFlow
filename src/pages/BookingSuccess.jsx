import { useEffect, useState } from "react";

function BookingSuccess() {
  const [bookingId, setBookingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getBookingID = async () => {
      try {
        const res = await fetch(
          "http://localhost/api/getBookingID.php",

        );

        if (!res.ok) {
          throw new Error("Failed to fetch booking ID");
        }

        const data = await res.json();
        console.log(data);
        // EXPECTING: { booking_id: 123 }
        setBookingId(data.booking_id);
      } catch (err) {
        console.error(err);
        setError("Booking ID not found, please try again!");
      }
    };

    getBookingID();
  }, []);

  return (
    <main>
      <section>
        <h2>Your Booking is Successful</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {bookingId && (
          <ul>
            <li>Your Booking ID is <strong>{bookingId}</strong></li>
          </ul>
        )}
      </section>
    </main>
  );
}

export default BookingSuccess;
