# Repetisjonsinngangen

Repetisjonsinngangen er en offentlig, kapittelbevisst økt for aktiv gjenhenting. Den avleder elementer fra `content/chapters.ts` og blander kvalitetssikrede faktapunkter, begreper, eksisterende oppgaver og kildeverkstedets påstander. Nye kapitler med `status: "published"` tas inn automatisk på `/repetisjon`.

## Elevreisen

Første besøk viser en tomtilstand med lenke til et publisert kapittel. Eleven må ha vært innom kapitlet før den første økten startes. En økt inneholder maksimalt fem elementer uten poeng, streaks eller konkurranse. Lukkede oppgaver bruker stabile semantiske svarverdier og seedet stokking; første feil gir hint og et nytt forsøk kan vise forklaring. Begreper og åpne oppgaver krever et eget svar før definisjon eller modellrespons vises.

Etter hvert element velger eleven «prøv igjen snart», «litt usikker» eller «jeg fikk det fram». Dette er egenvurdering, ikke automatisk vurdering eller karaktersetting. Dynamiske meldinger ligger i en permanent statusregion; fokus flyttes ikke uventet når neste element vises.

## Planleggingsheuristikk

Forskningsstøttede prinsipper i løsningen er aktiv gjenhenting, øving med avstand og respons etter et forsøk. Den konkrete planen er prosjektets enkle heuristikk, ikke en optimal eller vitenskapelig eksakt algoritme:

- «Prøv igjen snart» gir neste dato i dag og holder elementet på et tidlig trinn.
- «Litt usikker» gir normalt 2, 3 eller 7 dager avhengig av trinn.
- «Jeg fikk det fram» flytter elementet videre til 3 eller 14 dager.

Planleggeren er ren og deterministisk. Den tar inn dato og seed, bruker UTC-baserte datonøkler, prioriterer forfalte datoer, blander innholdstyper innen samme dato og fjerner duplikater. Ugyldig dato eller ugyldig lagring gir en trygg tom kø.

## Lokal lagring og personvern

Repetisjon bruker nøkkelen `historie-i-sammenheng:repetition:v1`. Verdien er en versjonert envelope med kapittel-ID, kapittelets `progressVersion`, stabil element-ID, trinn, neste dato, siste resultat og siste repetisjonstidspunkt. Ukjente versjoner, korrupte elementer, fjernede elementer og ugyldige datoer forkastes uten at siden krasjer. En trygg versjon 0 kan migreres; ugyldige deler tas ikke med videre.

Ingen svar, identifikatorer eller bruksdata sendes eksternt. Sletting fjerner bare repetisjonsnøkkelen; oppgave- og egenvurderingslagring i de eksisterende komponentene berøres ikke.

## Lærerbruk

Læreren kan bruke økten som en kort start, avslutning eller avtalt gjenhenting noen dager etter arbeid med kapitlet. Lokal egenvurdering kan gi eleven et språk for hva som føles sikkert eller uklart, men sier ikke hva læreren kan dokumentere som læringsresultat. Løsningen er ikke karaktersetting og ikke lærerovervåking.
