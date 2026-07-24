import Link from "next/link";
import { isConfiguredValue, siteConfig } from "@/src/config/site";

export const metadata = {
  title: "Bio",
  description:
    "Nicole Borja’s experience in audiovisual production, brand activations, and regional influencer marketing across Latin America.",
};

const experience = [
  {
    period: "2026 — present",
    role: "Campaign Coordinator",
    company: "Alkimiads",
    market: "Mexico",
    description: "Managing regional influencer marketing campaigns.",
  },
  {
    period: "2025 — 2026",
    role: "Producer",
    company: "Rebeca Producciones",
    market: "Peru",
    description:
      "End-to-end production, contract and licensing negotiations, and budget control.",
  },
  {
    period: "2022 — 2024",
    role: "General Producer",
    company: "Agencia Punto 99",
    market: "Ecuador",
    description:
      "Team leadership with six direct reports and multiplatform content production.",
  },
  {
    period: "2021 — 2022",
    role: "Project Manager",
    company: "Freelance",
    market: "Ecuador",
    description:
      "Corporate events, commercial partnerships, and public relations.",
  },
  {
    period: "2019 — 2021",
    role: "Jr. Producer & Coordinator",
    company: "Lazoh! Media",
    market: "Ecuador",
    description:
      "Marketing operations, live brand activations, and event coverage.",
  },
] as const;

const recognition = [
  {
    award: "D&AD Awards",
    mark: "D&AD",
    country: "United Kingdom",
    flag: "🇬🇧",
    logo: null,
    entries: ["No. 4 Top Production Company · 2025"],
  },
  {
    award: "APAP Awards",
    mark: "APAP",
    country: "Peru",
    flag: "🇵🇪",
    logo: null,
    entries: ["Best Peruvian Production Company · 2025"],
  },
  {
    award: "El Ojo Awards",
    mark: "OJO",
    country: "Argentina",
    flag: "🇦🇷",
    logo: null,
    entries: [
      "Radio y Sonido — LoFried — Bronze · 2024",
      "4× Shortlist · 2024",
    ],
  },
  {
    award: "El Condor Awards",
    mark: "CÓNDOR",
    country: "Ecuador",
    flag: "🇪🇨",
    logo: {
      src: "/bio/condor-lions-edit-20260724.png",
      alt: "Cóndor 2023 and Lions Edit Ecuador",
      width: 820,
      height: 360,
    },
    entries: [
      "Radio — LoFried — Silver · 2024",
      "Media — LoFried — Silver · 2024",
      "Cyber / Mobile — LoFried — Silver · 2024",
      "PR — Icetivity — Bronze · 2024",
    ],
  },
] as const;

const galleryImages = [
  {
    src: "/bio/gallery-01-20260724.jpg",
    width: 3000,
    height: 2250,
  },
  {
    src: "/bio/gallery-02-20260724.jpg",
    width: 3000,
    height: 2250,
  },
  {
    src: "/bio/gallery-03-20260724.jpg",
    width: 1280,
    height: 960,
  },
  {
    src: "/bio/gallery-04-20260724.jpg",
    width: 1400,
    height: 2114,
  },
  {
    src: "/bio/gallery-05-20260724.jpg",
    width: 4032,
    height: 3024,
  },
  {
    src: "/bio/gallery-06-20260724.jpg",
    width: 2250,
    height: 3000,
  },
] as const;

export default function BioPage() {
  return (
    <main className="bio-page" id="main-content">
      <div className="bio-kicker">
        <p className="eyebrow">My bio · production notes</p>
        <h1>People make great work happen.</h1>
      </div>
      <div className="bio-layout">
        <div className="bio-visuals">
          <figure className="bio-portrait">
            {/* The supplied production photograph is served directly at its original dimensions. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bio/portaretrato-20260724.jpg"
              alt="Nicole Borja working on an audiovisual production set"
              width="802"
              height="518"
            />
            <figcaption className="blue-note">
              <span>a little about me</span>
              <i aria-hidden="true">↖</i>
            </figcaption>
          </figure>
          <div className="bio-gallery" aria-label="Behind the scenes gallery">
            {galleryImages.map((image, index) => (
              <figure
                className="bio-gallery__photo"
                data-testid="bio-gallery-image"
                key={image.src}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={`Nicole Borja behind the scenes — ${index + 1}`}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </div>
        <article className="bio-copy">
          <p className="bio-lead">{siteConfig.bio}</p>
          {siteConfig.bioIsPlaceholder && (
            <p className="placeholder-label">
              editable placeholder — replace in src/config/site.ts
            </p>
          )}
          <dl className="bio-details">
            <div>
              <dt>focus</dt>
              <dd>
                Audiovisual Production · Brand Activations · Technical
                Production · Regional Influencer Marketing · Workflow & AI
                Automation
              </dd>
            </div>
            <div>
              <dt>role</dt>
              <dd>Executive Producer / Campaign Coordinator</dd>
            </div>
            <div>
              <dt>markets</dt>
              <dd className="bio-markets" role="list">
                <span className="bio-market" role="listitem">
                  <span aria-hidden="true">🇲🇽</span>
                  Mexico
                </span>
                <span className="bio-market" role="listitem">
                  <span aria-hidden="true">🇵🇪</span>
                  Peru
                </span>
                <span className="bio-market" role="listitem">
                  <span aria-hidden="true">🇪🇨</span>
                  Ecuador
                </span>
              </dd>
            </div>
          </dl>

          <section className="bio-section" aria-labelledby="experience-title">
            <div className="bio-section__heading">
              <p className="eyebrow">Experience timeline</p>
              <h2
                className="bio-section__title--single-line"
                id="experience-title"
              >
                From brief to real life.
              </h2>
            </div>
            <ol className="bio-timeline">
              {experience.map((item) => (
                <li key={`${item.period}-${item.company}`}>
                  <p className="bio-timeline__period">{item.period}</p>
                  <div>
                    <h3>{item.role}</h3>
                    <p className="bio-timeline__company">
                      {item.company} <span>— {item.market}</span>
                    </p>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section
            className="bio-section bio-section--recognition"
            aria-labelledby="recognition-title"
          >
            <div className="bio-section__heading">
              <p className="eyebrow">Recognition</p>
              <h2 id="recognition-title">A few good notes.</h2>
            </div>
            <div className="bio-awards">
              {recognition.map((item) => (
                <article className="bio-award" key={item.award}>
                  <header className="bio-award__header">
                    {item.logo ? (
                      <span className="bio-award__logo">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.logo.src}
                          alt={item.logo.alt}
                          width={item.logo.width}
                          height={item.logo.height}
                          loading="lazy"
                        />
                      </span>
                    ) : (
                      <span className="bio-award__mark" aria-hidden="true">
                        {item.mark}
                      </span>
                    )}
                    <div>
                      <h3>{item.award}</h3>
                      <p>{item.country}</p>
                    </div>
                    <span
                      className="bio-award__flag"
                      aria-label={item.country}
                      role="img"
                    >
                      {item.flag}
                    </span>
                  </header>
                  <ul>
                    {item.entries.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <div className="bio-contact">
            {isConfiguredValue(siteConfig.email) ? (
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            ) : (
              <span>email pending</span>
            )}
            <a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phone}</a>
            <Link href="/#work-board">view the work →</Link>
          </div>
        </article>
      </div>
    </main>
  );
}
