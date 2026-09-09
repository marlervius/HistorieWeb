/*
  ================================================================
  REDIGER INNHOLDET PÅ NETTSIDEN HER
  ================================================================

  Dette er den eneste filen du normalt trenger å endre.

  Du kan trygt endre:
  - titler og undertitler
  - introduksjonstekster
  - navn og beskrivelser på de seks delene
  - spørsmål, svaralternativer, hint og forklaringer
  - tidslinjetekster
  - kildeblikk
  - læringsmål og hovedspørsmål

  VIKTIG FOR FLERVALG:
  - behold fire svaralternativer i `options`
  - `answer` må være helt lik teksten i det riktige alternativet
  - ikke endre `id` eller `type` med mindre du vet hva du gjør

  Når du redigerer i GitHub og velger "Commit changes", publiseres
  endringen automatisk av Vercel når GitHub-integrasjonen er aktiv.
*/

window.HISTORIE_CONTENT = {
  site: {
    documentTitle: 'Periodisering og oldtiden – kan du stoffet?',
    brand: 'Historie VG2',
    heroEyebrow: 'Læringsside · Historie VG2',
    title: 'Periodisering og oldtiden',
    subtitle: 'Hvor godt kan du stoffet?',
    intro: 'Her kan du teste deg selv. Start med fakta og begreper. Etter hvert blir oppgavene litt vanskeligere.',
    heroNote: '✓ Trening og mestring · ingen karakter',
    footerNote: 'Svar og progresjon lagres bare lokalt i denne nettleseren. Ingen elevdata sendes til eksterne tjenester.'
  },

  sections: [
    {id:1,title:'Kan du begrepene?',desc:'Koble ord og forklaringer. Start med byggesteinene.'},
    {id:2,title:'Kan du fakta?',desc:'Korte oppgaver om periodisering, skrift, oldtid og riker.'},
    {id:3,title:'Kan du tidslinjen?',desc:'Plasser samfunn og riker grovt i tid – og se at perioder varierer.'},
    {id:4,title:'Forstår du sammenhengene?',desc:'Årsaker, systemer, brudd, kontinuitet og perspektiv.'},
    {id:5,title:'Kildeblikk',desc:'Hva kan en tidlig leirtavle fortelle – og ikke fortelle?'},
    {id:6,title:'Kan du læringsmålene?',desc:'Sluttkontroll og egenvurdering før hovedspørsmålet.'}
  ],

  sectionIntros: {
    1: ['FAKTA','Begrepene er verktøyene du trenger videre. Koble ord og forklaringer, og forklar med egne ord.'],
    2: ['FAKTA','Korte kontrolloppgaver. Ingen lureoppgaver – bruk det du har lest i læringsarket.'],
    3: ['FAKTA → FORSTÅELSE','Bruk omtrentlige dateringer som holdepunkter. Legg merke til at samme periode ikke starter samtidig overalt.'],
    4: ['FORSTÅELSE','Nå handler det mer om hvorfor og hvordan: årsaker, periodiseringssystemer, perspektiv og lange linjer.'],
    5: ['KILDEBLIKK','En liten kildeøvelse med den tidlige leirtavlen fra Mesopotamia. Skriv først selv – sammenlign etterpå.'],
    6: ['LANGE LINJER','Test læringsmålene, vurder egen sikkerhet og avslutt med hovedspørsmålet.']
  },

  questions: {
    1: [
      {id:'b1',type:'mc',area:'kronologi',prompt:'Hvilket begrep betyr «rekkefølgen på hendelser og perioder»?',options:['epoke','kronologi','kriterium','perspektiv'],answer:'kronologi',hint:'Tenk på ordet som handler om hva som kom før, samtidig og etter.',explain:'Kronologi viser rekkefølgen på hendelser og perioder – hva som kom før, samtidig og etter.'},
      {id:'b2',type:'mc',area:'periodisering',prompt:'Hva er den beste forklaringen på periodisering?',options:['Å dele historien inn i perioder for å få oversikt','Å finne én riktig dato som deler hele verdenshistorien','Å bruke bare skriftlige kilder','Å rangere samfunn etter hvor utviklet de var'],answer:'Å dele historien inn i perioder for å få oversikt',hint:'Fortiden har ingen naturlige kapitteloverskrifter.',explain:'Periodisering betyr at vi deler historien inn i perioder for å få oversikt. Grensene er laget av mennesker.'},
      {id:'b3',type:'match',area:'begreper',prompt:'Koble begrepene til riktig forklaring.',pairs:[
        ['epoke','En periode i historien. Grensene er laget av mennesker og kan diskuteres.'],
        ['kriterium','Det vi bruker som grunnlag når vi trekker en grense.'],
        ['perspektiv','Hva vi velger å se historien fra.'],
        ['eurosentrisk','Å bruke Europas historie som målestokk for hele verden.'],
        ['treperiodesystemet','Steinalder – bronsealder – jernalder.'],
        ['historisk tid','Tiden der skriftlige kilder blir viktige.'],
        ['forhistorisk tid','Tiden før skriftlige kilder blir omfattende og sentrale.']
      ],hint:'Se etter nøkkelord: grunnlag, synsvinkel, Europa, skrift og materialer.',explain:'Disse begrepene er nøkkelverktøy når vi skal forklare hvordan og hvorfor historien deles inn.'},
      {id:'b4',type:'mc',area:'brudd og kontinuitet',prompt:'Hva beskriver begrepet kontinuitet?',options:['Det som fortsetter selv om noe annet forandrer seg','En tydelig endring','En grense mellom to land','En bestemt type skrift'],answer:'Det som fortsetter selv om noe annet forandrer seg',hint:'Brudd handler om endring. Hva er motstykket?',explain:'Kontinuitet er det som fortsetter, selv om noe annet forandrer seg. Et brudd er en tydelig endring.'},
      {id:'b5',type:'match',area:'oldtid og antikken',prompt:'Koble de historiske begrepene til forklaringen som passer best.',pairs:[
        ['oldtid','En bred betegnelse for tiden fra de tidligste bysamfunnene og statene til overgangen mot middelalderen.'],
        ['antikken','I dette kurset: den gresk-romerske verden, grovt ca. 800 f.Kr. til ca. 500 e.Kr.'],
        ['sivilisasjon','Store og organiserte samfunn med gjerne byer, styring, ulike yrker og tydelige maktforskjeller.'],
        ['imperium','Et rike som styrer over mange områder og folk.'],
        ['bystat','En by som fungerer som en egen stat med eget styre.'],
        ['rike','Et større politisk område styrt som én enhet.']
      ],hint:'Antikken er smalere enn oldtiden. Imperium handler om å styre mange områder og folk.',explain:'Viktigst her er at antikken er én del av oldtiden, og at bystater, riker og imperier ikke er samme type politisk organisering.'},
      {id:'b6',type:'mc',area:'systemer',prompt:'Hvilket begrep passer ikke inn i denne rekken – og hvorfor?',context:'steinalder · bronsealder · jernalder · middelalder',options:['middelalder – fordi de tre andre hører til treperiodesystemet','steinalder – fordi den er forhistorisk','jernalder – fordi den er historisk','bronsealder – fordi den bare finnes i Norden'],answer:'middelalder – fordi de tre andre hører til treperiodesystemet',hint:'Tre av ordene er navn i et arkeologisk system basert på materialer.',explain:'Steinalder, bronsealder og jernalder hører til treperiodesystemet. Middelalder hører til en historisk inndeling.'},
      {id:'b7',type:'open',area:'periodisering',prompt:'Forklar periodisering med egne ord.',checklist:['Vi deler fortiden inn i perioder for å få oversikt.','Periodene er menneskeskapte, ikke naturgitte.','Vi kan bruke ulike kriterier for å trekke grenser.']}
    ],
    2: [
      {id:'f1',type:'tf',area:'periodisering',prompt:'Periodegrenser er naturgitte og finnes i fortiden uavhengig av historikere.',answer:'Usant',hint:'Tenk på sammenligningen med kart og landskap.',explain:'Usant. Periodegrenser er laget av mennesker for å skape oversikt og kan diskuteres.'},
      {id:'f2',type:'mc',area:'periodisering',prompt:'Hvorfor bruker vi periodisering?',options:['For å få oversikt over en lang og kompleks fortid','For å bevise at alle samfunn utviklet seg likt','For å unngå å bruke kronologi','For å gi hele verden de samme periodegrensene'],answer:'For å få oversikt over en lang og kompleks fortid',hint:'Perioder fungerer litt som et kart.',explain:'Periodisering gjør en lang og kompleks fortid lettere å orientere seg i.'},
      {id:'f3',type:'mc',area:'historisk tid',prompt:'Hva skiller historisk tid fra forhistorisk tid i læringsarket?',options:['Skriftlige kilder blir viktige nok til å fortelle mye om samfunnet','Jordbruk begynner','Folk begynner å bo i byer','Bronse blir tatt i bruk'],answer:'Skriftlige kilder blir viktige nok til å fortelle mye om samfunnet',hint:'Skillet handler om én bestemt type kilder.',explain:'Historisk tid begynner der skriftlige kilder blir viktige. Arkeologiske kilder trengs fortsatt.'},
      {id:'f4',type:'tf',area:'historisk tid',prompt:'Historisk tid begynner på samme tidspunkt overalt.',answer:'Usant',hint:'Skrift ble viktig på ulike tidspunkt i ulike områder.',explain:'Usant. Historisk tid begynner ikke samtidig overalt.'},
      {id:'f5',type:'fill',area:'skrift',prompt:'Fyll inn omtrent når de eldste kjente skriftsystemene ble brukt i Mesopotamia.',prefix:'Rundt',suffix:'f.Kr.',answers:['3300','ca. 3300','ca 3300'],hint:'Tallet står tidlig i læringsarket og er knyttet til Mesopotamia.',explain:'Rundt 3300 f.Kr. ble de eldste kjente skriftsystemene brukt i Mesopotamia.'},
      {id:'f6',type:'mc',area:'treperiodesystemet',prompt:'Hva bygger navnene steinalder, bronsealder og jernalder på?',options:['Materialer som var særlig viktige i redskaper og våpen','Hvem som var konge','Hvilken religion folk hadde','Hvor store byene var'],answer:'Materialer som var særlig viktige i redskaper og våpen',hint:'Dette er et arkeologisk system.',explain:'Treperiodesystemet bygger på materialer og teknologi.'},
      {id:'f7',type:'mc',area:'periodegrenser',prompt:'Hvorfor begynner ikke bronsealderen samtidig overalt?',options:['Materialbruk og utvikling skjedde til ulike tider i ulike områder','Fordi kalenderen var forskjellig i hvert land','Fordi bronse bare fantes i Mesopotamia','Fordi historikere ikke bruker årstall'],answer:'Materialbruk og utvikling skjedde til ulike tider i ulike områder',hint:'Sammenlign Mesopotamia og Norden.',explain:'I Mesopotamia regnes bronsealderen omtrent fra 3300 f.Kr., i Norden omtrent fra 1700 f.Kr. Periodene begynner altså ikke samtidig.'},
      {id:'f8',type:'mc',area:'oldtid og antikken',prompt:'Hvilken påstand er riktig?',options:['Antikken er en del av oldtiden','Oldtid og antikken betyr nøyaktig det samme','Oldtiden handler bare om Hellas og Roma','Antikken begynner med de første byene i Mesopotamia'],answer:'Antikken er en del av oldtiden',hint:'Oldtiden er den bredeste av de to betegnelsene.',explain:'Antikken brukes her om den gresk-romerske verden og er bare én del av oldtiden.'},
      {id:'f9',type:'mc',area:'imperium',prompt:'Hva er et imperium?',options:['Et rike som styrer over mange områder og folk','En by uten hersker','En periode basert på materialer','Et samfunn uten skatt eller administrasjon'],answer:'Et rike som styrer over mange områder og folk',hint:'Tenk på Akkaderriket.',explain:'Læringsarket definerer et imperium som et rike som styrer over mange områder og folk.'},
      {id:'f10',type:'mc',area:'makt og administrasjon',prompt:'Hvorfor kunne skrift, skatter og administrasjon bli viktige redskaper for makt?',options:['De hjalp herskere og stater å holde oversikt over ressurser og styring','De gjorde alle samfunn like','De fjernet behovet for jordbruk','De gjorde periodisering unødvendig'],answer:'De hjalp herskere og stater å holde oversikt over ressurser og styring',hint:'Koble dette til mat, arbeid, ressurser og styring.',explain:'Skrift, skatter og administrasjon kunne brukes til å holde oversikt over ressurser og organisere styring.'},
      {id:'f11',type:'tf',area:'eurosentrisme',prompt:'Europeiske perioder som «middelalderen» passer uten videre som inndeling for hele verden.',answer:'Usant',hint:'Hva betyr eurosentrisk?',explain:'Usant. Europeiske perioder kan være nyttige, men de passer ikke nødvendigvis andre områder.'},
      {id:'f12',type:'mc',area:'Sumer',prompt:'Hva sier læringsarket om Sumer?',options:['Sumer var ikke ett samlet rike gjennom hele perioden','Sumer var alltid ett samlet imperium','Sumer oppsto etter Assyria','Sumer lå i Nord-Kina'],answer:'Sumer var ikke ett samlet rike gjennom hele perioden',hint:'Tenk på Uruk, Ur og Lagash.',explain:'Sumer bestod av bystater som blant annet Uruk, Ur og Lagash, med egne herskere.'},
      {id:'f13',type:'mc',area:'Egypt',prompt:'Omtrent når ble Egypt samlet til ett kongedømme?',options:['ca. 3100 f.Kr.','ca. 1700 f.Kr.','ca. 900 f.Kr.','ca. 500 e.Kr.'],answer:'ca. 3100 f.Kr.',hint:'Dette er omtrent samtidig som de tidligste bysamfunnene i oldtiden.',explain:'Egypt ble samlet til ett kongedømme rundt 3100 f.Kr.'},
      {id:'f14',type:'tf',area:'sivilisasjon',prompt:'Alle sivilisasjoner i oldtiden hadde nøyaktig de samme kjennetegnene.',answer:'Usant',hint:'Læringsarket sier «ikke alle ... hadde alle disse trekkene».',explain:'Usant. Byer, stater, skrift og monumentalbygg oppsto i ulike kombinasjoner og på ulike tidspunkt.'},
      {id:'f15',type:'order',area:'treperiodesystemet',prompt:'Sett periodene i treperiodesystemet i riktig rekkefølge.',items:['steinalder','bronsealder','jernalder'],answer:['steinalder','bronsealder','jernalder'],hint:'Rekkefølgen ligger i selve navnet på treperiodesystemet slik det står i læringsarket.',explain:'Treperiodesystemet er steinalder → bronsealder → jernalder.'}
    ],
    3: [
      {id:'t1',type:'mc',area:'Sumer tidslinje',prompt:'Når plasseres de sumeriske bystatene grovt i læringsarket?',options:['ca. 3500–2000 f.Kr.','ca. 2600–1900 f.Kr.','ca. 1650–1200 f.Kr.','ca. 900–600 f.Kr.'],answer:'ca. 3500–2000 f.Kr.',hint:'De ligger helt tidlig på oldtidstidslinjen.',explain:'De sumeriske bystatene plasseres grovt ca. 3500–2000 f.Kr.'},
      {id:'t2',type:'mc',area:'Akkad tidslinje',prompt:'Når plasseres Akkaderriket grovt?',options:['ca. 2330–2150 f.Kr.','ca. 3500–2000 f.Kr.','ca. 900–600 f.Kr.','fra omkring 800-tallet f.Kr.'],answer:'ca. 2330–2150 f.Kr.',hint:'Det kommer etter de tidlige sumeriske bystatene.',explain:'Akkaderriket plasseres grovt ca. 2330–2150 f.Kr.'},
      {id:'t3',type:'mc',area:'Indusdalen tidslinje',prompt:'Når plasseres Indusdalen grovt?',options:['ca. 2600–1900 f.Kr.','ca. 1600–1046 f.Kr.','ca. 900–600 f.Kr.','ca. 500–1 f.Kr.'],answer:'ca. 2600–1900 f.Kr.',hint:'Perioden overlapper med deler av både Sumer og Akkad.',explain:'Indusdalen plasseres grovt ca. 2600–1900 f.Kr.'},
      {id:'t4',type:'match',area:'oldtidsriker tidslinje',prompt:'Koble samfunn/rike til omtrent riktig datering.',pairs:[
        ['Egypt','samlet kongedømme fra ca. 3100 f.Kr.'],
        ['Shang','ca. 1600–1046 f.Kr.'],
        ['Hettittriket','ca. 1650–1200 f.Kr.'],
        ['Assyria','ca. 900–600 f.Kr.'],
        ['de greske polisene','fra omkring 800-tallet f.Kr.']
      ],hint:'Se etter rekkefølgen: Egypt tidligst; Shang og hettittene overlapper; Assyria og polisene ligger senere.',explain:'Dateringene er omtrentlige og brukes som holdepunkter, ikke som skarpe grenser.'},
      {id:'t5',type:'mc',area:'bronsealder',prompt:'Bronsealderen i Mesopotamia begynte omtrent 3300 f.Kr., mens den i Norden begynte omtrent 1700 f.Kr. Hva viser dette?',options:['Periodene begynner ikke samtidig overalt','Norden hadde ingen bronsealder','Mesopotamia og Norden brukte ulike kalendere','Treperiodesystemet gjelder bare i Kina'],answer:'Periodene begynner ikke samtidig overalt',hint:'Samme periodenavn kan ha ulike tidsgrenser i ulike områder.',explain:'Dette viser at en periodisering ikke er et universelt klokkeslett. Periodene begynner til ulike tider ulike steder.'},
      {id:'t6',type:'match',area:'samme tid ulike perioder',prompt:'Rundt 500 f.Kr.: koble område til riktig beskrivelse.',pairs:[
        ['Athen','sen arkaisk tid'],
        ['Norge','overgang bronsealder–jernalder'],
        ['Kina','Zhou-tid']
      ],hint:'Poenget er at samme kalenderår kan høre til helt ulike perioder og systemer.',explain:'Rundt 500 f.Kr. beskrives Athen, Norge og Kina med ulike perioder. Periodenavn passer til bestemte spørsmål og områder.'},
      {id:'t7',type:'mc',area:'kronologi',prompt:'Hvilket av disse holdepunktet ligger tidligst på tidslinjen?',options:['Sumeriske bystater ca. 3500 f.Kr.','Egypt samlet kongedømme ca. 3100 f.Kr.','Akkaderriket ca. 2330 f.Kr.','Indusdalen ca. 2600 f.Kr.'],answer:'Sumeriske bystater ca. 3500 f.Kr.',hint:'For år f.Kr. er et større tall lenger tilbake i tid.',explain:'Sumeriske bystater rundt 3500 f.Kr. ligger tidligst av disse holdepunktet.'},
      {id:'t8',type:'match',area:'tid og rom',prompt:'Koble eksemplene til området læringsarket plasserer dem i.',pairs:[
        ['Sumer','Mesopotamia'],
        ['Egypt','langs Nilen'],
        ['Shang','Nord-Kina'],
        ['hettittene','Anatolia'],
        ['Caral','Peru / Supedalen'],
        ['greske poliser','Hellas']
      ],hint:'Bruk stedsnavnene som står ved eksemplene i læringsarket.',explain:'Å plassere eksemplene grovt i rom gjør tidslinjen lettere å forstå og sammenligne.'}
    ],
    4: [
      {id:'s1',type:'order',area:'årsakskjede',prompt:'Sett leddene i den rekkefølgen læringsarket viser.',items:['jordbruk','større bosetninger','arbeidsdeling','byer','skatt og styring','stater og riker'],answer:['jordbruk','større bosetninger','arbeidsdeling','byer','skatt og styring','stater og riker'],hint:'Start med matproduksjon og slutt med politisk organisering.',explain:'Læringsarket viser denne kjeden, men understreker at utviklingen IKKE var automatisk og at den skjedde ulikt fra sted til sted.'},
      {id:'s2',type:'mc',area:'periodisering',prompt:'Hvorfor er periodisering nyttig selv om grensene er laget av mennesker?',options:['Den gir oversikt og gjør det lettere å se mønstre og endringer','Den gjør alle historiske tolkninger like','Den beviser at alle områder skiftet periode samtidig','Den erstatter behovet for kilder'],answer:'Den gir oversikt og gjør det lettere å se mønstre og endringer',hint:'Tenk på kart-sammenligningen fra læringsarket.',explain:'Periodisering er et verktøy for oversikt. Som et kart hjelper den oss å orientere oss, selv om den ikke er selve landskapet.'},
      {id:'s3',type:'match',area:'systemer',prompt:'Koble inndelingen til kriteriet den bygger på.',pairs:[
        ['steinalder – bronsealder – jernalder','materialer og teknologi'],
        ['oldtid – middelalder – nyere tid','store endringer i samfunn, makt og kultur']
      ],hint:'Det ene er et arkeologisk system; det andre er en historisk inndeling.',explain:'Jernalderen og middelalderen er derfor ikke perioder av samme type.'},
      {id:'s4',type:'mc',area:'brudd og kontinuitet',prompt:'Et samfunn tar i bruk mer jern, men jordbruket fortsetter. Hva viser jordbruket i dette eksemplet først og fremst?',options:['kontinuitet','brudd','kronologi','eurosentrisme'],answer:'kontinuitet',hint:'Hva er det som fortsetter selv om noe annet endres?',explain:'Jordbruket er et eksempel på kontinuitet: noe fortsetter samtidig som andre forhold forandrer seg.'},
      {id:'s5',type:'mc',area:'perspektiv',prompt:'Hvorfor kan det være problematisk å bruke «middelalderen» som periode for hele verden?',options:['Begrepet passer best på europeisk historie og kan gjøre andre erfaringer mindre synlige','Middelalderen er et arkeologisk materiale','Det finnes ingen kilder fra middelalderen','Alle samfunn gikk direkte fra oldtid til nyere tid samtidig'],answer:'Begrepet passer best på europeisk historie og kan gjøre andre erfaringer mindre synlige',hint:'Tenk på ordet eurosentrisk.',explain:'Når Europas historie brukes som målestokk for hele verden, får vi et eurosentrisk perspektiv.'},
      {id:'s6',type:'mc',area:'oldtid og antikken',prompt:'Hva er den beste måten å beskrive forholdet mellom oldtiden og antikken på?',options:['Antikken er den gresk-romerske delen av oldtiden i dette kurset','Ordene er synonymer','Oldtiden er en del av antikken','Antikken handler om alle tidlige sivilisasjoner'],answer:'Antikken er den gresk-romerske delen av oldtiden i dette kurset',hint:'Oldtiden omfatter også Mesopotamia, Egypt, Indusdalen og Kina.',explain:'Antikken er bare én del av oldtiden og brukes her om den gresk-romerske verden.'},
      {id:'s7',type:'mc',area:'makt og administrasjon',prompt:'Hva er den beste forklaringen på sammenhengen mellom mer mat, arbeidsdeling og sterkere styring?',options:['Mer mat kunne gjøre det mulig å forsørge spesialiserte grupper, og skrift, skatt og administrasjon kunne bli redskaper for makt','Mer mat førte automatisk til imperier overalt','Arbeidsdeling gjorde skrift unødvendig','Stater oppsto bare der det fantes bronse'],answer:'Mer mat kunne gjøre det mulig å forsørge spesialiserte grupper, og skrift, skatt og administrasjon kunne bli redskaper for makt',hint:'Legg merke til ordet «kunne» i læringsarket.',explain:'Dette beskrives som en mulig sammenheng, ikke en automatisk utviklingslov.'},
      {id:'s8',type:'mc',area:'ikke én oppskrift',prompt:'Hvilken påstand passer best med «HUSK: IKKE ÉN OPPSKRIFT»?',options:['Byer, stater, skrift og monumentalbygg oppsto i ulike kombinasjoner og på ulike tidspunkt','Alle sivilisasjoner måtte først få skrift og deretter byer','Alle riker fulgte den samme utviklingskjeden','Ett områdes tidslinje kan brukes som mal for hele verden'],answer:'Byer, stater, skrift og monumentalbygg oppsto i ulike kombinasjoner og på ulike tidspunkt',hint:'Læringsarket advarer mot én universell utviklingsmodell.',explain:'Utviklingen var forskjellig fra sted til sted, og trekkene oppsto i ulike kombinasjoner.'}
    ],
    6: [
      {id:'g1a',type:'mc',goal:1,area:'periodisering',prompt:'Hva betyr periodisering?',options:['Å dele historien inn i perioder for å få oversikt','Å finne én universell tidslinje','Å bruke bare skriftlige kilder','Å dele verden i geografiske regioner'],answer:'Å dele historien inn i perioder for å få oversikt',hint:'Tenk på fortiden som en lang tidslinje vi lager kapittelinndeling i.',explain:'Periodisering er å dele historien inn i perioder for å få oversikt.'},
      {id:'g1b',type:'mc',goal:1,area:'periodisering',prompt:'Hvorfor må periodegrenser forklares – ikke bare pugges?',options:['Fordi de bygger på valgte kriterier og kan variere mellom områder','Fordi historikere ikke bruker kronologi','Fordi alle grenser er tilfeldige','Fordi årstall ikke kan brukes i historie'],answer:'Fordi de bygger på valgte kriterier og kan variere mellom områder',hint:'Kriterier og sted er viktige.',explain:'Periodegrenser er menneskeskapte og avhenger av hva vi velger å legge vekt på.'},
      {id:'g2a',type:'mc',goal:2,area:'systemer',prompt:'Hva er hovedkriteriet i treperiodesystemet?',options:['materialer og teknologi','store endringer i samfunn, makt og kultur','skriftens utbredelse','religion alene'],answer:'materialer og teknologi',hint:'Se på navnene stein, bronse og jern.',explain:'Treperiodesystemet bygger på materialer og teknologi.'},
      {id:'g2b',type:'mc',goal:2,area:'systemer',prompt:'Hva er hovedkriteriet i inndelingen oldtid – middelalder – nyere tid?',options:['store endringer i samfunn, makt og kultur','hvilket metall som brukes mest','antall byer','skrift eller ikke skrift alene'],answer:'store endringer i samfunn, makt og kultur',hint:'Dette er en historisk, ikke arkeologisk, inndeling.',explain:'Den historiske inndelingen bygger på større endringer i samfunn, makt og kultur.'},
      {id:'g3a',type:'mc',goal:3,area:'oldtidsriker',prompt:'Hvilket par er riktig koblet?',options:['Akkaderriket – ca. 2330–2150 f.Kr.','Assyria – ca. 2600–1900 f.Kr.','Hettittriket – ca. 900–600 f.Kr.','Indusdalen – fra omkring 800-tallet f.Kr.'],answer:'Akkaderriket – ca. 2330–2150 f.Kr.',hint:'Se på tidslinjen med oldtidsrikene.',explain:'Akkaderriket plasseres grovt ca. 2330–2150 f.Kr.'},
      {id:'g3b',type:'mc',goal:3,area:'tid og rom',prompt:'Hvilken kobling mellom sted og eksempel er riktig?',options:['Shang – Nord-Kina','Sumer – Anatolia','hettittene – Nildalen','Egypt – Mesopotamia'],answer:'Shang – Nord-Kina',hint:'Shang er eksemplet fra Kina i læringsarket.',explain:'Shang plasseres i Nord-Kina.'},
      {id:'g3c',type:'mc',goal:3,area:'oldtidsriker',prompt:'Hva er viktigst å huske om oldtidens samfunn og riker?',options:['De var organisert på ulike måter og oppsto til ulike tider','Alle var imperier','Alle hadde nøyaktig samme kjennetegn','Alle tilhørte antikken'],answer:'De var organisert på ulike måter og oppsto til ulike tider',hint:'Noen var bystater, noen kongedømmer, noen imperier.',explain:'Oldtidens samfunn og riker var ulike og oppsto i forskjellige kombinasjoner og på ulike tidspunkt.'}
    ]
  },

  timeline: {
    start: 3500,
    end: 500,
    rows: [
      ['Sumeriske bystater',3500,2000,'ca. 3500–2000','green'],
      ['Egypt',3100,500,'fra ca. 3100','orange'],
      ['Indusdalen',2600,1900,'ca. 2600–1900','green'],
      ['Akkaderriket',2330,2150,'ca. 2330–2150','orange'],
      ['Shang',1600,1046,'ca. 1600–1046','green'],
      ['Hettittriket',1650,1200,'ca. 1650–1200','orange'],
      ['Assyria',900,600,'ca. 900–600','green'],
      ['Greske poliser',800,500,'fra omkring 800-tallet','orange']
    ],
    ticks: [3500,2500,1500,500],
    ariaLabel: 'Omtrentlig tidslinje fra 3500 til 500 f.Kr.',
    noteTitle: 'Les tidslinjen som holdepunkter.',
    noteText: 'Dateringene er omtrentlige. Poenget er rekkefølge, overlapp og forskjeller – ikke å pugge én «perfekt» grense.'
  },

  sourceCard: {
    stamp: 'Kilde: ca. 3300–3100 f.Kr.',
    title: 'En tidlig leirtavle fra Mesopotamia',
    html: 'Tavler som denne ble brukt til å registrere blant annet <strong>korn, varer og rasjoner</strong>. De kan fortelle oss at noen måtte holde oversikt over mat, arbeid og ressurser. Skrift var altså ikke bare fortellinger – den kunne også være et redskap for administrasjon og makt.'
  },

  sourceOpen: [
    {id:'k1',prompt:'Hva kan en slik kilde fortelle oss om samfunnet?',model:['At noen måtte holde oversikt over korn, varer, rasjoner, arbeid eller ressurser.','At skrift kunne brukes i administrasjon.','At organisering og makt kunne henge sammen med kontroll over ressurser.']},
    {id:'k2',prompt:'Hva kan vi IKKE vite sikkert bare ut fra denne kilden?',model:['Én tavle kan ikke alene fortelle hvordan hele samfunnet fungerte.','Den kan ikke alene fortelle hvordan alle mennesker levde eller tenkte.','Vi må være forsiktige med å trekke større konklusjoner enn kilden gir grunnlag for.']},
    {id:'k3',prompt:'Hvorfor kan skrift også være et redskap for makt?',model:['Skrift kunne brukes til å registrere varer, mat, arbeid og ressurser.','Slik oversikt kunne støtte skattlegging, administrasjon og styring.','Skrift var derfor ikke bare fortellinger; den kunne brukes til å organisere og kontrollere.']}
  ],

  goals: [
    {n:1,title:'Forklare hva periodisering er, og hvorfor vi deler historien inn i perioder'},
    {n:2,title:'Forklare forskjellen mellom steinalder – bronsealder – jernalder og oldtid – middelalder – nyere tid'},
    {n:3,title:'Kjenne noen sentrale samfunn og riker i oldtiden og plassere dem grovt i tid og rom'}
  ],

  mainQuestion: 'Hvorfor deler vi historien inn i perioder – og hvorfor passer ikke de samme periodene overalt?',
  mainChecklist: [
    'hva periodisering betyr',
    'hvorfor perioder gjør historien lettere å få oversikt over',
    'at periodegrensene er laget av mennesker',
    'at ulike kriterier kan brukes',
    'at utviklingen skjer på ulike tidspunkt i ulike områder',
    'at europeiske perioder ikke nødvendigvis passer resten av verden'
  ],

  resultText: {
    eyebrow: 'RESULTAT',
    title: 'Din oversikt',
    intro: 'Dette er en læringsdiagnose, ikke en karakter. Poenget er å vise hva du har kontroll på – og hva som er smartest å repetere.',
    firstAttempt: 'Første forsøk',
    practiceMore: 'Dette bør du øve mer på',
    reviewTitle: 'Øv på det du ikke kunne',
    reviewIntro: 'Her får du bare oppgaver du tidligere har svart feil på. Målet er å rydde unna usikkerheten én oppgave om gangen.'
  }
};
