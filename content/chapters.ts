export type Phase = "Fakta" | "Forståelse" | "Lange linjer" | "Kildeblikk";

export type TaskKind = "choice" | "order" | "match" | "sort" | "reflection";

export type LearningTask = {
  id: string;
  phase: Phase;
  kind: TaskKind;
  title: string;
  prompt: string;
  points: number;
  options?: string[];
  items?: string[];
  expected?: string[];
  answerMap?: Record<string, string>;
  choices?: string[];
  correct?: number;
  hint: string;
  explanation: string;
  modelResponse?: string;
};

export type TimelinePoint = {
  date: string;
  title: string;
  description: string;
  sourceIds: string[];
};

export type CitedClaim = {
  text: string;
  sourceIds: string[];
};

export type SourceLook = {
  label: string;
  period: string;
  place: string;
  sourceIds: string[];
  evidence: string[];
  supports: string;
  cannotProve: string;
};

export type Chapter = {
  id: string;
  number: string;
  slug: string;
  sectionSlug: string;
  title: string;
  shortIntro: string;
  guidingQuestion: string;
  priorKnowledge: {
    prompt: string;
    cues: string[];
  };
  period: string;
  geography: string;
  status: "published" | "coming-soon";
  learningGoals: string[];
  competenceGoals: string[];
  facts: CitedClaim[];
  concepts: { term: string; definition: string }[];
  narrative: { heading: string; paragraphs: string[] }[];
  causes: string[];
  effects: string[];
  continuities: string[];
  breaks: string[];
  causeChain: string[];
  sourceLooks: SourceLook[];
  longLineIds: string[];
  summary: string[];
  timeline: TimelinePoint[];
  tasks: LearningTask[];
  progressVersion: number;
  summaryPdf?: { label: string; href: string };
  teacherResources?: { label: string; description: string; href?: string }[];
  sources: { id: string; title: string; href: string; note: string }[];
  lastChecked: string;
};

export const longLines = [
  {
    id: "mat-og-naturressurser",
    title: "Mat og naturressurser",
    description:
      "Hvordan mennesker har skaffet mat, brukt jord og vann, og veid produksjon mot naturens tålegrenser.",
  },
  {
    id: "demografi",
    title: "Demografi",
    description:
      "Hvordan befolkninger vokser, flytter på seg og får endrede helse- og livsvilkår.",
  },
  {
    id: "handel-og-okonomi",
    title: "Handel og økonomi",
    description:
      "Hvordan overskudd, bytte, arbeid og eiendom former hverdagsliv og samfunn.",
  },
  {
    id: "kommunikasjon-og-kulturmoter",
    title: "Kommunikasjon og kulturmøter",
    description:
      "Hvordan mennesker, ideer, arter og teknikker beveger seg mellom områder.",
  },
  {
    id: "makt-og-legitimering",
    title: "Makt og legitimering",
    description:
      "Hvordan ressurser, arbeid, ledelse og fortellinger kan gi noen større innflytelse enn andre.",
  },
  {
    id: "religion-og-identitet",
    title: "Religion og identitet",
    description:
      "Hvordan mennesker skaper mening, tilhørighet og forestillinger om verden.",
  },
  {
    id: "demokrati-og-deltakelse",
    title: "Demokrati og deltakelse",
    description:
      "Hvordan mennesker deltar, blir representert og forhandler om makt i ulike samfunn.",
  },
] as const;

const curriculumSectionDefinitions = [
  {
    number: "01",
    slug: "01-historiefaglig-grunnlag",
    title: "Historiefaglig grunnlag",
    description: "Å stille spørsmål, bruke kilder og vurdere hvordan fortiden kan deles inn.",
  },
  {
    number: "02",
    slug: "02-fra-jegere-til-bysamfunn",
    title: "Fra jegere til bysamfunn",
    description: "Fra ulike matstrategier til mer bofaste, spesialiserte og komplekse samfunn.",
  },
  {
    number: "03",
    slug: "03-antikken",
    title: "Antikken",
    description: "Planlagt del av læreverket. Innhold publiseres trinnvis.",
  },
  {
    number: "04",
    slug: "04-middelalderen",
    title: "Middelalderen",
    description: "Planlagt del av læreverket. Innhold publiseres trinnvis.",
  },
  {
    number: "05",
    slug: "05-tidlig-nytid",
    title: "Tidlig nytid",
    description: "Planlagt del av læreverket. Innhold publiseres trinnvis.",
  },
  {
    number: "06",
    slug: "06-historiebruk-og-syntese",
    title: "Historiebruk og syntese",
    description: "Planlagt del av læreverket. Innhold publiseres trinnvis.",
  },
];

const tasks: LearningTask[] = [
  {
    id: "F1",
    phase: "Fakta",
    kind: "choice",
    title: "Domestisering",
    prompt: "Hvilken forklaring på domestisering er mest presis?",
    points: 1,
    options: [
      "At mennesker endret kostholdet og spiste flere planter enn før.",
      "En gradvis prosess der menneskelig utvalg endrer planter og dyr over generasjoner.",
      "At mennesker flyttet mindre og ble bofaste i løpet av én generasjon.",
      "At ville dyr forsvant fra områdene der dyrking og husdyrhold begynte.",
    ],
    correct: 1,
    hint: "Se etter en forklaring som beskriver endring over tid hos både planter og dyr.",
    explanation:
      "Domestisering er både biologisk og kulturell. Mennesker påvirker hvilke egenskaper som føres videre, og de nye artene endrer samtidig menneskenes arbeid og samfunn.",
  },
  {
    id: "F2",
    phase: "Fakta",
    kind: "choice",
    title: "Mange sentre",
    prompt: "Hvilket utsagn beskriver utviklingen av jordbruk best?",
    points: 1,
    options: [
      "Jordbruk oppstod i én region og spredte seg gradvis til andre områder.",
      "Jordbruk utviklet seg i flere regioner, til ulike tider og med ulike arter.",
      "Jordbruk begynte omtrent samtidig i mange områder etter siste istid.",
      "Jordbruk ble først mulig etter at de første statene var dannet.",
    ],
    correct: 1,
    hint: "Sammenlign tidspunkt, arter og miljø i flere av regionene som kapitlet nevner.",
    explanation:
      "Det er mer presist å snakke om flere jordbruksrevolusjoner eller regionale overganger. Samfunn utviklet ulike løsninger med lokale arter og matstrategier.",
  },
  {
    id: "F3",
    phase: "Fakta",
    kind: "match",
    title: "Region og art",
    prompt: "Koble regionene til planter og dyr som ble viktige der.",
    points: 4,
    items: ["Sørvest-Asia", "Kina", "Mesoamerika", "Andes"],
    choices: ["hvete, bygg, sau og geit", "ris, hirse og gris", "mais, squash og bønner", "potet, quinoa og lama"],
    answerMap: {
      "Sørvest-Asia": "hvete, bygg, sau og geit",
      Kina: "ris, hirse og gris",
      Mesoamerika: "mais, squash og bønner",
      Andes: "potet, quinoa og lama",
    },
    hint: "Tenk på hvilke arter som passer til de ulike lokale miljøene.",
    explanation:
      "Ulike regioner utviklet jordbruk med ulike arter. Det viser at overgangen ikke var én enkelt oppfinnelse.",
  },
  {
    id: "F4",
    phase: "Fakta",
    kind: "order",
    title: "Fra ville planter til kulturplanter",
    prompt: "Sett prosessen i en faglig rimelig rekkefølge.",
    points: 3,
    items: [
      "Høste ville planter",
      "Så nyttige frø nær bosetningen",
      "Velge egenskaper over mange generasjoner",
      "Domestiserte planter blir vanligere",
    ],
    expected: [
      "Høste ville planter",
      "Så nyttige frø nær bosetningen",
      "Velge egenskaper over mange generasjoner",
      "Domestiserte planter blir vanligere",
    ],
    hint: "Domestisering skjer gjennom gjentatte valg, ikke i ett sprang.",
    explanation:
      "Mennesker høstet ville planter, tok med frø, sådde dem på nytt og valgte gradvis egenskaper som var nyttige. Over tid ble kulturplantene biologisk forskjellige fra de ville slektningene.",
  },
  {
    id: "F5",
    phase: "Fakta",
    kind: "choice",
    title: "Hva betyr revolusjon?",
    prompt: "Hvorfor kan vi bruke ordet «revolusjon» selv om overgangen tok mange generasjoner?",
    points: 1,
    options: [
      "Fordi endringene i steinalderen vanligvis skjedde på kort tid.",
      "Fordi jordbruk ga bedre helse for de fleste som tok det i bruk.",
      "Fordi følgene for samfunn og natur ble grunnleggende, selv om prosessen var langsom.",
      "Fordi én jordbruksregion satte i gang samme utvikling overalt.",
    ],
    correct: 2,
    hint: "Skill mellom tempoet i prosessen og hvor dyptgripende følgene ble.",
    explanation:
      "Revolusjon viser her til en grunnleggende omforming. Selve overgangen var ofte gradvis, regional og full av blandingsformer.",
  },
  {
    id: "F6",
    phase: "Fakta",
    kind: "choice",
    title: "Çatalhöyük",
    prompt: "Hva støtter funnene fra Çatalhöyük best?",
    points: 1,
    options: [
      "At innbyggerne hovedsakelig levde av jakt og ikke dyrket planter.",
      "At stedet var en langvarig, tett og organisert bosetning med lagring.",
      "At alle innbyggerne hadde samme tanker, roller og tilgang til ressurser.",
      "At en konge styrte stedet fra et stort administrativt palass.",
    ],
    correct: 1,
    hint: "Bruk flere typer materielle spor og formuler en påstand som ikke går lenger enn de støtter.",
    explanation:
      "Funnene støtter varig bosetning og organisert ressursbruk. De beviser ikke alene et bestemt styresett eller alles tanker.",
  },
  {
    id: "U1",
    phase: "Forståelse",
    kind: "choice",
    title: "Flere forutsetninger",
    prompt: "Hvilket utsagn forklarer best hvorfor mennesker begynte med jordbruk?",
    points: 1,
    options: [
      "En klimaendring kan forklare overgangen i de fleste regioner.",
      "Befolkningsvekst gjorde at alle grupper måtte bli bønder.",
      "Flere forhold virket sammen, og kombinasjonen var ulik fra region til region.",
      "Jordbruk ga større utbytte enn jakt og sanking i alle miljøer.",
    ],
    correct: 2,
    hint: "Vurder om forklaringen åpner for flere årsaker og regionale forskjeller.",
    explanation:
      "Det finnes ingen forklaring som passer alle regioner. Historiske forklaringer må åpne for kombinasjoner og lokale forskjeller.",
  },
  {
    id: "U2",
    phase: "Forståelse",
    kind: "sort",
    title: "Forutsetning eller følge?",
    prompt: "Sorter hvert punkt som en mulig forutsetning eller en mulig følge av overgangen.",
    points: 2,
    items: [
      "Varmere og ofte mer stabilt klima etter istiden",
      "Kunnskap om lokale planter og dyr",
      "Tettere bosetning og mer lagring",
      "Flere mennesker per areal",
    ],
    choices: ["Forutsetning", "Følge"],
    answerMap: {
      "Varmere og ofte mer stabilt klima etter istiden": "Forutsetning",
      "Kunnskap om lokale planter og dyr": "Forutsetning",
      "Tettere bosetning og mer lagring": "Følge",
      "Flere mennesker per areal": "Følge",
    },
    hint: "En forutsetning gjør en endring mulig. En følge kommer som resultat av eller i samspill med endringen.",
    explanation:
      "Klima og artskunnskap kunne bidra til at dyrking ble mulig. Lagring, tetthet og befolkningsvekst var mulige følger, men ikke automatiske i alle samfunn.",
  },
  {
    id: "U3",
    phase: "Forståelse",
    kind: "choice",
    title: "Overskudd og arbeidsdeling",
    prompt: "Hvordan kunne et matoverskudd påvirke arbeidsdelingen?",
    points: 1,
    options: [
      "De fleste måtte bruke mer tid på matproduksjon og fikk færre andre oppgaver.",
      "Overskudd kunne forsørge mennesker som arbeidet med håndverk, handel, ritualer eller ledelse.",
      "Overskudd fjernet forskjeller mellom samfunn og gjorde arbeidsdelingen lik.",
      "Lagring hadde liten betydning for hvordan mennesker fordelte arbeidet.",
    ],
    correct: 1,
    hint: "Tenk på hva lagret mat kan gjøre mulig for personer som ikke produserer all maten sin selv.",
    explanation:
      "Lagring og overskudd kunne frigjøre tid til andre oppgaver. Det kunne bidra til spesialisering, men utviklingen var ikke lik eller automatisk overalt.",
  },
  {
    id: "U4",
    phase: "Forståelse",
    kind: "choice",
    title: "Befolkningsparadokset",
    prompt: "Hvordan kunne befolkningen vokse selv om helsen til mange tidlige bønder ble dårligere?",
    points: 1,
    options: [
      "Mange fikk et mer variert kosthold og mindre fysisk arbeid.",
      "Flere kalorier per areal og trolig kortere fødselsintervall kunne øke befolkningen, selv med mer slit og ensidig kost.",
      "Smittepresset ble mindre fordi flere mennesker bodde tett sammen.",
      "Befolkningen vokste fordi alle familier sluttet å flytte mellom steder.",
    ],
    correct: 1,
    hint: "Skill mellom et områdes kapasitet til å forsørge mennesker og livsvilkårene til hver enkelt.",
    explanation:
      "Befolkningsvekst og individuell helse er ikke det samme. Jordbruk kunne forsørge flere, samtidig som kosthold, arbeid og smitte ble en belastning. Fødselsintervaller kan ikke måles direkte i dette materialet, så mekanismen må formuleres som en mulig forklaring.",
  },
  {
    id: "U5",
    phase: "Forståelse",
    kind: "choice",
    title: "Smittepress",
    prompt: "Hvorfor kunne større og tettere bosetninger gi mer smitte?",
    points: 1,
    options: [
      "Fordi jakt og sanking ble mindre viktig i alle områder.",
      "Fordi tett bosetning, avfall, lagre og nær kontakt med husdyr kunne gi flere smitteveier.",
      "Fordi sykdommer først oppstod da mennesker begynte å bruke metall.",
      "Fordi lagring av mat hindret mennesker i å flytte etter ressursene.",
    ],
    correct: 1,
    hint: "Se etter forhold som skaper flere kontaktflater mellom mennesker, dyr, avfall og lagre.",
    explanation:
      "Tetthet, avfall, lagre og nær kontakt med husdyr kunne øke smittepresset. Det er en mulig følge, ikke en lik erfaring for alle.",
  },
  {
    id: "L1",
    phase: "Lange linjer",
    kind: "order",
    title: "En mulig utviklingskjede",
    prompt: "Sett leddene i en mulig kjede fra matproduksjon til makt.",
    points: 1,
    items: [
      "Mer mat per areal",
      "Lagring",
      "Arbeidsdeling og spesialisering",
      "Mer varige forskjeller i rikdom og makt",
    ],
    expected: [
      "Mer mat per areal",
      "Lagring",
      "Arbeidsdeling og spesialisering",
      "Mer varige forskjeller i rikdom og makt",
    ],
    hint: "Mat må kunne bli lagret før den kan forsørge personer med andre oppgaver.",
    explanation:
      "Kjeden viser en historisk mulighet. Hvert ledd må forklares, og ingen av pilene betyr at neste ledd alltid fulgte.",
  },
  {
    id: "L2",
    phase: "Lange linjer",
    kind: "choice",
    title: "Brudd og kontinuitet",
    prompt: "Hvilket utsagn viser best både brudd og kontinuitet?",
    points: 1,
    options: [
      "Jordbruk endret eldre levemåter raskt i alle samfunn som tok det i bruk.",
      "Jakt og sanking fikk mindre betydning etter at noen begynte å dyrke.",
      "Mange samfunn kombinerte dyrking og husdyrhold med jakt, fiske og sanking over lang tid.",
      "Bofasthet ble først mulig etter at mennesker hadde begynt med jordbruk.",
    ],
    correct: 2,
    hint: "Kontinuitet betyr noe som fortsetter, mens brudd betyr tydelig endring.",
    explanation:
      "Overgangen hadde brudd, som mer dyrking og lagring, men også kontinuitet, som jakt, fiske og sanking i blandede strategier.",
  },
  {
    id: "L3",
    phase: "Lange linjer",
    kind: "choice",
    title: "Bærekraft",
    prompt: "Hvilken vurdering er mest presis når vi kobler jordbruksrevolusjonen til bærekraft?",
    points: 1,
    options: [
      "Jordbruk økte produksjonen, men skadet naturen på samme måte i alle områder.",
      "Jordbruk løste matmangel og miljøproblemer når produksjonen ble større.",
      "Jordbruk kunne øke produksjonen, men også gi erosjon, utarming, saltproblemer og tap av mangfold.",
      "Bærekraft ble først et relevant spørsmål da moderne industri og byer vokste fram.",
    ],
    correct: 2,
    hint: "Vurder både mulige gevinster og kostnader, og spør om virkningen var lik overalt.",
    explanation:
      "Den lange linjen handler om valg: hvilke ressurser som brukes, hvem som får gevinstene, og hvilke kostnader framtidige generasjoner må bære.",
  },
  {
    id: "L4",
    phase: "Lange linjer",
    kind: "reflection",
    title: "Var jordbruksrevolusjonen et framskritt?",
    prompt: "Skriv kort: Var jordbruksrevolusjonen et framskritt? Ta med minst én fordel, én kostnad og hvorfor virkningen kunne være ulik.",
    points: 2,
    hint: "Bygg svaret rundt «på den ene siden … på den andre siden …».",
    explanation: "Et godt svar veier ulike sider mot hverandre og bruker konkrete historiske punkter.",
    modelResponse:
      "Jordbruk gjorde det mulig å produsere mer mat per areal, lagre mat og forsørge større befolkninger. Samtidig kunne tidlige bønder få mer ensidig kosthold, hardere arbeid og større smittepress. Kontroll over jord og lagre kunne også skape ulikhet. Derfor var jordbruket en grunnleggende omforming, men ikke en enkel forbedring for alle mennesker eller for naturen.",
  },
  {
    id: "K1",
    phase: "Kildeblikk",
    kind: "choice",
    title: "Funn og slutning",
    prompt: "Hva kan funnene fra Çatalhöyük støtte som en forsvarlig slutning?",
    points: 1,
    options: [
      "At innbyggerne delte den samme troen og hadde like ritualer.",
      "At stedet hadde langvarig bosetning og organisert ressursbruk.",
      "At en bestemt konge styrte stedet og fordelte alle ressursene.",
      "At jakt og sanking ikke inngikk i matforsyningen på stedet.",
    ],
    correct: 1,
    hint: "Koble konkrete spor til en moderat påstand, og skill den fra tanker eller ledelse.",
    explanation:
      "Tette hus, lagre, kornrester og mange bosetningslag støtter varig og organisert ressursbruk. Funnene beviser ikke alt om makt eller tro.",
  },
  {
    id: "K2",
    phase: "Kildeblikk",
    kind: "choice",
    title: "Kildekritisk stopp",
    prompt: "Hva kan arkeologisk materiale ikke bevise alene?",
    points: 1,
    options: [
      "At det har bodd mennesker på stedet.",
      "At det fantes hus, redskaper eller matrester.",
      "Nøyaktig hva alle innbyggerne tenkte, eller hvem som bestemte.",
      "At mennesker brukte ressurser på bestemte måter.",
    ],
    correct: 2,
    hint: "Skill mellom konkrete spor og tolkninger av tanker eller maktforhold.",
    explanation:
      "Materielle spor kan gi belegg for handlinger og mønstre. Påstander om tanker, rettferdighet eller ledelse krever forsiktig tolkning og flere typer kilder.",
  },
  {
    id: "K3",
    phase: "Kildeblikk",
    kind: "choice",
    title: "Göbekli Tepe",
    prompt: "Hva viser Göbekli Tepe som utfordrer en enkel trapp fra jeger til bonde til komplekst samfunn?",
    points: 1,
    options: [
      "At monumenter krevde en statlig administrasjon.",
      "At omfattende samarbeid kunne organiseres før fullt utviklet jordbruk er sikkert dokumentert på stedet.",
      "At jordbruk ikke hadde betydning for noen samfunn i regionen.",
      "At arkeologiske funn gir et komplett bilde av fortiden.",
    ],
    correct: 1,
    hint: "Skill mellom det anlegget viser direkte, og hva arkeologer må slutte om menneskene som bygde det.",
    explanation:
      "Göbekli Tepe viser at omfattende samarbeid og monumentbygging kunne organiseres før fullt utviklet jordbruk er sikkert dokumentert på stedet. At byggherrene levde av jakt og sanking, er en tolkning av flere spor – ikke et direkte observasjonspunkt.",
  },
  {
    id: "K4",
    phase: "Kildeblikk",
    kind: "reflection",
    title: "To steder, ingen rett linje",
    prompt: "Bruk Çatalhöyük og Göbekli Tepe til å begrunne påstanden: Overgangen til jordbruk var ikke én enkel, rett linje.",
    points: 2,
    hint: "Bruk minst ett konkret funn fra hvert sted, og avslutt med en begrensning ved materialet.",
    explanation: "Et godt svar skiller mellom funn, slutning og det kilden ikke kan bevise.",
    modelResponse:
      "Çatalhöyük viser en stor og langvarig bosetning med tettbygde hus, lagring og blandede matstrategier. Göbekli Tepe viser at jegere og sankere kunne organisere monumentale fellesprosjekter før fullt utviklet jordbruk er sikkert dokumentert på stedet. Stedene viser derfor at bofasthet, samarbeid og jordbruk kunne utvikle seg i ulike rekkefølger og kombinasjoner. Funnene gir ikke alene et komplett bilde av hvordan menneskene tenkte eller organiserte makt.",
  },
];

export const jordbruksrevolusjonen: Chapter = {
  id: "2.2",
  number: "2.2",
  slug: "2-2-jordbruksrevolusjonen",
  sectionSlug: "02-fra-jegere-til-bysamfunn",
  title: "Jordbruksrevolusjonen",
  shortIntro:
    "Hvordan og hvorfor fikk dyrking og husdyrhold større betydning, og hvorfor ble følgene så grunnleggende når overgangen ofte var langsom?",
  guidingQuestion:
    "Hvorfor begynte mennesker å dyrke jorda, og hvorfor ble følgene så grunnleggende når selve overgangen ofte var langsom?",
  priorKnowledge: {
    prompt: "Skriv tre ting du forbinder med jordbruksrevolusjonen, og formuler ett spørsmål du vil ha svar på.",
    cues: [
      "Hva tror du ordet «revolusjon» betyr i denne sammenhengen?",
      "Måtte mennesker bli bønder før de kunne bo fast eller samarbeide om store prosjekter?",
      "Hva kan ha blitt bedre – og hva kan ha blitt vanskeligere?",
    ],
  },
  period: "Fra ca. 9600 f.Kr. og framover, med regionale forskjeller",
  geography: "Sørvest-Asia, Kina, Ny-Guinea, Mesoamerika, Andes og deler av Afrika",
  status: "published",
  learningGoals: [
    "gjøre rede for når, hvor og hvordan jordbruk og domestisering utviklet seg",
    "forklare flere årsaker til overgangen og skille mellom forutsetninger og følger",
    "vurdere virkninger for mat, naturressurser, befolkning, helse, arbeid og makt",
    "bruke arkeologisk materiale fra Çatalhöyük og Göbekli Tepe til å bygge og avgrense påstander",
    "se lange linjer fra jordbruksrevolusjonen til dagens samfunn og bærekraftsspørsmål",
  ],
  competenceGoals: [
    "utforske fortiden ved å stille spørsmål og innhente, tolke og bruke ulikt historisk materiale for å finne svar",
    "reflektere over hvorfor historikere deler inn fortiden i perioder og vurdere hvordan vi kan periodisere fortiden på grunnlag av ulike kriterier",
    "gjøre rede for viktige endringer i hvordan mennesker har skaffet seg mat og brukt naturressurser, og vurdere betydningen av dette for mennesker og et bærekraftig samfunn",
    "presentere viktige demografiske endringer og vurdere årsaker til disse endringene og virkninger av dem for mennesker og samfunn",
    "gjøre rede for hvordan handel og økonomiske systemer har påvirket maktforhold og menneskers liv",
    "utforske hvordan kommunikasjon og kulturmøter har hatt betydning for mennesker i Norge og verden",
  ],
  facts: [
    { text: "Jordbruket utviklet seg gradvis og på ulike måter i flere deler av verden.", sourceIds: ["openstax"] },
    { text: "Dyrking av ville kornslag i Sørvest-Asia kan dateres til ca. 9600 f.Kr.; domestiserte kornslag og husdyr kom senere og til ulik tid i ulike deler av regionen.", sourceIds: ["zeder", "openstax"] },
    { text: "Domestisering var en biologisk og kulturell prosess der menneskelig utvalg endret planter og dyr over mange generasjoner.", sourceIds: ["zeder"] },
    { text: "Mange samfunn kombinerte dyrking og husdyrhold med jakt, fiske og sanking i lang tid.", sourceIds: ["openstax", "catalhoyuk"] },
    { text: "Jordbruk kunne gi mer mat per areal, gjøre lagring mulig og støtte større, mer bofaste befolkninger.", sourceIds: ["openstax", "catalhoyuk"] },
    { text: "Matoverskudd kunne bidra til arbeidsdeling, handel, eiendom og mer varige forskjeller i makt.", sourceIds: ["openstax"] },
    { text: "Befolkninger kunne vokse selv om enkeltmennesker fikk mer ensidig kosthold, hardere arbeid og større smittepress.", sourceIds: ["scientific-reports", "openstax"] },
    { text: "Sterkere inngrep i jord, vann og vegetasjon kunne øke produksjonen, men også gi erosjon, utarming og tap av biologisk mangfold.", sourceIds: ["openstax"] },
    { text: "Çatalhöyük og Göbekli Tepe viser at bofasthet, samarbeid og jordbruk ikke utviklet seg i én enkel rekkefølge.", sourceIds: ["catalhoyuk", "gobekli-unesco", "dai-gobekli"] },
  ],
  concepts: [
    { term: "Jordbruksrevolusjonen", definition: "Den langvarige overgangen der dyrking og husdyrhold fikk større betydning, med grunnleggende følger for samfunn og natur." },
    { term: "Neolittisk tid", definition: "Yngre steinalder; en periode der jordbruk og bofaste samfunn spredte seg i mange regioner." },
    { term: "Domestisering", definition: "En gradvis biologisk og kulturell prosess der menneskelig utvalg endrer planter og dyr over generasjoner." },
    { term: "Bofasthet", definition: "At mennesker bor fast eller lenge på samme sted. Bofasthet kunne også finnes før fullt utviklet jordbruk." },
    { term: "Matoverskudd", definition: "Mat som blir igjen etter umiddelbare behov, og som kan lagres, byttes eller fordeles." },
    { term: "Arbeidsdeling", definition: "At ulike mennesker eller grupper spesialiserer seg på forskjellige oppgaver." },
    { term: "Demografi", definition: "Studiet av befolkningens størrelse, sammensetning og endring." },
    { term: "Periodisering", definition: "Å dele fortiden inn i perioder etter valgte kriterier. Starten på yngre steinalder faller ulikt i ulike regioner." },
    { term: "Brudd", definition: "En tydelig endring fra tidligere praksis eller samfunnsform." },
    { term: "Kontinuitet", definition: "Trekk som fortsetter gjennom en endringsperiode, som jakt og sanking ved siden av jordbruk." },
  ],
  narrative: [
    {
      heading: "Før jordbruket",
      paragraphs: [
        "I størstedelen av menneskets historie skaffet mennesker mat gjennom jakt, fiske og sanking. Det betyr ikke at de levde uten planlegging eller kunnskap. Jegere og sankere måtte kjenne planter, dyr, årstider, landskap og vær svært godt. Noen grupper flyttet ofte, mens andre bodde lenge på steder med rike og forutsigbare ressurser. Derfor er det misvisende å tenke at bofasthet alltid begynte først etter jordbruket.",
        "Mot slutten av siste istid endret klima og miljø seg. I flere områder fikk mennesker tilgang til store mengder ville kornslag, fisk eller andre ressurser. Samtidig kunne lokale befolkninger og ressursbehov endre seg. Dette skapte ikke jordbruk automatisk, men ga nye muligheter og problemer som mennesker løste på ulike måter.",
      ],
    },
    {
      heading: "Domestisering var en prosess",
      paragraphs: [
        "Jordbruk ble ikke «oppfunnet» på én dag. Mennesker som høstet ville planter, tok ofte med seg frø fra planter med nyttige egenskaper: store frø, aks som ikke mistet kornene for tidlig, eller planter som modnet samtidig. Når slike frø ble sådd igjen nær bosetningen, ble egenskapene valgt på nytt. Etter mange generasjoner kunne kulturplantene bli biologisk forskjellige fra sine ville slektninger.",
        "Det samme gjaldt dyr. Mennesker fanget, holdt, flyttet og avlet dyr. Dyr som var lettere å kontrollere eller hadde nyttige egenskaper, fikk større sjanse til å formere seg. Domestisering forandret dermed både artene og menneskenes daglige arbeid. Prosessen krevde kunnskap, men også langsiktig investering i jord, beite, redskaper og lagring.",
      ],
    },
    {
      heading: "Hvorfor begynte mennesker med jordbruk?",
      paragraphs: [
        "Det finnes ingen forklaring som passer alle regioner. Et varmere og ofte mer stabilt klima etter istiden gjorde noen plantesamfunn mer produktive. Lang erfaring med lokale arter ga mennesker kunnskap om såing, vekst og avl. Befolkningsvekst eller press på lokale ressurser kan ha gjort det nyttig å produsere mer mat per areal. I tillegg kan sosiale valg, konkurranse, fellesskap og ønsket om bestemte matvarer ha spilt inn.",
        "Disse faktorene må forstås som en kombinasjon, ikke som en oppskrift. Klimaendring rammet store områder, men alle ble ikke bønder. Noen grupper hadde gode grunner til å fortsette jakt, fiske og sanking. Andre tok i bruk litt dyrking eller noen husdyr og kombinerte dette med eldre matstrategier. Overgangen var derfor gradvis, regional og full av mellomformer.",
      ],
    },
    {
      heading: "Mange sentre – mange arter",
      paragraphs: [
        "De tidligste godt dokumenterte prosessene med dyrking fant sted i Sørvest-Asia fra omtrent 9600 f.Kr. Her ble blant annet hvete og bygg viktige, mens domestiserte kornslag og husdyr kom senere og til ulik tid. Men jordbruk oppstod ikke bare der. I Kina ble ris og hirse sentrale; i Mesoamerika mais, squash og bønner; i Andes potet, quinoa og lama; og på Ny-Guinea banan, og trolig også taro og yam. Også i Afrika utviklet mennesker egne jordbrukssystemer.",
        "Dette mangfoldet viser at jordbruksrevolusjonen best forstås i flertall: mange samfunn utviklet forskjellige løsninger tilpasset lokale klima, arter og tradisjoner. Noen steder spredte bønder og husdyr seg til nye områder. Andre steder ble arter, kunnskap og teknikker tatt opp av lokale grupper. Spredning var derfor både menneskeflytting og kulturmøte.",
      ],
    },
    {
      heading: "Følgene: hva ble mulig – og hva kostet det?",
      paragraphs: [
        "Jordbruk kunne produsere flere kalorier på et avgrenset areal enn jakt og sanking. Når mat kunne lagres, ble det mulig å forsørge flere mennesker gjennom dårlige sesonger og å bli boende over lengre tid. Bofaste landsbyer ble vanligere, og befolkningen kunne vokse. Flere barn kan ha blitt født med kortere mellomrom fordi familier ikke måtte flytte på samme måte som mange mobile grupper. Dette er en utbredt forklaring på befolkningsveksten, men fødselsintervaller kan ikke måles direkte i det arkeologiske materialet.",
        "Her ligger et viktig paradoks: en befolkning kunne vokse selv om helsen til mange enkeltmennesker ble dårligere. Et mer ensidig kosthold, hardt fysisk arbeid, tettere bosetninger, avfall, skadedyr og nær kontakt med husdyr kunne øke ernæringsstress og smitte. Derfor må vi skille mellom hvor mange et område kan brødfø, og hvordan hvert enkelt menneske levde.",
        "Et lagringsbart overskudd kunne brukes til å forsørge mennesker som ikke produserte all maten sin selv. Håndverkere, handelsfolk, religiøse spesialister og ledere kunne få mer tid til andre oppgaver. Redskaper, keramikk, tekstiler og byggverk kunne bli mer spesialiserte. Bytte og handel bandt samfunn sammen, og varer som obsidian kunne bevege seg over store avstander.",
        "Men overskudd førte ikke automatisk til byer eller stater. Noen jordbrukssamfunn forble små og relativt like i lang tid. Historikeren må derfor bruke ord som «kunne» og «bidro til». Utviklingskjeden er en historisk mulighet, ikke en naturlov.",
        "Jord, dyr og lagret mat kunne kontrolleres, forsvares og arves. Dermed kunne forskjeller i rikdom bli mer varige. Den som styrte lagre, vann eller arbeidskraft, kunne få makt over andre. Over tid oppstod det noen steder tydeligere sosiale lag og politiske ledere. Kjønn og alder kunne også påvirke hvem som gjorde ulike typer arbeid og hvem som hadde tilgang til ressurser.",
        "Det er likevel farlig å lese senere stater rett inn i de første landsbyene. Arkeologiske funn kan vise forskjeller i hus, gravgaver og kosthold, men de forteller ikke alltid hvem som bestemte eller hvordan mennesker opplevde rettferdighet. Makt må undersøkes, ikke antas.",
        "Jordbruk gjorde menneskers inngrep i naturen mer varige. Skog ble ryddet, beitedyr påvirket vegetasjon, jord ble pløyd, og vann ble ledet til åkre. Dette kunne øke produksjonen, men også gi erosjon, utarming av jord, saltproblemer og tap av biologisk mangfold. Avhengighet av noen få arter kunne gjøre samfunn sårbare for avlingssvikt. Samtidig har bønder gjennom historien utviklet kunnskap som kan bevare jord og vann, for eksempel vekstskifte, terrasser og lokale plantesorter.",
      ],
    },
  ],
  causes: [
    "Varmere og ofte mer stabilt klima etter siste istid.",
    "Lang erfaring med lokale planter, dyr, årstider og landskap.",
    "Lokale endringer i ressurser, befolkning eller behov for mat per areal.",
    "Sosiale valg, fellesskap, konkurranse og ønsker om bestemte matvarer.",
  ],
  effects: [
    "Mer mat per areal, lagring og mer bofasthet.",
    "Befolkningsvekst og større, tettere bosetninger.",
    "Arbeidsdeling, handel og spesialisering kunne bli mer omfattende.",
    "Sykdom, ensidig kost, hardt arbeid og sterkere inngrep i naturen.",
    "Jord, dyr, vann og lagre kunne bli grunnlag for varigere ulikhet og makt.",
  ],
  continuities: [
    "Jakt, fiske og sanking fortsatte ved siden av dyrking og husdyrhold i mange samfunn.",
    "Bofasthet kunne finnes før fullt utviklet jordbruk.",
    "Lokale tradisjoner og kunnskap formet hvilke arter og teknikker som ble tatt i bruk.",
  ],
  breaks: [
    "Matproduksjon knyttet mennesker sterkere til jord, vann, dyr og bestemte steder.",
    "Lagring og eiendom kunne gjøre forskjeller i ressurser mer varige.",
    "Større inngrep i landskapet endret forholdet mellom mennesker og natur.",
  ],
  causeChain: [
    "Mer mat per areal",
    "Lagring",
    "Arbeidsdeling og spesialisering",
    "Handel og lagre som kan kontrolleres over tid",
    "Mulige forskjeller i rikdom og makt",
  ],
  sourceLooks: [
    {
      label: "Kilde A · Çatalhöyük",
      period: "ca. 7400–6200 f.Kr.",
      place: "Anatolia",
      sourceIds: ["catalhoyuk", "catalhoyuk-guide"],
      evidence: ["18 neolittiske lag i den østre haugen", "tettbygde hus og takadkomst", "ildsteder, lagerrom, kornrester, dyrebein og obsidian", "begravelser under husgulv"],
      supports: "Materialet støtter langvarig bosetning, lagring og organisert ressursbruk.",
      cannotProve: "Det beviser ikke alene at alle hadde samme tro, at samfunnet var helt likt eller at én bestemt leder styrte.",
    },
    {
      label: "Kilde B · Göbekli Tepe",
      period: "ca. 9600–8200 f.Kr.",
      place: "Sørøst-Anatolia",
      sourceIds: ["gobekli-unesco", "dai-gobekli", "gobekli-grain"],
      evidence: ["monumentale steinanlegg av megalitter", "T-formede søyler med bilder av ville dyr", "dyrebein fra ville arter", "ingen sikre domestiserte arter i de eldste lagene", "spor etter omfattende bearbeiding av korn"],
      supports: "Materialet støtter at omfattende samarbeid og monumentbygging kunne organiseres før fullt utviklet jordbruk kan dokumenteres på stedet. At byggherrene levde av jakt og sanking, er en tolkning bygget på flere spor.",
      cannotProve: "Materialet beviser ikke at jordbruk var uviktig, eller at vi kjenner den nøyaktige betydningen av anleggene. Det avgjør heller ikke om stedet først og fremst var en samlingsplass eller en fast bosetning; nyere undersøkelser gjør tolkningen mer sammensatt.",
    },
  ],
  longLineIds: ["mat-og-naturressurser", "demografi", "handel-og-okonomi", "kommunikasjon-og-kulturmoter", "makt-og-legitimering"],
  summary: [
    "Jordbruket utviklet seg gradvis og på ulike måter i flere deler av verden.",
    "Domestisering forandret både planter, dyr og menneskenes levemåte.",
    "Jordbruk kunne gi mer mat per areal og støtte større, bofaste befolkninger.",
    "Overskudd og lagring kunne bidra til arbeidsdeling, eiendom og forskjeller i makt.",
    "Overgangen hadde også kostnader: hardt arbeid, sykdom, ensidig kosthold og sterkere naturinngrep.",
  ],
  timeline: [
    { date: "ca. 9700 f.Kr.", title: "Holocen begynner", description: "Holocen begynner – formelt datert til 11 700 år før nåtid, altså ca. 9700 f.Kr. Varmere og ofte mer stabile lokale miljøer endrer ressursgrunnlaget.", sourceIds: ["holocene-ics", "openstax"] },
    { date: "ca. 9600–8800 f.Kr.", title: "Dyrking av ville kornslag", description: "Mennesker sår og høster ville kornslag i deler av Sørvest-Asia før plantene er biologisk domestiserte.", sourceIds: ["zeder", "openstax"] },
    { date: "ca. 8700–8000 f.Kr.", title: "Domestiserte kornslag, sau og geit", description: "Hvete og bygg får domestiserte trekk, mens sau og geit holdes i flokk. Tidspunktet varierer mellom regioner.", sourceIds: ["zeder"] },
    { date: "ca. 9600–8200 f.Kr.", title: "Göbekli Tepe", description: "Monumentale fellesprosjekter viser at samarbeid og store anlegg ikke kan plasseres i en enkel trapp etter jordbruket.", sourceIds: ["gobekli-unesco", "dai-gobekli"] },
    { date: "ca. 7400–6200 f.Kr.", title: "Çatalhöyük", description: "En stor, tett og langvarig bosetning kombinerer flere matstrategier.", sourceIds: ["catalhoyuk", "catalhoyuk-guide"] },
    { date: "senere årtusener", title: "Flere regionale jordbrukssystemer", description: "Ris, hirse, mais, squash, bønner, potet, quinoa, banan, taro og yam blir viktige i ulike regioner.", sourceIds: ["openstax", "denham"] },
    { date: "fram mot ca. 3500–3000 f.Kr.", title: "Større bysamfunn noen steder", description: "Overskudd, spesialisering og maktkonsentrasjon blir viktig i noen områder, men ikke som automatisk følge overalt.", sourceIds: ["openstax"] },
  ],
  tasks,
  progressVersion: 2,
  teacherResources: [
    { label: "Lærerveiledning og fasit", description: "Det lokale kildedokumentet inneholder undervisningsløp, misoppfatninger, fasit og vurderingskriterier." },
    { label: "Kortprøve", description: "Det lokale kildedokumentet inneholder en kortprøve på 40 poeng med fakta, forståelse, lange linjer og kildeblikk." },
  ],
  sources: [
    { id: "udir", title: "Utdanningsdirektoratet · Kompetansemål etter vg2 (HIS01-03)", href: "https://www.udir.no/lk20/his01-03/kompetansemaal-og-vurdering/kv84", note: "Gjeldende kompetansemål og føringer for underveisvurdering i historie vg2." },
    { id: "openstax", title: "OpenStax · World History Volume 1: 2.3 The Neolithic Revolution", href: "https://openstax.org/books/world-history-volume-1/pages/2-3-the-neolithic-revolution", note: "Åpen læreboktekst om neolittisk tid og konsekvenser av overgangen." },
    { id: "catalhoyuk", title: "UNESCO · Neolithic Site of Çatalhöyük", href: "https://whc.unesco.org/en/list/1405/", note: "Verdensarvstedets beskrivelse av den østre haugens neolittiske lag og husklynger." },
    { id: "catalhoyuk-guide", title: "Çatalhöyük Research Project · Site Guide Book", href: "https://catalhoyuk.ku.edu.tr/sites/default/files/Catalhoyuk-Guidebook-ENGLISH.pdf", note: "Åpen prosjektguide som dekker lagring, matbehandling, obsidian, husgulvbegravelser og utveksling. Lisens: CC BY-NC 4.0." },
    { id: "gobekli-unesco", title: "UNESCO · Göbekli Tepe", href: "https://whc.unesco.org/en/list/1572/", note: "Verdensarvstedets beskrivelse av monumentale anlegg og den tradisjonelle jeger- og sankertolkningen." },
    { id: "dai-gobekli", title: "Deutsches Archäologisches Institut · Göbekli Tepe", href: "https://www.dainst.org/en/research/projects/noslug/5746", note: "Forskningsprosjektets oversikt over pågående dokumentasjon, geofysiske undersøkelser og nytolkninger." },
    { id: "gobekli-grain", title: "Dietrich m.fl. · Cereal processing at Early Neolithic Göbekli Tepe", href: "https://doi.org/10.1371/journal.pone.0215214", note: "Fagfellevurdert studie av omfattende kornbearbeiding og behovet for en mer integrert tolkning av rituelle og hverdagslige aktiviteter." },
    { id: "zeder", title: "Zeder (2008) · Domestication and early agriculture in the Mediterranean Basin", href: "https://doi.org/10.1073/pnas.0801317105", note: "Fagfellevurdert oversikt over dyrking, flokkforvaltning og domestisering i Middelhavsområdet." },
    { id: "denham", title: "Denham m.fl. (2003) · Origins of agriculture at Kuk Swamp", href: "https://doi.org/10.1126/science.1085255", note: "Fagfellevurdert studie av uavhengig jordbruksutvikling på Ny-Guinea; dokumenterer banan og tidlig bruk av taro." },
    { id: "holocene-ics", title: "International Commission on Stratigraphy · GSSP tables", href: "https://stratigraphy.org/gssps/", note: "Offisiell stratigrafisk datering av Holocens base til 11 700 år før 2000 (b2k)." },
    { id: "scientific-reports", title: "Scientific Reports (2023) · Bioarchaeological data and the transition to farming", href: "https://www.nature.com/articles/s41598-023-49406-5", note: "Forskning på forholdet mellom vekst, kosthold og demografi gjennom overgangen til jordbruk i det sentrale Middelhavsområdet." },
  ],
  lastChecked: "20. august 2026",
};

export const chapters = [jordbruksrevolusjonen];

export const curriculumSections = curriculumSectionDefinitions.map((section) => ({
  ...section,
  chapters: chapters.filter((chapter) => chapter.sectionSlug === section.slug),
}));

export function getContentModelIssues() {
  const issues: string[] = [];
  const chapterIds = new Set<string>();
  const chapterPaths = new Set<string>();
  const sectionSlugs = new Set(curriculumSectionDefinitions.map((section) => section.slug));
  const longLineIds = new Set<string>(longLines.map((line) => line.id));

  for (const chapter of chapters) {
    const path = `${chapter.sectionSlug}/${chapter.slug}`;
    if (chapterIds.has(chapter.id)) issues.push(`Duplisert kapittel-ID: ${chapter.id}`);
    if (chapterPaths.has(path)) issues.push(`Duplisert kapittelsti: ${path}`);
    if (!sectionSlugs.has(chapter.sectionSlug)) issues.push(`Ukjent hovedområde for ${chapter.id}: ${chapter.sectionSlug}`);
    if (!Number.isInteger(chapter.progressVersion) || chapter.progressVersion < 1) issues.push(`Ugyldig progressVersion for ${chapter.id}`);
    chapterIds.add(chapter.id);
    chapterPaths.add(path);

    const taskIds = new Set<string>();
    for (const task of chapter.tasks) {
      if (taskIds.has(task.id)) issues.push(`Duplisert oppgave-ID i ${chapter.id}: ${task.id}`);
      if (!task.hint.trim() || !task.explanation.trim()) issues.push(`Oppgave ${task.id} mangler hint eller forklaring`);
      if (task.kind === "choice" && (!task.options?.length || task.correct === undefined || task.correct < 0 || task.correct >= task.options.length)) {
        issues.push(`Flervalgsoppgave ${task.id} har ugyldige alternativer eller fasit`);
      }
      if (task.kind === "order" && (!task.items?.length || task.expected?.length !== task.items.length)) {
        issues.push(`Rekkefølgeoppgave ${task.id} har ugyldige ledd eller fasit`);
      }
      if ((task.kind === "match" || task.kind === "sort") && (!task.items?.length || !task.choices?.length || !task.answerMap)) {
        issues.push(`Koble-/sorteringsoppgave ${task.id} mangler data eller fasit`);
      }
      if (task.kind === "reflection" && !task.modelResponse?.trim()) issues.push(`Åpen oppgave ${task.id} mangler modellrespons`);
      taskIds.add(task.id);
    }

    for (const id of chapter.longLineIds) {
      if (!longLineIds.has(id)) issues.push(`Ukjent lang linje i ${chapter.id}: ${id}`);
    }
    const sourceIds = new Set<string>();
    for (const source of chapter.sources) {
      if (sourceIds.has(source.id)) issues.push(`Duplisert kilde-ID i ${chapter.id}: ${source.id}`);
      if (!source.href.startsWith("https://")) issues.push(`Kilden «${source.title}» må bruke HTTPS`);
      sourceIds.add(source.id);
    }
    for (const claim of chapter.facts) {
      if (!claim.text.trim() || claim.sourceIds.length === 0) issues.push(`Faktapunkt i ${chapter.id} mangler tekst eller kildekobling`);
      for (const sourceId of claim.sourceIds) if (!sourceIds.has(sourceId)) issues.push(`Ukjent kilde-ID i faktapunkt for ${chapter.id}: ${sourceId}`);
    }
    for (const point of chapter.timeline) {
      if (point.sourceIds.length === 0) issues.push(`Tidslinjepunktet «${point.title}» i ${chapter.id} mangler kildekobling`);
      for (const sourceId of point.sourceIds) if (!sourceIds.has(sourceId)) issues.push(`Ukjent kilde-ID i tidslinjen for ${chapter.id}: ${sourceId}`);
    }
    for (const sourceLook of chapter.sourceLooks) {
      for (const sourceId of sourceLook.sourceIds) if (!sourceIds.has(sourceId)) issues.push(`Ukjent kilde-ID i kildeblikket for ${chapter.id}: ${sourceId}`);
    }
    if (chapter.summaryPdf && !chapter.summaryPdf.href.startsWith("/")) issues.push(`PDF-stien for ${chapter.id} må være rot-relativ`);
  }

  return issues;
}

const contentModelIssues = getContentModelIssues();
if (contentModelIssues.length > 0) {
  throw new Error(`Ugyldig innholdsmodell:\n${contentModelIssues.join("\n")}`);
}

export function getChapterById(id: string) {
  return chapters.find((chapter) => chapter.id === id);
}

export function getChapterPath(chapter: Chapter) {
  return `/laereverk/${chapter.sectionSlug}/${chapter.slug}`;
}

export const glossary = chapters.flatMap((chapter) =>
  chapter.concepts.map((concept) => ({ ...concept, chapterId: chapter.id, chapterTitle: chapter.title })),
);

export const timeline = chapters.flatMap((chapter) =>
  chapter.timeline.map((point) => ({ ...point, chapterId: chapter.id, chapterTitle: chapter.title })),
);
