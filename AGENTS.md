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

## Ferdigkriterier

Før en endring regnes som klar, skal typekontroll, lint, relevante tester og produksjonsbuild være grønne. Gjør også en kort gjennomgang av mobilbredde, fokusmarkeringer, interne lenker, kildevisning og at ingen persondata sendes eksternt.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
