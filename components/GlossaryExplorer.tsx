"use client";

import { useMemo, useState } from "react";

export function GlossaryExplorer({ terms }: { terms: { term: string; definition: string; chapterId: string; chapterTitle: string }[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => terms.filter(({ term, definition }) => `${term} ${definition}`.toLowerCase().includes(query.toLowerCase())), [query, terms]);

  return (
    <div className="glossary-explorer">
      <label className="search-label" htmlFor="begrepsok">Søk i begrepsbanken</label>
      <input id="begrepsok" type="search" placeholder="Søk etter begrep eller forklaring" value={query} onChange={(event) => setQuery(event.target.value)} />
      <p className="result-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "begrep" : "begreper"}</p>
      <div className="glossary-grid">
        {filtered.map(({ term, definition, chapterId, chapterTitle }) => (
          <article className="glossary-card" key={chapterId + "-" + term}>
            <h2>{term}</h2>
            <p>{definition}</p>
            <span className="card-source">Fra {chapterTitle}</span>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <p className="empty-state">Ingen begreper passer søket. Prøv et kortere ord.</p>}
    </div>
  );
}
