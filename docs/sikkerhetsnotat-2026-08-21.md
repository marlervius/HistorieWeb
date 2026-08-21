# Sikkerhetsnotat · 21. august 2026

## Resultat

`npm audit` etter oppgradering viser 1 lavt funn, 0 moderate, 0 høye og 0 kritiske funn. Det ble ikke brukt `npm audit fix --force`.

## Endringer og vurdering

- `next`: oppgradert fra 16.2.6 til 16.3.2. Dette dekker Next.js-funnene knyttet til spesiallagde forespørsler mot middleware/proxy under de berørte betingelsene. Next er en direkte produksjonsavhengighet, så oppgraderingen ble prioritert.
- `sharp` og `postcss`: kom inn via Next/buildkjeden. Next 16.3.2 trekker inn patched versjoner som dekker de rapporterte sikkerhetsfunnene.
- `vitest`: oppgradert fra 3.2.4 til 3.2.7. Funnene gjaldt særlig nettverkseksponert Vitest UI eller Windows UI-/browser-modus. Prosjektet kjører `vitest run` uten UI-server, men oppgraderingen er likevel gjort.
- `brace-expansion`, `js-yaml` og `nanoid`: oppdatert til kompatible transitive versjoner gjennom låsefilen. De brukes i utviklings-/byggeverktøykjeden, ikke av elevsiden som kjørende kode.
- Restpunkt: `@babel/core` 7.29.0 har fortsatt det lave funnet GHSA-4x5r-pxfx-6jf8. Det er en indirekte avhengighet via `eslint-plugin-react-hooks`. NPM oppgir en tilgjengelig oppgradering, men gjeldende patched hovedserie er Babel 8; den er ikke tatt inn som en uavklart major-oppgradering. Følg opp når ESLint-/Babel-kjeden er klar for dette.

## Kontrollpunkter

- Ingen middleware, i18n-proxy, server actions, database, autentisering, cookies, analyseverktøy eller elevregistrering er lagt til.
- Den offentlige læreroversikten inneholder ikke lokale Word-lenker, prøveoppgaver eller fasit. Lokalt materiale er modellert som synlig status uten URL.
- Låsefilen er oppdatert etter kompatible patch-/minor-oppgraderinger. Siste audit ble kjørt etter oppdateringen.

## Offisielle referanser

- Next.js-advisory: https://github.com/advisories/GHSA-6gpp-xcg3-4w24
- Vitest-advisory: https://github.com/advisories/GHSA-5xrq-8626-4rwp
- brace-expansion-advisory: https://github.com/advisories/GHSA-3jxr-9vmj-r5cp
- sharp-advisory: https://github.com/advisories/GHSA-f88m-g3jw-g9cj
- postcss-advisory: https://github.com/advisories/GHSA-fxqj-rqcc-2cmp
- Babel-advisory: https://github.com/advisories/GHSA-4x5r-pxfx-6jf8
- Next.js release-/sikkerhetsinformasjon: https://nextjs.org/blog
