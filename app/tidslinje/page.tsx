import Link from "next/link";
import { PageShell } from "../../components/SiteHeader";
import { getChapterById, getChapterPath, timeline } from "../../content/chapters";

export default function TimelinePage() {
  return <PageShell><main className="page-main narrow" id="main"><div className="page-intro"><span className="eyebrow">Verktøy</span><h1>Tidslinje</h1><p>En samlet tidslinje gir punktene en plass før du trekker de lange linjene. Her samles de kvalitetssikrede punktene fra de publiserte kapitlene, og nye kapitler tas inn automatisk.</p></div><div className="timeline">{timeline.map((point) => { const chapter = getChapterById(point.chapterId); return <article className="timeline-item" key={`${point.chapterId}-${point.date}-${point.title}`}><div className="timeline-date">{point.date}</div><div className="timeline-content"><h2>{point.title}</h2><p>{point.description}</p>{chapter && <Link className="card-link" href={`${getChapterPath(chapter)}#tidslinje`}>Åpne i kapittel →</Link>}</div></article>; })}</div></main></PageShell>;
}
