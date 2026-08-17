# 🪔 AstroLive 2.0 — Muhurat Marketplace

> ### **“Find the right time. Plan the perfect event.”**
> **From Astrology Guidance to an Event Commerce Ecosystem.**

[![Hackathon Feature](https://img.shields.io/badge/Hackathon-Muhurat_Marketplace-amber?style=for-the-badge&logo=stars)](http://localhost:5173/)
[![Tech Stack](https://img.shields.io/badge/React_19-Vite_8-purple?style=for-the-badge&logo=react)](https://react.dev)
[![Styling](https://img.shields.io/badge/Tailwind_CSS-Cosmic_Theme-blue?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Status](https://img.shields.io/badge/Status-Production_Ready-emerald?style=for-the-badge)](http://localhost:5173/)

---

## 🌟 Executive Summary & Core USP

Most astrology platforms only answer **WHEN** (*"What is the auspicious time for my wedding?"*). 

**AstroLive 2.0** introduces **Muhurat Marketplace**, evolving AstroLive from a single-session consultation tool into a high-GMV **Event Commerce Ecosystem**:

* **WHEN (Auspicious Timing):** Vedic Nakshatra and Shubh Choghadiya calculation engine.
* **WHAT (Event Planning):** Checklist progress engine, budget management, and AI budget optimization.
* **WHO (Vendor Execution):** Date-matched booking marketplace for verified local Venues, Caterers, Photographers, Decorators, and Vedic Priests.

```
USER NEEDS AUSPICIOUS DATE
          │
          ▼
ASTROLIVE CALCULATES MUHURAT (e.g. 14 Nov 2026, 9:12 AM – 11:05 AM)
          │
          ▼
DATE-MATCHED VENDOR DISCOVERY (Shows vendors available for that exact date)
          │
          ▼
EVENT PLANNER CART & CHECKLIST (Venue + Catering + Photography + Pandit)
          │
          ▼
CONFIRMED VENDOR BOOKING → REWARDS (+100 AstroCoins)
          │
          ▼
ASTROLIVE EARNS MARKETPLACE COMMISSION (8% Venue, 7% Catering, 10% Photo, 5% Priest)
```

---

## 🚀 3-Minute Fast-Track Guide for Judges

We built a **1-Click Demo Fast-Track** directly into the application header for effortless evaluation:

1. **Start the App:** Open [http://localhost:5173](http://localhost:5173) in your browser.
2. **Open Marketplace:** Click **`📅 MUHURAT MARKETPLACE`** in the top navigation bar.
3. **Click Judge Fast-Track:** Click the **`⚡ 3-Min Judge Demo`** button at the top right of the banner. This pre-loads a demo Wedding event for **14 November 2026** in Delhi.
4. **Explore Date-Matched Vendors:** See verified Venues, Caterers, Photographers, and Priests available on **14 Nov 2026**.
5. **View Event Cart & Checklist:** Click **`🛍️ My Event`** to see:
   - Event progress checklist (**3 / 7 booked**).
   - Budget summary (**₹4,40,000 within budget**).
   - **AI Budget Optimization** tool (*Save ₹35,000*).
6. **Execute Mock Booking:** Click **`Proceed to Book Vendors`** → **`Pay & Confirm Booking`**:
   - Generates instant Booking ID (`ML-2026-00042`).
   - Grants **+100 AstroCoins** reward.
7. **View Business Revenue Dashboard:** Click **`📊 Business Dashboard`** tab to inspect:
   - **Marketplace GMV:** ₹24,50,000
   - **AstroLive Revenue:** ₹2,14,000
   - **Category Commission Rates** (8% Venue, 7% Catering, 10% Photo, 5% Priest).
   - **Conversion Funnel Analytics** (1,000 requests → 86 completed bookings).
   - **Interactive Revenue Flywheel**.

---

## ✨ Core Feature Highlights

### 1. Event Type & Muhurat Preference Setup (`/muhurat/setup`)
* Supports **8 Core Life Events**:
  * 💍 Wedding (Vivah)
  * 🏠 Griha Pravesh (Housewarming)
  * 💼 Business Launch
  * 🏪 Shop Opening
  * 💐 Engagement (Sagai)
  * 👶 Naming Ceremony (Namkaran)
  * 🛕 Religious Ceremony (Hawan / Puja)
  * ✨ Other Life Events
* **Location Selection:** Search and filter by cities (Delhi, Mumbai, Bengaluru, Jaipur, Agra, Lucknow, Chandigarh, Hyderabad, etc.).
* **Preferences:** Date range, guest count pills (50, 100, 250, 500, 1000+), budget pills (₹1–2L, ₹2–5L, ₹5–10L, ₹10L+), and special requirements.

### 2. Multi-Step Calculation Loader & Results Page (`/muhurat/results`)
* **Animated Progress Loader:** Simulates 4-step planetary calculation (*Analyzing event type → Checking dates → Calculating time windows → Matching vendors*).
* **Recommended Dates:** Displays auspicious date cards (e.g. *Saturday, 14 November 2026 | 9:12 AM – 11:05 AM | 🟢 Highly Recommended | 98% Match score*).
* **Prototype Disclaimer:** Transparently indicates prototype calculation for hackathon demonstration.

### 3. Date-Matched Vendor Marketplace (`/muhurat/vendors`)
* **Date-Availability Matching:** Displays vendors verified available for the user's exact selected Muhurat window (*"🟢 Available: 14 Nov 2026"*).
* **11 Service Categories:** Venues, Caterers, Photographers, Videographers, Decorators, Priests/Pandits, Music & DJ, Makeup Artists, Bridal Wear, Transport, Event Gifts.
* **Rich Vendor Cards:** Verified badges, rating & review counts, capacity, starting prices, service tags, match rationale (*"Matches traditional celebratory visual theme"*), and interactive detail popups.
* **Interactive Availability Calendar:** Mini calendar displaying exact date status.

### 4. Event Planner Cart & Progress Checklist (`/muhurat/my-event`)
* **Checklist Tracker:** Visual progress bar (e.g. *3 / 7 categories booked*) with quick action buttons for missing services (*"Still need: Decorator, Priest, DJ"*).
* **Budget Summary:** Real-time cost breakdown (Subtotal + 18% GST = Total) compared against target budget with status pill (**🟢 Within budget**).
* **AI Budget Optimization:** One-click tool that analyzes cart items and suggests vendor swaps to reduce total cost while maintaining high ratings.
* **Package Recommendations:** All-in-one curated bundles (*Elegant Wedding Package - ₹4,85,000*, *Premium Royal Package - ₹8,50,000*).

### 5. Priest & Astrologer Integration
* Bridges the core astrology product with event execution by featuring top-rated Vedic Pandits (*Pandit Rajesh - 15+ Yrs Exp, Acharya Vidyadhar Shastri*) for Vivah Sanskar and Hawan rites.

### 6. Post-Consultation Commerce Bridge (`/summary`)
* Seamless transition from astrologer calls directly into the marketplace: after a consultation, `ConsultationSummaryPage.jsx` displays *"Your Recommended Muhurat is Ready"* with quick buttons (*Find Venue, Find Caterer, Find Photographer, Find Priest*).

### 7. Executive Business & Revenue Dashboard (`/business/muhurat`)
* **Financial Metrics:**
  * **GMV:** ₹24.5 Lakhs
  * **Bookings:** 86
  * **Marketplace Revenue:** ₹2.14 Lakhs
  * **Avg Order Value:** ₹28,500
  * **Consultation → Marketplace Conversion:** 18.4%
* **Commission Model Breakdown:**
  * Venues: **8%**
  * Catering: **7%**
  * Photography: **10%**
  * Decoration: **10%**
  * Priests: **5%**
* **Funnel Analytics:** Step-by-step conversion tracking (*1,000 Muhurat Requests → 780 View Dates → 520 View Vendors → 240 Add Vendors → 120 Booking Requests → 86 Completed*).
* **Interactive Revenue Flywheel:** Visual diagram of recurring lifetime value.

### 8. Vendor Portal & Onboarding (`/vendor/dashboard`)
* Vendor partner portal with upcoming booking views and a **"Become an AstroLive Partner"** registration form.

### 9. AI Event Assistant Chatbot
* Floating conversational AI assistant providing real-time guidance on event requirements and budget caps.

---

## 📊 Business Model & Revenue Flywheel

```
┌─────────────────────────┐
│ Astrologer Consultation │ ──▶ Pay consultation fee (e.g. ₹20/min)
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   Muhurat Calculation   │ ──▶ Auspicious date recommendation
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Date-Matched Vendors    │ ──▶ Venue, Catering, Media, Priest
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Vendor Booking & GMV    │ ──▶ High-ticket transactional checkout (e.g. ₹4.5L total)
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Marketplace Commission  │ ──▶ AstroLive earns 5% – 10% commission (₹25,000 - ₹45,000)
└─────────────────────────┘
```

---

## 🛠️ Tech Stack & Architecture

* **Frontend Framework:** React 19 + Vite 8
* **Styling & Design System:** Tailwind CSS v4 (Custom Cosmic Gold & Deep Midnight Palette, Glassmorphism, Micro-animations)
* **Icons & Visuals:** Lucide React, Canvas Confetti
* **State Management:** React Context API (`AstroContext.jsx`, `GamificationContext.jsx`)
* **Build System:** Vite & Rolldown

---

## ⚡ Quick Start Instructions

### Prerequisites
* Node.js 18+ installed on your machine.

### Installation & Execution

1. **Clone & Install Dependencies:**
   ```bash
   git clone https://github.com/SaanyaGarg01/astrolive-site.git
   cd astrolive-site
   npm install
   ```

2. **Run Local Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Production Build Verification:**
   ```bash
   npm run build
   ```

---

## 📄 License & Acknowledgments

Built for the hackathon presentation of **AstroLive 2.0**. All mock data, Muhurat date calculations, vendor listings, and financial metrics are illustrative prototype representations.
