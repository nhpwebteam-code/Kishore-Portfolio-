import React, { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../data/config";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = "Please provide your name or production company.";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Please provide a valid email address.";
    }
    if (!formData.message.trim() || formData.message.length < 5) {
      errs.message = "Please include your casting inquiry or project details.";
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#FFFFFF] text-[#0A0A0A] select-none scroll-mt-[120px]"
      style={{ paddingTop: 140, paddingBottom: 120 }}
      aria-label="Contact and Official Inquiry Desk"
    >
      <div
        className="w-full mx-auto px-6 sm:px-10 lg:px-20"
        style={{ maxWidth: 1280, marginInline: "auto" }}
      >
        {/* ── SECTION HEADER ── */}
        <div className="flex items-center gap-3 mb-5">
          <span
            className="font-mono uppercase text-[var(--red)] font-semibold"
            style={{ fontSize: 12, letterSpacing: "0.4em" }}
          >
            OFFICIAL INQUIRY DESK
          </span>
          <div className="h-px flex-1 max-w-[48px] bg-[#E6E6E6]" />
          <span
            className="font-mono uppercase text-[#8A8A8A]"
            style={{ fontSize: 12, letterSpacing: "0.4em" }}
          >
            REPRESENTATION
          </span>
        </div>

        {/* ── TITLE ── */}
        <h2
          className="text-[#0A0A0A] uppercase font-light leading-none tracking-tight font-['Jost']"
          style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)", lineHeight: 1 }}
        >
          CONTACT
        </h2>
        <p
          className="mt-6 text-[#3A3A3A] font-['Jost'] font-light leading-[1.8]"
          style={{ fontSize: 17, maxWidth: "52ch" }}
        >
          Direct casting desk and representation channels for feature films, series drama, and commercial productions.
        </p>

        {/* ── TWO-COLUMN GRID ── */}
        <div className="contact-grid" style={{ marginTop: 72 }}>
          {/* ═══ LEFT: FORM ═══ */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: 40 }}>
              {/* Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="contact-name"
                  className="text-[10px] uppercase font-mono tracking-[0.35em] mb-2 transition-colors duration-[400ms]"
                  style={{ color: focusedField === "name" ? "var(--red)" : "#8A8A8A" }}
                >
                  NAME *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your name or production house"
                  className="w-full bg-transparent border-0 border-b outline-none py-4 text-[17px] font-['Jost'] font-light text-[#0A0A0A] placeholder:text-[#BBBBBB] transition-colors duration-[400ms]"
                  style={{ borderColor: focusedField === "name" ? "var(--red)" : "#D9D9D9" }}
                />
                {errors.name && (
                  <span className="text-[11px] font-mono text-[var(--red)] mt-1.5">{errors.name}</span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label
                  htmlFor="contact-email"
                  className="text-[10px] uppercase font-mono tracking-[0.35em] mb-2 transition-colors duration-[400ms]"
                  style={{ color: focusedField === "email" ? "var(--red)" : "#8A8A8A" }}
                >
                  EMAIL *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="your.email@production.com"
                  className="w-full bg-transparent border-0 border-b outline-none py-4 text-[17px] font-['Jost'] font-light text-[#0A0A0A] placeholder:text-[#BBBBBB] transition-colors duration-[400ms]"
                  style={{ borderColor: focusedField === "email" ? "var(--red)" : "#D9D9D9" }}
                />
                {errors.email && (
                  <span className="text-[11px] font-mono text-[var(--red)] mt-1.5">{errors.email}</span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label
                  htmlFor="contact-message"
                  className="text-[10px] uppercase font-mono tracking-[0.35em] mb-2 transition-colors duration-[400ms]"
                  style={{ color: focusedField === "message" ? "var(--red)" : "#8A8A8A" }}
                >
                  MESSAGE *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Project details, audition requirements, shoot dates..."
                  className="w-full bg-transparent border-0 border-b outline-none py-4 text-[17px] font-['Jost'] font-light text-[#0A0A0A] placeholder:text-[#BBBBBB] transition-colors duration-[400ms]"
                  style={{
                    borderColor: focusedField === "message" ? "var(--red)" : "#D9D9D9",
                    resize: "none",
                  }}
                />
                {errors.message && (
                  <span className="text-[11px] font-mono text-[var(--red)] mt-1.5">{errors.message}</span>
                )}
              </div>

              {/* Submit */}
              <div style={{ marginTop: 8 }}>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 bg-transparent text-[#0A0A0A] border border-[#0A0A0A] hover:bg-[var(--red)] hover:text-white hover:border-[var(--red)] transition-all duration-300 cursor-pointer"
                  style={{
                    padding: "18px 40px",
                    fontSize: 12,
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    fontFamily: "'Jost', monospace",
                    fontWeight: 400,
                  }}
                >
                  <span>SEND MESSAGE</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </button>

                {isSubmitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[12px] font-mono tracking-[0.25em] text-[var(--red)] uppercase font-medium mt-4"
                  >
                    THANK YOU — WE'LL REPLY SHORTLY
                  </motion.p>
                )}
              </div>
            </form>
          </div>

          {/* ═══ RIGHT: INFO CARD ═══ */}
          <div>
            <div
              className="bg-white"
              style={{
                border: "1px solid #E6E6E6",
                padding: 48,
                position: "relative",
              }}
            >
              {/* Red top bar */}
              <div
                style={{
                  position: "absolute",
                  top: -1,
                  left: -1,
                  right: -1,
                  height: 3,
                  backgroundColor: "var(--red)",
                }}
              />

              {/* Title row */}
              <div className="flex items-center justify-between mb-10">
                <span
                  className="font-mono uppercase text-[var(--red)] font-semibold"
                  style={{ fontSize: 12, letterSpacing: "0.4em" }}
                >
                  DIRECT DESK
                </span>
                <span
                  className="font-mono uppercase text-[#8A8A8A]"
                  style={{ fontSize: 11, letterSpacing: "0.3em" }}
                >
                  REPRESENTATION
                </span>
              </div>

              {/* ── Info Rows ── */}
              <div className="flex flex-col">
                {/* Email */}
                <div className="flex items-start gap-5" style={{ padding: "20px 0" }}>
                  <div
                    className="shrink-0 flex items-center justify-center rounded-full"
                    style={{ width: 44, height: 44, border: "1px solid #D9D9D9" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E10D1F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7L12 13L2 7" />
                    </svg>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span
                      className="font-mono uppercase text-[#8A8A8A] mb-1"
                      style={{ fontSize: 10, letterSpacing: "0.35em" }}
                    >
                      EMAIL
                    </span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="font-['Jost'] font-light text-[#0A0A0A] hover:text-[var(--red)] transition-colors break-all"
                      style={{ fontSize: 16 }}
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="w-full h-px bg-[#E6E6E6]" />

                {/* Phone */}
                <div className="flex items-start gap-5" style={{ padding: "20px 0" }}>
                  <div
                    className="shrink-0 flex items-center justify-center rounded-full"
                    style={{ width: 44, height: 44, border: "1px solid #D9D9D9" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E10D1F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span
                      className="font-mono uppercase text-[#8A8A8A] mb-1"
                      style={{ fontSize: 10, letterSpacing: "0.35em" }}
                    >
                      PHONE / WHATSAPP
                    </span>
                    <a
                      href={siteConfig.contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-['Jost'] font-light text-[#0A0A0A] hover:text-[var(--red)] transition-colors"
                      style={{ fontSize: 16 }}
                    >
                      {siteConfig.contact.whatsappDisplay}
                    </a>
                  </div>
                </div>

                <div className="w-full h-px bg-[#E6E6E6]" />

                {/* Location */}
                <div className="flex items-start gap-5" style={{ padding: "20px 0" }}>
                  <div
                    className="shrink-0 flex items-center justify-center rounded-full"
                    style={{ width: 44, height: 44, border: "1px solid #D9D9D9" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E10D1F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span
                      className="font-mono uppercase text-[#8A8A8A] mb-1"
                      style={{ fontSize: 10, letterSpacing: "0.35em" }}
                    >
                      BASED IN
                    </span>
                    <span
                      className="font-['Jost'] font-light text-[#0A0A0A]"
                      style={{ fontSize: 16 }}
                    >
                      {siteConfig.actor.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Social Links ── */}
              <div className="mt-8 pt-6 border-t border-[#E6E6E6]">
                <span
                  className="font-mono uppercase text-[#8A8A8A] block mb-4"
                  style={{ fontSize: 10, letterSpacing: "0.35em" }}
                >
                  OFFICIAL SOCIALS
                </span>
                <div className="flex items-center gap-5">
                  <a
                    href={siteConfig.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-mono uppercase text-[#0A0A0A] hover:text-[var(--red)] transition-colors"
                    style={{ fontSize: 11, letterSpacing: "0.25em" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                    <span>INSTAGRAM</span>
                    <span className="text-[10px] opacity-50 group-hover:opacity-100 transition-opacity">↗</span>
                  </a>
                  <a
                    href={siteConfig.contact.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-mono uppercase text-[#0A0A0A] hover:text-[var(--red)] transition-colors"
                    style={{ fontSize: 11, letterSpacing: "0.25em" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                      <polygon points="9.75,15.02 15.5,12 9.75,8.98" />
                    </svg>
                    <span>YOUTUBE</span>
                    <span className="text-[10px] opacity-50 group-hover:opacity-100 transition-opacity">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RESPONSIVE GRID STYLE ── */}
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 7fr 5fr;
          gap: 96px;
          align-items: start;
        }
        @media (max-width: 899px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 56px;
          }
          .contact-grid > div:first-child { order: 1; }
          .contact-grid > div:last-child { order: 2; }
        }
      `}</style>
    </section>
  );
};
