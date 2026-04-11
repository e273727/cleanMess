# SUMMARY.md — Research Synthesis for CLEANMess

## Stack Recommendation

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Next.js 15** (App Router) | Routing, SSR, API routes in one |
| Charts | **Recharts** | React-first, right-sized for mock data scale |
| Styling | **CSS Variables + CSS Modules** | Theme-switchable from day one |
| Scroll | **Native CSS Scroll Snap** | No dependencies, best performance |
| Mock Data | **Formula-based API routes** | Dynamic, date-filterable, deterministic |
| Animation | **CSS transitions** | Zero overhead; Framer Motion optionally for key moments |

## Key Findings

**Stack:**
- Recharts with `next/dynamic(ssr: false)` is the correct pattern — charts must never be server-rendered
- Native CSS `scroll-snap-type: y mandatory` is the right choice — no external scroll library needed
- Use `100dvh` not `100vh` for snap sections — fixes iOS Safari mobile browser chrome bug
- All colors through CSS variables — theme switching becomes trivial later

**Table Stakes:**
- Summary KPI cards (current reading + status per sensor) must appear at the top of dashboard
- Time-series line charts with safe-range overlays are the core dashboard differentiator
- Date range filter (24h / 7d / 30d) expected on any data dashboard
- Responsive layout non-negotiable

**Watch Out For:**
1. **SSR hydration errors** — `next/dynamic(ssr: false)` on every Recharts component, no exceptions
2. **iOS scroll snap bugs** — Use `100dvh` and `-webkit-overflow-scrolling: touch`
3. **Fake-looking mock data** — Use seeded sine waves with realistic base values + occasional alert spikes
4. **Navbar overlap** — Use `scroll-padding-top` on the snap container from day one

## Sensor Safe Ranges (for chart overlays)

| Sensor | Unit | Safe Min | Safe Max | Alert Threshold |
|--------|------|----------|----------|-----------------|
| pH | pH units | 6.5 | 8.5 | < 6.0 or > 9.0 |
| Turbidity | NTU | 0 | 5 | > 10 |
| Electrical Conductivity | μS/cm | 200 | 800 | > 1200 |
| Temperature | °C | 20 | 40 | > 45 |
| Humidity | % RH | 40 | 80 | > 90 |

## Suggested Phase Order

1. Scaffold (Next.js init, CSS tokens, layout shell) — ~1-2 plans
2. Homepage sections (all 7 scroll-snap sections) — ~3-4 plans
3. Mock data API + Dashboard page — ~3-4 plans
4. Polish (animations, responsive, contact form, tests) — ~2 plans
