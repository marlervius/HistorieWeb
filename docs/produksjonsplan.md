# Produksjonsplan for komplett Vg2-bok

**Status:** Bindende redaksjonell og teknisk gjennomføringsplan

**Sist revidert:** 28. august 2026

**Utgangspunkt:** Kapittel 2.2 og 2.3 er publisert og kvalitetssikret. P01: 1.1 har R1; femten øvrige planlagte kapitler gjenstår på R0.

Planen omsetter [helhetsplanen](./helhetsplan-vg2.md) og [kompetansematrisen](./kompetansematrise-vg2.md) til leveranser. Den autoriserer ikke implementering av flere kapitler i samme arbeidsøkt. Hvert kapittel skal gjennom hele løpet nedenfor, godkjennes som en selvstendig leveranse og få én lokal commit før neste kapittel starter.

## 1. Styrende produksjonsprinsipper

1. **Kildegrunnlag før tekst.** Ingen kapitteltekst produseres før forhåndsstudie, kildematrise, rettighetsstatus og uavhengig kildekontroll har nådd R1.
2. **Fakta før forståelse før lange linjer.** Hvert kapittel bygger først et sikkert orienteringsgrunnlag, deretter forklaring og kildearbeid, og til slutt kobling til tidligere kapitler.
3. **Ett kapittel om gangen.** Felles research kan kartlegges på tvers, men tekst, oppgaver, lærerstoff, testing og commit skal lukkes per kapittel.
4. **Eksisterende kvalitet bevares.** Kapittel 2.2 og 2.3 renummereres eller omskrives ikke for å passe planen. 2.1 fyller det reelle nummerhullet.
5. **Globalt, norsk og samisk i samme bokarkitektur.** Norge og Sápmi plasseres der de er faglig relevante, særlig i 4.2, 5.1, 6.1 og 6.2, og kobles til globale prosesser uten å bli sidebokser.
6. **Ingen automatisk utviklingsstige.** Sammenhenger uttrykkes med dokumentert styrke; «kan», «mulig» og «bidro til» brukes når materialet ikke støtter en nødvendig årsakskjede.
7. **Ingen publisering som sideeffekt.** Godkjent lokal commit er leveransens slutt. Push, pull request, sammenslåing og deploy krever en ny, uttrykkelig beslutning.

## 2. Fast leveranseløp for hvert kapittel

Rekkefølgen er obligatorisk. En port kan sende kapitlet tilbake til et tidligere trinn.

### Trinn 1 – forhåndsstudie og kildematrise

Leveranser:

- avgrenset tidsrom, regioner, aktører og hovedspørsmål;
- historiografisk orientering med uenighet og usikkerhet;
- balanseanalyse: globalt, Norge, Sápmi, kjønn, sosial posisjon og berørte aktører der det er relevant;
- kildematrise som skiller primærkilde, forskning, oppslagskilde og undervisningsressurs;
- påstand–kilde-kobling for alle bærende faglige påstander;
- registrert lisens, kreditering, filstatus og `lastChecked` for medier og nettressurser;
- notat om hva kildene ikke kan bevise.

**Port R1:** Fagredaktør bekrefter at spørsmålet kan besvares uten kildefyll, anakronismer eller oppdiktede detaljer. Teknisk produkteier bekrefter at tenkte medier faktisk kan publiseres eller erstattes av tekstlig læringsdesign.

### Trinn 2 – kildeverksted og oppgaver

Kildeverkstedet designes før brødteksten, slik at kildene styrer undersøkelsen i stedet for å bli pynt etterpå.

Leveranser:

- ett sentralt kildeverksted med en relevant og variert kildetype;
- tydelig skille mellom funn, tolkning og begrensning;
- oppgaveprogresjon fra fakta via forståelse til selvstendig anvendelse;
- minst én blandet repetisjonsoppgave fra et eldre kapittel når dette finnes;
- hint etter første feil og forklaring eller modellrespons ved nytt forsøk;
- vurderingskriterier som belønner belegg, kontekst, usikkerhet og motargument;
- tastaturlogikk, ledetekster, feilmeldinger og skjermleserrekkefølge beskrevet før implementering.

**Pedagogisk port:** Oppgavene viser de I/Ø/A/S-handlingene som kompetansematrisen krever. De kan ikke bestås bare ved å gjette, kopiere én setning eller huske en løs detalj.

### Trinn 3 – kapitteltekst

Teksten produseres mot godkjent kildematrise og oppgavedesign.

Leveranser:

- tydelig inngangsspørsmål, læringsmål og kronologisk/romlig orientering;
- faktagrunnlag før forklaring og forklaring før lange linjer;
- eksplisitt årsaksresonnement som skiller forutsetning, utløsende faktor, virkning og samtidig forhold;
- flere aktører og perspektiver uten falsk balanse;
- markering av tolkning, usikkerhet og kildebegrensning;
- begreper, tidslinjepunkter og bidrag til lange linjer gjennom den autoritative innholdsmodellen;
- ingen påstand, sitat, kilde, bilde, kart eller lisens som ikke finnes i godkjent grunnlag.

**Redaksjonell port:** Historiker og læreplanansvarlig godkjenner sammenheng, presisjon, representasjon, språk og progresjon. Vesentlige tekstendringer etter denne porten utløser ny kontroll av berørte kilder og oppgaver.

### Trinn 4 – lærerressurser

Leveranser:

- kort didaktisk oversikt med hva som er nødvendig forkunnskap;
- forslag til tidsbruk og minst én kort og én utvidet undervisningssti;
- modellresponser og kjennetegn på kvalitet;
- typiske misoppfatninger, blant annet lineære eller eurosentriske slutninger;
- tilrettelegging som bevarer det faglige målet;
- forslag til muntlig, skriftlig og praktisk elevaktivitet;
- fasit der det finnes et avgrenset svar, og vurderingsstøtte der svaret er åpent;
- eventuelle PDF-er bare når filen finnes og er faglig, rettighetsmessig og visuelt kontrollert.

**Lærerport:** Ressursene gjør kapittelet brukbart uten at læreren må rekonstruere kildegrunnlag, hensikt eller vurderingskriterier.

### Trinn 5 – testing og uavhengig kildekontroll

Kontrollen utføres av en annen vurderingsrolle enn hovedforfatterrollen. Den kan være en fagperson eller en eksplisitt uavhengig revisjonsøkt, men skal ikke bare godkjenne forfatterens konklusjoner.

Obligatorisk kontroll:

- alle bærende påstander spores tilbake til kildematrisen;
- primærkilder leses i kontekst, og oversettelser og utdrag merkes;
- nettlenker, lisensvilkår, kreditering og `lastChecked` kontrolleres på nytt;
- kompetansematrisens plasseringer finnes i faktiske elevhandlinger;
- begreper, tidslinje, lange linjer, internlenker og kildevisning fungerer;
- oppgaver fungerer med tastatur og skjermlesersemantikk og gir riktig hint- og forklaringsløp;
- mobilbredde 320 og 375 piksler og relevant stor skjerm kontrolleres;
- fokusmarkering, kontrast, zoom og redusert bevegelse vurderes;
- ingen persondata, analysedata eller elevsvar sendes eksternt;
- `npm run typecheck`, `npm run lint` og `npm test` er grønne; `npm test` omfatter produksjonsbuild og server-renderingstester.

**Port R2:** Kapittelet er implementert og sporbart, men ikke redaksjonelt lukket før avvik er rettet og regresjonskontroll er grønn.

### Trinn 6 – lokal commit

Før commit:

1. kontroller at diffen bare inneholder det godkjente kapitlet og nødvendige styringsdata;
2. dokumenter antall og type tester, manuelle kontroller og eventuelle kjente begrensninger;
3. bekreft at kildematrisen har ny kontroll-dato;
4. bekreft at ingen manglende PDF eller mediefil har fått synlig lenke;
5. bruk en presis commit-melding for kapittelleveransen.

**Port R3:** En uavhengig faglig kontroll er godkjent, testene er grønne, og det finnes én ren lokal commit. Ingen push eller deploy utføres.

## 3. Kildemodenhet

| Nivå | Betydning | Tillatt handling |
|---|---|---|
| R0 – retning | Tema, mulige case og første kilder er identifisert | Planlegging og kildesøk; ingen kapitteltekst |
| R1 – produksjonsklart grunnlag | Forhåndsstudie, kildematrise, påstandskobling og rettigheter er kontrollert | Kildeverksted, oppgaver og tekst kan produseres |
| R2 – implementert og sporbart | Kapittel, kildevisning, oppgaver og lærerstoff er implementert og testet | Uavhengig sluttkontroll og feilretting |
| R3 – godkjent leveranse | Uavhengig kontroll og alle porter er lukket i én lokal commit | Kapittelet kan inngå i en senere godkjent utgivelse |

Kapittel 2.2 og 2.3 regnes som R3 ut fra eksisterende revisjonsrapporter. P01: 1.1 er løftet til R1 – produksjonsklart grunnlag – etter godkjent kildekontroll 28. august 2026; øvrige planlagte kapitler starter på R0. Et R0-eksempel i helhetsplanen er en kildeinngang, ikke et løfte om at kilden er tilstrekkelig eller publiserbar.

## 4. Prioritert rekkefølge for de seksten leveransene

| Prioritet | Kapittel | Hvorfor nå | Viktigste avhengighet før tekst | Ferdig når |
|---:|---|---|---|---|
| P01 | 1.1 Hva kan vi vite om fortiden? | Et felles språk for spørsmål, materiale, funn, tolkning og begrensning reduserer støttebehovet i alle senere kapitler. | Kildesett som dekker materiell, skriftlig, visuell og kvantitativ dokumentasjon | KM2 er introdusert gjennom en faktisk undersøkelse; R3-port lukket |
| P02 | 1.2 Hvem deler inn fortiden? | Gir eleven verktøy til å utfordre bokas egen kronologi før flere perioder bygges ut. | Kontrollerte periodeinndelinger fra arkeologi, historie og ulike regioner | Eleven kan lage og vurdere alternative periodiseringer; R3 |
| P03 | 1.3 Hvordan lever fortiden? | Løser det tydeligste metodegapet rundt minne og historiebruk og forbereder 6.1. | Ett lokalt og ett nasjonalt, dokumenterbart minnecase | KM1 og KM4 er introdusert uten å blande minne og fortid; R3 |
| P04 | 2.1 Før jordbruket | Fyller nummerhullet og hindrer at boka begynner med en mangelbasert framstilling av jeger- og sankersamfunn. | Forskning som viser variasjon, mobilitet, kunnskap og naturbruk | Kapittelet leder presist inn i eksisterende 2.2 uten å kreve omskriving; R3 |
| P05 | 3.1 Imperier og statsdannelse | Utvider maktanalysen etter bysamfunn og etablerer komparativt arbeid. | Sammenlignbart materiale om Assyria, akamenideriket og Kush | Eleven vurderer maktmidler og legitimering i mer enn ett imperium; R3 |
| P06 | 3.2 Demokrati og deltakelse | KM8 mangler helt og må få både antikk og nåtid i samme analyse. | Antikke kilder i kontekst og oppdatert, autoritativ framstilling av norsk demokrati | Eksplisitt sammenligning av muligheter og utestengning; R3 |
| P07 | 3.3 Nettverk i antikken | Gir global bredde og forbereder middelalderens handelsverdener uten Silkevei-snarveier. | Kilder fra flere knutepunkter, ikke én sentral fortelling | Aktørbasert nettverksanalyse med regional variasjon; R3 |
| P08 | 4.1 Religion som samfunnsmakt | Introduserer tidsrommet og begrepene som KM10 og KM11 krever. | Sammenlignbare kilder fra bysantinske, islamske og latinkristne samfunn | Religion behandles som praksis, institusjon og legitimering; R3 |
| P09 | 4.2 Norge og Sápmi i middelalderen | Gir nødvendig norsk og samisk forankring før stat og reformasjon. | Samisk arkeologi og historie sammen med norske lover og maktkilder | Flere samtidige maktsentre og aktørperspektiver er dokumentert; R3 |
| P10 | 4.3 Middelalderens handelsverdener | Lar eleven anvende KM7 og KM9 selvstendig i et genuint globalt sammenligningskapittel. | Kildegrunnlag fra Kilwa, transsahariske nettverk, mongolske forbindelser og Bergen | Økonomiske systemer og menneskelige virkninger sammenlignes; R3 |
| P11 | 4.4 Svartedauden | Samler demografi, nettverk, årsak og maktforskyvning før tidlig nytid. | Oppdatert pestforskning og kilder som viser regionale forskjeller | Eleven bygger en kildebasert årsaksmodell uten én enkel forklaring; R3 |
| P12 | 5.1 Reformasjon og statsbygging | Fortsetter KM10 og KM11 og gir nødvendig overgang til dansk-norske maktforhold. | Lov-, brev- og kirkehistoriske kilder med tydelig kontekst | Endring og kontinuitet i legitimering vurderes; R3 |
| P13 | 5.2 Havene bindes sammen | Globaliserer tidlig nytid gjennom urfolks-, afrikanske og asiatiske aktører, ikke bare europeiske sjømakter. | Flerstemmige kilder om kontakt, oversettelse, vold og handel | Kulturmøter analyseres fra flere handlende posisjoner; R3 |
| P14 | 5.3 Sølv, tvangsarbeid og handelskompanier | Er bokas første store syntese av ressursbruk, økonomi, demografi, handel og makt. | Sammenkoblet grunnlag fra Potosí, Atlanterhavet, Manila og dansk-norske forbindelser | Flere kompetansemål anvendes og syntetiseres selvstendig; R3 |
| P15 | 6.1 Hvem eier fortellingen? | Gjør minne og historiebruk til selvstendig elevundersøkelse etter at boka har gitt historisk bredde. | Kontrollerte lokale og nasjonale case med synlige alternative fortellinger | Eleven dokumenterer en historiebruksanalyse; R3 |
| P16 | 6.2 Religion, makt og identitet | Avslutter Vg2-målene med lang tidsdybde fram til vår tid og samler identitet, deltakelse og legitimering. | Kilder som muliggjør sammenligning fra middelalder til nåtid uten å skrive Vg3-pensum | KM11 anvendes og bokas lange linjer syntetiseres; R3 |

Rekkefølgen er valgt ut fra pedagogiske avhengigheter, ikke bare kronologi. Endring krever en dokumentert vurdering av påvirkningen på kompetansematrisen, repetisjonen og kildeberedskapen.

## 5. Produksjonskort for hvert kapittel

Før arbeid starter, kopieres denne sjekklisten inn i kapittelets arbeidsnotat:

### Fag og læreplan

- [ ] Kapittelspørsmål, tidsrom, regioner og avgrensning er godkjent.
- [ ] I/Ø/A/S-krav og relevante lange linjer er identifisert.
- [ ] Global, norsk og samisk relevans er vurdert eksplisitt, også når et perspektiv ikke er faglig relevant.
- [ ] Brudd, kontinuitet, variasjon og kildeusikkerhet er planlagt.

### Kilder og medier

- [ ] Kildematrisen skiller primærkilde, forskning, oppslagskilde og undervisningsressurs.
- [ ] Alle bærende påstander har kildegrunnlag.
- [ ] Rettighet, kreditering, lokal filstatus og `lastChecked` er registrert.
- [ ] Illustrasjoner har en definert læringsfunksjon og alternativ tekst.
- [ ] En uavhengig kontrollør har prøvd å falsifisere eller avgrense sentrale påstander.

### Læring og tilgjengelighet

- [ ] Oppgaver følger fakta → forståelse → lange linjer.
- [ ] Kildeverkstedet skiller funn, tolkning og begrensning.
- [ ] Første feil gir hint; nytt forsøk gir forklaring eller modellrespons.
- [ ] Tastatur, fokus, skjermleserrekkefølge, zoom og mobilbredde er kontrollert.
- [ ] Lærerressurser inneholder tidsvalg, misoppfatninger og vurderingsstøtte.

### Teknikk, personvern og leveranse

- [ ] Nytt kapittel kommer fra innholdsmodellen uten manuell navigasjonsendring.
- [ ] PDF-lenker vises bare for filer som finnes og er godkjent.
- [ ] Ingen database, konto, analyseverktøy, informasjonskapsel eller ekstern elevlogging er innført.
- [ ] Typekontroll, lint, produksjonsbuild, enhetstester og server-renderingstester er grønne.
- [ ] Diffen er avgrenset, og leveransen er samlet i én lokal commit uten push.

## 6. Tverrgående kontroller uten fler-kapittelimplementering

Noe arbeid må ses på tvers av boka, men skal ikke brukes som begrunnelse for å levere store pakker:

- **Etter del 1:** Kontroller at metodebegrepene brukes konsekvent i 2.2 og 2.3 uten å omskrive kvalitetssikret tekst unødvendig.
- **Etter del 2:** Kontroller nummerering, overgang 2.1 → 2.2 → 2.3 og blandet repetisjon.
- **Etter del 3:** Revider progresjonen i sammenligning, maktanalyse og global representasjon.
- **Etter del 4:** Kontroller eksplisitt KM10-progresjon, samisk representasjon og middelalder–tidlig nytid-overgangen.
- **Etter del 5:** Kjør første fullstendige dekningstest av alle elleve kompetansemål og sju lange linjer.
- **Etter del 6:** Gjennomfør helbokrevisjon, reell hjelpemiddeltest, nettleser- og mobilmatrise, personvern- og sikkerhetskontroll, metadata- og ytelseskontroll og publiseringsbeslutning.

Tverrgående research kan samle mulige kilder og avdekke avhengigheter. Ingen kilde blir likevel R1 for et kapittel før den er vurdert i det kapittelets konkrete påstandsmatrise.

## 7. Definisjon av en komplett lokal bok

Boka er komplett lokalt når:

- alle 18 kapitler er R3 og finnes i den autoritative innholdsmodellen;
- alle elleve kompetansemål har dokumentert I, Ø, A og S i flere kapitler;
- alle kapitler har relevant kildeverksted, oppgaver og lærerressurser;
- de sju lange linjene kan følges gjennom minst fire faglig relevante steder, med synlige brudd og variasjoner;
- blandet repetisjon henter fra hele boka og gir redigert faglig tilbakemelding;
- internlenker, kildevisning og bare eksisterende PDF-er fungerer;
- full testpakke og manuell tilgjengelighetskontroll er grønne;
- ingen persondata sendes eksternt og ingen ikke-godkjent sporing finnes;
- helbokas faglige og redaksjonelle sluttkontroll er dokumentert.

Dette er ikke automatisk en offentlig utgivelse. Ekstern publisering krever i tillegg uttrykkelig godkjenning, produksjonsmiljøkontroll, reell test med relevante hjelpemidler og nettlesere, sikkerhetsgjennomgang, kontroll av metadata, `sitemap` og `robots`, og måling av ytelse mot avtalte terskler.

## 8. Neste konkrete leveranse

**P01: 1.1 «Hva kan vi vite om fortiden?» har R1 – produksjonsklart grunnlag – godkjent 28. august 2026.**

R1-leveransen har avgrenset fire kildetyper, etablert påstand–kilde-matrise, formulert et besvarbart kapittelspørsmål, dokumentert kildebegrensninger/rettigheter/lastChecked, levert to uavhengige reviewer-spor og gjort Q-01 reproduserbar uten persondata.

Neste arbeidsøkt kan starte R2: implementering av kapitteltekst, kildeverksted og oppgaver etter en egen arbeidsbeslutning. R3 er ikke påstått; teknisk og pedagogisk sluttkontroll gjenstår.
