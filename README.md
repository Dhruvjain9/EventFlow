# 🎟️ EventFlow

**EventFlow** is a modern event discovery and booking platform built to simulate how real-world web applications are designed, structured, and scaled.  
It focuses on **clean UX**, **smooth animations**, and **practical full-stack workflows** — from browsing events to completing secure payments.

> This project is not a demo or clone. It is a hands-on exploration of building a production-grade web experience.

---

## 🚀 Current Version

**v2.0.0** — Major UI & Experience Upgrade  
See full details in [`RELEASE_NOTES.md`](./RELEASE_NOTES.md)

---

## ✨ Features

### 🧭 Event Discovery
- Browse curated events
- Filter by city, date, and price range
- Clean card-based layout with hover interactions

### 🎬 Smooth Animations
- GSAP-powered page transitions
- Micro-interactions on buttons, tabs, and cards
- Animated totals during checkout
- Confetti celebration on successful booking 🎉

### 🛒 Booking & Checkout
- Ticket quantity controls
- Receipt-style order summary
- Secure checkout flow
- Route-protected booking pages

### 💳 Payments
- Card and UPI payment options
- Transaction verification
- Full-screen loader during processing
- Clear success and error handling

### 👤 Authentication
- Sign In / Sign Up flow
- Two-step signup process
- Session persistence using localStorage
- Protected routes for bookings and payments

### 🧭 Navigation
- Fixed, glass-style navbar with scroll blur
- Route-aware navbar visibility
- Profile dropdown with smooth hover behavior
- Mobile-friendly navigation

---

## 🎨 Design Philosophy

- Minimal black & white aesthetic
- Soft shadows instead of hard borders
- Clear visual hierarchy
- Motion used to guide attention — not distract
- Mobile-first responsiveness

---

## 🛠 Tech Stack

### Frontend
- **React**
- **React Router**
- **GSAP** (animations & ScrollSmoother)
- **CSS3** (custom design system)

### Backend
- **PHP REST APIs**
- **MySQL** (events, users, bookings)
- Hosted backend (Railway)

### Utilities
- `canvas-confetti` for success feedback
- Browser Geolocation API (signup enrichment)

---

## 📂 Project Structure

```txt
src/
├── components/
│   ├── navbar
│   ├── footer
│   ├── loader
│   ├── cursortrail
│
├── pages/
│   ├── Home
│   ├── Events
│   ├── Booking
│   ├── Payments
│   ├── BookingSuccess
│   ├── Login
│   ├── About
│
├── error/
│   ├── NotFound
│   └── Unauthorized
│
├── stylesheets/
│   ├── home.css
│   ├── events.css
│   ├── booking.css
│   ├── bookingsuccess.css
│   ├── login.css
│   ├── about.css
│   ├── payment.css
│   └── layout.css
│
└── App.jsx
