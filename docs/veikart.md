# Prioritert veikart

Sist revidert: 23. august 2026.

## Målbar status etter faglig revisjon og testmilepæl

- Omfang: 1 publisert kapittel, 19 oppgaver, 10 begreper, 6 tidslinjepunkter, 7 lange linjer og 8 server-renderte offentlige ruter.
- Kilder: 3 lokale Word-ressurser og 10 navngitte eksterne fagkilder i innholdsmodellen. Word-filene kunne tekstkontrolleres, men ikke gjengis visuelt fordi dokumentgjengivelse ikke er tilgjengelig i miljøet.
- Testdekning: 4 server-renderingstester og 20 komponenttester som dekker oppgaveforsøk, kildeverksted, åpne svar, fasesletting, egenvurdering, versjonert lagring, personvern og tastatur/status.
- Tilgjengelighet: hopp-lenke, synlig fokusmarkering, redusert bevegelse, permanente statusregioner og tastaturflyt er kontrollert i oppgavekomponenten.
- Mobilbaseline fra før revisjonen: forsiden målte 485 piksler og kapittelsiden 460 piksler ved 375 pikslers visningsflate; overskrifts-overflyten er nå rettet, men full mobilkontroll gjenstår som visuell kontroll.
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