"use client";

import { useEffect, useMemo, useState } from "react";
import type { LearningTask, Phase } from "../content/chapters";
import { seededOrder } from "./seededOrder";

export { seededOrder } from "./seededOrder";

type TaskState = {
  answer: string | string[] | Record<string, string>;
  attempts: number;
  completed: boolean;
  feedback: "idle" | "hint" | "correct" | "model";
  lastCompletedAt?: string;
  lastSubmittedAnswer?: string;
};

type StorageStatus = "loading" | "ready" | "unavailable";

const phaseLabels: { phase: Phase; id: string }[] = [
  { phase: "Fakta", id: "fakta" },
  { phase: "Forståelse", id: "forstaelse" },
  { phase: "Lange linjer", id: "lange-linjer" },
  { phase: "Kildeblikk", id: "kildeblikk" },
];

function blankAnswer(task: LearningTask): TaskState["answer"] {
  if (task.kind === "order") return task.items?.map(() => "") ?? [];
  if (task.kind === "match" || task.kind === "sort") {
    return Object.fromEntries((task.items ?? []).map((item) => [item, ""]));
  }
  return "";
}

function blankState(task: LearningTask): TaskState {
  return { answer: blankAnswer(task), attempts: 0, completed: false, feedback: "idle" };
}

function answerKey(answer: TaskState["answer"]) {
  return JSON.stringify(answer);
}

function formatCompletedAt(value: string) {
  return new Intl.DateTimeFormat("nb-NO", { day: "numeric", month: "short" }).format(new Date(value));
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    && Object.values(value).every((item) => typeof item === "string");
}

function isTaskState(value: unknown): value is TaskState {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const candidate = value as Partial<TaskState>;
  const answerIsValid = typeof candidate.answer === "string"
    || (Array.isArray(candidate.answer) && candidate.answer.every((item) => typeof item === "string"))
    || isStringRecord(candidate.answer);
  return answerIsValid
    && typeof candidate.attempts === "number"
    && Number.isInteger(candidate.attempts)
    && candidate.attempts >= 0
    && typeof candidate.completed === "boolean"
    && ["idle", "hint", "correct", "model"].includes(candidate.feedback ?? "")
    && (candidate.lastCompletedAt === undefined || typeof candidate.lastCompletedAt === "string")
    && (candidate.lastSubmittedAnswer === undefined || typeof candidate.lastSubmittedAnswer === "string");
}

function readStoredStates(storageKey: string, tasks: LearningTask[], progressVersion: number) {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return { states: {}, status: "ready" as const };
    const parsed: unknown = JSON.parse(stored);
    const rawStates = typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) && "version" in parsed
      ? (parsed as { version?: unknown; states?: unknown }).version === progressVersion
        ? (parsed as { states?: unknown }).states
        : {}
      : parsed;
    if (typeof rawStates !== "object" || rawStates === null || Array.isArray(rawStates)) throw new Error("Ugyldig lagringsformat");
    const taskIds = new Set(tasks.map((task) => task.id));
    const states = Object.fromEntries(
      Object.entries(rawStates)
        .filter(([id, value]) => taskIds.has(id) && isTaskState(value))
        .map(([id, value]) => [id, normalizeStoredState(tasks.find((task) => task.id === id)!, value as TaskState)]),
    ) as Record<string, TaskState>;
    return { states, status: "ready" as const };
  } catch {
    try {
      window.localStorage.removeItem(storageKey);
      return { states: {}, status: "ready" as const };
    } catch {
      return { states: {}, status: "unavailable" as const };
    }
  }
}

function normalizeStoredState(task: LearningTask, state: TaskState) {
  if (task.kind !== "choice" || typeof state.answer !== "string" || !/^\d+$/.test(state.answer)) return state;
  const option = task.options?.[Number(state.answer)];
  return option === undefined ? state : { ...state, answer: option };
}

function isCorrect(task: LearningTask, state: TaskState) {
  if (task.kind === "choice") return state.answer === task.options?.[task.correct ?? -1];
  if (task.kind === "order") {
    return Array.isArray(state.answer)
      && state.answer.length === task.expected?.length
      && state.answer.every((item, index) => item === task.expected?.[index]);
  }
  if (task.kind === "match" || task.kind === "sort") {
    if (!isStringRecord(state.answer)) return false;
    const answerMap = state.answer;
    return Object.entries(task.answerMap ?? {}).every(([item, expected]) => answerMap[item] === expected);
  }
  return false;
}

function isAnswerReady(task: LearningTask, answer: TaskState["answer"]) {
  if (task.kind === "choice") return typeof answer === "string" && answer.length > 0;
  if (task.kind === "order") return Array.isArray(answer) && answer.length === task.items?.length && answer.every(Boolean);
  if (task.kind === "match" || task.kind === "sort") {
    return isStringRecord(answer) && (task.items ?? []).every((item) => Boolean(answer[item]));
  }
  if (typeof answer !== "string") return false;
  const trimmed = answer.trim();
  return trimmed.length >= 40 && trimmed.split(/\s+/).length >= 8;
}

function answerIssue(task: LearningTask, answer: TaskState["answer"]) {
  if (task.kind !== "reflection" || typeof answer !== "string" || answer.trim().length === 0 || isAnswerReady(task, answer)) return null;
  return "Skriv minst 40 tegn og 8 ord i et eget, konkret svar før du sender inn.";
}

export function InteractiveTasks({
  tasks,
  chapterId,
  progressVersion,
}: {
  tasks: LearningTask[];
  chapterId: string;
  progressVersion: number;
}) {
  const storageKey = useMemo(
    () => `historie-i-sammenheng:tasks:v${progressVersion}:${encodeURIComponent(chapterId)}`,
    [chapterId, progressVersion],
  );
  const [states, setStates] = useState<Record<string, TaskState>>({});
  const [resetCounts, setResetCounts] = useState<Record<string, number>>({});
  const [storageStatus, setStorageStatus] = useState<StorageStatus>("loading");
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const stored = readStoredStates(storageKey, tasks, progressVersion);
    const timer = window.setTimeout(() => {
      setStates(stored.states);
      setStorageStatus(stored.status);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [progressVersion, storageKey, tasks]);

  useEffect(() => {
    if (storageStatus !== "ready") return;
    try {
      if (Object.keys(states).length === 0) window.localStorage.removeItem(storageKey);
      else window.localStorage.setItem(storageKey, JSON.stringify({ version: progressVersion, states }));
    } catch {
      const timer = window.setTimeout(() => setStorageStatus("unavailable"), 0);
      return () => window.clearTimeout(timer);
    }
  }, [progressVersion, states, storageKey, storageStatus]);

  const completed = useMemo(
    () => tasks.filter((task) => states[task.id]?.completed).length,
    [states, tasks],
  );
  const phases = useMemo(
    () => phaseLabels
      .map((phase) => ({ ...phase, tasks: tasks.filter((task) => task.phase === phase.phase) }))
      .filter((phase) => phase.tasks.length > 0),
    [tasks],
  );

  function getState(task: LearningTask): TaskState {
    return states[task.id] ?? blankState(task);
  }

  function updateAnswer(task: LearningTask, answer: TaskState["answer"]) {
    setStates((current) => ({
      ...current,
      [task.id]: {
        ...(current[task.id] ?? blankState(task)),
        answer,
        completed: false,
        feedback: "idle",
      },
    }));
  }

  function submit(task: LearningTask) {
    setStates((current) => {
      const state = current[task.id] ?? blankState(task);
      if (!isAnswerReady(task, state.answer)) return current;
      const submittedAnswer = answerKey(state.answer);
      if (state.lastSubmittedAnswer === submittedAnswer && state.feedback !== "idle") return current;
      const completedAt = new Date().toISOString();
      if (task.kind === "reflection") {
        return {
          ...current,
          [task.id]: {
            ...state,
            attempts: state.attempts + 1,
            completed: true,
            feedback: "model",
            lastCompletedAt: completedAt,
            lastSubmittedAnswer: submittedAnswer,
          },
        };
      }
      const correct = isCorrect(task, state);
      return {
        ...current,
        [task.id]: {
          ...state,
          attempts: state.attempts + 1,
          completed: correct,
          feedback: correct ? "correct" : state.attempts === 0 ? "hint" : "model",
          lastCompletedAt: correct ? completedAt : state.lastCompletedAt,
          lastSubmittedAnswer: submittedAnswer,
        },
      };
    });
  }

  function resetPhase(phase: Phase) {
    setAnnouncement(`${phase} er nullstilt. Svar og synlige responser i fasen er fjernet, mens forsøk og historikk er bevart.`);
    setStates((current) => {
      const next = { ...current };
      tasks.filter((task) => task.phase === phase).forEach((task) => {
        const previous = current[task.id] ?? blankState(task);
        next[task.id] = {
          ...previous,
          answer: blankAnswer(task),
          completed: false,
          feedback: "idle",
          lastSubmittedAnswer: undefined,
        };
      });
      return next;
    });
    setResetCounts((current) => {
      const next = { ...current };
      tasks.filter((task) => task.phase === phase).forEach((task) => {
        next[task.id] = (next[task.id] ?? 0) + 1;
      });
      return next;
    });
  }

  const progress = tasks.length > 0 ? (completed / tasks.length) * 100 : 0;

  return (
    <div className="task-set">
      <div className="task-progress" role="group" aria-label="Framdrift i oppgavene">
        <div>
          <span className="eyebrow">Egenarbeid</span>
          <strong>{completed} av {tasks.length} oppgaver gjennomført</strong>
        </div>
        <div className="progress-track" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      </div>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{completed} av {tasks.length} oppgaver gjennomført.</p>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
      {phases.map(({ phase, id, tasks: phaseTasks }) => (
        <section className="task-phase" key={phase} aria-labelledby={`phase-${id}`}>
          <div className="section-heading compact">
            <span className="eyebrow">Oppgavesett</span>
            <h3 id={`phase-${id}`}>{phase}</h3>
            <div className="phase-actions">
              {phaseTasks.some((task) => states[task.id]?.lastCompletedAt) && (
                <span className="phase-last-completed">Sist fullført {formatCompletedAt(phaseTasks.map((task) => states[task.id]?.lastCompletedAt).filter((date): date is string => Boolean(date)).sort().at(-1) ?? "")}</span>
              )}
              <button className="button button-quiet button-small" type="button" onClick={() => resetPhase(phase)}>Øv på nytt</button>
            </div>
          </div>
          <div className="task-grid">
            {phaseTasks.map((task) => {
              const state = getState(task);
              const resetCount = resetCounts[task.id] ?? 0;
              const displaySeed = resetCount === 0 ? task.id : `${task.id}:retry:${resetCount}`;
              return <TaskCard key={task.id} task={task} state={state} displaySeed={displaySeed} updateAnswer={updateAnswer} submit={submit} />;
            })}
          </div>
        </section>
      ))}
      <p className="local-note" role={storageStatus === "unavailable" ? "status" : undefined}>
        {storageStatus === "unavailable"
          ? "Oppgavene virker, men framdriften kan ikke lagres i denne nettleseren."
          : "Framdriften lagres bare lokalt i denne nettleseren. Det opprettes ingen konto, og svarene sendes ikke noe sted."}
      </p>
    </div>
  );
}

function TaskCard({
  task,
  state,
  displaySeed,
  updateAnswer,
  submit,
}: {
  task: LearningTask;
  state: TaskState;
  displaySeed: string;
  updateAnswer: (task: LearningTask, answer: TaskState["answer"]) => void;
  submit: (task: LearningTask) => void;
}) {
  const answer = state.answer;
  const answerReady = isAnswerReady(task, answer);
  const issue = answerIssue(task, answer);
  const selectedOrderAnswers = Array.isArray(answer) ? answer : [];
  const feedbackId = `tilbakemelding-${task.id.toLowerCase()}`;
  const optionOrder = task.options ? seededOrder(displaySeed, task.options.length) : [];
  const orderChoiceOrder = task.items ? seededOrder(`${displaySeed}:order`, task.items.length) : [];
  const matchChoiceOrder = task.choices ? seededOrder(`${displaySeed}:choices`, task.choices.length) : [];

  return (
    <article className={`task-card ${state.completed ? "is-complete" : ""}`} id={`oppgave-${task.id.toLowerCase()}`}>
      <div className="task-card-topline"><span>{task.id}</span><span>{task.points} poeng</span></div>
      <h4>{task.title}</h4>
      <p className="task-prompt">{task.prompt}</p>
      {task.kind === "choice" && (
        <fieldset className="choice-list">
          <legend className="sr-only">Svaralternativer til {task.id}: {task.title}</legend>
          {optionOrder.map((originalIndex, index) => {
            const option = task.options![originalIndex];
            return <label key={option} className="choice-option">
              <input type="radio" name={task.id} value={option} checked={answer === option} onChange={(event) => updateAnswer(task, event.target.value)} />
              <span>{String.fromCharCode(65 + index)}</span>{option}
            </label>;
          })}
        </fieldset>
      )}
      {task.kind === "order" && (
        <div className="select-list">
          {(task.items ?? []).map((item, index) => (
            <label key={item}>
              <span>{index + 1}. plass</span>
              <select value={selectedOrderAnswers[index] ?? ""} onChange={(event) => {
                const next = [...selectedOrderAnswers];
                next[index] = event.target.value;
                updateAnswer(task, next);
              }}>
                <option value="">Velg ledd</option>
                {orderChoiceOrder.map((originalIndex) => {
                  const choice = task.items![originalIndex];
                  return <option key={choice} value={choice} disabled={selectedOrderAnswers.includes(choice) && selectedOrderAnswers[index] !== choice}>{choice}</option>;
                })}
              </select>
            </label>
          ))}
        </div>
      )}
      {(task.kind === "match" || task.kind === "sort") && (
        <div className="select-list">
          {(task.items ?? []).map((item) => (
            <label key={item}>
              <span>{item}</span>
              <select value={isStringRecord(answer) ? answer[item] ?? "" : ""} onChange={(event) => {
                const next = isStringRecord(answer) ? { ...answer, [item]: event.target.value } : { [item]: event.target.value };
                updateAnswer(task, next);
              }}>
                <option value="">Velg</option>
                {matchChoiceOrder.map((originalIndex) => {
                  const choice = task.choices![originalIndex];
                  return <option key={choice} value={choice}>{choice}</option>;
                })}
              </select>
            </label>
          ))}
        </div>
      )}
      {task.kind === "reflection" && (
        <>
          <label className="sr-only" htmlFor={`svar-${task.id.toLowerCase()}`}>Svar på {task.title}</label>
          <textarea id={`svar-${task.id.toLowerCase()}`} rows={6} value={typeof answer === "string" ? answer : ""} onChange={(event) => updateAnswer(task, event.target.value)} placeholder="Skriv svaret ditt her …" aria-describedby={`stotte-${task.id.toLowerCase()}`} />
          <p className="field-note" id={`stotte-${task.id.toLowerCase()}`}>Skriv minst én begrunnet påstand før du sammenligner med modellresponsen.</p>
          {issue && <p className="field-note task-validation" role="status" aria-live="polite">{issue}</p>}
        </>
      )}
      <div className="task-actions">
        <button className="button button-small" type="button" onClick={() => submit(task)} disabled={!answerReady || (state.completed && task.kind !== "reflection")}>
          {state.completed && task.kind !== "reflection" ? "Fullført" : task.kind === "reflection" && state.feedback === "model" ? "Oppdater modellrespons" : task.kind === "reflection" ? "Vis modellrespons" : "Sjekk svar"}
        </button>
        <p className={`task-feedback ${state.feedback === "correct" ? "success" : state.feedback} ${state.feedback === "idle" ? "is-empty" : ""}`} id={feedbackId} role="status" aria-live="polite" aria-atomic="true">
          {state.feedback === "hint" && <><strong>Lite hint:</strong> {task.hint}</>}
          {state.feedback === "correct" && <><strong>Riktig svar.</strong> {task.explanation}</>}
          {state.feedback === "model" && <><strong>{task.kind === "reflection" ? "Sammenlign med modellresponsen:" : "Se forklaringen:"}</strong> {task.modelResponse ?? task.explanation}</>}
        </p>
      </div>
    </article>
  );
}
