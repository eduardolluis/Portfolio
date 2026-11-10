import type { Dispatch, SetStateAction } from "react";
import type { Project } from "../../data/content";
import { ProjectGallery } from "./ProjectGallery";
import type { ProjectModalLabels } from "./types";

type Props = {
  project: Project;
  labels: ProjectModalLabels;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
};

export function MigaModalContent({ project, labels, activeIndex, setActiveIndex }: Props) {
  const spanish = project.liveLabel?.startsWith("Visitar") ?? false;
  const features = spanish
    ? [
        { title: "Explora recetas", desc: "Busca platos y aprovecha lo que ya tienes en la despensa." },
        { title: "Planifica la semana", desc: "Genera menús aleatorios y ajusta tus comidas por día." },
        { title: "Compra con claridad", desc: "Organiza ingredientes y revisa los costos estimados." },
        { title: "Ahorra más", desc: "Encuentra alternativas más económicas y funciones Pro." },
      ]
    : [
        { title: "Find recipes", desc: "Discover meals using ingredients you already have." },
        { title: "Plan your week", desc: "Generate randomized meal plans and adjust each day." },
        { title: "Shop with clarity", desc: "Organize ingredients and see estimated food costs." },
        { title: "Spend less", desc: "Find cheaper alternatives and unlock Pro features." },
      ];

  return (
    <div className="miga-showcase">
      <div className="miga-showcase-gallery">
        <div className="miga-showcase-gallery-heading">
          <span>{spanish ? "DENTRO DE LA APP" : "INSIDE THE APP"}</span>
          <strong>{spanish ? "Pantallas reales de iPhone" : "Real iPhone screenshots"}</strong>
        </div>
        <ProjectGallery
          project={project}
          labels={labels}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>

      <div className="miga-showcase-about">
        <div className="miga-showcase-content">
          <div className="miga-showcase-intro">
            <span className="miga-showcase-eyebrow">{spanish ? "EL PRODUCTO" : "THE PRODUCT"}</span>
            <h3>{spanish ? "Planifica, cocina y ahorra." : "Plan, cook & save."}</h3>
            <p>{project.description}</p>
          </div>

          <div className="miga-showcase-features">
            {features.map((feature, i) => (
              <div className="miga-showcase-feature" key={feature.title}>
                <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{feature.title}</strong>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="miga-showcase-stack" aria-label="Technology stack">
            {project.stack.map((tech) => <span key={tech}>{tech}</span>)}
          </div>
          <p className="miga-showcase-caption">
            {spanish
              ? "Diseñada y desarrollada en Flutter. Autenticación con Supabase y suscripciones Pro con RevenueCat."
              : "Designed and built with Flutter. Supabase authentication and RevenueCat Pro subscriptions."}
          </p>
        </div>

        <div className="miga-showcase-footer">
          <a
            className="miga-showcase-cta"
            href={project.live || "https://miga-landing-rho.vercel.app/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{project.liveLabel || (spanish ? "Visitar sitio de Miga" : "Visit Miga website")}</span>
            <span className="miga-showcase-cta-arrow" aria-hidden="true">↗</span>
          </a>
          <small>{spanish ? "Landing oficial de Miga" : "Official Miga landing page"}</small>
        </div>
      </div>
    </div>
  );
}
