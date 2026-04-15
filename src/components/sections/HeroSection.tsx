'use client';

import Link from 'next/link';
import HeroVisual from '../HeroVisual';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const targetId = 'how-it-works';
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={styles.hero} aria-label="Hero">
      <div className={styles.container}>
        {/* Content */}
        <div className={styles.content}>
          <h1 className={styles.tagline}>
            Real-Time Intelligence for Food Safety
          </h1>
          
          <p className={styles.subheading}>
            CLEANMess monitors your canteen 24/7. Detect contamination risks before they become crises. Protect your community with AI-powered food safety.
          </p>

          {/* CTA Button */}
          <Link
            href="#how-it-works"
            className={styles.cta}
            onClick={handleCTAClick}
          >
            Explore How It Works
            <span className={styles.arrow}>→</span>
          </Link>
        </div>

        {/* Animated Visual */}
        <HeroVisual />
      </div>
    </section>
  );
}
