import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { MarqueeStrip } from "./components/MarqueeStrip";
import { PhotosSection } from "./components/PhotosSection";
import { About } from "./components/About";
import { Showreel } from "./components/Showreel";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  useEffect(() => {
    const sectionIds = ["photos", "showreel", "about", "contact"];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowBackToTop(scrollY > 600);

      const scrollPosition = scrollY + window.innerHeight * 0.35;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-[var(--bg)] text-[var(--ink)] min-h-screen selection:bg-[var(--red)] selection:text-white">
      {/* 1. Custom Minimal Luxury Cursor */}
      <CustomCursor />

      {/* 2. Fixed Transparent Hairline Header */}
      <Navbar activeSection={activeSection} />

      {/* 3. Main Single-Page Editorial Content */}
      <main className="w-full bg-[var(--bg)]">
        {/* Hero Section (100vh, two columns, tilted B&W photo, ghost text, 3-line name reveal) */}
        <Hero />

        {/* Marquee Strip (Infinite horizontal scroll, 7vw thin light-grey text, gold diamonds) */}
        <MarqueeStrip />

        {/* Photos Section (#photos — 01 PHOTOS, B&W to color hover masonry/grid, light lightbox) */}
        <PhotosSection />

        {/* Showreel Section (#showreel — SHOWCASES, S-curve road journey) */}
        <Showreel />

        {/* About Section (#about — ABOUT, tilted photo + outline, bio, stats row) */}
        <About />

        {/* Contact Section (#contact — OFFICIAL INQUIRY DESK, representation & inquiry) */}
        <Contact />
      </main>

      {/* 4. Hairline Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-[32px] right-[32px] z-40 w-[48px] h-[48px] bg-white hover:bg-[var(--red)] border border-[#D9D9D9] hover:border-[var(--red)] text-[#0A0A0A] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm group"
            aria-label="Scroll to top"
          >
            <svg className="w-4 h-4 text-current transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
