import Link from "next/link";
import type { ReactNode } from "react";
import { chapters, getChapterPath } from "../content/chapters";

const navItems = [
  ["Læreverket", "/laereverk"],
  ["Repetisjon", "/repetisjon"],
  ["Lange linjer", "/lange-linjer"],
  ["Begrepsbank", "/begreper"],
  ["Tidslinje", "/tidslinje"],
  ["For lærere", "/laerere"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="brand" href="/" aria-label="Historie i sammenheng – forsiden">
          <span className="brand-mark" aria-hidden="true">H</span>
          <span>
            <span className="brand-title">Historie i sammenheng</span>
            <span className="brand-subtitle">Historie VG2</span>
          </span>
        </Link>
        <nav className="site-nav" aria-label="Hovedmeny">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const referenceChapter = chapters[0];
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <p className="footer-kicker">Historie i sammenheng</p>
          <p className="footer-copy">Et skalerbart digitalt læreverk for historie VG2.</p>
        </div>
        <nav className="footer-nav" aria-label="Sekundærmeny">
          <Link href="/om">Om læreverket</Link>
          <Link href="/laerere">For lærere</Link>
          <Link href={getChapterPath(referenceChapter)}>Referansekapittel {referenceChapter.number}</Link>
        </nav>
      </div>
      <p className="footer-meta">Innholdskontrollert {referenceChapter.lastChecked} · Ingen elevdata sendes eller samles inn.</p>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">Hopp til hovedinnhold</a>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
