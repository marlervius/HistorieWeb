# Arbeidsregler for Historie i sammenheng

## Struktur

- `app/` inneholder route-sidene.
- `components/` inneholder gjenbrukbare presentasjons- og klientkomponenter.
- `content/chapters.ts` er den autoritative innholdsmodellen for kapitteldata, begreper, tidslinje, lange linjer og oppgaver.
- `public/` skal bare inneholde filer som er klare for offentlig bruk, blant annet kvalitetssikrede PDF-er.

## Kommandoer

- `npm ci` installerer låste avhengigheter.
- `npm run dev` starter lokal utvikling.
- `npm run typecheck` kjører TypeScript-kontroll.
- `npm run lint` kjører ESLint.
- `npm test` kjører produksjonsbuild og server-renderingstester.

## Faglige regler

1. Bygg progresjonen fakta → forståelse → lange linjer.
2. Ikke erstatt kvalitetssikret tekst med nyskrevet tekst uten grunn.
3. Ikke dikt opp historiske påstander, kilder, sitater, bilder, kart eller lisenser.
4. Bruk forbehold som «kan», «mulig» og «bidro til» når materialet ikke støtter en automatisk utviklingskjede.
5. Skill mellom funn, tolkning og det en kilde ikke kan bevise.
6. Kildekontroller endringer og oppdater `lastChecked`.

## Tekniske krav

- Ingen database, autentisering, analyseverktøy, cookies eller elevregistrering uten en ny, uttrykkelig beslutning.
- Lokal fremdrift i oppgaver er tillatt når den ligger i nettleseren og ikke sendes eksternt.
- Nye kapitler skal kunne legges til i innholdsmodellen uten manuelle navigasjonsendringer.
- Interaktive oppgaver skal fungere med tastatur og skjermleser, vise hint etter første feil og forklaring eller modellrespons ved nytt forsøk.
- PDF-lenker skal bare vises når filen faktisk finnes.

## Autonomi og menneskeporter

- Følg `WORKFLOW.md` og `docs/production-status.json` for kapittelproduksjon. De utfyller, men overstyrer ikke, de bindende planene i `docs/`.
- Arbeid på ett kapittel om gangen. Ta normale tekniske, pedagogiske og redaksjonelle valg autonomt innenfor et godkjent kildegrunnlag.
- Stopp ved `R1_CANDIDATE` og `R3_CANDIDATE`. En agent kan aldri godkjenne sitt eget arbeid som R1 eller R3.
- Stopp også ved endring av produktstrategi eller personvernmodell, større arkitekturendringer, tvilsomme rettigheter eller motstridende historiske kilder som krever et redaksjonelt valg.
- Lokal commit ved R3, push, pull request, merge og publisering krever uttrykkelig menneskelig godkjenning.
- Vanlig implementasjonsusikkerhet er ikke en menneskeport. Undersøk repoet, relevant dokumentasjon og tester før du ber om en beslutning.

## Code Review Rules

### Historisk integritet

- Flagg nye eller endrede bærende historiske påstander når kildebelegget mangler, er uklart eller ikke støtter påstandens styrke. Flagg også sammenblanding av funn, tolkning og usikkerhet eller deterministiske årsaksforklaringer som kildene bare støtter som mulige eller medvirkende. Sikker vei er sporbar kilde-ID og språk som samsvarer med beleggets styrke.

### Kilder og rettigheter

- Flagg ukjent kilde-ID, manglende proveniens, udokumentert rettighetsstatus eller endret `lastChecked` uten faktisk ny kontroll. Flagg også offentlig PDF eller medium som ikke finnes eller mangler dokumentert kreditering og brukstillatelse. Sikker vei er tekstlig læringsdesign eller ekstern kataloglenke til kontrollen er dokumentert.

### Elevdata og pedagogisk respons

- Flagg nye nettverkskall, cookies, analyse, database, autentisering eller ekstern lagring av elevdata. Flagg oppgaver som viser fasit før elevens eget forsøk, eller som ikke gir hint etter første feil før forklaring eller modellrespons ved nytt forsøk. Sikker vei er kapittelspesifikk, versjonert lokal lagring uten ekstern overføring og det etablerte totrinnsløpet for respons.

## Ferdigkriterier

Før en endring regnes som klar, skal typekontroll, lint, relevante tester og produksjonsbuild være grønne. Gjør også en kort gjennomgang av mobilbredde, fokusmarkeringer, interne lenker, kildevisning og at ingen persondata sendes eksternt.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
