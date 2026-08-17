# 🪐 AstroLive 2.0 — Comprehensive Platform & Commerce Ecosystem

> ### **Where Celestial Guidance Meets Digital Convenience & Event Commerce.**
> **The All-in-One Astrology, Prediction Tracking, Personal Pattern Engine & Muhurat Commerce Platform.**

[![Hackathon Submission](https://img.shields.io/badge/Hackathon-AstroLive_2.0-amber?style=for-the-badge&logo=stars)](http://localhost:5173/)
[![Tech Stack](https://img.shields.io/badge/React_19-Vite_8-purple?style=for-the-badge&logo=react)](https://react.dev)
[![Styling](https://img.shields.io/badge/Tailwind_CSS-Cosmic_Theme-blue?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Status](https://img.shields.io/badge/Status-Production_Ready-emerald?style=for-the-badge)](http://localhost:5173/)

---

## 📌 Executive Summary & Core Platform Vision

Traditional astrology platforms focus on one-off, transactional consultations (*"Pay per minute → Ask question → Disconnect"*). 

**AstroLive 2.0** reimagines astrology as a continuous, verified **Life Planning Engine & Event Commerce Ecosystem**:

1. **LIVE ASTROLOGER CONSULTATIONS:** Real-time consultations with verified Vedic masters, KP specialists, and Tarot intuitively matched to user goals.
2. **ASTROPROOF GUARANTEE LEDGER:** Timestamped prediction tracking with automated wallet protection credits if predictions do not occur.
3. **PERSONAL PATTERNS & ASTRO JOURNEY:** Life event journaling paired with an AI transit pattern recognition engine.
4. **MUHURAT MARKETPLACE:** Evolving astrology from timing (*WHEN*) to event planning (*WHAT*) and vendor booking (*WHO*).
5. **ASTRO GUARD & DAILY RITUALS:** High-stakes event alerts, streak check-ins, reward spins, and AstroCoins gamification.
6. **ASTROLIVE PLUS / PREMIUM SUBSCRIPTIONS:** Subscription tiers providing monthly consultation credits, discounts, and VIP priority.

---

## 🚀 Judge Quick-Start Guide (End-to-End Walkthrough)

We have pre-configured interactive fast-track entry points throughout the application for judges:

### 1. Launch the Application
```bash
git clone https://github.com/SaanyaGarg01/astrolive-site.git
cd astrolive-site
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### 2. Recommended 5-Step Evaluation Path

```
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│ 1. Home & Live Call     │ ──▶ │ 2. Consultation Summary │ ──▶ │ 3. AstroProof Ledger    │
│    Explore Astrologers  │     │    AI Synthesis & Bridge│     │    Guarantee Protection │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
                                                                             │
┌─────────────────────────┐     ┌─────────────────────────┐                  │
│ 5. Business Dashboard   │ ◀── │ 4. Muhurat Marketplace  │ ◄────────────────┘
│    GMV, Revenue & LTV   │     │    Vendors & Booking    │
└─────────────────────────┘     └─────────────────────────┘
```

#### Step 1: Live Astrologer Discovery & Call Simulation
* Click **`ASTROLOGY`** in top nav.
* Select an online astrologer (*e.g., Acharya Priya Sharma*).
* Click **`Call Now`** or **`Chat Now`** to trigger the simulated consultation call modal with live per-minute countdown.

#### Step 2: Consultation Summary & Commerce Bridge
* End the call to land on **`ConsultationSummaryPage`**.
* Inspect the AI-generated key discussion points, logged prediction, and the **"Your Recommended Muhurat is Ready"** section.
* Click **`Explore Vendors →`** to bridge directly into Muhurat Marketplace.

#### Step 3: Muhurat Marketplace & Date-Matched Vendors
* Click **`⚡ 3-Min Judge Demo`** at the top right of the banner.
* Explore date-matched vendors available on **14 November 2026** in Delhi (*Venues, Caterers, Photographers, Decorators, Vedic Priests*).
* Click **`+ Add to Event`** on any vendor card.
* Click **`🛍️ My Event`** to view the progress checklist (**3 / 7 booked**), budget summary (**🟢 Within budget**), and click **`Apply Suggestions`** on the **AI Budget Optimizer**.
* Click **`Proceed to Book Vendors`** → **`Pay & Confirm Booking`** to test the checkout flow and receive **+100 AstroCoins**!

#### Step 4: AstroProof Prediction Guarantee Ledger
* Click **`🔮 ASTROPROOF`** in top nav.
* View timestamped predictions with cryptographic hash IDs (*e.g. 0x8f9a2c3b*).
* Click **`Claim AstroProof Protection`** on eligible pending predictions to receive instant wallet credits (**+₹20**)!

#### Step 5: Executive Business & Revenue Analytics
* Click **`📊 Business Dashboard`** inside Muhurat Marketplace or **`⚙️ ADMIN`** in top nav.
* Inspect real-time business metrics: **GMV ₹24.5L**, **Commission Revenue ₹2.14L**, **Active Subscriptions**, and **Revenue Distribution**.

---

## 🏛️ Comprehensive Core Modules & Architecture

```
                                 ┌─────────────────────────────────┐
                                 │       ASTROLIVE 2.0 PLATFORM    │
                                 └────────────────┬────────────────┘
                                                  │
         ┌───────────────────┬────────────────────┼───────────────────┬───────────────────┐
         │                   │                    │                   │                   │
         ▼                   ▼                    ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌───────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  ASTROLOGY LIVE │ │   ASTROPROOF    │ │ MUHURAT MARKETPLACE│ │ PERSONAL PATTERNS│ │ ASTROLIVE PLUS  │
│  Consultations  │ │  Ledger & Wallet│ │ Date-Matched Vendors│ │ AI Transit Engine│ │ Subscriptions   │
└─────────────────┘ └─────────────────┘ └───────────────────┘ └─────────────────┘ └─────────────────┘
```

### 1. Astrologer Matching & Live Consultations
* **Multi-Domain Filters:** Filter by Vedic, KP System, Numerology, Tarot, Nadi, Prashna, Gemology, and Vastu.
* **Astrologer Profile & Trust Score:** Verified outcome confirmation rate (e.g. *68% confirmation rate, 84% repeat rate*), badges, bio, and customer reviews.
* **Simulated Live Call UI:** Per-minute pricing, live duration counter, topic selector, and audio/video controls.

### 2. AstroProof — Prediction Ledger & Wallet Protection
* **Timestamped Claims:** Astrologers log explicit, verifiable predictions with timeframes (*"Executive offer within 30 days"*).
* **Cryptographic Hashes:** Unique hash IDs generated per prediction (*e.g., 0x8f9a2c3b*).
* **Outcome Reporting:** Users verify predictions (*Verified by User, Partially Verified, Not Occurred*).
* **AstroProof Protection Guarantee:** If a prediction fails within the window, the user can claim automated wallet protection credits (*+₹20*).

### 3. Personal Patterns & Astro Journey Engine
* **Life Journaling:** Users record career shifts, relationship milestones, and financial events.
* **AI Transit Alignment:** Identifies recurring life patterns correlated with planetary transits (*e.g. "Career decisions peak during 10th house Sun-Jupiter transits"*).
* **Reflection Prompts:** Interactive coaching questions to deepen self-awareness.

### 4. Muhurat Marketplace — Event Commerce Ecosystem
* **8 Event Categories:** Weddings (Vivah), Griha Pravesh, Business Launches, Shop Openings, Engagements, Naming Ceremonies, Hawan/Puja, and Custom Events.
* **Date-Matched Vendors:** Displays verified venues, caterers, photographers, decorators, priests, music & makeup artists available on exact Muhurat dates (*"🟢 Available: 14 Nov 2026"*).
* **Event Planner Dashboard:** Category checklist progress bar (*3 / 7 booked*), budget breakdown with target indicator (*🟢 Within budget*), and package recommendations (*Elegant Package ₹4,85,000*).
* **AI Budget Optimization:** Algorithm suggesting vendor swaps to save costs without compromising ratings.
* **Mock Payment Checkout:** Payment simulation with booking IDs (`ML-2026-00042`) and AstroCoins rewards.
* **Vedic Priest Network:** Specialized Pandit booking for authentic ritual execution.

### 5. Astro Guard — High-Stakes Event Protection
* Register upcoming key dates (*job interviews, startup pitches, contract signings*).
* Receive planetary timing window recommendations and automated reminder notifications.

### 6. Daily Ritual & Gamification System
* **7-Day Streak Engine:** Daily check-in tracker awarding AstroCoins.
* **Reward Wheel:** Interactive spin-the-wheel with coin rewards, consultation discounts, and free AI reports.
* **Badges & Achievements:** Achievement unlock system (*10 Predictions, Outcome Reporter, AstroProof Explorer*).

### 7. AstroLive Plus & Premium Subscriptions
* **Tiered Memberships:** FREE, PLUS (*₹199/month*), and PREMIUM (*₹399/month*).
* **Monthly Credits:** 100 credits for Plus, 250 for Premium.
* **Consultation Discounts:** 10% off for Plus, 20% off for Premium.
* **Perks:** Priority astrologer matching, priority vendor recommendations, and extra daily rewards.

### 8. Admin & Business Analytics
* **Executive Metrics:** Tracking DAU (24,580), D7/D30 Retention, ARPU (₹280), Active Subscriptions (12,450), and Revenue Sources.
* **Marketplace Analytics:** GMV ₹24.5L, Marketplace Revenue ₹2.14L, Category Commissions (8% Venue, 7% Catering, 10% Photo, 5% Priest), and Funnel Conversion.
* **B2B Muhurat API Portal:** Licensing documentation for third-party developer API integrations.

---

## 📈 Financial Model & Key Performance Metrics

### Revenue Streams
1. **Human Consultation Fees:** Per-minute billing (58% of platform revenue).
2. **Plus / Premium Subscriptions:** Recurring monthly LTV (27% of platform revenue).
3. **Muhurat Marketplace Commissions:** High-GMV vendor booking share (11% of platform revenue).
4. **B2B API Licensing:** Enterprise integration fees (4% of platform revenue).

### Key Performance Indicators (Illustrative Demo Data)

| Metric | Value | Context |
| :--- | :--- | :--- |
| **Marketplace GMV** | **₹24,50,000** | Total gross transaction value |
| **AstroLive Commission Revenue** | **₹2,14,000** | Net marketplace revenue share |
| **Completed Bookings** | **86 Bookings** | Verified event vendor orders |
| **Vendor Partners** | **124 Vendors** | Verified local business partners |
| **Avg Booking Order Value** | **₹28,500** | Average vendor checkout amount |
| **Consultation → Marketplace** | **18.4%** | Post-consultation commerce conversion |
| **AstroProof Protection Claims** | **12.4%** | Wallet guarantee trigger rate |

---

## 🛠️ Tech Stack & Directory Structure

* **Frontend:** React 19 + Vite 8
* **Styling:** Tailwind CSS v4 (Custom Cosmic Gold & Midnight Palette, Glassmorphism, Micro-animations)
* **Icons & Visuals:** Lucide React, Canvas Confetti
* **State Management:** React Context API (`AstroContext.jsx`, `GamificationContext.jsx`, `NotificationContext.jsx`)
* **Linter & Build:** Oxlint, Vite, Rolldown

```
astrolive-site/
├── public/                     # Static assets & favicons
├── src/
│   ├── assets/                 # Brand images & graphics
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.jsx          # Top pill navigation & logo
│   │   ├── MobileNav.jsx       # Responsive mobile bottom navigation bar
│   │   ├── ConsultationCallModal.jsx
│   │   ├── AstrologerProfileModal.jsx
│   │   ├── AstrologerTrustScore.jsx
│   │   ├── NotificationCenter.jsx
│   │   └── Footer.jsx
│   ├── context/                # Global React context providers
│   │   ├── AstroContext.jsx    # Primary app & marketplace state
│   │   ├── GamificationContext.jsx # Streaks & rewards state
│   │   └── NotificationContext.jsx # Notification alerts state
│   ├── data/                   # Mock datasets & configurations
│   │   ├── mockData.js         # Astrologers, predictions, journey events
│   │   ├── muhuratData.js      # Marketplace vendors, packages, business metrics
│   │   ├── subscriptionConfig.js
│   │   └── gamificationConfig.js
│   ├── pages/                  # Top-level application views
│   │   ├── Home.jsx            # Landing page & feature showcases
│   │   ├── AstrologerMatching.jsx # Astrologer discovery directory
│   │   ├── ConsultationSummaryPage.jsx # Post-call AI synthesis & commerce bridge
│   │   ├── AstroProof.jsx      # Prediction ledger & guarantee wallet
│   │   ├── PersonalPatterns.jsx # Life event timeline & AI pattern engine
│   │   ├── MuhuratMarketplace.jsx # Complete Muhurat Marketplace suite
│   │   ├── AstroGuard.jsx      # High-stakes event alerts
│   │   ├── DailyRitual.jsx     # Streak check-in & reward wheel
│   │   ├── MembershipPage.jsx  # Plus/Premium subscription tiers
│   │   ├── BusinessAnalytics.jsx # Executive business analytics
│   │   ├── AstrologerDashboard.jsx # Astrologer partner portal
│   │   └── B2BMuhuratAPI.jsx   # B2B developer API portal
│   ├── services/               # Analytics & engine utilities
│   ├── App.jsx                 # Central router & state container
│   ├── index.css               # Global CSS & Tailwind design tokens
│   └── main.jsx                # React root entry point
├── README.md                   # Comprehensive project documentation
├── package.json
└── vite.config.js
```

---

## ⚡ Quick Start & Development Setup

### Prerequisites
* Node.js (v18.0 or higher recommended)
* npm or yarn

### Commands

```bash
# 1. Clone the repository
git clone https://github.com/SaanyaGarg01/astrolive-site.git
cd astrolive-site

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build production bundle (Verified 0 Errors)
npm run build
```

---

## 📄 Hackathon Submission Notes

Built for the **AstroLive 2.0** product submission. All Muhurat calculations, vendor listings, availability calendars, financial analytics, and prediction guarantees are fully interactive prototype implementations designed to showcase the complete business vision and user experience.
