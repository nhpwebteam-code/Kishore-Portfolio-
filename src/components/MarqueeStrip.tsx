import React from "react";

export const MarqueeStrip: React.FC = () => {
  const items = [
    "TELUGU CINEMA",
    "HYDERABAD",
    "ACTOR",
    "PERFORMER",
    "SCREEN & THEATRE",
    "METHOD ACTING",
    "FEATURE FILMS",
  ];

  return (
    <div className="w-full border-y border-[#E8E8E5] bg-[var(--bg)] py-6 md:py-8 overflow-hidden select-none group">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {/* Render twice for seamless infinite loop */}
        {[...items, ...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center mx-6 sm:mx-10 shrink-0">
            <span
              className="text-[#D5D5D0] group-hover:text-[#111111] font-light uppercase tracking-[0.25em] font-['Inter'] transition-colors duration-500"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)", lineHeight: 1 }}
            >
              {text}
            </span>
            <span className="text-[var(--red)] text-sm sm:text-lg md:text-xl ml-6 sm:ml-10 font-normal select-none">
              ◆
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
