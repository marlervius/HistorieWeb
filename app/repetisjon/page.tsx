import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "../../components/SiteHeader";
import { RepetitionPractice } from "../../components/RepetitionPractice";
import { buildRepetitionItems } from "../../lib/repetition";
import { chapters, getChapterPath } from "../../content/chapters";

export const metadata: Metadata = {
  title: "Repetisjon",
  description: "En kort, lokal og kapittelbevisst inngang til aktiv gjenhenting i historie VG2.",
};

export default function RepetitionPage() {
  const publishedChapters = chapters.filter((chapter) => chapter.status === "published");
  const items = buildRepetitionItems(publishedChapters);
  const chapterLinks = publishedChapters.map((chapter) => ({ id: chapter.id, title: `${chapter.number} · ${chapter.title}`, href: getChapterPath(chapter) }));

  return <PageShell>
    <main className="page-main narrow" id="main">
      <div className="page-intro">
        <span className="eyebrow">Aktiv gjenhenting</span>
        <h1>Repetisjon som henter fram</h1>
        <p>En kort økt kan hjelpe deg å hente fram tidligere fakta, begreper og kildearbeid. Prøv å svare før du leser eller åpner en forklaring.</p>
      </div>

      <section className="repetition-intro" aria-labelledby="why-repetition">
        <div className="section-heading"><span className="eyebrow">Hvorfor dette?</span><h2 id="why-repetition">Gjenhenting før gjenlesing</h2></div>
        <div className="columns-2"><div className="content-box"><h3>En liten innsats</h3><p>Du får noen få blandede elementer i stedet for et nytt oppgavesett med poeng. Målet er å oppdage hva du faktisk husker, hva som er uklart, og hva du bør møte igjen.</p></div><div className="content-box ochre"><h3>Ærlig om planen</h3><p>Intervallene er en enkel prosjektheuristikk inspirert av prinsipper om gjenhenting og øving over tid. De er ikke en optimal eller vitenskapelig eksakt algoritme, og de vurderer ikke svaret ditt automatisk.</p></div></div>
      </section>

      <section className="section-block repetition-chapters" aria-labelledby="repetition-chapters-title">
        <div className="section-heading"><span className="eyebrow">Datagrunnlag</span><h2 id="repetition-chapters-title">Kapitler som inngår</h2></div>
        <p className="intro-copy">Inngangen bygger bare på publiserte kapitler i innholdsmodellen. Nye publiserte kapitler tas inn automatisk.</p>
        <ul className="resource-list">{chapters.map((chapter) => <li key={chapter.id} className={chapter.status === "published" ? "" : "local-resource"}><strong>{chapter.number} · {chapter.title}</strong><span>{chapter.status === "published" ? "Tilgjengelig nå · fakta, begreper, oppgaver og kildepåstander" : "Kommer senere · inngår ikke i repetisjon ennå"}</span>{chapter.status === "published" && <Link className="card-link" href={getChapterPath(chapter)}>Åpne kapitlet →</Link>}</li>)}</ul>
      </section>

      <section className="section-block" aria-labelledby="how-repetition-works">
        <div className="section-heading"><span className="eyebrow">Slik fungerer økten</span><h2 id="how-repetition-works">Kort, variert og lokalt</h2></div>
        <ol className="review-plan"><li><strong>Hent fram:</strong><span>Prøv et faktapunkt, forklar et begrep eller svar på en oppgave før du åpner responsen.</span></li><li><strong>Se respons:</strong><span>Lukkede oppgaver følger samme hint-først-regel som kapittelet. Åpne svar og begreper krever et eget forsøk før modell eller definisjon vises.</span></li><li><strong>Vurder selv:</strong><span>Velg «prøv igjen snart», «litt usikker» eller «jeg fikk det fram». Valget flytter neste dato i en enkel, deterministisk plan.</span></li></ol>
      </section>

      <section className="section-block" aria-labelledby="repetition-session-title"><RepetitionPractice items={items} chapterLinks={chapterLinks} /></section>

      <section className="section-block" aria-labelledby="repetition-privacy">
        <div className="content-box" id="repetition-privacy"><h2>Personvern og sletting</h2><p>Repetisjonstilstanden ligger i en egen, kapittelbevisst og versjonert localStorage-envelope i denne nettleseren. Ingen elevsvar, identifikatorer eller bruksdata sendes eksternt. Du kan slette bare repetisjonsdata fra økten.</p></div>
      </section>
    </main>
  </PageShell>;
}
