import Link from "next/link";
import { PageShell } from "../../components/SiteHeader";
import { chapters, getChapterPath, longLines } from "../../content/chapters";

export default function LongLinesPage() {
  return (
    <PageShell>
      <main className="page-main narrow" id="main">
        <div className="page-intro"><span className="eyebrow">Sammenheng</span><h1>De lange linjene</h1><p>Historiske linjer blir ikke funnet som ferdige svar. De bygges ved å sette flere konkrete punkter i forbindelse med hverandre – og ved å være tydelig på hva som ikke kan konkluderes.</p></div>
        <div className="line-grid">
          {longLines.map((line, index) => {
            const connected = chapters.filter((chapter) => chapter.longLineIds.includes(line.id));
            return <article className="line-card" key={line.id}><span className="line-number">{String(index + 1).padStart(2, "0")}</span><h3>{line.title}</h3><p>{line.description}</p>{connected.length > 0 ? <Link href={`${getChapterPath(connected[0])}#lange-linjer`}>Se bidrag fra {connected[0].number} →</Link> : <span className="card-source">Kobles til kommende kapitler</span>}</article>;
          })}
        </div>
        <section className="section-block"><div className="content-box"><h2>En enkel arbeidsmåte</h2><p>Velg en linje. Finn minst tre konkrete historiske punkter. Forklar hva som endrer seg, hva som fortsetter, og hvem som får ulike fordeler eller kostnader.</p></div></section>
      </main>
    </PageShell>
  );
}
