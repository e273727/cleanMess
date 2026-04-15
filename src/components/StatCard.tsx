'use client';

import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import styles from './StatCard.module.css';

interface StatCardProps {
  icon?: string;
  value: number;
  suffix?: string;
  label: string;
  description?: string;
  duration?: number; // Animation duration in milliseconds
}

/**
 * Stat card with animated counter that triggers on scroll into view
 */
export default function StatCard({
  icon,
  value,
  suffix = '',
  label,
  description,
  duration = 1800,
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const { ref, isInView } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.25 });

  useEffect(() => {
    if (!isInView) return;

    // Animate the counter from 0 to value
    const startTime = Date.now();
    const totalDuration = duration;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);

      // Easing function: ease-out
      const eased = 1 - Math.pow(1 - progress, 3);

      // Calculate current display value
      const current = Math.floor(eased * value);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className={styles.statCard}>
      {icon && <span className={styles.icon}>{icon}</span>}

      <div className={styles.content}>
        <div className={styles.valueContainer}>
          <span className={styles.value}>
            {displayValue.toLocaleString()}
          </span>
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </div>
        <h3 className={styles.label}>{label}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
}
