# STACK.md — CLEANMess Technology Stack Research

## Recommended Stack (2025)

### Frontend Framework
- **Next.js 15** (App Router) — Confidence: HIGH
  - Server Components for static landing sections (fast initial load)
  - Client Components only for charts and interactive elements
  - Built-in API routes for mock data backend
  - Dynamic imports (`next/dynamic` with `ssr: false`) required for all chart components

### Charting Library
- **Recharts** — Confidence: HIGH for this use case
  - Why: CLEANMess dashboard uses mock data with ~1,000–5,000 data points max (30-day demo history)
  - SVG-based rendering is fine at this scale — no need for ECharts Canvas overhead
  - React-first, declarative JSX API = faster development
  - Smaller bundle size than ECharts
  - **Use `next/dynamic` with `ssr: false`** to avoid hydration issues
  - Best for: LineChart (trends), AreaChart (fills), BarChart (daily summaries), RadialBar (gauges)
  - Alternative: `echarts-for-react` only if dataset exceeds 10k+ points (not the case here)

### Styling
- **CSS Modules + CSS Variables** — Confidence: HIGH
  - CSS variables for the entire design token system (colors, spacing, radii)
  - Enables one-command theme switching later (swap root variable values)
  - CSS Modules for component isolation
  - No Tailwind (vanilla CSS preferred per project guidelines)

### Scroll Architecture
- **Native CSS Scroll Snap** — Confidence: HIGH
  - `scroll-snap-type: y mandatory` on container + `scroll-snap-align: start` on sections
  - No heavy external library needed (avoid fullpage.js, etc.)
  - Use `IntersectionObserver` in a Client Component for active-section tracking (nav dots)
  - `next/link` with `scroll={false}` for section anchor links

### State Management
- **React useState / useReducer** — Confidence: HIGH
  - Dashboard date filter: local state only
  - No global state manager needed (no auth, no shared state between pages)

### Mock Data Generation
- **Formula-based in API routes** — Confidence: HIGH
  - Sine-wave + noise functions generate realistic sensor oscillations
  - No external DB needed — computed on request, seeded by timestamp for consistency
  - Pattern: base value + sinusoidal drift + random noise clamped to realistic ranges

### Animation
- **CSS transitions + Framer Motion (optional, light use)** — Confidence: MEDIUM
  - Section entrance animations on scroll-into-view
  - Counter animations on stat cards
  - Keep bundle impact minimal — use only where it adds clear WOW factor

### Contact Form
- **Next.js API route + Nodemailer or mailto fallback** — Confidence: MEDIUM
  - Mailto fallback is zero-dependency and works without config
  - Nodemailer + Gmail app password if email delivery needed

## What NOT to Use
- ❌ `fullpage.js` — Paid, heavy, breaks accessibility
- ❌ D3.js directly — Too low-level for a demo site, adds complexity
- ❌ ECharts — Overkill for mock data at this scale; larger bundle
- ❌ Tailwind CSS — Not in project guidelines
- ❌ Redux / Zustand — No cross-component state needed
- ❌ Real-time WebSockets — Not needed for public demo dashboard
