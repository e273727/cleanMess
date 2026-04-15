# Phase 2.5: About Us Section

## Objective
Build connection and trust by sharing the mission, origin story, and team behind CLEANMess. Humanize the product through authentic storytelling.

## Requirements Addressed
- ABOUT-01: About Us section exists with mission and story
- ABOUT-02: About section includes team or personal touch (photos, names optional)

## Component Structure
```
src/app/page.tsx
  └─ AboutSection component
     ├─ Heading ("About CLEANMess")
     ├─ Mission statement (large, quoted style)
     ├─ TwoColumnLayout
     │  ├─ Column 1: Story text (3–4 paragraphs)
     │  └─ Column 2: Team image or visual
     ├─ Optional: Team members grid
     │  ├─ TeamMember
     │  ├─ TeamMember
     │  └─ TeamMember
     └─ Call-out: "Our Commitment" or "Why We Do This"
```

## Content Guidelines

### Mission Statement
*"To protect public health by making advanced food safety monitoring accessible to every institution, no matter their size or budget."*

### Origin Story (2–3 short paragraphs)
- Where did the idea come from? (Founder experience, pivot moment, real-world problem)
- What makes CLEANMess different? (Tech + design + affordability + accessibility)
- What's next? (Expanding to water quality, retail food chains, hospitality)

### Team (optional but recommended)
- 2–4 core founders/leads with short bios
- Photos (professional or casual, authentic)
- Roles and backgrounds

### Commitment Statement
Examples:
- "We're committed to transparency. Our sensor data is real, our algorithms are open, and our pricing is fair."
- "We believe food safety should not be a luxury. CLEANMess is built for accessibility."

## Technical Details
- Two-column layout: Image on left on desktop, stacked on mobile
- Image: 400×400px placeholder or actual team photo
- Text: readable font size, 1.6 line-height, max-width 600px per column
- Optional: Fade-in animation on scroll (Intersection Observer)
- Team grid: 1 col on mobile, 2–3 cols on desktop

## Success Criteria
1. Mission statement is visible and impactful (large, prominent)
2. Story text is engaging (3–4 min read), not jargon-heavy
3. Two-column layout stacks properly on mobile; readable on desktop
4. Team members (if included) are clearly identified with photos and roles
5. Call-out section emphasizes brand values
6. No console errors; smooth scroll behavior

## Files to Create/Edit
- [ ] Create `src/components/sections/AboutSection.tsx`
- [ ] Create `src/components/sections/AboutSection.module.css`
- [ ] Create `src/components/TeamMember.tsx` (optional)
- [ ] Add placeholder image: `public/images/team.jpg` (or similar)
- [ ] Update `src/app/page.tsx` to include `<AboutSection />`
- [ ] Add section ID anchor: `id="about"`

## Status
- [ ] Not started
- [ ] In progress
- [ ] Complete
