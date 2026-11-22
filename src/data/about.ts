export interface CastingStats {
  age: string;
  height: string;
  weight: string;
  languages: string[];
  skills: string[];
  location: string;
  playingAge: string;
  hair: string;
  eyes: string;
  photo: string;
}

export interface FilmographyItem {
  year: string;
  project: string;
  role: string;
  director: string;
  category: "Feature Film" | "Short Film" | "Theatre" | "Series" | "Training";
  notes?: string;
}

export interface AboutData {
  headlineBio: string;
  extendedBio: string[];
  stats: CastingStats;
  timeline: FilmographyItem[];
}

export const aboutData: AboutData = {
  headlineBio:
    "An actor is not a mirror, but a lens through which hidden human truths are brought into sharp focus.",
  extendedBio: [
    "Ch. Rathna Kishore Reddy is an Indian film, theatre, and digital media actor based between Hyderabad and Mumbai. With rigorous foundations in physical theatre, character psychology, and camera technique, he approaches every narrative with disciplined intensity and deep emotional instinct.",
    "Fluent across Telugu, Hindi, and English, his work encompasses grounded indie features, high-stakes ensemble thrillers, and immersive stage productions. He is committed to characters defined by nuance, moral ambiguity, and transformative emotional weight.",
    "Available for domestic and international film, television, OTT series, and commercial projects.",
  ],
  stats: {
    age: "20",
    playingAge: "18 – 24",
    height: "5' 9\" (175 cm)",
    weight: "68 kg (150 lbs)",
    languages: ["Telugu (Native)", "Hindi (Fluent)", "English (Fluent)"],
    skills: ["Stage Combat & Cinematic Fights", "Contemporary Dance", "Horse Riding", "Voice Modulation", "Cricket"],
    location: "Hyderabad · Mumbai, India",
    hair: "Black / Naturally Textured",
    eyes: "Dark Brown",
    photo: "/photos/about.jpg",
  },
  timeline: [
    {
      year: "2026",
      project: "Nirvedha (The Silence Between)",
      role: "Vikram (Lead)",
      director: "Dir. S. Narayana",
      category: "Feature Film",
      notes: "Independent psychological drama exploring memory and redemption. Selected for regional festival premiere.",
    },
    {
      year: "2025",
      project: "The Alleyway Chronicle",
      role: "Deva (Supporting Antagonist)",
      director: "Dir. K. Raghav",
      category: "Series",
      notes: "Neo-noir crime series streaming across regional platforms. Featured in intense multi-take action sequences.",
    },
    {
      year: "2025",
      project: "Waiting For The Light",
      role: "Karan",
      director: "Dir. Ananya Varma",
      category: "Short Film",
      notes: "Critically acclaimed festival short exploring youth displacement and brotherly sacrifice.",
    },
    {
      year: "2024",
      project: "Karna's Soliloquy",
      role: "Karna (Title Role)",
      director: "Rangbhoomi Repertory",
      category: "Theatre",
      notes: "Classical adaptation performed across 24 live stage productions in Hyderabad and Bengaluru.",
    },
    {
      year: "2023 – 2024",
      project: "Advanced Method & Screen Acting Lab",
      role: "Graduate Scholar",
      director: "Masterclasses by Leading Film Practitioners",
      category: "Training",
      notes: "Intensive 18-month conservatory training in Meisner technique, physical combat choreography, and voice architecture.",
    },
  ],
};
