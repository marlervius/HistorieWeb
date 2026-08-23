import { describe, expect, test } from "vitest";
import type { Chapter } from "../content/chapters";
import { jordbruksrevolusjonen } from "../content/chapters";
import {
  buildRepetitionItems,
  createRepetitionEnvelope,
  dateKey,
  getRecordsForItems,
  planSession,
  readRepetitionStorage,
  recordReview,
  reviewIntervalDays,
  serializeRepetitionEnvelope,
} from "../lib/repetition";

function syntheticChapter(id: string): Chapter {
  return {
    id,
    number: id,
    title: `Syntetisk ${id}`,
    progressVersion: 1,
    facts: [{ text: `Et stabilt faktapunkt for ${id}.`, sourceIds: ["source"] }],
    concepts: [{ term: `Begrep ${id}`, definition: `En kvalitetssikret definisjon for ${id}.` }],
    tasks: [],
    sourceWorkshops: [],
    status: "published",
  } as unknown as Chapter;
}

describe("repetisjonsmodellen", () => {
  test("avleder stabile fakta-, begreps-, oppgave- og kildeelementer", () => {
    const items = buildRepetitionItems([jordbruksrevolusjonen]);
    expect(items.some((item) => item.id.startsWith("2.2:fact:"))).toBe(true);
    expect(items.some((item) => item.id.startsWith("2.2:concept:"))).toBe(true);
    expect(items.some((item) => item.id === "2.2:task:K1" && item.kind === "task" && item.isSourceTask)).toBe(true);
    expect(items.some((item) => item.id.startsWith("2.2:claim:2-2-jordbruk-kildeverksted:") && item.kind === "claim")).toBe(true);
    expect(new Set(items.map((item) => item.id)).size).toBe(items.length);
  });

  test("tar inn syntetiske kapitler uten navigasjonsendringer", () => {
    const first = buildRepetitionItems([syntheticChapter("2.2")]);
    const twoChapters = buildRepetitionItems([syntheticChapter("2.2"), syntheticChapter("2.3")]);
    expect(twoChapters.length).toBe(first.length * 2);
    expect(twoChapters.some((item) => item.chapterId === "2.3" && item.id.startsWith("2.3:concept:"))).toBe(true);
    expect(planSession(twoChapters, {}, { today: "2026-08-23", seed: "same", limit: 5 }).every((item) => item.chapterId === "2.2" || item.chapterId === "2.3")).toBe(true);
  });

  test("gir deterministisk kø med forfalte elementer først og uten duplikater", () => {
    const items = buildRepetitionItems([syntheticChapter("2.2"), syntheticChapter("2.3")]);
    const overdue = recordReview(undefined, "hard", "2026-08-20")!;
    const future = recordReview(undefined, "secure", "2026-08-23")!;
    const records = { [items[0].id]: overdue, [items[1].id]: future };
    const first = planSession(items, records, { today: "2026-08-23", seed: "seed", limit: 5 });
    const second = planSession(items, records, { today: "2026-08-23", seed: "seed", limit: 5 });
    expect(first.map((item) => item.id)).toEqual(second.map((item) => item.id));
    expect(first[0]?.id).toBe(items[0].id);
    expect(new Set(first.map((item) => item.id)).size).toBe(first.length);
    expect(planSession(items, records, { today: "2026-08-27", seed: "seed", limit: 5 }).map((item) => item.id)).toContain(items[1].id);
  });

  test("flytter neste dato tidligere ved usikkerhet og framover ved sikkert svar", () => {
    expect(reviewIntervalDays(0, "again")).toBe(0);
    expect(reviewIntervalDays(0, "hard")).toBe(2);
    expect(reviewIntervalDays(1, "secure")).toBe(14);
    expect(recordReview(undefined, "again", "2026-08-23")?.nextDate).toBe("2026-08-23");
    expect(recordReview(undefined, "hard", "2026-08-23")?.nextDate).toBe("2026-08-25");
    expect(recordReview({ step: 1, nextDate: "2026-08-23", lastResult: "hard", lastReviewedAt: "2026-08-20" }, "secure", "2026-08-23")?.nextDate).toBe("2026-09-06");
    expect(recordReview(undefined, "secure", "ugyldig dato")).toBeNull();
  });

  test("holder datoer i UTC og tåler ugyldige datoer", () => {
    expect(dateKey("2026-08-23T23:00:00.000Z")).toBe("2026-08-23");
    expect(dateKey("2026-02-30")).toBeNull();
    expect(planSession([], {}, { today: "ikke-en-dato", seed: "seed" })).toEqual([]);
  });
});

describe("versjonert repetisjonslagring", () => {
  test("skriver og leser kapittelbevisst envelope", () => {
    const items = buildRepetitionItems([syntheticChapter("2.2"), syntheticChapter("2.3")]);
    const record = recordReview(undefined, "secure", "2026-08-23")!;
    const envelope = createRepetitionEnvelope(items, { [items[0].id]: record });
    const parsed = readRepetitionStorage(serializeRepetitionEnvelope(envelope));
    expect(parsed.status).toBe("ready");
    expect(Object.keys(getRecordsForItems(parsed.envelope, items))).toEqual([items[0].id]);
    expect(parsed.envelope.chapters["2.3"].progressVersion).toBe(1);
  });

  test("migrerer trygg gammel envelope, men forkaster ukjent versjon og korrupte elementer", () => {
    const items = buildRepetitionItems([syntheticChapter("2.2")]);
    const record = recordReview(undefined, "hard", "2026-08-23")!;
    const legacy = JSON.stringify({ version: 0, chapters: { "2.2": { progressVersion: 1, items: { [items[0].id]: record } } } });
    expect(readRepetitionStorage(legacy).status).toBe("migrated");
    expect(readRepetitionStorage(JSON.stringify({ version: 999, chapters: {} })).status).toBe("reset");
    const corrupt = JSON.stringify({ version: 1, chapters: { "2.2": { progressVersion: 1, items: { ok: record, bad: { nextDate: "nei" } } }, broken: "nei" } });
    const recovered = readRepetitionStorage(corrupt);
    expect(recovered.status).toBe("recovered");
    expect(Object.keys(recovered.envelope.chapters["2.2"].items)).toEqual(["ok"]);
    expect(readRepetitionStorage("ikke json").status).toBe("reset");
  });
});
