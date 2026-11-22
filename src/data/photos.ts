export interface PhotoBadge {
  text: string;
  bg: string;
  color: string;
  border?: string;
}

export interface PhotoItem {
  id: number;
  title: string;
  category: string;
  year: string;
  src: string;
  alt: string;
  desc: string;
  rating: string;
  badge: PhotoBadge;
  meta: string;
  glowColor: string;
}

export const photosData: PhotoItem[] = [
  {
    id: 1,
    title: "Monochrome Stature",
    category: "Theatrical Full Length",
    year: "2026",
    src: "/photos/portfolio-1.jpg",
    alt: "Ch. Rathna Kishore Reddy full-length standing portrait in black shirt, black trousers, and sneakers",
    desc: "Clean full-figure theatrical study focusing on posture, natural stature, and grounded screen presence.",
    rating: "9.8 ★",
    badge: {
      text: "LEAD",
      bg: "bg-[#111111]",
      color: "text-white",
      border: "border-neutral-700",
    },
    meta: "2026 · Theatrical Study · Full Stature",
    glowColor: "rgba(225, 13, 31, 0.28)",
  },
  {
    id: 2,
    title: "The Editorial Silhouette",
    category: "Character Study",
    year: "2026",
    src: "/photos/portfolio-2.jpg",
    alt: "Ch. Rathna Kishore Reddy leaning pose in tailored black blazer, white tee, and silver chain",
    desc: "Contemporary editorial portrait showcasing commanding composure, tailored lines, and quiet intensity.",
    rating: "9.7 ★",
    badge: {
      text: "NOIR",
      bg: "bg-[#1d4ed8]",
      color: "text-white",
      border: "border-blue-400/40",
    },
    meta: "2026 · Character Study · Editorial",
    glowColor: "rgba(29, 78, 216, 0.28)",
  },
  {
    id: 3,
    title: "Intensity Noir",
    category: "Dramatic Close-Up",
    year: "2026",
    src: "/photos/portfolio-3.jpg",
    alt: "Ch. Rathna Kishore Reddy high-contrast monochrome close-up portrait with sunglasses, white shirt, and black tie",
    desc: "High-contrast dramatic monochrome study capturing gaze intensity, structured suiting, and cinematic mystery.",
    rating: "9.9 ★",
    badge: {
      text: "FEATURE",
      bg: "bg-[#E10D1F]",
      color: "text-white font-bold",
      border: "border-red-300/50",
    },
    meta: "2026 · Cinematic Close-Up · 35mm Format",
    glowColor: "rgba(225, 13, 31, 0.35)",
  },
  {
    id: 4,
    title: "Spontaneous Presence",
    category: "Screen Test Still",
    year: "2026",
    src: "/photos/portfolio-4.jpg",
    alt: "Ch. Rathna Kishore Reddy candid portrait in burgundy shirt over white tee holding smartphone",
    desc: "Modern casual screen test capturing approachable charisma, warm expression, and relatable contemporary realism.",
    rating: "9.5 ★",
    badge: {
      text: "SCREEN",
      bg: "bg-[#8b2b3a]",
      color: "text-white font-bold",
      border: "border-rose-400/40",
    },
    meta: "2026 · Screen Test · Natural Light",
    glowColor: "rgba(139, 43, 58, 0.28)",
  },
];
