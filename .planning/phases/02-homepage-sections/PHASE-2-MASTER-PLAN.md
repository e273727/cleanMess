# Phase 2 Master Plan — Homepage Sections

## Overview

Phase 2 builds all 7 homepage sections (6 required + 1 optional teaser). This is the high-impact work that defines the CLEANMess brand and communicates value to visitors.

**Total Requirements**: 20 mapping to:
- HERO-01–04 (4)
- PROB-01–03 (3)
- HOW-01–03 (3)
- FEAT-01–03 (3)
- ABOUT-01–02 (2)
- CONTACT-01–05 (5) ← Largest component

## Execution Order

Recommended order balances dependency, complexity, and visual impact:

1. **Hero Section** (02-01-HERO.md) ← Visual foundation
2. **Problem Section** (02-02-PROBLEM.md) ← Uses Intersection Observer (reusable)
3. **How It Works** (02-03-HOW-IT-WORKS.md) ← Medium complexity
4. **Features** (02-04-FEATURES.md) ← Straightforward grid
5. **About Us** (02-05-ABOUT.md) ← Two-column layout
6. **Contact Form** (02-06-CONTACT.md) ← Largest; depends on all above
7. **Dashboard Teaser** (02-07-DASHBOARD-TEASER.md) ← Optional; no hard blocker

## Build Steps

### Week 1: Foundation Components
- Create base section layout components
- Set up Intersection Observer hook
- Build reusable: Button, Card, Icon, StatCard components
- Hero section complete
- Problem section UI complete (counters wired, animation hooks ready)

### Week 2: Mid-Phase Sections
- How It Works section complete
- Features section complete
- About Us section complete
- All sections have responsive mobile/tablet/desktop layouts verified

### Week 3: Contact & Polish
- Contact form complete (client-side validation only; no API yet)
- Dashboard teaser section (using mock data)
- Page scrolling test: All 7 sections snap and animate correctly
- Visual polish: Hover states, transitions, animations refined

### Week 4: QA & Handoff
- Cross-browser testing (Chrome, Firefox, Safari)
- Mobile device testing (iPhone 12–15, Android)
- Accessibility audit (WCAG AA, keyboard navigation)
- Final styling pass
- Handoff to Phase 3

## Dependencies & Gotchas

| Dependency | Phase | Risk | Mitigation |
|------------|-------|------|-----------|
| Intersection Observer | Phase 1 | None | Use custom hook from Phase 1 |
| Design tokens | Phase 1 | None | Already defined in tokens.css |
| Recharts library | Phase 3 | Medium | Install in Phase 2; use mock data for teaser |
| Email submission | Phase 3+ | Low | Mock/noop in Phase 2; wire up in Phase 3 |
| API routes | Phase 3 | Medium | Dashboard teaser uses mock data |

## File Structure After Phase 2

```
src/
├─ components/
│  ├─ sections/
│  │  ├─ HeroSection.tsx
│  │  ├─ HeroSection.module.css
│  │  ├─ ProblemSection.tsx
│  │  ├─ ProblemSection.module.css
│  │  ├─ HowItWorksSection.tsx
│  │  ├─ HowItWorksSection.module.css
│  │  ├─ FeaturesSection.tsx
│  │  ├─ FeaturesSection.module.css
│  │  ├─ AboutSection.tsx
│  │  ├─ AboutSection.module.css
│  │  ├─ ContactSection.tsx
│  │  ├─ ContactSection.module.css
│  │  ├─ DashboardTeaseSection.tsx
│  │  └─ DashboardTeaseSection.module.css
│  ├─ HeroVisual.tsx
│  ├─ StatCard.tsx
│  ├─ Step.tsx
│  ├─ FeatureCard.tsx
│  ├─ ContactForm.tsx
│  ├─ DashboardChart.tsx
│  └─ ...
├─ hooks/
│  ├─ useIntersectionObserver.ts
│  └─ useContactForm.ts
├─ lib/
│  ├─ mockData.ts
│  └─ validation.ts (email, contact form)
└─ app/
   ├─ page.tsx (updated with all sections)
   ├─ api/
   │  └─ contact/
   │     └─ route.ts (POST handler for contact form)
   └─ ...
```

## Testing Checklist

Before moving to Phase 3, verify:

- [ ] `npm run dev` runs without errors
- [ ] Homepage scrolls through all 7 sections smoothly
- [ ] Each section anchor (`#hero`, `#problem`, etc.) is working
- [ ] Navbar links navigate to correct sections
- [ ] Problem stat counters animate on scroll (visible only once)
- [ ] Contact form validates and shows errors/success
- [ ] Mobile layout (375px) has no overflow
- [ ] All colors use CSS variables (no hardcoded hex)
- [ ] No console warnings in browser DevTools
- [ ] Lighthouse score ≥ 85 on desktop

## Phase 2 Success Criteria (Recap)

1. ✅ All 7 sections visible by scrolling down
2. ✅ Stat counters animate when scrolled into view
3. ✅ How It Works steps animate sequentially
4. ✅ Contact form validates required fields + email format
5. ✅ Page looks premium on mobile (375px) and desktop (1440px)
6. ✅ No console errors; smooth animations (60fps)

## What's NOT in Phase 2

- ❌ API integration (Phase 3)
- ❌ Live dashboard page (Phase 4)
- ❌ Advanced animations/Framer Motion (Phase 5)
- ❌ Dark mode toggle (Backlog)
- ❌ Real email sending (Phase 3+)

## Ready to Start?

Pick a section and dive in! Recommended first task:

**Build Hero Section** (02-01-HERO.md)

It's the visual anchor for the entire homepage. Once Hero is styled and working, all other sections follow a similar pattern.
