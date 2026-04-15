import styles from "./page.module.css";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import DashboardTeaseSection from "@/components/sections/DashboardTeaseSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <div className="snap-container" id="snap-container">
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <DashboardTeaseSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
