# Historie i sammenheng – autonom produksjonsworkflow

## Formål og myndighet

Denne filen beskriver hvordan en agent gjennomfører den bindende produksjonsplanen uten løpende prompt-overleveringer. Den endrer ikke de faglige eller tekniske kravene i:

1. `AGENTS.md`
2. `docs/kvalitetsstandard.md`
3. `docs/produktstrategi.md`
4. `docs/helhetsplan-vg2.md`
5. `docs/kompetansematrise-vg2.md`
6. `docs/produksjonsplan.md`

Ved konflikt gjelder de bindende dokumentene over. `docs/production-status.json` er den operative statusoversikten og skal samsvare med dem.

## Hovedmål

Produser læreverket systematisk etter helhetsplanen, kompetansematrisen og produksjonsplanen. Arbeid på ett kapittel om gangen, normalt kapitlet i `currentChapter`, med mindre et menneske uttrykkelig velger noe annet.

Følg progresjonen fakta → forståelse → lange linjer. Ikke erstatt kvalitetssikret innhold uten dokumentert grunn, og ikke gjør publisering eller endringer i produktstrategi, personvernmodell eller overordnet arkitektur som en sideeffekt.

## Tilstander

| Tilstand | Betydning | Hvem kan sette den |
|---|---|---|
| `R0` | Retning, mulige case og første kildeankre er identifisert. | Planverket eller menneskelig redaktør |
| `R1_CANDIDATE` | Forhåndsstudie, kildematrise, påstand–kilde-kobling, rettigheter og uavhengig kontroll er klare for beslutning. | Agent |
| `R1` | Kildegrunnlaget er menneskegodkjent og produksjonsklart. | Menneske |
| `R2` | Kapittel, oppgaver, kildeverksted, lærerstoff og tester er implementert og sporbart. | Agent etter grønne porter |
| `R3_CANDIDATE` | En separat kritisk sluttkontroll er gjennomført, sikre feil er rettet og alle porter er grønne. | Agent |
| `R3` | Leveransen er menneskegodkjent og samlet i én ren lokal commit. | Menneskeport og uttrykkelig commit-godkjenning |

En port kan sende kapitlet tilbake til et tidligere nivå. Oppdater aldri status for å skjule et åpent avvik.

## Oppstart for hver arbeidsøkt

1. Les `AGENTS.md`, denne filen og `docs/production-status.json`.
2. Les dokumentene oppført under «Formål og myndighet» og arbeidsnotatene for gjeldende kapittel.
3. Kontroller `git status` og bevar brukerens eksisterende endringer. Ikke bland inn et annet kapittel.
4. Bekreft gjeldende tilstand og neste lovlige overgang fra statusfilen.
5. Lag en intern arbeidsplan og fortsett uten godkjenningsstopp for normale valg.

## R0 → R1_CANDIDATE

Agenten skal:

1. avgrense styrende spørsmål, tid, rom, aktører og nødvendig faktagrunnlag;
2. identifisere kompetansemål, elevhandlinger, forkunnskaper og relevante lange linjer;
3. finne og kontrollere solide primærkilder, forskning, oppslagskilder og eventuelle undervisningsressurser;
4. lage en påstand–kilde-matrise for alle bærende påstander;
5. skille funn, tolkning, uenighet, usikkerhet og det kildene ikke kan bevise;
6. dokumentere proveniens, rettigheter, kreditering, lokal filstatus og faktisk kontrollert `lastChecked`;
7. kontrollere representasjon og relevante globale, norske og samiske perspektiver uten å fylle kildehull;
8. gjennomføre en separat kritisk kilde- og rettighetskontroll som forsøker å avgrense eller falsifisere hovedpåstandene;
9. skrive en samlet R1-kontrollrapport og oppdatere status til `R1_CANDIDATE`.

Agenten stopper der. Bare et menneske kan godkjenne R1. Kapitteltekst, offentlige medier og implementerte elevoppgaver skal ikke produseres før R1 er eksplisitt godkjent.

## R1 → R2

Når R1 er eksplisitt godkjent, arbeider agenten autonomt gjennom hele implementasjonen i rekkefølgen fra produksjonsplanen:

1. design kildeverksted og oppgaveprogresjon;
2. skriv kapitteltekst mot den godkjente påstand–kilde-matrisen;
3. legg inn begreper, tidslinje, lange linjer og repetisjonskoblinger i den autoritative innholdsmodellen;
4. lag lærerressurser, modellresponser, misoppfatninger, vurderingsstøtte og tilrettelegging;
5. implementer eller utvid tester for faglig innhold, interaksjon, tilgjengelighet, lokal lagring og server-rendering;
6. kontroller mobilbredde, fokusmarkeringer, interne lenker, kildevisning, PDF-/mediefiler og at ingen persondata sendes eksternt;
7. kjør `npm run typecheck`, `npm run lint` og `npm test`;
8. undersøk og rett årsaken til alle feil, og kjør berørte kontroller og hele kvalitetspakken på nytt.

Når leveransen er komplett, sporbar og alle porter er grønne, oppdateres status til `R2`. Ikke svekk en test eller kvalitetsport for å oppnå grønt resultat.

## R2 → R3_CANDIDATE

Gjennomfør en ny kontroll som om arbeidet var skrevet av en annen utvikler og redaksjon. Ikke anta at tidligere arbeid er korrekt.

Kontroller uavhengig:

- fakta, kronologi, geografi, aktører og mulige anakronismer;
- forholdet mellom hver bærende påstand og dokumentert kildebelegg;
- deterministisk språk, overtolkning og skillet mellom observasjon, tolkning og begrensning;
- oppgavenes progresjon, svarlekkasje, hint og modellrespons;
- kildeverkstedets seks trinn og reell elevhandling mot kompetansematrisen;
- begreper, tidslinje, repetisjon, lange linjer og tverrkapittel-koblinger;
- lærerressurser og kjennetegn på kvalitet;
- tastatur, fokus, skjermlesersemantikk, zoom, redusert bevegelse og mobil;
- personvern, interne lenker, kildevisning, rettigheter, PDF-/mediefiler og regresjonstester.

Rett sikre feil autonomt. Ved reell faglig eller rettighetsmessig tvil skal problemet dokumenteres i reviewrapporten i stedet for å gjettes bort. Kjør alle automatiske og relevante manuelle porter på nytt.

Når ingen kjente blokkerende problemer gjenstår, oppdateres status til `R3_CANDIDATE`. Agenten stopper der og leverer én samlet rapport med status, implementasjon, kontroller, resultater, åpne spørsmål og anbefalt neste handling.

## Menneskeporter

Menneskelig beslutning kreves ved:

- godkjenning av `R1_CANDIDATE` som R1;
- godkjenning av `R3_CANDIDATE`, tillatelse til lokal commit og merking som R3;
- endring av produktstrategi eller personvernmodell;
- større arkitekturendringer;
- rettigheter eller proveniens som ikke kan dokumenteres sikkert;
- motstridende historiske kilder som krever et redaksjonelt valg;
- push, pull request, merge, deploy eller annen publisering.

Normale tekniske, pedagogiske og redaksjonelle valg innenfor godkjent omfang er ikke menneskeporter. Undersøk repoet, dokumentasjonen, kildene og testene før et problem klassifiseres som en port.

## Statusføring

- Oppdater `docs/production-status.json` bare når en dokumentert overgang faktisk er oppnådd eller en port sender kapitlet tilbake.
- Behold `currentChapter` til kapitlet er R3 eller et menneske velger et annet kapittel.
- Bruk ISO-dato i `lastUpdated` og `lastStatusChange`.
- Når et kapittel når R3, settes `next` til `null`. Neste kapittel velges etter den bindende prioriteringen i produksjonsplanen.
- Statusfilen er ikke kildebelegg og kan aldri alene godkjenne R1 eller R3.
