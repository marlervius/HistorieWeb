"use client";

import { useEffect, useMemo, useState } from "react";

export function SelfAssessment({
  chapterId,
  progressVersion,
  goals,
}: {
  chapterId: string;
  progressVersion: number;
  goals: string[];
}) {
  const storageKey = useMemo(
    () => `historie-i-sammenheng:self-assessment:v${progressVersion}:${encodeURIComponent(chapterId)}`,
    [chapterId, progressVersion],
  );
  const [checked, setChecked] = useState<boolean[]>(() => goals.map(() => false));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let storedChecked: boolean[] | undefined;
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        const candidate = typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) && "version" in parsed
          ? (parsed as { version?: unknown; checked?: unknown }).version === progressVersion
            ? (parsed as { checked?: unknown }).checked
            : undefined
          : parsed;
        if (Array.isArray(candidate) && candidate.length === goals.length && candidate.every((value) => typeof value === "boolean")) {
          storedChecked = candidate;
        }
      }
    } catch {
      // The checklist remains usable even when local storage is unavailable or corrupt.
    }
    const timer = window.setTimeout(() => {
      if (storedChecked) setChecked(storedChecked);
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [goals.length, progressVersion, storageKey]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ version: progressVersion, checked }));
    } catch {
      // Local persistence is optional; no answer leaves the browser.
    }
  }, [checked, progressVersion, ready, storageKey]);

  return (
    <fieldset className="self-assessment">
      <legend>Egenvurdering</legend>
      <p>Kryss av det du kan forklare uten å se i teksten. Du kan endre vurderingen når du øver på nytt.</p>
      {goals.map((goal, index) => (
        <label key={goal} htmlFor={`egenvurdering-${chapterId}-${index}`}>
          <input
            id={`egenvurdering-${chapterId}-${index}`}
            type="checkbox"
            checked={checked[index] ?? false}
            onChange={(event) => setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? event.target.checked : value))}
          />
          <span>Jeg kan {goal}.</span>
        </label>
      ))}
      <p className="self-assessment-status" role="status" aria-live="polite">{checked.filter(Boolean).length} av {goals.length} mål markert.</p>
    </fieldset>
  );
}
