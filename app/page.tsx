import Link from "next/link";
import { PageShell } from "../components/SiteHeader";
import { chapters, getChapterPath, longLines } from "../content/chapters";

export default function Home() {
  const referenceChapter = chapters[0];
  const referencePath = getChapterPath(referenceChapter);
  return (
    <PageShell>
      <main className="page-main" id="main">
        <section className="hero" aria-labelledby="home-title">
          <div>
            <span className="eyebrow">Et digitalt læreverk for historie VG2</span>
            <h1 id="home-title">Historie i sammenheng</h1>
            <p className="hero-lede">Et rolig og faglig løft fra sikre punkter til forklaring, kildearbeid og lange historiske linjer.</p>
            <div className="button-row">
              <Link className="button" href="/laereverk">Gå til læreverket</Link>
              <Link className="button button-secondary" href={referencePath}>Åpne kapittel {referenceChapter.number}</Link>
            </div>
          </div>
          <aside className="hero-aside">
            <p>«Fakta gir oss punktene. Forståelse trekker de lange linjene mellom dem.»</p>
            <small>Progresjon i hver læringspakke: fakta → forståelse → lange linjer.</small>
          </aside>
        </section>

        <section className="section-block" aria-labelledby="entry-points">
          <div className="section-heading"><span className="eyebrow">Start her</span><h2 id="entry-points">Bygg oversikten lag for lag</h2></div>
          <div className="feature-row">
            <article className="feature-card"><span className="feature-number">01 · Læreverket</span><h3>Se hvor kapitlene hører hjemme</h3><p>En samlet inngang til historiefaget, med tydelig status for det som er ferdig og det som kommer senere.</p><Link className="card-link" href="/laereverk">Utforsk læreverket →</Link></article>
            <article className="feature-card"><span className="feature-number">02 · Lange linjer</span><h3>Koble punktene over tid</h3><p>Finn temaer som mat, demografi, økonomi, kulturmøter og makt på tvers av kapitlene.</p><Link className="card-link" href="/lange-linjer">Se lange linjer →</Link></article>
            <article className="feature-card"><span className="feature-number">03 · For lærere</span><h3>Bruk stoffet i undervisningen</h3><p>Se den pedagogiske modellen, kompetansemålene og forslag til arbeid i OneNote.</p><Link className="card-link" href="/laerere">Åpne lærerinngangen →</Link></article>
          </div>
        </section>

        <section className="section-block" aria-labelledby="reference">
          <div className="section-heading"><span className="eyebrow">Referansekapittel</span><h2 id="reference">2.2 · Jordbruksrevolusjonen</h2></div>
          <div className="home-grid">
            <article className="card"><span className="eyebrow">Fakta</span><h3>Fra jegere og sankere til mange ulike bønder</h3><p>{referenceChapter.shortIntro}</p><Link className="card-link" href={`${referencePath}#fakta`}>Les fagteksten →</Link></article>
            <article className="card"><span className="eyebrow">Forståelse</span><h3>Årsaker, virkninger og utviklingskjeder</h3><p>Se hvordan mat, lagring, arbeidsdeling, helse, natur og makt henger sammen uten å gjøre utviklingen automatisk.</p><Link className="card-link" href={`${referencePath}#forstaelse`}>Koble punktene →</Link></article>
            <article className="card"><span className="eyebrow">Kildeblikk</span><h3>Çatalhöyük og Göbekli Tepe</h3><p>Øv på å skille mellom funn, forsvarlige slutninger og det arkeologisk materiale ikke kan bevise alene.</p><Link className="card-link" href={`${referencePath}#kildeblikk`}>Se kildene →</Link></article>
          </div>
        </section>

        <section className="section-block" aria-labelledby="lines-preview">
          <div className="section-heading"><span className="eyebrow">På tvers av kapitler</span><h2 id="lines-preview">De lange linjene</h2></div>
          <div className="line-grid">
            {longLines.slice(0, 4).map((line, index) => <article className="line-card" key={line.id}><span className="line-number">0{index + 1}</span><h3>{line.title}</h3><p>{line.description}</p></article>)}
          </div>
          <Link className="card-link" href="/lange-linjer">Se alle lange linjer →</Link>
        </section>
      </main>
    </PageShell>
  );
}
