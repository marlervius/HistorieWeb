# Prioritert veikart

Sist revidert: 25. august 2026.

## Målbar status etter faglig revisjon og testmilepæl

- Omfang: 2 publiserte kapitler, 38 oppgaver, 22 sentrale begreper, 12 tidslinjepunkter, 13 lange linjer og 2 datadrevne kildeverksteder.
- Kilder: 3 lokale Word-ressurser og 23 navngitte eksterne fagkilder i innholdsmodellen. Kapittel 2.3 har 12 kildeoppføringer med kilde-ID-er, rettighetsnotater og `lastChecked` 25. august 2026; ingen nye medier er tatt inn.
- Testdekning: 6 server-renderingstester og 63 enhetstester som dekker oppgaveforsøk, seedet stokking over flere seeds, svarlekkasje-diagnostikk, kildeverkstedets påstandssett, fokus ved trinnbytte, kronologi, rail/DOM-synkronisering, åpne svar, fasesletting, egenvurdering, kapittelisolert repetisjon, versjonert lagring med migrering, personvern og tastatur/status.
- Tilgjengelighet: hopp-lenke, synlig fokusmarkering, redusert bevegelse, permanente statusregioner, tastaturflyt og fokus ved kildeverkstedets trinnbytte er kontrollert.
- Nettleserkontroll 23. august 2026 ved 320, 375 og 1280 piksler: null horisontal overflyt på alle tre bredder, ingen døde interne ankere, ingen dupliserte DOM-ID-er, ingen overskriftshopp og ingen applikasjonsfeil i konsollen. Fokus ved trinnbytte i kildeverkstedet lander på trinnets overskrift 60 piksler fra toppen av visningsflaten.
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
## Neste prioriterte leveranser

1. **Oppsummerings-PDF 2.2.** Produser og publiser først etter faglig og visuell kontroll; lærerfasit og prøve forblir lokale til annet er besluttet.
2. **Visuell kontroll av lokale Word-ressurser.** Gjør dette når dokumentgjengivelse er tilgjengelig, uten å gjøre arbeidsmaterialet offentlig automatisk.

## Åpne risikoer

- De lokale Word-ressursene er ikke visuelt kontrollert i denne revisjonen fordi LibreOffice-gjengivelse mangler.
- To kapitler er nå publisert, men tverrkapitlig søk og innholdsforurensning bør fortsatt stresstestes når modellen vokser videre.
- Komponenttestene kjører deterministisk i jsdom; reell skjermleser- og hjelpemiddeltesting utover tastatur- og statuskontroll gjenstår.
- Kildeverksted og repetisjons-ID-er er kontrollert på tvers av 2.2 og 2.3; flere kapitler bør fortsatt testes for ytelse, navigasjon og innholdsisolasjon.
