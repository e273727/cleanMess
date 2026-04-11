# PITFALLS.md — CLEANMess Common Mistakes & Prevention

## Pitfall 1: SSR Hydration Errors from Chart Libraries
**Severity:** HIGH — breaks the entire dashboard on first load

**Signs:** `ReferenceError: window is not defined` or hydration mismatch errors in Next.js console

**Prevention:**
- Always use `next/dynamic(() => import('./SensorChart'), { ssr: false })` for every Recharts component
- Never import Recharts at the module level in a Server Component
- **Phase:** Phase 3 (Dashboard) — address from first chart component

---

## Pitfall 2: Scroll Snap Breaking on Mobile Safari
**Severity:** HIGH — site's core UX breaks on iOS

**Signs:** Sections don't snap cleanly; inertia scroll skips sections

**Prevention:**
- Use `-webkit-overflow-scrolling: touch` on the snap container
- Test with `scroll-snap-type: y mandatory` (not `proximity`) for reliable snapping
- Set explicit `height: 100dvh` (dynamic viewport height) instead of `100vh` — fixes iOS browser chrome issue
- **Phase:** Phase 2 (Homepage) — test on mobile during build

---

## Pitfall 3: Chart Re-renders on Every Date Filter Change
**Severity:** MEDIUM — sluggish UX

**Signs:** Charts flash / show loading state every time user changes date range

**Prevention:**
- Memoize chart component with `React.memo`
- Use `useMemo` for computed chart data
- Show skeleton loader during fetch, not a full unmount/remount
- **Phase:** Phase 3 (Dashboard)

---

## Pitfall 4: Mock Data That Looks Fake
**Severity:** MEDIUM — undermines demo credibility

**Signs:** Flat lines, random spikes, values outside realistic ranges

**Prevention:**
- Use sine waves with realistic base values:
  - pH: base 7.2, amplitude ±0.5, noise ±0.1
  - Turbidity: base 3.2 NTU, spikes to 15 NTU after "meal times"
  - EC: base 450 μS/cm, drift over days
  - Temp: base 28°C, daily cycle (higher at meal times)
  - Humidity: base 65%, correlated with temp
- Seed RNG from timestamp so data is **consistent across page loads**
- Include a few deliberate "alerts" (threshold crossings) to tell a story
- **Phase:** Phase 3 (API Routes)

---

## Pitfall 5: Scroll Snap + Fixed Navbar Overlap
**Severity:** MEDIUM — content hidden behind navbar

**Signs:** First section's heading partially hidden under fixed nav

**Prevention:**
- Add `padding-top` equal to navbar height on each section, or
- Use CSS `scroll-padding-top` on the scroll container (cleaner approach)
- **Phase:** Phase 1 (Scaffold)

---

## Pitfall 6: Contact Form With No Feedback
**Severity:** LOW — poor UX

**Signs:** User submits form, nothing happens visually

**Prevention:**
- Show loading state on submit button
- Show success / error message after submission
- Use `mailto:` fallback if no email service configured — always works
- **Phase:** Phase 2 (Homepage sections)

---

## Pitfall 7: CSS Variables Not Scoped Correctly for Theme Switching
**Severity:** LOW — future-proofs the theme toggle

**Signs:** Changing `--color-primary` doesn't update all components

**Prevention:**
- Define ALL color usage through CSS variables (no hardcoded hex values in components)
- Use semantic variable names: `--color-surface`, `--color-on-surface`, `--color-primary`, `--color-accent`
- Light theme defined on `:root`, dark theme overrides on `[data-theme="dark"]`
- **Phase:** Phase 1 (Scaffold) — establish this pattern from day one
