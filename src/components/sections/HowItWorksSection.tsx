'use client';

import Step from '../Step';
import styles from './HowItWorksSection.module.css';

const STEPS = [
  {
    number: 1,
    icon: <img src="https://img.icons8.com/?size=100&id=aSrkeyEkkzIK&format=png&color=000000" alt="Sensor Icon" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />,
    title: 'Sense',
    description: 'IoT sensors continuously monitor pH, turbidity, temperature, and conductivity in real-time.',
  },
  {
    number: 2,
    icon: <img src="https://img.icons8.com/?size=100&id=KhfJqKL6vi5l&format=png&color=000000" alt="Analyze Icon" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />,
    title: 'Analyze',
    description: 'AI algorithms detect anomalies and predict safety issues before they happen.',
  },
  {
    number: 3,
    icon: <img src="https://img.icons8.com/?size=100&id=83989&format=png&color=000000" alt="Alert Icon" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />,
    title: 'Alert',
    description: 'Instant notifications to staff with recommended actions and sensor data snapshots.',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className={styles.section} aria-label="How It Works">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>How It Works</h2>
          <p className={styles.subtitle}>
            CLEANMess operates on a simple three-step cycle that turns raw sensor data into actionable intelligence.
          </p>
        </div>

        {/* Steps Grid */}
        <div className={styles.stepsContainer}>
          {STEPS.map((step, index) => (
            <div key={step.number} className={styles.stepWrapper}>
              <Step
                number={step.number}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
              
              {/* Connector arrow (desktop only, not on last step) */}
              {index < STEPS.length - 1 && (
                <div className={styles.connector} aria-hidden="true">
                  <span className={styles.arrow}>→</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.ctaBox}>
          <p className={styles.ctaText}>
            This integrated approach means <strong>contamination is caught 2–4 hours earlier</strong> than traditional manual testing.
          </p>
        </div>
      </div>
    </section>
  );
}
