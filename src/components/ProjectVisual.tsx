import type { Project } from "../data/content";

export function ProjectVisual({ type }: { type: Project["visual"] }) {
  if (type === "gio") {
    return (
      <div className="project-cover cover-gio">
        <div className="cover-glow" />
        <div className="browser-shot browser-main">
          <img src="/images/projects/gio/dashboard.webp" alt="GIO Workspace dashboard" loading="lazy" decoding="async" />
        </div>
        <div className="phone-shot phone-side">
          <img src="/images/projects/gio/login-mobile.webp" alt="GIO Workspace mobile login" loading="lazy" decoding="async" />
        </div>
      </div>
    );
  }

  if (type === "melodix") {
    return (
      <div className="project-cover cover-melodix">
        <div className="cover-glow" />
        <div className="phone-shot phone-primary">
          <img src="/images/projects/melodix/home.webp" alt="Melodix home screen" loading="lazy" decoding="async" />
        </div>
        <div className="phone-shot phone-secondary">
          <img src="/images/projects/melodix/player.webp" alt="Melodix music player" loading="lazy" decoding="async" />
        </div>
      </div>
    );
  }

  if (type === "whatzapp") {
    return (
      <div className="project-cover cover-whatzapp">
        <div className="cover-glow" />
        <div className="phone-shot phone-primary">
          <img src="/images/projects/whatzapp/home.webp" alt="Whatzapp conversations" loading="lazy" decoding="async" />
        </div>
        <div className="phone-shot phone-secondary">
          <img src="/images/projects/whatzapp/chat.webp" alt="Whatzapp chat" loading="lazy" decoding="async" />
        </div>
      </div>
    );
  }


  if (type === "rabbit") {
    return (
      <div className="project-cover cover-rabbit">
        <div className="cover-glow" />
        <div className="browser-shot browser-main">
          <img
            src="https://github.com/user-attachments/assets/2b21d3d7-6563-4715-bf93-e4cad7a0074c"
            alt="Rabbit e-commerce storefront"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="browser-shot rabbit-admin-shot">
          <img
            src="/images/projects/rabbit/admin-dashboard.svg"
            alt="Rabbit admin dashboard"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="project-cover cover-multistore">
      <div className="cover-glow" />
      <div className="phone-shot phone-primary">
        <img src="/images/projects/multistore/home.webp" alt="Multi Store customer home" loading="lazy" decoding="async" />
      </div>
      <div className="phone-shot phone-secondary">
        <img src="/images/projects/multistore/manage-products.webp" alt="Multi Store product management" loading="lazy" decoding="async" />
      </div>
    </div>
  );
}
