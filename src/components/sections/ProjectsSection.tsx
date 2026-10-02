import { site, type LocaleContent, type Project } from "../../data/content";
import { ProjectVisual } from "../ProjectVisual";

export function ProjectsSection({
  t,
  onSelectProject,
}: {
  t: LocaleContent;
  onSelectProject: (project: Project) => void;
}) {
  return (
    <section id="projects" className="projects-section motion-section" data-motion-section>
      <div className="section-atmosphere projects-atmosphere" aria-hidden="true">
        <span className="project-orbit project-orbit-a" />
        <span className="project-orbit project-orbit-b" />
      </div>
      <div className="wrap">
        <div className="projects-heading-grid">
          <div>
            <span className="section-kicker reveal">{t.projects.eyebrow}</span>
            <h2 className="reveal d1">{t.projects.title}</h2>
            <p className="lead reveal d2 section-lead">{t.projects.lead}</p>
          </div>
          <div className="projects-counter reveal d2" aria-hidden="true">
            <strong>{String(t.projects.items.length).padStart(2, "0")}</strong>
            <span>01 — {String(t.projects.items.length).padStart(2, "0")}</span>
            <i />
          </div>
        </div>
        <div className="projects">
          {t.projects.items.map((project, index) => (
            <article
              className={`card project-card reveal ${index % 2 ? "d1" : ""} ${index === 0 ? "featured-card" : ""}`}
              data-project-index={index + 1}
              key={project.id}
            >
              <div className="project-ghost-index" aria-hidden="true">
                0{index + 1}
              </div>
              <div className="panel tilt project-panel" data-tilt data-parallax-card>
                <span className="project-accent-line" aria-hidden="true" />
                <ProjectVisual type={project.visual} />
                <div className="card-body">
                  <span className="project-category">{project.category}</span>
                  <div className="project-heading-row">
                    <h3>{project.title}</h3>
                    <span className="project-index">0{index + 1}</span>
                  </div>
                  <p>{project.description}</p>
                  <div className="chips">
                    {project.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  {project.disclaimer ? (
                    <p className="project-note">{project.disclaimer}</p>
                  ) : null}
                  <div className="links">
                    <button
                      className="project-explore"
                      type="button"
                      onClick={() => onSelectProject(project)}
                    >
                      {t.projects.explore} →
                    </button>
                    {project.caseStudy ? (
                      <a
                        href={project.caseStudy}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.projects.caseStudy}
                      </a>
                    ) : null}
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.projects.viewLive}
                      </a>
                    ) : null}
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.projects.viewCode}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <a
          className="more-projects reveal magnetic"
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.projects.more} ↗
        </a>
      </div>
    </section>
  );
}
