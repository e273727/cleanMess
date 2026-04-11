# ROADMAP.md — CLEANMess v1

## Milestone: v1.0 — Product Website + Demo Dashboard

**Goal:** A stunning, scrollable product website with a live demo dashboard showing IoT sensor history for a college mess.

**Total phases:** 5 | **Total requirements:** 46 | **All v1 requirements mapped ✓**

---

## Phase 1: Scaffold & Foundation

**Goal:** Initialize the Next.js project with a solid design system and layout shell. Everything built in later phases depends on this foundation being right.

**Requirements:** SCAF-01, SCAF-02, SCAF-03, SCAF-04, SCAF-05, SCAF-06, NAV-01, NAV-02, NAV-03, NAV-04

**Plans:**
1. Initialize Next.js 15 with App Router + TypeScript + CSS Modules
2. Build CSS variable design system (yellow + green tokens, typography, spacing)
3. Build Navbar (fixed, section links, Dashboard CTA, responsive hamburger, IntersectionObserver active state)
4. Build scroll-snap root layout (100dvh sections, scroll-padding-top, Footer)

**Success Criteria:**
1. `npm run dev` starts without errors; homepage loads at localhost:3000
2. Navbar links scroll smoothly to `#section-id` anchors
3. Active section dot/highlight in navbar updates correctly on scroll
4. On mobile, navbar collapses to hamburger menu
5. CSS variables change the entire site's color by editing `:root` alone

**UI hint:** yes

**Depends on:** —

---

## Phase 2: Homepage Sections

**Goal:** Build all 7 scroll-snap homepage sections with real, compelling content (not placeholders). This is the face of the product.

**Requirements:** HERO-01, HERO-02, HERO-03, HERO-04, PROB-01, PROB-02, PROB-03, HOW-01, HOW-02, HOW-03, FEAT-01, FEAT-02, FEAT-03, ABOUT-01, ABOUT-02, CONTACT-01, CONTACT-02, CONTACT-03, CONTACT-04, CONTACT-05

**Plans:**
1. Hero section (tagline, CTA, animated waveform/sensor visual)
2. Problem section (food safety copy, animated stat counters on scroll)
3. How It Works section (3-step Sense → Analyze → Alert flow with icons)
4. Features & Tech Stack section (feature cards, sensor + stack badges)
5. About Us section (mission, origin story, visual layout)
6. Contact Us section (form, validation, API route, success/error states)

**Success Criteria:**
1. All 7 sections visible by scrolling down the homepage — full snap experience
2. Stat counters in Problem section animate up when scrolled into view
3. How It Works steps animate in sequentially
4. Contact form validates required fields and email format client-side
5. Contact form shows success message after submission
6. Page looks premium on both mobile and desktop

**UI hint:** yes

**Depends on:** Phase 1

---

## Phase 3: Mock Data API & Dashboard Teaser

**Goal:** Build the backend API routes that serve realistic sensor time-series data, and wire up the dashboard teaser section on the homepage.

**Requirements:** API-01, API-02, API-03, API-04, API-05, API-06, API-07, TEAS-01, TEAS-02, TEAS-03

**Plans:**
1. Build mock data generator (seeded sine waves + noise, realistic ranges per sensor, 3–5 alert events per 30 days)
2. Build `GET /api/sensor-data` route (range + sensor query params)
3. Build `GET /api/summary` route (latest reading per sensor + alert count)
4. Build Dashboard Teaser section (mini Recharts line chart, fetches from API, "Explore Full Dashboard" CTA)

**Success Criteria:**
1. `GET /api/sensor-data?range=7d&sensor=all` returns valid JSON with time-stamped readings for all 5 sensors
2. `GET /api/summary` returns current values and total alert count
3. Same API call returns identical data on repeated requests (deterministic seed)
4. pH values stay between 5.5–9.5; turbidity 0–20 NTU; EC 100–1500 μS/cm; temp 20–50°C
5. Dashboard teaser section shows a live chart fetched from the API (not static data)

**UI hint:** yes

**Depends on:** Phase 1

---

## Phase 4: Dashboard Page

**Goal:** Build the full `/dashboard` route with all charts, stat cards, alert log, and date filter — the core demo experience.

**Requirements:** DASH-01, DASH-02, DASH-03, DASH-04, DASH-05, DASH-06, DASH-07, DASH-08, DASH-09, DASH-10

**Plans:**
1. Dashboard page layout (header, filter bar, cards grid, charts grid, alert log)
2. Summary stat cards (value + status badge per sensor, fetches from /api/summary)
3. SensorChart component (Recharts, ssr:false, safe-range overlay, tooltip) — reusable for all 5 sensors
4. Date range filter (24h / 7d / 30d toggle, updates all charts simultaneously)
5. Alert History log table + sensor correlation hint callout

**Success Criteria:**
1. `/dashboard` loads and displays 5 summary cards with correct status badges (Good/Warning/Critical)
2. All 5 sensor time-series charts render without SSR hydration errors
3. Each chart shows a shaded safe-range overlay band
4. Switching date range (24h / 7d / 30d) updates all charts with the correct data window
5. Alert log table shows at least 3 alert entries with timestamps, sensor, and severity
6. Dashboard is usable on mobile (cards and charts stack vertically)

**UI hint:** yes

**Depends on:** Phase 3

---

## Phase 5: Polish, Animations & Responsive QA

**Goal:** Elevate the visual quality to "wow" level — entrance animations, hover states, fine-tuned spacing, cross-browser/device testing, and CSS variable audit for future theme switching.

**Requirements:** STYLE-01, STYLE-02, STYLE-03, STYLE-04, STYLE-05, STYLE-06, STYLE-07, STYLE-08

**Plans:**
1. Section entrance animations (Intersection Observer → CSS class toggle, subtle slide-up/fade-in)
2. Hover states audit (all buttons, cards, nav items, chart tooltips have transitions)
3. Responsive QA pass (mobile 375px, tablet 768px, desktop 1440px — fix all layout issues)
4. CSS variable audit (replace any hardcoded hex values; verify `[data-theme="dark"]` hook is wired up)
5. Performance check (dynamic import audit for chart components, image optimization)

**Success Criteria:**
1. Sections fade/slide in smoothly on first scroll into view
2. All buttons, cards, and interactive elements have visible hover transitions
3. No layout overflow or clipping issues on 375px mobile width
4. Changing `--color-primary` in `:root` updates the entire site correctly
5. No hydration warnings or console errors in the browser
6. Lighthouse performance score ≥ 85 on desktop

**UI hint:** yes

**Depends on:** Phase 2, Phase 4

---

## Backlog (Post-v1)

- **999.1**: Dark mode toggle (CSS variable swap, `[data-theme="dark"]`)
- **999.2**: Real IoT integration (replace mock API with real sensor database)
- **999.3**: Authentication for a private dashboard view
- **999.4**: Data export (CSV/PDF download)
- **999.5**: Team section
- **999.6**: Roadmap section

---

## Requirement Coverage

| Category | Requirements | Phase |
|----------|-------------|-------|
| SCAF (6) | SCAF-01–06 | 1 |
| NAV (4) | NAV-01–04 | 1 |
| HERO (4) | HERO-01–04 | 2 |
| PROB (3) | PROB-01–03 | 2 |
| HOW (3) | HOW-01–03 | 2 |
| FEAT (3) | FEAT-01–03 | 2 |
| ABOUT (2) | ABOUT-01–02 | 2 |
| CONTACT (5) | CONTACT-01–05 | 2 |
| API (7) | API-01–07 | 3 |
| TEAS (3) | TEAS-01–03 | 3 |
| DASH (10) | DASH-01–10 | 4 |
| STYLE (8) | STYLE-01–08 | 5 |
| **Total** | **52** | — |

All v1 requirements covered ✓
