"use client";

import { useEffect, useState } from "react";
import styles from "./SectionDots.module.css";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "problem", label: "Problem" },
  { id: "how-it-works", label: "How It Works" },
  { id: "features", label: "Features" },
  { id: "dashboard-teaser", label: "Dashboard" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function SectionDots() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const snapContainer = document.getElementById("snap-container");
    if (!snapContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: snapContainer,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={styles.dots} aria-label="Section navigation">
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          className={`${styles.dot} ${activeSection === id ? styles.active : ""}`}
          onClick={() => scrollToSection(id)}
          data-label={label}
          aria-label={`Navigate to ${label} section`}
          aria-current={activeSection === id ? "true" : undefined}
        />
      ))}
    </nav>
  );
}
