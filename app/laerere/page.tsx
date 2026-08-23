import Link from "next/link";
import { PageShell } from "../../components/SiteHeader";
import type { Chapter, ChapterSectionId, TeacherGuide, TeacherResource } from "../../content/chapters";
import { chapters, getChapterPath } from "../../content/chapters";

type TeacherChapter = Chapter & { teacherGuide: TeacherGuide };

const sectionLabels: Record<ChapterSectionId, string> = {
  forkunnskap: "Forkunnskap", mal: "Mål og hovedspørsmål", "tid-og-sted": "Tid og sted", tidslinje: "Tidslinje",
  fakta: "Fakta og begreper", forstaelse: "Årsaker og virkninger", fagtekst: "Kjernefortelling",
  kildeblikk: "Kildeblikk", kildeverksted: "Kildeverksted", "lange-linjer": "Lange linjer", oppgaver: "Oppgaver", oppsummering: "Oppsummering",
  repetisjon: "Repetisjon", kilder: "Kilder", pdf: "Kort repetisjon",
};

function isTeacherChapter(chapter: Chapter): chapter is TeacherChapter {
  return Boolean(chapter.teacherGuide);
}

function chapterSectionHref(chapter: Chapter, sectionId: ChapterSectionId) {
  return getChapterPath(chapter) + "#" + sectionId;
}

function ChapterLinks({ chapter, sectionIds }: { chapter: Chapter; sectionIds: ChapterSectionId[] }) {
  return <nav className="teacher-related-links" aria-label="Relevante deler av elevkapitlet"><span>Se også i elevkapitlet:</span><ul>{sectionIds.map((sectionId) => <li key={sectionId}><Link href={chapterSectionHref(chapter, sectionId)}>{sectionLabels[sectionId]}</Link></li>)}</ul></nav>;
}

function ResourceList({ chapter, resources }: { chapter: Chapter; resources: TeacherResource[] }) {
  return <ul className="resource-list teacher-resource-list">{resources.map((resource) => {
    const content = <><strong>{resource.label}</strong><span>{resource.description}</span></>;
    if (resource.visibility === "local") return <li className="local-resource" key={resource.label}><div className="local-resource-heading">{content}<span className="local-badge">Lokalt · ikke publisert</span></div></li>;
    const href = resource.sectionId ? chapterSectionHref(chapter, resource.sectionId) : resource.href;
    return href ? <li key={resource.label}><Link href={href}>{content}</Link></li> : null;
  })}</ul>;
}

function TeacherChapter({ chapter }: { chapter: TeacherChapter }) {
  const guide = chapter.teacherGuide;
  return <article className="teacher-chapter" id={"laerer-kapittel-" + chapter.id.replace(".", "-")}>
    <header className="teacher-chapter-header">
      <span className="eyebrow">Kapittel {chapter.number}</span><h2>{chapter.title}</h2>
      <p className="teacher-chapter-intro">{chapter.shortIntro}</p>
      <p className="teacher-meta">Sist faglig kontrollert: <strong>{chapter.lastChecked}</strong></p>
      <Link className="button button-secondary" href={getChapterPath(chapter)}>Åpne elevkapitlet →</Link>
    </header>
    <section className="teacher-section" aria-labelledby={"teacher-overview-" + chapter.id}>
      <div className="section-heading"><span className="eyebrow">Kort oversikt</span><h3 id={"teacher-overview-" + chapter.id}>Fra fakta til historisk resonnering</h3></div>
      <div className="content-box"><p>{guide.overview}</p><p><strong>Hovedspørsmål:</strong> {chapter.guidingQuestion}</p></div>
    </section>
    <section className="teacher-section" aria-labelledby={"teacher-goals-" + chapter.id}>
      <div className="section-heading"><span className="eyebrow">Læreplan</span><h3 id={"teacher-goals-" + chapter.id}>Relevante kompetansemål</h3></div>
      <ul className="fact-list">{chapter.competenceGoals.map((goal) => <li key={goal}>{goal}</li>)}</ul>
    </section>
    <section className="teacher-section" aria-labelledby={"teacher-path-" + chapter.id}>
      <div className="section-heading"><span className="eyebrow">Undervisningsløp</span><h3 id={"teacher-path-" + chapter.id}>En mulig gjennomføring</h3></div>
      <p className="intro-copy">Tidsangivelsene følger det lokale arbeidsgrunnlaget. De kan tilpasses gruppen og brukes som rekkefølge, ikke som et nytt vurderingskrav.</p>
      <ol className="teacher-phase-list">{guide.teachingPhases.map((phase) => <li className="teacher-phase" key={phase.id}>
        <div className="teacher-phase-heading"><span className="eyebrow">{phase.duration}</span><h4>{phase.title}</h4><p>{phase.purpose}</p></div>
        <div className="columns-2 teacher-phase-actions"><div><h5>Lærerens grep</h5><ul className="plain-list">{phase.teacherActions.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h5>Elevenes arbeid</h5><ul className="plain-list">{phase.studentActions.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
        <ChapterLinks chapter={chapter} sectionIds={phase.sectionIds} />
      </li>)}</ol>
    </section>
    <section className="teacher-section" aria-labelledby={"teacher-activation-" + chapter.id}>
      <div className="section-heading"><span className="eyebrow">Før fagteksten</span><h3 id={"teacher-activation-" + chapter.id}>Aktiver forkunnskaper og arbeid underveis</h3></div>
      <div className="columns-2"><div className="content-box"><h4>Startspørsmål</h4><p>{guide.priorKnowledgeActivation.prompt}</p><ul className="plain-list">{guide.priorKnowledgeActivation.cues.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="content-box ochre"><h4>Arbeid i fagteksten</h4><ul className="plain-list">{guide.textWork.instructions.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
      <ChapterLinks chapter={chapter} sectionIds={[...guide.priorKnowledgeActivation.sectionIds, ...guide.textWork.sectionIds]} />
    </section>
    <section className="teacher-section" aria-labelledby={"teacher-tasks-" + chapter.id}>
      <div className="section-heading"><span className="eyebrow">Oppgavene</span><h3 id={"teacher-tasks-" + chapter.id}>Gjenhenting og nytt forsøk</h3></div>
      <div className="content-box"><p><strong>Rekkefølge:</strong> {guide.taskUse.sequence}</p><p><strong>Første forsøk:</strong> {guide.taskUse.firstAttempt}</p><p><strong>Nytt forsøk:</strong> {guide.taskUse.retry}</p><p><strong>Åpne svar:</strong> {guide.taskUse.openResponses}</p></div>
      <ChapterLinks chapter={chapter} sectionIds={guide.taskUse.sectionIds} />
    </section>
    <section className="teacher-section" aria-labelledby={"teacher-workshop-" + chapter.id}>
      <div className="section-heading"><span className="eyebrow">Kildeverksted</span><h3 id={"teacher-workshop-" + chapter.id}>Fra observasjon til begrunnet slutning</h3></div>
      <div className="columns-2"><div className="content-box"><h4>Hensikt</h4><p>{guide.sourceWorkshop.purpose}</p><h4>Anbefalt plass</h4><p>{guide.sourceWorkshop.recommendedPlacement}</p></div><div className="content-box ochre"><h4>Sentrale faglige skiller</h4><ul className="plain-list">{guide.sourceWorkshop.distinctions.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
      <div className="columns-2 teacher-phase-actions"><div><h4>Vanlige feiltolkninger</h4><ul className="plain-list">{guide.sourceWorkshop.commonMisreadings.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h4>Spørsmål i samtalen</h4><ul className="plain-list">{guide.sourceWorkshop.discussionQuestions.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
      <div className="content-box"><h4>Vurderingskriterier</h4><ul className="plain-list">{guide.sourceWorkshop.assessmentCriteria.map((item) => <li key={item}>{item}</li>)}</ul></div>
      <p className="intro-copy">Kildegrunnlag og rettighetsstatus:</p><ul className="source-list">{guide.sourceWorkshop.sourceIds.map((sourceId) => { const source = chapter.sources.find((candidate) => candidate.id === sourceId); return source ? <li key={source.id}><a href={source.href} target="_blank" rel="noreferrer"><strong>{source.title}</strong></a><span>{source.rights}</span></li> : null; })}</ul>
      <ChapterLinks chapter={chapter} sectionIds={["kildeverksted"]} />
    </section>
    <section className="teacher-section" aria-labelledby={"teacher-review-" + chapter.id}>
      <div className="section-heading"><span className="eyebrow">Etter arbeidet</span><h3 id={"teacher-review-" + chapter.id}>Egenvurdering og repetisjon</h3></div>
      <div className="columns-2"><div className="content-box"><h4>Egenvurdering</h4><ul className="plain-list">{guide.selfAssessmentAndReview.selfAssessment.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="content-box ochre"><h4>Repetisjon over tid</h4><ol className="plain-list">{guide.selfAssessmentAndReview.repetition.map((item) => <li key={item}>{item}</li>)}</ol></div></div>
      <ChapterLinks chapter={chapter} sectionIds={guide.selfAssessmentAndReview.sectionIds} />
    </section>
    <section className="teacher-section" aria-labelledby={"teacher-misconceptions-" + chapter.id}>
      <div className="section-heading"><span className="eyebrow">Vanlige elevforestillinger</span><h3 id={"teacher-misconceptions-" + chapter.id}>Avdekk og møt misoppfatninger</h3></div>
      <p className="intro-copy">Forestillinger behandles som forståelige startpunkt. Målet er å få eleven videre med et konkret spørsmål, belegg og en faglig presisering.</p>
      <div className="teacher-misconception-grid">{guide.misconceptions.map((item) => <article className="teacher-misconception" key={item.belief}><h4>{item.belief}</h4><dl><dt>Hvorfor forestillingen er forståelig</dt><dd>{item.whyUnderstandable}</dd><dt>Spørsmål som kan avdekke den</dt><dd>{item.diagnosticQuestion}</dd><dt>Faglig presisering</dt><dd>{item.response}</dd></dl></article>)}</div>
    </section>
    <section className="teacher-section" aria-labelledby={"teacher-criteria-" + chapter.id}>
      <div className="section-heading"><span className="eyebrow">Vurdering</span><h3 id={"teacher-criteria-" + chapter.id}>Observerbare kriterier for elevsvar</h3></div>
      <p className="intro-copy">Kriteriene kan brukes i muntlig respons, korte svar og lengre resonnementer. De beskriver kvalitetstrekk, ikke én eneste formulering.</p>
      <div className="teacher-criteria-grid">{guide.assessmentCriteria.map((criterion) => <article className="teacher-criterion" key={criterion.area}><h4>{criterion.area}</h4><p><strong>Kort svar:</strong> {criterion.shortAnswer}</p><p><strong>Lengre svar:</strong> {criterion.extendedAnswer}</p></article>)}</div>
    </section>
    <section className="teacher-section" aria-labelledby={"teacher-resources-" + chapter.id}>
      <div className="section-heading"><span className="eyebrow">Lenker og status</span><h3 id={"teacher-resources-" + chapter.id}>Ressurser</h3></div>
      <p className="intro-copy">Offentlige lenker går til elevkapitlet. Lokalt materiale markeres uten URL og legges ikke i nettleseren.</p>
      <ResourceList chapter={chapter} resources={guide.resources} />
    </section>
  </article>;
}

export default function TeachersPage() {
  const teacherChapters = chapters.filter(isTeacherChapter);
  return <PageShell><main className="page-main narrow" id="main">
    <div className="page-intro"><span className="eyebrow">For lærere</span><h1>Fra læringsmål til lange linjer</h1><p>En offentlig lærerinngang til undervisningsløp, elevaktiviteter, misoppfatninger og vurderingskriterier. Innholdet følger kapittelmodellen og utvides automatisk når nye kapitler får lærerdata.</p></div>
    <div className="columns-2"><article className="content-box"><h2>Den pedagogiske modellen</h2><p><strong>Forkunnskaper → fakta → forståelse → kildearbeid → lange linjer → egenvurdering → repetisjon.</strong> Læreren får en tydelig inngang til elevkapitlets offentlige deler.</p></article><article className="content-box ochre"><h2>Offentlig og lokalt</h2><p>Offentlige lenker går til elevkapitlet. Lokalt arbeidsmateriale markeres uten URL og legges ikke i HTML, klientkode eller nettleserdata.</p></article></div>
    <nav className="teacher-index" aria-label="Kapitler med lærerdata"><h2>Velg kapittel</h2><ul>{teacherChapters.map((chapter) => <li key={chapter.id}><a href={"#laerer-kapittel-" + chapter.id.replace(".", "-")}>{chapter.number} · {chapter.title}</a></li>)}</ul></nav>
    {teacherChapters.length > 0 ? teacherChapters.map((chapter) => <TeacherChapter chapter={chapter} key={chapter.id} />) : <p className="empty-state">Ingen kapitler har lærerdata ennå.</p>}
  </main></PageShell>;
}
