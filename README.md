# 🎟️ EventFlow (v1.3.1-beta)

EventFlow is a full-stack event discovery and booking platform designed to simulate a real-world event booking experience. Users can browse events, apply filters, authenticate, review bookings, complete a payment step, and receive booking confirmations. The project focuses on **clean user flows, protected navigation, and production-oriented architecture**.

---

## 📌 Project Status

* **Current Stable Version:** v1.5.0
* **Active Development Branch:** `v1.3.1beta`
* **MVP Snapshot Branch:** `Deployment`
* **Lifecycle:** Active development (v1.x)

All ongoing development happens in the **beta branch**, while release candidates and stable snapshots are branched deliberately.

---

## ✨ Core Features

### 🏠 Home Page

* Hero section highlighting featured events
* Overview of platform capabilities
* Clear call-to-action to explore events

---

### 📅 Events Discovery

* Server-backed event listing
* Advanced filtering:

  * City (multi-select)
  * Date
  * Price range (min / max)
* Event cards displaying key information
* Entry point into the booking flow

---

### 🔐 Authentication

* User Sign In and Sign Up flows
* Token-based authentication
* Persistent login using local storage
* Authentication state shared across the app

---

### 🎟️ Booking System (Refined)

* Protected routes for sensitive flows:

  * Booking
  * Payment
  * Booking success
* Guards against:

  * Manual URL access
  * Skipping steps in multi-page flows
  * Invalid refresh behavior

---

### 🎟️ Booking Flow

The booking experience is structured as a **multi-step, protected flow**:

```
Events → Booking → Payment → Booking Success
```

#### Booking Page

* Displays selected event details
* Ticket quantity selection with limits
* No duplicate user detail collection

---

### 💳 Payment Page

* Dedicated payment step between booking and confirmation
* Displays:

  * Event summary
  * Ticket count
  * Total payable amount
* Designed to support real payment gateway integration
* Success required to proceed

---

### ✅ Booking Confirmation

* Dedicated booking success page
* Displays booking ID and event summary
* Guarded against direct access and refresh abuse

---

### ⏳ Loader Overlay

* Global loader overlay for asynchronous actions
* Activated during:

  * API requests
  * Booking submission
  * Payment processing
* Prevents duplicate actions and improves user feedback

---

### 🚪 Logout Flow

* Dedicated logout route
* Clears authentication state and session data
* Prevents silent redirects and unauthorized reuse

---

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* CSS (modular stylesheets)

### Backend

* REST-style API
* Authentication endpoints
* Event retrieval and booking APIs

### Database

* MongoDB (document-based data modeling)

---

## 🌐 Deployment

* **Frontend:** Vercel
* **Backend:** Railway
* **Database:** MongoDB

The full application stack is deployed and integrated.

---

## 🧱 Project Structure (High Level)

* `Home` – Landing page and feature overview
* `Events` – Event discovery and filtering
* `Login` – Authentication flows
* `Booking` – Event review and ticket selection
* `Payment` – Payment step
* `BookingSuccess` – Confirmation view
* `Logout` – Session termination
* `About` – Project and author information

---

## 🧪 Stability & Reliability

* Strong route-level access control
* Defensive UI guards for multi-step navigation
* Backend validation for booking and payment-related requests
* Improved handling of async state transitions

---

## ⚠️ Known Limitations (Beta)

* Payment processing is currently mock / non-transactional
* No user dashboard or booking history page yet
* Error pages (403 / 408 / 500) are planned but not fully finalized
* Mobile responsiveness improvements are deferred

---

## 🗺️ Roadmap (High Level)

* User dashboard with booking history
* Finalized error handling pages
* Real payment gateway integration
* Mobile-first responsiveness
* Admin-side event management

---

## 📄 Summary

EventFlow v1.5.0 represents a feature-complete MVP foundation with authentication, protected booking flows, a payment step, and a fully deployed backend infrastructure. The project prioritizes correctness, flow integrity, and real-world architectural patterns, serving as a strong base for future iteration and expansion.
