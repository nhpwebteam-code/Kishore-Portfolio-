import React, { useState, useEffect, useRef, useCallback } from "react";
import { photosData, PhotoItem } from "../data/photos";
import { Lightbox } from "./Lightbox";

export const PhotosSection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isAutoSpin] = useState<boolean>(true);
  const [activeCenterIdx, setActiveCenterIdx] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 360-degree Continuous Rotation Physics
  const targetRotRef = useRef<number>(0);
  const currentRotRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartRotRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const hasMovedRef = useRef<boolean>(false);
  const autoSpinRef = useRef<boolean>(true);

  const total = photosData.length; // 4 unique photos

  useEffect(() => {
    autoSpinRef.current = isAutoSpin;
  }, [isAutoSpin]);

  // Frame Loop: 360-degree Continuous Rotation & Inertia
  useEffect(() => {
    let animId: number;

    const render = () => {
      // 1. Continuous slow rotation
      if (autoSpinRef.current && !isDraggingRef.current) {
        targetRotRef.current -= 0.07;
      }

      // 2. Smooth Lerp toward target rotation
      const rotDiff = targetRotRef.current - currentRotRef.current;
      if (Math.abs(rotDiff) > 0.001) {
        currentRotRef.current += rotDiff * 0.08;
      } else {
        currentRotRef.current = targetRotRef.current;
      }

      const curRot = currentRotRef.current;
      const isMobile = window.innerWidth < 768;

      // 3D circular radius & depth tuned for all screen sizes
      const radiusX = isMobile
        ? window.innerWidth * 0.48
        : Math.min(580, window.innerWidth * 0.35);
      const depthZ = isMobile ? 220 : Math.min(360, window.innerWidth * 0.22);
      const rotAngleMultiplier = isMobile ? 38 : 42;

      let closestIdx = 0;
      let minAngleDist = 999;

      // Update each panel's position along the 360-degree cylinder
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;

        let normAngle = ((i * 90 + curRot) % 360 + 360) % 360;
        if (normAngle > 180) {
          normAngle -= 360;
        }

        const absAngle = Math.abs(normAngle);
        if (absAngle < minAngleDist) {
          minAngleDist = absAngle;
          closestIdx = i;
        }

        const rad = (normAngle * Math.PI) / 180;

        const transX = Math.sin(rad) * radiusX;
        const transZ = (Math.cos(rad) - 1) * depthZ;
        const rotY = Math.sin(rad) * rotAngleMultiplier;
        const zIndex = Math.round((Math.cos(rad) + 1) * 50);
        const opacity = isMobile
          ? (Math.abs(normAngle) < 45 ? 1 : 0.42)
          : 0.78 + (Math.cos(rad) + 1) * 0.11;

        panel.style.transform = `translate3d(calc(-50% + ${transX}px), -50%, ${transZ}px) rotateY(${rotY}deg)`;
        panel.style.zIndex = `${zIndex}`;
        panel.style.opacity = `${opacity}`;
      });

      setActiveCenterIdx(closestIdx);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Smooth pointer drag handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;

    isDraggingRef.current = true;
    hasMovedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartRotRef.current = targetRotRef.current;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;

    const onPointerMove = (ev: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = ev.clientX - dragStartXRef.current;
      if (Math.abs(dx) > 6) {
        hasMovedRef.current = true;
      }
      const rotSpeed = 160 / window.innerWidth;
      targetRotRef.current = dragStartRotRef.current + dx * rotSpeed;

      const now = performance.now();
      const dt = now - lastTimeRef.current;
      if (dt > 8) {
        velocityRef.current = (ev.clientX - lastXRef.current) / dt;
        lastXRef.current = ev.clientX;
        lastTimeRef.current = now;
      }
    };

    const onPointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      const inertiaDeg = velocityRef.current * 36;
      targetRotRef.current += inertiaDeg;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  }, []);

  // Mouse Wheel navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isStepThrottled = false;
    let throttleTimeout: ReturnType<typeof setTimeout> | undefined;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 4) {
        e.preventDefault();
        targetRotRef.current -= e.deltaX * 0.16;
        return;
      }

      const target = e.target as HTMLElement | null;
      const isOverPhotoCard = Boolean(target?.closest(".photo-card"));

      if (isOverPhotoCard) {
        if (Math.abs(e.deltaY) > 24 && !isStepThrottled) {
          isStepThrottled = true;
          e.preventDefault();
          const stepDir = e.deltaY > 0 ? -1 : 1;
          const currentStep = Math.round(-targetRotRef.current / 90);
          const nextStep = currentStep - stepDir;
          targetRotRef.current = -nextStep * 90;

          clearTimeout(throttleTimeout);
          throttleTimeout = setTimeout(() => {
            isStepThrottled = false;
          }, 320);
        } else if (isStepThrottled) {
          e.preventDefault();
        }
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
      clearTimeout(throttleTimeout);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (selectedPhoto) return;
      if (e.key === "ArrowLeft") {
        targetRotRef.current += 90;
      } else if (e.key === "ArrowRight") {
        targetRotRef.current -= 90;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedPhoto]);

  const rotateToPanel = (index: number) => {
    const current = targetRotRef.current;
    const targetBase = -index * 90;
    const diff = ((targetBase - current) % 360 + 540) % 360 - 180;
    targetRotRef.current = current + diff;
  };

  const handlePanelClick = (photo: PhotoItem, index: number) => {
    if (hasMovedRef.current) return;
    if (activeCenterIdx === index) {
      setSelectedPhoto(photo);
      setSelectedIdx(index);
    } else {
      rotateToPanel(index);
    }
  };

  const handleLightboxPrev = () => {
    const nextIdx = (selectedIdx - 1 + total) % total;
    setSelectedIdx(nextIdx);
    setSelectedPhoto(photosData[nextIdx]);
    rotateToPanel(nextIdx);
  };

  const handleLightboxNext = () => {
    const nextIdx = (selectedIdx + 1) % total;
    setSelectedIdx(nextIdx);
    setSelectedPhoto(photosData[nextIdx]);
    rotateToPanel(nextIdx);
  };

  return (
    <section
      id="photos"
      ref={containerRef}
      onPointerDown={handlePointerDown}
      className="relative w-full h-[100dvh] min-h-[580px] sm:min-h-[660px] md:min-h-[720px] bg-[var(--bg)] text-[#111111] overflow-hidden select-none flex flex-col justify-between border-b border-[#E8E8E5]"
      style={{ touchAction: "pan-y" }}
      aria-label="360-Degree Continuous Rotation Photo Gallery"
    >
      {/* ── SECTION HEADER ── */}
      <div className="site-container pt-16 sm:pt-24 z-30 pointer-events-none select-none">
        <div className="w-full flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4">
          <div className="flex items-baseline gap-3 sm:gap-6">
            <h2 className="text-[#111111] font-['Inter'] font-light uppercase leading-none tracking-tight text-[clamp(2.5rem,7vw,7rem)]">
              PHOTOS
            </h2>
            <span className="text-[var(--red)] text-xs sm:text-[13px] font-mono tracking-[0.35em] font-light">
              0{activeCenterIdx + 1} / 0{total}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 pointer-events-auto">
            <p className="text-[10px] sm:text-[12px] font-light tracking-[0.3em] sm:tracking-[0.4em] text-[#777777] uppercase font-['Inter'] flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--red)] animate-pulse" />
              <span>SWIPE · DRAG · TAP TO EXPAND</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── 360-DEGREE CONTINUOUS ROTATION 3D STAGE ── */}
      <div
        className="relative w-full flex-1 flex items-center justify-center overflow-hidden z-10 cursor-grab active:cursor-grabbing"
        style={{ perspective: "1500px", touchAction: "pan-y" }}
      >
        {/* Left Chevron Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            const prevIdx = (activeCenterIdx - 1 + total) % total;
            rotateToPanel(prevIdx);
          }}
          className="absolute left-2 sm:left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-[#E8E8E5] hover:border-[#111111] bg-white/95 hover:bg-[#111111] text-[#111111] hover:text-white flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer backdrop-blur-md active:scale-95"
          aria-label="Previous Photo"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* 3D Carousel Cylinder */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d", touchAction: "pan-y" }}
        >
          {photosData.map((photo, index) => {
            const isCenter = activeCenterIdx === index;

            return (
              <div
                key={photo.id}
                ref={(el) => {
                  panelRefs.current[index] = el;
                }}
                onClick={() => handlePanelClick(photo, index)}
                className={`photo-card absolute top-1/2 left-1/2 w-[68vw] sm:w-[54vw] md:w-[35vw] lg:w-[30vw] max-w-[440px] aspect-[3/4.3] will-change-transform rounded-none border border-[#E8E8E5] bg-[var(--bg-soft)] overflow-hidden group cursor-pointer transition-shadow duration-500 select-none ${
                  isCenter ? "ring-1 ring-[var(--red)]/60 shadow-2xl" : "shadow-md hover:border-[#111111]"
                }`}
                style={{
                  transformOrigin: "center center",
                  transformStyle: "preserve-3d",
                  touchAction: "pan-y",
                }}
              >
                {/* Outward Face: Rich natural studio portrait */}
                <div
                  className="absolute inset-0 w-full h-full overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt || photo.title}
                    loading="lazy"
                    draggable={false}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out pointer-events-none"
                  />
                  {/* Subtle editorial photo title badge */}
                  <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-5 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none flex items-center justify-between text-white text-[10px] sm:text-[11px] font-['Inter'] tracking-[0.25em] uppercase">
                    <span className="font-light truncate max-w-[80%]">{photo.title}</span>
                    <span className="text-[var(--red)] font-mono">0{photo.id}</span>
                  </div>
                </div>

                {/* Inward Face: Visible at backside of 360° orbit */}
                <div
                  className="absolute inset-0 w-full h-full overflow-hidden"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt || photo.title}
                    loading="lazy"
                    draggable={false}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                  <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-5 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none flex items-center justify-between text-white text-[10px] sm:text-[11px] font-['Inter'] tracking-[0.25em] uppercase">
                    <span className="font-light truncate max-w-[80%]">{photo.title}</span>
                    <span className="text-[var(--red)] font-mono">0{photo.id}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Chevron Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            const nextIdx = (activeCenterIdx + 1) % total;
            rotateToPanel(nextIdx);
          }}
          className="absolute right-2 sm:right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-[#E8E8E5] hover:border-[#111111] bg-white/95 hover:bg-[#111111] text-[#111111] hover:text-white flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer backdrop-blur-md active:scale-95"
          aria-label="Next Photo"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* ── LIGHTBOX ── */}
      <Lightbox
        photo={selectedPhoto}
        currentIndex={selectedIdx}
        total={total}
        onClose={() => setSelectedPhoto(null)}
        onPrev={handleLightboxPrev}
        onNext={handleLightboxNext}
      />
    </section>
  );
};

export { PhotosSection as Gallery3D };
