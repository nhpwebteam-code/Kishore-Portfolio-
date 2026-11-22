import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [cursorText, setCursorText] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 26, stiffness: 360, mass: 0.45 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (window.matchMedia("(hover: none) or (pointer: coarse)").matches) {
      return;
    }

    let isInsidePhotos = false;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const targetEl = e.target as HTMLElement | null;
      const currentlyInPhotos = Boolean(targetEl?.closest("#photos"));

      if (currentlyInPhotos !== isInsidePhotos) {
        isInsidePhotos = currentlyInPhotos;
        setIsVisible(!currentlyInPhotos);
      } else if (!isInsidePhotos && !isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement | null;
      if (targetEl?.closest("#photos")) {
        return;
      }

      const target = targetEl?.closest("[data-cursor]") as HTMLElement | null;
      if (target) {
        setCursorText(target.getAttribute("data-cursor") || "");
        setIsHovered(true);
        return;
      }

      const isClickable = targetEl?.closest("a, button, input, textarea, [role='button'], .cursor-pointer");
      if (isClickable) {
        setCursorText("");
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none flex items-center justify-center select-none"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          width: cursorText ? 64 : isHovered ? 44 : 26,
          height: cursorText ? 64 : isHovered ? 44 : 26,
          borderColor: cursorText ? "#E10D1F" : isHovered ? "#E10D1F" : "rgba(10, 10, 10, 0.35)",
          backgroundColor: cursorText
            ? "rgba(10, 10, 10, 0.85)"
            : isHovered
            ? "rgba(225, 13, 31, 0.10)"
            : "transparent",
          borderWidth: cursorText ? 1.5 : 1,
          backdropFilter: cursorText ? "blur(4px)" : "none",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {cursorText && (
          <span className="text-[9px] tracking-[0.25em] font-mono uppercase text-[#E10D1F]">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#0A0A0A] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered || cursorText ? 0 : 1,
          opacity: isHovered || cursorText ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};
