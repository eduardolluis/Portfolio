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
            src="/images/projects/rabbit/home.png"
            alt="Rabbit e-commerce storefront"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="browser-shot rabbit-admin-shot">
          <img
            src="/images/projects/rabbit/admin-products.png"
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
      <div className="browser-shot browser-main">
        <img
          src="https://github.com/user-attachments/assets/3c2c9027-c0a7-40d3-b72b-23a280ea0800"
          alt="Discord Clone community interface"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="browser-shot rabbit-admin-shot">
        <img
          src="https://github.com/user-attachments/assets/d3236764-0843-44bd-90c6-a99bc8160326"
          alt="Discord Clone real-time chat"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
