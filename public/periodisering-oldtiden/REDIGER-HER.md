# Periodisering og oldtiden – redigering

Denne nettsiden er satt opp slik at du normalt bare trenger å redigere én fil:

`public/periodisering-oldtiden/innhold.js`

I den filen kan du endre titler, introduksjoner, delnavn, spørsmål, svaralternativer, hint, forklaringer, tidslinje, kildeblikk, læringsmål og hovedspørsmål.

## Slik redigerer du i GitHub

1. Åpne `public/periodisering-oldtiden/innhold.js`.
2. Trykk på blyantikonet **Edit this file**.
3. Endre teksten du vil endre.
4. Velg **Commit changes**.
5. Når endringen ligger på `main`, bygger og publiserer Vercel automatisk via repoets GitHub-integrasjon.

## Viktig ved flervalg

- Behold fire elementer i `options`.
- `answer` må være nøyaktig lik teksten i det riktige alternativet.
- Rekkefølgen på alternativene på elevsiden styres av nettstedet, så riktig svar trenger ikke stå først i `options`.
- Ikke endre `id` eller `type` uten å endre programkoden samtidig.

Selve designet og funksjonene ligger i `index.html`. Du trenger normalt ikke åpne den filen.
