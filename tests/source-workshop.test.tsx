import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { SourceWorkshop, getSourceWorkshopStorageKey, isMeaningfulSourceWorkshopResponse } from "../components/SourceWorkshop";
import { getSourceWorkshopIssues, jordbruksrevolusjonen } from "../content/chapters";

const workshop = jordbruksrevolusjonen.sourceWorkshops[0];
const progressVersion = workshop.progressVersion;

function cloneWorkshop() {
  return structuredClone(workshop);
}

function workshopKey() {
  return getSourceWorkshopStorageKey(jordbruksrevolusjonen.id, workshop.id, progressVersion);
}

async function renderWorkshop() {
  const user = userEvent.setup();
  render(<SourceWorkshop chapterId={jordbruksrevolusjonen.id} workshop={workshop} />);
  await waitFor(() => expect(screen.getByRole("heading", { name: "Observer før du forklarer" })).toBeInTheDocument());
  await waitFor(() => expect(screen.getByRole("textbox", { name: "Dine observasjoner" })).toBeEnabled());
  return user;
}

async function reachClaims(user: ReturnType<typeof userEvent.setup>) {
  const observations = screen.getByRole("textbox", { name: "Dine observasjoner" });
  fireEvent.change(observations, { target: { value: "Det finnes lag, tett plasserte hus og spor etter lagring. Andre redskaper har bruksspor som passer med kornbearbeiding." } });
  await user.click(screen.getByRole("button", { name: /Sett kilden i sammenheng/ }));
  await user.click(screen.getByRole("button", { name: /Fra spor til slutning/ }));
  expect(screen.getByRole("heading", { name: "Hvor langt kan påstanden gå?" })).toBeInTheDocument();
}

async function reachSynthesis(user: ReturnType<typeof userEvent.setup>) {
  await reachClaims(user);
  const directChoices = screen.getAllByRole("radio", { name: "Direkte støttet" });
  for (const choice of directChoices) await user.click(choice);
  const check = screen.getByRole("button", { name: "Sjekk påstander" });
  await user.click(check);
  await user.click(check);
  await user.click(screen.getByRole("button", { name: /Sammenstill spor/ }));
  expect(screen.getByRole("heading", { name: "Bruk minst to forskjellige spor" })).toBeInTheDocument();
}

describe("kildeverkstedets innholdsmodell", () => {
  test("har gyldig verksteddata med separate spor, tolkninger, begrensninger og rettigheter", () => {
    expect(getSourceWorkshopIssues(jordbruksrevolusjonen.id, workshop, jordbruksrevolusjonen.sources.map((source) => source.id))).toEqual([]);
    expect(workshop.materials[0].possibleObservations).not.toEqual(workshop.materials[0].supportedInterpretations);
    expect(workshop.materials.every((material) => material.rights.licenseStatus.length > 0)).toBe(true);
  });

  test("avviser ukjent kilde-ID", () => {
    const invalid = cloneWorkshop();
    invalid.materials[0].sourceIds.push("mangler");
    expect(getSourceWorkshopIssues("2.2", invalid, jordbruksrevolusjonen.sources.map((source) => source.id)).join("\n")).toMatch(/Ukjent kilde-ID/);
  });

  test("avviser manglende offentlig mediefil og rettighetsinformasjon", () => {
    const invalid = cloneWorkshop();
    invalid.materials[0].media = {
      path: "/mangler.png",
      altText: "",
      rights: {
        rightsHolder: "",
        originalUrl: "lokal-kilde",
        licenseStatus: "",
        credit: "",
        adaptation: "",
        checked: "",
      },
    };
    const issues = getSourceWorkshopIssues("2.2", invalid, jordbruksrevolusjonen.sources.map((source) => source.id)).join("\n");
    expect(issues).toMatch(/Mediefilen.*finnes ikke/);
    expect(issues).toMatch(/alternativtekst/);
    expect(issues).toMatch(/rettighetsinformasjon|opphav/);
  });

  test("avviser et materiale som blander observasjon og tolkning", () => {
    const invalid = cloneWorkshop();
    (invalid.materials[0] as typeof invalid.materials[0] & { observation?: string }).observation = "Dette er en forklaring";
    expect(getSourceWorkshopIssues("2.2", invalid, jordbruksrevolusjonen.sources.map((source) => source.id)).join("\n")).toMatch(/skille observasjon og tolkning/);
  });
});

describe("kildeverkstedets elevflyt", () => {
  test("krever meningsfull konklusjon og viser modellrespons først etter eget svar", async () => {
    const user = await renderWorkshop();
    await reachSynthesis(user);

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);
    await user.click(checkboxes[4]);
    const synthesis = screen.getByRole("textbox", { name: "Din sammenstilling" });
    fireEvent.change(synthesis, { target: { value: "Sporene styrker at mat og arbeid ble organisert i ulike sammenhenger, men funksjonene kan ha vært forskjellige." } });
    await user.click(screen.getByRole("button", { name: "Lagre sammenstillingen" }));
    await user.click(screen.getByRole("button", { name: /Skriv konklusjon/ }));

    const conclusion = screen.getByRole("textbox", { name: "Din konklusjon" });
    fireEvent.change(conclusion, { target: { value: "Ved Çatalhöyük ser vi lagdelte, tett plasserte hus med spor etter lagring, mens Göbekli Tepe har mange redskaper og plantespor. Samlet kan dette støtte organisert matarbeid og samarbeid, men ulike funksjoner er mulige. Materialet kan ikke bevise hvem som bestemte eller hva alle tenkte." } });
    expect(screen.getByRole("button", { name: "Vis modellrespons" })).toBeEnabled();
    await user.click(screen.getByRole("button", { name: "Vis modellrespons" }));
    expect(await screen.findByRole("heading", { name: "Sammenlign, behold din stemme og revider" })).toBeInTheDocument();
    expect(screen.getByText(/Materialet kan ikke alene bevise/)).toBeInTheDocument();
  }, 15000);

  test("gir hint ved første feil og forklaring ved nytt forsøk", async () => {
    const user = await renderWorkshop();
    await reachClaims(user);
    const directChoices = screen.getAllByRole("radio", { name: "Direkte støttet" });
    for (const choice of directChoices) await user.click(choice);
    const check = screen.getByRole("button", { name: "Sjekk påstander" });
    await user.click(check);
    expect(await screen.findByText(/Lite hint/)).toBeInTheDocument();
    expect(screen.queryByText(workshop.claims[0].explanation)).not.toBeInTheDocument();
    await user.click(check);
    expect(screen.getAllByText(workshop.claims[0].explanation)).toHaveLength(2);
  });

  test("skjuler forklaringer når en vurdering endres etter modellrespons", async () => {
    const user = await renderWorkshop();
    await reachClaims(user);
    for (const choice of screen.getAllByRole("radio", { name: "Direkte støttet" })) await user.click(choice);
    const check = screen.getByRole("button", { name: "Sjekk påstander" });
    await user.click(check);
    await user.click(check);
    expect(screen.getAllByText(workshop.claims[0].explanation)).toHaveLength(2);

    const firstClaim = screen.getByRole("group", { name: workshop.claims[0].text });
    await user.click(within(firstClaim).getByRole("radio", { name: "Mulig tolkning" }));
    expect(screen.queryByText(workshop.claims[0].explanation)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sammenstill spor/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Sjekk påstander" })).toBeEnabled();
  });

  test("lager verkstedspesifikk lokal tilstand og nullstiller ikke andre oppgaver", async () => {
    const otherKey = "historie-i-sammenheng:tasks:v2:2.2";
    window.localStorage.setItem(otherKey, "behold meg");
    const user = await renderWorkshop();
    fireEvent.change(screen.getByRole("textbox", { name: "Dine observasjoner" }), { target: { value: "Dette er et lokalt observasjonssvar med konkrete spor fra begge materialene." } });
    await waitFor(() => expect(window.localStorage.getItem(workshopKey())).not.toBeNull());
    await user.click(screen.getByRole("button", { name: "Nullstill verkstedet" }));
    await waitFor(() => expect(window.localStorage.getItem(workshopKey())).toBeNull());
    expect(window.localStorage.getItem(otherKey)).toBe("behold meg");
    expect(screen.getByRole("heading", { name: "Observer før du forklarer" })).toBeInTheDocument();
  });

  test("forkaster korrupt og utdatert lagring uten nettverkskall", async () => {
    window.localStorage.setItem(workshopKey(), "ikke json");
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    await renderWorkshop();
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(screen.getByRole("textbox", { name: "Dine observasjoner" })).toHaveValue("");
    cleanup();
    window.localStorage.setItem(workshopKey(), JSON.stringify({ version: 999, state: {} }));
    render(<SourceWorkshop chapterId={jordbruksrevolusjonen.id} workshop={workshop} />);
    await waitFor(() => expect(screen.getByRole("textbox", { name: "Dine observasjoner" })).toHaveValue(""));
  });

  test("har tilgjengelig trinnnavigasjon og meningsfull tekstgrense", async () => {
    await renderWorkshop();
    expect(screen.getByRole("list", { name: "Trinn i kildeverkstedet" })).toBeInTheDocument();
    expect(screen.getAllByRole("status").length).toBeGreaterThan(0);
    expect(isMeaningfulSourceWorkshopResponse("For kort tekst.")).toBe(false);
    expect(isMeaningfulSourceWorkshopResponse("Dette svaret beskriver minst to konkrete spor, en mulig tolkning, et forbehold og hva materialet ikke kan bevise alene.")).toBe(true);
  });
});

describe("fokus og rulling ved trinnbytte", () => {
  test("flytter fokus til det nye trinnets overskrift og ruller verkstedet i syne", async () => {
    const scrollIntoView = vi.fn();
    const originalScroll = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = scrollIntoView;

    try {
      const user = await renderWorkshop();
      // Fokus skal ikke stjeles ved montering; kravet gjelder etter trinnbytte.

      const observations = screen.getByRole("textbox", { name: "Dine observasjoner" });
      fireEvent.change(observations, { target: { value: "Det finnes lag, tett plasserte hus og spor etter lagring. Redskapene har bruksspor som passer med kornbearbeiding." } });
      await user.click(screen.getByRole("button", { name: /Sett kilden i sammenheng/ }));

      const heading = await screen.findByRole("heading", { name: "Hva vet vi om materialet?" });
      await waitFor(() => expect(document.activeElement).toBe(heading));
      expect(document.activeElement).not.toBe(document.body);

      // Fokus skal ligge på en semantisk overskrift, ikke på body.
      expect(document.activeElement?.tagName).toBe("H4");
      expect(heading).toHaveAttribute("tabindex", "-1");
      expect(scrollIntoView).toHaveBeenCalled();

      // Neste trinn skal flytte fokus videre til sin egen overskrift.
      await user.click(screen.getByRole("button", { name: /Fra spor til slutning/ }));
      const claimsHeading = await screen.findByRole("heading", { name: "Hvor langt kan påstanden gå?" });
      await waitFor(() => expect(document.activeElement).toBe(claimsHeading));
    } finally {
      Element.prototype.scrollIntoView = originalScroll;
    }
  }, 20000);

  test("respekterer prefers-reduced-motion ved trinnbytte", async () => {
    const scrollIntoView = vi.fn();
    const originalScroll = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = scrollIntoView;
    const matchMedia = vi.fn().mockReturnValue({ matches: true, media: "(prefers-reduced-motion: reduce)" });
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = matchMedia as unknown as typeof window.matchMedia;

    try {
      const user = await renderWorkshop();
      await user.type(
        screen.getByRole("textbox", { name: "Dine observasjoner" }),
        "Det finnes lag, tett plasserte hus og spor etter lagring. Redskapene har bruksspor som passer med kornbearbeiding.",
      );
      await user.click(screen.getByRole("button", { name: /Sett kilden i sammenheng/ }));
      await waitFor(() => expect(scrollIntoView).toHaveBeenCalled());

      // Rullingen er momentan, også for brukere som har bedt om redusert bevegelse.
      for (const call of scrollIntoView.mock.calls) {
        expect(call[0]).toHaveProperty("behavior", "instant");
      }
    } finally {
      Element.prototype.scrollIntoView = originalScroll;
      window.matchMedia = originalMatchMedia;
    }
  }, 20000);
});
