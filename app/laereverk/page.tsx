import Link from "next/link";
import { PageShell } from "../../components/SiteHeader";
import { curriculumSections } from "../../content/chapters";

export default function LearnworkPage() {
  return (
    <PageShell>
      <main className="page-main narrow" id="main">
        <div className="page-intro">
          <span className="eyebrow">Læreverket</span>
          <h1>Historie i seks deler</h1>
          <p>Oversikten viser læreverkets planlagte hovedområder. Innhold publiseres trinnvis, og kapitler uten ferdig faglig materiale er tydelig merket.</p>
        </div>
        <div className="chapter-grid">
          {curriculumSections.map((section) => {
            const isPublished = section.chapters.length > 0;
            return <section className="chapter-card" key={section.slug} id={section.slug}>
              <span className="chapter-number">{section.number}</span>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
              {isPublished ? section.chapters.map((chapter) => <div key={chapter.id}><span className="status-pill">Ferdig referansekapittel</span><Link className="card-link" href={`/laereverk/${chapter.sectionSlug}/${chapter.slug}`}>{chapter.number} · {chapter.title} →</Link></div>) : <span className="status-pill soon">Kommer senere</span>}
            </section>;
          })}
        </div>
        <section className="section-block" aria-labelledby="how-to-add">
          <div className="content-box ochre"><h2 id="how-to-add">Slik bygges neste kapittel</h2><p>Legg til ett nytt kapittelobjekt i <code>content/chapters.ts</code>, koble det til riktig hovedområde, og bruk de gjenbrukbare komponentene for mål, fagtekst, kilder og oppgaver. Navigasjonen genereres fra innholdsmodellen.</p></div>
        </section>
      </main>
    </PageShell>
  );
}
