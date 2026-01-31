# 🎟️ EventFlow (v1.3.1-beta)

EventFlow is a full-stack event discovery and booking platform that allows users to browse events, apply filters, authenticate, and securely book tickets. This branch (`v1.3.1beta`) represents an **active development phase**, where core flows are being refined, bugs are fixed, and the booking experience is extended with a payment step.

---

## 📌 Branch & Versioning Strategy

* **Active Development Branch:** `v1.3.1beta`
* **Version Tag:** v1.3.1-beta
* **Lifecycle Stage:** Ongoing development / beta

All **feature development, refactors, and fixes will continue on this branch**.

The **MVP snapshot** of the application will be created by branching off this work into **`v1.4.3rc` (release candidate)** once the booking and payment flow reaches functional completeness.

In short:

* `v1.3.1beta` → continuous development
* `v1.4.3rc` → MVP freeze / stabilization

---

## ✨ What’s New in v1.3.1-beta

### 🐞 Bug Fixes

* Fixed inconsistencies in the booking flow navigation
* Improved state handling across protected routes
* Resolved edge cases related to direct URL access and refresh behavior

---

### 💳 Payment Flow (New)

A **payment step has been introduced** between booking and booking confirmation.

#### Updated Flow:

```
Events → Booking → Payment → BookingSuccess
```

* Booking page now focuses on **event review and ticket selection**
* User details are no longer re-collected during booking
* Payment page handles payment intent (mock / in-progress)
* Booking success page is accessible **only after payment success**

All routes involved in this flow are protected and guarded.

---

### 🛡️ Enhanced Route Protection

* Protected routes now include:

  * Booking
  * Payment
  * Booking success
* Guards prevent:

  * Manual URL access
  * Skipping steps in the flow
  * Accessing success pages without completing prior steps

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
* Event cards with essential event details
* Navigation into the booking flow

---

### 🔐 Authentication

* User **Sign In** and **Sign Up** functionality
* Token-based authentication
* Persistent login using local storage
* Authentication state shared across the application

---

### 🎟️ Booking System (Refined)

* Booking flow tied directly to selected events
* Ticket quantity selection with limits
* Booking linked to authenticated users
* Backend booking submission with validation

---

### 💳 Payment Page

* Dedicated payment step between booking and confirmation
* Order summary displayed before payment
* Flow designed to support real payment gateway integration
* Payment success required to proceed

---

### ✅ Booking Confirmation

* Dedicated booking success page
* Displays booking ID and event summary
* Guarded against refresh and direct access

---

### 🎨 UI / UX

* Consistent design language across pages
* Structured layouts for:

  * Authentication
  * Booking
  * Payment
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
* Event retrieval and booking APIs

---

## 🧱 Project Structure (High Level)

* `Home` – Landing page and feature highlights
* `Events` – Event listing and filtering
* `Login` – Authentication (sign in / sign up)
* `Booking` – Event review and ticket selection
* `Payment` – Payment step (beta)
* `BookingSuccess` – Booking confirmation
* `About` – Project and author overview

---

## 🧪 Stability & Reliability

* Strong route-level access control
* Defensive UI guards for multi-step flows
* Improved backend validation for booking requests

---

## ⚠️ Known Limitations (Beta)

* Payment integration is currently mocked / in-progress
* No user dashboard or booking history page yet
* Error pages (401 / 403 / 408 / 500) are planned but not finalized
* Backend authorization will continue to be hardened

---

## 📄 Summary

The **v1.3.1-beta** branch focuses on stabilizing and extending the booking experience by introducing a payment step and refining navigation and route protection. It represents an important transition from a basic booking flow to a more realistic, production-oriented architecture.

All work on this branch is part of the beta development cycle and will culminate in a **v1.4.3 release candidate (rc)** once the payment and flow logic are finalized.
