import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhotoItem, photosData } from "../data/photos";

interface LightboxProps {
  photo: PhotoItem | null;
  currentIndex?: number;
  total?: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photo,
  currentIndex,
  total,
  onClose,
  onPrev,
  onNext,
}) => {
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!photo) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [photo, onClose, onPrev, onNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) onNext();
      else onPrev();
    }
    touchStartX.current = null;
  };

  if (!photo) return null;

  const totalCount = total || photosData.length || 4;
  const activeIdx =
    currentIndex !== undefined
      ? currentIndex
      : photosData.findIndex((p) => p.id === photo.id);
  const formattedIndex = String(Math.max(0, activeIdx) + 1).padStart(2, "0");
  const formattedTotal = String(totalCount).padStart(2, "0");

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-8 md:p-12 select-none overflow-hidden"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          paddingTop: "max(1.5rem, calc(env(safe-area-inset-top) + 1rem))",
          paddingBottom: "max(1.5rem, calc(env(safe-area-inset-bottom) + 1rem))",
        }}
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 md:top-8 md:left-12 md:right-12 flex items-center justify-between text-[#111111] z-20 pointer-events-none">
          {/* Counter */}
          <div className="text-[11px] sm:text-[12px] font-['Inter'] font-light tracking-[0.4em] text-[#888888] uppercase font-mono">
            {formattedIndex} / {formattedTotal}
          </div>

          {/* Close Button (44x44px target) */}
          <button
            onClick={onClose}
            className="pointer-events-auto min-w-[44px] min-h-[44px] flex items-center justify-center text-[11px] sm:text-[12px] font-mono tracking-[0.35em] uppercase text-[#111111] hover:text-[var(--red)] active:scale-95 transition-all p-2 cursor-pointer"
            aria-label="Close Lightbox"
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Previous Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-2 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#111111] hover:text-[var(--red)] active:scale-90 transition-all z-20 cursor-pointer"
          aria-label="Previous Photo"
        >
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-current transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="0.9"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Centered Photo Frame */}
        <motion.div
          key={photo.id}
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[80vh] sm:max-h-[85vh] max-w-[92vw] sm:max-w-[85vw] flex flex-col items-center justify-center pointer-events-auto"
        >
          <img
            src={photo.src}
            alt={photo.alt || photo.title}
            className="max-h-[75vh] sm:max-h-[82vh] w-auto max-w-full object-contain shadow-2xl"
          />
          {photo.title && (
            <div className="mt-3 text-center">
              <span className="text-[11px] sm:text-[12px] font-['Inter'] font-light tracking-[0.3em] uppercase text-[#777777]">
                {photo.title}
              </span>
            </div>
          )}
        </motion.div>

        {/* Next Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-2 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#111111] hover:text-[var(--red)] active:scale-90 transition-all z-20 cursor-pointer"
          aria-label="Next Photo"
        >
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-current transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="0.9"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
