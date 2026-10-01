export interface SiteConfig {
  name: string;
  shortName: string;
  monogram: string;
  role: {
    en: string;
    es: string;
  };
  location: {
    en: string;
    es: string;
  };
  positioning: {
    en: string;
    es: string;
  };
  github: string;
  email: string;
  whatsapp: string;
  whatsappFormatted: string;
  linkedin: string | null;
  domain: string;
}

export const siteConfig: SiteConfig = {
  name: "Eduardo De La Cruz",
  shortName: "Eduardo",
  monogram: "E",
  role: {
    en: "Full-Stack Software Developer",
    es: "Desarrollador de Software Full-Stack",
  },
  location: {
    en: "Santo Domingo, Dominican Republic",
    es: "Santo Domingo, República Dominicana",
  },
  positioning: {
    en: "Custom software, built around your business.",
    es: "Software a medida, construido para tu negocio.",
  },
  github: "https://github.com/eduardolluis",
  email: "eduardodelacruzg5@gmail.com",
  whatsapp: "18495191571",
  whatsappFormatted: "+1 (849) 519-1571",
  // If user provides a LinkedIn profile URL, keep it here; otherwise null to hide it
  linkedin: "https://www.linkedin.com/in/eduardo-de-la-cruz-b6171837a/",
  domain: "https://eduardo-portfolio-neon-two.vercel.app",
};
