import React from "react";
import { motion } from "framer-motion";

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full bg-[#FFFFFF] text-[#0A0A0A] select-none scroll-mt-[120px] border-b border-[#E6E6E6]"
      style={{ paddingTop: 140, paddingBottom: 120 }}
      aria-label="About the Actor"
    >
      {/* ── SITE CONTAINER: max-width 1280px, margin 0 auto, padding 80px (tablet 40px, mobile 24px) ── */}
      <div
        className="w-full mx-auto px-6 sm:px-10 lg:px-20"
        style={{
          maxWidth: 1280,
          marginInline: "auto",
        }}
      >
        {/* ── 2-COLUMN GRID (5fr / 7fr, gap 96px, align-items start) ── */}
        <div className="about-grid">
          {/* ── LEFT COLUMN (5fr): Sticky Photo with 16px Offset Frame & HTML Anton Text Overlay ── */}
          <div className="relative w-full lg:sticky lg:top-[120px] overflow-visible">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[460px] aspect-[3/4] group select-none mx-auto lg:mx-0 overflow-visible"
            >
              {/* 1px #D9D9D9 frame offset 16px behind it */}
              <div
                className="absolute inset-0 translate-x-[16px] translate-y-[16px] border border-[#D9D9D9] pointer-events-none z-0 -rotate-1 transition-transform duration-500 group-hover:translate-x-[20px] group-hover:translate-y-[20px]"
                aria-hidden="true"
              />

              {/* Photo container with container-type: inline-size (-1deg tilt) */}
              <div
                className="relative z-10 w-full h-full shadow-lg cursor-pointer transition-all duration-500 ease-out"
                style={{
                  transform: "rotate(-1deg)",
                  containerType: "inline-size",
                  overflow: "hidden",
                }}
              >
                {/* Original photo without baked-in text */}
                <img
                  src="/photos/about-clean.jpg"
                  alt="Ch. Rathna Kishore Reddy"
                  className="w-full h-full object-cover transition-all duration-500 ease-out"
                  style={{
                    filter: "saturate(0.85) contrast(1.08) brightness(0.98)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.filter = "none";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.filter =
                      "saturate(0.85) contrast(1.08) brightness(0.98)";
                  }}
                  draggable={false}
                />

                {/* ::after overlay: background #808080; mix-blend-mode: saturation; opacity 0.3 */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
                  style={{
                    backgroundColor: "#808080",
                    mixBlendMode: "saturation",
                    opacity: 0.3,
                  }}
                  aria-hidden="true"
                />

                {/* Second overlay: linear-gradient(to top, rgba(10,10,10,0.45), transparent 40%) for text readability */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,10,10,0.45), transparent 40%)",
                  }}
                  aria-hidden="true"
                />

                {/* Subtle top gradient for high text contrast */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(10,10,10,0.25) 0%, transparent 35%)",
                  }}
                  aria-hidden="true"
                />

                {/* TEXT ON PHOTO (Never Truncates, container query 9.2cqw with Anton) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="absolute z-20 pointer-events-none"
                  style={{
                    top: "14%",
                    left: "6%",
                    right: "6%",
                    overflow: "visible",
                  }}
                >
                  {/* Line 1 "RATHNA KISHORE": font Anton, uppercase, color #E10D1F, must NEVER truncate */}
                  <div
                    className="uppercase text-[#E10D1F] tracking-[0.01em] leading-[0.95]"
                    style={{
                      fontFamily: "'Anton', Impact, sans-serif",
                      fontSize: "clamp(1.4rem, 9.2cqw, 3.2rem)",
                      whiteSpace: "nowrap",
                      overflow: "visible",
                      textOverflow: "clip",
                      textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                    }}
                  >
                    RATHNA KISHORE
                  </div>

                  {/* Line 2 "THE ACTOR": 40% of line 1 */}
                  <div
                    className="uppercase text-[#FFFFFF] tracking-[0.06em] mt-2.5"
                    style={{
                      fontFamily: "'Anton', Impact, sans-serif",
                      fontSize: "calc(clamp(1.4rem, 9.2cqw, 3.2rem) * 0.40)",
                      whiteSpace: "nowrap",
                      overflow: "visible",
                      textOverflow: "clip",
                      textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                    }}
                  >
                    THE ACTOR
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN (7fr): Editorial Typography & Details ── */}
          <div className="flex flex-col justify-start z-10 pt-2 lg:pt-0">
            {/* Header row: Label row margin-bottom 24px */}
            <div className="flex items-center gap-3" style={{ marginBottom: 24 }}>
              <span
                className="font-mono uppercase text-[#E10D1F] font-semibold"
                style={{ fontSize: 12, letterSpacing: "0.4em" }}
              >
                ARTIST PROFILE & IDENTITY
              </span>
              <div className="h-px w-10 bg-[#E6E6E6]" />
            </div>

            {/* Title "ABOUT": font Jost 300, margin-bottom 40px */}
            <h2
              className="text-[#0A0A0A] font-['Jost'] font-light uppercase leading-none tracking-tight"
              style={{
                fontSize: "clamp(3.5rem, 7vw, 6.5rem)",
                lineHeight: 1,
                marginBottom: 40,
              }}
            >
              ABOUT
            </h2>

            {/* Quote: margin-bottom 40px */}
            <blockquote
              className="border-l-2 border-[#E10D1F] pl-5 text-[#0A0A0A] italic font-['Jost'] font-light leading-relaxed"
              style={{
                fontSize: "clamp(1.15rem, 2vw, 1.4rem)",
                marginBottom: 40,
              }}
            >
              "True screen presence is disciplined vulnerability — communicating seismic emotional gravity in absolute stillness."
            </blockquote>

            {/* Bio paragraphs: Jost 300, 17px, line-height 1.85, 20px gap, max-width 62ch */}
            <div
              className="flex flex-col text-[#3A3A3A] font-['Jost'] font-light"
              style={{
                fontSize: 17,
                lineHeight: 1.85,
                gap: 20,
                maxWidth: "62ch",
              }}
            >
              <p>
                Ch. Rathna Kishore Reddy is an Indian film, theatre, and screen actor based in
                Hyderabad. With disciplined foundations in physical theatre, character
                psychology, and camera technique, he navigates the silent emotional gravity of the
                protagonist to transformative, nuanced character studies.
              </p>
              <p>
                Fluent across Telugu, Hindi, and English, his work spans indie feature dramas,
                neo-noir series, and repertory stage adaptations. Grounded in Method traditions, he
                approaches every narrative with raw vulnerability and commanding cinematic presence.
              </p>
            </div>

            {/* Stats row: margin-top 48px, 4 equal columns, hairline top/bottom, padding 24px 0, nowrap on values */}
            <div
              className="w-full border-t border-b border-[#E6E6E6] grid grid-cols-2 sm:grid-cols-4 gap-6"
              style={{
                marginTop: 48,
                paddingTop: 24,
                paddingBottom: 24,
              }}
            >
              <div>
                <span className="block text-[10px] tracking-[0.35em] uppercase text-[#8A8A8A] font-mono mb-1.5">
                  AGE
                </span>
                <span className="block text-[16px] font-normal text-[#0A0A0A] font-['Jost'] whitespace-nowrap">
                  20
                </span>
              </div>
              <div>
                <span className="block text-[10px] tracking-[0.35em] uppercase text-[#8A8A8A] font-mono mb-1.5">
                  HEIGHT
                </span>
                <span className="block text-[16px] font-normal text-[#0A0A0A] font-['Jost'] whitespace-nowrap">
                  5' 9" (175 cm)
                </span>
              </div>
              <div>
                <span className="block text-[10px] tracking-[0.35em] uppercase text-[#8A8A8A] font-mono mb-1.5">
                  LANGUAGES
                </span>
                <span className="block text-[16px] font-normal text-[#0A0A0A] font-['Jost'] whitespace-nowrap">
                  Telugu · Hindi · Eng
                </span>
              </div>
              <div>
                <span className="block text-[10px] tracking-[0.35em] uppercase text-[#8A8A8A] font-mono mb-1.5">
                  DISCIPLINE
                </span>
                <span className="block text-[16px] font-normal text-[#0A0A0A] font-['Jost'] whitespace-nowrap">
                  Method & Stage
                </span>
              </div>
            </div>

            {/* Under stats, margin-top 32px: flex row, space-between, align center, gap 24px */}
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6"
              style={{ marginTop: 32 }}
            >
              <div className="flex items-center gap-2.5 text-[12px] font-mono tracking-[0.25em] text-[#8A8A8A] uppercase whitespace-nowrap">
                <span>HYDERABAD</span>
                <span className="text-[#D9D9D9]">/</span>
                <span>SCREEN & THEATRE</span>
              </div>

              {/* Print Official Casting Sheet Button (no wrap, padding 14px 28px) */}
              <button
                onClick={() => window.print()}
                className="border border-[#0A0A0A] text-[11px] font-mono tracking-[0.25em] uppercase text-[#0A0A0A] hover:bg-[#E10D1F] hover:border-[#E10D1F] hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
                style={{ padding: "14px 28px" }}
              >
                PRINT OFFICIAL CASTING SHEET ↓
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── RESPONSIVE GRID STYLE (5fr / 7fr Desktop, 1fr Below 900px) ── */}
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: 96px;
          align-items: start;
        }
        @media (max-width: 899px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 56px;
          }
        }
      `}</style>
    </section>
  );
};
