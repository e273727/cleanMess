# CLEANMess — Product Website + Backend

## What This Is

CLEANMess is an IoT + AI food and water quality monitoring system designed for college hostel canteens/cafeterias. This project builds the **public product website** with a scrollable, slide-based layout and a **public demo dashboard** showing historical sensor data — all backed by a Next.js API layer serving realistic mock data.

## Core Value

**One thing that must work:** A stunning, scrollable product site that communicates what CLEANMess does, paired with a live demo dashboard that shows real-looking sensor history charts — convincing enough for stakeholders, judges, or potential adopters.

## Context

- **Domain:** IoT water/food quality monitoring for college mess (canteen/cafeteria)
- **Sensors:** pH Electrode, Nephelometric Turbidity Sensor, Electrical Conductivity (EC) Sensor, ORP Electrode (optional), Temperature & Humidity sensor
- **Stage:** Greenfield — no existing codebase
- **Target audience:** Demo visitors, hackathon judges, college administrators
- **Dashboard:** Public demo — no auth required, served with seeded mock data
- **Theme:** Light theme — yellow & green palette; CSS variable architecture enables easy theme switching later

## What We're Building

### Site (Next.js, scroll-snap layout)

Single-page scroll-snap experience with these sections:
1. **Hero / Landing** — tagline, CTA, animated sensor visual
2. **Problem Statement** — why mess food safety matters, spoilage stats
3. **How It Works** — sensor → AI → alert data flow
4. **Features / Tech Stack** — what makes CLEANMess unique
5. **Dashboard Teaser** — inline preview of dashboard capability
6. **About Us** — project mission & background
7. **Contact Us** — contact form / info

### Dashboard (`/dashboard` route)

Full-page data dashboard with historical charts:
- pH trends over time
- Turbidity levels
- Electrical Conductivity readings
- Temperature & Humidity
- ORP (optional, shown if data available)
- Summary cards (current readings, alerts count)
- Date range filter

### Backend (Next.js API routes)

- `/api/sensor-data` — returns mock historical data (all sensor types, time-series)
- `/api/summary` — returns current snapshot / summary stats
- Mock data seeded with realistic patterns (daily fluctuations, occasional spikes for "alerts")

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Scroll-snap multi-section homepage with smooth navigation
- [ ] Hero section with CLEANMess branding and animated visual
- [ ] Problem section with compelling copy and stats
- [ ] How It Works section (3-step sensor → AI → alert flow)
- [ ] Features / Tech Stack section
- [ ] Dashboard teaser section embedded on homepage
- [ ] About Us section
- [ ] Contact Us section with form
- [ ] `/dashboard` route with full historical data charts
- [ ] Charts for: pH, Turbidity, EC, Temperature, Humidity
- [ ] Summary stat cards on dashboard
- [ ] Date range filter on dashboard
- [ ] Next.js API routes serving realistic mock time-series data
- [ ] Light theme with yellow & green palette
- [ ] CSS variable architecture for future theme switching
- [ ] Fully responsive (mobile + desktop)
- [ ] Smooth animations and premium UI feel

### Out of Scope

- Team section — not needed for v1
- Roadmap section — not needed for v1
- Authentication / login — public demo only
- Real IoT sensor integration — mock data only for v1
- Dark mode toggle — architecture supports it, but not implemented in v1
- Admin CMS — content is static for now

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js over plain HTML | Dashboard needs routing, chart libs, API routes — Next.js gives this cleanly | — Pending |
| Light theme (yellow + green) | User's explicit choice; CSS vars enable easy future switching | — Pending |
| Public demo dashboard | No auth complexity; shows off product to any visitor | — Pending |
| Mock data via API routes | No real sensors yet; realistic seeded data is more impressive than static JSON | — Pending |
| No team / roadmap sections | User explicitly removed — not needed for current goals | Decided |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-11 after initialization*
