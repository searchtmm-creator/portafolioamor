import { WorkArchive } from "@/src/components/work/WorkArchive";
import { isConfiguredValue, siteConfig } from "@/src/config/site";

export default function Home() {
  return (
    <main id="main-content">
      <WorkArchive />
      <section className="contact-strip" aria-labelledby="contact-title">
        <p className="eyebrow">next production</p>
        <h2 id="contact-title">Let&apos;s make something memorable.</h2>
        {isConfiguredValue(siteConfig.email) ? (
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        ) : (
          <p className="pending-copy">contact email coming soon</p>
        )}
      </section>
    </main>
  );
}
