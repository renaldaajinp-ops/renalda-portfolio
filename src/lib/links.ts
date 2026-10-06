// Case-study URLs by portfolio slug; add one here when it exists.
const projectLinks: Record<string, string> = {};

// Every link destination on the site lives here.
// Internal anchors point at sections on this page. Social URLs were supplied by
// the owner; other external destinations stay "#" until real URLs exist.
export const links = {
  home: "#top",
  portfolio: "#portfolio",
  contact: "#contact",
  about: "#about",
  services: "#services",
  process: "#process",
  testimonials: "#testimonials",
  faq: "#faq",
  game: "#game",

  email: "renaldaajinp@gmail.com",
  emailHref: "mailto:renaldaajinp@gmail.com",

  social: {
    x: "https://x.com/Renald_aji",
    dribbble: "https://dribbble.com/RenaldaAji",
    instagram: "https://www.instagram.com/renaldaaji/",
    behance: "https://www.behance.net/renaldaaji_",
    linkedin: "https://www.linkedin.com/in/renalda-aji-071a78234/?isSelfProfile=true",
  },

  // Portfolio case studies (no public URLs yet).
  seeMoreWork: "#",
  project: (slug: string) => projectLinks[slug] ?? "#",

  legal: {
    privacy: "#",
    terms: "#",
    cookies: "#",
  },
} as const;
