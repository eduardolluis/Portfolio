export type Locale = "en" | "es";

export interface ProjectScreenshot {
  url: string;
  alt: string;
  caption?: string;
  type?: "desktop" | "mobile";
}

export interface ProjectData {
  id: string;
  name: string;
  category: string;
  badge?: string;
  summary: string;
  challenge: string;
  solution: string;
  built: string[];
  tech: string[];
  screenshots: ProjectScreenshot[];
  github?: string | null;
  live?: string | null;
  independentNote?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  problem: string;
  deliverable: string;
  tags: string[];
  icon: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface CapabilityItem {
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
}

export interface ContactFormField {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export interface LocaleContent {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    work: string;
    services: string;
    about: string;
    process: string;
    contact: string;
    cta: string;
    switchLang: string;
  };
  hero: {
    eyebrow: string;
    titleStart: string;
    titleAccent: string;
    titleEnd: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ticker: string[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    items: CapabilityItem[];
  };
  work: {
    eyebrow: string;
    title: string;
    subtitle: string;
    featuredBadge: string;
    caseStudyLabel: string;
    challengeLabel: string;
    solutionLabel: string;
    builtLabel: string;
    techLabel: string;
    viewSource: string;
    liveDemo: string;
    viewGallery: string;
    projects: ProjectData[];
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    problemLabel: string;
    deliverableLabel: string;
    items: ServiceItem[];
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    body: string;
    focusTitle: string;
    focusItems: string[];
    stackTitle: string;
    frontend: string[];
    mobile: string[];
    backend: string[];
    databaseCloud: string[];
  };
  process: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    emailLabel: string;
    whatsappLabel: string;
    directTalk: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      company: string;
      companyPlaceholder: string;
      need: string;
      needPlaceholder: string;
      needOptions: { value: string; label: string }[];
      budget: string;
      budgetPlaceholder: string;
      budgetOptions: { value: string; label: string }[];
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successText: string;
      sendAnother: string;
      errorTitle: string;
      errorText: string;
      validationRequired: string;
      validationEmail: string;
      privacyNotice: string;
    };
  };
  privacy: {
    title: string;
    lastUpdated: string;
    intro: string;
    points: { title: string; text: string }[];
    backToHome: string;
  };
  notFound: {
    code: string;
    title: string;
    message: string;
    backToHome: string;
  };
  footer: {
    tagline: string;
    allRightsReserved: string;
    backToTop: string;
    privacyPolicy: string;
    location: string;
  };
}
