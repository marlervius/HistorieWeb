import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyLinkButton } from "../../../../components/CopyLinkButton";
import { InteractiveTasks } from "../../../../components/InteractiveTasks";
import { PageShell } from "../../../../components/SiteHeader";
import { chapters, longLines } from "../../../../content/chapters";

type Params = { section: string; chapter: string };

function findChapter(params: Params) {
  return chapters.find((chapter) => chapter.sectionSlug === params.section && chapter.slug === params.chapter);
}

export function generateStaticParams() {
  return chapters.map((chapter) => ({ section: chapter.sectionSlug, chapter: chapter.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const chapter = findChapter(await params);
  return chapter ? { title: `${chapter.number} · ${chapter.title}`, description: chapter.shortIntro } : {};
}

export default async function ChapterPage({ params }: { params: Promise<Params> }) {
  const chapter = findChapter(await params);
  if (!chapter) notFound();
  return <PageShell>
    <main className="page-main" id="main">
      <div className="chapter-hero">
        <span className="eyebrow">Kapittel {chapter.number} · Læreverket</span>
        <h1>{chapter.title}</h1>
        <p className="chapter-intro">{chapter.shortIntro}</p>
        <div className="meta-row"><span><strong>Tid:</strong> {chapter.period}</span><span><strong>Sted:</strong> {chapter.geography}</span><span><strong>Faglig kontroll:</strong> {chapter.lastChecked}</span></div>
        <div className="button-row"><CopyLinkButton /><Link className="button button-secondary" href="#oppgaver">Gå til oppgaver</Link></div>
      </div>
      <div className="chapter-layout">
        <article className="chapter-content">
          <section className="article-section" id="forkunnskap"><div className="section-heading"><span className="eyebrow">Før du begynner</span><h2>Aktiver forkunnskapen</h2></div><div className="content-box"><h3>Tenk, snakk eller noter</h3><p>{chapter.priorKnowledge.prompt}</p><ul className="plain-list">{chapter.priorKnowledge.cues.map((cue) => <li key={cue}>{cue}</li>)}</ul><p className="local-note">Ta vare på det første svaret ditt. Etter kapitlet kan du se hva du vil endre eller presisere.</p></div></section>
          <section className="article-section" id="mal"><div className="section-heading"><span className="eyebrow">Start her</span><h2>Hovedspørsmål og læringsmål</h2></div><div className="content-box ochre"><h3>Hovedspørsmål</h3><p>{chapter.guidingQuestion}</p></div><h3>Dette skal du lære</h3><ul className="fact-list">{chapter.learningGoals.map((goal) => <li key={goal}>{goal}</li>)}</ul></section>
          <section className="article-section" id="tid-og-sted"><div className="section-heading"><span className="eyebrow">Kartet</span><h2>Tid og sted</h2></div><p>Yngre steinalder begynner ikke på samme tidspunkt overalt. Perioden er knyttet til kriterier som jordbruk, bofasthet og redskaper, og endringene kom til ulike tider i ulike regioner.</p><div className="columns-2"><div className="content-box"><h3>Omtrent når?</h3><p>{chapter.period}</p></div><div className="content-box"><h3>Hvor?</h3><p>{chapter.geography}</p></div></div><div className="timeline" id="tidslinje">{chapter.timeline.map((point) => <article className="timeline-item" key={`${point.date}-${point.title}`}><div className="timeline-date">{point.date}</div><div className="timeline-content"><h3>{point.title}</h3><p>{point.description}</p></div></article>)}</div></section>
          <section className="article-section" id="fakta"><div className="section-heading"><span className="eyebrow">01 · Fakta</span><h2>Fakta eleven skal kunne</h2></div><ul className="fact-list">{chapter.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul><h3>Sentrale begreper</h3><div className="glossary-grid">{chapter.concepts.map((concept) => <article className="glossary-card" key={concept.term}><h3>{concept.term}</h3><p>{concept.definition}</p></article>)}</div></section>
          <section className="article-section" id="forstaelse"><div className="section-heading"><span className="eyebrow">02 · Forståelse</span><h2>Årsaker og virkninger</h2></div><div className="columns-2"><div className="content-box"><h3>Mulige forutsetninger</h3><ul className="plain-list">{chapter.causes.map((cause) => <li key={cause}>{cause}</li>)}</ul></div><div className="content-box ochre"><h3>Mulige følger</h3><ul className="plain-list">{chapter.effects.map((effect) => <li key={effect}>{effect}</li>)}</ul></div></div><h3>En mulig årsakskjede</h3><p>Hvert ledd må forklares, og kjeden må formuleres som en mulighet. Ingen av pilene betyr at neste ledd alltid fulgte.</p><div className="chain">{chapter.causeChain.map((step) => <div className="chain-step" key={step}>{step}</div>)}</div><h3>Brudd og kontinuitet</h3><div className="comparison"><table><thead><tr><th>Brudd</th><th>Kontinuitet</th></tr></thead><tbody><tr><td><ul className="plain-list">{chapter.breaks.map((item) => <li key={item}>{item}</li>)}</ul></td><td><ul className="plain-list">{chapter.continuities.map((item) => <li key={item}>{item}</li>)}</ul></td></tr></tbody></table></div></section>
          <section className="article-section"><div className="section-heading"><span className="eyebrow">Fagtekst</span><h2>Kjernefortelling</h2></div>{chapter.narrative.map((section) => <div key={section.heading}><h3>{section.heading}</h3>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>)}</section>
          <section className="article-section" id="kildeblikk"><div className="section-heading"><span className="eyebrow">04 · Kildeblikk</span><h2>Hva kan sporene fortelle?</h2></div><p>Forhistoriske samfunn etterlot seg ikke tekster vi kan lese. Historisk kunnskap bygges derfor av materielle spor: hus, redskaper, planterester, dyrebein, graver og landskap. Sporene må tolkes, og påstander må ikke være sikrere enn materialet tillater.</p><div className="source-grid">{chapter.sourceLooks.map((source) => <article className="source-card" key={source.label}><span className="source-meta">{source.period} · {source.place}</span><h3>{source.label}</h3><ul>{source.evidence.map((evidence) => <li key={evidence}>{evidence}</li>)}</ul><p><strong>Støtter:</strong> {source.supports}</p><p><strong>Kan ikke bevise alene:</strong> {source.cannotProve}</p></article>)}</div></section>
          <section className="article-section" id="lange-linjer"><div className="section-heading"><span className="eyebrow">03 · Lange linjer</span><h2>Kobling til større utviklinger</h2></div><div className="line-grid">{chapter.longLineIds.map((id) => { const line = longLines.find((candidate) => candidate.id === id); return line ? <article className="line-card" key={line.id}><h3>{line.title}</h3><p>{line.description}</p></article> : null; })}</div><div className="content-box ochre"><h3>Skriv med lange linjer</h3><p>Velg én linje. Skriv et avsnitt med minst tre konkrete historiske punkter som linjen går gjennom. Vurder også påstanden: Jordbruksrevolusjonen var både en løsning på et matproblem og begynnelsen på nye problemer.</p></div></section>
          <section className="article-section" id="oppgaver"><div className="section-heading"><span className="eyebrow">Egenarbeid</span><h2>Interaktive oppgaver</h2></div><p>Arbeid i rekkefølgen fakta → forståelse → lange linjer → kildeblikk. Første feil gir et lite hint. Ved nytt forsøk får du en tydeligere forklaring eller modellrespons.</p><InteractiveTasks tasks={chapter.tasks} chapterId={chapter.id} progressVersion={chapter.progressVersion} /></section>
          <section className="article-section" id="oppsummering"><div className="summary-box"><h2>Oppsummering</h2><ul className="fact-list">{chapter.summary.map((sentence) => <li key={sentence}>{sentence}</li>)}</ul></div><fieldset className="self-assessment"><legend>Egenvurdering</legend><p>Kryss av det du kan forklare uten å se i teksten.</p>{chapter.learningGoals.map((goal, index) => <label key={goal} htmlFor={`egenvurdering-${chapter.id}-${index}`}><input id={`egenvurdering-${chapter.id}-${index}`} type="checkbox" /><span>Jeg kan {goal}.</span></label>)}</fieldset></section>
          <section className="article-section" id="repetisjon"><div className="section-heading"><span className="eyebrow">Husk over tid</span><h2>Plan for repetisjon</h2></div><ol className="review-plan"><li><strong>Nå:</strong><span>Lukk fagteksten og gjenfortell de fem punktene i oppsummeringen med egne ord.</span></li><li><strong>Om 2–3 dager:</strong><span>Gjør faktaoppgavene på nytt uten å lese først. Bruk bare hint hvis du står fast.</span></li><li><strong>Om 1–2 uker:</strong><span>Svar på framskrittsspørsmålet og kildeoppgaven på nytt. Sammenlign begrunnelse, eksempler og forbehold med forrige svar.</span></li></ol></section>
          <section className="article-section" id="kilder"><div className="section-heading"><span className="eyebrow">Faglig grunnlag</span><h2>Kilder og videre lesing</h2></div><ul className="source-list">{chapter.sources.map((source) => <li key={source.href}><strong><a href={source.href} target="_blank" rel="noreferrer">{source.title}</a></strong><span>{source.note}</span></li>)}</ul><p className="local-note">Teksten og oppgavene er bearbeidet for undervisning; de er ikke direkte sitater.</p></section>
          <section className="article-section" id="pdf"><div className="section-heading"><span className="eyebrow">Kort repetisjon</span><h2>{chapter.title} – kort fortalt</h2></div>{chapter.summaryPdf ? <a className="download-link" href={chapter.summaryPdf.href}><strong>{chapter.summaryPdf.label}</strong><span>Last ned kvalitetssikret PDF</span></a> : <div className="download-placeholder"><p><strong>Oppsummerings-PDF</strong><span>Fil mangler i prosjektets kvalitetssikrede materiale. Lenke vises derfor ikke før PDF-en finnes.</span></p></div>}</section>
        </article>
        <aside className="chapter-rail" aria-label="På denne siden"><div className="rail-box"><h2>På denne siden</h2><ul><li><a href="#forkunnskap">Forkunnskap</a></li><li><a href="#mal">Mål og hovedspørsmål</a></li><li><a href="#tid-og-sted">Tid og sted</a></li><li><a href="#fakta">Fakta</a></li><li><a href="#forstaelse">Forståelse</a></li><li><a href="#kildeblikk">Kildeblikk</a></li><li><a href="#lange-linjer">Lange linjer</a></li><li><a href="#oppgaver">Oppgaver</a></li><li><a href="#oppsummering">Oppsummering</a></li><li><a href="#repetisjon">Repetisjon</a></li><li><a href="#kilder">Kilder</a></li></ul></div><div className="rail-box"><h2>Stabil lenke</h2><p className="local-note">Bruk lenken i OneNote eller ukeplanen.</p><CopyLinkButton /></div></aside>
      </div>
    </main>
  </PageShell>;
}
