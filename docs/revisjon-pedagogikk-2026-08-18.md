# Pedagogisk revisjon · kapittel 2.2 Jordbruksrevolusjonen

**Dato:** 18. august 2026
**Grunnlag:** `docs/kvalitetsstandard.md`, `docs/produktstrategi.md`, `content/chapters.ts`, `components/InteractiveTasks.tsx`, `app/laereverk/[section]/[chapter]/page.tsx`, `app/laerere/page.tsx`, de tre lokale Word-filene i repo-roten, samt reell gjennomgang i nettleser (`npm run dev`, viewport 320 / 375 / 640 px).
**Avgrensning:** Faktakontroll er ikke gjort i denne kjøringen. Innholdet er forutsatt faglig korrekt. Ingen prosjektfiler er endret; denne rapporten er eneste nye fil.

---

## 1. Sammendrag

Kapitlet holder standarden på **innhold, kildeforbehold, språk og teknisk tilgjengelighet**, men ikke på **oppgavekvalitet og gjenhentingsmekanikk** — som er de to punktene produktstrategien selv setter høyest (prinsipp 3).

Den alvorligste enkeltfeilen er målbar: i **alle 13 flervalgsoppgavene er det riktige alternativet det lengste**, og i 12 av 13 er det eneste alternativ uten et absolutt ord (*alltid, alle, aldri, bare, ingen, automatisk*). En elev som ikke har lest kapitlet, men kjenner disse to prøvestrategiene, får 13 av 13 riktig. Oppgavene måler dermed i stor grad prøveteknikk, ikke historiefaglig kunnskap. I tillegg røper minst 8 av 19 hint hvilket alternativ som er riktig, og ingen «explanation» forklarer hvorfor et bestemt galt alternativ er galt.

Læringsreisen har alle ledd standarden krever, men de er **sekvensielle bokser, ikke et kretsløp**: første gjenhentingsforsøk kommer etter 21 skjermhøyder lesing på mobil (53 % ned på siden). Repetisjonsplanen kan ikke gjennomføres — fullførte oppgaver viser fortsatt elevens forrige svar og forklaringen, og det finnes ingen nullstilling. Egenvurderingen lagres ikke og kan ikke kalibrere noe.

Kort svar: **innholdet holder standarden, øvingsdelen gjør det ikke.**

---

## 2. Det som fungerer

Dette er ikke høflighetsfraser. Punktene under er kontrollert i kode eller nettleser.

1. **Kildeforbeholdet er gjennomført, ikke pyntet på.** «kunne» forekommer 18 ganger mot «ble» 13 ganger i fagteksten. `sourceLooks` har et eget `cannotProve`-felt som tvinger redaksjonen til å skrive ned kildens grense. Avsnittet «Men overskudd førte ikke automatisk til byer eller stater … Utviklingskjeden er en historisk mulighet, ikke en naturlov» er sjelden god fagdidaktikk i et VG2-verk, og L1 gjentar forbeholdet i oppgavens egen forklaring.
2. **Språket i fagteksten er reelt tilgjengelig.** 793 ord, gjennomsnittlig setningslengde 9–18 ord per avsnitt, kun 2 av 61 setninger over 22 ord, lav nominaliseringstetthet (høyeste er «kunnskap», 5 forekomster). Dette er bedre enn de fleste trykte VG2-verk.
3. **Oppgavetypene er tastaturvennlige av design.** `order` og `match` bruker `<select>` framfor dra-og-slipp. Det er et bevisst og riktig valg: dra-og-slipp er den vanligste tilgjengelighetsfellen i digitale læreverk, og den er unngått her.
4. **Ingen horisontal overflyt.** Kontrollert ved 320, 375 og 640 px (siste tilsvarer 200 % zoom på 1280 px): `scrollWidth === clientWidth`, null elementer utenfor viewport. Produktsignalet om 375 px er innfridd.
5. **Klikkflatene er romslige.** Svaralternativer 238 × 61 px, nedtrekk 238 × 38 px, knapper 87 × 38 px — godt over WCAG 2.2 sitt 24 × 24-krav.
6. **`prefers-reduced-motion`, hopp-lenke, synlig fokusmarkering (3 px) og korrekt overskriftshierarki** (h1 → h2 → h3 → h4 uten hopp) er på plass. Ingen positive `tabindex`-verdier.
7. **Robust lokal lagring.** `isTaskState`-valideringen avviser korrupte data og rydder nøkkelen, og nøkkelen er versjonert per kapittel. Standarden på dette punktet er faktisk innfridd, ikke bare påstått.
8. **U2 («Forutsetning eller følge?») er settets beste oppgave.** Den øver nettopp det historiefaglige skillet standarden etterspør, hintet gir kriteriet uten svarene, og `sort`-formatet passer innholdet.
9. **Innholdsmodellen validerer seg selv.** `getContentModelIssues()` kaster ved bygg hvis en oppgave mangler hint, forklaring eller modellrespons. Det er en reell kvalitetsmekanisme — den fanger bare ikke *kvaliteten* på innholdet i feltene.

---

## 3. Oppgaverevisjon

Poengsum i settet: 27 poeng fordelt på 19 oppgaver. Forkortelser: **D** = distraktorer, **H** = hint, **F** = forklaring, **M** = modellrespons.

| ID | Type / fase | Poeng | Distraktorer | Hint | Forklaring / modell | Dom | Konkret forslag |
|---|---|---|---|---|---|---|---|
| **F1** | choice / Fakta | 1 | Svake. A og D («spise bare planter», «ville dyr forsvant») er ingen reell elevmisoppfatning. C er den eneste plausible. Riktig svar er lengst (12 ord mot 7–8). | **Røper svaret.** «flere generasjoner og både planter og dyr» gjentar riktig alternativ nesten ordrett. | F forklarer begrepet godt, men nevner ikke ett eneste galt alternativ. | **Skrives om** | Bruk lærerveiledningens misoppfatninger som distraktorer: «At mennesker temmet ville dyr og planter i løpet av noen få år», «At planter og dyr endret seg av seg selv i et varmere klima», «At mennesker fanget ville dyr og holdt dem i fangenskap uten at artene endret seg». Nytt hint: «Ett av alternativene beskriver en endring som skjer i artene selv, ikke bare i menneskenes bruk av dem.» |
| **F2** | choice / Fakta | 1 | A treffer en dokumentert misoppfatning («oppfunnet én gang»). C og D er svake. Riktig er lengst. | **Røper svaret.** Å ramse opp fem regioner peker rett på «flere regioner». | Grei, men adresserer ikke A. | **Justeres** | Behold A, bytt C/D mot «Jordbruket spredte seg fra Sørvest-Asia til de andre regionene» (den reelle, halvsanne misoppfatningen) og «Jordbruket oppstod overalt der klimaet ble varmere». Nytt hint: «Ett alternativ handler om spredning fra ett sted, et annet om utvikling flere steder. Hva viser artene?» |
| **F3** | match / Fakta | **4** | Ikke aktuelt, men: nedtrekkene **hindrer ikke gjenbruk** — samme art kan tildeles alle fire regioner (til forskjell fra `order`, som deaktiverer brukte ledd). | Retningsløst: «Tenk på hvilke arter som passer til de ulike lokale miljøene» hjelper ingen som har byttet om Andes og Mesoamerika. | Ingen delrespons: 3 av 4 riktige gir samme generiske hint som 0 av 4. Verifisert i nettleser. | **Skrives om** | Halver poengsummen til 2 (se § 4 B om vekting), deaktiver brukte valg slik `order` gjør, og gi kobling-for-kobling-respons: «Tre av fire stemmer. Se på Andes og Mesoamerika igjen.» Uten delrespons er en 4-poengsoppgave med alt-eller-intet-retting formativt verdiløs. |
| **F4** | order / Fakta | 3 | – | Godt. «Gjentatte valg, ikke ett sprang» gir retning uten rekkefølgen. | Forklarer prosessen. | **Beholdes** | Vurder om 3 poeng er riktig for en oppgave der leddene nesten ordner seg selv kronologisk; 2 er mer dekkende. |
| **F5** | choice / Fakta | 1 | Verst i settet. A og D er åpenbart gale for enhver som har lest overskriften, B er urelatert. Riktig alternativ er 14 ord mot 6–7 og eneste uten «alltid/bare/én». | **Røper svaret.** «Skill mellom tempoet i prosessen og hvor dyptgripende følgene ble» *er* svarets struktur. | God begrepsavklaring, men adresserer ingen distraktor. | **Skrives om** | Distraktorer fra misoppfatningslista: «Fordi endringen skjedde raskt sammenlignet med tidligere perioder i steinalderen» (den faktiske misoppfatningen), «Fordi ordet er brukt om alle store teknologiske endringer i historien», «Fordi jordbruket avløste jakt og sanking i løpet av få generasjoner». Nytt hint: «Ordet kan vise til tempo eller til omfang. Hvilket av dem passer med at overgangen tok mange generasjoner?» |
| **F6** | choice / Fakta | 1 | C og D er greie (tro og konge — de reelle overtolkningene), A er svak. Riktig er lengst. | Delvis røpende: «lagrene» og «bosetningslagene» leder rett til «bosetning med lagring». | God — antyder at funn ikke beviser styresett. | **Justeres** | Erstatt A med «At bosetningen var forlatt og gjenbrukt av ulike grupper med lange mellomrom» — plausibelt for en elev som ser 18 lag. Fjern «lagrene» fra hintet. |
| **U1** | choice / Forståelse | 1 | A treffer misoppfatningen «klimaet forklarer alt». B og D er svake. Riktig er lengst. | **Røper svaret.** Å nevne fem forhold peker på «flere forhold virket sammen». | God prinsippforklaring. | **Justeres** | Behold A, erstatt B/D med to enkeltårsaksforklaringer som *virker* faglige: «Befolkningsvekst tvang fram jordbruk i alle regioner der folketallet steg», «Jordbruk spredte seg fordi det ga mer fritid enn jakt og sanking». Nytt hint: «Ett alternativ nevner én årsak som skal gjelde overalt. Passer det med at noen grupper fortsatte å jakte?» |
| **U2** | sort / Forståelse | 2 | – | **Forbilledlig.** Gir kriteriet («en forutsetning gjør en endring mulig; en følge kommer som resultat»), ikke svarene. | God — presiserer at følgene ikke var automatiske. | **Beholdes** | Bruk dette hintet som mal for de øvrige. Kunne utvides med to ledd som er *begge deler* (f.eks. «tettere bosetning») for å øve på at kategoriene ikke er rene. |
| **U3** | choice / Forståelse | 1 | A, C, D er absolutte påstander ingen elev vil velge. Riktig er dobbelt så langt som alle andre. | **Røper svaret.** Hintet parafraserer riktig alternativ. | God, med forbehold. | **Skrives om** | Distraktorer som speiler reell forenkling: «Overskudd førte til at det oppstod byer og stater i alle jordbrukssamfunn» (misoppfatningen fra lærerveiledningen), «Arbeidsdelingen oppstod først da metallhåndverk ble vanlig», «Overskudd ble fordelt likt fordi husene i tidlige landsbyer var like store» (knytter til Çatalhöyük-materialet). |
| **U4** | choice / Forståelse | 1 | A er en brukbar misoppfatning, C og D er fyll. Riktig er 18 ord mot 5–6 — det mest ekstreme lengdeavviket i settet. | Godt: gir skillet befolkning/individ uten mekanismen. | God — navngir paradokset presist. | **Justeres** | Behold hint og forklaring. Kort ned riktig alternativ til «Flere kalorier per areal og kortere mellomrom mellom fødsler» og forleng distraktorene tilsvarende. **Merk også:** «fødselsintervall» finnes ikke i fagteksten (den skriver «flere barn kunne fødes med kortere mellomrom») og er ikke i begrepslista. Fjern ordet eller forklar det. |
| **U5** | choice / Forståelse | 1 | A, C, D er urelaterte påstander, ikke misoppfatninger. Riktig er lengst. | **Røper svaret.** «flere mennesker, flere dyr og flere kontaktflater» = riktig alternativ. | God. | **Justeres** | Distraktorer som krever reelt valg: «Fordi ensidig kosthold svekket immunforsvaret hos alle bønder» (delvis sant, men feil mekanisme), «Fordi jordbrukere hadde dårligere kunnskap om legeplanter enn jegere», «Fordi lagret korn ga sykdommer som ikke smittet mellom mennesker». |
| **L1** | order / Lange linjer | 1 | – | Delvis røpende: gir relasjonen mat → lagring → forsørging, altså 3 av 4 ledd. | **Settets beste forklaring** — sier eksplisitt at kjeden er en mulighet og at ingen pil er nødvendig. | **Justeres** | Oppgaven er for lett (leddene er semantisk selvordnende). Legg inn ett ledd som *ikke* hører hjemme i kjeden og be eleven utelate det, eller be eleven velge hvilket ledd som trenger sterkest forbehold. Poengsummen (1) er for lav for en oppgave som bærer kapitlets kjerneresonnement. |
| **L2** | choice / Lange linjer | 1 | Alle tre distraktorene inneholder «alle/aldri/aldri før». De speiler riktige misoppfatninger («jakt og sanking sluttet»), men det absolutte ordet avslører dem. Riktig er lengst. | Godt: definerer begrepsparet. | Grei. | **Justeres** | Fjern absoluttene: «Jakt og sanking ble raskt uvanlig der jordbruket ble tatt i bruk», «Bofasthet ble mulig først da mennesker begynte å dyrke korn» (misoppfatningen, uten «aldri»), «De første bøndene sluttet å flytte etter årstidene». Da må eleven faktisk vurdere påstandene. |
| **L3** | choice / Lange linjer | 1 | A, B og D er karikaturer. Riktig er 14 ord mot 5–6. | **Skadelig.** «Unngå ord som ‘alltid’» lærer eleven prøveteknikk framfor historie — og bekrefter at settets distraktorer er gjenkjennelige på formuleringen. | God vurderingsforklaring. | **Skrives om** | Fjern det siste leddet i hintet uansett hva som skjer med resten. Distraktorer: «Intensivt jordbruk har gitt jordtap i alle regioner der det er brukt over lang tid», «Bønder utviklet vekstskifte og terrasser, så jordbruk har i hovedsak bevart jorda», «Bærekraftsproblemene begynte med kunstgjødsel og maskiner på 1800-tallet» (siste er en utbredt og faglig interessant elevoppfatning). |
| **L4** | reflection / Lange linjer | **2** | – | Godt skrivestillas («på den ene siden … på den andre siden»). | M er en **god modell i innhold** — den veier, bruker forbehold og konkluderer nyansert. Men den vises som et fasitsvar: uten kvalitetskriterier, uten markering av *hvor* forbeholdene ligger, og eleven kan ikke revidere svaret etterpå (knappen låses til «Fullført»). | **Justeres** | Tre grep: (1) vis vurderingskriteriene fra lærerveiledningen (På vei / God / Svært god) **før** eleven skriver, slik kvalitetsstandarden krever; (2) marker i modellen hva som er påstand, belegg og forbehold; (3) la eleven skrive en revidert versjon etter sammenligningen. Se også § 4 D om 20-tegnsgrensen. |
| **K1** | choice / Kildeblikk | 1 | A og C er gode (tro og hersker — de klassiske overtolkningene). D er svak. Riktig er lengst. | **Røper svaret** — utelukker eksplisitt tre alternativer. | God: knytter funn til moderat påstand. | **Justeres** | Erstatt D med en *overtolkning i riktig retning*: «At innbyggerne dyrket korn på markene rundt bosetningen» (kornrester beviser lagring og bruk, ikke lokal dyrking). Det er nettopp gliden mellom funn og slutning eleven skal øve på. Nytt hint: «To av påstandene handler om noe arkeologer kan se, to om noe de må slutte seg til. Hvilken slutning er minst dristig?» |
| **K2** | choice / Kildeblikk | 1 | Formatet er invertert (hva kan materialet *ikke* bevise), så A, B og D er nødvendigvis trivielt sanne funn. Oppgaven er dermed nesten selvbesvarende. Riktig er lengst. | **Røper svaret.** | God. | **Justeres** | Snu til positiv form med gradert vanskegrad: «Hvilken av påstandene går lengst utover det Çatalhöyük-materialet kan bære?» og la alle fire være slutninger av ulik dristighet — fra «husene ble brukt over lang tid» til «samfunnet var likestilt». Da øves kildekritisk gradering, ikke gjenkjenning av det åpenbart utolkbare. |
| **K3** | choice / Kildeblikk | 1 | C og D er svake, A er brukbar. Riktig er lengst. | **Godt.** Peker på datering og organisering uten å nevne svaret. | God. | **Justeres** | Behold hintet. Bytt C/D mot «At monumentbygging krever et matoverskudd fra jordbruk» (den materialistiske forklaringen Göbekli Tepe nyanserer — og den lærerveiledningen selv foreslår som fordypning) og «At Göbekli Tepe var bebodd hele året av en stor befolkning». |
| **K4** | reflection / Kildeblikk | **2** | – | Godt: gir kriterier (ett funn fra hvert sted + én begrensning). | M er faglig sterk og *viser* skillet funn/slutning/begrensning. Samme svakhet som L4: fasitpresentasjon, ingen kriterier på forhånd, ingen revisjon. | **Justeres** | Som L4. Flytt hintets kriterier opp som synlige kvalitetskriterier før skriving — de er allerede formulert, de står bare på feil sted i løpet. |

### Samlet dom

| Dom | Antall | Oppgaver |
|---|---|---|
| Beholdes | 3 | F4, U2, L1-forklaringen |
| Justeres | 12 | F2, F6, U1, U4, U5, L1, L2, L4, K1, K2, K3, K4 |
| Skrives om | 5 | F1, F3, F5, U3, L3 |

---

## 4. Funn per dimensjon

### A. Læringsreisens struktur — **Vesentlig**

**Alle elleve ledd standarden krever finnes.** Kontrollert i DOM: forkunnskap → mål → tid og sted → fakta og begreper → årsaker/virkninger → brudd/kontinuitet → fagtekst → kildeblikk → lange linjer → oppgaver → oppsummering → egenvurdering → repetisjon → kilder. Formelt er standarden innfridd.

**Men de bygger ikke på hverandre — de står etter hverandre.** Tre konkrete utslag:

1. **All gjenhenting ligger til slutt.** Målt i nettleser ved 375 px: siden er 32 452 px høy, første oppgave (F1) starter på 17 325 px — **53 % ned på siden, etter 21,3 skjermhøyder lesing**. Eleven møter 5 læringsmål, 9 faktapunkter, **10 nye begreper**, 4 årsaker, 5 virkninger, 6 brudd/kontinuitetspunkter, en femleddet årsakskjede, 793 ord fagtekst, 2 kildebokser og 5 lange linjer *før* hun blir bedt om å hente fram noe som helst. Prinsipp 3 («aktiv gjenhenting … framfor passiv gjenlesing») er dermed skrevet inn i strategien, men ikke i sidearkitekturen.
2. **Fagteksten kommer etter fakta, begreper, årsaker og virkninger.** Eleven får konklusjonene («Mulige forutsetninger», «Mulige følger», årsakskjeden) før fortellingen som begrunner dem. Den analoge læringsarket har motsatt rekkefølge: kart → fagtekst → følger → sammenligning → begreper. Nettversjonen har flyttet begrepslista og årsak/virkning-boksene foran teksten, og gjort dem til noe å lese framfor noe å utlede.
3. **Fasenummereringen er visuelt ute av rekkefølge.** Kapittelsiden viser i denne rekkefølgen: «01 · Fakta», «02 · Forståelse», «**04 · Kildeblikk**», «**03 · Lange linjer**». Selve seksjonsrekkefølgen følger kvalitetsstandarden (kildearbeid før lange linjer) — det er tallene, arvet fra Word-arket, som motsier den. Rettes ved å bytte nummer, ikke rekkefølge.

**Utbedring:** Legg 2–3 oppgaver rett etter hver innholdsdel (F1–F6 etter faktadelen, U-oppgavene etter fagteksten, K-oppgavene etter kildeboksene), og la den samlede oppgavebolken være repetisjonsrunden. Dette krever ingen nye oppgaver — bare at `InteractiveTasks` kan rendres per fase. Rett fasenumrene.

### B. Oppgavekvaliteten — **Kritisk**

**B1. Riktig svar er alltid det lengste alternativet.** Automatisk måling av alle 13 flervalgsoppgaver:

```
F1 [7,12,8,7]   F2 [12,13,8,10]  F5 [7,6,14,6]   F6 [6,11,8,8]
U1 [6,7,12,9]   U3 [7,12,6,6]    U4 [5,18,5,6]   U5 [6,14,7,5]
L2 [8,11,14,5]  L3 [5,6,14,10]   K1 [6,8,6,5]    K2 [7,7,9,7]
K3 [9,10,7,8]
```

I samtlige 13 er maksimum unikt og treffer fasiten. **Strategien «velg det lengste» gir 100 %.** Dette er den mest kjente og best dokumenterte feilen i flervalgskonstruksjon ([Haladyna, Downing & Rodriguez 2002](https://doi.org/10.1207/S15324818AME1503_5), retningslinje om å holde alternativene like lange).

**B2. Riktig svar er det eneste uten absolutt kvantor.** I 12 av 13 oppgaver inneholder ett eller flere gale alternativer *alltid, alle, aldri, bare, ingen, én gang* eller *automatisk*, mens fasiten er formulert med forbehold («kunne»). Strategien «velg alternativet med forbehold» gir 12 av 13. Kombinert med B1: 13 av 13 uten fagkunnskap.

Dette er dobbelt uheldig fordi kapitlet ellers *lærer* eleven at forbehold kjennetegner god historiefaglig formulering. Oppgavesettet gjør den innsikten om til et svarknep.

**B3. Distraktorene speiler i liten grad reelle misoppfatninger — selv om listen finnes.** Lærerveiledningen inneholder sju dokumenterte misoppfatninger. Bare tre er brukt som distraktorer (F2, F5, K1), og der de er brukt, er de gjerne pakket inn i «alle»/«aldri» slik at de mister konkurransekraft. «Overskudd skapte automatisk stater» — trolig den viktigste feilslutningen i hele kapitlet — er ikke distraktor i noen oppgave, selv om fagteksten bruker et helt avsnitt på å avvise den. Effekten er at oppgavene tester gjenkjenning framfor gjenhenting.

Poenget er ikke formelt: nytten av flervalg for læring henger på at de gale alternativene er *konkurransedyktige*, slik at eleven må hente fram både hvorfor det riktige er riktig og hvorfor de andre er gale ([Little, Bjork, Bjork & Angello 2012](https://doi.org/10.1177/0956797612443370)). Med ikke-konkurrerende alternativer forsvinner det meste av læringseffekten.

**B4. Hintene røper svaret i minst 8 av 19 oppgaver.** F1, F5, U1, U3, U5, K1 og K2 gjentar riktig alternativ i omskrevet form; F2 og F6 peker sterkt. L3s hint («unngå ord som ‘alltid’») underviser i prøvestrategi. Motpolen finnes i samme sett: U2 og L2 gir *kriteriet*, F4 og K3 gir *retningen*, L4 gir *stillaset*. Malen finnes altså internt — den er bare ikke brukt konsekvent.

**B5. Ingen forklaring adresserer et konkret galt alternativ.** Alle 19 `explanation`-felt forklarer hvorfor det riktige er riktig. Ingen sier hvorfor noe bestemt galt er galt. Verifisert i nettleser: en elev som velger A i F1 og feiler to ganger, får forklaringen «Domestisering er både biologisk og kulturell …» — som ikke berører hennes feiloppfatning om at jordbruk betyr å slutte å spise kjøtt. Forklarende respons som adresserer selve feilen er den formen som gir størst effekt i forskningen på formativ respons ([Shute 2008](https://doi.org/10.3102/0034654307313795); [Butler & Roediger 2008](https://doi.org/10.3758/MC.36.3.604)).

**B6. Poengfordelingen er vilkårlig og inverterer kortprøvens vekting.**

| Fase | Oppgaver | Poeng | Andel | Til sammenligning: kortprøven |
|---|---|---|---|---|
| Fakta | 6 | 11 | **41 %** | 10 av 40 = 25 % |
| Forståelse | 5 | 6 | 22 % | 12 av 40 = 30 % |
| Lange linjer | 4 | 5 | 19 % | 6 av 40 = 15 % |
| Kildeblikk | 4 | 5 | 19 % | 12 av 40 = 30 % |

Den dyreste enkeltoppgaven i nettsettet er **F3 — å koble region til art, 4 poeng** — ren gjenkjenning. De to oppgavene som faktisk krever historisk resonnering, L4 og K4, er verdt 2 poeng hver. På kortprøven er de samme to oppgavene verdt 6 og 7 av 40. Nettsettet betaler altså mest for det billigste. Kildeblikk faller fra 30 % til 19 %, stikk i strid med produktprinsipp 2 («kildekritikk gjennom hele reisen»).

**B7. Oppgavetypene er godt valgt, med to unntak.** `sort` i U2 og `order` i F4 passer innholdet presist. `match` i F3 er derimot brukt til en ren memoreringskobling som ikke krever matching-formatet, og `order` i L1 er nesten selvordnende. 13 av 19 oppgaver (68 %) er `choice`, og 17 av 19 er lukkede. Til sammenligning har det analoge læringsarket **åtte** friskriving-spørsmål i «Kan du punktene?» pluss fire åpne kildespørsmål — alle borte i nettversjonen. Den digitale utgaven er dermed *mer* gjenkjenningstung enn papirutgaven den bygger på. Det er verdt å merke seg at settet ikke trenger flere oppgaver; det trenger at noen av de eksisterende `choice`-oppgavene blir korte friskrivingsoppgaver med selvsjekk.

**Merknad om standarden selv:** Kvalitetsstandarden stiller krav om at hint og forklaring *finnes*, og innholdsmodellen håndhever dette maskinelt. Den sier ingenting om at distraktorer skal være plausible, at alternativene skal være jevnlange, eller at hint ikke skal røpe svaret. Det er en svakhet i standarden, ikke bare i kapitlet, og forklarer hvorfor 19 av 19 oppgaver passerer validering. Foreslått tillegg til standarden er formulert i § 5.

### C. Kognitiv progresjon og belastning — **Vesentlig**

**Begrepstettheten før første gjenhenting er for høy.** 10 begreper introduseres samlet i et rutenett, uten øving, 12 000 px før F1. Fire av dem (*neolittisk tid, periodisering, brudd, kontinuitet*) er metabegreper om historiefaget, ikke om jordbruket, og krever en annen type prosessering enn *domestisering* og *matoverskudd*. Å presentere dem i samme visuelle rekke signaliserer at de er samme slags kunnskap.

**Tempoet fakta → abstraksjon er i seg selv riktig lagt.** Fasene og den «didaktiske grunnloven» fra lærerveiledningen («elevene kan ikke se de lange linjene hvis de ikke kjenner punktene») er faglig velbegrunnet og treffer sentrale funn om at historisk resonnering krever substansiell forkunnskap ([Stoel m.fl. 2015](https://doi.org/10.1080/00220272.2014.968212)).

**Belastningstoppen ligger i «Følgene»-avsnittet:** sju avsnitt, ~400 ord, under én h3, som dekker demografi, helse, arbeidsdeling, handel, eiendom, makt, kjønn og økologi. Papirarket deler nøyaktig det samme innholdet i fire nummererte underkapitler (D1–D4) med egne overskrifter. Nettversjonen har slått dem sammen. Gjeninnfør underoverskriftene — det er et rent strukturgrep uten tekstendring.

**Forkunnskapsaktiveringen er riktig plassert, men ubesvart.** Eleven bes skrive tre assosiasjoner og ett spørsmål, og «ta vare på det første svaret». Det finnes ikke noe felt å skrive i, og ingenting henter fram spørsmålet senere. Selve grepet er godt underbygget — et mislykket gjenhentingsforsøk før lesing forbedrer læringen ([Richland, Kornell & Kao 2009](https://doi.org/10.1037/a0016496)) — men effekten forutsetter at forsøket faktisk gjøres. Et lokalt lagret tekstfelt som vises igjen i oppsummeringen ville realisert det som nå bare er en oppfordring.

### D. Formativ respons — **Vesentlig**

Respons bør si noe om **oppgaven og strategien**, ikke om eleven ([Shute 2008](https://doi.org/10.3102/0034654307313795); [Hattie & Timperley 2007](https://doi.org/10.3102/003465430298487)).

**Nivået er nesten alltid oppgavenivå, sjelden prosessnivå.** Forklaringene sier hva som er faglig riktig (oppgavenivå). Bare U2, K1 og L4 sier noe om *hvordan man tenker* (prosessnivå: skill forutsetning fra følge; koble funn til moderat påstand; vei to sider mot hverandre). Ingen respons peker framover mot neste skritt.

**«Godt tenkt.»** innleder hver riktig-melding. Det er personrettet ros — den responsformen som konsekvent kommer dårligst ut i forskningen fordi den flytter oppmerksomheten fra oppgaven til selvet. Erstatt med oppgavenær bekreftelse: «Riktig — du skilte tempo fra omfang.»

**Responsen er svarblind.** Verifisert i nettleser: samme forklaring uansett hvilket galt alternativ som er valgt, og — for `match`/`sort` — samme generiske hint enten 0 eller 3 av 4 koblinger er riktige.

**Hintet kan forsvinne utilsiktet.** Verifisert: to klikk på «Sjekk svar» uten å endre svaret teller som to forsøk og hopper rett til forklaringen. Eleven som klikker fordi hun ikke så at responsen dukket opp lenger nede, mister hintrunden. Krev endret svar før nytt forsøk telles.

**Åpne oppgaver mangler kvalitetskriteriene helt.** Standarden krever at åpne oppgaver «viser kvalitetskriterier og modellrespons» etter eget svar. Modellresponsen vises; **kvalitetskriteriene finnes ikke i produktet i det hele tatt** — vurderingsmatrisen (På vei / God / Svært god for Fakta, Forklaring, Lange linjer, Kildebruk, Vurdering) ligger bare i lærerveiledningen. Uten kriterier er sammenligningen med modellen en lesing, ikke en vurdering.

**Terskelen for «eget svar» er 20 tegn.** Verifisert i nettleser: teksten `aaaaaaaaaaaaaaaaaaaaa` (21 tegn) låser opp modellresponsen, markerer oppgaven som fullført og øker telleren til «1 av 19 oppgaver gjennomført». Produktsignalet «åpne oppgaver krever et eget forsøk før modellrespons» er dermed teknisk innfridd og reelt tomt. Etter innsending låses knappen til «Fullført», så eleven kan heller ikke revidere svaret sitt i lys av modellen — det steget som gir mest læring, mangler.

### E. Gjenhenting og spacing — **Kritisk**

**Repetisjonsplanen kan ikke gjennomføres i produktet.** Steg 2 lyder: «Om 2–3 dager: Gjør faktaoppgavene på nytt uten å lese først.» Verifisert i nettleser: når eleven kommer tilbake, er hennes tidligere svar fortsatt avkrysset, kortet er markert `is-complete`, forklaringen står synlig under, og knappen er låst til «Fullført». **Det finnes ingen nullstillingskontroll noe sted på siden** (de eneste knappene er «Kopier lenke», «Sjekk svar», «Fullført», «Vis modellrespons»). Eleven må enten endre svaret sitt manuelt — med fasiten synlig over seg — eller tømme nettleserlagringen. Steg 3 («svar på framskrittsspørsmålet på nytt og sammenlign med forrige svar») er umulig: det gamle svaret overskrives, og knappen er låst.

Planen er altså en tekstlig oppfordring uten mekanisme, i et produkt som eksplisitt påberoper seg repetisjon over tid som prinsipp. Spacing-effekten er godt etablert ([Carpenter m.fl. 2022](https://doi.org/10.1038/s44159-022-00089-1)), men her realiseres den ikke.

**Utbedring (liten kodemengde, stor effekt):** en «Øv på nytt»-knapp per fase som nullstiller `answer`/`feedback`/`completed` men beholder `attempts` og en `lastCompleted`-dato, pluss en linje øverst i oppgavebolken: «Du gjorde faktaoppgavene for 3 dager siden. Prøv dem på nytt uten å lese.» Datoen finnes allerede i praksis; den lagres bare ikke.

**Egenvurderingen gir ingen kalibrering.** De fem avkrysningsboksene («Jeg kan …») er ukontrollerte HTML-elementer uten tilstand. Verifisert: etter avkryssing inneholder `localStorage` kun oppgavenøkkelen; boksene nullstilles ved oppdatering. Verre er innretningen: eleven vurderer seg selv **uten å ha forsøkt å hente fram noe**, og får ingen tilbakemelding på om vurderingen stemte. Det er en oppskrift på den overkonfidensen som svekker elevers egen studieregulering ([Dunlosky & Rawson 2012](https://doi.org/10.1016/j.learninstruc.2011.08.003)) — eleven får en følelse av mestring, ikke kalibrering.

**Utbedring uten poengjakt:** koble hvert læringsmål til de oppgavene som dekker det, og vis etter avkryssing en nøktern setning: «Du krysset av for dette målet. Du løste K1 og K3 på første forsøk, K2 på tredje.» Ingen poeng, ingen merker — bare speiling av elevens egen atferd mot hennes egen vurdering. Det respekterer produktprinsipp 4 fullt ut; kalibrering er ikke gamification.

### F. Språk og tilgjengelig tekst — **Mindre**

Fagteksten er som nevnt god (§ 2, punkt 2). Fire konkrete steder bør likevel forenkles, primært av hensyn til elever med norsk som andrespråk:

**1. Ingressen / hovedspørsmålet (det aller første eleven leser)** — 22 ord, dobbeltspørsmål med innskutt konsesjonsledd:

> «Hvorfor begynte mennesker å dyrke jorda, og hvorfor ble følgene så grunnleggende når selve overgangen ofte var langsom?»

*Forslag:* «Hvorfor begynte mennesker å dyrke jorda? Og hvorfor forandret det så mye, når selve overgangen tok mange hundre år?»

**2. Faktapunkt 3** — nominaliseringskjede, «menneskelig utvalg» er ugjennomsiktig:

> «Domestisering var en biologisk og kulturell prosess der menneskelig utvalg endret planter og dyr over mange generasjoner.»

*Forslag:* «Menneskene bestemte etter hvert hvilke planter og dyr som fikk formere seg. Slik endret artene seg over mange generasjoner. Det kaller vi domestisering.»

**3. Fagtekstens avsnitt om overskudd** — «Et lagringsbart overskudd kunne brukes til å forsørge …» er passiv med sammensatt adjektiv i subjektet:

*Forslag:* «Når mat kunne lagres, ble det et overskudd. Overskuddet kunne fø mennesker som ikke dyrket all maten sin selv.»

**4. Faktapunkt 8** — fem fagtermer på rad uten forklaring:

> «Sterkere inngrep i jord, vann og vegetasjon kunne øke produksjonen, men også gi erosjon, utarming og tap av biologisk mangfold.»

*Forslag:* «Menneskene endret jord, vann og planteliv mer enn før. Det kunne gi mer mat. Men jorda kunne også bli vasket bort (erosjon), bli fattigere på næring, og færre arter kunne leve i området.»

**Uforklarte ord som bør inn i begrepslista eller forklares i parentes ved første bruk:** *obsidian, hirse, quinoa, taro, yam, squash, saltproblemer, vekstskifte, terrasser, fødselsintervall* (sistnevnte finnes bare i oppgave U4, ikke i teksten den skal prøve). Begrepslista har i dag 10 oppslag, alle abstrakte; ingen av de konkrete substantivene som faktisk stopper lesingen for en andrespråkselev.

**Ellers positivt:** «Kan ikke bevise alene»-formuleringen i kildeboksene er kort, konkret og gjentakende — god språklig modellering av kildekritikk.

### G. Universell utforming — **Vesentlig** (ett funn), for øvrig **Mindre**

Testet i nettleser ved 320, 375 og 640 px.

**Vesentlig — G1: Innholdsrekkefølgen bryter sammen på mobil.** `.chapter-rail` («På denne siden» + stabil lenke) har `order: -1` i mobiloppsettet. Målt ved 375 px: hjelperuten tegnes på 751 px, artikkelen på 1295 px — altså **visuelt først**. I DOM ligger `<aside>` **sist**, etter hele artikkelen. En tastaturbruker eller skjermleserbruker møter innholdsfortegnelsen etter å ha passert alle 105 fokuserbare elementer og ~32 000 px innhold, mens en seende mobilbruker ser den først. Dette er WCAG 2.2 **1.3.2 Meningsfylt rekkefølge** og **2.4.3 Fokusrekkefølge**. Løsning: flytt `<aside>` foran `<article>` i markup og bruk `order` for desktop-plasseringen i stedet.

**Vesentlig — G2: Statusmeldinger kan gå tapt for skjermleser.** `<p role="status">` med responsen rendres **betinget** — elementet settes inn i DOM samtidig med at teksten kommer. Live-regioner må eksistere i DOM før innholdet endres for at endringen skal kunngjøres pålitelig. I tillegg oppdateres `.task-progress` (også `role="status"`, `aria-live="polite"`, `aria-atomic`) i samme rendring når svaret er riktig — to samtidige høflige kunngjøringer, der én normalt går tapt. Løsning: render en tom, permanent `role="status"`-beholder per oppgavekort og fyll den ved endring; la framdriftstelleren bruke en egen forsinket kunngjøring.

**Vesentlig — G3:** `aria-describedby` på innsendingsknappen peker på responsen — men når svaret er riktig, blir knappen `disabled` og dermed ikke fokuserbar, så beskrivelsen aldri leses opp. Flytt beskrivelsen til oppgavekortet, eller behold knappen aktiv med endret etikett.

**Mindre — G4: Fire kontrastbrudd mot 1.4.3** (målt med korrekt alfakomposittering):

| Element | Farger | Ratio | Krav |
|---|---|---|---|
| `.local-note` i grønn boks | `#60716A` på `#DCE9E2` | **4,13** | 4,5 |
| Lenker i «På denne siden» (12 px) | `#60716A` på `#F2EEE5` | **4,46** | 4,5 |
| «Kryss av det du kan forklare …» | `#60716A` på `#F2EEE5` | **4,46** | 4,5 |
| Bunntekst (`.footer-copy`, `.footer-meta`) | `#60716A` på `#F2EEE5` | **4,46** | 4,5 |

Alle fire skyldes samme tekstfarge `#60716A`. Å mørkne den til ca. `#55665F` løser alle på én gang. Merk at den lave verdien jeg først målte på «Sjekk svar» (3,97) gjelder **deaktivert** tilstand, som er unntatt fra kravet; aktiv knapp måler 7,80 og er i orden.

**Mindre — G5:** Lenkene i hjelperuten er 13,6 px høye med 12,6 px mellomrom. De passerer 2.5.8 utelukkende via avstandsunntaket (26,2 px senteravstand mot kravet 24). Marginen er 2 px. Øk linjeavstanden.

**Mindre — G6:** Egenvurderingen har `<legend>` men ingen overskrift og står ikke i innholdsfortegnelsen, selv om den er et eget ledd i kvalitetsstandardens læringsreise. Gi den en `h2` og en oppføring i hjelperuten.

**Kontrollert og i orden:** ingen horisontal overflyt ved 320/375/640 px; zoom til 200 % (640 px) uten avkutting; sammenligningstabellen ruller inne i egen `overflow-x: auto`-beholder; synlig 3 px fokusmarkering på alle interaktive elementer (kontrast mot tilstøtende flate 3,06–3,54 — over 3:1, men med liten margin på lyse kort); `prefers-reduced-motion` respektert; hopp-lenke virker; overskriftshierarki uten hopp; landemerker og `aria-label` på begge navigasjoner; sr-only-etiketter på alle skjemafelt; ingen positive `tabindex`; radiogrupper i `fieldset` med `legend`.

### H. Lærerperspektivet — **Vesentlig**

`/laerere` gir i dag: kompetansemål, en tre-linjers modellbeskrivelse, en OneNote-oppfordring, og en liste over hva som *finnes i lokale dokumenter læreren ikke har tilgang til*.

**Det læreren trenger og ikke får:**

1. **Fasit og oppgaveoversikt.** Ingen steder på nettstedet kan en lærer se de 19 oppgavene med svar. Fasittabellen finnes i Word-filen. En lærer som skal gå gjennom F3 muntlig i klassen, må enten løse oppgavene selv i elevvisningen eller lete i et dokument utenfor systemet. Produktstrategien lover uttrykkelig at «lærere skal kunne finne mål, oppgaver, modellresponser og stabile lenker uten å lete i flere systemer». Det løftet er ikke innfridd.
2. **Modellresponsene.** Nevnes («19 oppgaver med hint, forklaringer og modellresponser»), men vises ikke. De er bare tilgjengelige ved å skrive minst 20 tegn i elevfeltet.
3. **Undervisningsløpet.** Word-filen har en ferdig 120-minutters økt med tidsangivelser, og en 90-minutters nødvariant. Ingenting av dette er på nettstedet. Dette er nettopp det som skal til for «bruk i en time uten forberedelse».
4. **Misoppfatningslista** (7 punkter med faglig korrigering) — det mest umiddelbart brukbare i hele pakken for en lærer som skal lede en klassesamtale.
5. **Vurderingskriteriene** (5 × 3-matrisen) — som også mangler for elevene, jf. § 4 D.
6. **Støtte og tilpasning** — setningsstartere og differensieringsforslag for begge ender av klassen.
7. **Læringsmålene** står ikke på lærersiden, bare kompetansemålene.

**Stabile lenker:** kapittelnivå og `#oppgaver` er dekket av kopiknappen. Hver oppgave har allerede en stabil ankernavn (`#oppgave-f3`), men dette er ikke dokumentert noe sted, så læreren kan ikke lenke til en enkeltoppgave i ukeplanen uten å inspisere HTML-en.

**Merknad om personvern:** Prosjektet har helt riktig valgt å ikke publisere kortprøven og dens fasit uten et bevisst valg (kvalitetsstandarden, «Prøver og fasiter publiseres ikke uten et uttrykkelig valg»). Det argumentet dekker imidlertid **ikke** undervisningsløpet, misoppfatningene, vurderingskriteriene, differensieringsforslagene eller fasit til nettoppgavene — nettoppgavenes svar er uansett tilgjengelige for enhver elev etter to forsøk. Disse kan legges ut uten at prøven berøres.

---

## 5. Avvik fra egen kvalitetsstandard

| # | Sitat fra standarden | Avvik | Alvorlighet |
|---|---|---|---|
| 1 | «Åpne oppgaver viser kvalitetskriterier og modellrespons først etter at eleven har skrevet et eget svar.» | **Kvalitetskriterier vises aldri** — verken før eller etter. Matrisen finnes bare i lærerveiledningen. Dessuten er «et eget svar» operasjonalisert som 20 vilkårlige tegn (verifisert: 21 a-er låser opp modellen og markerer oppgaven fullført). | Kritisk |
| 2 | «Et publisert kapittel skal i rekkefølge tilby … repetisjon over tid.» | Repetisjonsplanen er tekst uten mekanisme. Fullførte oppgaver viser elevens forrige svar og forklaringen, knappen er låst til «Fullført», og det finnes ingen nullstilling. Steg 2 og 3 i planen kan ikke utføres. | Kritisk |
| 3 | «Oppgaver skal ha tydelig instruksjon og meningsfull respons.» | Responsen er svarblind: samme forklaring uansett feilvalg, og samme generiske hint ved 0 som ved 3 av 4 riktige koblinger i F3 (4 poeng). | Vesentlig |
| 4 | «Første feil gir et avgrenset hint.» | Hintet kan tapes utilsiktet: to klikk på «Sjekk svar» uten svarendring teller som to forsøk. I minst 8 oppgaver er hintet dessuten ikke «avgrenset», men inneholder svaret. | Vesentlig |
| 5 | «Semantiske overskrifter, landemerker, feltetiketter og statusregioner brukes konsekvent.» | Statusregionene settes inn i DOM samtidig med innholdet og kan derfor ikke kunngjøres pålitelig; to live-regioner oppdateres samtidig ved riktig svar. | Vesentlig |
| 6 | «Kontrast, zoom til 200 %, tastaturrekkefølge og skjermlesernavn kontrolleres ved relevante endringer.» | Tastaturrekkefølgen bryter med visuell rekkefølge på mobil (`order: -1` på hjelperuten). Fire tekstelementer ligger på 4,13–4,46:1 mot kravet 4,5. Zoom og skjermlesernavn er i orden. | Vesentlig |
| 7 | Produktstrategi: «Lærere skal kunne finne mål, oppgaver, modellresponser og stabile lenker uten å lete i flere systemer.» | Fasit, modellresponser, undervisningsløp, misoppfatninger og vurderingskriterier finnes bare i lokale Word-filer. Lærersiden beskriver dem uten å gi dem. | Vesentlig |
| 8 | Produktstrategi, prinsipp 3: «Aktiv gjenhenting … framfor passiv gjenlesing.» | Første gjenhentingsforsøk kommer etter 21 skjermhøyder lesing; forkunnskapsaktiveringen har ikke noe felt å svare i; egenvurderingen lagres ikke og gir ingen kalibrering. | Vesentlig |

**Svakhet i standarden selv (skilt fra bruddene over):** Standarden krever at hint og forklaring *finnes*, og `getContentModelIssues()` håndhever dette maskinelt. Den sier ingenting om at distraktorer skal være plausible, at alternativene skal være omtrent like lange, eller at hint ikke skal inneholde svaret. Derfor passerer alle 19 oppgaver validering samtidig som «velg det lengste alternativet» gir 13 av 13 riktig. Foreslått tillegg til `docs/kvalitetsstandard.md`, avsnittet om læringsreise:

> Gale svaralternativer skal speile dokumenterte elevmisoppfatninger og være omtrent like lange som det riktige. Absolutte ord som «alltid», «alle», «aldri» og «bare» brukes ikke som skille mellom riktig og galt alternativ. Hintet skal gi et kriterium eller en retning, ikke gjenta svaret. Forklaringen skal si hvorfor minst ett galt alternativ er galt.

De tre første kravene kan delvis håndheves maskinelt i `getContentModelIssues()`: advar når fasiten er det lengste alternativet, og når et absolutt ord bare forekommer i gale alternativer.

---

## 6. Prioritert tiltaksliste

Sortert etter læringseffekt delt på arbeidsmengde.

| # | Tiltak | Dimensjon | Innsats | Effekt |
|---|---|---|---|---|
| 1 | **Jevn ut alternativlengdene og fjern absoluttene i alle 13 flervalgsoppgaver.** Rent tekstarbeid i `chapters.ts`, ingen kodeendring. Fjerner den strategien som i dag gir 13 av 13 uten fagkunnskap. | B | Lav | Svært høy |
| 2 | **Skriv om de 8 hintene som røper svaret** (F1, F2, F5, U1, U3, U5, K1, K2) etter mønster fra U2 og L2: gi kriteriet, ikke svaret. Fjern «unngå ord som ‘alltid’» fra L3. Bare tekst. | B, D | Lav | Svært høy |
| 3 | **Legg til «Øv på nytt» per fase**, som nullstiller svar og respons men beholder forsøkstall og dato, med en linje som forteller hvor lenge siden det er. Gjør repetisjonsplanen utførbar. | E | Lav–middels | Svært høy |
| 4 | **Skriv distraktorer fra lærerveiledningens misoppfatningsliste**, særlig «overskudd skapte automatisk stater» og «bofasthet kom etter jordbruket», som i dag ikke er i bruk eller er nøytralisert av absolutter. Gjelder F1, F3, F5, U3, L3 (dom: skrives om). | B | Middels | Svært høy |
| 5 | **Flytt `<aside>` foran `<article>` i markup** og styr desktop-plasseringen med `order` i stedet. Retter WCAG 1.3.2/2.4.3 på mobil. Én markupendring. | G | Lav | Høy |
| 6 | **Vis vurderingskriteriene før eleven skriver** i L4 og K4, hev terskelen for «eget svar» fra 20 tegn til noe meningsbærende (f.eks. 200 tegn og minst to setninger), og la eleven skrive en revidert versjon etter modellen. Retter avvik 1. | D, E | Middels | Høy |
| 7 | **Legg 2–3 oppgaver inn etter hver innholdsdel** i stedet for alle 19 til slutt. Krever at `InteractiveTasks` kan rendres per fase; ingen nytt innhold. Flytter første gjenhenting fra 53 % til ~20 % ned på siden. | A, C | Middels | Høy |
| 8 | **Bygg ut `/laerere` med undervisningsløpet, misoppfatningene, vurderingskriteriene, differensieringsforslagene og en fasittabell** — alt finnes ferdig i Word-filen. Kortprøven holdes utenfor, slik standarden krever. | H | Middels | Høy |
| 9 | **Delrespons på `match`/`sort`** («tre av fire stemmer — se på Andes og Mesoamerika igjen»), deaktivering av brukte valg i F3, og krav om endret svar før et nytt forsøk telles. Retter avvik 3 og 4. | D | Middels | Middels–høy |
| 10 | **Rett de fire kontrastverdiene** (én tekstfarge), gi egenvurderingen en `h2` og lagring, bytt fasenumrene 03/04 slik at de følger siderekkefølgen, og erstatt «Godt tenkt.» med oppgavenær bekreftelse. Fire små, uavhengige rettinger. | D, E, F, G | Lav | Middels |

---

## Kilder

Prosjektets eget forskningsgrunnlag (`docs/produktstrategi.md`) er lagt til grunn. I tillegg er følgende brukt i vurderingen:

- Haladyna, Downing & Rodriguez (2002). *A Review of Multiple-Choice Item-Writing Guidelines for Classroom Assessment.* Applied Measurement in Education 15(3). [10.1207/S15324818AME1503_5](https://doi.org/10.1207/S15324818AME1503_5) — retningslinjer om jevnlange alternativer, unngåelse av absolutte kvantorer og plausible distraktorer.
- Little, Bjork, Bjork & Angello (2012). *Multiple-Choice Tests Exonerated, at Least of Some Charges.* Psychological Science 23(11). [10.1177/0956797612443370](https://doi.org/10.1177/0956797612443370) — læringseffekten av flervalg avhenger av konkurransedyktige gale alternativer.
- Rodriguez (2005). *Three Options Are Optimal for Multiple-Choice Items.* Educational Measurement 24(2). [10.1111/j.1745-3992.2005.00006.x](https://doi.org/10.1111/j.1745-3992.2005.00006.x) — tre gode alternativer er bedre enn fire der ett er fyll.
- Butler & Roediger (2008). *Feedback enhances the positive effects and reduces the negative effects of multiple-choice testing.* Memory & Cognition 36. [10.3758/MC.36.3.604](https://doi.org/10.3758/MC.36.3.604) — respons som retter feilvalget reduserer at distraktoren festner seg.
- Shute (2008). *Focus on Formative Feedback.* Review of Educational Research 78(1). [10.3102/0034654307313795](https://doi.org/10.3102/0034654307313795) — respons skal være ikke-evaluerende, spesifikk og oppgaverettet.
- Hattie & Timperley (2007). *The Power of Feedback.* Review of Educational Research 77(1). [10.3102/003465430298487](https://doi.org/10.3102/003465430298487) — nivåene oppgave, prosess, selvregulering og selv.
- Richland, Kornell & Kao (2009). *The pretesting effect.* Journal of Experimental Psychology: Applied 15(3). [10.1037/a0016496](https://doi.org/10.1037/a0016496) — verdien av et faktisk utført forsøk før lesing.
- Dunlosky & Rawson (2012). *Overconfidence produces underachievement.* Learning and Instruction 22. [10.1016/j.learninstruc.2011.08.003](https://doi.org/10.1016/j.learninstruc.2011.08.003) — ukalibrert egenvurdering svekker læring.
- Stoel, van Drie & van Boxtel (2015). *Teaching towards historical expertise: developing a pedagogy for fostering causal reasoning.* Journal of Curriculum Studies 47(1). [10.1080/00220272.2014.968212](https://doi.org/10.1080/00220272.2014.968212) — eksplisitt undervisning i årsaksresonnering krever substansiell forkunnskap.
- WCAG 2.2: [https://www.w3.org/TR/WCAG22/](https://www.w3.org/TR/WCAG22/) — suksesskriteriene 1.3.2, 1.4.3, 1.4.10, 1.4.11, 2.4.3, 2.5.8, 4.1.3.
