# Faglig og pedagogisk revisjon

**Dato:** 20. august 2026
**Omfang:** Det eneste publiserte kapitlet, 2.2 «Jordbruksrevolusjonen», samt alle offentlige ruter, oppgaver, kildevisning, lokal framdrift og de tre lokale Word-kildene i prosjektroten.

## Kontrollerte prosjektfiler

- `AGENTS.md`, `docs/produktstrategi.md`, `docs/kvalitetsstandard.md` og `docs/veikart.md`
- `content/chapters.ts` i sin helhet, inkludert 19 oppgaver, tidslinje, begreper, lange linjer, kildeblikk og kilder
- `app/`-rutene, særlig `app/laereverk/[section]/[chapter]/page.tsx`, og komponentene for oppgaver, navigasjon, lenker og egenvurdering
- `app/globals.css` og `tests/rendered-html.test.mjs`
- `2.2_Jordbruksrevolusjonen_kortprove.docx`, `2.2_Jordbruksrevolusjonen_larerveiledning_og_fasit.docx` og `2.2_Jordbruksrevolusjonen_laringsark.docx` ved direkte tekstuttrekk fra `word/document.xml`. Word-filene er ikke offentlige og ble ikke endret.

## Kildegrunnlag

## Oppfølging: kvalitetsherding av kapittel 2.2

**Kontrollert:** 23. august 2026. Utgangspunkt: `1c6cec4` med en ukommittert arbeidskopi fra en tidligere økt. Arbeidskopien ble beholdt i sin helhet, men hver påstand i den ble kontrollert på nytt mot kode, innhold og primærkilder før den ble godtatt.

### Rettighetskontroll mot utgiver

Alle elleve kildeoppføringer ble kontrollert mot utgiverens egne sider eller mot Crossref.

| Kilde | Lisensstatus | Grunnlag |
|---|---|---|
| OpenStax, World History Volume 1 | **CC BY-NC-SA 4.0** (rettet fra CC BY 4.0) | Lisensangivelsen på [kapittelsiden](https://openstax.org/books/world-history-volume-1/pages/2-3-the-neolithic-revolution) |
| UNESCO, Çatalhöyük | CC-BY-SA IGO 3.0 | Angitt på [whc.unesco.org/en/list/1405](https://whc.unesco.org/en/list/1405/) |
| UNESCO, Göbekli Tepe | CC-BY-SA IGO 3.0 | Angitt på [whc.unesco.org/en/list/1572](https://whc.unesco.org/en/list/1572/) |
| Dietrich m.fl. (2019), PLOS ONE | CC BY 4.0 | Crossref-lisensfelt for [10.1371/journal.pone.0215214](https://doi.org/10.1371/journal.pone.0215214) |
| Parkinson m.fl. (2023), Scientific Reports | CC BY 4.0 | Crossref-lisensfelt for [10.1038/s41598-023-49406-5](https://doi.org/10.1038/s41598-023-49406-5) |
| Çatalhöyük Research Project, Site Guide Book | **Udokumentert** | Hele PDF-en (6 521 104 byte) ble lastet ned og gjennomsøkt. Ingen forekomst av «Creative Commons», «CC BY», «NonCommercial», «Attribution» eller «licen». De sju «copyright»-treffene er innebygd fontmetadata fra Adobe, ITC og HP, ikke dokumentets egen rettighetsangivelse. |
| Zeder (2008), PNAS | Ingen åpen lisens oppgitt | Crossref oppgir ingen lisens; brukt som referanse, ikke gjenbrukt |
| Denham m.fl. (2003), Science | Ingen åpen lisens oppgitt | Crossref oppgir ingen lisens; brukt som referanse, ikke gjenbrukt |
| Udir, ICS, DAI | Institusjonelle kilder | Lenkene svarer 200; kun referanse og egen formulering |

Tre rettelser som verken revisjonsrapporten eller arbeidskopien hadde gjort:

- **Oppdiktet kildetittel.** Kildelisten oppga «Scientific Reports (2023) · Bioarchaeological data and the transition to farming». Det er ikke artikkelens tittel. Crossref gir den publiserte tittelen «Multiproxy bioarchaeological data reveals interplay between growth, diet and population dynamics across the transition to farming in the central Mediterranean». Tittelen er rettet ordrett, og regresjonstesten som låste den feilaktige tittelen som «verifisert» er oppdatert.
- **Overstrukket kildebruk.** Faktapunktet om befolkningsvekst tilskrev «større smittepress» til en artikkel som ikke behandler smitte, og uten geografisk forbehold. Punktet er delt: kosthold og arbeidsbelastning er nå eksplisitt knyttet til vekst-, kroppsmasse- og isotopdata fra det sentrale Middelhavsområdet, mens smittepress er nedgradert til «kan i tillegg ha».
- **Uverifisert lisens i materialfeltet.** `materials[0].rights.licenseStatus` påsto fortsatt «CC BY-NC 4.0» for prosjektguiden etter at `sourceRights` var rettet. Feltet sier nå at guiden ikke oppgir noen lisens.

Ingen nye bilder, kart eller mediefiler er tatt inn. `lastChecked` for kapitlet er ikke flyttet: rettigheter, struktur og grensesnitt er kontrollert, men hele fagteksten er ikke gjennomgått på nytt.

### Svarlekkasje: målt før og etter

Målt med et uavhengig skript mot `content/chapters.ts` ved `1c6cec4` og etter leveransen.

| Mål | Før (`1c6cec4`) | Etter | Krav |
|---|---|---|---|
| Fasit er lengste alternativ | 12/13 = **92 %** | 2/13 = **15 %** | ≤ 30 % |
| Fasit er korteste alternativ | 0/13 | 0/13 | ingen omvendt signal |
| Fasit eneste alternativ med forbehold | 5 | **0** | 0 |
| Største lengdespredning i én oppgave | **119 %** | **24 %** | ≤ 25 % |
| `order`-oppgaver med `expected` lik `items` | 2 (F4, L1) | **0** | 0 |

Mellomresultat verdt å merke: arbeidskopien hadde presset «fasit er lengst» til 0/13, men samtidig gjort fasiten til **korteste** alternativ i 6 av 13 (46 %). Det er et omvendt signal av samme type. Balansen var dessuten delvis oppnådd ved å fylle distraktorer med innholdstomme fraser («over tid i regionen», «i alle detaljer og perioder»), noe som er uttrykkelig uønsket. Elleve alternativer er derfor skrevet om for naturlig norsk, og lengderangeringen av fasiten fordeler seg nå på 7/5/1 over rangposisjon 1, 2 og 3 uten noen degenerert posisjon.

### Presentasjonsrekkefølge, stabile verdier og lagring

- `components/seededOrder.ts` gir en deterministisk FNV-1a-seedet Fisher–Yates-permutasjon. Samme seed gir samme rekkefølge; ny seed gir ny rekkefølge.
- Flervalgsalternativer, valgpuljer i koblingsoppgaver, elementer som skal sorteres, samt verkstedets påstander og kategorietiketter stokkes hver for seg.
- Fasit er ikke lenger knyttet til visningsindeks. Svar lagres som den stabile semantiske strengverdien, ikke som `"0"`/`"1"`. Gammel indeksbasert lagring migreres i `normalizeStoredState`; ugyldige og ukjente versjoner forkastes som før.
- «Øv på nytt» øker en teller per oppgave som inngår i seeden, slik at rekkefølgen endres uten at fasiten endres.

### Kildeverkstedets påstander

Påstandssettet er utvidet fra 4 til **8**, med to påstander i hver av de fire kategoriene, slik at fordelingen ikke lenger er kjent på forhånd og kategoriene ikke danner et én-til-én-mønster. Det leksikalske signalet er fjernet: påstandene er nå flate utsagn om materialet, ikke gjenkjennelige modalformler («Det er mulig at …», «Funnene beviser at alle …», «Materialet alene avgjør nøyaktig …»). Alle åtte er forankret i de to allerede dokumenterte materialene; ingen nye udokumenterte påstander er innført.

### Kronologi

`TimelinePoint` har et obligatorisk heltallig `sortKey` (negativt for år før vår tidsregning). Modellen validerer at verdien finnes og at punktene står ikke-synkende, og tidslinjen eksporteres sortert uavhengig av rekkefølgen i kildefilen. Visningsteksten er beholdt, med ett unntak: punktet «Flere regionale jordbrukssystemer» var merket «senere årtusener», men fikk `sortKey −8000` og havnet dermed foran Çatalhöyük. Visningen sa «senere», plasseringen sa tidligere. Datoteksten er rettet til «ca. 8000–3000 f.Kr.», som er det de to siterte kildene faktisk dekker: OpenStax daterer Kina til omtrent ti tusen år siden og Andes til omtrent fem tusen år siden.

### Fokus, overskrifter og navigasjon

- **Fokusfeilen var ikke rettet i arbeidskopien, bare tilsynelatende rettet.** `workshopTopRef` pekte på en tom, selvlukkende `<div>`, slik at `querySelector(".source-workshop-step h4")` alltid ga `null` og effekten falt ut før både fokusflytting og rulling. Referansen er flyttet til verkstedets faktiske rotelement. Rettelsen er mutasjonstestet: begge fokustestene feiler på den gamle koden og består på den nye.
- Trinnbytte flytter nå fokus til trinnets `<h4>` med `tabIndex={-1}`, ruller verkstedet i syne og bruker `behavior: "smooth"` bare når brukeren ikke har bedt om redusert bevegelse. Fokus flyttes aldri til `body`, og statusregionen for skjermleser er beholdt.
- Kildeverkstedseksjonen mistet sin `<h2>` i arbeidskopien og hoppet dermed fra seksjon til `<h3>`. Den har fått tilbake en egen `<h2>` «Kildeverksted», som ikke gjentar verkstedets egen tittel.
- Oppgavefasenes «eyebrow» gjentok fasenavnet ordrett rett over samme tekst som `<h3>`. Den viser nå «Oppgavesett».
- Innholdsfortegnelsen utledes av `chapterRenderedSectionOrder` og `chapterNavigationSections`, så meny, nummerering og DOM-rekkefølge følger én datadefinisjon. «Fagtekst» er med.

### Tester og kontroller

`tests/content-quality.test.ts` er utvidet til 18 tester og dekker nå også: seed-stabilitet og seed-variasjon over flere seeds, at fasiten overlever stokking som semantisk verdi, at `seededOrder` er en tapsfri permutasjon for alle lengder, at fasiten verken er systematisk lengste eller systematisk korteste alternativ, at ingen oppgave har fasiten som eneste nyanserte alternativ, at verkstedet har 6–8 påstander med minst to i samme kategori, at påstandene ikke danner et trivielt diagonalt mønster, at forklaringene er unike og kilde-ID-ene gyldige, og at tidslinjen har gyldige, kronologisk sorterte `sortKey`-verdier. `tests/source-workshop.test.tsx` har fått to fokustester.

## Oppfølging: kildeverksted for 2.2

**Kontrollert:** 22.–23. august 2026.

Kildeverkstedet bruker to tekstlige, materielle kildesett: lagdelte hus- og bosetningsspor fra Çatalhöyük og redskaps-/plantespor knyttet til kornbearbeiding ved Göbekli Tepe. Eleven møter først dokumenterte beskrivelser uten ferdig tolkning, før tid, sted, funnkontekst, bevaring og dokumentasjonsbegrensninger blir synlige. Påstandene er med hensikt fordelt på direkte støtte, mulig tolkning, for sterk konklusjon og «ikke mulig å avgjøre».

Faglig kontroll: Çatalhöyük-materialet bygger på UNESCOs stedbeskrivelse og Çatalhöyük Research Project sin guide; Göbekli Tepe-materialet bygger på UNESCO, Deutsches Archäologisches Instituts oppdaterte prosjektbeskrivelse og Dietrich m.fl. (2019) om redskaper, fytolitter og kornbearbeiding. DAI-kilden er brukt for å unngå en for enkel «rituell plass»-fortelling: nyere funn gjør tolkningen mer sammensatt, med både hverdagslige og rituelle trekk. Verkstedet hevder derfor ikke at materialet alene avgjør sosial makt, identiske roller, felles tro eller én bestemt funksjon.

Rettighetskontroll: ingen bilder eller andre mediefiler ble kopiert inn i prosjektet. Verkstedet bruker korte, egne beskrivelser og viser kilde- og lisensstatus i modellen; eventuelle offentlige mediefiler ville krevd eksisterende fil, alternativtekst, opphav, lisens og kreditering før visning.

Kildene ble åpnet og lest 20. august 2026: [Utdanningsdirektoratets kompetansemål for HIS01-03](https://www.udir.no/lk20/his01-03/kompetansemaal-og-vurdering/kv84), [International Commission on Stratigraphy sin GSSP-tabell](https://stratigraphy.org/gssps/), [Zeder (2008)](https://doi.org/10.1073/pnas.0801317105), [Denham m.fl. (2003)](https://doi.org/10.1126/science.1085255), [Dietrich m.fl. (2019)](https://doi.org/10.1371/journal.pone.0215214), [UNESCO om Çatalhöyük](https://whc.unesco.org/en/list/1405/), [Çatalhöyük Research Project sin site guide](https://catalhoyuk.ku.edu.tr/sites/default/files/Catalhoyuk-Guidebook-ENGLISH.pdf), [UNESCO om Göbekli Tepe](https://whc.unesco.org/en/list/1572/), [DAIs prosjektoversikt](https://www.dainst.org/en/research/projects/noslug/5746) og kapitlets åpne lærebokkilde fra OpenStax.

Udir-målene i innholdsmodellen er fortsatt ordrette. ICS-kilden bruker 11 700 år før 2000 (b2k), ikke kalenderåret 11 700 f.Kr. Çatalhöyük-guiden støtter opplysninger om hus, lagring, matbehandling, begravelser, obsidian og utveksling. Forskningen på Göbekli Tepe støtter en mer sammensatt framstilling enn «mobilt tempel bygget av jegere og sankere» alene.

## Vesentlige funn og gjennomførte rettinger

| Alvor | Funn | Tiltak |
|---|---|---|
| Kritisk | Holocens begynnelse stod som ca. 11 700 f.Kr.; tallet var blandet sammen med b2k-datering. | Rettet til ca. 9700 f.Kr. og forklart i tidslinjen. |
| Vesentlig | Dyrking av ville kornslag, domestiserte planter og husdyr ble slått sammen i én datering. | Tidslinjen er delt i dyrking ca. 9600–8800 f.Kr. og senere domestiserte kornslag, sau og geit ca. 8700–8000 f.Kr.; formuleringen er avgrenset regionalt. |
| Vesentlig | Göbekli Tepe listet jegere/sankere, planlegging og samarbeid som om alt var direkte funn. | `evidence` viser nå observerbare spor; samarbeid og leveform er flyttet til støttet tolkning. `cannotProve` synliggjør at stedets funksjon og bosetningsgrad fortsatt tolkes. |
| Vesentlig | Flere Çatalhöyük-påstander manglet kilde i modellen. | Prosjektguiden er lagt til som navngitt kilde. |
| Mindre | Fødselsintervall ble formulert som en sikker mekanisme. Ny-Guinea-eksempelet fremhevet taro/yam uten å nevne den best dokumenterte bananen. | Begge er formulert som mulige/trolig forklaringer; banan er lagt til og taro/yam er avgrenset. |
| Mindre | K3-distraktorer gjorde riktig svar lett å gjette, og flere hint røpet svaret. | Flervalgsteksten og hintene er revidert mot dokumenterte misoppfatninger og mer oppgavenære kriterier. |
| Mindre | Den tidligere digitale teksten manglet forbeholdet «Makt må undersøkes, ikke antas». | Forbeholdet og setningen om avlingssvikt er bevart i kjernefortellingen. |

## Implementerte produktforbedringer

1. Sentrale faktapunkter, tidslinjepunkter og kildeblikk har nå eksplisitte kilde-ID-er. Elevene kan følge en nummerert henvisning direkte til riktig kilde, og innholdsmodellen validerer at alle henvisninger finnes.
2. «Øv på nytt» finnes per oppgavefase. Ny øving nullstiller svar og respons, men beholder forsøk og siste fullføringsdato. Gjentatte identiske innsendinger teller ikke som nye forsøk.
3. Åpne svar krever et meningsbærende minimum på tekst og ord, viser modellrespons uten å låse tekstfeltet, og kan revideres.
4. Statusregioner er permanente i DOM, framdrift kunngjøres separat, og den visuelle innholdsfortegnelsen følger samme DOM-rekkefølge på mobil. Egenvurderingen lagres lokalt med kapittel- og versjonsnøkkel.
5. Tekstkontrasten er mørknet til en verdi som dekker de tidligere grensetilfellene. Ingen data sendes eksternt.

## Pedagogisk vurdering

Styrkene er tydelig progresjon fra fakta til forståelse og lange linjer, gode forbehold i årsakskjeder, flere regionale eksempler, og kildeoppgaver som ber eleven skille funn, slutning og begrensning. Læreplanmål, fagtekst og oppgaver dekker samme hovedspørsmål.

De viktigste svakhetene som gjenstår er at oppgavene fortsatt ligger samlet etter fagteksten, og at nettportalen ikke ennå viser hele undervisningsløpet, misoppfatningslisten og fasit for læreren. Repetisjon er nå teknisk mulig, men tverrkapitlig repetisjon finnes ikke fordi bare ett kapittel er publisert. Dette er bevisste avgrensninger, ikke grunnlag for å publisere et nytt kapittel uten tilsvarende kildekontroll.

## Fortsatt usikkerhet og kildebehov

- Nøyaktige dateringer av tidlig flokkforvaltning og domestisering varierer etter art, region og metode; teksten bruker derfor intervaller og regionale forbehold.
- Çatalhöyük dateres litt ulikt i ulike oversikter. Tidslinjen følger UNESCOs avgrensning for den østre haugen og sier eksplisitt at «18» gjelder neolittiske lag der.
- Göbekli Tepe kan ikke reduseres til én funksjon. Den tilgjengelige forskningen støtter kornbearbeiding og mer integrerte ritual-/hverdagsfortolkninger, men avgjør ikke alene hvor permanent eller primært rituell bosetningen var.
- De lokale Word-kildene har enkelte fasit- og dateringsformuleringer som ikke er synkronisert med nettmodellen. De er ikke lenket eller publisert; neste revisjon bør enten merke dem som arbeidsmateriale eller oppdatere dem samlet.

## Anbefalt neste faglige prioritet

Komponenttestene for første feil, nytt forsøk, åpne svar, kildeverkstedets seks trinn, kapittelspesifikk lagring og korrupt lagring er nå levert som en egen teknisk milepæl. Læreroversikten har fått en egen kildeverksteddel med undervisningsplassering, faglige skiller, misforståelser, samtalespørsmål og vurderingskriterier. Prøver og fasiter holdes fortsatt utenfor offentlig publisering.