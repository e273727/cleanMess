"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BarChart2 } from "lucide-react";
import styles from "./Navbar.module.css";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Problem", href: "#problem" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Dashboard", href: "#dashboard-teaser" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Track scroll for shadow
    const snapContainer = document.querySelector(".snap-container");
    const scrollTarget = snapContainer ?? window;

    const handleScroll = () => {
      const scrollY =
        snapContainer
          ? (snapContainer as HTMLElement).scrollTop
          : window.scrollY;
      setIsScrolled(scrollY > 10);
    };

    scrollTarget.addEventListener("scroll", handleScroll, { passive: true });

    // IntersectionObserver for active section tracking
    const sections = document.querySelectorAll(".snap-section[id]");

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: (snapContainer as Element) ?? null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      scrollTarget.removeEventListener("scroll", handleScroll);
      observerRef.current?.disconnect();
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
      aria-label="Main navigation"
    >
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="CLEANMess home">
          CLEANMess
          <span className={styles.logoDot} aria-hidden="true" />
        </Link>

        {/* Desktop nav links */}
        <div className={styles.actions}>
          <ul className={styles.navLinks} role="list">
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`${styles.navLink} ${
                    activeSection === href.replace("#", "") ? styles.active : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(href);
                  }}
                  aria-current={
                    activeSection === href.replace("#", "") ? "page" : undefined
                  }
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <Link
            href="/dashboard"
            className={styles.ctaButton}
            aria-label="View full sensor dashboard"
          >
            <BarChart2 size={16} aria-hidden="true" />
            View Dashboard
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${isMobileOpen ? styles.open : ""}`}
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isMobileOpen ? styles.open : ""}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {NAV_ITEMS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className={`${styles.mobileNavLink} ${
              activeSection === href.replace("#", "") ? styles.active : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(href);
            }}
          >
            {label}
          </a>
        ))}
        <Link href="/dashboard" className={styles.mobileCtaButton}>
          <BarChart2 size={16} aria-hidden="true" />
          View Dashboard
        </Link>
      </div>
    </nav>
  );
}
