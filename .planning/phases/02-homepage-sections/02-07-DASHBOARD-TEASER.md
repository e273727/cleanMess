# Phase 2.7: Dashboard Teaser Section (Optional)

## Objective
Give visitors a preview of the power and beauty of CLEANMess's real-time dashboard without requiring them to navigate away. Hook them with a live chart showing sample sensor data and a CTA to "Explore the Full Dashboard."

## Requirements Addressed
- TEAS-01: Dashboard teaser section exists on homepage
- TEAS-02: Mini chart displays sample sensor data (Recharts)
- TEAS-03: CTA links to `/dashboard` route

## Component Structure
```
src/app/page.tsx
  └─ DashboardTeaseSection component
     ├─ Heading ("See It in Action")
     ├─ Subheading ("Real-time sensor data from a sample canteen.")
     ├─ TeaserChart
     │  └─ Recharts LineChart (1–2 sensors, 7-day data)
     ├─ Stat cards (quick summary)
     │  ├─ Card: "Latest pH reading"
     │  ├─ Card: "Alerts in 30 days"
     │  └─ Card: "System uptime"
     └─ CTA Button ("Explore Full Dashboard")
```

## Content Guidelines
- **Heading**: "See It in Action" or "Live Dashboard Preview"
- **Subheading**: "Here's what CLEANMess monitors in real-time."
- **Chart Title**: "pH Levels & Turbidity (Last 7 Days)" or similar
- **Stat Cards**: Quick facts (e.g., "Current pH: 7.2", "Alerts: 3", "Uptime: 99.9%")
- **Button**: "Explore Full Dashboard" → `/dashboard`

## Technical Details

### Frontend (DashboardTeaseSection.tsx)
- Use Recharts with responsive container
- Chart type: LineChart or AreaChart with 2 data series (e.g., pH + Turbidity)
- Data source: Mock data or fetch from `/api/summary` (Phase 3 dependency)
- Legend: labels for each sensor/line
- Tooltip: shows value on hover
- Responsive: full-width on mobile, constrained width on desktop

### Mock Data (if not yet calling API)
```javascript
const sampleData = [
  { time: '2026-04-05', pH: 6.8, turbidity: 2.5 },
  { time: '2026-04-06', pH: 7.1, turbidity: 2.1 },
  // ... 5 more days
];
```

### Integration with Phase 3
- **Phase 2**: Use hardcoded/mock data
- **Phase 3**: Replace with `/api/sensor-data?range=7d` call
- No changes needed to component structure; just swap data source

## Success Criteria
1. Dashboard teaser section displays with heading and subheading
2. Chart renders without errors (no SSR hydration warnings)
3. Chart shows 2 sensors over 7 days with clear legend
4. Stat cards display quick data points
5. "Explore Full Dashboard" button is clickable (links to `/dashboard` even if page doesn't exist yet)
6. Chart is responsive; readable on mobile (375px) and desktop (1440px)
7. No console errors

## Files to Create/Edit
- [ ] Create `src/components/sections/DashboardTeaseSection.tsx`
- [ ] Create `src/components/sections/DashboardTeaseSection.module.css`
- [ ] Create `src/components/DashboardChart.tsx` (reusable Recharts chart)
- [ ] Create `src/lib/mockData.ts` (mock sensor data for Phase 2)
- [ ] Update `src/app/page.tsx` to include `<DashboardTeaseSection />`
- [ ] Add section ID anchor: `id="dashboard-tease"`

## Dependencies
- **Phase 3**: Mock data will be replaced with live API calls
- **Phase 4**: Full `/dashboard` page will be built

## Status
- [ ] Not started
- [ ] In progress
- [ ] Complete
