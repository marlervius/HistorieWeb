# Prioritert veikart

Sist revidert: 27. august 2026.

Dette veikartet er kortversjonen av tre bindende dokumenter:

- [Helhetsplan for Vg2-boka](./helhetsplan-vg2.md) fastsetter omfang, kapitler, kilderetning og ferdigdefinisjon.
- [Kompetansematrisen](./kompetansematrise-vg2.md) fastsetter progresjonen i alle elleve kompetansemål og sju lange linjer.
- [Produksjonsplanen](./produksjonsplan.md) fastsetter rekkefølge, leveranseløp og kvalitetsporter.

Ved konflikt stoppes produksjonen til dokumentene er samordnet. Veikartet skal ikke brukes til å hoppe over kildematrise, uavhengig kontroll eller kapittelvis commit.

## Nåstatus og hovedgap

- Målbildet er en komplett bok med **18 kapitler i seks deler**.
- **2 kapitler er levert på R3-nivå:** 2.2 «Jordbruksrevolusjonen» og 2.3 «Byer uten én oppskrift: mennesker, ressurser og makt i tidlige bysamfunn».
- **16 kapitler gjenstår og står på R0:** retning og realistiske kildeankre er identifisert, men ingen er klare for implementering.
- Nummerhullet er reelt og skal fylles av 2.1 «Før jordbruket». Eksisterende 2.2 og 2.3 beholdes med dagens nummer og URL-er.
- Dagens innhold gir full tematisk dekning av mat/naturressurser innenfor det publiserte stoffet, delvis dekning av kildearbeid, periodisering, demografi, handel/økonomi og kommunikasjon/kulturmøter, og mangler fem mål: fortiden former oss, lokal/nasjonal erindring, demokrati, makt fra middelalder til tidlig nytid og religion fra middelalder til vår tid.
- Global bredde er påbegynt i 2.2 og 2.3. Norsk og samisk historie er fortsatt et hovedgap og skal integreres særlig i 4.2, 5.1, 6.1 og 6.2.

## Bindende produksjonsrekkefølge

| Prioritet | Kapittel | Hovedgrunn |
|---:|---|---|
| P01 | 1.1 Hva kan vi vite om fortiden? | etablerer metodegrunnlaget for resten av boka |
| P02 | 1.2 Hvem deler inn fortiden? | gjør bokas periodisering eksplisitt og diskuterbar |
| P03 | 1.3 Hvordan lever fortiden? | introduserer minne, historiebruk og identitetsrefleksjon |
| P04 | 2.1 Før jordbruket | fyller nummerhullet og motvirker en mangelbasert start |
| P05 | 3.1 Imperier og statsdannelse | bygger komparativ makt- og legitimeringsanalyse |
| P06 | 3.2 Demokrati og deltakelse | dekker antikk–nåtid-sammenligningen i KM8 |
| P07 | 3.3 Nettverk i antikken | utvider global kommunikasjon, handel og migrasjon |
| P08 | 4.1 Religion som samfunnsmakt | introduserer KM10 og KM11 i riktig tidsrom |
| P09 | 4.2 Norge og Sápmi i middelalderen | gir nødvendig norsk og samisk forankring |
| P10 | 4.3 Middelalderens handelsverdener | lar eleven anvende handel og kulturmøter globalt |
| P11 | 4.4 Svartedauden | samler demografi, nettverk, årsak og maktforskyvning |
| P12 | 5.1 Reformasjon og statsbygging | fører makt og religion inn i tidlig nytid |
| P13 | 5.2 Havene bindes sammen | undersøker kulturmøter fra flere aktørposisjoner |
| P14 | 5.3 Sølv, tvangsarbeid og handelskompanier | syntetiserer ressurser, økonomi, demografi og makt |
| P15 | 6.1 Hvem eier fortellingen? | selvstendig lokal og nasjonal historiebruksanalyse |
| P16 | 6.2 Religion, makt og identitet | avslutter KM11 og bokas lange linjer fram til vår tid |

## Kvalitetsporter for hver leveranse

1. **R0 → R1:** Forhåndsstudie, påstand–kilde-matrise, uenighet, begrensninger, rettigheter og `lastChecked` godkjennes.
2. **Pedagogisk port:** Kildeverksted og oppgaver realiserer kapitlets I/Ø/A/S-handlinger, gir hint etter første feil og forklaring eller modellrespons ved nytt forsøk.
3. **Redaksjonell port:** Kapittelteksten følger fakta → forståelse → lange linjer og er kontrollert for presisjon, representasjon og ikke-lineære årsaksforklaringer.
4. **Lærerport:** Undervisningsstier, misoppfatninger, vurderingsstøtte og tilrettelegging er komplette.
5. **R2 → R3:** Uavhengig kildekontroll, typekontroll, lint, produksjonsbuild, enhets- og server-renderingstester, mobil/fokus/lenke/kilde/personvern-kontroll er grønne.
6. **Leveranseport:** Ett kapittel samles i én ren lokal commit. Ingen push, pull request eller deploy uten ny, uttrykkelig godkjenning.

## Neste konkrete leveranse

**P01: løft 1.1 «Hva kan vi vite om fortiden?» fra R0 til R1.**

Før det skrives kapitteltekst skal redaksjonen velge et lovlig og faglig robust sett med materiell, skriftlig, visuell og kvantitativ dokumentasjon, lage påstand–kilde-matrisen, formulere elevundersøkelsen som introduserer KM2 og få kildesettet uavhengig kontrollert. Dette er neste arbeidspakke; implementering starter først etter godkjent R1.

Oppsummerings-PDF for 2.2 og visuell kontroll av lokale Word-ressurser er ønskelige støttearbeider, men er ikke lenger høyere prioritert enn bokas metodegrunnlag. Ingen fil gjøres offentlig uten egen faglig, visuell, rettighets- og tilgjengelighetskontroll.

## Når veikartet er gjennomført

Lokal bok er komplett når alle 18 kapitler er R3, alle elleve mål har dokumentert introduksjon, øving, selvstendig anvendelse og syntese, de sju lange linjene viser både brudd og kontinuitet, og full teknisk, faglig, pedagogisk, tilgjengelighets- og personvernkontroll er grønn.

Offentlig utgivelse er en separat beslutning. Den krever helbokrevisjon, reell hjelpemiddel- og nettlesertest, sikkerhets- og avhengighetskontroll, metadata/`sitemap`/`robots`, ytelseskontroll, rettingskanal og eksplisitt godkjenning av push og deploy.

## Dokumentert status for eksisterende nettsted

- Omfang: 2 publiserte kapitler, 38 oppgaver, 22 sentrale begreper, 12 tidslinjepunkter, 13 lange linjer og 2 datadrevne kildeverksteder.
- Kilder: 3 lokale Word-ressurser og 23 navngitte eksterne fagkilder i innholdsmodellen. Kapittel 2.3 har 12 kildeoppføringer med kilde-ID-er, rettighetsnotater og `lastChecked` 26. august 2026; ingen nye medier er tatt inn.
- Testdekning: 7 server-renderingstester og 66 enhetstester som dekker oppgaveforsøk, seedet stokking over flere seeds, svarlekkasje-diagnostikk, kildeverkstedets påstandssett, fokus ved trinnbytte, kronologi, rail/DOM-synkronisering, åpne svar, fasesletting, egenvurdering, kapittelisolert repetisjon, versjonert lagring med migrering, personvern og tastatur/status.
- Tilgjengelighet: hopp-lenke, synlig fokusmarkering, redusert bevegelse, permanente statusregioner, tastaturflyt og fokus ved kildeverkstedets trinnbytte er kontrollert.
- Nettleserkontroll 26. august 2026 mot lokal produksjonsserver ved 320, 375 og 1280 piksler på alle ni offentlige ruter: 27/27 kontroller grønne, null horisontal overflyt, ingen døde interne ankere, ingen dupliserte DOM-ID-er, ingen overskriftshopp og ingen applikasjonsfeil i konsollen. Fokus- og tastaturflyt er i tillegg dekket av komponenttestene; reell skjermleser er ikke kontrollert.
- Personvern: ingen nettverkskode, analyse, database eller autentisering. Framdrift og egenvurdering ligger i kapittelspesifikke, versjonerte `localStorage`-envelopes; korrupte og ukjente versjoner forkastes trygt.
- Publisering: ingen offentlig PDF og ingen brutt PDF-lenke. Endringene holdes lokale; det blir ikke pushet eller publisert.

## Levert i denne revisjonen

- [x] Fjern horisontal overflyt i lange kapittel- og seksjonsoverskrifter.
- [x] Gjør kapittelnavigasjon, kontroll-dato, oppgaveantall og framdriftsnøkkel datadrevet.
- [x] Avled hovedområdenes kapittellister automatisk fra kapittelmodellen og valider modellen ved bygging.
- [x] Gjengi aktuelle vg2-kompetansemål presist fra Utdanningsdirektoratet og registrer kontrollen.
- [x] Gjør oppgaver mer robuste: krev fullført svar, krev eget åpent svar før modell, kunngjør respons som status og ignorer ugyldig lagret tilstand.
- [x] Kompletter kapittelreisen med forkunnskapsaktivering, egenvurdering og planlagt repetisjon.
- [x] Gjør PDF-visningen datadrevet uten å vise lenke når `summaryPdf` mangler.
- [x] Lever påstandsnær kildesporing med kilde-ID-er og kontrollert kildevisning.
- [x] Etabler 11 automatiserte komponenttester for oppgavemotor, lokal lagring, egenvurdering, personvern og tilgjengelighet.
- [x] Lever et datadrevet kildeverksted for 2.2 med seks trinn: observasjon, kontekst, påstandsvurdering, sammenstilling, konklusjon og revisjon.
- [x] Knytt kildeverkstedet til en offentlig lærerveiledning med faglige skiller, misforståelser, samtalespørsmål, vurderingskriterier og rettighetsstatus.
- [x] Registrer kildeopphav, begrensninger og rettigheter for verkstedmaterialet; ingen nye mediefiler er tatt inn i public/.

- [x] Hardne kapittel 2.2: lisensstatus, kronologisk tidslinje, seedet oppgavestokking, alternativbalanse, fokus ved kildeverkstedbytte og rail/DOM-synkronisering.
- [x] Kontroller alle 11 kildeoppføringer mot utgiver eller Crossref, rett OpenStax-lisensen til CC BY-NC-SA 4.0, rett den oppdiktede Scientific Reports-tittelen og merk Çatalhöyük-guiden som lisensmessig uavklart.
- [x] Utvid kildeverkstedet til 8 påstander med to i hver kategori og nøytralt språkregister.
- [x] Legg inn innholdsregresjonstester for posisjonell fasit, alternativlengde i begge retninger, hedging, tidslinje, railrekkefølge, publiserte kildetitler, seed-variasjon og lagringsmigrering.
- [x] Lever en datadrevet repetisjonsinngang med aktiv gjenhenting, lokal anonym tilstand, deterministisk plan og automatisk opptak av nye publiserte kapitler.
- [x] Kontroller repetisjonsinngangen i lokal Chrome ved 320, 375 og 1280 piksler, inkludert første økt, lokal sletting og horisontal overflyt.
- [x] Gjennomfør forstudie for kapittel 2.3 med kapittelplan, kildematrise, kompetansekobling, komplett oppgavegrunnlag og kontrollert kildeverksted; grunnlaget er klart for implementering innenfor avgrensningen i dokumentene.
- [x] Implementer kapittel 2.3 med tre-case-fagtekst, 19 oppgaver, kildekoblede avsnitt, seks-trinns kildeverksted, lærerveiledning, kapittelnavigasjon og regresjonstester.
- [x] Gjennomfør uavhengig sluttrevisjon av 2.3 og fellesflater: rett kilde-/metadatafeil, balanser oppgaver og kildeverksted, korriger mobil-overflyt og dupliserte React-nøkler, og dokumenter residuale risikoer.

## Åpne risikoer

- De lokale Word-ressursene er ikke visuelt kontrollert i denne revisjonen fordi LibreOffice-gjengivelse mangler.
- To kapitler er nå publisert, men tverrkapitlig søk og innholdsforurensning bør fortsatt stresstestes når modellen vokser videre.
- Komponenttestene kjører deterministisk i jsdom; reell skjermleser- og hjelpemiddeltesting utover tastatur- og statuskontroll gjenstår.
- Kildeverksted og repetisjons-ID-er er kontrollert på tvers av 2.2 og 2.3; flere kapitler bør fortsatt testes for ytelse, navigasjon og innholdsisolasjon.
