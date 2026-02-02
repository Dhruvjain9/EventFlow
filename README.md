# 🎟️ EventFlow

**EventFlow** is a modern, full-stack event discovery and booking platform designed to mirror how real-world web products are built, styled, and scaled.

The project emphasizes **clean UX**, **thoughtful motion**, and **practical engineering decisions**, covering the complete user journey — from discovering events to confirming bookings through a secure checkout flow.

> EventFlow is not a demo or tutorial clone.  
> It is a hands-on exploration of building a production-grade web application.

---

## 🚀 Current Version

**v2.0.0** — UI, UX, and Interaction Overhaul  
A major upgrade focused on visual polish, responsiveness, animations, and user flow stability.

---

## ✨ Key Features

### 🧭 Event Discovery
- Browse curated events fetched from backend APIs
- Server-side filtering by:
  - City
  - Date
  - Price range
- URL-synced filters (reload & share safe)
- Responsive event grid with animated cards
- Graceful empty-state handling

---

### 🎬 Animations & Motion
- GSAP-powered page entry animations
- Smooth scrolling using **GSAP ScrollSmoother**
- Micro-interactions on:
  - Buttons
  - Tabs
  - Cards
  - Totals and counters
- Hover-based depth and elevation effects
- Confetti celebration on successful bookings 🎉
- Animated full-screen loaders during async operations

### 🎬 Smooth Animations
- GSAP-powered page transitions
- Micro-interactions on buttons, tabs, and cards
- Animated totals during checkout
- Confetti celebration on successful booking 🎉

### 🛒 Booking Flow
- Route-protected booking page
- Ticket quantity stepper with limits
- Live total price calculation
- Sticky receipt panel on desktop
- Mobile-friendly stacked layout
- Auto-filled user details from session

---

### 💳 Payments
- Dedicated checkout page
- Card & UPI payment method toggle
- Transaction ID validation
- Tax calculation & grand total breakdown
- Full-screen loader during payment processing
- Backend booking submission
- Automatic redirect to confirmation page

---

### ✅ Booking Confirmation
- Success page with:
  - Confetti animation
  - Booking ID highlight
  - Event summary
- Prevents direct access without valid checkout flow
- Clear next actions (Browse Events / Go Home)

---

### 👤 Authentication
- Sign In / Sign Up system
- Two-step signup flow
- Age & country capture
- Browser geolocation enrichment
- Session persistence using `localStorage`
- Logout protection during critical flows (e.g. payment)

---

### 🔐 Route Protection & Error Handling
- Protected routes for:
  - Booking
  - Payment
- Custom error pages:
  - **401 Unauthorized** (auto-redirect to login)
  - **404 Not Found**
- Graceful handling of invalid navigation states

---

### 🧭 Navigation & Layout
- Fixed glass-style navbar
- Scroll-aware blur & shadow effects
- Hover-stable profile dropdown (no flicker)
- Route-aware navbar visibility
- Structured footer with responsive layout
- Consistent spacing and typography across pages

---

### ⏳ Loading & Feedback
- Full-screen loader overlay
- Context-aware loading messages
- Disabled actions during async requests
- Clear success and error feedback

---

### 📱 Responsive Design
- Desktop-first polished layouts
- Tablet-optimized grids and spacing
- Mobile-friendly:
  - Stacked layouts
  - Touch-safe controls
  - Simplified interactions

---

## 🎨 Design Philosophy

- Minimal black & white aesthetic
- Soft shadows instead of hard borders
- Clear visual hierarchy
- Motion used to guide attention — not distract
- Consistent component spacing and rhythm
- UI designed to feel calm, confident, and intentional

---

## 🛠 Tech Stack

### Frontend
- **React** (functional components & hooks)
- **React Router DOM** (routing & protection)
- **GSAP** (animations & smooth scrolling)
- **CSS3** (custom responsive design system)
- **Material Symbols** (icons)

### Backend
- **PHP REST APIs**
- **MySQL** (events, users, bookings)
- Hosted backend (Railway)

### Utilities
- `canvas-confetti` for success feedback
- Browser Geolocation API

---

## 📂 Project Structure
```
src/
├── components/
│ ├── navbar
│ ├── footer
│ ├── loader
│ ├── cursortrail
│
├── pages/
│ ├── Home
│ ├── Events
│ ├── Booking
│ ├── Payments
│ ├── BookingSuccess
│ ├── Login
│ ├── About
│
├── error/
│ ├── NotFound
│ └── Unauthorized
│
├── stylesheets/
│ ├── home.css
│ ├── events.css
│ ├── booking.css
│ ├── payment.css
│ ├── bookingsuccess.css
│ ├── login.css
│ ├── about.css
│ └── layout.css
│
└── App.jsx
```
---

## 🧠 Architectural Highlights

- Clean separation of components, pages, and styles
- Intentional state passing via routes
- No unnecessary global state
- Animations scoped to lifecycle events
- Backend-driven data (no hardcoded mocks)
- UX decisions aligned with real product behavior

---

## 🎓 Academic Context

EventFlow was developed as part of a **Computer Science (AI & ML)** undergraduate program.

The project demonstrates:
- Real-world web application architecture
- Client-server interaction
- UX-driven frontend engineering
- Production-style routing, state handling, and feedback

---

## 🔮 Future Enhancements

- User dashboards
- Booking history
- Event recommendations
- Real payment gateway integration
- Performance optimizations
- Accessibility improvements

---

## 📄 License

This project is intended for **educational and demonstration purposes**.
