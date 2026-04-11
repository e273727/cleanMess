# FEATURES.md — CLEANMess Feature Research

## IoT Environmental Dashboard — Table Stakes vs Differentiators

### Table Stakes (Must Have — Users Expect These)

#### Summary KPI Cards
- Current reading for each sensor (pH, Turbidity, EC, Temp, Humidity)
- Status indicator per sensor (Good / Warning / Critical) with color coding
- "Last refreshed" timestamp for data trust
- Alert count badge

#### Time-Series Line/Area Charts
- One chart per sensor type (pH trend, Turbidity trend, etc.)
- X-axis: time (hourly/daily resolution)
- Y-axis: sensor value with safe-range band markers
- Tooltip on hover showing exact value + timestamp

#### Date Range Filter
- Presets: Last 24h / 7 days / 30 days
- Controls all charts simultaneously

#### Responsive Layout
- Dashboard usable on tablet and mobile
- Cards stack vertically on narrow screens

### Differentiators (Competitive Advantage for CLEANMess)

#### Safe Range Overlays
- Shaded "safe zone" band on each chart (e.g., pH 6.5–8.5 for food-safe water)
- Immediate visual cue when readings approach danger zone
- **Highly impressive for demo — judges understand safety at a glance**

#### Alert History Log
- Table of past alerts with timestamp, sensor, value, severity
- Makes the AI alerting story concrete and visible

#### Sensor Correlation Hint
- Brief callout when two sensors trend together (e.g., "High turbidity correlated with EC spike on Day 14")
- Shows the AI/intelligence angle of the product

#### Dashboard Teaser on Homepage
- Embedded mini-chart on landing page (one chart, animated)
- Drives curiosity — lets users see the product before clicking through

#### Animated Stat Counters
- On the homepage Problem section: "X kg food wasted per year per college"
- Numbers count up on scroll-into-view — high engagement

### Anti-Features (Deliberately NOT Building)
- Real-time WebSocket streaming — not needed for mock demo
- Map/GIS view — single canteen, no spatial relevance
- Device calibration controls — out of scope (hardware team owns this)
- Export to CSV/PDF — v2 feature

## Homepage Section Feature Breakdown

| Section | Key Features |
|---------|-------------|
| Hero | Tagline, CTA button, animated sensor orb / waveform visual, nav |
| Problem | Stats with animated counters, food waste / illness impact cards |
| How It Works | 3-step icon flow (Sense → Analyze → Alert), animation on scroll |
| Features / Tech | Feature cards with icons, tech stack logos |
| Dashboard Teaser | Embedded live-looking mini chart, "View Full Dashboard" CTA |
| About Us | Mission statement, project origin story |
| Contact Us | Contact form (name, email, message), submit action |
