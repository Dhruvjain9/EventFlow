# 🎟️ EventFlow

EventFlow is a full-stack event discovery and booking platform that allows users to browse events, apply filters, authenticate, and securely book tickets. The project is built with a modern frontend architecture and a backend API designed to support real-world booking workflows.

---

## 📌 Current Version

* **Version:** v1.3.1
* **Status:** Active development (v1.x lifecycle)

---

## ✨ Features Implemented So Far

### 🏠 Home Page

* Hero carousel showcasing featured events
* Highlights core platform features
* Call-to-action to explore events

---

### 📅 Events Listing

* Server-side event fetching
* Advanced filtering options:

  * City (multi-select)
  * Date
  * Price range (min / max)
* Responsive event cards with event details
* Direct navigation to booking flow

---

### 🔐 Authentication

* User **Sign In** and **Sign Up** functionality
* Token-based authentication
* Persistent login using local storage
* Authentication state available across the app

---

### 🛡️ Route Protection

* Protected routes to prevent unauthorized access:

  * Booking page
  * Booking success page
* Guards against:

  * Manual URL access
  * Page refresh abuse
* Automatic redirection for unauthenticated users

---

### 🎟️ Booking System

* Secure booking flow tied to selected events
* Ticket quantity selector with limits
* Required user details validation
* Backend booking submission with error handling
* Reliable booking confirmation response including:

  * Unique booking ID
  * Event details

---

### ✅ Booking Confirmation

* Dedicated booking success page
* Displays booking ID and event summary
* Guarded against invalid or direct access
* Navigation options to continue browsing

---

### 🎨 UI / UX

* Fully responsive layout across all pages
* Consistent design language and styling
* Dedicated layouts for:

  * Authentication
  * Booking
  * Booking success

---

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* CSS (modular stylesheets)

### Backend

* REST-style API
* Authentication endpoints
* Booking submission and event retrieval

---

## 🧱 Project Structure (High Level)

* `Home` – Landing page and feature highlights
* `Events` – Event listing and filtering
* `Login` – Authentication (sign in / sign up)
* `Booking` – Ticket booking flow
* `BookingSuccess` – Booking confirmation
* `About` - About the project and me

---

## 🧪 Stability & Reliability

* Route-level access control implemented
* Improved backend validation for booking requests
* Defensive UI guards to prevent invalid navigation

---

## ⚠️ Known Limitations

* Bookings are not yet fully linked to authenticated users
* No user dashboard or booking history page
* Backend authorization will continue to be hardened

---

## 📄 Summary

EventFlow v1.3.0 represents a stable and feature-rich foundation for an event booking platform. Core user flows — discovery, authentication, protected booking, and confirmation — are fully implemented, providing a strong base for future expansion while maintaining architectural clarity and security.
