import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { siteConfig } from "../data/config";

export const Hero: React.FC = () => {
  // Parallax mouse movement across hero section (subtle ~10px on desktop)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  // Interactive cursor blend state inside the photo frame
  const [cursorBlend, setCursorBlend] = useState({
    x: 50,
    y: 50,
    isHovered: false,
  });

  useEffect(() => {
    if (window.matchMedia("(hover: none) or (pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full bg-[var(--bg)] text-[#111111] flex flex-col justify-center items-center pt-20 sm:pt-28 pb-12 sm:pb-16 select-none overflow-hidden"
      aria-label="Ch. Rathna Kishore Reddy"
    >
      {/* ── GHOST OUTLINE TEXT "RATHNA" (Positioned left & vertically centered, non-overflowing) ── */}
      <div
        className="absolute -left-4 sm:-left-12 lg:-left-16 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0 ghost-stroke font-light uppercase leading-none opacity-35 sm:opacity-45"
        style={{ fontSize: "clamp(5rem, 22vw, 22rem)" }}
        aria-hidden="true"
      >
        RATHNA
      </div>

      <div className="site-container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
        {/* ── LEFT COLUMN: Actor Portrait with Exact Blending & Reactive Spotlight ── */}
        <div className="lg:col-span-6 w-full flex items-center justify-center lg:justify-start">
          <motion.div
            style={{ x: smoothMouseX, y: smoothMouseY }}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[68vw] sm:w-[50vw] lg:w-[34vw] aspect-[3/4.2] max-w-[290px] sm:max-w-[360px] lg:max-w-[460px] group mx-auto lg:mx-0"
          >
            {/* Background 1px light-grey outline frame (Offset frame +1deg tilt) */}
            <div
              className="absolute inset-0 translate-x-[14px] sm:translate-x-[20px] translate-y-[18px] sm:translate-y-[25px] border border-[#D9D9D9] pointer-events-none z-10 rotate-1 transition-transform duration-500 group-hover:translate-x-[20px] group-hover:translate-y-[26px]"
              aria-hidden="true"
            />

            {/* Ambient Radial Aura on Canvas */}
            <div
              className="absolute -inset-8 sm:-inset-16 pointer-events-none z-0 transition-opacity duration-700"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(20, 20, 22, 0.12) 0%, rgba(225, 13, 31, 0.05) 45%, transparent 72%)",
                filter: "blur(24px)",
                opacity: cursorBlend.isHovered ? 0.9 : 0.6,
              }}
              aria-hidden="true"
            />

            {/* Foreground Photo Container (-1deg tilt, with feathered mask for seamless edge blending) */}
            <div
              data-cursor="CRK"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setCursorBlend({ x, y, isHovered: true });
              }}
              onMouseLeave={() => {
                setCursorBlend((prev) => ({ ...prev, isHovered: false }));
              }}
              className="relative z-20 w-full h-full -rotate-1 overflow-hidden cursor-pointer shadow-lg"
              style={{
                maskImage:
                  "radial-gradient(ellipse 92% 92% at 50% 50%, black 65%, rgba(0, 0, 0, 0.85) 80%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 92% 92% at 50% 50%, black 65%, rgba(0, 0, 0, 0.85) 80%, transparent 100%)",
              }}
            >
              {/* B&W Actor Portrait */}
              <img
                src="/photos/hero-portrait.jpg"
                alt="Ch. Rathna Kishore Reddy"
                className="w-full h-full object-cover transition-all duration-700 ease-out"
                style={{
                  filter: cursorBlend.isHovered
                    ? "grayscale(25%) contrast(1.08) brightness(1.05)"
                    : "grayscale(100%) contrast(1.12) brightness(0.98)",
                  transform: cursorBlend.isHovered ? "scale(1.03)" : "scale(1)",
                }}
                draggable={false}
              />

              {/* Cursor-Interactive Dynamic Spotlight Blend Layer */}
              <div
                className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: cursorBlend.isHovered ? 1 : 0,
                  background: `radial-gradient(circle 260px at ${cursorBlend.x}% ${cursorBlend.y}%, rgba(225, 13, 31, 0.10) 0%, rgba(255, 255, 255, 0.14) 35%, transparent 70%)`,
                  mixBlendMode: "screen",
                }}
              />

              {/* Luminous Core Cursor Highlight */}
              <div
                className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: cursorBlend.isHovered ? 0.75 : 0,
                  background: `radial-gradient(circle 160px at ${cursorBlend.x}% ${cursorBlend.y}%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)`,
                  mixBlendMode: "overlay",
                }}
              />

              {/* Subtle perimeter vignette dissolve */}
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 50px 15px rgba(255, 255, 255, 0.25)",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN: Editorial Name Reveal & Identity Block ── */}
        <div className="lg:col-span-6 w-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left pt-2 sm:pt-4 lg:pt-0">
          {/* Small Red "CH." */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[var(--red)] text-[15px] sm:text-[18px] tracking-[0.4em] font-light uppercase font-['Inter'] mb-1.5 sm:mb-2 block"
          >
            CH.
          </motion.span>

          {/* Name Stacked on 3 Lines with Upward Reveal */}
          <h1
            className="font-['Inter'] font-light uppercase tracking-tight text-[#111111] leading-[0.93] flex flex-col items-center lg:items-start"
            style={{ fontSize: "clamp(2.75rem, 8vw, 8.5rem)" }}
          >
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                RATHNA
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                KISHORE
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                REDDY
              </motion.span>
            </div>
          </h1>

          {/* 60px Red Horizontal Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="h-[1px] bg-[var(--red)] my-4 sm:my-6"
          />

          {/* ACTOR — letter-spacing 0.5em, grey */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-[14px] sm:text-[16px] tracking-[0.5em] uppercase text-[#888888] font-light font-['Inter'] mb-4 sm:mb-6"
          >
            ACTOR
          </motion.div>

          {/* Email in tiny uppercase tracked grey text with 1px underline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-6 sm:mb-8"
          >
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-[11px] sm:text-[12px] tracking-[0.3em] uppercase text-[#777777] hover:text-[#111111] font-light font-['Inter'] border-b border-[#E8E8E5] hover:border-[#111111] pb-1 transition-colors"
            >
              {siteConfig.contact.email}
            </a>
          </motion.div>

          {/* 3 Circular Icon Buttons — moved down for breathing room and balanced alignment */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex items-center gap-4 mt-8 sm:mt-12 lg:mt-16"
          >
            {/* Mail */}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              aria-label="Send Email"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#E8E8E5] flex items-center justify-center text-[#111111] hover:border-[var(--red)] hover:bg-[#111111] hover:text-white active:scale-95 transition-all duration-300 cursor-pointer shadow-sm group"
            >
              <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="1.2" viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="14" rx="1.5" />
                <polyline points="3 7 12 13 21 7" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href={siteConfig.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#E8E8E5] flex items-center justify-center text-[#111111] hover:border-[var(--red)] hover:bg-[#111111] hover:text-white active:scale-95 transition-all duration-300 cursor-pointer shadow-sm group"
            >
              <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="1.2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href={siteConfig.contact.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#E8E8E5] flex items-center justify-center text-[#111111] hover:border-[var(--red)] hover:bg-[#111111] hover:text-white active:scale-95 transition-all duration-300 cursor-pointer shadow-sm group"
            >
              <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="1.2" viewBox="0 0 24 24">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM CENTER: Tiny "SCROLL" with Animating Downward Line ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-8 sm:mt-12 lg:mt-16 flex flex-col items-center gap-2 select-none"
      >
        <span className="text-[10px] tracking-[0.45em] uppercase text-[#999999] font-light font-['Inter']">
          SCROLL
        </span>
        <div className="w-[1px] h-8 sm:h-9 bg-[#E8E8E5] relative overflow-hidden">
          <motion.div
            animate={{ y: [-36, 36] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-full h-4 bg-[var(--red)]"
          />
        </div>
      </motion.div>
    </section>
  );
};
