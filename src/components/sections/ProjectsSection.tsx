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
    <section id="projects">
      <div className="wrap">
        <h2 className="reveal">{t.projects.title}</h2>
        <p className="lead reveal d1 section-lead">{t.projects.lead}</p>
        <div className="projects">
          {t.projects.items.map((project, index) => (
            <article
              className={`card reveal ${index % 2 ? "d1" : ""} ${index === 0 ? "featured-card" : ""}`}
              key={project.id}
            >
              <div className="panel tilt project-panel" data-tilt>
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
          className="more-projects reveal"
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
