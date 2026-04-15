'use client';

import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section id="about" className={styles.about} aria-label="About CLEANMess">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>About CLEANMess</h2>
          <p className={styles.subtitle}>
            Born from a real problem. Built with a mission.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className={styles.content}>
          {/* Left: Mission and Story */}
          <div className={styles.textColumn}>
            {/* Mission */}
            <div className={styles.block}>
              <h3 className={styles.sectionTitle}>Our Mission</h3>
              <p className={styles.missionStatement}>
                To protect public health by making advanced food safety monitoring accessible to every institution, no matter their size or budget.
              </p>
            </div>

            {/* Story */}
            <div className={styles.block}>
              <h3 className={styles.sectionTitle}>Our Story</h3>
              <p className={styles.storyText}>
                CLEANMess was born when one of our founders watched their college canteen struggle with food safety compliance. Despite having tech-savvy staff, they relied on manual checks and outdated spreadsheets. We realized the problem wasn't unique—it was systemic. Institutions want to protect students, but lack real-time visibility. That inspired us to build CLEANMess.
              </p>
            </div>

            {/* Core Values */}
            <div className={styles.block}>
              <h3 className={styles.sectionTitle}>Core Values</h3>
              <ul className={styles.valuesList}>
                <li>
                  <strong>Accessibility:</strong> Technology for all, not just the wealthy.
                </li>
                <li>
                  <strong>Transparency:</strong> Open algorithms, trustworthy data, no black boxes.
                </li>
                <li>
                  <strong>Community:</strong> We succeed when our users are safe and confident.
                </li>
                <li>
                  <strong>Innovation:</strong> Constantly improving through feedback and research.
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Visual */}
          <div className={styles.visualColumn}>
            <div className={styles.visual}>
              <div className={styles.visualContent}>
                <span className={styles.visualIcon}>🛡️</span>
                <h4 className={styles.visualTitle}>Protecting 1M+ Students</h4>
                <p className={styles.visualText}>
                  CLEANMess is already helping dozens of institutions monitor food safety across 100+ canteens worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={styles.closure}>
          <p className={styles.closureText}>
            We're just getting started. Every college, every canteen, every student deserves to know their food is safe.
          </p>
        </div>
      </div>
    </section>
  );
}
