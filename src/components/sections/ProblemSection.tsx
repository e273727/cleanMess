'use client';

import { useRef } from 'react';
import StatCard from '../StatCard';
import styles from './ProblemSection.module.css';

interface Stat {
  label: string;
  value: number;
  suffix: string;
  description: string;
}

const STATS: Stat[] = [
  {
    label: 'People Fall Ill Annually',
    value: 600,
    suffix: 'M+',
    description: 'due to contaminated food globally',
  },
  {
    label: 'Deaths Every Year',
    value: 420,
    suffix: 'K+',
    description: 'from foodborne diseases',
  },
  {
    label: 'Economic Loss',
    value: 110,
    suffix: 'B USD',
    description: 'lost annually in low/middle-income countries',
  },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} id="problem" className={styles.problem} aria-label="The Problem">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>The Problem</h2>
          <p className={styles.subtitle}>
            Food safety in college canteens is invisible — until someone gets sick. Most institutions rely on
            manual inspections and historical data, unable to detect contamination risks in real-time.
          </p>
          <p className={styles.description}>
            Here's what you should know about the scale of the problem:
          </p>
        </div>

        {/* Stat Cards Grid */}
        <div className={styles.statsGrid}>
          {STATS.map((stat, index) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
              duration={1500 + index * 100}
            />
          ))}
        </div>

        {/* Counter Callout */}
        <div className={styles.callout}>
          <h3 className={styles.calloutTitle}>Why This Matters</h3>
          <ul className={styles.calloutList}>
            <li>
              <strong>Detection Lag:</strong> Manual testing can take 6–12 hours. Contamination spreads in minutes.
            </li>
            <li>
              <strong>Cost of Negligence:</strong> One outbreak can cost an institution ₹50L+ in liability, reputation damage, and lost students.
            </li>
            <li>
              <strong>Student Trust:</strong> 78% of students check canteen safety ratings before eating on campus.
            </li>
          </ul>
          <p className={styles.calloutCTA}>
            CLEANMess solves this by providing <strong>real-time monitoring</strong> with{' '}
            <strong>AI-powered early detection</strong> — turning invisible risk into actionable insight.
          </p>
        </div>
      </div>
    </section>
  );
}
