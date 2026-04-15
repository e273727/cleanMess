# Phase 2.2: Problem Section

## Objective
Establish credibility and urgency by presenting the food safety problem space with compelling stats and animated counter elements that engage viewers as they scroll into view.

## Requirements Addressed
- PROB-01: Problem section exists with food safety context
- PROB-02: Animated stat counters present (e.g., 2M+ foodborne illness cases annually)
- PROB-03: Problem messaging is clear and emotionally resonant

## Component Structure
```
src/app/page.tsx
  └─ ProblemSection component
     ├─ Heading ("The Problem")
     ├─ Problem statement (paragraph)
     ├─ StatCounters grid
     │  ├─ StatCard (animated counter)
     │  ├─ StatCard (animated counter)
     │  ├─ StatCard (animated counter)
     │  └─ StatCard (animated counter)
     └─ Call-out or image
```

## Content Guidelines
- **Heading**: "The Problem" or "Food Safety at Scale"
- **Statement**: 2–3 sentences on why food safety matters in college canteens (budget cuts, lack of tech, liability)
- **Stats** (example numbers):
  - ~2M foodborne illness cases annually in India
  - 40% of college canteens lack real-time monitoring
  - Average detection lag: 6–12 hours (too late)
  - Cost of a food safety incident: ₹50L+ (reputation + legal)

## Technical Details
- Use **Intersection Observer** to trigger counter animations on scroll
- Counter animation duration: 1.5–2 seconds, easing function: `ease-out`
- Use CSS Modules for layout (ProblemSection.module.css)
- Stats grid: responsive (1 col on mobile, 2–4 on desktop)
- Optional: Icon or small image per stat card

## Animation Implementation
```javascript
// Pseudocode: Animate counter from 0 to target over duration
useEffect(() => {
  if (isInView) {
    animateCounter(startValue, endValue, duration);
  }
}, [isInView]);
```

## Success Criteria
1. Problem section displays correctly on scroll
2. Stat counters animate up from 0 to target value when section comes into view
3. Counters only animate once (on first view)
4. All stats are readable and justified (sources preferred, or inline disclaimer)
5. Section looks premium on mobile (375px) and desktop (1440px)

## Files to Create/Edit
- [ ] Create `src/components/sections/ProblemSection.tsx`
- [ ] Create `src/components/sections/ProblemSection.module.css`
- [ ] Create `src/components/StatCard.tsx` (reusable, with counter animation)
- [ ] Create `src/hooks/useIntersectionObserver.ts` (if not exist)
- [ ] Update `src/app/page.tsx` to include `<ProblemSection />`
- [ ] Add section ID anchor: `id="problem"`

## Status
- [ ] Not started
- [ ] In progress
- [ ] Complete
