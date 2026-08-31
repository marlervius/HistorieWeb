"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  SourceMaterial,
  SourceWorkshop,
  SourceWorkshopClaim,
  WorkshopClaimClassification,
} from "../content/chapters";
import { seededOrder } from "./seededOrder";

type WorkshopFeedback = "idle" | "hint" | "model" | "success";
type StorageStatus = "loading" | "ready" | "unavailable";

export type SourceWorkshopState = {
  observations: string;
  claims: Record<string, WorkshopClaimClassification | "">;
  claimsAttempts: number;
  claimsFeedback: WorkshopFeedback;
  synthesisEvidence: string[];
  synthesis: string;
  synthesisSubmitted: boolean;
  conclusion: string;
  conclusionAttempts: number;
  conclusionSubmitted: boolean;
  lastSubmittedConclusion?: string;
  initialConclusion?: string;
  revisionSubmitted: boolean;
};

export const classificationLabels: Record<WorkshopClaimClassification, string> = {
  direct: "Direkte støttet",
  possible: "Mulig tolkning",
  "too-strong": "For sterk konklusjon",
  "cannot-determine": "Ikke mulig å avgjøre",
};

export function getWorkshopClaimOrder(workshopId: string, length: number) {
  return seededOrder(`${workshopId}:claims`, length);
}

export function getWorkshopClassificationOrder(workshopId: string, length: number) {
  return seededOrder(`${workshopId}:labels`, length);
}

export function getShuffledClassificationEntries(workshopId: string) {
  const entries = Object.entries(classificationLabels) as [WorkshopClaimClassification, string][];
  return getWorkshopClassificationOrder(workshopId, entries.length).map((index) => entries[index]);
}

const stepLabels = [
  "Observer",
  "Kontekst",
  "Vurder påstander",
  "Sammenstill",
  "Konkluder",
  "Revider",
];

function blankState(): SourceWorkshopState {
  return {
    observations: "",
    claims: {},
    claimsAttempts: 0,
    claimsFeedback: "idle",
    synthesisEvidence: [],
    synthesis: "",
    synthesisSubmitted: false,
    conclusion: "",
    conclusionAttempts: 0,
    conclusionSubmitted: false,
    revisionSubmitted: false,
  };
}

export function getSourceWorkshopStorageKey(chapterId: string, workshopId: string, progressVersion: number) {
  return "historie-i-sammenheng:source-workshop:v"
    + progressVersion
    + ":"
    + encodeURIComponent(chapterId)
    + ":"
    + encodeURIComponent(workshopId);
}

export function sourceWorkshopWordCount(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export function isMeaningfulSourceWorkshopResponse(value: string) {
  const trimmed = value.trim();
  return trimmed.length >= 80 && sourceWorkshopWordCount(trimmed) >= 15;
}

export function meetsSourceWorkshopConclusionRequirement(
  value: string,
  wordRange?: SourceWorkshop["conclusionWordRange"],
) {
  if (!isMeaningfulSourceWorkshopResponse(value)) return false;
  if (!wordRange) return true;
  const count = sourceWorkshopWordCount(value);
  return count >= wordRange.min && count <= wordRange.max;
}

export function hasSubstantiveSourceWorkshopRevision(initial: string, revised: string) {
  const initialWords = initial.trim().toLocaleLowerCase("nb-NO").split(/\s+/);
  const revisedWords = revised.trim().toLocaleLowerCase("nb-NO").split(/\s+/);
  if (initialWords.join(" ") === revisedWords.join(" ")) return false;
  const changedPositions = Math.max(initialWords.length, revisedWords.length)
    - initialWords.filter((word, index) => revisedWords[index] === word).length;
  return changedPositions >= 3;
}

function isMeaningfulSynthesis(value: string) {
  const trimmed = value.trim();
  return trimmed.length >= 50 && trimmed.split(/\s+/).length >= 10;
}

function isWorkshopFeedback(value: unknown): value is WorkshopFeedback {
  return value === "idle" || value === "hint" || value === "model" || value === "success";
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isStringMap(value: unknown): value is Record<string, string> {
  return typeof value === "object"
    && value !== null
    && !Array.isArray(value)
    && Object.values(value).every((item) => typeof item === "string");
}

function isWorkshopState(value: unknown): value is SourceWorkshopState {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const candidate = value as Partial<SourceWorkshopState>;
  return typeof candidate.observations === "string"
    && isStringMap(candidate.claims)
    && Object.values(candidate.claims).every((item) => item === "" || item in classificationLabels)
    && typeof candidate.claimsAttempts === "number"
    && Number.isInteger(candidate.claimsAttempts)
    && candidate.claimsAttempts >= 0
    && isWorkshopFeedback(candidate.claimsFeedback)
    && isStringArray(candidate.synthesisEvidence)
    && typeof candidate.synthesis === "string"
    && typeof candidate.synthesisSubmitted === "boolean"
    && typeof candidate.conclusion === "string"
    && typeof candidate.conclusionAttempts === "number"
    && Number.isInteger(candidate.conclusionAttempts)
    && candidate.conclusionAttempts >= 0
    && typeof candidate.conclusionSubmitted === "boolean"
    && (candidate.lastSubmittedConclusion === undefined || typeof candidate.lastSubmittedConclusion === "string")
    && (candidate.initialConclusion === undefined || typeof candidate.initialConclusion === "string")
    && (candidate.revisionSubmitted === undefined || typeof candidate.revisionSubmitted === "boolean");
}

export function readSourceWorkshopState(storageKey: string, progressVersion: number) {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return { state: blankState(), status: "ready" as const };
    const parsed: unknown = JSON.parse(stored);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new Error("Ugyldig lagringsformat");
    const envelope = parsed as { version?: unknown; state?: unknown };
    if (envelope.version !== progressVersion || !isWorkshopState(envelope.state)) {
      window.localStorage.removeItem(storageKey);
      return { state: blankState(), status: "ready" as const };
    }
    return { state: { ...blankState(), ...envelope.state }, status: "ready" as const };
  } catch {
    try {
      window.localStorage.removeItem(storageKey);
      return { state: blankState(), status: "ready" as const };
    } catch {
      return { state: blankState(), status: "unavailable" as const };
    }
  }
}

function getEvidenceItems(materials: SourceMaterial[]) {
  return materials.flatMap((material) => material.possibleObservations.map((observation, index) => ({
    id: material.id + "-" + index,
    materialId: material.id,
    label: observation,
  })));
}

function classifyClaims(claims: SourceWorkshopClaim[], answers: SourceWorkshopState["claims"]) {
  return claims.filter((claim) => answers[claim.id] === claim.classification).length;
}

function materialLabel(materials: SourceMaterial[], materialId: string) {
  return materials.find((material) => material.id === materialId)?.label ?? materialId;
}

export function SourceWorkshop({
  workshop,
  chapterId,
}: {
  workshop: SourceWorkshop;
  chapterId: string;
}) {
  const storageKey = useMemo(
    () => getSourceWorkshopStorageKey(chapterId, workshop.id, workshop.progressVersion),
    [chapterId, workshop.id, workshop.progressVersion],
  );
  const evidenceItems = useMemo(() => getEvidenceItems(workshop.materials), [workshop.materials]);
  const displayClaims = useMemo(
    () => getWorkshopClaimOrder(workshop.id, workshop.claims.length).map((index) => workshop.claims[index]),
    [workshop.claims, workshop.id],
  );
  const displayClassificationEntries = useMemo(() => getShuffledClassificationEntries(workshop.id), [workshop.id]);
  const [state, setState] = useState<SourceWorkshopState>(blankState);
  const [step, setStep] = useState(0);
  const workshopTopRef = useRef<HTMLDivElement>(null);
  const previousStepRef = useRef<number | null>(null);
  const [storageStatus, setStorageStatus] = useState<StorageStatus>("loading");
  const [announcement, setAnnouncement] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    const stored = readSourceWorkshopState(storageKey, workshop.progressVersion);
    const timer = window.setTimeout(() => {
      setState(stored.state);
      setStorageStatus(stored.status);
      if (stored.state.conclusionSubmitted) setStep(5);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [storageKey, workshop.progressVersion]);

  useEffect(() => {
    if (previousStepRef.current === null) {
      previousStepRef.current = step;
      return;
    }
    if (previousStepRef.current === step) return;
    previousStepRef.current = step;
    const timer = window.setTimeout(() => {
      const section = workshopTopRef.current?.querySelector<HTMLElement>(".source-workshop-step");
      const heading = section?.querySelector<HTMLHeadingElement>("h4");
      if (!section || !heading) return;
      heading.focus({ preventScroll: true });
      // Trinnseksjonen rulles inn, ikke verkstedroten, slik at overskriften havner
      // i toppen av visningsflaten uansett hvor høy skjermen er. Rullingen er alltid
      // momentan: myk rulling over kapittelets lengde lander ikke pålitelig, og en
      // elev ville da sitte med fokus på en overskrift utenfor skjermen.
      section.scrollIntoView?.({ block: "start", behavior: "instant" });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (storageStatus !== "ready") return;
    try {
      const empty = JSON.stringify(blankState()) === JSON.stringify(state);
      if (empty) window.localStorage.removeItem(storageKey);
      else window.localStorage.setItem(storageKey, JSON.stringify({ version: workshop.progressVersion, state }));
    } catch {
      const timer = window.setTimeout(() => setStorageStatus("unavailable"), 0);
      return () => window.clearTimeout(timer);
    }
  }, [state, storageKey, storageStatus, workshop.progressVersion]);

  function updateState(change: (current: SourceWorkshopState) => SourceWorkshopState) {
    setState((current) => change(current));
    setValidationMessage("");
  }

  function goTo(nextStep: number) {
    const safeStep = Math.max(0, Math.min(5, nextStep));
    setStep(safeStep);
    setAnnouncement("Trinn " + (safeStep + 1) + ": " + stepLabels[safeStep] + ".");
  }

  function continueFromObservation() {
    if (!isMeaningfulSynthesis(state.observations)) {
      setValidationMessage("Skriv minst 50 tegn og 10 ord med konkrete observasjoner før du går videre.");
      return;
    }
    goTo(1);
  }

  function checkClaims() {
    const selected = workshop.claims.filter((claim) => Boolean(state.claims[claim.id])).length;
    if (selected < workshop.claims.length) {
      setValidationMessage("Vurder alle påstandene før du sjekker.");
      return;
    }
    const correct = classifyClaims(workshop.claims, state.claims);
    updateState((current) => ({
      ...current,
      claimsAttempts: current.claimsAttempts + 1,
      claimsFeedback: correct === workshop.claims.length ? "success" : current.claimsAttempts === 0 ? "hint" : "model",
    }));
    setAnnouncement(correct === workshop.claims.length
      ? "Alle påstandene er vurdert. Du kan gå til sammenstilling."
      : currentAttemptLabel(state.claimsAttempts));
  }

  function continueFromClaims() {
    if (state.claimsFeedback === "idle" || state.claimsFeedback === "hint") {
      setValidationMessage("Gjør minst ett nytt forsøk etter hintet før du går videre.");
      return;
    }
    goTo(3);
  }

  function submitSynthesis() {
    const selectedMaterials = new Set(
      evidenceItems.filter((item) => state.synthesisEvidence.includes(item.id)).map((item) => item.materialId),
    );
    const requiredMaterials = workshop.synthesisMinimumMaterials ?? 2;
    if (selectedMaterials.size < requiredMaterials) {
      setValidationMessage("Velg konkrete spor fra minst " + requiredMaterials + " forskjellige materialer.");
      return;
    }
    if (!isMeaningfulSynthesis(state.synthesis)) {
      setValidationMessage("Skriv minst 50 tegn og 10 ord som forklarer sammenstillingen.");
      return;
    }
    updateState((current) => ({ ...current, synthesisSubmitted: true }));
    setAnnouncement("Sammenstillingen er lagret lokalt. Les kriteriene og gå videre når du er klar.");
  }

  function submitConclusion() {
    if (!meetsSourceWorkshopConclusionRequirement(state.conclusion, workshop.conclusionWordRange)) {
      setValidationMessage(workshop.conclusionWordRange
        ? "Skriv mellom " + workshop.conclusionWordRange.min + " og " + workshop.conclusionWordRange.max + " ord før du går videre. Du har skrevet " + sourceWorkshopWordCount(state.conclusion) + " ord."
        : "Skriv minst 80 tegn og 15 ord i en begrunnet konklusjon før du viser modellresponsen.");
      return;
    }
    const submitted = state.conclusion.trim();
    const isRevision = state.conclusionSubmitted;
    const initialConclusion = state.initialConclusion ?? submitted;
    if (isRevision && workshop.requiresRevision && !hasSubstantiveSourceWorkshopRevision(initialConclusion, submitted)) {
      setValidationMessage("Gjør en reell revisjon: endre minst tre ord eller setningsledd etter at du har sammenlignet med modellresponsen.");
      return;
    }
    updateState((current) => ({
      ...current,
      conclusionAttempts: current.conclusionAttempts + 1,
      conclusionSubmitted: true,
      initialConclusion: current.initialConclusion ?? submitted,
      revisionSubmitted: isRevision ? true : false,
      lastSubmittedConclusion: submitted,
    }));
    goTo(5);
    setAnnouncement(isRevision
      ? "Revisjonen er lagret lokalt i denne nettleseren."
      : workshop.requiresRevision
        ? "Modellresponsen er synlig. Sammenlign og lagre deretter en reell revisjon."
        : "Modellresponsen er synlig. Revider gjerne svaret ditt med egne ord.");
  }

  function resetWorkshop() {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      setStorageStatus("unavailable");
    }
    setState(blankState());
    setStep(0);
    setValidationMessage("");
    setAnnouncement("Kildeverkstedet er nullstilt. Andre oppgaver er ikke endret.");
  }

  const claimsReady = workshop.claims.every((claim) => Boolean(state.claims[claim.id]));
  const claimsCorrect = classifyClaims(workshop.claims, state.claims);
  const storageLoading = storageStatus === "loading";

  return (
    <div className="source-workshop" data-workshop-id={workshop.id} ref={workshopTopRef}>
      <div className="source-workshop-header">
        <div>
          <span className="eyebrow">Kildeverksted · {workshop.id}</span>
          <h3>{workshop.title}</h3>
          <p>{workshop.guidingQuestion}</p>{workshop.conclusionWordRange && <p className="field-note">Sluttprodukt: krav {workshop.conclusionWordRange.min}–{workshop.conclusionWordRange.max} ord. Modellresponsen vises først etter ditt eget svar.</p>}
        </div>
        <button className="button button-quiet button-small" type="button" onClick={resetWorkshop}>Nullstill verkstedet</button>
      </div>
      <ol className="source-workshop-steps" aria-label="Trinn i kildeverkstedet">
        {stepLabels.map((label, index) => (
          <li key={label} className={index === step ? "is-current" : ""}>
            <button type="button" onClick={() => index <= step && goTo(index)} disabled={index > step || storageLoading} aria-current={index === step ? "step" : undefined}>
              <span>{String(index + 1).padStart(2, "0")}</span>{label}
            </button>
          </li>
        ))}
      </ol>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
      <p className="source-workshop-storage" role={storageStatus === "unavailable" ? "status" : undefined}>
        {storageStatus === "unavailable"
          ? "Verkstedet virker, men kan ikke lagre framdrift i denne nettleseren."
          : "Svarene lagres bare lokalt i denne nettleseren. Ingen elevsvar sendes eksternt."}
      </p>
      {validationMessage && <p className="source-workshop-validation" role="status" aria-live="polite">{validationMessage}</p>}

      {step === 0 && (
        <section className="source-workshop-step" aria-labelledby="workshop-observe-title">
          <span className="eyebrow">01 · Før du får konteksten</span>
          <h4 id="workshop-observe-title" tabIndex={-1}>Observer før du forklarer</h4>
          <p>Les de korte, kildebaserte beskrivelsene. Skriv bare det du kan peke på i beskrivelsen, ikke hva du tror det betyr.</p>
          <div className="source-material-grid">
            {workshop.materials.map((material) => <MaterialPreview key={material.id} material={material} />)}
          </div>
          <div className="source-workshop-example content-box">
            <strong>To ulike setninger</strong>
            <p><span>Observasjon:</span> «Beskrivelsen sier noe om husenes plassering.»</p>
            <p><span>Tolkning:</span> «Alle menneskene hadde samme sosiale roller.»</p>
          </div>
          <label htmlFor="source-workshop-observations"><strong>Dine observasjoner</strong></label>
          <textarea
            id="source-workshop-observations"
            rows={7}
            disabled={storageLoading}
            value={state.observations}
            onChange={(event) => updateState((current) => ({ ...current, observations: event.target.value }))}
            aria-describedby="source-workshop-observation-help"
            placeholder="Skriv minst to konkrete observasjoner …"
          />
          <p className="field-note" id="source-workshop-observation-help">Nevn detaljer om form, plassering, ordvalg, utsnitt, tall eller andre registrerte spor.</p>
          <div className="source-workshop-actions">
            <button className="button" type="button" onClick={continueFromObservation} disabled={storageLoading}>Sett kilden i sammenheng →</button>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="source-workshop-step" aria-labelledby="workshop-context-title">
          <span className="eyebrow">02 · Sett kilden i sammenheng</span>
          <h4 id="workshop-context-title" tabIndex={-1}>Hva vet vi om materialet?</h4>
          <dl className="source-context-grid">
            <ContextItem label="Tid" value={workshop.context.time} />
            <ContextItem label="Sted" value={workshop.context.place} />
            <ContextItem label="Opphavssituasjon eller funnkontekst" value={workshop.context.findContext} />
            <ContextItem label="Bevaring og formidlingsvei" value={workshop.context.preservation} />
            <ContextItem label="Dokumentert av" value={workshop.context.documentedBy} />
          </dl>
          <div className="content-box ochre">
            <h5>Begrensninger ved dokumentasjonen</h5>
            <ul className="plain-list">{workshop.context.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="source-material-grid">
            {workshop.materials.map((material) => <MaterialContext key={material.id} material={material} />)}
          </div>
          <div className="source-workshop-actions">
            <button className="button button-secondary" type="button" onClick={() => goTo(0)}>← Forrige</button>
            <button className="button" type="button" onClick={() => goTo(2)}>Fra spor til slutning →</button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="source-workshop-step" aria-labelledby="workshop-claims-title">
          <span className="eyebrow">03 · Fra spor til slutning</span>
          <h4 id="workshop-claims-title" tabIndex={-1}>Hvor langt kan påstanden gå?</h4>
          <p>Velg den sterkeste vurderingen materialet tåler. En mulig tolkning er ikke det samme som et direkte funn.</p>
          <div className="source-claim-list">
            {displayClaims.map((claim) => (
              <ClaimCard
                key={claim.id}
                claim={claim}
                selected={state.claims[claim.id] ?? ""}
                onChange={(value) => updateState((current) => ({ ...current, claims: { ...current.claims, [claim.id]: value }, claimsFeedback: "idle" }))}
                showExplanation={state.claimsFeedback === "model" || state.claimsFeedback === "success"}
                classificationOptions={displayClassificationEntries}
              />
            ))}
          </div>
          <div className="source-workshop-actions">
            <button className="button button-secondary" type="button" onClick={() => goTo(1)}>← Forrige</button>
            <button className="button" type="button" onClick={checkClaims} disabled={!claimsReady}>
              {state.claimsFeedback === "success" ? "Påstander vurdert" : "Sjekk påstander"}
            </button>
            {state.claimsFeedback !== "idle" && state.claimsFeedback !== "success" && (
              <p className="source-workshop-feedback" role="status" aria-live="polite">
                {state.claimsFeedback === "hint"
                  ? "Lite hint: Se etter forskjellen på konkrete spor, mulige forklaringer og påstander om tanker eller makt."
                  : "Du fikk " + claimsCorrect + " av " + workshop.claims.length + " vurderinger. Les forklaringene og sammenlign med valgene dine."}
              </p>
            )}
            {state.claimsFeedback === "success" && <p className="source-workshop-feedback success" role="status">Godt skille. Du kan gå videre til sammenstilling.</p>}
            {(state.claimsFeedback === "model" || state.claimsFeedback === "success") && (
              <div className="source-claim-key content-box">
                <strong>Forklaringer og vurderingsnivåer</strong>
                <ul className="plain-list">{displayClaims.map((claim) => <li key={claim.id}><strong>{classificationLabels[claim.classification]}:</strong> {claim.explanation}</li>)}</ul>
              </div>
            )}
            <button className="button button-secondary" type="button" onClick={continueFromClaims} disabled={state.claimsFeedback === "idle" || state.claimsFeedback === "hint"}>Sammenstill spor →</button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="source-workshop-step" aria-labelledby="workshop-synthesis-title">
          <span className="eyebrow">04 · Sammenstill kilder</span>
          <h4 id="workshop-synthesis-title" tabIndex={-1}>
            {(workshop.synthesisMinimumMaterials ?? 2) === 2 ? "Bruk minst to forskjellige spor" : "Bruk minst " + workshop.synthesisMinimumMaterials + " forskjellige materialer"}
          </h4>
          <p>{workshop.synthesisPrompt}</p>
          <fieldset className="source-evidence-list">
            <legend>Velg spor du bruker i svaret</legend>
            {evidenceItems.map((item) => (
              <label key={item.id}>
                <input
                  type="checkbox"
                  checked={state.synthesisEvidence.includes(item.id)}
                  onChange={() => updateState((current) => ({
                    ...current,
                    synthesisEvidence: current.synthesisEvidence.includes(item.id)
                      ? current.synthesisEvidence.filter((id) => id !== item.id)
                      : [...current.synthesisEvidence, item.id],
                  }))}
                />
                <span><strong>{materialLabel(workshop.materials, item.materialId)}:</strong> {item.label}</span>
              </label>
            ))}
          </fieldset>
          <label htmlFor="source-workshop-synthesis"><strong>Din sammenstilling</strong></label>
          <textarea id="source-workshop-synthesis" rows={7} value={state.synthesis} onChange={(event) => updateState((current) => ({ ...current, synthesis: event.target.value }))} placeholder="Hva styrker sporene samlet, og hva er fortsatt usikkert?" />
          <div className="content-box">
            <h5>Se etter dette</h5>
            <ul className="plain-list">{workshop.synthesisCriteria.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="source-workshop-actions">
            <button className="button button-secondary" type="button" onClick={() => goTo(2)}>← Forrige</button>
            <button className="button" type="button" onClick={submitSynthesis}>{state.synthesisSubmitted ? "Oppdater sammenstillingen" : "Lagre sammenstillingen"}</button>
            <button className="button button-secondary" type="button" onClick={() => state.synthesisSubmitted && goTo(4)} disabled={!state.synthesisSubmitted}>Skriv konklusjon →</button>
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="source-workshop-step" aria-labelledby="workshop-conclusion-title">
          <span className="eyebrow">05 · Skriv en begrunnet konklusjon</span>
          <h4 id="workshop-conclusion-title" tabIndex={-1}>Fra konkrete spor til en avgrenset påstand</h4>
          <p>{workshop.conclusionPrompt}</p>
          <ul className="source-rubric-list">{workshop.rubric.map((item) => <li key={item}>{item}</li>)}</ul>
          <label htmlFor="source-workshop-conclusion"><strong>Din konklusjon</strong></label>
          <textarea
            id="source-workshop-conclusion"
            rows={12}
            value={state.conclusion}
            aria-describedby="source-workshop-conclusion-help source-workshop-conclusion-count"
            onChange={(event) => updateState((current) => ({
              ...current,
              conclusion: event.target.value,
              revisionSubmitted: current.lastSubmittedConclusion === event.target.value.trim() && current.revisionSubmitted,
            }))}
            placeholder="Skriv svaret ditt her …"
          />
          <p className="field-note" id="source-workshop-conclusion-help">Svaret blir ikke automatisk klassifisert som riktig eller galt.</p>
          <p className="field-note" id="source-workshop-conclusion-count" role="status">
            {sourceWorkshopWordCount(state.conclusion)} ord
            {workshop.conclusionWordRange ? " · krav " + workshop.conclusionWordRange.min + "–" + workshop.conclusionWordRange.max + " ord" : ""}
          </p>
          <div className="source-workshop-actions">
            <button className="button button-secondary" type="button" onClick={() => goTo(3)}>← Forrige</button>
            <button className="button" type="button" onClick={submitConclusion}>{state.conclusionSubmitted ? "Lagre revisjon" : "Vis modellrespons"}</button>
          </div>
        </section>
      )}

      {step === 5 && (
        <section className="source-workshop-step" aria-labelledby="workshop-model-title">
          <span className="eyebrow">06 · Modellrespons og revisjon</span>
          <h4 id="workshop-model-title" tabIndex={-1}>Sammenlign, behold din stemme og revider</h4>
          <p>Modellresponsen er ett mulig eksempel. Bruk den til å finne konkrete spor, tolkning og forbehold du eventuelt vil gjøre tydeligere i ditt eget svar.</p>
          <div className="source-model-grid">
            <ModelPart label="Observasjoner" value={workshop.modelResponse.observations} />
            <ModelPart label="Tolkning" value={workshop.modelResponse.interpretation} />
            <ModelPart label="Forbehold eller alternativ" value={workshop.modelResponse.reservation} />
            <ModelPart label="Dette kan materialet ikke bevise alene" value={workshop.modelResponse.limitation} />
          </div>
          <label htmlFor="source-workshop-revision">
            <strong>{workshop.requiresRevision ? "Revider svaret ditt" : "Revider ditt svar hvis du vil"}</strong>
          </label>
          <textarea
            id="source-workshop-revision"
            rows={12}
            value={state.conclusion}
            aria-describedby="source-workshop-revision-help source-workshop-revision-count"
            onChange={(event) => updateState((current) => ({
              ...current,
              conclusion: event.target.value,
              revisionSubmitted: current.lastSubmittedConclusion === event.target.value.trim() && current.revisionSubmitted,
            }))}
          />
          <p className="field-note" id="source-workshop-revision-help">
            {workshop.requiresRevision
              ? "Sammenlign med modellresponsen og gjør en synlig endring i påstand, kildebruk eller forbehold."
              : "Behold din egen stemme, men gjør kildebruken tydeligere der det trengs."}
          </p>
          <p className="field-note" id="source-workshop-revision-count" role="status">
            {sourceWorkshopWordCount(state.conclusion)} ord
            {workshop.conclusionWordRange ? " · krav " + workshop.conclusionWordRange.min + "–" + workshop.conclusionWordRange.max + " ord" : ""}
          </p>
          <div className="source-workshop-actions">
            <button className="button button-secondary" type="button" onClick={() => goTo(4)}>← Tilbake til svaret</button>
            <button className="button" type="button" onClick={submitConclusion}>
              {workshop.requiresRevision ? "Lagre revisjon" : "Oppdater modellrespons"}
            </button>
          </div>
          {workshop.requiresRevision && !state.revisionSubmitted
            ? <p className="source-workshop-validation" role="status">Verkstedet er ikke fullført før du har lagret en reell revisjon.</p>
            : <p className="source-workshop-complete" role="status">Du har gjennomført kildeverkstedet. Svar og revisjoner blir liggende lokalt i denne nettleseren.</p>}
        </section>
      )}
    </div>
  );
}

function currentAttemptLabel(attempts: number) {
  return attempts === 0 ? "Første vurdering ga et hint. Prøv på nytt før du leser forklaringene." : "Forklaringene er nå tilgjengelige. Sammenlign dem med valgene dine.";
}

function ContextItem({ label, value }: { label: string; value: string }) {
  return <div><dt>{label}</dt><dd>{value}</dd></div>;
}

function MaterialPreview({ material }: { material: SourceMaterial }) {
  return <article className="source-material-card">
    <span className="source-meta">{material.materialType}</span>
    <h5>{material.label}</h5>
    <p>{material.documentedDescription}</p>
    {material.externalLink && (
      <p><a href={material.externalLink.href} target="_blank" rel="noreferrer">{material.externalLink.label} ↗</a></p>
    )}
    <p className="field-note">Ingen tolkning er gitt her. Skriv det du kan observere i beskrivelsen.</p>
  </article>;
}

function MaterialContext({ material }: { material: SourceMaterial }) {
  return <article className="source-material-card">
    <span className="source-meta">{material.date} · {material.place}</span>
    <h5>{material.label}</h5>
    <p><strong>Opphavssituasjon eller funnkontekst:</strong> {material.findContext}</p>
    <p><strong>Bevaring og formidlingsvei:</strong> {material.preservation}</p>
    <p><strong>Dokumentert av:</strong> {material.documentedBy}</p>
    <p><strong>Rettighetsstatus:</strong> {material.rights.licenseStatus}</p>
  </article>;
}

function ClaimCard({
  claim,
  selected,
  onChange,
  showExplanation,
  classificationOptions,
}: {
  claim: SourceWorkshopClaim;
  selected: WorkshopClaimClassification | "";
  onChange: (value: WorkshopClaimClassification) => void;
  showExplanation: boolean;
  classificationOptions: [WorkshopClaimClassification, string][];
}) {
  const fieldsetId = "workshop-claim-" + claim.id;
  return <fieldset className="source-claim-card" aria-describedby={showExplanation ? fieldsetId + "-explanation" : undefined}>
    <legend>{claim.text}</legend>
    {classificationOptions.map(([value, label]) => (
      <label key={value}><input type="radio" name={fieldsetId} value={value} checked={selected === value} onChange={() => onChange(value as WorkshopClaimClassification)} /><span>{label}</span></label>
    ))}
    {showExplanation && <p className="field-note" id={fieldsetId + "-explanation"}><strong>Forklaring:</strong> {claim.explanation}</p>}
  </fieldset>;
}

function ModelPart({ label, value }: { label: string; value: string }) {
  return <article className="source-model-part"><h5>{label}</h5><p>{value}</p></article>;
}
