import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test } from "vitest";
import { RepetitionPractice } from "../components/RepetitionPractice";
import type { RepetitionItem } from "../lib/repetition";

const factItem: RepetitionItem = {
  id: "2.2:fact:test",
  chapterId: "2.2",
  chapterTitle: "2.2 · Jordbruksrevolusjonen",
  progressVersion: 2,
  kind: "fact",
  title: "Faktapunkt",
  prompt: "Hva husker du?",
  answer: "Et kvalitetssikret faktapunkt.",
  sourceIds: ["source"],
};

const secondFactItem: RepetitionItem = {
  ...factItem,
  id: "2.2:fact:test-2",
  answer: "Et annet kvalitetssikret faktapunkt.",
};

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("repetisjonsflyten", () => {
  test("viser tomtilstand med tilgjengelig kapittellenke før første aktivitet", async () => {
    render(<RepetitionPractice items={[factItem, secondFactItem]} chapterLinks={[{ id: "2.2", title: factItem.chapterTitle, href: "/laereverk/kapittel" }]} />);
    expect(await screen.findByRole("heading", { name: "Start med et tilgjengelig kapittel" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Åpne det kvalitetssikrede kapitlet/ })).toHaveAttribute("href", "/laereverk/kapittel");
  });

  test("kan hente fram et faktapunkt, egenvurdere og slette bare repetisjonsdata", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem("historie-i-sammenheng:tasks:v2:2.2", "behold denne");
    render(<RepetitionPractice items={[factItem, secondFactItem]} chapterLinks={[{ id: "2.2", title: factItem.chapterTitle, href: "/laereverk/kapittel" }]} />);
    await user.click(await screen.findByRole("button", { name: /start første økt/i }));
    await user.click(await screen.findByRole("button", { name: "Vis faktapunktet" }));
    await user.click(screen.getByRole("button", { name: "Jeg fikk det fram" }));
    await waitFor(() => expect(window.localStorage.getItem("historie-i-sammenheng:repetition:v1")).not.toBeNull());

    await user.click(screen.getByRole("button", { name: "Slett repetisjonsdata" }));
    expect(window.localStorage.getItem("historie-i-sammenheng:repetition:v1")).toBeNull();
    expect(window.localStorage.getItem("historie-i-sammenheng:tasks:v2:2.2")).toBe("behold denne");
    expect(screen.getByRole("status")).toHaveTextContent("slettet");
  });
});
