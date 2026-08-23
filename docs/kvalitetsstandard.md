# Kvalitetsstandard

## Fag og kilder

- Historiske påstander skal kunne spores til navngitte, solide kilder.
- Kompetansemål gjengis presist fra Utdanningsdirektoratet når de presenteres som offisielle mål.
- Teksten skiller eksplisitt mellom funn, tolkning, usikkerhet og det en kilde ikke kan bevise.
- Kildeverkstedmateriale lagrer dokumenterte observasjoner, støttede tolkninger, alternative tolkninger og begrensninger i separate felt; materialet skal ha kilde-ID og rettighetsstatus.
- Årsakskjeder bruker forbehold når utviklingen ikke er nødvendig eller automatisk.
- `lastChecked` oppdateres bare etter faktisk kontroll av innhold og lenker.

## Læringsreise

Et publisert kapittel skal i rekkefølge tilby forkunnskapsaktivering, tid og sted, begreper og fakta, årsaker og virkninger, brudd og kontinuitet, kildearbeid, lange linjer, varierte oppgaver, oppsummering, egenvurdering og repetisjon over tid.

Oppgaver skal ha tydelig instruksjon og meningsfull respons. Første feil gir et avgrenset hint. Ny feil gir forklaring eller modell. Åpne oppgaver viser kvalitetskriterier og modellrespons først etter at eleven har skrevet et eget svar.

Kildeverksted skal følge progresjonen observer → kontekstualiser → vurder påstander → sammenstill spor → skriv konklusjon → revider. En modellrespons skal ikke vises før eleven har levert et meningsfullt eget svar, og kildearbeidet skal eksplisitt vise hva materialet ikke kan avgjøre.

## Automatisert regresjon

- Komponenttestene skal bruke realistiske brukerhandlinger og kontrollere første feil, nytt forsøk, identisk innsending, riktig svar, åpne svar, fasesletting, egenvurdering, robust versjonert lagring, personvern og tastatur/status.
- Testene rydder lokal lagring mellom testene, bruker ingen eksterne tjenester og skal ikke være avhengige av kjørerekkefølge eller vilkårlige ventetider.
- Server-renderingstestene skal fortsatt kontrollere offentlige ruter, interne lenker og at offentlige filer finnes.
- Innholdsmodellen skal avvise ukjente kilde-ID-er, blandede observasjon/tolkning-felt, manglende begrensninger, ugyldige rettighetsfelt og medielenker til filer som ikke finnes.

## Tilgjengelighet og mobil

- Semantiske overskrifter, landemerker, feltetiketter og statusregioner brukes konsekvent.
- Fokusmarkering skal være synlig, og alle målrettede kontroller skal være minst 24 × 24 CSS-piksler eller ha tilstrekkelig avstand.
- 320–375 CSS-piksler skal ikke gi sideveis rulling, avkuttet tekst eller kontroller utenfor skjermen.
- Redusert bevegelse respekteres.
- Kontrast, zoom til 200 %, tastaturrekkefølge og skjermlesernavn kontrolleres ved relevante endringer.

## Personvern og publisering

- Ingen database, innlogging, analyse, cookies eller ekstern lagring uten ny beslutning.
- Lokal framdrift bruker kapittelspesifikke, versjonerte nøkler og envelopes, og tåler korrupt JSON, manglende felter, feil datatyper og ukjente versjoner ved trygg forkasting.
- Kildeverkstedets lokale nøkkel er kapittel-, verksted- og versjonsspesifikk; nullstilling skal ikke slette andre oppgaver eller egenvurdering.
- PDF-er og lærerressurser lenkes bare etter faglig, visuell og opphavsrettslig kontroll.
- Prøver og fasiter publiseres ikke uten et uttrykkelig valg.

## Teknisk ferdigdefinisjon

En leveranse er ferdig når innholdsmodellen validerer, interne lenker virker, ingen manglende filer lenkes, `npm run typecheck`, `npm run lint`, komponenttestene, server-renderingstestene, samlet `npm test` og `npm run build` er grønne. Layout- eller interaksjonsendringer krever i tillegg reell kontroll i nettleser på mobil og desktop.

