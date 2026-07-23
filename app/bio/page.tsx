import Link from "next/link";
import { isConfiguredValue, siteConfig } from "@/src/config/site";

export const metadata = {
  title: "Bio",
  description:
    "Profile and contact details for an executive producer in advertising.",
};

export default function BioPage() {
  return (
    <main className="bio-page" id="main-content">
      <div className="bio-kicker">
        <p className="eyebrow">bio · production notes</p>
        <h1>People make pictures happen.</h1>
      </div>
      <div className="bio-layout">
        <div
          className="portrait-placeholder"
          role="img"
          aria-label="Portrait placeholder"
        >
          <span>portrait</span>
          <strong>to be developed</strong>
          <i aria-hidden="true">↘</i>
        </div>
        <article className="bio-copy">
          <span className="blue-note" aria-hidden="true">
            a short introduction
          </span>
          <p className="bio-lead">{siteConfig.bio}</p>
          {siteConfig.bioIsPlaceholder && (
            <p className="placeholder-label">
              editable placeholder — replace in src/config/site.ts
            </p>
          )}
          <dl className="bio-details">
            <div>
              <dt>focus</dt>
              <dd>Advertising · branded content · film production</dd>
            </div>
            <div>
              <dt>role</dt>
              <dd>{siteConfig.role}</dd>
            </div>
            {isConfiguredValue(siteConfig.location) && (
              <div>
                <dt>base</dt>
                <dd>{siteConfig.location}</dd>
              </div>
            )}
          </dl>
          <div className="bio-contact">
            {isConfiguredValue(siteConfig.email) ? (
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            ) : (
              <span>email pending</span>
            )}
            <a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phone}</a>
            <Link href="/#work-board">view selected work →</Link>
          </div>
        </article>
      </div>
    </main>
  );
}
