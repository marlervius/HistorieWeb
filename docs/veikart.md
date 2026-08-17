# Prioritert veikart

Sist revidert: 17. august 2026.

## Målbar baseline før første revisjonsleveranse

- Omfang: 1 publisert kapittel, 19 oppgaver, 10 begreper, 6 tidslinjepunkter, 7 lange linjer og 8 server-renderte offentlige ruter.
- Kilder: 3 lokale Word-ressurser og 4 eksterne fagkilder. Word-filene kunne tekstkontrolleres, men ikke gjengis visuelt fordi dokumentgjengivelse ikke er tilgjengelig i miljøet.
- Testdekning: 3 server-renderingstester; ingen komponenttester av oppgaveforsøk, lagring eller skjermleserstatus.
- Tilgjengelighet: hopp-lenke, fokusmarkering og redusert bevegelse fantes. Oppgaver manglet eksplisitte statusregioner.
- Mobil: forsiden målte 485 piksler innholdsbredde og kapittelsiden 460 piksler ved en 375-pikslers visningsflate, altså reell horisontal overflyt.
- Personvern: ingen nettverkskode, analyse, database eller autentisering. Framdrift lå i `localStorage`, men med en hardkodet nøkkel for kapittel 2.2.
- Publisering: ingen offentlig PDF og ingen brutt PDF-lenke. Arbeidsområdet mangler Git-historikk.

## Levert i denne revisjonen

- [x] Fjern horisontal overflyt i lange kapittel- og seksjonsoverskrifter.
- [x] Gjør kapittelnavigasjon, kontroll-dato, oppgaveantall og framdriftsnøkkel datadrevet.
- [x] Avled hovedområdenes kapittellister automatisk fra kapittelmodellen og valider modellen ved bygging.
- [x] Gjengi aktuelle vg2-kompetansemål presist fra Utdanningsdirektoratet og registrer kontrollen.
- [x] Gjør oppgaver mer robuste: krev fullført svar, krev eget åpent svar før modell, kunngjør respons som status og ignorer ugyldig lagret tilstand.
- [x] Kompletter kapittelreisen med forkunnskapsaktivering, egenvurdering og planlagt repetisjon.
- [x] Gjør PDF-visningen datadrevet uten å vise lenke når `summaryPdf` mangler.

## Neste prioriterte leveranser

1. **Kildesporing på påstandsnivå.** Utvid innholdsmodellen med kilde-ID-er og kontrollnotat for fakta, tidslinjepunkter og kildeblikk. Høy faglig verdi og lav personvernrisiko.
2. **Automatiserte interaksjonstester.** Dekk første feil, andre feil, riktig svar, åpen modellrespons, kapittelspesifikk lagring og korrupt lagring.
3. **Sterkere kildeverksted.** Legg inn et dokumentert og lisensiert primærkildeutdrag eller materiell kilde per kapittel med eksplisitt kontekstualisering, kildeopphav og sammenstilling.
4. **Repetisjonsinngang på tvers av kapitler.** Bruk bare lokal, anonym tilstand og bland tidligere fakta-, begreps- og kildeoppgaver uten å introdusere konto eller ekstern lagring.
5. **Neste kapittel.** Start først når kildesett, kompetansekobling og komplett oppgave- og kontrollgrunnlag finnes.
6. **Oppsummerings-PDF 2.2.** Produser og publiser først etter faglig og visuell kontroll; lærerfasit og prøve forblir lokale til annet er besluttet.

## Åpne risikoer

- Kildene er listet per kapittel, men enkeltpåstander har foreløpig ikke eksplisitt kildekobling.
- Oppgaveinteraksjon er nettleserkontrollert, men har foreløpig ikke automatisert komponenttest.
- De lokale Word-ressursene er ikke visuelt kontrollert i denne revisjonen fordi LibreOffice-gjengivelse mangler.
- Bare ett kapittel gjør at tverrkapitlig søk, tidslinje og lange linjer ennå ikke er stresstestet med reell bredde.
