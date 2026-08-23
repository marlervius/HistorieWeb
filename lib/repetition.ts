import type {
  Chapter,
  LearningTask,
  SourceWorkshopClaim,
  WorkshopClaimClassification,
} from "../content/chapters";
import { seededOrder } from "./seededOrder";

export const REPETITION_STORAGE_KEY = "historie-i-sammenheng:repetition:v1";
export const REPETITION_STORAGE_VERSION = 1 as const;

export type RepetitionItemKind = "fact" | "concept" | "task" | "claim";
export type ReviewResult = "again" | "hard" | "secure";
export type TaskAnswer = string | string[] | Record<string, string>;

type RepetitionItemBase = {
  id: string;
  chapterId: string;
  chapterTitle: string;
  progressVersion: number;
  kind: RepetitionItemKind;
  title: string;
  prompt: string;
};

export type RepetitionFact = RepetitionItemBase & {
  kind: "fact";
  answer: string;
  sourceIds: string[];
};

export type RepetitionConcept = RepetitionItemBase & {
  kind: "concept";
  term: string;
  answer: string;
};

export type RepetitionTask = RepetitionItemBase & {
  kind: "task";
  task: LearningTask;
  isSourceTask: boolean;
};

export type RepetitionClaim = RepetitionItemBase & {
  kind: "claim";
  workshopId: string;
  claim: SourceWorkshopClaim;
};

export type RepetitionItem = RepetitionFact | RepetitionConcept | RepetitionTask | RepetitionClaim;

export type RepetitionRecord = {
  step: number;
  nextDate: string;
  lastResult: ReviewResult;
  lastReviewedAt: string;
};

export type RepetitionChapterState = {
  progressVersion: number;
  items: Record<string, RepetitionRecord>;
};

export type RepetitionEnvelope = {
  version: typeof REPETITION_STORAGE_VERSION;
  chapters: Record<string, RepetitionChapterState>;
};

export type RepetitionStorageStatus = "empty" | "ready" | "migrated" | "recovered" | "reset";
export type RepetitionStorageRead = { envelope: RepetitionEnvelope; status: RepetitionStorageStatus };

const reviewResults: ReviewResult[] = ["again", "hard", "secure"];
const claimClassifications: WorkshopClaimClassification[] = ["direct", "possible", "too-strong", "cannot-determine"];
const secureIntervals = [0, 3, 14] as const;
const hardIntervals = [2, 3, 7] as const;

function emptyEnvelope(): RepetitionEnvelope {
  return { version: REPETITION_STORAGE_VERSION, chapters: {} };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stableKey(value: string) {
  const normalized = value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const readable = normalized.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "element";
  let hash = 2166136261;
  for (const character of value) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0;
  return `${readable}-${hash.toString(16)}`;
}

function itemId(chapterId: string, kind: RepetitionItemKind, value: string) {
  return `${chapterId}:${kind}:${stableKey(value)}`;
}

export function buildRepetitionItems(chapters: readonly Chapter[]): RepetitionItem[] {
  return chapters.flatMap((chapter) => {
    const facts: RepetitionFact[] = chapter.facts.map((fact) => ({
      id: itemId(chapter.id, "fact", fact.text),
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      progressVersion: chapter.progressVersion,
      kind: "fact",
      title: "Faktapunkt",
      prompt: "Hva husker du om dette faktapunktet?",
      answer: fact.text,
      sourceIds: [...fact.sourceIds],
    }));
    const concepts: RepetitionConcept[] = chapter.concepts.map((concept) => ({
      id: itemId(chapter.id, "concept", concept.term),
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      progressVersion: chapter.progressVersion,
      kind: "concept",
      title: concept.term,
      prompt: `Forklar begrepet «${concept.term}» med egne ord før du ser definisjonen.`,
      term: concept.term,
      answer: concept.definition,
    }));
    const tasks: RepetitionTask[] = chapter.tasks.map((task) => ({
      id: `${chapter.id}:task:${task.id}`,
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      progressVersion: chapter.progressVersion,
      kind: "task",
      title: task.title,
      prompt: task.prompt,
      task,
      isSourceTask: task.phase === "Kildeblikk",
    }));
    const claims: RepetitionClaim[] = chapter.sourceWorkshops.flatMap((workshop) => workshop.claims.map((claim) => ({
      id: `${chapter.id}:claim:${workshop.id}:${claim.id}`,
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      progressVersion: chapter.progressVersion,
      kind: "claim",
      title: "Kildepåstand",
      prompt: "Hvilken klassifisering passer best til påstanden?",
      workshopId: workshop.id,
      claim,
    })));
    return [...facts, ...concepts, ...tasks, ...claims];
  });
}

export function dateKey(value: Date | string): string | null {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null;
    return [value.getUTCFullYear(), String(value.getUTCMonth() + 1).padStart(2, "0"), String(value.getUTCDate()).padStart(2, "0")].join("-");
  }
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:$|T)/.exec(value);
  if (!match) return null;
  const candidate = new Date(`${match[1]}-${match[2]}-${match[3]}T00:00:00.000Z`);
  if (Number.isNaN(candidate.getTime())) return null;
  if (candidate.toISOString().slice(0, 10) !== `${match[1]}-${match[2]}-${match[3]}`) return null;
  return candidate.toISOString().slice(0, 10);
}

function addDays(value: string, days: number) {
  const parsed = dateKey(value);
  if (!parsed || !Number.isInteger(days)) return null;
  const date = new Date(`${parsed}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return dateKey(date);
}

export function reviewIntervalDays(step: number, result: ReviewResult) {
  const currentStep = Number.isInteger(step) ? Math.min(2, Math.max(0, step)) : 0;
  if (result === "again") return 0;
  if (result === "hard") return hardIntervals[currentStep];
  return secureIntervals[Math.min(2, currentStep + 1)];
}

export function recordReview(previous: RepetitionRecord | undefined, result: ReviewResult, reviewedOn: Date | string): RepetitionRecord | null {
  const reviewedDate = dateKey(reviewedOn);
  if (!reviewedDate) return null;
  const currentStep = previous && Number.isInteger(previous.step) ? Math.min(2, Math.max(0, previous.step)) : 0;
  const nextStep = result === "secure" ? Math.min(2, currentStep + 1) : result === "again" ? Math.max(0, currentStep - 1) : currentStep;
  const nextDate = addDays(reviewedDate, reviewIntervalDays(currentStep, result));
  if (!nextDate) return null;
  return { step: nextStep, nextDate, lastResult: result, lastReviewedAt: reviewedDate };
}

function isValidRecord(value: unknown): value is RepetitionRecord {
  return isRecord(value)
    && typeof value.step === "number"
    && Number.isInteger(value.step)
    && value.step >= 0
    && value.step <= 2
    && typeof value.nextDate === "string"
    && dateKey(value.nextDate) !== null
    && typeof value.lastReviewedAt === "string"
    && dateKey(value.lastReviewedAt) !== null
    && typeof value.lastResult === "string"
    && reviewResults.includes(value.lastResult as ReviewResult);
}

function normalizeChapterState(value: unknown) {
  if (!isRecord(value) || typeof value.progressVersion !== "number" || !Number.isInteger(value.progressVersion) || value.progressVersion < 1 || !isRecord(value.items)) return null;
  const items = Object.fromEntries(Object.entries(value.items).filter(([, record]) => isValidRecord(record))) as Record<string, RepetitionRecord>;
  return { progressVersion: value.progressVersion, items };
}

export function readRepetitionStorage(raw: string | null): RepetitionStorageRead {
  if (!raw) return { envelope: emptyEnvelope(), status: "empty" };
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { envelope: emptyEnvelope(), status: "reset" };
  }
  if (!isRecord(parsed) || typeof parsed.version !== "number") return { envelope: emptyEnvelope(), status: "reset" };
  if (parsed.version === 0 && isRecord(parsed.chapters)) {
    const chapters = Object.fromEntries(Object.entries(parsed.chapters).flatMap(([chapterId, value]) => {
      const normalized = normalizeChapterState(value);
      return normalized ? [[chapterId, normalized]] : [];
    }));
    return { envelope: { version: REPETITION_STORAGE_VERSION, chapters }, status: "migrated" };
  }
  if (parsed.version !== REPETITION_STORAGE_VERSION || !isRecord(parsed.chapters)) return { envelope: emptyEnvelope(), status: "reset" };
  const chapters = Object.fromEntries(Object.entries(parsed.chapters).flatMap(([chapterId, value]) => {
    const normalized = normalizeChapterState(value);
    return normalized ? [[chapterId, normalized]] : [];
  }));
  const recovered = Object.keys(chapters).length !== Object.keys(parsed.chapters).length;
  return { envelope: { version: REPETITION_STORAGE_VERSION, chapters }, status: recovered ? "recovered" : "ready" };
}

export function getRecordsForItems(envelope: RepetitionEnvelope, items: readonly RepetitionItem[]) {
  return Object.fromEntries(items.flatMap((item) => {
    const chapter = envelope.chapters[item.chapterId];
    if (!chapter || chapter.progressVersion !== item.progressVersion) return [];
    const record = chapter.items[item.id];
    return record && isValidRecord(record) ? [[item.id, record]] : [];
  })) as Record<string, RepetitionRecord>;
}

export function createRepetitionEnvelope(items: readonly RepetitionItem[], records: Record<string, RepetitionRecord>): RepetitionEnvelope {
  const chapters: Record<string, RepetitionChapterState> = {};
  for (const item of items) {
    chapters[item.chapterId] ??= { progressVersion: item.progressVersion, items: {} };
    if (chapters[item.chapterId].progressVersion !== item.progressVersion) continue;
    const record = records[item.id];
    if (record && isValidRecord(record)) chapters[item.chapterId].items[item.id] = record;
  }
  return { version: REPETITION_STORAGE_VERSION, chapters };
}

export function serializeRepetitionEnvelope(envelope: RepetitionEnvelope) {
  return JSON.stringify(envelope);
}

function dueDate(item: RepetitionItem, records: Record<string, RepetitionRecord>, today: string) {
  const record = records[item.id];
  if (!record || !dateKey(record.nextDate)) return today;
  return record.nextDate;
}

function stableBucketOrder(items: RepetitionItem[], seed: string, bucket: string) {
  const sorted = [...items].sort((first, second) => first.id.localeCompare(second.id));
  return seededOrder(`${seed}:${bucket}`, sorted.length).map((index) => sorted[index]);
}

function mixByKind(items: RepetitionItem[], seed: string) {
  const groups = new Map<RepetitionItemKind, RepetitionItem[]>();
  for (const item of items) groups.set(item.kind, [...(groups.get(item.kind) ?? []), item]);
  const kinds = [...groups.keys()].sort();
  const kindOrder = seededOrder(`${seed}:kinds`, kinds.length).map((index) => kinds[index]);
  const mixed: RepetitionItem[] = [];
  let remaining = true;
  while (remaining) {
    remaining = false;
    for (const kind of kindOrder) {
      const group = groups.get(kind);
      if (!group?.length) continue;
      mixed.push(group.shift()!);
      remaining = true;
    }
  }
  return mixed;
}

export function planSession(items: readonly RepetitionItem[], records: Record<string, RepetitionRecord>, options: { today: Date | string; seed: string; limit?: number }) {
  const today = dateKey(options.today);
  const limit = options.limit ?? 5;
  if (!today || !Number.isInteger(limit) || limit <= 0) return [];
  const uniqueItems = [...new Map(items.map((item) => [item.id, item])).values()];
  const dueItems = uniqueItems.filter((item) => dueDate(item, records, today) <= today);
  const buckets = new Map<string, RepetitionItem[]>();
  for (const item of dueItems) {
    const date = dueDate(item, records, today);
    buckets.set(date, [...(buckets.get(date) ?? []), item]);
  }
  const orderedDue = [...buckets.keys()].sort().flatMap((date) => mixByKind(stableBucketOrder(buckets.get(date) ?? [], options.seed, date), `${options.seed}:${date}`));
  return orderedDue.slice(0, limit);
}

export function isStringRecord(value: TaskAnswer): value is Record<string, string> {
  return typeof value === "object" && value !== null && !Array.isArray(value) && Object.values(value).every((item) => typeof item === "string");
}

export function blankTaskAnswer(task: LearningTask): TaskAnswer {
  if (task.kind === "order") return task.items?.map(() => "") ?? [];
  if (task.kind === "match" || task.kind === "sort") return Object.fromEntries((task.items ?? []).map((item) => [item, ""]));
  return "";
}

export function taskAnswerReady(task: LearningTask, answer: TaskAnswer) {
  if (task.kind === "choice") return typeof answer === "string" && answer.length > 0;
  if (task.kind === "order") return Array.isArray(answer) && answer.length === task.items?.length && answer.every(Boolean);
  if (task.kind === "match" || task.kind === "sort") return isStringRecord(answer) && (task.items ?? []).every((item) => Boolean(answer[item]));
  if (typeof answer !== "string") return false;
  const trimmed = answer.trim();
  return trimmed.length >= 40 && trimmed.split(/\s+/).length >= 8;
}

export function taskAnswerIssue(task: LearningTask, answer: TaskAnswer) {
  if (task.kind !== "reflection" || typeof answer !== "string" || answer.trim().length === 0 || taskAnswerReady(task, answer)) return null;
  return "Skriv minst 40 tegn og 8 ord i et eget, konkret svar før du sender inn.";
}

export function taskIsCorrect(task: LearningTask, answer: TaskAnswer) {
  if (task.kind === "choice") return answer === task.options?.[task.correct ?? -1];
  if (task.kind === "order") return Array.isArray(answer) && answer.length === task.expected?.length && answer.every((item, index) => item === task.expected?.[index]);
  if (task.kind === "match" || task.kind === "sort") return isStringRecord(answer) && Object.entries(task.answerMap ?? {}).every(([item, expected]) => answer[item] === expected);
  return false;
}

export function answerKey(answer: TaskAnswer) {
  return JSON.stringify(answer);
}

export function isClaimClassification(value: string): value is WorkshopClaimClassification {
  return claimClassifications.includes(value as WorkshopClaimClassification);
}
