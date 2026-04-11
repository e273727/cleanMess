---
phase: 1
slug: scaffold-foundation
status: approved
shadcn_initialized: false
preset: none
created: 2026-04-11
---

# Phase 1 — UI Design Contract
## CLEANMess: Scaffold & Foundation

> Visual and interaction contract for the CLEANMess design system shell.
> This contract governs all styling decisions across all 5 phases.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none (Vanilla CSS + CSS Modules) |
| Preset | not applicable |
| Component library | none |
| Icon library | Lucide React (SVG, tree-shakeable) |
| Font | Inter (Google Fonts) — headings + body |

**Rationale:** CSS Modules + CSS variables is the mandated stack (no Tailwind, no shadcn). Lucide React is the standard for Next.js projects — lightweight, consistent stroke style, IoT/tech icon coverage.

---

## Color System

### Light Theme (`:root`) — Active

| Role | Token | Hex | Usage |
|------|-------|-----|-------|
| **Background** (60%) | `--color-bg` | `#F8FDF4` | Page background — off-white with green tint |
| **Surface** | `--color-surface` | `#FFFFFF` | Cards, panels, navbar |
| **Surface Alt** | `--color-surface-alt` | `#EFF9E8` | Alternating section bg, subtle containers |
| **Primary Green** | `--color-primary` | `#2D8A4E` | Main brand color — CTAs, active states, links |
| **Primary Dark** | `--color-primary-dark` | `#1E6035` | Hover state for primary |
| **Primary Light** | `--color-primary-light` | `#D4F0E0` | Tint backgrounds, badges |
| **Accent Yellow** | `--color-accent` | `#F0B429` | Highlight color — stat counters, icon accents, tags |
| **Accent Dark** | `--color-accent-dark` | `#C9870E` | Hover state for accent |
| **Accent Light** | `--color-accent-light` | `#FEF3C7` | Tint backgrounds for yellow elements |
| **Text Primary** | `--color-text` | `#1A2E1A` | All body copy, headings |
| **Text Secondary** | `--color-text-muted` | `#4A6548` | Subheadings, captions, secondary labels |
| **Text Disabled** | `--color-text-disabled` | `#9DB89A` | Placeholder text, disabled states |
| **Border** | `--color-border` | `#D4E8CE` | Card borders, dividers, input outlines |
| **Border Strong** | `--color-border-strong` | `#A8C8A0` | Focused inputs, active card borders |
| **Destructive** | `--color-danger` | `#DC2626` | Error states, critical alerts |
| **Danger Light** | `--color-danger-light` | `#FEE2E2` | Error badge backgrounds |
| **Warning** | `--color-warning` | `#F59E0B` | Warning sensor status |
| **Warning Light** | `--color-warning-light` | `#FEF3C7` | Warning badge backgrounds |
| **Success** | `--color-success` | `#16A34A` | Good sensor status, success states |
| **Success Light** | `--color-success-light` | `#DCFCE7` | Success badge backgrounds |
| **Overlay** | `--color-overlay` | `rgba(26,46,26,0.5)` | Mobile nav backdrop |

### Dark Theme Hook (`[data-theme="dark"]`) — Stub only (not active in v1)

```css
[data-theme="dark"] {
  --color-bg: #0F1A0F;
  --color-surface: #1A2E1A;
  --color-surface-alt: #1F361F;
  --color-text: #E8F5E0;
  --color-text-muted: #8FBF83;
  /* ... (complete in v2 dark mode phase) */
}
```

### 60-30-10 Distribution

- **60%** `--color-bg` (#F8FDF4) — page background
- **30%** `--color-surface` / `--color-surface-alt` — cards, sections, panels
- **10%** `--color-primary` (#2D8A4E) + `--color-accent` (#F0B429) — CTAs, active states, icons, highlights

**Accent reserved for:** CTA buttons, active nav indicator, stat counter values, icon highlights, badge borders.
Never for: body text, background fills, decorative borders.

---

## Spacing Scale

All spacing via CSS variables on `:root`. Multiples of 4px.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Icon gaps, inline chip padding |
| `--space-sm` | 8px | Compact padding, button icon gap |
| `--space-md` | 16px | Default padding, form field spacing |
| `--space-lg` | 24px | Card padding, nav item spacing |
| `--space-xl` | 32px | Section inner padding top/bottom |
| `--space-2xl` | 48px | Between major elements within a section |
| `--space-3xl` | 64px | Section vertical padding (mobile) |
| `--space-4xl` | 96px | Section vertical padding (desktop) |
| `--space-section` | 100dvh | Scroll-snap section height |

**Exceptions:** Navbar height is fixed at `64px` (not a spacing token — used for `scroll-padding-top`).

---

## Typography

**Font:** Inter (Google Fonts) — loaded via `next/font/google`
**Fallback stack:** `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

| Role | Token | Size | Weight | Line Height | Letter Spacing |
|------|-------|------|--------|-------------|----------------|
| Display | `--text-display` | 56px / 3.5rem | 800 | 1.1 | -0.02em |
| Heading 1 | `--text-h1` | 40px / 2.5rem | 700 | 1.2 | -0.01em |
| Heading 2 | `--text-h2` | 32px / 2rem | 700 | 1.25 | -0.01em |
| Heading 3 | `--text-h3` | 24px / 1.5rem | 600 | 1.3 | 0 |
| Heading 4 | `--text-h4` | 20px / 1.25rem | 600 | 1.4 | 0 |
| Body Large | `--text-lg` | 18px / 1.125rem | 400 | 1.6 | 0 |
| Body | `--text-base` | 16px / 1rem | 400 | 1.6 | 0 |
| Body Small | `--text-sm` | 14px / 0.875rem | 400 | 1.5 | 0 |
| Label | `--text-xs` | 12px / 0.75rem | 500 | 1.4 | 0.04em |
| Mono | `--text-mono` | 14px / 0.875rem | 400 | 1.5 | 0 |

**Mobile scaling:** Display → 36px, H1 → 28px, H2 → 24px (reduced at `max-width: 768px`)

---

## Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 6px | Buttons, badges, input fields |
| `--radius-md` | 12px | Cards, panels |
| `--radius-lg` | 20px | Feature cards, section containers |
| `--radius-xl` | 32px | Hero pill labels, large CTA buttons |
| `--radius-full` | 9999px | Avatar, icon containers, toggle pills |

---

## Shadow Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(45,138,78,0.08)` | Subtle card lift |
| `--shadow-md` | `0 4px 12px rgba(45,138,78,0.12)` | Hover state card lift |
| `--shadow-lg` | `0 8px 32px rgba(45,138,78,0.15)` | Modal, elevated panels |

---

## Layout & Grid

| Context | Grid | Max Width |
|---------|------|-----------|
| Site max | — | 1280px |
| Content sections | 12-col grid | 1100px |
| Navbar | Fixed, full-width | — |
| Cards row (desktop) | 3-col grid | — |
| Cards row (tablet) | 2-col grid | — |
| Cards row (mobile) | 1-col stack | — |

---

## Transition & Animation Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--transition-fast` | `150ms ease` | Hover states, color changes |
| `--transition-base` | `250ms ease` | Button scale, card lift |
| `--transition-slow` | `400ms ease` | Section fade-in, nav slide |
| `--transition-enter` | `600ms cubic-bezier(0.22, 1, 0.36, 1)` | Scroll-into-view entrance |

**Animation patterns:**
- Section entrance: `translateY(24px)` → `translateY(0)` + `opacity: 0` → `1` via `.is-visible` class toggled by IntersectionObserver
- Stat counters: CSS `@keyframes count-up` triggered on `.is-visible`
- No animation for users with `prefers-reduced-motion: reduce`

---

## Scroll-Snap Contract

```css
/* Container — on <main> or the page wrapper */
.snap-container {
  height: 100dvh;               /* dvh fixes iOS Safari */
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  scroll-padding-top: 64px;     /* navbar height */
}

/* Each section */
.snap-section {
  min-height: 100dvh;
  scroll-snap-align: start;
  overflow: hidden;
}
```

**Overflow note:** `min-height` not `height` on sections — allows content to expand on mobile without clipping.

---

## Navbar Design Contract

| Property | Value |
|----------|-------|
| Height | 64px |
| Position | Fixed, `z-index: 100` |
| Background | `--color-surface` with `backdrop-filter: blur(12px)` |
| Border bottom | `1px solid --color-border` |
| Scroll state | Adds `box-shadow: --shadow-sm` after 10px scroll |
| Brand logo | "CLEANMess" wordmark — Inter 700, `--color-primary` with yellow dot accent |
| Nav links | `--text-sm`, `--color-text-muted` → `--color-primary` on active/hover |
| Active indicator | 2px bottom border `--color-primary` on active section link |
| CTA button | "View Dashboard" — filled `--color-primary`, `--radius-sm`, `padding: 8px 16px` |
| Mobile breakpoint | Hamburger at `≤768px` |
| Mobile menu | Full-width overlay panel, slides in from top |

---

## Section Navigation Dots

| Property | Value |
|----------|-------|
| Position | Fixed right side, vertically centered |
| Size | 8px circles (active: 10px, primary color) |
| Spacing | 12px between dots |
| Tooltip | Section name on hover |
| Visibility | Hidden on mobile (< 768px) |

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Site title | "CLEANMess — Know What's In Your Mess" |
| Meta description | "AI-powered food and water quality monitoring for college canteen safety. Real-time sensor alerts, historical trends, instant incident reporting." |
| Navbar logo | "CLEANMess" |
| Navbar CTA | "View Dashboard" |
| Primary hero CTA | "See Live Data →" |
| Secondary hero CTA | "Learn How It Works" |
| Error state heading | "Something went wrong" |
| Error state body | "We couldn't load the data. Try refreshing the page." |
| Empty state heading | "No data available" |
| Empty state body | "Sensor data will appear here once the system is connected." |
| 404 heading | "Page Not Found" |
| 404 body | "The page you're looking for doesn't exist. Go back to home." |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| npm (official) | `lucide-react`, `next`, `react`, `recharts` | None required |
| Google Fonts (CDN) | Inter | None required — via `next/font/google` |

No third-party UI registries used. All components built from scratch with CSS Modules.

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS
- [x] Dimension 2 Visuals: PASS
- [x] Dimension 3 Color: PASS
- [x] Dimension 4 Typography: PASS
- [x] Dimension 5 Spacing: PASS
- [x] Dimension 6 Registry Safety: PASS

**Approval:** approved 2026-04-11
