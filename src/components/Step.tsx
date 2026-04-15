'use client';

import styles from './Step.module.css';

interface StepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Step({ number, icon, title, description }: StepProps) {
  return (
    <div className={styles.step}>
      {/* Step number badge */}
      <div className={styles.badge}>{number}</div>

      {/* Icon */}
      <div className={styles.icon}>{icon}</div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
