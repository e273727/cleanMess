# ARCHITECTURE.md — CLEANMess System Architecture

## Component Map

```
CleanMess/
├── app/
│   ├── layout.tsx              ← Root layout (fonts, global CSS, metadata)
│   ├── page.tsx                ← Homepage (scroll-snap container, all sections)
│   ├── dashboard/
│   │   └── page.tsx            ← Full dashboard route
│   ├── api/
│   │   ├── sensor-data/
│   │   │   └── route.ts        ← GET: time-series data for all sensors
│   │   └── summary/
│   │       └── route.ts        ← GET: current snapshot + alert count
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          ← Fixed top nav with section links + Dashboard CTA
│   │   └── Footer.tsx
│   ├── sections/               ← Homepage scroll-snap sections
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── DashboardTeaserSection.tsx
│   │   ├── AboutSection.tsx
│   │   └── ContactSection.tsx
│   ├── dashboard/              ← Dashboard page components
│   │   ├── SummaryCards.tsx
│   │   ├── SensorChart.tsx     ← Reusable chart (takes sensor type as prop)
│   │   ├── AlertLog.tsx
│   │   └── DateRangeFilter.tsx
│   └── ui/                     ← Shared primitives
│       ├── StatCounter.tsx
│       ├── Badge.tsx
│       └── SectionDot.tsx      ← Scroll position indicator dots
├── lib/
│   ├── mockData.ts             ← Data generation functions (sine + noise)
│   ├── sensorRanges.ts         ← Safe range constants per sensor type
│   └── utils.ts
└── styles/
    ├── globals.css             ← CSS variables, resets, base styles
    └── tokens.css              ← Design tokens (colors, spacing, radii)
```

## Data Flow

```
Browser → GET /api/sensor-data?range=7d&sensor=all
            ↓
        route.ts: generates time-series via mockData.ts
        (deterministic from date seed → consistent across refreshes)
            ↓
        Response: { sensor: string, readings: [{ timestamp, value }][] }
            ↓
        Dashboard page fetches on mount (useEffect + SWR)
            ↓
        SensorChart renders via Recharts (next/dynamic, ssr:false)
```

## Scroll Snap Implementation

```css
/* Root container on homepage */
.snap-container {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

/* Each section */
.snap-section {
  height: 100vh;
  scroll-snap-align: start;
  overflow: hidden;
}
```

- Intersection Observer watches sections → updates active dot indicator
- Navbar links use anchor IDs with scroll-behavior smooth
- Dashboard is a separate route (`/dashboard`) — no snap on that page

## Build Order (Suggested Phase Sequence)

1. **Scaffold** — Next.js init, global CSS tokens, layout shell, navbar
2. **Homepage sections** — All 7 sections with static content + scroll-snap
3. **Mock data API** — `/api/sensor-data` and `/api/summary` routes
4. **Dashboard page** — Summary cards, charts, date filter, alert log
5. **Polish** — Animations, responsive fixes, contact form, teaser section

## Key Architectural Decisions

| Decision | Why |
|----------|-----|
| API routes for mock data (not static JSON) | Allows date-range filtering; data feels dynamic |
| Deterministic seed by date | Charts look consistent across refreshes (not random) |
| CSS variables for all colors | Theme switching = swap one block of variables |
| One reusable SensorChart component | 5 different sensors, same chart anatomy |
| Separate `/dashboard` route | Clean URL; no scroll-snap interference |
