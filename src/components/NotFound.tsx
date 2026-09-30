import React from "react";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "../config/site";
import { LocaleContent } from "../types";

interface NotFoundProps {
  content: LocaleContent["notFound"];
  onReturnHome: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ content, onReturnHome }) => {
  return (
    <div className="not-found-wrapper">
      <div className="not-found-card">
        <span className="not-found-brand">{siteConfig.monogram}</span>
        <div className="not-found-code">{content.code}</div>
        <h1 className="not-found-title">{content.title}</h1>
        <p className="not-found-message">{content.message}</p>
        <button
          type="button"
          className="btn btn-primary btn-not-found"
          onClick={onReturnHome}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>{content.backToHome}</span>
        </button>
      </div>
    </div>
  );
};
