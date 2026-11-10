import type { Project } from "../data/content";

export function ProjectVisual({ type }: { type: Project["visual"] }) {
  if (type === "miga") {
    return (
      <div className="project-cover cover-miga">
        <div className="miga-featured-copy">
          <span className="miga-featured-label">MOBILE PRODUCT · iOS</span>
          <span className="miga-featured-name">miga<span>.</span></span>
          <span className="miga-featured-slogan">Plan, cook &amp; save.</span>
          <span className="miga-featured-caption">Real app. Real screens.</span>
        </div>
        <div className="miga-featured-phones">
          <img
            className="miga-featured-phone miga-featured-phone-home"
            src="/images/projects/miga/home.webp"
            alt="Actual Miga iPhone home screen"
            loading="lazy"
            decoding="async"
          />
          <img
            className="miga-featured-phone miga-featured-phone-recipes"
            src="/images/projects/miga/recipes.webp"
            alt="Actual Miga iPhone recipe screen"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  if (type === "gio") {
    return (
      <div className="project-cover cover-gio">
        <div className="cover-glow" />
        <div className="browser-shot browser-main">
          <img
            src="/images/projects/gio/dashboard.webp"
            alt="GIO Workspace dashboard"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="phone-shot phone-side">
          <img
            src="/images/projects/gio/login-mobile.webp"
            alt="GIO Workspace mobile login"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  if (type === "melodix") {
    return (
      <div className="project-cover cover-melodix">
        <div className="cover-glow" />
        <div className="phone-shot phone-primary">
          <img
            src="/images/projects/melodix/home.webp"
            alt="Melodix home screen"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="phone-shot phone-secondary">
          <img
            src="/images/projects/melodix/player.webp"
            alt="Melodix music player"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  if (type === "whatzapp") {
    return (
      <div className="project-cover cover-whatzapp">
        <div className="cover-glow" />
        <div className="phone-shot phone-primary">
          <img
            src="/images/projects/whatzapp/home.webp"
            alt="Whatzapp conversations"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="phone-shot phone-secondary">
          <img
            src="/images/projects/whatzapp/chat.webp"
            alt="Whatzapp chat"
            loading="lazy"
            decoding="async"
          />
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
            src="/images/projects/rabbit/home.webp"
            alt="Rabbit e-commerce storefront"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="browser-shot rabbit-admin-shot">
          <img
            src="/images/projects/rabbit/admin-products.webp"
            alt="Rabbit admin dashboard"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="project-cover cover-discord">
      <div className="cover-glow" />
      <div className="browser-shot browser-main">
        <img
          src="https://github.com/user-attachments/assets/3c2c9027-c0a7-40d3-b72b-23a280ea0800"
          alt="Discord Clone community interface"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="browser-shot browser-float">
        <img
          src="https://github.com/user-attachments/assets/b4cff841-570b-4a80-8d2e-678349168e6a"
          alt="Discord Clone voice and video room"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
