import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";
import ChapterPage from "../app/laereverk/[section]/[chapter]/page";
import {
  chapterRenderedSectionOrder,
  jordbruksrevolusjonen,
  timeline,
} from "../content/chapters";
import {
  getShuffledClassificationEntries,
  getWorkshopClaimOrder,
} from "../components/SourceWorkshop";
import { seededOrder } from "../components/seededOrder";

const chapter = jordbruksrevolusjonen;
const choiceTasks = chapter.tasks.filter((task) => task.kind === "choice");
const hedgePattern = /\b(?:kunne|kan|mulig|trolig)\b/i;

const verifiedPublishedSourceTitles = [
  "Utdanningsdirektoratet · Kompetansemål etter vg2 (HIS01-03)",
  "OpenStax · World History Volume 1: 2.3 The Neolithic Revolution",
  "UNESCO · Neolithic Site of Çatalhöyük",
  "Çatalhöyük Research Project · Site Guide Book",
  "UNESCO · Göbekli Tepe",
  "Deutsches Archäologisches Institut · Göbekli Tepe",
  "Dietrich m.fl. · Cereal processing at Early Neolithic Göbekli Tepe",
  "Zeder (2008) · Domestication and early agriculture in the Mediterranean Basin",
  "Denham m.fl. (2003) · Origins of agriculture at Kuk Swamp",
  "International Commission on Stratigraphy · GSSP tables",
  "Parkinson m.fl. (2023) · Multiproxy bioarchaeological data reveals interplay between growth, diet and population dynamics across the transition to farming in the central Mediterranean",
];

function answerLength(task: (typeof choiceTasks)[number]) {
  return task.options?.map((option) => option.length) ?? [];
}

describe("innholdsmodellens faglige hardening", () => {
  test("har ikke identisk items/expected i rekkefølgeoppgaver", () => {
    for (const task of chapter.tasks.filter((candidate) => candidate.kind === "order")) {
      expect(task.expected).not.toEqual(task.items);
    }
  });

  test("har ikke n-te item koblet til n-te choice i match/sort", () => {
    for (const task of chapter.tasks.filter((candidate) => candidate.kind === "match" || candidate.kind === "sort")) {
      const positional = (task.items?.length ?? 0) === (task.choices?.length ?? 0)
        && (task.items ?? []).every((item, index) => task.answerMap?.[item] === task.choices?.[index]);
      expect(positional).toBe(false);
    }
  });

  test("har balanserte choice-lengder og ingen fasit som eneste hedgede alternativ", () => {
    const longestAnswers = choiceTasks.filter((task) => {
      const lengths = answerLength(task);
      return lengths[task.correct ?? -1] === Math.max(...lengths);
    });

    expect(longestAnswers.length / choiceTasks.length).toBeLessThanOrEqual(0.3);
    for (const task of choiceTasks) {
      const lengths = answerLength(task);
      expect((Math.max(...lengths) - Math.min(...lengths)) / Math.min(...lengths)).toBeLessThanOrEqual(0.25);
      const hedged = task.options?.filter((option) => hedgePattern.test(option)) ?? [];
      expect(hedged.length).toBeGreaterThanOrEqual(2);
      expect(hedgePattern.test(task.options?.[task.correct ?? -1] ?? "") && hedged.length === 1).toBe(false);
    }
  });

  test("stokker verkstedpåstander og klassifiseringsetiketter uavhengig", () => {
    const workshop = chapter.sourceWorkshops[0];
    const displayedClaims = getWorkshopClaimOrder(workshop.id, workshop.claims.length)
      .map((index) => workshop.claims[index].classification);
    const displayedLabels = getShuffledClassificationEntries(workshop.id).map(([value]) => value);
    expect(displayedClaims).not.toEqual(displayedLabels);
  });

  test("har ikke-synkende eksportert tidslinje", () => {
    expect(timeline.every((point, index) => index === 0 || point.sortKey >= timeline[index - 1].sortKey)).toBe(true);
  });

  test("har railrekkefølge som følger de rendrerte kapittelseksjonene", async () => {
    const html = renderToStaticMarkup(await ChapterPage({
      params: Promise.resolve({ section: chapter.sectionSlug, chapter: chapter.slug }),
    }));
    const rail = html.match(/<aside class="chapter-rail"[\s\S]*?<\/aside>/)?.[0] ?? "";
    const menuIds = [...rail.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
    const domIds = [...html.matchAll(/<section class="article-section" id="([^"]+)"/g)].map((match) => match[1]);

    expect(domIds).toEqual([...chapterRenderedSectionOrder]);
    expect(menuIds).toEqual(domIds);
    expect(menuIds).toContain("fagtekst");
  });

  test("har elleve verifiserte, publiserte kildetitler uten korttitler", () => {
    expect(chapter.sources).toHaveLength(11);
    expect(chapter.sources.map((source) => source.title)).toEqual(verifiedPublishedSourceTitles);
    for (const source of chapter.sources) expect(source.title.length).toBeGreaterThanOrEqual(20);
  });
});

describe("stabil presentasjonsrekkefølge og lagring", () => {
  test("gir samme rekkefølge for samme seed og ny rekkefølge for ny seed", () => {
    for (const task of choiceTasks) {
      const length = task.options?.length ?? 0;
      expect(seededOrder(task.id, length)).toEqual(seededOrder(task.id, length));

      const variants = new Set(
        Array.from({ length: 8 }, (_, attempt) => seededOrder(`${task.id}:retry:${attempt}`, length).join(",")),
      );
      expect(variants.size).toBeGreaterThan(1);
    }
  });

  test("bevarer fasiten som stabil semantisk verdi gjennom alle seeds", () => {
    for (const task of choiceTasks) {
      const options = task.options ?? [];
      const correctValue = options[task.correct ?? -1];
      expect(correctValue).toBeTypeOf("string");

      for (let attempt = 0; attempt < 12; attempt += 1) {
        const shown = seededOrder(`${task.id}:retry:${attempt}`, options.length).map((index) => options[index]);
        expect(shown).toHaveLength(options.length);
        expect(new Set(shown).size).toBe(options.length);
        expect(shown).toContain(correctValue);
        // Fasiten skal aldri være bundet til en visningsindeks.
        expect(options[task.correct ?? -1]).toBe(correctValue);
      }
    }
  });

  test("er en permutasjon uten tap for alle lengder", () => {
    for (let length = 0; length <= 12; length += 1) {
      const order = seededOrder(`lengde-${length}`, length);
      expect([...order].sort((a, b) => a - b)).toEqual(Array.from({ length }, (_, index) => index));
    }
    expect(seededOrder("negativ", -1)).toEqual([]);
  });
});

describe("språk- og lengdediagnostikk for flervalg", () => {
  test("har fasit som verken systematisk lengste eller systematisk korteste alternativ", () => {
    const longest = choiceTasks.filter((task) => {
      const lengths = answerLength(task);
      return lengths[task.correct ?? -1] === Math.max(...lengths);
    });
    const shortest = choiceTasks.filter((task) => {
      const lengths = answerLength(task);
      return lengths[task.correct ?? -1] === Math.min(...lengths);
    });

    expect(longest.length / choiceTasks.length).toBeLessThanOrEqual(0.3);
    expect(shortest.length / choiceTasks.length).toBeLessThanOrEqual(0.3);
  });

  test("har ingen oppgave der fasiten er det eneste språklig nyanserte alternativet", () => {
    const offenders = choiceTasks
      .filter((task) => {
        const hedged = task.options?.filter((option) => hedgePattern.test(option)) ?? [];
        return hedgePattern.test(task.options?.[task.correct ?? -1] ?? "") && hedged.length < 2;
      })
      .map((task) => task.id);

    expect(offenders).toEqual([]);
  });
});

describe("kildeverkstedets påstandssett", () => {
  const workshop = jordbruksrevolusjonen.sourceWorkshops[0];

  test("har 6–8 påstander og minst to i samme kategori", () => {
    expect(workshop.claims.length).toBeGreaterThanOrEqual(6);
    expect(workshop.claims.length).toBeLessThanOrEqual(8);

    const perCategory = new Map<string, number>();
    for (const claim of workshop.claims) {
      perCategory.set(claim.classification, (perCategory.get(claim.classification) ?? 0) + 1);
    }
    expect([...perCategory.values()].some((count) => count >= 2)).toBe(true);
  });

  test("danner ikke et trivielt diagonalt mønster mot etikettrekkefølgen", () => {
    const shownClaims = getWorkshopClaimOrder(workshop.id, workshop.claims.length)
      .map((index) => workshop.claims[index].classification);
    const shownLabels = getShuffledClassificationEntries(workshop.id).map(([value]) => value);

    const diagonalHits = shownClaims.filter((classification, index) => classification === shownLabels[index]).length;
    expect(diagonalHits).toBeLessThan(shownClaims.length);
  });

  test("har unike forklaringer og gyldige kilde-ID-er per påstand", () => {
    const explanations = workshop.claims.map((claim) => claim.explanation);
    expect(new Set(explanations).size).toBe(explanations.length);

    const knownSourceIds = new Set(jordbruksrevolusjonen.sources.map((source) => source.id));
    for (const claim of workshop.claims) {
      expect(claim.sourceIds.length).toBeGreaterThan(0);
      for (const id of claim.sourceIds) expect(knownSourceIds.has(id)).toBe(true);
    }
  });
});

describe("tidslinjens sorteringsverdier", () => {
  test("har heltallige sortKey-verdier for alle punkter", () => {
    for (const point of timeline) expect(Number.isInteger(point.sortKey)).toBe(true);
  });

  test("er sortert eldst til yngst uavhengig av rekkefølgen i kildefilen", () => {
    const sorted = [...timeline].sort((first, second) => first.sortKey - second.sortKey);
    expect(timeline.map((point) => point.title)).toEqual(sorted.map((point) => point.title));
  });

  test("viser Göbekli Tepe før Çatalhöyük", () => {
    const titles = timeline.map((point) => point.title);
    expect(titles.indexOf("Göbekli Tepe")).toBeLessThan(titles.indexOf("Çatalhöyük"));
  });
});
