export type Lang = "en" | "es";

export type ProjectFact = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  gallery: { src: string; alt: string; label: string; kind?: "desktop" | "mobile" }[];
  stack: string[];
  github?: string;
  live?: string;
  caseStudy?: string;
  visual: "gio" | "melodix" | "whatzapp" | "multistore" | "rabbit";
  disclaimer?: string;
  facts?: ProjectFact[];
  role?: string;
  repositoryNote?: string;
  previewNote?: string;
};
