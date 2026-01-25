import { useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";

import "../stylesheets/booking.css"

function Booking() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [events, setEvents] = useState([]);
  const [agree, setAgree] = useState(false);

  const navigate = useNavigate();

  const getEvents = async (selectedCity) => {
    if (!selectedCity) return;

    try {
      const res = await fetch(
        `http://localhost/api/getEvents.php?city=${selectedCity}`
      );

      if (!res.ok) throw new Error("Failed to fetch events");

      const data = await res.json();
      setEvents(data); // expects array of dates (strings)
    } catch (err) {
      console.error(err);
      setEvents([]);
    }
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setEvents([]); // reset old events
    getEvents(selectedCity);
  };

  const sendData = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const eventId = formData.get("eventDate");

    if (!eventId) {
      alert("Please select an event date");
      return;
    }

    if (!agree) {
      alert("Please agree to terms and conditions");
      return;
    }

    const payload = {
      email,
      event_id: eventId,
    };
    console.log(payload);
    try {
      const res = await fetch("http://localhost/api/submitBooking.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      

      if (!res.ok) {
        throw new Error(data.error || "Booking failed");
      }

      console.log("Backend response:", data);

      //Navigate to Booking Success
      navigate("/BookingSuccess")
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };


  return (
    <main>
      <div className="container">
        <h1>Booking Page</h1>

        <form className="Booking-form" onSubmit={sendData}>
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />

          {/* City */}
          <select value={city} onChange={handleCityChange} required>
            <option value="">Select City</option>
            <option value="BAHRIA">BAHRIA</option>
            <option value="CANADA">CANADA</option>
            <option value="GERMANY">GERMANY</option>
            <option value="INDIA">INDIA</option>
            <option value="PORT GRAND">PORT GRAND</option>
            <option value="USA">USA</option>
          </select>
          <br />

          {/* Event Dates */}
          {city && (
            <>
              <p>Select Event Date:</p>

              {events.length === 0 ? (
                <p>No events available for this city</p>
              ) : (
                events.map((event) => (
                  <label key={event.event_id}>
                    <input
                      type="radio"
                      name="eventDate"
                      value={event.event_id}
                      required
                    />
                    {event.date}
                    <br />
                  </label>
                ))
              )}
            </>
          )}



          {/* Terms */}
          <label>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            I agree to the terms and conditions
          </label>
          <br />

          {/* Submit */}
          <button type="submit">Book Now</button>
        </form>
      </div>
    </main>
  );
}

export default Booking;
