"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { classificationLabels } from "./SourceWorkshop";
import type { WorkshopClaimClassification } from "../content/chapters";
import {
  answerKey,
  blankTaskAnswer,
  createRepetitionEnvelope,
  dateKey,
  getRecordsForItems,
  isClaimClassification,
  isStringRecord,
  planSession,
  readRepetitionStorage,
  recordReview,
  REPETITION_STORAGE_KEY,
  serializeRepetitionEnvelope,
  taskAnswerIssue,
  taskAnswerReady,
  taskIsCorrect,
  type RepetitionClaim,
  type RepetitionConcept,
  type RepetitionFact,
  type RepetitionItem,
  type RepetitionRecord,
  type RepetitionTask,
  type ReviewResult,
  type TaskAnswer,
} from "../lib/repetition";
import { seededOrder } from "../lib/seededOrder";

type Interaction = {
  answer: TaskAnswer;
  attempts: number;
  feedback: "idle" | "hint" | "correct" | "model";
  revealed: boolean;
  lastSubmittedAnswer?: string;
};

type ChapterLink = { id: string; title: string; href: string };

const resultLabels: Record<ReviewResult, string> = {
  again: "Prøv igjen snart",
  hard: "Litt usikker",
  secure: "Jeg fikk det fram",
};

function blankInteraction(item: RepetitionItem): Interaction {
  return { answer: item.kind === "task" ? blankTaskAnswer(item.task) : "", attempts: 0, feedback: "idle", revealed: false };
}

function itemLabel(item: RepetitionItem) {
  if (item.kind === "fact") return "Fakta";
  if (item.kind === "concept") return "Begrep";
  if (item.kind === "claim") return "Kildepåstand";
  return item.isSourceTask ? "Kildeoppgave" : "Oppgave";
}

export function RepetitionPractice({ items, chapterLinks }: { items: RepetitionItem[]; chapterLinks: ChapterLink[] }) {
  const itemById = useMemo(() => new Map(items.map((item) => [item.id, item])), [items]);
  const [records, setRecords] = useState<Record<string, RepetitionRecord>>({});
  const [interactions, setInteractions] = useState<Record<string, Interaction>>({});
  const [sessionIds, setSessionIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [todayKey, setTodayKey] = useState("");
  const [sessionNumber, setSessionNumber] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [storageStatus, setStorageStatus] = useState<"loading" | "ready" | "unavailable" | "recovered">("loading");
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const currentDate = dateKey(new Date()) ?? "1970-01-01";
      let storedRecords: Record<string, RepetitionRecord> = {};
      let status: "ready" | "unavailable" | "recovered" = "ready";
      try {
        const parsed = readRepetitionStorage(window.localStorage.getItem(REPETITION_STORAGE_KEY));
        storedRecords = getRecordsForItems(parsed.envelope, items);
        status = parsed.status === "recovered" || parsed.status === "migrated" || parsed.status === "reset" ? "recovered" : "ready";
        if (parsed.status === "migrated" || parsed.status === "recovered") {
          window.localStorage.setItem(REPETITION_STORAGE_KEY, serializeRepetitionEnvelope(createRepetitionEnvelope(items, storedRecords)));
        }
        if (parsed.status === "reset") window.localStorage.removeItem(REPETITION_STORAGE_KEY);
      } catch {
        status = "unavailable";
      }
      setRecords(storedRecords);
      setTodayKey(currentDate);
      setSessionIds(planSession(items, storedRecords, { today: currentDate, seed: `${currentDate}:0`, limit: 5 }).map((item) => item.id));
      setHasStarted(Object.keys(storedRecords).length > 0);
      setStorageStatus(status);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [items]);

  useEffect(() => {
    if (storageStatus !== "ready" && storageStatus !== "recovered") return;
    try {
      if (Object.keys(records).length === 0) window.localStorage.removeItem(REPETITION_STORAGE_KEY);
      else window.localStorage.setItem(REPETITION_STORAGE_KEY, serializeRepetitionEnvelope(createRepetitionEnvelope(items, records)));
    } catch {
      const timer = window.setTimeout(() => setStorageStatus("unavailable"), 0);
      return () => window.clearTimeout(timer);
    }
  }, [items, records, storageStatus]);

  const sessionItems = sessionIds.map((id) => itemById.get(id)).filter((item): item is RepetitionItem => Boolean(item));
  const activeItem = sessionItems[currentIndex];
  const activeInteraction = activeItem ? interactions[activeItem.id] ?? blankInteraction(activeItem) : undefined;
  const sessionSeed = `${todayKey}:${sessionNumber}`;

  function updateInteraction(item: RepetitionItem, next: Partial<Interaction>) {
    setInteractions((current) => ({
      ...current,
      [item.id]: { ...(current[item.id] ?? blankInteraction(item)), ...next },
    }));
  }

  function submitFact(item: RepetitionFact) {
    updateInteraction(item, { revealed: true });
    setAnnouncement("Det kvalitetssikrede faktapunktet er synlig. Vurder hvor sikkert du hentet det fram.");
  }

  function submitConcept(item: RepetitionConcept) {
    const interaction = interactions[item.id] ?? blankInteraction(item);
    if (typeof interaction.answer !== "string" || interaction.answer.trim().length < 20) return;
    updateInteraction(item, { revealed: true });
    setAnnouncement("Definisjonen er synlig. Vurder hvor sikkert du kunne forklare begrepet.");
  }

  function submitClaim(item: RepetitionClaim) {
    const interaction = interactions[item.id] ?? blankInteraction(item);
    if (typeof interaction.answer !== "string" || !isClaimClassification(interaction.answer)) return;
    if (interaction.lastSubmittedAnswer === answerKey(interaction.answer) && interaction.feedback !== "idle") return;
    const correct = interaction.answer === item.claim.classification;
    const attempts = interaction.attempts + 1;
    updateInteraction(item, {
      attempts,
      feedback: correct ? "correct" : attempts === 1 ? "hint" : "model",
      lastSubmittedAnswer: answerKey(interaction.answer),
    });
    setAnnouncement(correct ? "Klassifiseringen er registrert." : "Responsen er oppdatert. Du kan prøve på nytt før du går videre.");
  }

  function submitTask(item: RepetitionTask) {
    const interaction = interactions[item.id] ?? blankInteraction(item);
    if (!taskAnswerReady(item.task, interaction.answer)) return;
    const submitted = answerKey(interaction.answer);
    if (interaction.lastSubmittedAnswer === submitted && interaction.feedback !== "idle") return;
    const attempts = interaction.attempts + 1;
    if (item.task.kind === "reflection") {
      updateInteraction(item, { attempts, feedback: "model", revealed: true, lastSubmittedAnswer: submitted });
      setAnnouncement("Modellresponsen er synlig. Sammenlign den med ditt eget svar.");
      return;
    }
    const correct = taskIsCorrect(item.task, interaction.answer);
    updateInteraction(item, {
      attempts,
      feedback: correct ? "correct" : attempts === 1 ? "hint" : "model",
      revealed: false,
      lastSubmittedAnswer: submitted,
    });
    setAnnouncement(correct ? "Svarresponsen er oppdatert." : "Et hint eller en forklaring er oppdatert. Du kan prøve på nytt.");
  }

  function startFirstSession() {
    if (!todayKey) return;
    setHasStarted(true);
    setSessionIds(planSession(items, records, { today: todayKey, seed: `${todayKey}:0`, limit: 5 }).map((item) => item.id));
    setAnnouncement("Første korte gjenhentingsøkt er klar.");
  }

  function startNewSession() {
    if (!todayKey) return;
    const nextNumber = sessionNumber + 1;
    setSessionNumber(nextNumber);
    setCurrentIndex(0);
    setReviewedCount(0);
    setInteractions({});
    setSessionIds(planSession(items, records, { today: todayKey, seed: `${todayKey}:${nextNumber}`, limit: 5 }).map((item) => item.id));
    setAnnouncement("En ny kort økt er klar.");
  }

  function reviewActive(result: ReviewResult) {
    if (!activeItem || !todayKey) return;
    const nextRecord = recordReview(records[activeItem.id], result, todayKey);
    if (!nextRecord) return;
    setRecords((current) => ({ ...current, [activeItem.id]: nextRecord }));
    const nextIndex = currentIndex + 1;
    setReviewedCount((count) => count + 1);
    setCurrentIndex(nextIndex);
    setAnnouncement(nextIndex < sessionItems.length ? `Neste element: ${sessionItems[nextIndex].title}.` : "Økten er fullført.");
  }

  function clearRepetitionData() {
    try {
      window.localStorage.removeItem(REPETITION_STORAGE_KEY);
    } catch {
      setStorageStatus("unavailable");
    }
    setRecords({});
    setInteractions({});
    setSessionNumber(0);
    setCurrentIndex(0);
    setReviewedCount(0);
    setHasStarted(false);
    setSessionIds([]);
    setAnnouncement("Repetisjonsdata er slettet fra denne nettleseren.");
  }

  if (storageStatus === "loading") return <section className="repetition-panel" aria-labelledby="repetition-session-title"><h2 id="repetition-session-title">En kort økt</h2><p role="status" aria-live="polite">Laster lokal repetisjon …</p></section>;

  if (items.length === 0) return <section className="repetition-panel" aria-labelledby="repetition-session-title"><h2 id="repetition-session-title">En kort økt</h2><div className="empty-state"><h3>Ingen kapitler er klare ennå</h3><p>Repetisjon starter når et kvalitetssikret kapittel er publisert.</p></div></section>;

  if (!hasStarted && Object.keys(records).length === 0) return <section className="repetition-panel" aria-labelledby="repetition-session-title">
    <div className="section-heading compact"><span className="eyebrow">Første gang her?</span><h2 id="repetition-session-title">Start med et tilgjengelig kapittel</h2></div>
    <div className="empty-state"><p>Repetisjon skal hente fram noe du allerede har møtt. Åpne et av kapitlene først, og start deretter en kort gjenhentingsøkt.</p><ul className="resource-list">{chapterLinks.map((chapter) => <li key={chapter.id}><Link href={chapter.href}><strong>{chapter.title}</strong><span>Åpne det kvalitetssikrede kapitlet</span></Link></li>)}</ul><button className="button button-small" type="button" onClick={startFirstSession}>Jeg har vært innom kapitlet – start første økt</button></div>
    <p className="repetition-status" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
  </section>;

  if (!activeItem) return <section className="repetition-panel" aria-labelledby="repetition-session-title">
    <div className="section-heading compact"><span className="eyebrow">Ferdig for nå</span><h2 id="repetition-session-title">Økten er fullført</h2></div>
    <p className="repetition-complete">Du hentet fram {reviewedCount} av {sessionItems.length} elementer. Planen foreslår neste tidspunkt ut fra den lokale egenvurderingen din.</p>
    <div className="button-row"><button className="button button-small" type="button" onClick={startNewSession}>Start en ny kort økt</button><Link className="button button-secondary button-small" href={chapterLinks[0]?.href ?? "/laereverk"}>Gå til kapitlet</Link></div>
  </section>;

  return <section className="repetition-panel" aria-labelledby="repetition-session-title">
    <div className="repetition-progress"><div><span className="eyebrow">Kort økt · uten poeng</span><h2 id="repetition-session-title">Hent fram før du ser etter</h2></div><span>{currentIndex + 1} av {sessionItems.length}</span></div>
    <p className="repetition-chapter"><strong>Fra kapittel:</strong> {activeItem.chapterTitle}</p>
    <RepetitionCard item={activeItem} interaction={activeInteraction!} sessionSeed={sessionSeed} updateInteraction={updateInteraction} submitFact={submitFact} submitConcept={submitConcept} submitClaim={submitClaim} submitTask={submitTask} onReview={reviewActive} />
    <p className="repetition-status" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
    <div className="repetition-footer"><p>{storageStatus === "unavailable" ? "Lagring er ikke tilgjengelig, men økten virker fortsatt." : "Framdriften lagres bare lokalt i denne nettleseren. Svar og egenvurderinger sendes ikke noe sted."}</p><button className="button button-quiet button-small" type="button" onClick={clearRepetitionData}>Slett repetisjonsdata</button></div>
  </section>;
}

function RepetitionCard({ item, interaction, sessionSeed, updateInteraction, submitFact, submitConcept, submitClaim, submitTask, onReview }: {
  item: RepetitionItem;
  interaction: Interaction;
  sessionSeed: string;
  updateInteraction: (item: RepetitionItem, next: Partial<Interaction>) => void;
  submitFact: (item: RepetitionFact) => void;
  submitConcept: (item: RepetitionConcept) => void;
  submitClaim: (item: RepetitionClaim) => void;
  submitTask: (item: RepetitionTask) => void;
  onReview: (result: ReviewResult) => void;
}) {
  const readyForReview = item.kind === "fact" ? interaction.revealed : interaction.feedback !== "idle" || interaction.revealed;
  return <article className="repetition-card" aria-labelledby={`repetition-${item.id}`}>
    <span className="eyebrow">{itemLabel(item)} · {item.chapterTitle}</span>
    <h3 id={`repetition-${item.id}`}>{item.title}</h3>
    {item.kind === "fact" && <FactView item={item} revealed={interaction.revealed} onReveal={() => submitFact(item)} />}
    {item.kind === "concept" && <ConceptView item={item} interaction={interaction} onAnswer={(answer) => updateInteraction(item, { answer, feedback: "idle", revealed: false })} onReveal={() => submitConcept(item)} />}
    {item.kind === "claim" && <ClaimView item={item} interaction={interaction} onAnswer={(answer) => updateInteraction(item, { answer, feedback: "idle", lastSubmittedAnswer: undefined })} onSubmit={() => submitClaim(item)} />}
    {item.kind === "task" && <TaskView item={item} interaction={interaction} sessionSeed={sessionSeed} onAnswer={(answer) => updateInteraction(item, { answer, feedback: "idle", revealed: false })} onSubmit={() => submitTask(item)} />}
    {item.kind === "claim" && interaction.feedback !== "idle" && <Feedback item={item} interaction={interaction} />}
    {item.kind === "task" && interaction.feedback !== "idle" && <Feedback item={item} interaction={interaction} />}
    {readyForReview && <ReviewControls onReview={onReview} />}
  </article>;
}

function FactView({ item, revealed, onReveal }: { item: RepetitionFact; revealed: boolean; onReveal: () => void }) {
  return <div className="repetition-prompt"><p>{item.prompt}</p>{revealed ? <div className="repetition-answer"><strong>Kvalitetssikret faktapunkt</strong><p>{item.answer}</p></div> : <button className="button button-small" type="button" onClick={onReveal}>Vis faktapunktet</button>}</div>;
}

function ConceptView({ item, interaction, onAnswer, onReveal }: { item: RepetitionConcept; interaction: Interaction; onAnswer: (answer: string) => void; onReveal: () => void }) {
  const answer = typeof interaction.answer === "string" ? interaction.answer : "";
  return <div className="repetition-prompt"><p>{item.prompt}</p><label className="repetition-label" htmlFor={`repetition-answer-${item.id}`}>Ditt forsøk</label><textarea id={`repetition-answer-${item.id}`} value={answer} onChange={(event) => onAnswer(event.target.value)} placeholder="Skriv med egne ord …" rows={4} />{!interaction.revealed && answer.trim().length > 0 && answer.trim().length < 20 && <p className="field-note" role="status">Skriv litt mer før definisjonen vises.</p>}{interaction.revealed ? <div className="repetition-answer"><strong>Kvalitetssikret definisjon</strong><p>{item.answer}</p></div> : <button className="button button-small" type="button" onClick={onReveal} disabled={answer.trim().length < 20}>Vis definisjonen</button>}</div>;
}

function ClaimView({ item, interaction, onAnswer, onSubmit }: { item: RepetitionClaim; interaction: Interaction; onAnswer: (answer: string) => void; onSubmit: () => void }) {
  const answer = typeof interaction.answer === "string" ? interaction.answer : "";
  const options = Object.entries(classificationLabels) as [WorkshopClaimClassification, string][];
  const order = seededOrder(`${item.id}:claim`, options.length).map((index) => options[index]);
  return <div className="repetition-prompt"><p>{item.prompt}</p><blockquote className="repetition-claim">{item.claim.text}</blockquote><fieldset className="choice-list"><legend className="sr-only">Klassifisering av kildepåstanden</legend>{order.map(([value, label]) => <label className="choice-option" key={value}><input type="radio" name={`claim-${item.id}`} value={value} checked={answer === value} onChange={(event) => onAnswer(event.target.value)} /><span aria-hidden="true">{value === "direct" ? "A" : value === "possible" ? "B" : value === "too-strong" ? "C" : "D"}</span>{label}</label>)}</fieldset><button className="button button-small" type="button" onClick={onSubmit} disabled={!isClaimClassification(answer)}>Sjekk klassifisering</button></div>;
}

function TaskView({ item, interaction, sessionSeed, onAnswer, onSubmit }: { item: RepetitionTask; interaction: Interaction; sessionSeed: string; onAnswer: (answer: TaskAnswer) => void; onSubmit: () => void }) {
  const task = item.task;
  const answer = interaction.answer;
  const optionOrder = task.options ? seededOrder(`${item.id}:${sessionSeed}`, task.options.length) : [];
  const itemOrder = task.items ? seededOrder(`${item.id}:${sessionSeed}:items`, task.items.length) : [];
  const choiceOrder = task.choices ? seededOrder(`${item.id}:${sessionSeed}:choices`, task.choices.length) : [];
  const issue = taskAnswerIssue(task, answer);
  return <div className="repetition-prompt"><p>{task.prompt}</p>{task.kind === "choice" && <fieldset className="choice-list"><legend className="sr-only">Svaralternativer til {task.title}</legend>{optionOrder.map((index, displayIndex) => { const option = task.options![index]; return <label className="choice-option" key={option}><input type="radio" name={`task-${item.id}`} value={option} checked={answer === option} onChange={(event) => onAnswer(event.target.value)} /><span aria-hidden="true">{String.fromCharCode(65 + displayIndex)}</span>{option}</label>; })}</fieldset>}{task.kind === "order" && <div className="select-list">{(task.items ?? []).map((entry, index) => <label key={entry}><span>{index + 1}. plass</span><select value={Array.isArray(answer) ? answer[index] ?? "" : ""} onChange={(event) => { const next = Array.isArray(answer) ? [...answer] : task.items?.map(() => "") ?? []; next[index] = event.target.value; onAnswer(next); }}><option value="">Velg ledd</option>{itemOrder.map((choiceIndex) => { const choice = task.items![choiceIndex]; return <option key={choice} value={choice} disabled={Array.isArray(answer) && answer.includes(choice) && answer[index] !== choice}>{choice}</option>; })}</select></label>)}</div>}{(task.kind === "match" || task.kind === "sort") && <div className="select-list">{(task.items ?? []).map((entry) => <label key={entry}><span>{entry}</span><select value={isStringRecord(answer) ? answer[entry] ?? "" : ""} onChange={(event) => { const next = isStringRecord(answer) ? { ...answer, [entry]: event.target.value } : { [entry]: event.target.value }; onAnswer(next); }}><option value="">Velg</option>{choiceOrder.map((choiceIndex) => <option key={task.choices![choiceIndex]} value={task.choices![choiceIndex]}>{task.choices![choiceIndex]}</option>)}</select></label>)}</div>}{task.kind === "reflection" && <><label className="repetition-label" htmlFor={`repetition-answer-${item.id}`}>Ditt eget svar</label><textarea id={`repetition-answer-${item.id}`} value={typeof answer === "string" ? answer : ""} onChange={(event) => onAnswer(event.target.value)} rows={6} placeholder="Skriv svaret ditt her …" />{issue && <p className="field-note" role="status">{issue}</p>}</>}<button className="button button-small" type="button" onClick={onSubmit} disabled={!taskAnswerReady(task, answer)}>{task.kind === "reflection" && interaction.feedback === "model" ? "Oppdater modellrespons" : "Sjekk svar"}</button></div>;
}

function Feedback({ item, interaction }: { item: RepetitionTask | RepetitionClaim; interaction: Interaction }) {
  const text = item.kind === "claim" ? item.claim.explanation : item.task.modelResponse ?? item.task.explanation;
  return <p className={`repetition-feedback ${interaction.feedback === "correct" ? "success" : ""}`} role="status" aria-live="polite">{interaction.feedback === "hint" && <><strong>Lite hint:</strong> Se etter en påstand eller kobling som ikke går lenger enn materialet tillater.</>}{interaction.feedback === "correct" && <><strong>Riktig svar.</strong> {text}</>}{interaction.feedback === "model" && <><strong>{item.kind === "claim" ? "Forklaring:" : item.task.kind === "reflection" ? "Modellrespons:" : "Forklaring:"}</strong> {text}</>}</p>;
}

function ReviewControls({ onReview }: { onReview: (result: ReviewResult) => void }) {
  return <div className="repetition-review" role="group" aria-label="Egenvurdering av repetisjon"><p><strong>Hvordan gikk det?</strong> Dette er din egenvurdering, ikke automatisk karaktersetting.</p><div className="button-row"><button className="button button-quiet button-small" type="button" onClick={() => onReview("again")}>{resultLabels.again}</button><button className="button button-secondary button-small" type="button" onClick={() => onReview("hard")}>{resultLabels.hard}</button><button className="button button-small" type="button" onClick={() => onReview("secure")}>{resultLabels.secure}</button></div></div>;
}
