import { PageShell } from "../../components/SiteHeader";
import { GlossaryExplorer } from "../../components/GlossaryExplorer";
import { glossary } from "../../content/chapters";

export default function GlossaryPage() {
  return <PageShell><main className="page-main narrow" id="main"><div className="page-intro"><span className="eyebrow">Verktøy</span><h1>Begrepsbank</h1><p>Begrepene hentes fra kapitlene og samles uten duplikater. Bruk søket for å repetere ord som binder fakta og forklaring sammen.</p></div><GlossaryExplorer terms={glossary} /></main></PageShell>;
}
