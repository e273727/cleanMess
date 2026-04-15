<!-- GSD:project-start source:PROJECT.md -->
## Project

**CLEANMess — Product Website + Backend**

CLEANMess is an IoT + AI food and water quality monitoring system designed for college hostel canteens/cafeterias. This project builds the **public product website** with a scrollable, slide-based layout and a **public demo dashboard** showing historical sensor data — all backed by a Next.js API layer serving realistic mock data.

**Core Value:** **One thing that must work:** A stunning, scrollable product site that communicates what CLEANMess does, paired with a live demo dashboard that shows real-looking sensor history charts — convincing enough for stakeholders, judges, or potential adopters.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack (2025)
### Frontend Framework
- **Next.js 15** (App Router) — Confidence: HIGH
### Charting Library
- **Recharts** — Confidence: HIGH for this use case
### Styling
- **CSS Modules + CSS Variables** — Confidence: HIGH
### Scroll Architecture
- **Native CSS Scroll Snap** — Confidence: HIGH
### State Management
- **React useState / useReducer** — Confidence: HIGH
### Mock Data Generation
- **Formula-based in API routes** — Confidence: HIGH
### Animation
- **CSS transitions + Framer Motion (optional, light use)** — Confidence: MEDIUM
### Contact Form
- **Next.js API route + Nodemailer or mailto fallback** — Confidence: MEDIUM
## What NOT to Use
- ❌ `fullpage.js` — Paid, heavy, breaks accessibility
- ❌ D3.js directly — Too low-level for a demo site, adds complexity
- ❌ ECharts — Overkill for mock data at this scale; larger bundle
- ❌ Tailwind CSS — Not in project guidelines
- ❌ Redux / Zustand — No cross-component state needed
- ❌ Real-time WebSockets — Not needed for public demo dashboard
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.agent/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
