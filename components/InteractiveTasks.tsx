"use client";

import { useEffect, useMemo, useState } from "react";
import type { LearningTask, Phase } from "../content/chapters";

type TaskState = {
  answer: string | string[] | Record<string, string>;
  attempts: number;
  completed: boolean;
  feedback: "idle" | "hint" | "correct" | "model";
};

type StorageStatus = "loading" | "ready" | "unavailable";

const phaseLabels: { phase: Phase; number: string; id: string }[] = [
  { phase: "Fakta", number: "01", id: "fakta" },
  { phase: "Forståelse", number: "02", id: "forstaelse" },
  { phase: "Lange linjer", number: "03", id: "lange-linjer" },
  { phase: "Kildeblikk", number: "04", id: "kildeblikk" },
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
    && ["idle", "hint", "correct", "model"].includes(candidate.feedback ?? "");
}

function readStoredStates(storageKey: string, tasks: LearningTask[]) {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return { states: {}, status: "ready" as const };
    const parsed: unknown = JSON.parse(stored);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new Error("Ugyldig lagringsformat");
    const taskIds = new Set(tasks.map((task) => task.id));
    const states = Object.fromEntries(
      Object.entries(parsed).filter(([id, value]) => taskIds.has(id) && isTaskState(value)),
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

function isCorrect(task: LearningTask, state: TaskState) {
  if (task.kind === "choice") return state.answer === task.correct?.toString();
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
  return typeof answer === "string" && answer.trim().length >= 20;
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
  const [storageStatus, setStorageStatus] = useState<StorageStatus>("loading");

  useEffect(() => {
    const stored = readStoredStates(storageKey, tasks);
    const timer = window.setTimeout(() => {
      setStates(stored.states);
      setStorageStatus(stored.status);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [storageKey, tasks]);

  useEffect(() => {
    if (storageStatus !== "ready") return;
    try {
      if (Object.keys(states).length === 0) window.localStorage.removeItem(storageKey);
      else window.localStorage.setItem(storageKey, JSON.stringify(states));
    } catch {
      const timer = window.setTimeout(() => setStorageStatus("unavailable"), 0);
      return () => window.clearTimeout(timer);
    }
  }, [states, storageKey, storageStatus]);

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
      if (task.kind === "reflection") {
        return {
          ...current,
          [task.id]: { ...state, attempts: state.attempts + 1, completed: true, feedback: "model" },
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
        },
      };
    });
  }

  const progress = tasks.length > 0 ? (completed / tasks.length) * 100 : 0;

  return (
    <div className="task-set">
      <div className="task-progress" role="status" aria-live="polite" aria-atomic="true">
        <div>
          <span className="eyebrow">Egenarbeid</span>
          <strong>{completed} av {tasks.length} oppgaver gjennomført</strong>
        </div>
        <div className="progress-track" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      </div>
      {phases.map(({ phase, number, id, tasks: phaseTasks }) => (
        <section className="task-phase" key={phase} aria-labelledby={`phase-${id}`}>
          <div className="section-heading compact">
            <span className="eyebrow">{number}</span>
            <h3 id={`phase-${id}`}>{phase}</h3>
          </div>
          <div className="task-grid">
            {phaseTasks.map((task) => {
              const state = getState(task);
              return <TaskCard key={task.id} task={task} state={state} updateAnswer={updateAnswer} submit={submit} />;
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
  updateAnswer,
  submit,
}: {
  task: LearningTask;
  state: TaskState;
  updateAnswer: (task: LearningTask, answer: TaskState["answer"]) => void;
  submit: (task: LearningTask) => void;
}) {
  const answer = state.answer;
  const answerReady = isAnswerReady(task, answer);
  const selectedOrderAnswers = Array.isArray(answer) ? answer : [];
  const feedbackId = `tilbakemelding-${task.id.toLowerCase()}`;

  return (
    <article className={`task-card ${state.completed ? "is-complete" : ""}`} id={`oppgave-${task.id.toLowerCase()}`}>
      <div className="task-card-topline"><span>{task.id}</span><span>{task.points} poeng</span></div>
      <h4>{task.title}</h4>
      <p className="task-prompt">{task.prompt}</p>
      {task.kind === "choice" && (
        <fieldset className="choice-list">
          <legend className="sr-only">Svaralternativer til {task.id}: {task.title}</legend>
          {task.options?.map((option, index) => (
            <label key={option} className="choice-option">
              <input type="radio" name={task.id} value={index} checked={answer === index.toString()} onChange={(event) => updateAnswer(task, event.target.value)} />
              <span>{String.fromCharCode(65 + index)}</span>{option}
            </label>
          ))}
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
                {(task.items ?? []).map((choice) => (
                  <option key={choice} value={choice} disabled={selectedOrderAnswers.includes(choice) && selectedOrderAnswers[index] !== choice}>{choice}</option>
                ))}
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
                {(task.choices ?? []).map((choice) => <option key={choice} value={choice}>{choice}</option>)}
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
        </>
      )}
      <div className="task-actions">
        <button className="button button-small" type="button" onClick={() => submit(task)} disabled={!answerReady || state.completed} aria-describedby={state.feedback === "idle" ? undefined : feedbackId}>
          {state.completed ? "Fullført" : task.kind === "reflection" ? "Vis modellrespons" : "Sjekk svar"}
        </button>
        {state.feedback !== "idle" && (
          <p className={`task-feedback ${state.feedback === "correct" ? "success" : state.feedback}`} id={feedbackId} role="status" aria-atomic="true">
            {state.feedback === "hint" && <><strong>Lite hint:</strong> {task.hint}</>}
            {state.feedback === "correct" && <><strong>Godt tenkt.</strong> {task.explanation}</>}
            {state.feedback === "model" && <><strong>{task.kind === "reflection" ? "Sammenlign med modellresponsen:" : "Se forklaringen:"}</strong> {task.modelResponse ?? task.explanation}</>}
          </p>
        )}
      </div>
    </article>
  );
}
