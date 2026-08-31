import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import ChapterPage from "../app/laereverk/[section]/[chapter]/page";
import {
  SourceWorkshop,
  getSourceWorkshopStorageKey,
  hasSubstantiveSourceWorkshopRevision,
  meetsSourceWorkshopConclusionRequirement,
  sourceWorkshopWordCount,
  type SourceWorkshopState,
} from "../components/SourceWorkshop";
import {
  chapterRenderedSectionOrder,
  chapters,
  getContentModelIssues,
  historiskMetode,
  timeline,
} from "../content/chapters";
import { buildRepetitionItems } from "../lib/repetition";

const chapter = historiskMetode;
const workshop = chapter.sourceWorkshops[0];
const sourceIds = new Set(chapter.sources.map((source) => source.id));

function makeDraft() {
  const sentence = "Materialet viser et konkret spor, mens tolkningen må avgrenses med kontekst, representativitet, fravær og et presist forbehold.";
  return Array.from({ length: 16 }, () => sentence).join(" ");
}

describe("kapittel 1.1 · Hva kan vi vite om fortiden?", () => {
  test("har riktig identitet, progresjon og læreplankobling", () => {
    expect(chapter.id).toBe("1.1");
    expect(chapter.slug).toBe("1-1-hva-kan-vi-vite-om-fortiden");
    expect(chapter.sectionSlug).toBe("01-historiefaglig-grunnlag");
    expect(chapter.status).toBe("published");
    expect(chapter.competenceGoals).toEqual([
      "reflektere over hvordan fortiden former oss som mennesker",
      "utforske fortiden ved å stille spørsmål og innhente, tolke og bruke ulikt historisk materiale for å finne svar",
    ]);
    expect(chapter.learningGoals).toHaveLength(6);
    expect(chapter.concepts).toHaveLength(13);
    expect(getContentModelIssues()).toEqual([]);
  });

  test("har 16 stabile oppgaver i riktig progresjon uten fasitlekkasje", () => {
    expect(chapter.tasks.map((task) => task.id)).toEqual([
      "F1", "F2", "F3", "F4", "F5",
      "U1", "U2", "U3", "U4",
      "L1", "L2", "L3",
      "K1", "K2", "K3", "K4",
    ]);
    expect(chapter.tasks.map((task) => task.phase)).toEqual([
      "Fakta", "Fakta", "Fakta", "Fakta", "Fakta",
      "Forståelse", "Forståelse", "Forståelse", "Forståelse",
      "Lange linjer", "Lange linjer", "Lange linjer",
      "Kildeblikk", "Kildeblikk", "Kildeblikk", "Kildeblikk",
    ]);
    for (const task of chapter.tasks) {
      expect(task.hint.length).toBeGreaterThan(20);
      expect(task.explanation.length).toBeGreaterThan(30);
      if (task.kind === "order") expect(task.items).not.toEqual(task.expected);
      if (task.kind === "reflection") expect(task.modelResponse?.length).toBeGreaterThan(100);
    }
  });

  test("holder de fire materialpakkene, proveniensen og personvernet fra R1", () => {
    expect(workshop.materials.map((material) => material.id)).toEqual(["M-01", "W-01", "V-01", "Q-01"]);
    expect(workshop.materials.map((material) => material.materialType)).toEqual([
      "materielt/arkeologisk spor",
      "skriftlig dokument",
      "visuelt materiale",
      "kvantitativt materiale",
    ]);
    expect(workshop.materials.every((material) => material.media === undefined)).toBe(true);
    expect(workshop.materials.find((material) => material.id === "V-01")?.externalLink?.href).toBe("https://www.loc.gov/item/2017699966/");
    expect(workshop.materials.find((material) => material.id === "Q-01")?.documentedDescription).toContain("195 felt er blanke");
    expect(JSON.stringify(workshop.materials.find((material) => material.id === "Q-01"))).not.toMatch(/m_pseudoid\s*[:=]|fødselsår\s*[:=]|adresse(?:felt)?\s*[:=]|personnavn\s*[:=]/i);
    for (const material of workshop.materials) {
      expect(material.rights.checked).toMatch(/august 2026/);
      expect(material.rights.originalUrl).toMatch(/^https:\/\//);
      expect(material.cannotProve.length).toBeGreaterThan(60);
    }
  });

  test("håndhever seks trinn, balanserte påstander og sluttproduktet", () => {
    expect(workshop.claims).toHaveLength(8);
    const counts = Object.groupBy(workshop.claims, (claim) => claim.classification);
    expect(Object.fromEntries(Object.entries(counts).map(([key, values]) => [key, values?.length]))).toEqual({
      direct: 2,
      possible: 2,
      "too-strong": 2,
      "cannot-determine": 2,
    });
    expect(workshop.synthesisMinimumMaterials).toBe(3);
    expect(workshop.conclusionWordRange).toEqual({ min: 250, max: 400 });
    expect(workshop.requiresRevision).toBe(true);
    expect(workshop.rubric.join(" ")).toMatch(/representativitet.*fravær|fravær.*representativitet/i);
    expect(workshop.rubric.join(" ")).toMatch(/reell revisjon/i);
  });

  test("har komplett lærerpakke med tilpasning og seks vurderingsområder", () => {
    const guide = chapter.teacherGuide;
    expect(guide?.teachingPhases.length).toBeGreaterThanOrEqual(7);
    expect(guide?.misconceptions.length).toBeGreaterThanOrEqual(8);
    expect(guide?.assessmentCriteria.map((criterion) => criterion.area)).toEqual([
      "Faktakunnskap",
      "Historiske begreper",
      "Årsaker og virkninger",
      "Kildebruk",
      "Konkrete eksempler",
      "Nyansering og historisk usikkerhet",
    ]);
    expect(guide?.adaptation?.supports.length).toBeGreaterThanOrEqual(4);
    expect(guide?.adaptation?.extensions.length).toBeGreaterThanOrEqual(4);
    expect(guide?.sourceWorkshop.sourceIds).toEqual(["M-01", "W-01", "V-01", "Q-01"]);
  });

  test("renderes datadrevet med alle seksjoner, rettigheter og kapittelnavigasjon", async () => {
    const html = renderToStaticMarkup(await ChapterPage({
      params: Promise.resolve({ section: chapter.sectionSlug, chapter: chapter.slug }),
    }));
    const domIds = [...html.matchAll(/<section class="article-section" id="([^"]+)"/g)].map((match) => match[1]);
    expect(domIds).toEqual([...chapterRenderedSectionOrder]);
    expect(html).toContain("Fra materiale til begrunnet historisk svar");
    expect(html).toContain("Fire materialtyper belyser samme avgrensede Manzanar-spørsmål");
    expect(html).toContain("Dette kapitlet foregår innenfor en bestemt periode");
    expect(html).not.toContain("Hva kan vi vite om fortiden? foregår innenfor");
    expect(html).toContain("krav 250–400 ord");
    expect(html).not.toContain("mål..</span>");
    expect(html).toContain("Rettighet/proveniens");
    expect(html).toContain("Neste: 2.2");
    expect(html).not.toContain("Forhistoriske samfunn etterlot seg ikke tekster");
  });

  test("holder tidslinje og repetisjons-ID-er sortert og kapittelisolert", () => {
    expect(timeline.every((point, index) => index === 0 || point.sortKey >= timeline[index - 1].sortKey)).toBe(true);
    const items = buildRepetitionItems(chapters);
    expect(new Set(items.map((item) => item.id)).size).toBe(items.length);
    expect(items.some((item) => item.id === "1.1:task:K1")).toBe(true);
    expect(items.some((item) => item.id === "2.2:task:K1")).toBe(true);
    expect(items.some((item) => item.id.startsWith("1.1:claim:1-1-manzanar-kildeverksted:"))).toBe(true);
  });

  test("har sporbare kildekoblinger og HTTPS-referanser", () => {
    for (const source of chapter.sources) {
      expect(source.href).toMatch(/^https:\/\//);
      expect(source.rights.length).toBeGreaterThan(30);
    }
    for (const fact of chapter.facts) for (const id of fact.sourceIds) expect(sourceIds.has(id)).toBe(true);
    for (const section of chapter.narrative) {
      for (const paragraph of section.paragraphs) {
        expect(typeof paragraph).toBe("object");
        if (typeof paragraph === "object") for (const id of paragraph.sourceIds) expect(sourceIds.has(id)).toBe(true);
      }
    }
  });
});

describe("1.1-verkstedets ordkrav og reelle revisjon", () => {
  test("teller ord og skiller kosmetisk fra faglig revisjon", () => {
    const draft = makeDraft();
    expect(sourceWorkshopWordCount(draft)).toBeGreaterThanOrEqual(250);
    expect(sourceWorkshopWordCount(draft)).toBeLessThanOrEqual(400);
    expect(meetsSourceWorkshopConclusionRequirement(draft, { min: 250, max: 400 })).toBe(true);
    expect(meetsSourceWorkshopConclusionRequirement("for kort", { min: 250, max: 400 })).toBe(false);
    expect(hasSubstantiveSourceWorkshopRevision(draft, draft + " ")).toBe(false);
    expect(hasSubstantiveSourceWorkshopRevision(draft, "Revidert faglig påstand " + draft)).toBe(true);
  });

  test("nekter uendret tekst og fullfører først etter lagret revisjon", async () => {
    const draft = makeDraft();
    const storageKey = getSourceWorkshopStorageKey(chapter.id, workshop.id, workshop.progressVersion);
    const state: SourceWorkshopState = {
      observations: "Konkrete observasjoner fra fire materialer er registrert og skilt fra tolkning.",
      claims: {},
      claimsAttempts: 2,
      claimsFeedback: "model",
      synthesisEvidence: ["M-01-0", "W-01-0", "V-01-0"],
      synthesis: "Tre materialtyper belyser ulike deler av spørsmålet, men de er ikke en komplett tidsserie og kan ikke representere alle.",
      synthesisSubmitted: true,
      conclusion: draft,
      conclusionAttempts: 1,
      conclusionSubmitted: true,
      lastSubmittedConclusion: draft,
      initialConclusion: draft,
      revisionSubmitted: false,
    };
    window.localStorage.setItem(storageKey, JSON.stringify({ version: workshop.progressVersion, state }));

    const user = userEvent.setup();
    render(<SourceWorkshop chapterId={chapter.id} workshop={workshop} />);
    await waitFor(() => expect(screen.getByRole("heading", { name: "Sammenlign, behold din stemme og revider" })).toBeInTheDocument());
    const revision = screen.getByRole("textbox", { name: "Revider svaret ditt" });
    expect(revision).toHaveValue(draft);

    await user.click(screen.getByRole("button", { name: "Lagre revisjon" }));
    expect(screen.getByText(/Gjør en reell revisjon/)).toBeInTheDocument();
    await waitFor(() => expect(JSON.parse(window.localStorage.getItem(storageKey)!)).toMatchObject({
      state: { conclusionAttempts: 1, revisionSubmitted: false },
    }));

    const revised = `${draft} Dette forbeholdet avgrenser påstanden til de fire materialvinduene.`;
    fireEvent.change(revision, { target: { value: revised } });
    await user.click(screen.getByRole("button", { name: "Lagre revisjon" }));
    await waitFor(() => expect(JSON.parse(window.localStorage.getItem(storageKey)!)).toMatchObject({
      state: { conclusionAttempts: 2, revisionSubmitted: true, lastSubmittedConclusion: revised },
    }));
    expect(screen.getByText(/Du har gjennomført kildeverkstedet/)).toBeInTheDocument();
  });
});