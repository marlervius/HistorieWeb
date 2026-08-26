# Uavhengig sluttrevisjon av kapittel 2.3

**Kontrollert:** 26. august 2026

**Grunnlag:** Arbeidstreet var rent på forventet HEAD ba4b63f før revisjonen. Denne rapporten gjelder bare sluttkontrollen og rettingene som er gjort lokalt etter denne basen.

## Konklusjon

**Faglig publisering:** Kapittel 2.3 er klart for faglig publisering innenfor den vedtatte avgrensningen. De sentrale påstandene har verifiserbare kilder, og usikre slutninger er merket som tolkninger, muligheter eller det materialet ikke kan avgjøre.

**Teknisk publisering:** De offentlige rutene, oppgavemotoren, kildeverkstedet, lokal framdrift og kapittelnavigasjonen er grønne i sluttkontrollen. Ingen ny database, autentisering, analyse, informasjonskapsel, elevregistrering, PDF, bilde eller ekstern datalagring er innført.

**Viktig avgrensning:** Dette er ikke en full hjelpemiddelgaranti. Reell skjermleser- og annen assistiv-teknologitest ble ikke gjennomført i dette miljøet. Den åpne risikoen står derfor fortsatt i veikartet. Det er heller ikke mulig å gi en uavhengig visuell vurdering av lokale Word-ressurser før dokumentgjengivelse er tilgjengelig.

## Hva som er kontrollert

Kontrollen omfattet:

- kapittelplan, kildematrise, innholdsmodell, kapittelside og felleskomponenter
- kilde-ID-er, kildekoblinger, bibliografiske metadata, tilgang og rettighetsnotater
- fakta → forståelse → lange linjer, oppgaveformuleringer og svarlekkasje
- kildeverkstedets observasjon, kontekst, påstandsvurdering, sammenstilling, konklusjon og revisjon
- koblingen mellom 2.2 og 2.3, global tidslinje, begrepsbank, lærerinngang og repetisjon
- server-rendering, produksjonsbuild, tastatur-/fokuslogikk i komponenttestene og lokal nettleserrespons
- mobilbredder 320 px og 375 px samt desktopbredde 1280 px

Funn i rapporten er delt i tre nivåer:

- **Kontrollert:** direkte bekreftet i kilde, kode, test eller produksjonskjøring.
- **Rimelig tolkning:** en faglig eller teknisk vurdering som modellen støtter, men som ikke bør presenteres som et direkte funn.
- **Uavklart:** ikke etterprøvd i dette miljøet eller begrenset av kildetilgangen.

## Vesentlige funn og rettinger

| Alvor | Kontrollert funn | Gjennomført retting |
|---|---|---|
| Vesentlig | K-07 hadde feil volum- og sidetall: 29, s. 1–58. | Rettet til Green (2021; publisert online 2020), Journal of Archaeological Research 29, s. 153–202. |
| Mindre | K-11 manglet full forfatterliste i innholdsmodellen og verkstedkrediteringen. | Rettet til Sandweiss, Shady Solís, Moseley, Keefer og Ortloff (2009). |
| Vesentlig | Fasitplassering og svarlengde gjorde flere av 2.3s flervalgsoppgaver gjetbare. | Alternativene er skrevet om uten innholdstomme distraktorer, og fasitene er flyttet og balansert. |
| Vesentlig | Kildeverkstedet hadde skjev klassedeling og et mulig diagonalsignal. | Åtte påstander er fordelt med nøyaktig to i hver kategori, og etiketter/påstander stokkes uavhengig. |
| Vesentlig | Endring av en påstand etter modellrespons beholdt forklaring og muliggjorde videreføring uten ny kontroll. | Endring nullstiller responsen til idle, skjuler forklaringen og krever ny vurdering. |
| Mindre | Tidslinjens introduksjon var skrevet som om bare jordbruksrevolusjonen var med. | Introduksjonen sier nå at alle publiserte kapitler samles automatisk. |
| Vesentlig | Læreverkoversikten beholdt tre kolonner på smale skjermer og fikk horisontal overflyt. | chapter-grid går til én kolonne under 680 px. |
| Mindre | Flere oversiktskort brukte h3 direkte under sidens h1. | Oversiktskort, begrepskort og tidslinjepunkter bruker h2; stilene er beholdt. |
| Mindre | Begrepsbanken brukte selve begrepet som React-nøkkel. «Periodisering» finnes i begge kapitlene. | Nøkkelen er nå kapittel-ID + begrep. Nettleseradvarselen for duplisert nøkkel forsvant. |
| Prosess | Korrigert kildeinformasjon hadde fortsatt 25. august som kapitlets siste kontroll. | Kapittel 2.3, verkstedet, planen og kildematrisen er datostemplet 26. august 2026. |

## Faglig vurdering

### Kontrollert

- Kapitlet bruker tre avgrensede case: urbane prosesser i sørlige og nordlige Mesopotamia, Mohenjo-daro/Indusdalen og Caral-Supe/Supe-dalen.
- Arbeidsbegrepet by er en analytisk definisjon basert på konsentrasjon av mennesker, aktiviteter og/eller institusjoner og virkninger for et omland. Det presenteres ikke som en universell innbyggertallgrense.
- Mesopotamia fremstilles med både sørlige og nordlige prosesser. McMahon og Ur brukes til å unngå en enkel sør → nord-fortelling; Uruk, monumenter, produksjon og registrering beskrives som spor som kan støtte flere modeller.
- Mohenjo-daro fremstilles gjennom dokumenterte hus, kvartaler, gater, brønner, bad-/vaskeplattformer og dreneringsspor. Drenering brukes ikke som bevis for god helse for alle, én hersker eller egalitær styring.
- «Priest-king» behandles som eldre eller omstridt tolkning. Fravær av palass behandles ikke som bevis for fravær av maktforskjeller.
- Caral-Supe fremstilles gjennom plattformhauger, nedsenkede sirkulære plasser, flere urbane steder og en ressurskombinasjon med marine ressurser, irrigasjon og planteproduksjon.
- Miljøendring i Supe-området er merket som mulig bidrag/hypotese, ikke som én nødvendig kollapsårsak.
- Sammenligningen beskriver likheter og brudd uten rangering av «først», «mest avansert» eller «mest sivilisert».

### Rimelig tolkning

Kapitlets hovedpåstand er en faglig syntese: Tidlige bysamfunn kunne oppstå gjennom ulike kombinasjoner av ressurser, mennesker, institusjoner og praksiser. Materialet gjør denne sammenligningen rimelig, men kan ikke bevise én global utviklingskjede eller én politisk forklaring.

### Uavklart eller uttrykkelig begrenset

- Eksakte befolkningstall, arbeidsforhold, sosial ulikhet, religion, kjønn, politiske rettigheter og helseeffekt er ikke rekonstruert automatisk fra arkitektur.
- K-10 og K-12 er støtte- og kontrollspor basert på metadata/sammendrag, ikke eneste grunnlag for sentrale politiske eller økonomiske påstander.
- K-11 har åpen fulltekst via PMC, men ingen åpen lisens registrert i Crossref. Tilgang er ikke det samme som generell gjenbrukstillatelse.
- Kildene avgjør ikke om likhet mellom case skyldes kontakt, parallelle løsninger eller andre forhold.

## Kilde- og rettighetskontroll

Detaljert påstandsmatrise står i [kildematrise for kapittel 2.3](kildematrise-2.3.md). Følgende er sluttstatusen for de tolv kildeoppføringene:

| ID | Kontroll og bruk | Tilgang/rettighet |
|---|---|---|
| K-01 | Udir, gjeldende HIS01-03-kompetansemål; brukes til kompetansekobling, ikke historisk dokumentasjon. | Offentlig institusjonell referansekilde; korte nødvendige målhenvisninger. |
| K-02 | Fernández-Götz og Smith (2024), komparativ oversikt; fulltekst lest og brukt for bybegrep/sammenligning. | CC BY 4.0; egen norsk parafrase; tredjepartsmateriale kan ha egne vilkår. |
| K-03 | McMahon (2020; online 2019), Early Urbanism in Northern Mesopotamia; fulltekst lest. | CC BY 4.0; egen parafrase, ingen figurer. |
| K-04 | Ur (2014), hushold og byenes framvekst; fulltekst lest og brukt som modell/debatt. | Cambridge terms-felt; ingen dokumentert åpen gjenbrukslisens. |
| K-05 | Emberling (2015), bokkapittel; metadata og sammendrag brukt som støtte/kontroll, ikke alene. | Cambridge terms-felt; referansebruk og egen parafrase. |
| K-06 | UNESCO om Archaeological Ruins at Moenjodaro; stedstrekk og begrensninger. | CC-BY-SA IGO 3.0 for stedbeskrivelsen; ingen UNESCO-/NHK-medier kopiert. |
| K-07 | Green (2021; online 2020), Killing the Priest-King; fulltekst lest; drenering og prestekonge-debatt. | Artikkelen er CC BY 4.0; ingen figurer kopiert, tredjepartsfigurer må vurderes separat. |
| K-08 | Green (2022), Of Revenue Without Rulers; fulltekst lest; offentlig infrastruktur som fortolkende debatt. | CC BY 4.0; ingen bilder/figurer kopiert, tredjepartsvilkår gjelder ved behov. |
| K-09 | UNESCO om Sacred City of Caral-Supe; arkitektur, urbane steder og tidsramme. | CC-BY-SA IGO 3.0 for stedbeskrivelsen; ingen medier kopiert. UNESCOs «stat/sivilisasjon» er merket som kategori. |
| K-10 | Shady Solís, Haas og Creamer (2001), radiokarbondatering; støtte/kontroll. | Ingen åpen lisens registrert i Crossref; ingen tekst, tabell eller figur kopiert. |
| K-11 | Sandweiss, Shady Solís, Moseley, Keefer og Ortloff (2009); fulltekst lest; ressurser og miljøhypotese. | Fulltekst via PMC, men ingen åpen lisens registrert i Crossref; egen parafrase, ingen figurer. |
| K-12 | Haas, Creamer og Ruiz (2004), regional kronologistudie; støtte/kontroll. | Springer TDM-felt, ikke generell åpen gjenbrukslisens; ingen kopiering. |

Ingen kilde er brukt som om Crossref alene dokumenterer en historisk påstand. Ingen bilder, kart, videoer, figurer eller PDF-er er hentet inn i public/. Alle kildehenvisninger i modellen bruker HTTPS, kilde-ID og rettighetsnotat.

## Pedagogisk kontroll

Kapitlet følger progresjonen:

1. fakta: case, perioder, ressurser, spor og begreper
2. forståelse: omland, koordinering, mulige årsaker/følger, brudd og kontinuitet
3. lange linjer: demografi, ressurser, handel, kulturmøter, makt og religion/identitet
4. kildearbeid: observasjon → kontekst → vurdering → sammenstilling → konklusjon → revisjon

Kildeverkstedet har tre tekstlige materialer og åtte påstander. Materialene har dokumenterte beskrivelser før tolkning; elevens konklusjon må bruke minst to spor, avgrense påstanden og nevne en begrensning. Modellresponsen vises først etter elevens eget meningsfulle svar.

### Svarlekkasje før og etter

Målingen gjelder de ti flervalgsoppgavene i kapittel 2.3.

| Mål | Før retting | Etter retting |
|---|---:|---:|
| Fasitposisjon 0 / 1 / 2 / 3 | 2 / 7 / 1 / 0 | 3 / 2 / 2 / 3 |
| Fasit er lengste alternativ | 7 av 10 (70 %) | 1 av 10 (10 %) |
| Fasit er korteste alternativ | 1 av 10 (10 %) | 0 av 10 |
| Største svarlengdespredning i én oppgave | 95,9 % | 22,7 % |
| Alternativer med minst to hedgede formuleringer | ikke balansert | alle oppgavene |
| Rekkefølgeoppgaver med fasit lik visningsrekkefølge | kontrollert i regresjon | 0 |
| Koble-/sorteringsoppgaver med fasit på diagonalen | ikke brukt som sikkerhetskrav | ikke full diagonal |

Kildeverkstedets klassifisering gikk fra skjev fordeling til nøyaktig direct 2, possible 2, too-strong 2 og cannot-determine 2. Påstandene og klassene stokkes uavhengig, slik at rekkefølge ikke avslører fasit.

## Tverrkapitlig stresstest: 2.2 ↔ 2.3

- 2.2 er fortsatt nødvendig forkunnskap om lagring, bofasthet, arbeidsdeling, matstrategier, brudd/kontinuitet og kildebegrensning.
- 2.3 gjentar ikke 2.2 som ny regional dokumentasjon; det aktiverer 2.2 og løfter begrepene til urbane prosesser.
- Forrige/neste-navigasjonen binder 2.2 og 2.3 sammen i samme hovedområde.
- Global tidslinje henter de fem nye 2.3-punktene fra modellen og viser til sammen tolv punkter fra de to publiserte kapitlene.
- Begrepsbanken henter begge kapitlene, men viser samme term fra hvert kapittel med unik nøkkel.
- Lange linjer og lærerinngang er datadrevne og viser koblingene uten å lekke lokal lærerfasit til elevsiden.
- Oppgave-, verksted- og repetisjons-ID-er bruker kapittelbevisst lokal lagring. Versjon, ugyldig data og sletting er testet; ingen elevsvar sendes eksternt.
- Nye kapitler kan legges til i innholdsmodellen uten manuell navigasjonsliste.

## Tilgjengelighet og nettleser

### Kontrollert i produksjonsserver

Nio offentlige ruter ble kontrollert ved 320, 375 og 1280 px: 27 av 27 kombinasjoner var grønne.

Kontrollen fant:

- ingen horisontal overflyt
- innhold og én h1 på alle ruter
- ingen overskriftshopp i DOM-rekkefølgen
- ingen manglende interne ankere
- ingen dupliserte DOM-ID-er
- ingen applikasjons- eller konsollfeil
- ingen eksterne bilde-, video-, iframe- eller lydressurser
- begge kapittelsider med innhold, kildevisning og intern navigasjon på alle bredder

Rutinene omfatter forside, læreverk, lange linjer, begreper, tidslinje, lærerside, om-side, 2.2 og 2.3. Isolerte PNG-skjermbilder for begge kapitler og alle tre bredder ble produsert under nettleserkontrollen.

### Kontrollert i tester

Komponenttestene dekker hopp-lenke, synlig fokus, redusert bevegelse, statusregion, første feil, hint, nytt forsøk, åpne svar, modellrespons, kildeverkstedets fokusflytting, tastatur/status og lokal sletting.

### Uavklart

Den anbefalte agent-browser-integrasjonen var ikke tilgjengelig i miljøet, og den innebygde nettleserklienten avsluttet med Windows sandbox-feil. Derfor ble sluttkontrollen gjort med isolert, lokal headless Chrome mot produksjonsserveren. Det ble ikke lest cookies, localStorage eller innlogget nettlesertilstand. En reell skjermleser må fortsatt kjøres av menneske/CI med riktig hjelpemiddel.

## Kvalitetsporter

- npm run typecheck: bestått.
- npm run lint: bestått.
- npm test: bestått.
  - produksjonsbuild med Next.js 16.3.2: bestått
  - 7 testfiler, 66 enhetstester: bestått
  - 7 server-renderingstester: bestått
- npm audit --omit=dev: 0 sårbarheter.
- npm audit: én kjent lav sårbarhet i dev-avhengigheten @babel/core ≤ 7.29.0, GHSA-4x5r-pxfx-6jf8, med tilgjengelig npm audit fix. Den er ikke automatisk oppgradert fordi dette ligger utenfor innholdsrevisjonen.
- git diff --check: bestått før levering.
- Ingen push, PR, deploy eller ekstern publisering er utført.

## Endrede nøkkelfiler

- app/tidslinje/page.tsx: tidslinjeintro.
- app/laereverk/page.tsx, app/lange-linjer/page.tsx, app/om/page.tsx, components/GlossaryExplorer.tsx og app/globals.css: mobilbredde, headingstruktur og styling.
- components/SourceWorkshop.tsx: ny kontroll etter endret påstand.
- content/chapters.ts: 2.3-alternativer, workshopbalanse, kilde-/forfattermetadata og lastChecked.
- docs/kildematrise-2.3.md og docs/kapittelplan-2.3.md: K-07/K-11 og kontrollstatus.
- docs/veikart.md: sluttstatus, testtall og åpne risikoer.
- tests/chapter-2-3.test.ts, tests/source-workshop.test.tsx og tests/rendered-html.test.mjs: regresjons-, balanse-, tilstands- og tidslinjetester.
- docs/faglig-revisjon-2.3.md: denne uavhengige sluttrapporten.

## Residuale risikoer

1. Ekte skjermleser/hjelpemiddeltest gjenstår.
2. Lokale Word-ressurser er ikke visuelt gjengitt og kontrollert.
3. Full npm audit har fortsatt én lav dev-avhengighetsadvarsel i @babel/core.
4. K-10 og K-12 er kontrollspor; de skal ikke senere brukes som eneste grunnlag for nye sentrale tolkninger.
5. Når flere kapitler kommer til, bør tverrkapitlig søk, begrepsduplikater, ytelse og lokal lagringsisolasjon stresstestes videre.

Ingen av de fem risikoene innebærer at en sentral kilde for dagens kapittel er uverifisert eller at en kjent materialfeil står igjen i den publiserte avgrensningen.
