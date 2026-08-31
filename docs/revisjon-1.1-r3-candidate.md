# Kritisk sluttkontroll: kapittel 1.1

**Dato:** 31. august 2026
**Overgang:** R2 → R3_CANDIDATE
**Omfang:** Kapittel 1.1 «Hva kan vi vite om fortiden?» og felles visning/tester som leveransen bruker.

## Kontroll

Sluttkontrollen ble gjennomført som en ny gjennomgang av en annen utvikler/redaksjon. Innholdsmodellen, R1-kildematrise, kildekontroll, proveniens, rettigheter og `lastChecked` ble holdt opp mot implementasjonen. Ingen nye historiske hovedpåstander eller kilder ble lagt til i sluttkontrollen; Manzanar-caset, de fire materialvinduene og avgrensningene bygger på det eksplisitt godkjente R1-grunnlaget.

Kontrollert særskilt:

- fakta → forståelse → lange linjer, tidsrom/sted, begreper, tidslinje og kildehenvisninger;
- observasjon, tolkning, alternativ, representativitet, fravær og begrensning;
- fire materialtyper med synlig opphav, formidlingsvei, rettighetsstatus og ekstern lenke der lokal fil ikke er godkjent;
- seks trinn i kildeverkstedet, hint etter første feil, modellrespons etter eget svar og påkrevd reell revisjon;
- lokal, versjonert nettleserlagring uten nettverkskall, konto, cookies, analyse eller elevregistrering;
- tastatur/fokus, statusregioner, redusert bevegelse, interne lenker og mobilbredde.

## Funn og rettinger

- Baseline hadde en manglende `};` i kapittelsiden, en avkortet 1.1-test og feil nestede SSR-testblokker. Dette er reparert før videre validering.
- To generelle presentasjonsfeil ble lukket: grammatisk kapitteltekst og dobbelt punktum i egenvurderingen.
- Mobilkontroll avdekket at lang Q-01-proveniens og begrepet «Sammenstilling/korroborering» kunne utvide siden. Kildeliste, mobil-grid og begrepskort bryter nå lange innholdsbiter uten side-overflow.
- To SSR-personvernassertions var for brede og traff lovlig forklaringstekst som «fødselsår» og «fasit». De kontrollerer nå faktisk lokal fil-/feltlekkasje, ikke omtalen av hva som ikke publiseres.
- Lange tekstinput i testene brukte unødvendig treg tastatursimulering og ga suite-timeout. Testene bruker direkte input-hendelser, mens brukerflyten fortsatt er dekket av klikktester og fokus-/statuskontroller.

Ingen blokkerende faglig, rettighetsmessig, personvernmessig eller teknisk avvik står igjen.

## Porter

- `npm run typecheck` — grønn.
- `npm run lint` — grønn.
- `npm test` — grønn: produksjonsbuild, 76/76 enhetstester og 8/8 SSR-/internlenketester.
- Headless Chrome mot ren produksjonsserver — HTTP 200 ved 320, 375 og 1440 px; ingen side-overflow, konsollfeil eller ikke-planlagte nettverkskall; `#oppgaver` og lenken til 2.2 fungerer; modellresponsen er skjult før eget svar.

## Konklusjon

Kapittel 1.1 oppfyller kriteriene for `R3_CANDIDATE`. Dette er ikke menneskelig R3-godkjenning. Neste menneskeport er godkjenning av kandidaten og eventuell uttrykkelig tillatelse til lokal commit; push, pull request, merge, deploy og publisering er ikke utført.