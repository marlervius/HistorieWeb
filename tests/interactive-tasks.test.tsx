import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { LearningTask, Phase } from "../content/chapters";
import { InteractiveTasks } from "../components/InteractiveTasks";
import { SelfAssessment } from "../components/SelfAssessment";
import { describe, expect, test, vi } from "vitest";

const progressVersion = 2;

function taskStorageKey(chapterId = "test-kapittel") {
  return `historie-i-sammenheng:tasks:v${progressVersion}:${encodeURIComponent(chapterId)}`;
}

function assessmentStorageKey(chapterId = "test-kapittel") {
  return `historie-i-sammenheng:self-assessment:v${progressVersion}:${encodeURIComponent(chapterId)}`;
}

function choiceTask(id = "F1", phase: Phase = "Fakta"): LearningTask {
  return {
    id,
    phase,
    kind: "choice",
    title: `Oppgave ${id}`,
    prompt: "Hvilket svar er riktig?",
    points: 1,
    options: ["Første alternativ", "Riktig alternativ", "Tredje alternativ"],
    correct: 1,
    hint: "Se etter alternativet som beskriver endringen over tid.",
    explanation: "Det andre alternativet er riktig fordi det forklarer utviklingen presist.",
  };
}

function reflectionTask(id = "L1"): LearningTask {
  return {
    id,
    phase: "Lange linjer",
    kind: "reflection",
    title: "Forklar sammenhengen",
    prompt: "Hvordan kan du forklare denne historiske sammenhengen?",
    points: 2,
    hint: "",
    explanation: "",
    modelResponse: "En god forklaring bruker konkrete eksempler og viser sammenhenger med forbehold.",
  };
}

function validAnswer() {
  return "Jordbruk kan ha endret hverdagen fordi flere mennesker kunne bo fast, men utviklingen var ulik i ulike regioner.";
}

function storeStates(states: Record<string, unknown>, chapterId = "test-kapittel", version = progressVersion) {
  window.localStorage.setItem(taskStorageKey(chapterId).replace(`v${progressVersion}`, `v${version}`), JSON.stringify({ version, states }));
}

function storedTaskState(taskId: string, chapterId = "test-kapittel") {
  const raw = window.localStorage.getItem(taskStorageKey(chapterId));
  expect(raw).not.toBeNull();
  const parsed = JSON.parse(raw!) as { states?: Record<string, unknown> } | Record<string, unknown>;
  const states = ("states" in parsed && parsed.states ? parsed.states : parsed) as Record<string, unknown>;
  return states[taskId] as { answer: unknown; attempts: number; completed: boolean; feedback: string; lastSubmittedAnswer?: string };
}

async function renderTasks(tasks: LearningTask[], chapterId = "test-kapittel") {
  const user = userEvent.setup();
  render(<InteractiveTasks tasks={tasks} chapterId={chapterId} progressVersion={progressVersion} />);
  await waitFor(() => expect(screen.getAllByText(new RegExp(`0 av ${tasks.length} oppgaver`)).length).toBeGreaterThan(0));
  return user;
}

describe("oppgavemotoren", () => {
  test("gir hint ved første feil uten å avsløre forklaringen og lagrer forsøket", async () => {
    const task = choiceTask();
    const user = await renderTasks([task]);

    await user.click(screen.getByRole("radio", { name: /Første alternativ/ }));
    await user.click(screen.getByRole("button", { name: "Sjekk svar" }));

    expect(await screen.findByText(/Lite hint/)).toBeInTheDocument();
    expect(screen.queryByText(task.explanation)).not.toBeInTheDocument();
    await waitFor(() => expect(storedTaskState(task.id)).toMatchObject({ attempts: 1, completed: false, feedback: "hint" }));
  });

  test("viser forklaring ved et nytt reelt forsøk og kunngjør responsen som status", async () => {
    const task = choiceTask();
    const user = await renderTasks([task]);

    await user.click(screen.getByRole("radio", { name: /Første alternativ/ }));
    await user.click(screen.getByRole("button", { name: "Sjekk svar" }));
    await user.click(screen.getByRole("radio", { name: /Tredje alternativ/ }));
    await user.click(screen.getByRole("button", { name: "Sjekk svar" }));

    expect(await screen.findByText(task.explanation)).toBeInTheDocument();
    expect(screen.getAllByRole("status").some((element) => element.textContent?.includes("Se forklaringen"))).toBe(true);
    await waitFor(() => expect(storedTaskState(task.id)).toMatchObject({ attempts: 2, feedback: "model" }));
  });

  test("teller ikke identisk innsending som et nytt forsøk", async () => {
    const task = choiceTask();
    const user = await renderTasks([task]);

    await user.click(screen.getByRole("radio", { name: /Første alternativ/ }));
    const submit = screen.getByRole("button", { name: "Sjekk svar" });
    await user.click(submit);
    await user.click(submit);

    await waitFor(() => expect(storedTaskState(task.id)).toMatchObject({ attempts: 1, feedback: "hint" }));
  });

  test("markerer riktig svar, oppdaterer samlet progresjon og gjenoppretter etter remount", async () => {
    const task = choiceTask();
    const user = await renderTasks([task]);

    await user.click(screen.getByRole("radio", { name: /Riktig alternativ/ }));
    await user.click(screen.getByRole("button", { name: "Sjekk svar" }));
    expect(await screen.findByText(/Riktig svar/)).toBeInTheDocument();
    expect(screen.getByText("1 av 1 oppgaver gjennomført")).toBeInTheDocument();
    await waitFor(() => expect(storedTaskState(task.id)).toMatchObject({ attempts: 1, completed: true, feedback: "correct" }));

    cleanup();
    render(<InteractiveTasks tasks={[task]} chapterId="test-kapittel" progressVersion={progressVersion} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Fullført" })).toBeInTheDocument());
    expect(screen.getByText("1 av 1 oppgaver gjennomført")).toBeInTheDocument();
  });

  test("avviser korte åpne svar, viser modellrespons etter eget svar og lagrer revisjonen", async () => {
    const task = reflectionTask();
    const user = await renderTasks([task]);
    const textbox = screen.getByRole("textbox", { name: /Svar på Forklar sammenhengen/ });

    await user.type(textbox, "For kort.");
    expect(screen.getByText(/Skriv minst 40 tegn og 8 ord/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Vis modellrespons" })).toBeDisabled();
    expect(screen.queryByText(task.modelResponse!)).not.toBeInTheDocument();

    await user.clear(textbox);
    await user.type(textbox, validAnswer());
    expect(textbox).toHaveValue(validAnswer());
    await user.click(screen.getByRole("button", { name: "Vis modellrespons" }));
    expect(await screen.findByText(task.modelResponse!)).toBeInTheDocument();
    expect(screen.getAllByRole("status").some((element) => element.textContent?.includes("Sammenlign med modellresponsen"))).toBe(true);

    const revised = `${validAnswer()} Dette viser også at endringene ikke skjedde likt overalt.`;
    await user.clear(textbox);
    await user.type(textbox, revised);
    await user.click(screen.getByRole("button", { name: "Vis modellrespons" }));
    expect(textbox).toHaveValue(revised);
    await waitFor(() => expect(storedTaskState(task.id)).toMatchObject({ attempts: 2, completed: true, feedback: "model" }));
    expect(storedTaskState(task.id).lastSubmittedAnswer).toBe(JSON.stringify(revised));
  });

  test("nullstiller bare valgt fase, bevarer andre faser, historikk og fokus", async () => {
    const fakta = choiceTask("F1", "Fakta");
    const forstaelse = choiceTask("F2", "Forståelse");
    const user = await renderTasks([fakta, forstaelse]);

    const radios = screen.getAllByRole("radio", { name: /Riktig alternativ/ });
    await user.click(radios[0]);
    await user.click(screen.getAllByRole("button", { name: "Sjekk svar" })[0]);
    await user.click(screen.getAllByRole("radio", { name: /Første alternativ/ })[1]);
    await user.click(within(document.querySelector("#oppgave-f2")!).getByRole("button", { name: "Sjekk svar" }));

    const reset = screen.getAllByRole("button", { name: "Øv på nytt" })[0];
    reset.focus();
    await user.click(reset);

    expect(document.activeElement).toBe(reset);
    expect(screen.getByText(/Fakta er nullstilt/)).toBeInTheDocument();
    expect(within(document.querySelector("#oppgave-f1")!).queryByText(/Lite hint|Riktig svar/)).not.toBeInTheDocument();
    expect(within(document.querySelector("#oppgave-f2")!).getByText(/Lite hint/)).toBeInTheDocument();
    await waitFor(() => expect(storedTaskState("F1")).toMatchObject({ attempts: 1, completed: false, feedback: "idle" }));
    expect(storedTaskState("F1").lastSubmittedAnswer).toBeUndefined();
    expect(storedTaskState("F2")).toMatchObject({ attempts: 1, completed: false, feedback: "hint" });
  });

  test("gjenoppretter egenvurdering per kapittel", async () => {
    const user = userEvent.setup();
    const goals = ["forklare årsaker", "bruke kilder"];
    const view = render(<SelfAssessment chapterId="2.2" progressVersion={progressVersion} goals={goals} />);
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);
    await waitFor(() => expect(JSON.parse(window.localStorage.getItem(assessmentStorageKey("2.2"))!).checked).toEqual([true, false]));

    view.unmount();
    const secondView = render(<SelfAssessment chapterId="2.2" progressVersion={progressVersion} goals={goals} />);
    await waitFor(() => expect(screen.getAllByRole("checkbox")[0]).toBeChecked());

    secondView.unmount();
    render(<SelfAssessment chapterId="2.3" progressVersion={progressVersion} goals={goals} />);
    await waitFor(() => expect(screen.getAllByRole("checkbox")[0]).not.toBeChecked());
  });

  test("laster gyldig versjonert tilstand, men forkaster ukjent versjon", async () => {
    const task = choiceTask();
    storeStates({
      [task.id]: { answer: "1", attempts: 1, completed: true, feedback: "correct", lastCompletedAt: "2026-08-21T10:00:00.000Z" },
    });
    render(<InteractiveTasks tasks={[task]} chapterId="test-kapittel" progressVersion={progressVersion} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Fullført" })).toBeInTheDocument());

    cleanup();
    storeStates({
      [task.id]: { answer: "1", attempts: 4, completed: true, feedback: "correct" },
    }, "annet-kapittel", 999);
    render(<InteractiveTasks tasks={[task]} chapterId="annet-kapittel" progressVersion={progressVersion} />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Sjekk svar" })).toBeInTheDocument());
    expect(screen.getByText("0 av 1 oppgaver gjennomført")).toBeInTheDocument();
  });

  test("tåler korrupt JSON, manglende felter og feil datatyper uten å krasje", async () => {
    const task = choiceTask();
    window.localStorage.setItem(taskStorageKey(), "ikke json");
    await renderTasks([task]);
    expect(screen.getByRole("button", { name: "Sjekk svar" })).toBeInTheDocument();

    storeStates({
      [task.id]: { answer: 1, attempts: "mange", completed: true },
      irrelevant: { answer: "1", attempts: 2, completed: true, feedback: "correct" },
    }, "et-nytt-kapittel");
    cleanup();
    render(<InteractiveTasks tasks={[task]} chapterId="et-nytt-kapittel" progressVersion={progressVersion} />);
    await waitFor(() => expect(screen.getByText("0 av 1 oppgaver gjennomført")).toBeInTheDocument());
    expect(screen.queryByRole("button", { name: "Fullført" })).not.toBeInTheDocument();
  });

  test("bruker bare lokal lagring og foretar ingen nettverkskall", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const task = choiceTask();
    const user = await renderTasks([task]);
    await user.click(screen.getByRole("radio", { name: /Riktig alternativ/ }));
    await user.click(screen.getByRole("button", { name: "Sjekk svar" }));

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(window.localStorage.length).toBeGreaterThan(0);
    expect(storedTaskState(task.id)).toHaveProperty("answer");
  });

  test("har tilgjengelige navn, permanente statusregioner og kan fullføres med tastatur", async () => {
    const task = choiceTask();
    await renderTasks([task]);
    expect(screen.getAllByRole("status").length).toBeGreaterThan(0);
    const radio = screen.getByRole("radio", { name: /Riktig alternativ/ });
    const submit = screen.getByRole("button", { name: "Sjekk svar" });
    expect(radio).toHaveAccessibleName(/Riktig alternativ/);
    expect(submit).toHaveAccessibleName("Sjekk svar");

    radio.focus();
    await userEvent.setup().keyboard(" ");
    submit.focus();
    await userEvent.setup().keyboard("{Enter}");
    expect(await screen.findByText(/Riktig svar/)).toBeInTheDocument();
  });
});
