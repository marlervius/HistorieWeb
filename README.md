# Historie i sammenheng

Første produksjonsklare portalversjon for et skalerbart digitalt læreverk i historie VG2. Referansekapitlet er `2.2 Jordbruksrevolusjonen`.

## Lokal oppstart

Forutsetter Node.js `>=22.13.0`.

```bash
npm ci
npm run dev
```

Åpne adressen som vises av `vinext`, vanligvis `http://localhost:3000`.

## Kontroller

```bash
npm run typecheck
npm run lint
npm test
```

`npm test` bygger først produksjonsversjonen og kjører deretter server-renderingstester for forsiden, læreverket, verktøysidene og referansekapitlet.

## Innholdsarkitektur

- `content/chapters.ts` er den validerbare innholdsmodellen. Her registreres kapittelmetadata, mål, fakta, begreper, fagtekst, årsaker, virkninger, kildeblikk, lange linjer, tidslinje og oppgaver.
- `components/` inneholder gjenbrukbare komponenter for navigasjon, stabile lenker, oppgaver og begrepssøk.
- `app/` inneholder sidene. Kapittelruten er dynamisk: `/laereverk/[section]/[chapter]`.
- `docs/` inneholder produktstrategi, kvalitetsstandard og prioritert veikart.
- `.openai/hosting.json` inneholder ingen D1- eller R2-bindinger. Første versjon har ingen database, innlogging, analyse, cookies eller elevregistrering.

Faginnholdet ligger ikke direkte i store sidekomponenter. Navigasjonen og oversiktene bygges fra innholdsmodellen, slik at et nytt kapittel kan legges til uten å endre hovedmenyen.

## Legg til et nytt kapittel

1. Opprett et nytt `Chapter`-objekt i `content/chapters.ts` med en stabil ID, for eksempel `2.3`.
2. Bruk et URL-vennlig `slug` og riktig `sectionSlug`.
3. Fyll inn faglig kontrollerte mål, fakta, begreper, fagtekst, kilder og dato for siste kontroll.
4. Registrer oppgaver som `choice`, `match`, `order`, `sort` eller `reflection`.
5. Legg kapitlet i `chapters`. Hovedområde, navigasjon, tidslinje, begreper og lange linjer avledes automatisk.
6. Kjør typekontroll, lint og produksjonstest.

## Oppgaver og PDF-er

Oppgaver må ha hint til første feil, forklaring ved nytt forsøk og modellrespons for åpne svar. Åpne oppgaver krever et eget svar før modellen vises. Lokal framdrift lagres med kapittelspesifikk og versjonert nøkkel i nettleserens `localStorage`; ingen svar eller identifikatorer sendes eksternt.

PDF-er skal legges i `public/` med stabilt navnemønster og registreres som `summaryPdf` først etter faglig og visuell kontroll. Kapittel 2.2 har ingen kvalitetssikret PDF i prosjektmaterialet ennå, og siden viser derfor ingen brutt nedlastingslenke.

## Status

Ferdig i denne versjonen:

- forside, læreverksoversikt, lange linjer, begrepsbank, tidslinje, lærerinngang og om-side
- komplett referansekapittel 2.2 basert på lokale læringsark, lærerveiledning og kortprøve
- 19 interaktive oppgaver med tastaturvennlige kontroller, skjermleserstatus, hint, forklaringer og modellresponser
- forkunnskapsaktivering, egenvurdering og en konkret plan for repetisjon over tid
- stabil lenkekopiering for kapittel og oppgavesett
- responsive layout, hopp-lenke, synlige fokusmarkeringer og støtte for redusert bevegelse
- kildeoversikt med lenker til Utdanningsdirektoratet, OpenStax, UNESCO og Scientific Reports

Gjenstår:

- de øvrige kapitlene og deres kvalitetssikrede kildemateriale
- kort oppsummerings-PDF for kapittel 2.2
- eventuell bevisst offentliggjøring av lærerressurser som nå bare er dokumentert som lokale kilder

## Vercel preview

Prosjektet er klart for en preview-deploy etter at endringene er lagt i et Git-repository:

1. Koble prosjektet til Vercel og velg dette prosjektets rotmappe.
2. Bruk `npm run build` som byggkommando og Node.js `22.x`.
3. Kontroller preview-adressen på mobil og desktop.
4. Verifiser alle hovedrutene og oppgavesettet før eventuell produksjonslansering.

Ingen produksjonspublisering eller Git-push er gjort fra denne arbeidsøkten.
