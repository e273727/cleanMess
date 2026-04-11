# REQUIREMENTS.md — CLEANMess v1

## v1 Requirements

### SCAFFOLD — Project Foundation
- [ ] **SCAF-01**: Next.js 15 (App Router) project initialized with TypeScript
- [ ] **SCAF-02**: CSS variable design system defined (yellow + green light theme, semantic token naming)
- [ ] **SCAF-03**: Global layout with fixed navbar (section links + Dashboard CTA button)
- [ ] **SCAF-04**: Root scroll-snap container (`scroll-snap-type: y mandatory`, `100dvh` sections)
- [ ] **SCAF-05**: `scroll-padding-top` set to navbar height to prevent overlap on section jump
- [ ] **SCAF-06**: Footer component

### NAV — Navigation
- [ ] **NAV-01**: Navbar shows active section via IntersectionObserver (dot/highlight updates on scroll)
- [ ] **NAV-02**: Navbar links scroll smoothly to target section on click
- [ ] **NAV-03**: Dashboard CTA button in navbar navigates to `/dashboard`
- [ ] **NAV-04**: Navbar is responsive (collapses to hamburger on mobile)

### HERO — Hero Section
- [ ] **HERO-01**: Hero section displays CLEANMess tagline and sub-headline
- [ ] **HERO-02**: Hero has a primary CTA button ("View Dashboard" or "See It In Action")
- [ ] **HERO-03**: Hero has an animated visual (sensor waveform, data orb, or illustration)
- [ ] **HERO-04**: Hero section fills full viewport height and looks premium

### PROB — Problem Section
- [ ] **PROB-01**: Problem section explains why mess food safety matters
- [ ] **PROB-02**: Problem section includes at least 3 animated stat counters (e.g., food waste kg/year, illness incidents)
- [ ] **PROB-03**: Stats count up when section scrolls into view

### HOW — How It Works Section
- [ ] **HOW-01**: Section shows a 3-step flow: Sense → Analyze → Alert
- [ ] **HOW-02**: Each step has an icon and short description
- [ ] **HOW-03**: Steps animate in sequentially on scroll-into-view

### FEAT — Features / Tech Stack Section
- [ ] **FEAT-01**: Section displays at least 4 feature cards (pH monitoring, turbidity, EC, AI alerting)
- [ ] **FEAT-02**: Feature cards include icons and one-line descriptions
- [ ] **FEAT-03**: Tech stack logos / badges shown (sensor types, Next.js, etc.)

### TEAS — Dashboard Teaser Section
- [ ] **TEAS-01**: Section embeds a mini live-looking chart (single sensor, last 7 days)
- [ ] **TEAS-02**: Teaser chart fetches from `/api/sensor-data` (real API, not static)
- [ ] **TEAS-03**: Section has CTA: "Explore Full Dashboard →"

### ABOUT — About Us Section
- [ ] **ABOUT-01**: Section explains CLEANMess mission and origin (college mess problem)
- [ ] **ABOUT-02**: Section has visually engaging layout (not just a wall of text)

### CONTACT — Contact Us Section
- [ ] **CONTACT-01**: Contact form with name, email, and message fields
- [ ] **CONTACT-02**: Form has client-side validation (required fields, email format)
- [ ] **CONTACT-03**: Form shows loading state on submit
- [ ] **CONTACT-04**: Form shows success or error message after submission
- [ ] **CONTACT-05**: Form submits via Next.js API route (mailto fallback acceptable)

### API — Backend / Mock Data API
- [ ] **API-01**: `GET /api/sensor-data` returns time-series data for all sensors (pH, Turbidity, EC, Temp, Humidity)
- [ ] **API-02**: API accepts `?range=24h|7d|30d` query param to filter data
- [ ] **API-03**: API accepts `?sensor=ph|turbidity|ec|temperature|humidity|all` query param
- [ ] **API-04**: Mock data uses seeded sine-wave + noise generation (consistent across page loads)
- [ ] **API-05**: Mock data values stay within realistic sensor ranges (per SUMMARY.md safe range table)
- [ ] **API-06**: Mock data includes ~3–5 deliberate threshold-crossing "alert" events per 30-day period
- [ ] **API-07**: `GET /api/summary` returns latest reading per sensor + total alert count

### DASH — Dashboard Page (`/dashboard`)
- [ ] **DASH-01**: Dashboard page has summary stat cards (one per sensor: current value + status badge)
- [ ] **DASH-02**: Status badge shows Good / Warning / Critical based on safe-range thresholds
- [ ] **DASH-03**: Dashboard has a date range filter (24h / 7d / 30d) that controls all charts
- [ ] **DASH-04**: Dashboard shows one time-series chart per sensor (5 charts total)
- [ ] **DASH-05**: Charts rendered with Recharts via `next/dynamic(ssr: false)`
- [ ] **DASH-06**: Each chart has a shaded safe-range overlay band
- [ ] **DASH-07**: Charts show tooltip with exact value + timestamp on hover
- [ ] **DASH-08**: Dashboard has an Alert History log table (timestamp, sensor, value, severity)
- [ ] **DASH-09**: Dashboard has a sensor correlation hint callout (hardcoded insight for demo)
- [ ] **DASH-10**: Dashboard is fully responsive (cards + charts stack on mobile)

### STYLE — Design & UX
- [ ] **STYLE-01**: Light theme with yellow + green palette applied consistently across all pages
- [ ] **STYLE-02**: All colors use CSS variables (no hardcoded hex values in components)
- [ ] **STYLE-03**: CSS variable architecture supports future theme switching (`[data-theme="dark"]` hook)
- [ ] **STYLE-04**: Typography uses a premium Google Font (e.g., Inter or Outfit)
- [ ] **STYLE-05**: Smooth scroll-snap transitions between homepage sections
- [ ] **STYLE-06**: Section entrance animations on scroll-into-view (subtle, not distracting)
- [ ] **STYLE-07**: Site is fully responsive on mobile, tablet, and desktop
- [ ] **STYLE-08**: All interactive elements have hover states + cursor feedback

---

## v2 Requirements (Deferred)

- Real IoT sensor integration (WebSocket or MQTT)
- Authentication / protected dashboard
- Dark mode toggle
- Admin CMS for content
- Export data to CSV/PDF
- Team section
- Roadmap section

---

## Out of Scope

- Real-time sensor streaming — demo uses historical mock data only
- Authentication — public demo, no login needed
- Multi-mess / multi-location support — single canteen
- Native mobile app — web-responsive only
- GIS / map view — single location, no spatial relevance
- Team section — removed by user decision
- Roadmap section — removed by user decision

---

## Traceability

| Requirement | Phase |
|-------------|-------|
| SCAF-01 to SCAF-06 | Phase 1 |
| NAV-01 to NAV-04 | Phase 1 |
| HERO-01 to HERO-04 | Phase 2 |
| PROB-01 to PROB-03 | Phase 2 |
| HOW-01 to HOW-03 | Phase 2 |
| FEAT-01 to FEAT-03 | Phase 2 |
| ABOUT-01 to ABOUT-02 | Phase 2 |
| CONTACT-01 to CONTACT-05 | Phase 2 |
| API-01 to API-07 | Phase 3 |
| TEAS-01 to TEAS-03 | Phase 3 |
| DASH-01 to DASH-10 | Phase 4 |
| STYLE-01 to STYLE-08 | Phase 5 |
