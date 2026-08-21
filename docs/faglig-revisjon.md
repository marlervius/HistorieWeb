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

Komponenttestene for første feil, nytt forsøk, åpne svar, fasesletting, kapittelspesifikk lagring og korrupt lagring er nå levert som en egen teknisk milepæl. Neste faglige prioritet er læreroversikten med undervisningsløp, misoppfatninger og vurderingskriterier fra de lokale kildene, mens prøver og fasiter fortsatt holdes utenfor offentlig publisering.