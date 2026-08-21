import { describe, expect, test } from "vitest";
import { getTeacherGuideIssues, jordbruksrevolusjonen } from "../content/chapters";

function clonedGuide() {
  return structuredClone(jordbruksrevolusjonen.teacherGuide!);
}

describe("lærerdata i innholdsmodellen", () => {
  test("kapittel 2.2 har komplett og gyldig lærerdata", () => {
    expect(getTeacherGuideIssues(jordbruksrevolusjonen.id, jordbruksrevolusjonen.teacherGuide)).toEqual([]);
  });

  test("avviser ukjent seksjonslenke", () => {
    const guide = clonedGuide();
    guide.resources[0].sectionId = "ukjent" as never;
    expect(getTeacherGuideIssues("2.2", guide).join("\n")).toMatch(/ukjent seksjon/i);
  });

  test("avviser URL på lokalt materiale", () => {
    const guide = clonedGuide();
    const local = guide.resources.find((resource) => resource.visibility === "local")!;
    local.href = "/lokalt-arbeidsark.docx";
    expect(getTeacherGuideIssues("2.2", guide).join("\n")).toMatch(/ikke ha offentlig lenke/i);
  });

  test("avviser offentlig ressurs som ikke finnes i public", () => {
    const guide = clonedGuide();
    guide.resources.push({ label: "Mangler", description: "Skal feile", visibility: "public", href: "/mangler.pdf" });
    expect(getTeacherGuideIssues("2.2", guide).join("\n")).toMatch(/manglende fil/i);
  });

  test("avviser ufullstendige vurderingskriterier", () => {
    const guide = clonedGuide();
    guide.assessmentCriteria.pop();
    expect(getTeacherGuideIssues("2.2", guide).join("\n")).toMatch(/mangler i/i);
  });
});
