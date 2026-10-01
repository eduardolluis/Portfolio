import type { Project } from "../data/content";

export function ProjectVisual({ type }: { type: Project["visual"] }) {
  if (type === "gio") {
    return (
      <div className="project-cover cover-gio">
        <div className="cover-glow"></div>
        <div className="browser-shot browser-main">
          <img src="/images/projects/gio/dashboard.webp" alt="GIO Workspace dashboard" />
        </div>
        <div className="phone-shot phone-side">
          <img src="/images/projects/gio/login-mobile.webp" alt="GIO Workspace mobile login" />
        </div>
      </div>
    );
  }

  if (type === "melodix") {
    return (
      <div className="project-cover cover-melodix">
        <div className="cover-glow"></div>
        <div className="phone-shot phone-primary">
          <img src="/images/projects/melodix/home.png" alt="Melodix home screen" />
        </div>
        <div className="phone-shot phone-secondary">
          <img src="/images/projects/melodix/player.png" alt="Melodix music player" />
        </div>
      </div>
    );
  }

  if (type === "whatzapp") {
    return (
      <div className="project-cover cover-whatzapp">
        <div className="cover-glow"></div>
        <div className="phone-shot phone-primary">
          <img src="/images/projects/whatzapp/home.png" alt="Whatzapp conversations" />
        </div>
        <div className="phone-shot phone-secondary">
          <img src="/images/projects/whatzapp/chat.png" alt="Whatzapp chat" />
        </div>
      </div>
    );
  }

  return (
    <div className="project-cover cover-discord">
      <div className="cover-glow"></div>
      <div className="browser-shot browser-main">
        <img src="/images/projects/discord/main.png" alt="Discord clone main interface" />
      </div>
      <div className="browser-shot browser-float">
        <img src="/images/projects/discord/call.png" alt="Discord clone call interface" />
      </div>
    </div>
  );
}
