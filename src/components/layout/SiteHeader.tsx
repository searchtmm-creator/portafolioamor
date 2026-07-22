"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isConfiguredValue, siteConfig } from "@/src/config/site";

const links = [
  { href: "/", label: "work" },
  { href: "/bio", label: "bio" },
  { href: "/vimeo", label: "vimeo" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link className="site-mark" href="/" aria-label="Go to work archive">
        <span className="site-mark__name">{siteConfig.name}</span>
        <span className="site-mark__role">{siteConfig.role}</span>
      </Link>
      <nav aria-label="Main navigation">
        <ul className="site-nav">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/" || pathname.startsWith("/work/")
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  className={active ? "nav-link is-active" : "nav-link"}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {isConfiguredValue(siteConfig.location) ? (
        <p className="site-location">based in {siteConfig.location}</p>
      ) : (
        <span aria-hidden="true" />
      )}
    </header>
  );
}
