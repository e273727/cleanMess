# Phase 2.3: How It Works Section

## Objective
Simplify the CLEANMess value chain into a 3-step visual flow: Sense → Analyze → Alert. Each step should have an icon, description, and optional animation as it scrolls into view.

## Requirements Addressed
- HOW-01: How It Works section exists
- HOW-02: 3-step flow clearly visualized (Sense, Analyze, Alert)
- HOW-03: Each step has descriptive text and visual

## Component Structure
```
src/app/page.tsx
  └─ HowItWorksSection component
     ├─ Heading ("How It Works")
     ├─ StepsContainer (flex row, responsive)
     │  ├─ Step (1)
     │  │  ├─ Icon (sensor/IoT)
     │  │  ├─ Title ("Sense")
     │  │  └─ Description (text)
     │  ├─ Arrow (connector, hidden on mobile)
     │  ├─ Step (2)
     │  │  ├─ Icon (brain/AI)
     │  │  ├─ Title ("Analyze")
     │  │  └─ Description (text)
     │  ├─ Arrow (connector, hidden on mobile)
     │  └─ Step (3)
     │     ├─ Icon (alert/notification)
     │     ├─ Title ("Alert")
     │     └─ Description (text)
     └─ Optional: supporting image or diagram
```

## Content Guidelines
- **Step 1 — Sense**: "IoT sensors continuously monitor pH, turbidity, temperature, and conductivity in real-time."
- **Step 2 — Analyze**: "AI algorithms detect anomalies and predict safety issues before they happen."
- **Step 3 — Alert**: "Instant notifications to staff with recommended actions and sensor data snapshots."

## Technical Details
- Use CSS Modules for layout and responsive design
- Icons: Use SVG or Lucide React icons (https://lucide.dev)
- Responsive: 1 col on mobile (stacked steps), 3 cols on desktop (side-by-side with connectors)
- Arrow connectors: CSS borders or SVG (hide on mobile)
- Optional: Stagger animation — each step fades/slides in sequentially on scroll

## Animation Implementation
- Use Intersection Observer to detect when section enters view
- Stagger delay: 100–200ms between each step animation
- Animation: fade-in + slide-up (CSS transition or Framer Motion)

## Success Criteria
1. All 3 steps visible and legible on mobile (375px) and desktop (1440px)
2. Icons are clear and semantically match the step (sensor, brain, alert)
3. On desktop, horizontal connectors (arrows) guide flow visually
4. On mobile, steps stack vertically with clear numbering or visual hierarchy
5. Optional animations are smooth and don't cause layout shift
6. Text is concise and action-oriented (not tech jargon)

## Files to Create/Edit
- [ ] Create `src/components/sections/HowItWorksSection.tsx`
- [ ] Create `src/components/sections/HowItWorksSection.module.css`
- [ ] Create `src/components/Step.tsx` (reusable step card)
- [ ] Update `src/app/page.tsx` to include `<HowItWorksSection />`
- [ ] Add section ID anchor: `id="how-it-works"`

## Status
- [ ] Not started
- [ ] In progress
- [ ] Complete
