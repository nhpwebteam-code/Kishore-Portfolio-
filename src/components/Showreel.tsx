import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ── 1. Node Data Array ──
interface ShowreelNode {
  num: string;
  title: string;
  platform: "YOUTUBE" | "INSTAGRAM";
  url: string;
  thumb: string;
  hqThumb: string;
  fallbackPhoto: string;
  circlePhoto: string;
  tag: string;
  role: string;
  neutralLine: string;
  buttonText: string;
  isInstagram?: boolean;
}

const showreelNodes: ShowreelNode[] = [
  {
    num: "01",
    title: "THE EXAM",
    platform: "YOUTUBE",
    url: "https://youtu.be/wHaIOSVCj6c?si=lqAsxCPvrm0z5-KG",
    thumb: "https://img.youtube.com/vi/wHaIOSVCj6c/maxresdefault.jpg",
    hqThumb: "https://img.youtube.com/vi/wHaIOSVCj6c/hqdefault.jpg",
    fallbackPhoto: "/photos/portfolio-1.jpg",
    circlePhoto: "/photos/portfolio-1.jpg",
    tag: "ON YOUTUBE",
    role: "ROLE: CH. RATHNA KISHORE REDDY",
    neutralLine: "Watch the full video on YouTube.",
    buttonText: "WATCH ON YOUTUBE ↗",
  },
  {
    num: "02",
    title: "THE INTERVIEW",
    platform: "YOUTUBE",
    url: "https://youtu.be/146apjQOrb8?si=VqukWgQAovgCJO5e",
    thumb: "/photos/thumb-the-interview.jpg",
    hqThumb: "/photos/thumb-the-interview.jpg",
    fallbackPhoto: "/photos/thumb-the-interview.jpg",
    circlePhoto: "/photos/portfolio-2.jpg",
    tag: "ON YOUTUBE",
    role: "ROLE: CH. RATHNA KISHORE REDDY",
    neutralLine: "Watch the full video on YouTube.",
    buttonText: "WATCH ON YOUTUBE ↗",
  },
  {
    num: "03",
    title: "THE EXAM",
    platform: "INSTAGRAM",
    url: "https://www.instagram.com/reel/DVCxttGElFhDBurjQaTRasAmvnvyZVcPjP4iH00/",
    thumb: "/photos/thumb-the-exam.jpg",
    hqThumb: "/photos/thumb-the-exam.jpg",
    fallbackPhoto: "/photos/thumb-the-exam.jpg",
    circlePhoto: "/photos/portfolio-3.jpg",
    tag: "ON INSTAGRAM",
    role: "ROLE: CH. RATHNA KISHORE REDDY",
    neutralLine: "Watch the reel on Instagram.",
    buttonText: "WATCH ON INSTAGRAM ↗",
    isInstagram: true,
  },
  {
    num: "04",
    title: "THE INTERVIEW",
    platform: "INSTAGRAM",
    url: "https://www.instagram.com/reel/DHdpa0PSVWn/",
    thumb: "/photos/thumb-the-interview.jpg",
    hqThumb: "/photos/thumb-the-interview.jpg",
    fallbackPhoto: "/photos/thumb-the-interview.jpg",
    circlePhoto: "/photos/portfolio-4.jpg",
    tag: "ON INSTAGRAM",
    role: "ROLE: CH. RATHNA KISHORE REDDY",
    neutralLine: "Watch the reel on Instagram.",
    buttonText: "WATCH ON INSTAGRAM ↗",
    isInstagram: true,
  },
];

// ── Smart Thumbnail with 3-stage fallback ──
const SmartThumbnail: React.FC<{
  src: string;
  hqSrc: string;
  localFallback: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ src, hqSrc, localFallback, alt, className, style }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [stage, setStage] = useState<"max" | "hq" | "local">("max");

  const handleError = () => {
    if (stage === "max") {
      setStage("hq");
      setCurrentSrc(hqSrc);
    } else if (stage === "hq") {
      setStage("local");
      setCurrentSrc(localFallback);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="lazy"
      onError={handleError}
      className={className}
      style={style}
    />
  );
};

// ── SVG S-curve path for desktop (viewBox 0 0 1200 2400) ──
const buildDesktopPath = (h: number) => {
  const pts = [
    { x: 600, y: 0 },
    { x: 300, y: h * 0.16 }, // Node 1 (left)
    { x: 900, y: h * 0.42 }, // Node 2 (right)
    { x: 300, y: h * 0.68 }, // Node 3 (left)
    { x: 900, y: h * 0.88 }, // Node 4 (right)
    { x: 600, y: h },
  ];
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p = pts[i];
    const q = pts[i + 1];
    const cy1 = p.y + (q.y - p.y) * 0.55;
    const cy2 = p.y + (q.y - p.y) * 0.45;
    d += ` C ${p.x} ${cy1}, ${q.x} ${cy2}, ${q.x} ${q.y}`;
  }
  return d;
};

// ── Video Card Component (External link, no modal, lazy thumbnail with grayscale hover) ──
const VideoCard: React.FC<{ node: ShowreelNode }> = ({ node }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full flex flex-col gap-3">
      <a
        href={node.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative block w-full overflow-hidden border border-[#E6E6E6] hover:border-[#0A0A0A] transition-colors duration-300 group cursor-pointer shadow-sm"
        style={{
          aspectRatio: "16 / 9",
          backgroundColor: "#F4F4F2",
        }}
        aria-label={`${node.buttonText}: ${node.title}`}
      >
        {/* Lazy Loading Thumbnail with Fallback */}
        <SmartThumbnail
          src={node.thumb}
          hqSrc={node.hqThumb}
          localFallback={node.fallbackPhoto}
          alt={node.title}
          className="w-full h-full object-cover transition-all duration-500 ease-out"
          style={{
            filter: isHovered ? "grayscale(0)" : "grayscale(1)",
            transform: isHovered ? "scale(1.03)" : "scale(1)",
          }}
        />

        {/* Platform Badge (Top-Right Corner) */}
        <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none">
          {node.platform === "YOUTUBE" ? (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#0A0A0A]/85 backdrop-blur-sm border border-white/10 text-white text-[9px] font-mono tracking-wider uppercase">
              <svg className="w-3 h-3 fill-[#E10D1F]" viewBox="0 0 24 24">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" />
              </svg>
              <span>YOUTUBE</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#0A0A0A]/85 backdrop-blur-sm border border-white/10 text-white text-[9px] font-mono tracking-wider uppercase">
              <svg className="w-3 h-3 fill-none stroke-current text-[#E10D1F]" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>REEL</span>
            </div>
          )}
        </div>

        {/* Clickable Play Button in Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-transform duration-300 shadow-lg"
            style={{
              backgroundColor: "var(--red)",
              transform: isHovered ? "scale(1.12)" : "scale(1)",
            }}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-white translate-x-0.5" viewBox="0 0 24 24">
              <polygon points="6,4 20,12 6,20" />
            </svg>
          </div>
        </div>
      </a>

      {/* Button Under Thumbnail: 11px, tracked, 1px black border, fills red on hover */}
      <a
        href={node.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 text-[11px] font-mono tracking-[0.25em] uppercase text-[#0A0A0A] bg-transparent hover:bg-[var(--red)] border border-[#0A0A0A] hover:border-[var(--red)] hover:text-white transition-all duration-300 cursor-pointer text-center font-medium"
      >
        <span>{node.buttonText}</span>
      </a>
    </div>
  );
};

// ── Node Text Block (Tag, Title, Role, Neutral Line) ──
const NodeDetails: React.FC<{ node: ShowreelNode }> = ({ node }) => {
  return (
    <div className="w-full flex flex-col justify-center">
      {/* Red Tag Line: 10px, tracked 0.35em */}
      <span className="font-mono text-[10px] tracking-[0.35em] text-[var(--red)] uppercase font-semibold mb-2 block">
        {node.tag}
      </span>

      {/* Title + optional Instagram Version tag */}
      <h3 className="text-[#0A0A0A] font-['Jost'] font-light uppercase tracking-tight text-xl sm:text-2xl lg:text-3xl leading-snug mb-2">
        <span>{node.title}</span>
        {node.isInstagram && (
          <span className="ml-2 text-xs sm:text-sm font-light text-[#8A8A8A] font-['Inter'] lowercase tracking-normal">
            · instagram version
          </span>
        )}
      </h3>

      {/* Role: 12px, tracked, grey */}
      <p className="font-mono text-[12px] tracking-[0.18em] uppercase text-[#777777] mb-2 font-normal">
        {node.role}
      </p>

      {/* Short neutral line */}
      <p className="font-['Inter'] text-[13px] sm:text-[14px] text-[#555555] font-light leading-relaxed">
        {node.neutralLine}
      </p>
    </div>
  );
};

// ── Circular Photo for Ribbon Node (with Fallback) ──
const CircularRibbonPhoto: React.FC<{
  node: ShowreelNode;
  size?: number;
}> = ({ node, size = 80 }) => {
  return (
    <a
      href={node.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative rounded-full overflow-hidden border-2 border-[var(--red)] flex items-center justify-center group cursor-pointer shadow-md flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: "#F4F4F2" }}
      aria-label={`Open ${node.title}`}
    >
      <SmartThumbnail
        src={node.circlePhoto}
        hqSrc={node.circlePhoto}
        localFallback={node.fallbackPhoto}
        alt={node.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
    </a>
  );
};

export const Showreel: React.FC = () => {
  const heroScrollRef = useRef<HTMLDivElement>(null);
  const roadWrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dashRef = useRef<SVGPathElement>(null);
  const edgeRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const [expandProgress, setExpandProgress] = useState(0);
  const [drawPct, setDrawPct] = useState(0);

  const svgH = 2400;
  const dPath = buildDesktopPath(svgH);

  // Scroll expansion effect for the showcase hero photo & title reveal
  useEffect(() => {
    let ticking = false;
    const onHeroScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const el = heroScrollRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const windowH = window.innerHeight;
            const totalDist = el.offsetHeight - windowH;
            if (totalDist > 0) {
              const scrolled = -rect.top;
              const p = Math.max(0, Math.min(1, scrolled / totalDist));
              setExpandProgress(p);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onHeroScroll, { passive: true });
    onHeroScroll();
    return () => window.removeEventListener("scroll", onHeroScroll);
  }, []);

  // Scroll drawing effect for ribbon road
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const el = roadWrapRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const viewH = window.innerHeight;
            const start = rect.top + window.scrollY - viewH * 0.8;
            const end = rect.top + window.scrollY + rect.height - viewH * 0.4;
            const scroll = window.scrollY;
            const pct = Math.max(0, Math.min(1, (scroll - start) / (end - start)));
            setDrawPct(pct);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Update stroke-dashoffset & dot position
  useEffect(() => {
    const path = pathRef.current;
    const dash = dashRef.current;
    const edge = edgeRef.current;
    const dot = dotRef.current;
    if (!path) return;

    const len = path.getTotalLength();
    const drawn = len * Math.max(0.12, drawPct);
    const offset = len - drawn;

    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${offset}`;

    if (dash) {
      dash.style.strokeDasharray = `8 12`;
      dash.style.clipPath = `inset(0 0 ${(1 - Math.max(0.12, drawPct)) * 100}% 0)`;
    }
    if (edge) {
      edge.style.strokeDasharray = `${len}`;
      edge.style.strokeDashoffset = `${offset}`;
    }

    if (dot) {
      const pt = path.getPointAtLength(drawn);
      const svg = path.ownerSVGElement;
      if (svg) {
        const svgRect = svg.getBoundingClientRect();
        const scaleX = svgRect.width / 1200;
        const scaleY = svgRect.height / svgH;
        dot.style.left = `${pt.x * scaleX}px`;
        dot.style.top = `${pt.y * scaleY}px`;
        dot.style.opacity = "1";
      }
    }
  }, [drawPct]);

  return (
    <section
      id="showreel"
      className="relative w-full bg-[#FFFFFF] select-none"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
      aria-label="Showcases - On-Screen Journey"
    >
      {/* ── 1. SCROLL-EXPANDING SHOWCASES HERO PHOTO + DRAMATIC TITLE REVEAL ── */}
      <div
        ref={heroScrollRef}
        className="relative w-full"
        style={{ height: "180vh" }}
      >
        <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#FFFFFF]">
          {/* Pre-scroll indicator above card — placed safely below fixed navbar */}
          <div
            className="absolute top-20 sm:top-24 inset-x-0 flex flex-col items-center pointer-events-none transition-opacity duration-300 z-20"
            style={{ opacity: Math.max(0, 1 - expandProgress * 2.5) }}
          >
            <div className="flex items-center gap-3 mb-1.5">
              <span className="font-mono text-xs tracking-[0.4em] text-[var(--red)] uppercase font-semibold">
                SHOWCASES
              </span>
              <div className="h-px w-8 bg-[#E6E6E6]" />
              <span className="font-mono text-xs tracking-[0.4em] text-[#8A8A8A] uppercase">
                MY JOURNEY ON SCREEN
              </span>
            </div>
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#999999]">
              SCROLL TO ENTER SHOWCASES ↓
            </p>
          </div>

          {/* Expanding Photo Canvas: starts framed, expands to full screen on scroll */}
          <div
            className="relative overflow-hidden flex items-center justify-center"
            style={{
              width: `${68 + 32 * Math.min(1, expandProgress / 0.65)}vw`,
              maxWidth: expandProgress >= 0.65 ? "100vw" : "1180px",
              height: `${52 + 48 * Math.min(1, expandProgress / 0.65)}vh`,
              borderRadius: `${Math.round(20 * (1 - Math.min(1, expandProgress / 0.65)))}px`,
              boxShadow:
                expandProgress >= 0.65 ? "none" : "0 30px 60px -15px rgba(0,0,0,0.25)",
            }}
          >
            {/* Actor Portrait in Rich Natural Color */}
            <img
              src="/photos/showcase-hero.jpg"
              alt="Ch. Rathna Kishore Reddy - Showcases"
              className="w-full h-full object-cover object-center"
              style={{
                transform: `scale(${1.08 - 0.08 * Math.min(1, expandProgress / 0.65)})`,
                filter: "saturate(1.22) contrast(1.05) brightness(1.02)",
              }}
              draggable={false}
            />

            {/* Ambient Radial Lighting for Title Contrast */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: Math.max(0.18, Math.min(0.55, 0.18 + (expandProgress / 0.65) * 0.37)),
                background:
                  "radial-gradient(circle at 50% 45%, transparent 25%, rgba(0,0,0,0.65) 85%), linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 100%)",
              }}
            />

            {/* ── DRAMATIC TITLE REVEAL OVER FULL SCREEN PHOTO ── */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 sm:p-12 z-30 pointer-events-none select-none"
              style={{
                opacity: Math.max(0, Math.min(1, (expandProgress - 0.25) / 0.4)),
                transform: `translateY(${Math.round(
                  (1 - Math.max(0, Math.min(1, (expandProgress - 0.25) / 0.4))) * 35
                )}px)`,
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
            >
              {/* Red accent eyebrow */}
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="font-mono text-xs sm:text-sm tracking-[0.45em] text-[var(--red)] uppercase font-semibold">
                  REEL & PERFORMANCES
                </span>
                <div className="h-px w-10 bg-[var(--red)]" />
                <span className="font-mono text-xs sm:text-sm tracking-[0.45em] text-white/90 uppercase font-light">
                  MY JOURNEY ON SCREEN
                </span>
              </div>

              {/* Main Title "SHOWCASES" */}
              <h2
                className="text-white uppercase font-light leading-none tracking-tight font-['Jost']"
                style={{
                  fontSize: "clamp(3.8rem, 11vw, 9.5rem)",
                  letterSpacing: "0.06em",
                  textShadow: "0 4px 40px rgba(0,0,0,0.95)",
                }}
              >
                SHOWCASES
              </h2>

              {/* Subtitle / Production categories */}
              <p className="mt-4 sm:mt-5 text-neutral-200 text-xs sm:text-sm font-light tracking-[0.3em] uppercase max-w-xl mx-auto font-['Inter'] drop-shadow-md">
                FEATURE FILM · SERIES DRAMA · METHOD LAB · LIVE REPERTORY
              </p>

              {/* Indicator guiding to roadmap */}
              <div className="mt-8 sm:mt-10 flex flex-col items-center gap-2">
                <span className="text-[10px] font-mono tracking-[0.4em] text-[var(--red)] uppercase font-medium">
                  EXPLORE ROADMAP
                </span>
                <div className="w-[1px] h-8 bg-white/40 relative overflow-hidden">
                  <div className="w-full h-3 bg-[var(--red)] animate-bounce" />
                </div>
              </div>
            </div>

            {/* Seamless Bottom Gradient Fade into Road Background */}
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                height: 120,
                background: "linear-gradient(to top, rgba(255,255,255,0.95), transparent)",
                opacity: expandProgress >= 0.7 ? 1 : 0,
                transition: "opacity 0.4s",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── 2. FOLLOWED BY ROADMAP SHOWCASES (ROAD + NODES) ── */}
      <div
        ref={roadWrapRef}
        className="relative w-full pt-16 sm:pt-24 pb-16 sm:pb-24 px-6 md:px-10 lg:px-20"
        style={{ maxWidth: 1280, marginInline: "auto" }}
      >
        {/* ── SECTION HEADER BLOCK (Header margin-bottom 120px, text z-index above ribbon) ── */}
        <div
          className="relative z-20 w-full text-center select-none"
          style={{ marginBottom: 120 }}
        >
          {/* Eyebrow Label: Red mono uppercase, never clipped */}
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="text-[var(--red)] font-mono text-xs tracking-[0.4em] uppercase font-semibold">
              THE ROADMAP
            </span>
            <div className="w-8 h-px bg-[#E6E6E6]" />
            <span className="text-[#8A8A8A] font-mono text-xs tracking-[0.4em] uppercase">
              4 PRODUCTION MILESTONES
            </span>
          </div>

          {/* Main Title: ON-SCREEN JOURNEY */}
          <h3 className="text-[#0A0A0A] font-['Jost'] font-light uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl leading-none">
            ON-SCREEN JOURNEY
          </h3>

          <p className="mt-4 text-[#8A8A8A] text-[10px] sm:text-xs md:text-sm font-light tracking-[0.16em] sm:tracking-[0.3em] uppercase max-w-xl mx-auto font-['Inter'] px-4 leading-relaxed">
            FEATURE FILM · SERIES DRAMA · METHOD LAB · LIVE REPERTORY
          </p>
        </div>

        {/* ── RIBBON ROAD + NODES WRAPPER (Starts strictly below the header block) ── */}
        <div className="relative w-full z-10">
          {/* ── DESKTOP SVG ROAD (≥1024px, S-curve center ribbon) ── */}
          <div
            className="hidden lg:block absolute inset-0 pointer-events-none z-0"
            style={{ overflow: "visible" }}
          >
            <svg
              viewBox={`0 0 1200 ${svgH}`}
              className="w-full h-full"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Dark Red Depth Border */}
              <path
                ref={edgeRef}
                d={dPath}
                stroke="#B00A18"
                strokeWidth={76}
                strokeLinecap="round"
                fill="none"
                style={{ willChange: "stroke-dashoffset" }}
              />
              {/* Main Vivid Red Road */}
              <path
                ref={pathRef}
                d={dPath}
                stroke="#E10D1F"
                strokeWidth={70}
                strokeLinecap="round"
                fill="none"
                style={{ willChange: "stroke-dashoffset" }}
              />
              {/* Center Dashed White Guide Line */}
              <path
                ref={dashRef}
                d={dPath}
                stroke="#FFFFFF"
                strokeWidth={2}
                strokeDasharray="8 12"
                strokeLinecap="round"
                fill="none"
                style={{ willChange: "clip-path" }}
              />
            </svg>

            {/* Tracking Headlight Dot */}
            <div
              ref={dotRef}
              className="absolute z-10 pointer-events-none"
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#0A0A0A",
                border: "2px solid #E10D1F",
                transform: "translate(-50%,-50%)",
                opacity: 0,
                transition: "opacity 0.2s",
              }}
            />
          </div>

          {/* ── TABLET VERTICAL RIBBON (640px – 1023px, left-third alignment) ── */}
          <div
            className="hidden sm:block lg:hidden absolute top-0 bottom-0 pointer-events-none z-0"
            style={{ left: "28%", width: 44, transform: "translateX(-50%)" }}
          >
            <div className="absolute inset-0 rounded-full bg-[#B00A18] w-[48px] -left-[2px]" />
            <div className="absolute inset-0 rounded-full bg-[#E10D1F] w-[44px]" />
            <div
              className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #fff 0 8px, transparent 8px 18px)",
              }}
            />
          </div>

          {/* ── MOBILE VERTICAL STRIP (<640px, straight 40px strip at left edge) ── */}
          <div
            className="block sm:hidden absolute top-0 bottom-0 pointer-events-none z-0"
            style={{ left: 8, width: 40 }}
          >
            <div className="absolute inset-0 rounded-full bg-[#B00A18] w-[44px] -left-[2px]" />
            <div className="absolute inset-0 rounded-full bg-[#E10D1F] w-[40px]" />
            <div
              className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #fff 0 8px, transparent 8px 18px)",
              }}
            />
          </div>

          {/* ── 4 SHOWREEL NODES ── */}
          <div className="relative z-10 flex flex-col gap-24 sm:gap-32 lg:gap-40 py-6">
            {showreelNodes.map((node, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div key={node.num} className="relative w-full">
                  {/* 1. DESKTOP LAYOUT (≥1024px): 3 columns, ribbon in center, alternating sides */}
                  <div
                    className="hidden lg:grid items-center gap-12"
                    style={{
                      gridTemplateColumns: isEven
                        ? "360px 1fr 360px"
                        : "360px 1fr 360px",
                    }}
                  >
                    {/* Left Column */}
                    {isEven ? (
                      <div className="max-w-[360px] w-full">
                        <NodeDetails node={node} />
                      </div>
                    ) : (
                      <div className="max-w-[360px] w-full">
                        <VideoCard node={node} />
                      </div>
                    )}

                    {/* Center Column: Circular photo sitting directly on ribbon */}
                    <div className="flex flex-col items-center justify-center relative">
                      {/* Milestone Number Badge */}
                      <span className="mb-2 font-mono text-[11px] font-semibold text-[#0A0A0A] bg-white/90 border border-[#E6E6E6] px-2 py-0.5 rounded-full shadow-sm">
                        {node.num}
                      </span>
                      <CircularRibbonPhoto node={node} size={84} />
                    </div>

                    {/* Right Column */}
                    {isEven ? (
                      <div className="max-w-[360px] w-full">
                        <VideoCard node={node} />
                      </div>
                    ) : (
                      <div className="max-w-[360px] w-full">
                        <NodeDetails node={node} />
                      </div>
                    )}
                  </div>

                  {/* 2. TABLET LAYOUT (640px – 1023px): Ribbon at left third, content to the right */}
                  <div className="hidden sm:grid lg:hidden grid-cols-12 items-center gap-8">
                    {/* Column for circle photo on ribbon */}
                    <div className="col-span-4 flex flex-col items-center justify-center">
                      <span className="mb-2 font-mono text-[10px] font-semibold text-[#0A0A0A] bg-white border border-[#E6E6E6] px-2 py-0.5 rounded-full shadow-sm">
                        {node.num}
                      </span>
                      <CircularRibbonPhoto node={node} size={76} />
                    </div>

                    {/* Column for text & video card on the right */}
                    <div className="col-span-8 flex flex-col gap-6 max-w-[420px]">
                      <NodeDetails node={node} />
                      <VideoCard node={node} />
                    </div>
                  </div>

                  {/* 3. MOBILE LAYOUT (<640px): Straight 40px strip on left, stacked content on right */}
                  <div className="block sm:hidden relative pl-20">
                    {/* Circle photo positioned atop the 40px vertical strip */}
                    <div className="absolute left-0 top-0 flex flex-col items-center">
                      <span className="mb-1 font-mono text-[9px] font-bold text-[var(--red)] bg-white px-1.5 py-0.5 rounded-full border border-[#E6E6E6] shadow-xs">
                        {node.num}
                      </span>
                      <CircularRibbonPhoto node={node} size={56} />
                    </div>

                    {/* Stacked node content to the right */}
                    <div className="flex flex-col gap-4 w-full">
                      <NodeDetails node={node} />
                      <VideoCard node={node} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── BOTTOM SKYLINE SILHOUETTE ── */}
        <div className="relative w-full mt-24 sm:mt-32" style={{ height: 140 }}>
          <svg
            viewBox="0 0 1200 160"
            className="w-full h-full"
            preserveAspectRatio="none"
            fill="#3A3A3A"
            style={{ filter: "grayscale(1)", opacity: 0.14 }}
          >
            {/* Charminar */}
            <rect x="80" y="50" width="8" height="110" />
            <rect x="120" y="50" width="8" height="110" />
            <path d="M88,70 Q104,45 120,70 L120,160 L88,160 Z" />
            <rect x="93" y="90" width="22" height="30" rx="11" fill="#FFFFFF" />
            {/* Temple gopuram */}
            <polygon points="200,160 220,30 240,160" />
            <polygon points="215,30 220,10 225,30" fill="#E10D1F" opacity="0.5" />
            {/* Modern towers */}
            <rect x="300" y="60" width="30" height="100" />
            <rect x="340" y="40" width="25" height="120" />
            <rect x="375" y="70" width="20" height="90" />
            {/* Bandra cable bridge */}
            <line x1="460" y1="80" x2="560" y2="80" stroke="#3A3A3A" strokeWidth="3" />
            <path d="M480,80 Q510,30 540,80" fill="none" stroke="#3A3A3A" strokeWidth="2" />
            <line x1="510" y1="35" x2="510" y2="80" stroke="#3A3A3A" strokeWidth="2" />
            {/* Mumbai skyline */}
            <rect x="600" y="50" width="35" height="110" />
            <rect x="645" y="30" width="40" height="130" />
            <rect x="695" y="55" width="28" height="105" />
            <rect x="733" y="65" width="22" height="95" />
            {/* Golconda fort silhouette */}
            <path d="M830,160 L830,80 Q860,60 890,80 L890,160 Z" />
            <rect x="850" y="65" width="20" height="20" rx="10" fill="#FFFFFF" />
            {/* Additional towers */}
            <rect x="950" y="45" width="30" height="115" />
            <polygon points="965,45 965,25 980,45" />
            <rect x="1000" y="70" width="25" height="90" />
            <rect x="1050" y="55" width="35" height="105" />
            <rect x="1100" y="75" width="20" height="85" />
            {/* Ground line */}
            <rect x="0" y="155" width="1200" height="5" fill="#E6E6E6" />
          </svg>
        </div>

        {/* ── CALL TO ACTION BUTTON TO CONTACT ── */}
        <div className="flex items-center justify-center pt-8 pb-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[var(--red)] hover:border-[var(--red)] hover:text-white transition-all duration-300 text-xs font-mono tracking-[0.25em] uppercase font-normal text-decoration-none shadow-xs"
          >
            <span>LET'S WORK TOGETHER</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
