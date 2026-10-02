import type { Project } from "../../data/content";
import type { ProjectModalLabels } from "./types";

export function ProjectDetails({
  project,
  labels,
}: {
  project: Project;
  labels: ProjectModalLabels;
}) {
  return (
    <div className="project-modal-copy">
      <span className="modal-section-label">{labels.overview}</span>
      <p className="modal-description">{project.description}</p>

      {project.facts?.length ? (
        <div className="project-facts" aria-label={labels.proof}>
          {project.facts.map((fact) => (
            <div className="project-fact" key={`${fact.label}-${fact.value}`}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
        </div>
      ) : null}

      <div className="modal-detail-block">
        <span className="modal-section-label">{labels.highlights}</span>
        <ul className="modal-highlights">
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {project.role ? (
        <div className="modal-detail-block">
          <span className="modal-section-label">{labels.role}</span>
          <p className="modal-role">{project.role}</p>
        </div>
      ) : null}

      <div className="modal-detail-block">
        <span className="modal-section-label">Stack</span>
        <div className="chips modal-chips">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      {project.repositoryNote ? (
        <div className="modal-detail-block">
          <span className="modal-section-label">{labels.repository}</span>
          <p className="repository-note">{project.repositoryNote}</p>
        </div>
      ) : null}

      {project.disclaimer ? (
        <p className="project-note modal-note">{project.disclaimer}</p>
      ) : null}

      <div className="modal-links">
        {project.caseStudy ? (
          <a
            className="btn primary"
            href={project.caseStudy}
            target="_blank"
            rel="noopener noreferrer"
          >
            {labels.caseStudy}
          </a>
        ) : null}
        {project.live ? (
          <a
            className="btn"
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
          >
            {labels.viewLive}
          </a>
        ) : null}
        {project.github ? (
          <a
            className="btn"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            {labels.viewCode} ↗
          </a>
        ) : null}
      </div>
    </div>
  );
}
