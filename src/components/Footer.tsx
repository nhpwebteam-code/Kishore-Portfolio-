import React from "react";
import { siteConfig } from "../data/config";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#FFFFFF] border-t border-[#E6E6E6] select-none py-10">
      <div
        className="w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-[11px] font-mono tracking-[0.3em] uppercase text-[#8A8A8A]"
        style={{
          maxWidth: 1280,
          marginInline: "auto",
          paddingInline: "clamp(24px, 5vw, 80px)",
        }}
      >
        {/* Left */}
        <div className="text-center md:text-left">
          © 2026 CH. RATHNA KISHORE REDDY
        </div>

        {/* Center */}
        <div className="text-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-[13px] font-light tracking-[0.4em] uppercase text-[#0A0A0A] font-['Inter'] hover:text-[var(--red)] transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            CRK
          </a>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6 flex-wrap justify-center md:justify-end">
          <a
            href={siteConfig.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="relative py-1 text-[#8A8A8A] hover:text-[#0A0A0A] transition-colors group"
          >
            <span>INSTAGRAM</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--red)] transition-all duration-300 group-hover:w-full" />
          </a>

          <a
            href={siteConfig.contact.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="relative py-1 text-[#8A8A8A] hover:text-[#0A0A0A] transition-colors group"
          >
            <span>YOUTUBE</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--red)] transition-all duration-300 group-hover:w-full" />
          </a>

          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="relative py-1 text-[#8A8A8A] hover:text-[#0A0A0A] transition-colors group"
          >
            <span>EMAIL</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--red)] transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </footer>
  );
};
