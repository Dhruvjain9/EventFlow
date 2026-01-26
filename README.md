# 🚀 EventFlow

EventFlow is a **full-stack event discovery and booking platform** built as a personal project to demonstrate real-world application architecture, frontend–backend integration, and end-to-end user flow handling.

This repository represents the **v1.0 MVP release**, delivering a complete and usable system rather than a prototype or UI mock.

---

## ✨ What Has Been Implemented (v1.0)

### 1. Home / Landing Page

* Fully designed landing page acting as the main entry point.
* Introduces the platform and directs users toward event exploration.

---

### 2. Events Listing Page

* Dedicated events page for browsing available events.
* Supports **multi-level filtering** based on:

  * City
  * Price
  * Date
* Enables efficient discovery and realistic user interaction.

---

### 3. Booking System (Core Feature)

#### Booking Page

* Interactive booking form built with controlled React components.
* Users can book **up to a maximum of 10 tickets per event**.
* Input validation to ensure clean and intentional submissions.

#### Booking Success Page

* Dedicated confirmation page shown after a successful booking.
* Provides clear feedback and completes the booking flow.

---

### 4. Backend Integration & Data Flow

* Frontend (React) connected to a **MySQL database (XAMPP)**.
* Backend implemented using **PHP REST APIs**.
* REST endpoints handle:

  * Fetching events
  * Filtering events by city and other criteria
  * Supporting dynamic frontend data rendering
* Clear separation between frontend UI, backend logic, and data layer.

---

### 5. Error Handling

* Custom **404 – Page Not Found** implemented.
* Gracefully handles invalid or unknown routes while maintaining UI consistency.

---

### 6. Navigation & Routing

* Client-side routing implemented using React Router.
* Seamless navigation between:

  * Home
  * Events
  * Booking
  * Booking Success
  * 404 Page

---

### 7. UI Design & Theming

* Application styled using a **consistent color theme pattern**.
* Unified visual identity across:

  * Navigation bar
  * Pages
  * Forms
  * Interactive components
* Focus on clarity, contrast, and usability.

---

## 🛠 Tech Stack

### Frontend

* React
* React Router
* CSS (modular + global styles)

### Backend

* PHP (REST API)
* MySQL (XAMPP)

---

## 📁 Project Structure (High-Level)

```
/src
  /error        → Error page
  /pages        → Home, Events, Booking, Success
  /stylesheets  → Global & page-level styles
/api            → PHP REST API endpoints
```

---

## ⚙️ Local Setup (Basic)

1. Clone the repository
2. Install frontend dependencies

   ```bash
   npm install
   npm start
   ```
3. Set up XAMPP and start **Apache + MySQL**
4. Configure the MySQL database
5. Place PHP API files in the server directory
6. Update API URLs if needed

---

## 📦 Versioning

* Current release: **v1.0.0**
* This version represents a complete MVP with real backend connectivity.

---

## 🔮 Planned Enhancements

* User authentication
* Admin dashboard for event management
* Payment gateway integration
* Improved validation and error messaging

---

## 🧠 Purpose of This Project

This project was built to:

* Practice full-stack development
* Implement real frontend–backend communication
* Design a complete user journey
* Demonstrate production-style project structure

---

## 📜 License

This project is for personal and educational use.
