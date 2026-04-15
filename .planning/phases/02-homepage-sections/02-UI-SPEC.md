# Phase 2 — UI Specification

## Design System Reference

All sections use the existing design tokens from Phase 1:
- **Primary Color** (yellow): `var(--color-primary)`
- **Secondary Color** (green): `var(--color-secondary)`
- **Text**: `var(--text-primary)`, `var(--text-secondary)`
- **Backgrounds**: `var(--bg-base)`, `var(--bg-elevated)`
- **Spacing**: 8px unit grid (`8px`, `16px`, `24px`, `32px`, `40px`, etc.)
- **Typography**: Base font from `src/styles/tokens.css`

## Layout Grid

All content sections follow these responsive breakpoints:
- **Mobile**: 375px max-width, 16px padding
- **Tablet**: 768px max-width, 24px padding
- **Desktop**: 1200px max-width, 40px padding

Each section is 100dvh height (scroll-snap-align: start) with centered content.

## Color Palette

| Component | Color | Usage |
|-----------|-------|-------|
| Hero CTA | Primary (yellow) | Button background |
| Hero text | Text Primary | Main copy |
| Problem stats | Secondary (green) | Accent highlights |
| Problem counters | Primary | Animated numbers |
| Features cards | Bg Elevated | Card backgrounds |
| About mission | Primary | Quoted text (large) |
| Contact form inputs | Bg Base | Field backgrounds |
| Contact focus state | Primary | Border/outline |
| Links | Secondary | Text links |
| Hover states | All use opacity: 0.8 | Transitions |

## Typography Scale

| Heading | Size | Weight | Use Case |
|---------|------|--------|----------|
| h1 | 48px–56px | 700 | Page sections, hero tagline |
| h2 | 36px–40px | 700 | Section headings |
| h3 | 24px–28px | 600 | Card titles, step titles |
| Body | 16px–18px | 400 | Paragraphs, descriptions |
| Small | 12px–14px | 400 | Labels, hints, captions |

On mobile, reduce by 1 size level (e.g., h1 → 36px–40px).

## Component Specs

### Buttons
- **Primary Button** (Hero, Contact submit):
  - Background: `var(--color-primary)`
  - Color: Dark text (good contrast)
  - Padding: 12px 24px
  - Border-radius: 4px–8px
  - Hover: opacity 0.85, shadow
  - Transition: 200ms ease-out

- **Secondary Button** (optional):
  - Background: transparent
  - Border: 2px solid `var(--color-secondary)`
  - Padding: 12px 24px

### Cards
- Background: `var(--bg-elevated)`
- Border-radius: 8px
- Padding: 24px
- Box-shadow: 0 2px 8px rgba(0,0,0,0.08)
- Hover: shadow increases to 0 4px 16px rgba(0,0,0,0.12)

### Form Fields
- Background: `var(--bg-base)`
- Border: 1px solid `var(--text-secondary)` @ 0.2 opacity
- Padding: 12px 16px
- Border-radius: 4px
- Font-size: 16px (prevent zoom on iOS)
- Focus: border-color `var(--color-primary)`, outline: none

### Icons
- Size: 24px–48px (context-dependent)
- Stroke-width: 2px (for outline icons)
- Color: `var(--color-secondary)` or primary, inherit from parent

## Animation Guidelines

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Section fade-in | 600ms | ease-out | On scroll into view |
| Stat counter | 1.5–2s | ease-out | On scroll into view |
| Button hover | 200ms | ease-out | On hover/focus |
| Form error shake | 200ms | ease-in-out | On validation error |
| Smooth scroll | 400ms | ease-in-out | Anchor link click |

## Responsive Behavior

### Hero Section
- Desktop: Heading 48px–56px, visual on right
- Mobile: Heading 36px–40px, visual below text

### Problem Stat Cards
- Desktop: 4 cards in a row
- Tablet: 2 cards per row
- Mobile: 1 card per row, stacked

### How It Works Steps
- Desktop: 3 steps horizontal with connectors
- Mobile: 3 steps vertical, numbered

### Features Grid
- Desktop: 3–4 cards per row
- Tablet: 2 cards per row
- Mobile: 1 card per row

### About Two-Column
- Desktop: 50/50 split (text left, image right)
- Mobile: 100% stacked (text on top, image below)

### Contact Form
- Desktop: Single-column form, max-width 600px, centered
- Mobile: Full-width with 16px padding

## Accessibility Checklist

- [ ] All interactive elements are keyboard-accessible
- [ ] Color contrast passes WCAG AA (4.5:1 for normal text)
- [ ] Form labels are associated with inputs (via `htmlFor`)
- [ ] Error messages are associated with fields (aria-describedby)
- [ ] Buttons have clear focus states (not just color)
- [ ] Images have alt text
- [ ] Animations respect `prefers-reduced-motion`

## Success Criteria (Overall)

1. All 7 sections are scrollable and in snap-align sequence
2. No color use is hardcoded; all use CSS variables
3. All interactive elements have visible hover/focus states
4. No console warnings or errors
5. Lighthouse performance score ≥ 85 on desktop
6. Mobile layout (375px) has no overflow or clipping
7. All animations are smooth (60fps—no jank)
