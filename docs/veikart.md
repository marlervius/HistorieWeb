# Prioritert veikart

Sist revidert: 23. august 2026.

## Målbar status etter faglig revisjon og testmilepæl

- Omfang: 1 publisert kapittel, 19 oppgaver, 10 begreper, 7 tidslinjepunkter, 7 lange linjer og 8 server-renderte offentlige ruter.
- Kilder: 3 lokale Word-ressurser og 11 navngitte eksterne fagkilder i innholdsmodellen. Alle 11 er rettighetskontrollert mot utgiver eller Crossref 23. august 2026; én (Çatalhöyük-guiden) er dokumentert som lisensmessig uavklart. Word-filene kunne tekstkontrolleres, men ikke gjengis visuelt fordi dokumentgjengivelse ikke er tilgjengelig i miljøet.
- Testdekning: 5 server-renderingstester og 48 enhetstester som dekker oppgaveforsøk, seedet stokking over flere seeds, svarlekkasje-diagnostikk, kildeverkstedets påstandssett, fokus ved trinnbytte, kronologi, rail/DOM-synkronisering, åpne svar, fasesletting, egenvurdering, versjonert lagring med migrering, personvern og tastatur/status.
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
## Neste prioriterte leveranser

1. **Repetisjonsinngang på tvers av kapitler.** Bruk bare lokal, anonym tilstand og bland tidligere fakta-, begreps- og kildeoppgaver uten å introdusere konto eller ekstern lagring.
2. **Nettleser- og mobilkontroll.** Gjennomfør visuell kontroll ved 320, 375 og desktopbredde, inkludert fokus, internlenker og lærerinngang.
3. **Neste kapittel.** Start først når kildesett, kompetansekobling og komplett oppgave- og kontrollgrunnlag finnes.
4. **Oppsummerings-PDF 2.2.** Produser og publiser først etter faglig og visuell kontroll; lærerfasit og prøve forblir lokale til annet er besluttet.

## Åpne risikoer

- De lokale Word-ressursene er ikke visuelt kontrollert i denne revisjonen fordi LibreOffice-gjengivelse mangler.
- Bare ett kapittel gjør at tverrkapitlig søk, tidslinje, lange linjer og kapittelforurensning ennå ikke er stresstestet med reell bredde.
- Komponenttestene kjører deterministisk i jsdom; reell skjermleser, mobilbredde og full nettleserflyt må fortsatt kontrolleres ved layout- eller interaksjonsendringer.
- Kildeverkstedet er levert for kapittel 2.2; tverrkapitlig kildearbeid og repetisjon finnes ennå ikke fordi bare ett kapittel er publisert.