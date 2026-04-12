import styles from "./page.module.css";

const SECTIONS = [
  {
    id: "hero",
    label: "Hero",
    bg: "var(--color-bg)",
    title: "Know What's In Your Mess",
    subtitle: "AI-powered food & water quality monitoring for college canteens",
  },
  {
    id: "problem",
    label: "Problem",
    bg: "var(--color-surface-alt)",
    title: "The Problem",
    subtitle: "Food safety in college canteens is invisible — until someone gets sick",
  },
  {
    id: "how-it-works",
    label: "How It Works",
    bg: "var(--color-bg)",
    title: "How CLEANMess Works",
    subtitle: "Sense → Analyze → Alert",
  },
  {
    id: "features",
    label: "Features",
    bg: "var(--color-surface-alt)",
    title: "Features & Technology",
    subtitle: "Everything you need to monitor and trust your canteen",
  },
  {
    id: "dashboard-teaser",
    label: "Dashboard Preview",
    bg: "var(--color-bg)",
    title: "Live Data Dashboard",
    subtitle: "See historical sensor trends — real data, real insights",
  },
  {
    id: "about",
    label: "About",
    bg: "var(--color-surface-alt)",
    title: "About CLEANMess",
    subtitle: "Born from a real problem in college hostels",
  },
  {
    id: "contact",
    label: "Contact",
    bg: "var(--color-bg)",
    title: "Get In Touch",
    subtitle: "Interested in CLEANMess for your institution?",
  },
] as const;

export default function HomePage() {
  return (
    <div className="snap-container" id="snap-container">
      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={`snap-section ${styles.section}`}
          style={{ backgroundColor: section.bg }}
          aria-label={section.label}
        >
          <div className={styles.sectionInner}>
            <p className={styles.sectionLabel}>{section.label}</p>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <p className={styles.sectionSubtitle}>{section.subtitle}</p>
            <p className={styles.placeholder}>
              — Content coming in Phase 2 —
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}
