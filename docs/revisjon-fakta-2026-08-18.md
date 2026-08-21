# Uavhengig faktarevisjon – kapittel 2.2 Jordbruksrevolusjonen

**Revisjonsdato:** 18. august 2026
**Revidert materiale:** `content/chapters.ts` (kapittelobjektet `jordbruksrevolusjonen`, linje 509–687, og oppgavesettet linje 159–507), `docs/produktstrategi.md`, samt de tre lokale Word-filene i repo-roten.
**Målestokk:** `AGENTS.md` (Faglige regler 1–6) og `docs/kvalitetsstandard.md` (Fag og kilder).
**Ingen prosjektfiler er endret.** Denne rapporten er eneste nye fil.

---

## 1. Sammendrag

Kapitlet er faglig solid bygget og bruker forbehold gjennomgående på en måte som få læreverk gjør.
Kompetansemålene er ordrett korrekte, alle lenker og DOI-er lever og er riktig attribuert,
og ingen prøve- eller fasitmateriale er lekket til offentlig innhold.

**Det er likevel ikke publiseringsklart uten én rettelse.** Tidslinjens første punkt daterer
slutten på siste istid til «ca. 11 700 f.Kr.». Det er en BP→f.Kr.-omregningsfeil på nær
2 000 år: holocen begynner formelt 11 700 år før år 2000, altså ca. 9700 f.Kr. Feilen står i
et faktafelt elevene skal pugge, og den gjør at kapitlets egen kronologi ikke henger sammen.

I tillegg bør tre forhold utbedres før publisering: dateringen av sau og geit er satt for tidlig
(F-02), Göbekli Tepe-kildeblikket presenterer en tolkning som funn og speiler ikke gjeldende
forskningsstatus (F-03, F-04), og de konkrete Çatalhöyük-funnene mangler kildedekning i de
fem oppgitte kildene (F-05). Digitaliseringen har dessuten mistet kapitlets skarpeste
kildekritiske forbehold om makt (F-09).

**Konklusjon: nei – ikke publiseringsklart før F-01 er rettet.** Etter F-01 til F-05 er kapitlet
etter min vurdering faglig forsvarlig å publisere.

---

## 2. Funn

Sortert etter alvorlighetsgrad. Linjenumre viser til `content/chapters.ts` slik filen sto
18. august 2026 (760 linjer).

| ID | Grad | Plassering | Påstanden slik den står | Hva som er problemet | Belegg | Foreslått omformulering |
|---|---|---|---|---|---|---|
| **F-01** | **Kritisk** | `timeline[0]`, linje 666 | «ca. 11 700 f.Kr. — Siste istid tar slutt. Holocen begynner, og varmere eller mer stabile lokale miljøer endrer ressursgrunnlaget.» | **Dette er feil.** Holocens base er formelt definert som 11 700 år *b2k* (før år 2000), altså **ca. 9700 f.Kr.** Tallet 11 700 er «år før nåtid», ikke «år f.Kr.». Feilen på ca. 1 750 år gjør også kapitlets kronologi selvmotsigende: den plasserer istidens slutt 1 700 år før tidlig dyrking, mens holocens begynnelse og starten på PPNA-dyrking i realiteten er tilnærmet samtidige. Kapitlets egen kilde OpenStax skriver «about twelve thousand years ago». | Walker m.fl. 2009, *J. Quaternary Science*, [10.1002/jqs.1227](https://doi.org/10.1002/jqs.1227); Walker m.fl. 2019, [10.1002/jqs.3097](https://doi.org/10.1002/jqs.3097); ICS: <https://stratigraphy.org/news/125>; OpenStax 2.3 | `{ date: "ca. 9700 f.Kr.", title: "Siste istid tar slutt", description: "Holocen begynner – formelt datert til 11 700 år før nåtid. Varmere og ofte mer stabile lokale miljøer endrer ressursgrunnlaget." }` |
| **F-02** | **Vesentlig** | `timeline[1]`, linje 667; jf. `facts[1]`, linje 547 og `narrative`, linje 593 | «ca. 10 000–9000 f.Kr. Tidlig dyrking i Sørvest-Asia. Hvete, bygg, **sau og geit** blir gradvis viktige i en lang prosess.» | **Dette er feil for dyrene, og upresist for kornet.** (a) Sau og geit hører ikke hjemme i 10 000–9000 f.Kr. Tidligste flokkforvaltning dokumenteres ca. 11 000–10 500 BP (≈ 9000–8500 f.Kr.), morfologisk domestisering ca. 10 500–10 000 BP (≈ 8500–8000 f.Kr.). (b) Formuleringen «dyrkings- og domestiseringsprosesser … omtrent 10 000 f.Kr.» slår sammen to ting som ligger ca. 1 500 år fra hverandre: dyrking av *ville* kornslag (fra ca. 9600 f.Kr.) og *domestiserte* kornslag (ca. 8700–8200 f.Kr. i sør-Levanten, 400–1 000 år senere i den østlige Fruktbare halvmåne). | Zeder & Hesse 2000, *Science*, [10.1126/science.287.5461.2254](https://doi.org/10.1126/science.287.5461.2254); Zeder 2008, *PNAS*, [10.1073/pnas.0801317105](https://doi.org/10.1073/pnas.0801317105); Arranz-Otaegui m.fl. 2016, *PNAS*, [10.1073/pnas.1612797113](https://doi.org/10.1073/pnas.1612797113) | Del i to punkter: `{ date: "ca. 9600–8800 f.Kr.", title: "Dyrking av ville kornslag i Sørvest-Asia", description: "Mennesker sår og høster ville kornslag før plantene er biologisk domestiserte." }` og `{ date: "ca. 8700–8000 f.Kr.", title: "Domestiserte kornslag, sau og geit", description: "Hvete og bygg får domestiserte trekk. Sau og geit holdes i flokk. Tidspunktet varierer mellom regioner." }`. I `facts[1]`: «Dyrking av ville kornslag i Sørvest-Asia kan dateres til ca. 9600 f.Kr.; domestiserte kornslag og husdyr kommer noen tusen år senere og til ulik tid i ulike deler av regionen.» |
| **F-03** | **Vesentlig** | `sourceLooks[1].evidence`, linje 652 | Blant *funnene* fra Göbekli Tepe listes «**jegere og sankere som byggherrer**» og «planlegging, samarbeid og spesialisert steinarbeid». | **Dette er en tolkning framstilt som funn.** Komponenten (`app/laereverk/[section]/[chapter]/page.tsx:44`) rendrer `evidence` som en ren funnliste rett under kildeetiketten, før «Støtter». At byggherrene var jegere og sankere er en slutning fra faunarester og fraværet av sikre domestiserte arter i de eldste lagene – ikke noe som er observert direkte. Det samme gjelder «planlegging» og «samarbeid». Dette bryter `kvalitetsstandard.md`: «Teksten skiller eksplisitt mellom funn, tolkning, usikkerhet» – og det bryter det i nettopp kildeblikket, som er kapitlets kildekritiske kjerne. | UNESCO formulerer det selv som en tolkning: «erected by hunter-gatherers», <https://whc.unesco.org/en/list/1572/>. Faunagrunnlaget: Dietrich 2021, [10.2307/jj.15135970](https://doi.org/10.2307/jj.15135970) | `evidence: ["monumentale steinanlegg av megalitter", "T-formede søyler med bilder av ville dyr", "dyrebein fra ville arter", "ingen sikre domestiserte arter i de eldste lagene", "spor etter storskala bearbeiding av korn"]`, og flytt slutningen til `supports`: «Materialet støtter at omfattende samarbeid og monumentbygging kunne organiseres før fullt utviklet jordbruk kan dokumenteres på stedet. At byggherrene levde av jakt og sanking, er en tolkning bygget på dyrebeina og fraværet av domestiserte arter.» |
| **F-04** | **Vesentlig** | `sourceLooks[1].cannotProve`, linje 654; jf. `evidence` linje 652 og oppgave K3, linje 486 | «Materialet beviser ikke at jordbruk var uviktig, eller at vi kjenner den nøyaktige betydningen av anleggene.» | **Dette er omstridt i forskningen, og forbeholdet dekker ikke striden.** Kapitlet bygger på bildet «mobile jegere og sankere reiste et tempel». Siden ca. 2019 har geofysikk, georadar og utgraving under Det tyske arkeologiske instituttet påvist rektangulære strukturer med tydelig husholdningskarakter og indikasjoner på fast bosetning, og Dietrich har dokumentert storskala kornbearbeiding på stedet. Tolkningen forskyves mot «bosetning med markert rituell komponent». Kapitlet nevner ikke dette, og `cannotProve` fanger det derfor ikke opp. | DAI, prosjektside Göbekli Tepe: <https://www.dainst.org/en/research/projects/noslug/5746>; Dietrich 2021, [10.2307/jj.15135970](https://doi.org/10.2307/jj.15135970) | Legg til i `cannotProve`: «Materialet kan heller ikke avgjøre om stedet først og fremst var en samlingsplass eller en fast bosetning. Nyere undersøkelser har påvist bygninger med husholdningspreg og omfattende kornbearbeiding, og tolkningen av stedet er i endring.» |
| **F-05** | **Vesentlig** | `sourceLooks[0].evidence`, linje 644; `narrative`, linje 602 | «ildsteder, lagerrom, kornrester, dyrebein og obsidian», «begravelser under husgulv»; «varer som obsidian kunne bevege seg over store avstander». | **Ikke feil – men uten kildedekning.** Alle påstandene er godt dokumentert i utgravningslitteraturen, men **ingen** av de fem kildene i `chapter.sources` dokumenterer dem. UNESCOs beskrivelse dekker bare antall lag, datering, veggmalerier og den gateløse husklyngen med takadkomst. Dette bryter `kvalitetsstandard.md`: «Historiske påstander skal kunne spores til navngitte, solide kilder.» | Kontrollert mot UNESCO 1405 (dekker ikke); Çatalhöyük Research Project: <https://www.catalhoyuk.com/sites/default/files/Catalhoyuk-Guidebook-ENGLISH.pdf> | Ikke endre teksten – legg til én kilde i `chapter.sources`, f.eks. Çatalhöyük Research Project sin publiserte site guide, med `note` som eksplisitt dekker lagring, kornrester, obsidian og gravene under husgulvene. |
| **F-06** | Mindre | `narrative`, linje 600; oppgave U4 `options[1]`, linje 343; `explanation`, linje 350 | «Flere barn kunne fødes med kortere mellomrom **fordi** familier ikke måtte flytte på samme måte som mange mobile grupper.» / U4s riktige svar: «Flere kalorier per areal **og ofte kortere fødselsintervall** kunne øke befolkningen.» | **Dette er en tolkning framstilt som funn.** Kortere fødselsintervall er ikke observert; det er en mekanisme utledet i modellen om den neolittiske demografiske overgangen, i hovedsak fra andelen umodne skjeletter i gravfelt. «Fordi» i narrativen framstiller mekanismen som etablert. I U4 er formuleringen dessuten *fasitsvaret* – eleven premieres for å gjengi en hypotese som faktum. Kapitlets egen kilde (Parkinson m.fl. 2023) framhever tvert imot at trendene strekker seg over årtusener på begge sider av overgangen. | Bocquet-Appel 2011, *Science*, <https://pubmed.ncbi.nlm.nih.gov/21798934/>; Parkinson m.fl. 2023, *Scientific Reports*, [10.1038/s41598-023-49406-5](https://doi.org/10.1038/s41598-023-49406-5) | Narrativ: «Flere barn kan ha blitt født med kortere mellomrom fordi familier ikke måtte flytte på samme måte. Dette er en utbredt forklaring på befolkningsveksten, men fødselsintervaller kan ikke måles direkte i det arkeologiske materialet.» U4: «Flere kalorier per areal, og trolig kortere fødselsintervall, kunne øke befolkningen …» |
| **F-07** | Mindre | `sourceLooks[0].evidence`, linje 644 | «18 lag med bosetning» | **Upresist.** UNESCO angir atten neolittiske nivåer i **den østre** haugen (7400–6200 f.Kr.). Den vestre haugen er kalkolittisk (6200–5200 f.Kr.) og er ikke med i tallet. Slik det står, kan eleven lese 18 som stedets samlede lagfølge. | <https://whc.unesco.org/en/list/1405/> | «18 neolittiske lag i den østre haugen» |
| **F-08** | Mindre | `narrative`, linje 593 | «og på Ny-Guinea blant annet taro og yam» | **Upresist valg av eksempel.** Denham m.fl. påpeker at stivelseskornene fra taro og yam **ikke** lar seg skille mellom ville og dyrkede former. Den best dokumenterte kulturplanten fra Kuk er banan (*Musa*), intensivt dyrket fra ca. 6950–6440 cal BP. Kapitlet velger dermed de to svakest dokumenterte eksemplene og utelater det sterkeste. | Denham m.fl. 2003, *Science*, [10.1126/science.1085255](https://doi.org/10.1126/science.1085255) | «og på Ny-Guinea banan, og trolig taro og yam» |
| **F-09** | Mindre | `narrative` (avsnitt «Følgene»), linje 604 – sammenlignet med læringsarket del D.3 | Nettversjonen slutter avsnittet om eiendom og makt med «Kjønn og alder kunne også påvirke …». | **Avvik fra originalmaterialet som svekker faglig presisjon.** Læringsarket har et påfølgende avsnitt som er falt bort i digitaliseringen: «Det er likevel farlig å lese senere stater rett inn i de første landsbyene. Arkeologiske funn kan vise forskjeller i hus, gravgaver og kosthold, men de forteller ikke alltid hvem som bestemte eller hvordan mennesker opplevde rettferdighet. **Makt må undersøkes, ikke antas.**» Dette er kapitlets skarpeste kildekritiske forbehold om makt og sosial lagdeling, og det eneste stedet originalen advarer mot å projisere senere statsdannelse bakover. Også D.4-setningen «Avhengighet av noen få arter kunne gjøre samfunn sårbare for avlingssvikt» er falt bort. | Lokal fil `2.2_Jordbruksrevolusjonen_laringsark.docx`, del D.3 og D.4 | Gjeninnfør begge setningene ordrett. AGENTS.md regel 2: «Ikke erstatt kvalitetssikret tekst med nyskrevet tekst uten grunn.» |
| **F-10** | Mindre | Oppgave K3, linje 483–490, mot fasiten i lærerveiledningen punkt 5 | Fasiten oppgir **K3 = C**. I `chapters.ts` er `correct: 1`, altså alternativ **B**. | **Innholdet er riktig i begge**, men bokstaven stemmer ikke. Nettversjonen har omorganisert alternativrekkefølgen uten at fasiten er oppdatert. En lærer som retter etter Word-fasiten vil markere riktig svar som feil. Alle øvrige 18 oppgaver stemmer overens (F1 B, F2 B, F5 C, F6 B, U1 C, U3 B, U4 B, U5 B, L2 C, L3 C, K1 B, K2 C – alle kontrollert). | `2.2_...larerveiledning_og_fasit.docx`, punkt 5; `content/chapters.ts:490` | Oppdater fasiten til K3 = B, eller stokk om alternativene i K3 slik at riktig svar er C. Nettversjonen er autoritativ, så det første er enklest. |
| **F-11** | Observasjon | Oppgave F3, linje 203–210, mot fasiten | Nettoppgaven har fire regioner; fasiten oppgir fem par (inkludert Ny-Guinea–taro/yam). | Ikke en feil – nettversjonen er bevisst forenklet. Men lærerveiledningen beskriver et oppgavesett som ikke helt tilsvarer det elevene møter. | `2.2_...larerveiledning_og_fasit.docx`, punkt 5 | Presiser i fasiten at nettversjonen av F3 har fire par. |
| **F-12** | Observasjon | `causeChain`, linje 632–638, mot oppgave L1, linje 377–388 | `causeChain` har fem ledd («… Handel og mer varige ressurser → Mulige forskjeller i rikdom og makt»); L1 har fire («… → Mer varige forskjeller i rikdom og makt»). | Kapitlet presenterer to litt ulike kjeder for samme sammenheng. Ikke faglig galt, men eleven møter to versjoner av det som framstår som «kjeden». **Merk at hedgingen her er forbilledlig**: `causeChain` rendres under overskriften «En mulig årsakskjede» med den eksplisitte teksten «Ingen av pilene betyr at neste ledd alltid fulgte» (`page.tsx:42`). Kravet i `kvalitetsstandard.md` om forbehold i årsakskjeder er oppfylt. | `content/chapters.ts:632`, `:377`; `app/laereverk/[section]/[chapter]/page.tsx:42` | Vurder å bruke samme fem ledd begge steder, eller å la L1 eksplisitt være et utdrag. |

### Vurdering av `causeChain` særskilt (punkt C i mandatet)

Hvert ledd holder som **mulighet**, og det er slik det presenteres:

1. «Mer mat per areal» – holder som mulighet, ikke som regel. Jordbruk gir høyere kaloriavkastning per areal, ikke per arbeidstime.
2. «Lagring» – holder. Følger av sesongavhengig kornhøsting.
3. «Arbeidsdeling og spesialisering» – holder som mulighet. Narrativen linje 603 leverer forbeholdet eksplisitt: «overskudd førte ikke automatisk til byer eller stater».
4. «Handel og mer varige ressurser» – svakeste ledd. «Mer varige ressurser» er uklart formulert; handel over avstand er dessuten godt dokumentert *før* jordbruket (obsidian i epipaleolittisk Anatolia). Leddet bør presiseres, f.eks. til «Handel og lagre som kan kontrolleres over tid».
5. «Mulige forskjeller i rikdom og makt» – holder, og er allerede hedget i selve strengen.

**Konklusjon:** årsakskjeden er den best håndterte delen av kapitlet. Den er ikke framstilt som nødvendig eller automatisk. Bare ledd 4 bør omformuleres.

---

## 3. Kompetansemål – ordrett sammenligning

`competenceGoals` (linje 537–544) er sammenlignet tegn for tegn mot gjeldende læreplan
HIS01-03, kompetansemål etter vg2, hentet fra <https://www.udir.no/lk20/his01-03/kompetansemaal-og-vurdering/kv84> 18. august 2026.

| # | Kapitlets formulering | Udirs formulering | Avvik |
|---|---|---|---|
| 1 | utforske fortiden ved å stille spørsmål og innhente, tolke og bruke ulikt historisk materiale for å finne svar | identisk | **Ingen** |
| 2 | reflektere over hvorfor historikere deler inn fortiden i perioder og vurdere hvordan vi kan periodisere fortiden på grunnlag av ulike kriterier | identisk | **Ingen** |
| 3 | gjøre rede for viktige endringer i hvordan mennesker har skaffet seg mat og brukt naturressurser, og vurdere betydningen av dette for mennesker og et bærekraftig samfunn | identisk | **Ingen** |
| 4 | presentere viktige demografiske endringer og vurdere årsaker til disse endringene og virkninger av dem for mennesker og samfunn | identisk | **Ingen** |
| 5 | gjøre rede for hvordan handel og økonomiske systemer har påvirket maktforhold og menneskers liv | identisk | **Ingen** |
| 6 | utforske hvordan kommunikasjon og kulturmøter har hatt betydning for mennesker i Norge og verden | identisk | **Ingen** |

**Resultat: null avvik.** Kontrollen ble kjørt som maskinell diff, ikke som visuell lesing, og
fanget dermed også komma, bindeord og bøyning. Alle seks målene er reelle mål i HIS01-03 etter
vg2, og ingen er omskrevet eller sammenslått.

Én observasjon uten alvorlighetsgrad: lærerveiledningen (punkt 1) gjengir de samme seks målene
i **forkortet, parafrasert** form («reflektere over periodisering og vurdere kriterier for å dele
inn fortiden»). Word-dokumentet presenterer dem under overskriften «Kompetansemål pakken treffer»
og kan leses som offisiell gjengivelse. `kvalitetsstandard.md` krever presis gjengivelse «når de
presenteres som offisielle mål». Nettversjonen er korrekt; det er lærerveiledningen som burde
merkes som sammendrag. Dette er en fil jeg ikke skal endre, så det står her som anbefaling.

---

## 4. Lenkekontroll

Kontrollert 18. august 2026 med `curl -L` og innholdslesing. HTTP 403 nedenfor er
bot-blokkering av automatiske forespørsler, ikke døde lenker – innholdet ble hentet og lest
med nettleser-User-Agent, og verifisert mot `note`-feltet.

### `chapter.sources` (linje 679–685)

| Lenke | HTTP | Omdirigert | Innhold stemmer med `note`? | Status |
|---|---|---|---|---|
| udir.no/lk20/his01-03/…/kv84 | 200 | Nei | Ja – gjeldende kompetansemål vg2 | **OK** |
| openstax.org/…/2-3-the-neolithic-revolution | 200 | Nei | Ja – åpen læreboktekst om neolittisk tid | **OK** |
| whc.unesco.org/en/list/1405/ | 403 mot curl, 200 i nettleser | Nei | Ja – «eighteen levels … between 7400 bc and 6200 bc», gateløs husklynge med takadkomst | **OK** (se F-05 og F-07) |
| whc.unesco.org/en/list/1572/ | 403 mot curl, 200 i nettleser | Nei | Ja – «erected by hunter-gatherers … between 9,600 and 8,200 BCE», T-formede søyler | **OK** (se F-03 og F-04) |
| nature.com/articles/s41598-023-49406-5 | 200 | Cookie-parameter, samme vert | Ja – Parkinson m.fl. 2023, vekst/kosthold/demografi, sentrale Middelhavsområdet. `note` angir korrekt at studien er regional. | **OK** |

Ingen døde, ingen feilattribuerte, ingen omdirigert til annet innhold.

### DOI-er i `docs/produktstrategi.md`

Verifisert mot Crossrefs metadata-API, ikke mot lenkevisning.

| DOI | Oppført som | Faktisk verk | Status |
|---|---|---|---|
| 10.1038/s44159-022-00089-1 | Gjenhenting og spacing | Carpenter, Pan & Butler (2022): *The science of effective learning with spacing and retrieval practice*, Nature Reviews Psychology | **Riktig** |
| 10.1146/annurev-psych-010419-051019 | Gjenhenting og spacing | McDermott (2021): *Practicing Retrieval Facilitates Learning*, Annual Review of Psychology | **Riktig** |
| 10.3102/0034654307313795 | Formativ respons | Shute (2008): *Focus on Formative Feedback*, Review of Educational Research | **Riktig** |
| 10.1007/s10648-007-9056-1 | Historisk resonnering | van Drie & van Boxtel (2007): *Historical Reasoning: Towards a Framework for Analyzing Students' Reasoning about the Past*, Educational Psychology Review | **Riktig** |
| w3.org/TR/WCAG22/ (URL) | WCAG 2.2 | WCAG 2.2, W3C | **Riktig** |

**Alle fem peker til nøyaktig de arbeidene sammenhengen impliserer.** Ingen feilattribusjon.

---

## 5. Påstander uten kildedekning

Faglig rimelige påstander som **ikke** dekkes av noen av de fem kildene i `chapter.sources`
eller av de lokale Word-filene. Dette er ikke feil, men brudd på sporbarhetskravet.

1. **Çatalhöyük-funnene i detalj** (linje 644, 602): lagerrom, kornrester, dyrebein, obsidian,
   begravelser under husgulv. UNESCO dekker bare lag, datering, veggmalerier og husklyngen.
   Godt dokumentert i utgravningslitteraturen, men usitert her. → **F-05.**
2. **Obsidian over store avstander** (linje 602). Velbelagt (kappadokisk obsidian kjemisk
   sporet til Çatalhöyük), men ingen oppgitt kilde sier det.
3. **Sau og geit i Sørvest-Asia** (linje 593, 667, oppgave F3 linje 206). Ingen av de fem
   kildene daterer eller dokumenterer husdyrdomestisering. → henger sammen med **F-02.**
4. **Kina: ris, hirse og gris** (linje 593, F3 linje 207). Artene er korrekte, men griseholdet
   er ikke dekket av noen oppgitt kilde. OpenStax nevner ris, hirse og soyabønner – ikke gris.
5. **Ny-Guinea: taro og yam** (linje 593). OpenStax nevner taro; yam er udekket. → **F-08.**
6. **Andes: potet, quinoa og lama** (linje 593, F3 linje 209). OpenStax nevner bare potet.
   Quinoa og lama er udekket.
7. **«fram mot ca. 3500–3000 f.Kr. Større bysamfunn noen steder»** (linje 671). Rimelig for
   Uruk-perioden i Mesopotamia, men ingen oppgitt kilde daterer dette.
8. **Erosjon, jordutarming, saltproblemer og tap av biologisk mangfold** (linje 605, `facts[7]`
   linje 553). Faglig velkjent, men ingen av de fem kildene dokumenterer det for neolittisk tid
   spesifikt. Formuleringen er hedget med «kunne», så den er forsvarlig – men usitert.
9. **Smittepress fra husdyr og tett bosetning** (linje 601, U5 linje 361). OpenStax nevner
   sykdom fra avfallsopphopning, men ikke husdyrsmitte spesifikt.

**Anbefaling:** to–tre kilder til vil dekke punkt 1–6 og 9. Zeder 2008 (PNAS,
[10.1073/pnas.0801317105](https://doi.org/10.1073/pnas.0801317105)) dekker husdyr og
spredning i Middelhavsområdet; Denham m.fl. 2003 ([10.1126/science.1085255](https://doi.org/10.1126/science.1085255))
dekker Ny-Guinea; Çatalhöyük Research Project dekker punkt 1 og 2.

---

## 6. Det jeg ikke kunne verifisere

Eksplisitt liste. Disse står åpne, med begrunnelse for hva som må sjekkes manuelt.

1. **Om Göbekli Tepe-reinterpretasjonen er publisert fagfellevurdert.** Jeg fant DAIs egen
   prosjektside og pressedekning av de rektangulære bygningsstrukturene og indikasjonene på
   fast bosetning, men **fant ikke** en fagfellevurdert artikkel med DOI som legger fram
   funnene samlet. Dietrich 2021 om kornbearbeiding er verifisert
   ([10.2307/jj.15135970](https://doi.org/10.2307/jj.15135970)) og støtter deler av bildet.
   **Ikke verifisert:** styrken i den nye tolkningen. Må sjekkes mot siste publikasjon fra
   Clare/DAI før F-04 formuleres endelig. Jeg har ikke oppgitt noen DOI jeg ikke har kontrollert.
2. **Om «ca. 7400–6200 f.Kr.» er gjeldende datering for Çatalhöyük.** UNESCO oppgir dette, og
   kapitlet følger UNESCO. Men OpenStax – også en oppgitt kilde – skriver 7200–6000 f.Kr.
   Kapitlets to kilder er altså uenige med ca. 200 år. Jeg har ikke kontrollert hvilken
   radiokarbonmodell som ligger til grunn for hver. **Ikke et funn** – UNESCO er den sterkeste
   kilden og valget er forsvarlig – men uenigheten er ikke oppløst.
3. **Om «deler av Afrika» i `geography` (linje 528) er dekkende.** OpenStax nevner sorghum ved
   dagens Sudan for ca. 6 000 år siden. Jeg har ikke kontrollert om kapitlet burde nevnt perlehirse,
   yams i Vest-Afrika eller teff. Feltet er så generelt formulert at det ikke er feil.
4. **Om `progressVersion: 1` og den lokale lagringsnøkkelen tåler korrupte data** slik
   `kvalitetsstandard.md` krever. Ligger utenfor mandatet for en faktarevisjon, og jeg har ikke
   testet det.
5. **Kroppshøyde-påstander.** Mandatet ba meg se særlig etter dette. **Kapitlet gjør ingen
   påstand om kroppshøyde noe sted** – verken i `facts`, `narrative`, `effects` eller oppgavene.
   Det er etter min vurdering et bevisst og klokt valg, siden feltet spriker regionalt. Ingen
   kontroll var derfor nødvendig, og ingen mangel foreligger.
6. **Tannhelse.** Samme: kapitlet nevner det ikke. «Ensidig kosthold» og «ernæringsstress»
   brukes i stedet, konsekvent hedget. Forsvarlig.

---

## 7. Pedagogiske forenklinger jeg mener er forsvarlige

Skilt ut for at de ikke skal forveksles med funn.

- **«ca.» gjennomgående i tidslinjen.** Riktig håndtert. Usikkerheten er reell og markert.
- **«Jordbruksrevolusjonen» som begrep** til tross for at prosessen var langsom. Kapitlet
  problematiserer dette eksplisitt i oppgave F5 og i `concepts`. Godt gjort.
- **Fire regioner i F3 der fagfeltet opererer med flere sentre.** Rimelig avgrensning for vg2;
  `narrative` linje 593 nevner både Ny-Guinea og Afrika i tillegg.
- **«Neolittisk tid» = «yngre steinalder»** uten diskusjon av at begrepet er omstridt.
  `concepts` linje 564 fanger opp det viktigste (perioden starter ulikt i ulike regioner).
- **Fravær av tallfestede befolkningsestimater.** Kapitlet unngår tall det ikke kan belegge.
  Det er den riktige avgjørelsen.

---

## 8. Personvern og publiseringskontroll (punkt G i mandatet)

Kontrollert om fasit- eller prøvemateriale er lekket til offentlig innhold. **Ingen lekkasje funnet.**

- Alle tre Word-filene er eksplisitt listet i `.gitignore` under kommentaren «Lokale lærer- og
  kilderessurser skal ikke følge med kildepublisering». De følger ikke med kildepubliseringen.
- `teacherResources` (linje 675–678) har **ingen** `href`. Begge oppføringene beskriver bare at
  dokumentene finnes lokalt.
- `public/` inneholder bare `favicon.svg` og `og.png`. Ingen PDF-er, ingen dokumenter.
- `app/laerere/page.tsx` slår det fast eksplisitt: «Hemmelige prøver og fasiter legges ikke på
  en offentlig nettside uten et bevisst publiseringsvalg.»
- Modellresponsene i L4 og K4 (linje 439, 504) tilsvarer fasitens modellsvar, men det er
  **etter hensikten**: `kvalitetsstandard.md` krever at åpne oppgaver viser modellrespons
  *etter* at eleven har skrevet eget svar. Ikke et avvik.

Dette punktet er i orden.

---

## 9. Anbefalt rekkefølge for utbedring

**Før publisering – må gjøres:**

1. **F-01** – rett dateringen av holocens begynnelse til ca. 9700 f.Kr. Én linje. Kontroller
   samtidig at samme feil rettes i læringsarket, siden feilen er arvet derfra og ikke oppstod i
   digitaliseringen.
2. **F-02** – del tidslinjepunktet i to og skill dyrking fra domestisering; flytt sau og geit
   til ca. 8500–8000 f.Kr. Juster `facts[1]` tilsvarende. Gjør dette rett etter F-01, siden de
   to sammen avgjør om kapitlets kronologi henger sammen.
3. **F-03 og F-04** – rydd i Göbekli Tepe-kildeblikket: flytt tolkningen ut av `evidence`, og
   utvid `cannotProve` med forskningsstriden om bosetning. Dette er kapitlets kildekritiske
   kjerne og måles strengest mot kvalitetsstandarden.
4. **F-05** – legg til én kilde som dekker Çatalhöyük-funnene.

**Før publisering – bør gjøres:**

5. **F-09** – gjeninnfør de to setningene fra læringsarket, særlig «Makt må undersøkes, ikke
   antas». Dette er ren gjenoppretting av kvalitetssikret tekst og krever ingen ny vurdering.
6. **F-06** – hedge fødselsintervallet i narrativen og i U4.
7. **F-10** – rett fasiten for K3 fra C til B, slik at lærere ikke retter feil.

**Etterpå:**

8. **F-07, F-08** – to presiseringer, én setning hver.
9. **F-12** – vurder å samordne `causeChain` og L1, og presiser ledd 4.
10. **Punkt 5 i denne rapporten** – legg til de to–tre kildene som lukker de resterende
    dekningshullene.
11. **F-11** og merknaden om parafraserte kompetansemål i lærerveiledningen – gjelder Word-filene,
    ikke nettstedet, og kan tas i neste revisjon av lærermateriellet.

**Til slutt:** oppdater `lastChecked` først når endringene og lenkene faktisk er kontrollert på
nytt, i tråd med `kvalitetsstandard.md` og AGENTS.md regel 6.

---

## Metodenotat

- Kompetansemålene ble kontrollert med maskinell diff mot Udirs egen sidetekst, ikke ved
  gjennomlesing, slik at også tegnsetting og bøyning ble fanget.
- Alle DOI-er ble slått opp i Crossrefs metadata-API og kontrollert mot tittel, tidsskrift, år
  og forfatterliste.
- Alle lenker ble hentet med `curl -L` og deretter innholdslest.
- Word-filene ble konvertert til tekst fra `word/document.xml` og sammenlignet felt for felt mot
  kapittelobjektet.
- Ingen korreksjon i denne rapporten er oppgitt uten URL eller DOI. Der belegg manglet, står
  saken i seksjon 6 som «ikke verifisert» framfor å bli lukket.
- Ingen prosjektfiler er endret.
