export interface SiteConfig {
  actor: {
    fullName: string;
    prefix: string;
    firstName: string;
    lastName: string;
    initials: string;
    title: string;
    tagline: string;
    bioShort: string;
    location: string;
  };
  contact: {
    email: string;
    whatsapp: string;
    whatsappDisplay: string;
    instagram: string;
    instagramHandle: string;
    youtube: string;
    youtubeHandle: string;
  };
  showreel: {
    title: string;
    subtitle: string;
    duration: string;
    year: string;
    aspectRatio: string;
    thumbnail: string;
    youtubeEmbedUrl: string;
    youtubeWatchUrl: string;
  };
  navItems: Array<{
    id: string;
    label: string;
    href: string;
  }>;
}

export const siteConfig: SiteConfig = {
  actor: {
    fullName: "Ch. Rathna Kishore Reddy",
    prefix: "Ch.",
    firstName: "Rathna Kishore",
    lastName: "Reddy",
    initials: "CRK",
    title: "Actor",
    tagline: "Presence · Depth · Authenticity",
    bioShort:
      "Trained screen and theatre actor with an instinct for dramatic vulnerability, commanding physical presence, and nuance across languages and genres.",
    location: "Hyderabad, India",
  },
  contact: {
    email: "kishunreddy2006@gmail.com",
    whatsapp: "https://wa.me/917396396460?text=Hello%20Rathna%20Kishore%20Reddy%2C%20I%20would%20like%20to%20discuss%20a%20casting%20opportunity.",
    whatsappDisplay: "+91 73963 96460",
    instagram: "https://instagram.com/rathnakishorereddy",
    instagramHandle: "@rathnakishorereddy",
    youtube: "https://youtube.com/@rathnakishorereddy",
    youtubeHandle: "Rathna Kishore Reddy",
  },
  showreel: {
    title: "Official Dramatic Acting Reel",
    subtitle: "Selected Screen Tests, Feature Monologues & Physical Performance",
    duration: "2:45 MIN",
    year: "2026",
    aspectRatio: "2.39 : 1 CINEMASCOPE",
    thumbnail: "https://img.youtube.com/vi/wHaIOSVCj6c/maxresdefault.jpg",
    youtubeEmbedUrl: "https://www.youtube-nocookie.com/embed/wHaIOSVCj6c?autoplay=1&modestbranding=1&rel=0",
    youtubeWatchUrl: "https://www.youtube.com/watch?v=wHaIOSVCj6c",
  },
  navItems: [
    { id: "photos", label: "Photos", href: "#photos" },
    { id: "showreel", label: "Showcases", href: "#showreel" },
    { id: "about", label: "About", href: "#about" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],
};
