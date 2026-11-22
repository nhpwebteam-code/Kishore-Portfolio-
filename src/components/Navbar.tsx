import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "../data/config";

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [isOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 border-b border-[#E8E8E5] transition-colors duration-300"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        <div className="site-container h-16 sm:h-20 flex items-center justify-between">
          {/* Left: CRK Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center group cursor-pointer py-2"
            aria-label="Ch. Rathna Kishore Reddy"
          >
            <span className="text-sm md:text-base font-light tracking-[0.35em] uppercase text-[#111111] font-['Inter'] group-hover:text-[var(--red)] transition-colors">
              CRK
            </span>
          </a>

          {/* Right: Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main Navigation">
            {siteConfig.navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`text-[12px] tracking-[0.3em] uppercase font-light relative py-2 transition-colors flex items-center ${
                    isActive ? "text-[#111111] font-normal" : "text-[#666666] hover:text-[#111111]"
                  }`}
                >
                  {isActive && <span className="text-[var(--red)] mr-1.5 text-[8px]">◆</span>}
                  <span>{item.label}</span>
                  {/* 1px Red Underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-[var(--red)] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 hover:w-full group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button (44x44px touch target) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-11 h-11 flex flex-col justify-center items-center gap-1.5 z-[110] focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            <span
              className={`block w-6 h-[1.5px] bg-[#111111] transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-[4px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[#111111] transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[4px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Editorial Light Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[var(--bg)] flex flex-col justify-between p-6 sm:p-10 md:hidden select-none overflow-y-auto"
            style={{
              paddingTop: "max(5.5rem, calc(env(safe-area-inset-top) + 4.5rem))",
              paddingBottom: "max(2rem, calc(env(safe-area-inset-bottom) + 1.5rem))",
            }}
          >
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-8">
                <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--red)] font-mono font-medium">
                  DIRECTORY
                </span>
                <div className="h-px w-8 bg-[#E6E6E6]" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#999999] font-mono">
                  CRK ACTOR
                </span>
              </div>

              {/* Navigation Items */}
              <div className="flex flex-col space-y-6">
                {siteConfig.navItems.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  const numStr = String(idx + 1).padStart(2, "0");
                  return (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.05, duration: 0.3 }}
                      className={`text-3xl sm:text-4xl font-['Jost'] font-light tracking-[0.18em] uppercase transition-colors flex items-center justify-between py-2 border-b border-[#F0F0EE] ${
                        isActive ? "text-[#111111] font-normal" : "text-[#555555] active:text-[var(--red)]"
                      }`}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="text-xs font-mono tracking-wider text-[var(--red)]">
                          {numStr}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      {isActive ? (
                        <span className="text-[var(--red)] text-xs">◆</span>
                      ) : (
                        <span className="text-xs text-[#CCCCCC]">→</span>
                      )}
                    </motion.a>
                  );
                })}
              </div>

              {/* Quick Action Button */}
              <div className="mt-8">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="w-full flex items-center justify-between px-6 py-4 bg-[#0A0A0A] active:bg-[var(--red)] text-white text-xs font-mono tracking-[0.3em] uppercase transition-colors"
                >
                  <span>OFFICIAL INQUIRY DESK</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Bottom info & Socials */}
            <div className="border-t border-[#E8E8E5] pt-6 mt-8">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-[11px] text-[#0A0A0A] tracking-[0.25em] uppercase font-['Jost'] font-normal">
                  {siteConfig.actor.fullName}
                </span>
                <div className="flex items-center gap-4 text-xs font-mono text-[#8A8A8A]">
                  <a
                    href={siteConfig.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--red)] uppercase transition-colors"
                  >
                    IG ↗
                  </a>
                  <a
                    href={siteConfig.contact.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--red)] uppercase transition-colors"
                  >
                    YT ↗
                  </a>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="hover:text-[var(--red)] uppercase transition-colors"
                  >
                    EMAIL ↗
                  </a>
                </div>
              </div>
              <span className="text-[10px] text-[#999999] tracking-[0.35em] uppercase font-mono block">
                {siteConfig.actor.location}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
