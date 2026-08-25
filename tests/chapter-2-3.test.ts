import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";
import ChapterPage from "../app/laereverk/[section]/[chapter]/page";
import {
  byerUtenEnOppskrift,
  chapterRenderedSectionOrder,
  chapters,
  timeline,
} from "../content/chapters";
import { buildRepetitionItems } from "../lib/repetition";

const chapter = byerUtenEnOppskrift;
const sourceIds = new Set(chapter.sources.map((source) => source.id));

describe("kapittel 2.3 · Byer uten én oppskrift", () => {
  test("har riktig identitet, progresjon og kildekatalog", () => {
    expect(chapter.id).toBe("2.3");
    expect(chapter.number).toBe("2.3");
    expect(chapter.slug).toBe("2-3-byer-uten-en-oppskrift");
    expect(chapter.sectionSlug).toBe("02-fra-jegere-til-bysamfunn");
    expect(chapter.title).toBe("Byer uten én oppskrift: mennesker, ressurser og makt i tidlige bysamfunn");
    expect(chapter.learningGoals).toHaveLength(6);
    expect(chapter.sources).toHaveLength(12);
    expect(chapter.sourceLooks).toHaveLength(3);
    expect(chapter.timeline).toHaveLength(5);
    expect(chapter.longLineIds).toHaveLength(6);
    expect(chapter.teacherGuide?.teachingPhases.length).toBeGreaterThanOrEqual(7);
    expect(chapter.teacherGuide?.misconceptions.length).toBeGreaterThanOrEqual(8);
    expect(chapter.teacherGuide?.assessmentCriteria.map((criterion) => criterion.area)).toEqual([
      "Faktakunnskap",
      "Historiske begreper",
      "Årsaker og virkninger",
      "Kildebruk",
      "Konkrete eksempler",
      "Nyansering og historisk usikkerhet",
    ]);
    for (const source of chapter.sources) {
      expect(source.href.startsWith("https://")).toBe(true);
      expect(source.title.length).toBeGreaterThanOrEqual(20);
      expect(source.rights.length).toBeGreaterThan(20);
    }
  });

  test("har alle 19 oppgaver i fakta-forståelse-lange linjer-kildeblikk", () => {
    const expectedIds = [
      "F1", "F2", "F3", "F4", "F5", "F6",
      "U1", "U2", "U3", "U4", "U5",
      "L1", "L2", "L3", "L4",
      "K1", "K2", "K3", "K4",
    ];
    expect(chapter.tasks).toHaveLength(19);
    expect(chapter.tasks.map((task) => task.id)).toEqual(expectedIds);
    expect(new Set(chapter.tasks.map((task) => task.id)).size).toBe(19);
    expect(Object.groupBy(chapter.tasks, (task) => task.phase)).toEqual({
      Fakta: chapter.tasks.filter((task) => task.phase === "Fakta"),
      Forståelse: chapter.tasks.filter((task) => task.phase === "Forståelse"),
      "Lange linjer": chapter.tasks.filter((task) => task.phase === "Lange linjer"),
      Kildeblikk: chapter.tasks.filter((task) => task.phase === "Kildeblikk"),
    });
    expect(chapter.tasks.filter((task) => task.phase === "Fakta")).toHaveLength(6);
    expect(chapter.tasks.filter((task) => task.phase === "Forståelse")).toHaveLength(5);
    expect(chapter.tasks.filter((task) => task.phase === "Lange linjer")).toHaveLength(4);
    expect(chapter.tasks.filter((task) => task.phase === "Kildeblikk")).toHaveLength(4);
    for (const task of chapter.tasks) {
      expect(task.hint.length).toBeGreaterThan(10);
      expect(task.explanation.length).toBeGreaterThan(20);
      if (task.kind === "choice") {
        expect(task.options).toHaveLength(4);
        expect(task.correct).toBeGreaterThanOrEqual(0);
      }
      if (task.kind === "reflection") expect(task.modelResponse?.length).toBeGreaterThan(30);
    }
  });

  test("knytter hvert nytt fagavsnitt til minst én kjent kilde", () => {
    expect(chapter.narrative).toHaveLength(7);
    for (const section of chapter.narrative) {
      expect(section.paragraphs.length).toBeGreaterThan(0);
      for (const paragraph of section.paragraphs) {
        expect(typeof paragraph).toBe("object");
        if (typeof paragraph === "object") {
          expect(paragraph.text.length).toBeGreaterThan(40);
          expect(paragraph.sourceIds.length).toBeGreaterThan(0);
          for (const id of paragraph.sourceIds) expect(sourceIds.has(id)).toBe(true);
        }
      }
    }
  });

  test("har tre case, åtte påstander og seks verkstedsteg", async () => {
    const workshop = chapter.sourceWorkshops[0];
    expect(workshop.id).toBe("2-3-byer-kildeverksted");
    expect(workshop.chapterId).toBe(chapter.id);
    expect(workshop.materials).toHaveLength(3);
    expect(workshop.claims).toHaveLength(8);
    expect(new Set(workshop.claims.map((claim) => claim.id)).size).toBe(8);
    expect(new Set(workshop.claims.map((claim) => claim.classification))).toEqual(
      new Set(["direct", "possible", "too-strong", "cannot-determine"]),
    );
    for (const material of workshop.materials) {
      expect(material.sourceIds.length).toBeGreaterThan(0);
      expect(material.possibleObservations.length).toBeGreaterThanOrEqual(3);
      expect(material.supportedInterpretations.length).toBeGreaterThanOrEqual(2);
      expect(material.alternativeInterpretations.length).toBeGreaterThanOrEqual(2);
      expect(material.cannotProve.length).toBeGreaterThan(30);
      for (const id of material.sourceIds) expect(sourceIds.has(id)).toBe(true);
    }
    const html = renderToStaticMarkup(await ChapterPage({
      params: Promise.resolve({ section: chapter.sectionSlug, chapter: chapter.slug }),
    }));
    const navigationStart = html.indexOf('<ol class="source-workshop-steps"');
    const navigationEnd = html.indexOf("</ol>", navigationStart);
    const stepNavigation = html.slice(navigationStart, navigationEnd);
    expect((stepNavigation.match(/<button/g) ?? []).length).toBe(6);
    expect(html).toContain("Hva holder en by sammen?");
    expect(html).toContain("Mohenjo-daro");
    expect(html).toContain("Caral-Supe");
    expect(html).toContain("Mesopotamia");
  });

  test("renderes med riktig seksjonsrekkefølge og navigasjon", async () => {
    const html = renderToStaticMarkup(await ChapterPage({
      params: Promise.resolve({ section: chapter.sectionSlug, chapter: chapter.slug }),
    }));
    const domIds = [...html.matchAll(/<section class="article-section" id="([^"]+)"/g)].map((match) => match[1]);
    expect(domIds).toEqual([...chapterRenderedSectionOrder]);
    expect(html).toContain("Forrige: 2.2");
    expect(html).toContain("2-2-jordbruksrevolusjonen");
    expect(html).toContain("Ingen elevsvar sendes eksternt");
  });

  test("holder tidslinje og repetisjons-ID-er isolert mellom 2.2 og 2.3", () => {
    expect(timeline.every((point, index) => index === 0 || point.sortKey >= timeline[index - 1].sortKey)).toBe(true);
    const items = buildRepetitionItems(chapters);
    expect(new Set(items.map((item) => item.id)).size).toBe(items.length);
    expect(items.some((item) => item.id === "2.2:task:K1")).toBe(true);
    expect(items.some((item) => item.id === "2.3:task:K1")).toBe(true);
    expect(items.some((item) => item.id.startsWith("2.3:claim:2-3-byer-kildeverksted:"))).toBe(true);
  });
});
