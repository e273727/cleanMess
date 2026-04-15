# Phase 2.4: Features & Tech Stack Section

## Objective
Showcase CLEANMess's core capabilities and the cutting-edge technology stack that powers it. Build trust through transparency about tech choices.

## Requirements Addressed
- FEAT-01: Features section exists
- FEAT-02: Feature cards are visually distinct and readable
- FEAT-03: Tech stack is displayed (badges/logos)

## Component Structure
```
src/app/page.tsx
  └─ FeaturesSection component
     ├─ Heading ("Features & Tech Stack")
     ├─ FeaturesGrid (responsive)
     │  ├─ FeatureCard (sensor reading)
     │  ├─ FeatureCard (AI detection)
     │  ├─ FeatureCard (alert system)
     │  ├─ FeatureCard (cost-effective)
     │  ├─ FeatureCard (easy deployment)
     │  └─ FeatureCard (scalable)
     ├─ Divider
     ├─ Tech Stack heading
     └─ TechStackBadges (grid of logos/text)
        ├─ Badge (IoT - Arduino + Raspberry Pi)
        ├─ Badge (Backend - Node.js + Python)
        ├─ Badge (Frontend - React + Next.js)
        ├─ Badge (AI/ML - TensorFlow / scikit-learn)
        └─ Badge (Cloud - AWS / GCP)
```

## Content Guidelines

### Features (6–8 core features)
1. **Real-Time Monitoring** — 5 sensors tracking critical parameters continuously
2. **AI Anomaly Detection** — Predictive algorithms catch issues 2–4 hours early
3. **Actionable Alerts** — Instant notifications to staff with recommended remediation
4. **Historical Dashboard** — 30-day data retention with trend analysis
5. **Mobile-First** — Responsive interface works on any device
6. **Affordable** — Low-cost sensors + open-source software = ₹50K setup cost
7. **Easy Integration** — No need for IT expertise; plug-and-play deployment
8. **Compliance-Ready** — Audit logs for regulatory requirements

### Tech Stack
- **Sensors**: Arduino + DHT22/pH probe + Turbidity sensor + EC sensor
- **Backend**: Node.js + Express + Python (ML inference)
- **Frontend**: React + Next.js 15
- **AI/ML**: TensorFlow / scikit-learn
- **Cloud**: AWS / GCP for hosting

## Technical Details
- Feature grid: 2–3 cols on mobile, 3–4 cols on tablet, 3–4 cols on desktop
- Each FeatureCard: Icon + title + 1–2 sentence description
- Tech stack: Badge layout (flex wrap), clickable or informational
- Use CSS Modules for responsive grid (FeaturesSection.module.css)
- Optional: Hover effect on cards (shadow, slight lift)

## Success Criteria
1. All feature cards display with clear icons, titles, and descriptions
2. Grid is responsive and readable on mobile (375px), tablet (768px), desktop (1440px)
3. Tech stack badges are recognizable (logos or clear text)
4. Cards do not overflow; text is truncated or wrapped appropriately
5. Hover states are smooth (optional but recommended)
6. Section maintains visual consistency with rest of site

## Files to Create/Edit
- [ ] Create `src/components/sections/FeaturesSection.tsx`
- [ ] Create `src/components/sections/FeaturesSection.module.css`
- [ ] Create `src/components/FeatureCard.tsx`
- [ ] Create `src/components/TechBadge.tsx` (optional, if complex layout)
- [ ] Update `src/app/page.tsx` to include `<FeaturesSection />`
- [ ] Add section ID anchor: `id="features"`

## Status
- [ ] Not started
- [ ] In progress
- [ ] Complete
