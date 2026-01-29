import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import "../stylesheets/events.css";

function Events() {

  const slides = [
    {
        image: "https://images.unsplash.com/photo-1670448257614-be2630bc67fd?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Discover Amazing Events",
        subtitle: "Book experiences you’ll never forget",
    },
    {
        image: "https://images.unsplash.com/photo-1610900603480-c0a85ac8e315?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Live Music & Entertainment",
        subtitle: "Concerts, shows, and festivals near you",
    },
    {
        image: "https://images.unsplash.com/photo-1722505530451-467a0a28b64c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Moments That Matter",
        subtitle: "Create memories with friends and family",
    },
  ];


  const [events, setEvents] = useState([]);

  // filters (match backend params)
  const [cities, setCities] = useState([]);
  const [date, setDate] = useState("");
  const [priceRange, setPriceRange] = useState(100);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [searchParams, setSearchParams] = useSearchParams();

  const API = process.env.REACT_APP_API_BASE_URL;


  const toggleCity = (cityName) => {
    setCities((prev) =>
        prev.includes(cityName)
        ? prev.filter((c) => c !== cityName)
        : [...prev, cityName]
    );
  };

  const user = JSON.parse(localStorage.getItem("user"));


  // fetch events whenever filters change (SERVER-SIDE FILTERING)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = new URLSearchParams();

        if (cities.length > 0) {
            params.append("city", cities.join(","));
        }

        if (date) params.append("date", date);
        if (minPrice !== null) params.append("min_price", minPrice);
        if (maxPrice !== null) params.append("max_price", maxPrice);


        const urlparams = {};

        if (cities.length) urlparams.city = cities.join(",");
        if (date) urlparams.date = date;
        if (minPrice !== null) urlparams.min_price = minPrice;
        if (maxPrice !== null) urlparams.max_price = maxPrice;

        setSearchParams(urlparams);

        console.log("API =", API);

        const res = await fetch(
          `${API}/getEvents.php?${params.toString()}`
        );
        console.log(res);
        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setEvents([]);
      }
    };

    fetchEvents();
  }, [cities, date, minPrice, maxPrice]);

  return (
    <main>
    {/* HERO SLIDESHOW */}
      <section className="events-hero">
        <h1>Events</h1>
        <p>
          EventFlow is a practical exploration of how real-world web applications are designed,
          built, and refined through hands-on experience.
        </p>
      </section>


      {/* FILTER + EVENTS */}
      <section className="events-layout" id="events">
        {/* FILTER PANE */}
        <div className="filter-pane">
        <h3>Filters</h3>

        {/* City – text input */}
        <div className="filter-group">
        <p className="filter-title">City</p>

        {["USA", "INDIA","PORT GRAND", "CANADA", "BAHRIA"].map((cityName) => (
            <label key={cityName} className="checkbox-item">
            <input
                type="checkbox"
                checked={cities.includes(cityName)}
                onChange={() => toggleCity(cityName)}
            />
            {cityName}
            </label>
        ))}
        </div>

        {/* Date */}
        <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
        />

        {/* Price Range Slider */}
        <label>
            Price Range
            <input
            type="range"
            min="0"
            max="500"
            value={priceRange}
            onChange={(e) => {
                const value = Number(e.target.value);
                setPriceRange(value);
                setMinPrice(0);
                setMaxPrice(value);
            }}
            />
        </label>

        {/* Min / Max Price Inputs */}
        <div className="price-inputs">
            <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            />

            <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            />
        </div>

        {/* Reset */}
        <button
            type="button"
            onClick={() => {
            setCities([]);
            setDate("");
            setMinPrice(0);
            setMaxPrice(100);
            setPriceRange(100);
            }}
        >
            Clear Filters
        </button>
        </div>


        {/* EVENTS PANE */}
        <div className="events-pane">

          {events.length === 0 ? (
            <p>No events found</p>
          ) : (
            events.map((event) => (
              <div key={event.event_id} className="event-card">
                {event.ORIGINALCOVER && (
                  <img
                    src={event.img_url}
                    alt="Event cover"
                    className="event-image"
                  />
                )}
                <div className="event-details">
                  <div>
                    <h4>{event.VENUE}</h4>
                    <p>Date: {event.DATE}</p>
                    <p>
                      Tickets : {event.TICKETS_SOLD} / {event.CAPACITY}
                    </p>
                    <p>Price: ${event.TICKET_PRICE}</p>
                  </div>
                  <div className="book-btn">
                  <Link to={user?"/booking":"/login"} state={{ event }}>Book Now</Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default Events;



