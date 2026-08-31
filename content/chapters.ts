export type Phase = "Fakta" | "Forståelse" | "Lange linjer" | "Kildeblikk";

export const chapterSectionIds = [
  "forkunnskap",
  "mal",
  "tid-og-sted",
  "tidslinje",
  "fakta",
  "forstaelse",
  "fagtekst",
  "kildeblikk",
  "kildeverksted",
  "lange-linjer",
  "oppgaver",
  "oppsummering",
  "repetisjon",
  "kilder",
  "pdf",
] as const;

export type ChapterSectionId = (typeof chapterSectionIds)[number];

export const chapterRenderedSectionOrder = [
  "forkunnskap",
  "mal",
  "tid-og-sted",
  "fakta",
  "forstaelse",
  "fagtekst",
  "kildeblikk",
  "kildeverksted",
  "lange-linjer",
  "oppgaver",
  "oppsummering",
  "repetisjon",
  "kilder",
  "pdf",
] as const satisfies readonly ChapterSectionId[];

export const chapterNavigationSections = [
  ["forkunnskap", "Forkunnskap"],
  ["mal", "Mål og hovedspørsmål"],
  ["tid-og-sted", "Tid og sted"],
  ["fakta", "Fakta"],
  ["forstaelse", "Forståelse"],
  ["fagtekst", "Fagtekst"],
  ["kildeblikk", "Kildeblikk"],
  ["kildeverksted", "Kildeverksted"],
  ["lange-linjer", "Lange linjer"],
  ["oppgaver", "Oppgaver"],
  ["oppsummering", "Oppsummering og egenvurdering"],
  ["repetisjon", "Repetisjon"],
  ["kilder", "Kilder"],
  ["pdf", "Kort repetisjon"],
] as const satisfies readonly (readonly [ChapterSectionId, string])[];

export type TeachingPhase = {
  id: string;
  title: string;
  duration: string;
  purpose: string;
  teacherActions: string[];
  studentActions: string[];
  sectionIds: ChapterSectionId[];
};

export type TeacherMisconception = {
  belief: string;
  whyUnderstandable: string;
  diagnosticQuestion: string;
  response: string;
};

export type TeacherAssessmentCriterion = {
  area: "Faktakunnskap" | "Historiske begreper" | "Årsaker og virkninger" | "Kildebruk" | "Konkrete eksempler" | "Nyansering og historisk usikkerhet";
  shortAnswer: string;
  extendedAnswer: string;
};

export type TeacherResource = {
  label: string;
  description: string;
  visibility: "public" | "local";
  href?: string;
  sectionId?: ChapterSectionId;
};

export type SourceRights = {
  rightsHolder: string;
  originalUrl: string;
  licenseStatus: string;
  credit: string;
  adaptation: string;
  checked: string;
};

export type SourceMaterial = {
  id: string;
  label: string;
  materialType:
    | "bosetningsspor"
    | "arkitektoniske spor"
    | "redskaps- og plantespor"
    | "materielt/arkeologisk spor"
    | "skriftlig dokument"
    | "visuelt materiale"
    | "kvantitativt materiale";
  date: string;
  place: string;
  findContext: string;
  preservation: string;
  documentedBy: string;
  documentedDescription: string;
  possibleObservations: string[];
  supportedInterpretations: string[];
  alternativeInterpretations: string[];
  cannotProve: string;
  sourceIds: string[];
  rights: SourceRights;
  externalLink?: {
    href: string;
    label: string;
  };
  media?: {
    path: string;
    altText: string;
    rights: SourceRights;
  };
};

export type WorkshopClaimClassification = "direct" | "possible" | "too-strong" | "cannot-determine";

export type SourceWorkshopClaim = {
  id: string;
  text: string;
  classification: WorkshopClaimClassification;
  explanation: string;
  sourceIds: string[];
};

export type SourceWorkshopContext = {
  time: string;
  place: string;
  findContext: string;
  preservation: string;
  documentedBy: string;
  limitations: string[];
};

export type SourceWorkshopModelResponse = {
  observations: string;
  interpretation: string;
  reservation: string;
  limitation: string;
};

export type SourceWorkshop = {
  id: string;
  chapterId: string;
  sectionId: "kildeverksted";
  title: string;
  guidingQuestion: string;
  learningGoals: string[];
  context: SourceWorkshopContext;
  materials: SourceMaterial[];
  claims: SourceWorkshopClaim[];
  synthesisPrompt: string;
  synthesisCriteria: string[];
  synthesisMinimumMaterials?: number;
  conclusionPrompt: string;
  conclusionWordRange?: {
    min: number;
    max: number;
  };
  requiresRevision?: boolean;
  modelResponse: SourceWorkshopModelResponse;
  rubric: string[];
  sourceIds: string[];
  progressVersion: number;
  lastChecked: string;
};

export type TeacherSourceWorkshopGuide = {
  workshopId: string;
  purpose: string;
  recommendedPlacement: string;
  distinctions: string[];
  commonMisreadings: string[];
  discussionQuestions: string[];
  assessmentCriteria: string[];
  sourceIds: string[];
};

export type TeacherGuide = {
  overview: string;
  teachingPhases: TeachingPhase[];
  priorKnowledgeActivation: {
    prompt: string;
    cues: string[];
    sectionIds: ChapterSectionId[];
  };
  textWork: {
    instructions: string[];
    sectionIds: ChapterSectionId[];
  };
  taskUse: {
    sequence: string;
    firstAttempt: string;
    retry: string;
    openResponses: string;
    sectionIds: ChapterSectionId[];
  };
  selfAssessmentAndReview: {
    selfAssessment: string[];
    repetition: string[];
    sectionIds: ChapterSectionId[];
  };
  misconceptions: TeacherMisconception[];
  assessmentCriteria: TeacherAssessmentCriterion[];
  sourceWorkshop: TeacherSourceWorkshopGuide;
  adaptation?: {
    supports: string[];
    extensions: string[];
  };
  resources: TeacherResource[];
};

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
  sortKey: number;
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

export type ChapterSource = {
  id: string;
  title: string;
  href: string;
  note: string;
  rights: string;
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
  narrative: { heading: string; paragraphs: (string | CitedClaim)[] }[];
  causes: string[];
  effects: string[];
  continuities: string[];
  breaks: string[];
  causeChain: string[];
  sourceLooks: SourceLook[];
  sourceIntroduction?: string;
  sourceWorkshops: SourceWorkshop[];
  understandingLabels?: {
    heading: string;
    intro: string;
    leftTitle: string;
    rightTitle: string;
    chainTitle: string;
    chainIntro: string;
    comparisonTitle: string;
    breaksTitle: string;
    continuitiesTitle: string;
  };
  longLineIds: string[];
  longLinesPrompt?: string;
  reviewPlan: { label: string; text: string }[];
  summary: string[];
  timeline: TimelinePoint[];
  tasks: LearningTask[];
  progressVersion: number;
  summaryPdf?: { label: string; href: string };
  teacherGuide?: TeacherGuide;
  sources: ChapterSource[];
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

const tasks1_1: LearningTask[] = [
  {
    id: "F1",
    phase: "Fakta",
    kind: "choice",
    title: "Hva er en historisk kilde?",
    prompt: "Hvilken forklaring er mest presis?",
    points: 1,
    options: [
      "En tekst som ble skrevet av en historiker etter at en hendelse var avsluttet.",
      "Et spor fra fortiden som kan gi et sikkert svar uten at vi stiller spørsmål.",
      "Et materiale vi bruker som kilde når vi stiller det spørsmål om fortiden.",
      "Et gammelt objekt som alltid forteller mer enn et dokument eller et fotografi.",
    ],
    correct: 2,
    hint: "Tenk på forholdet mellom materialet og spørsmålet historikeren stiller.",
    explanation: "Et materiale blir brukt som historisk kilde i møte med et spørsmål. Det samme materialet kan derfor gi ulike typer kunnskap i ulike undersøkelser.",
  },
  {
    id: "F2",
    phase: "Fakta",
    kind: "choice",
    title: "Levning og beretning",
    prompt: "Hvordan bør begrepene «levning» og «beretning» brukes?",
    points: 1,
    options: [
      "Som faste kildetyper der gjenstander er levninger og tekster er beretninger.",
      "Som funksjoner: et materiale kan brukes som spor etter en situasjon og som utsagn om noe.",
      "Som en rangering der levninger alltid er mer troverdige enn beretninger.",
      "Som navn på primærkilder og sekundærkilder fra samme historiske periode.",
    ],
    correct: 1,
    hint: "Kan én avis både være et spor etter en redaksjonell situasjon og fortelle om et møte?",
    explanation: "Levning og beretning beskriver hvordan vi bruker et materiale i en bestemt undersøkelse. De er ikke faste bokser for gjenstander og tekster.",
  },
  {
    id: "F3",
    phase: "Fakta",
    kind: "order",
    title: "Fra spørsmål til historisk svar",
    prompt: "Sett arbeidsmåtene i en faglig rekkefølge.",
    points: 5,
    items: ["Sammenstille flere spor", "Stille et avgrenset spørsmål", "Formulere en konklusjon med forbehold", "Observere materialet", "Sette materialet i kontekst"],
    expected: ["Stille et avgrenset spørsmål", "Observere materialet", "Sette materialet i kontekst", "Sammenstille flere spor", "Formulere en konklusjon med forbehold"],
    hint: "Start med det som styrer hva materialene skal undersøkes for.",
    explanation: "Spørsmålet avgrenser undersøkelsen. Observasjon og kontekst kommer før sammenstilling og en konklusjon som viser usikkerhet.",
  },
  {
    id: "F4",
    phase: "Fakta",
    kind: "choice",
    title: "Undersøkelsens ramme",
    prompt: "Hva undersøker kildeverkstedet i dette kapitlet?",
    points: 1,
    options: [
      "Hvordan alle internerte i alle leirer opplevde tvangsinterneringen under hele krigen.",
      "Hvilke romlige og administrative rammer og enkelte lokale praksiser fire materialer kan dokumentere ved Manzanar 1942–45.",
      "Om ett bestemt dokument kan bevise hvorfor amerikanske myndigheter opprettet alle leirene.",
      "Hvordan fotografier alene kan gi et representativt bilde av privatlivet ved Manzanar.",
    ],
    correct: 1,
    hint: "Se etter riktig sted, tidsrom, materialmengde og avgrensning.",
    explanation: "Verkstedet gjelder Manzanar fra 1942 til 1945 og fire bestemte materialvinduer. Det skal ikke generaliseres til alle leirer eller alle erfaringer.",
  },
  {
    id: "F5",
    phase: "Fakta",
    kind: "match",
    title: "Fire materialtyper",
    prompt: "Koble materialet til materialtypen.",
    points: 4,
    items: ["M-01 · hagedam og gjenstander", "W-01 · Manzanar Free Press", "V-01 · Lange-fotografi", "Q-01 · aggregert avreisestatistikk"],
    choices: ["visuelt materiale", "kvantitativt materiale", "materielt/arkeologisk spor", "skriftlig dokument"],
    answerMap: {
      "M-01 · hagedam og gjenstander": "materielt/arkeologisk spor",
      "W-01 · Manzanar Free Press": "skriftlig dokument",
      "V-01 · Lange-fotografi": "visuelt materiale",
      "Q-01 · aggregert avreisestatistikk": "kvantitativt materiale",
    },
    hint: "Skill mellom fysisk funn, publisert tekst, fotografisk utsnitt og tallmateriale.",
    explanation: "Ulike materialtyper er skapt og bevart på ulike måter. Derfor må de observeres, kontekstualiseres og avgrenses forskjellig.",
  },
  {
    id: "U1",
    phase: "Forståelse",
    kind: "choice",
    title: "Kontekst endrer tolkningen",
    prompt: "Hvorfor trenger vi opphavssituasjon og formidlingsvei?",
    points: 1,
    options: [
      "De gjør at historikeren kan avgjøre nøyaktig hva alle personer tenkte.",
      "De viser hvordan materialet ble til, valgt, bevart og tilgjengeliggjort, og påvirker hva vi kan slutte.",
      "De erstatter behovet for å sammenligne materialet med andre kilder.",
      "De avgjør om materialet skal regnes som levning eller beretning for alle spørsmål.",
    ],
    correct: 1,
    hint: "Spør hvem som skapte og valgte materialet, og hvordan det nådde oss.",
    explanation: "Kontekst gjør utvalg, formål og bevaring synlig. Den fjerner ikke usikkerhet, men gjør slutningen bedre begrunnet.",
  },
  {
    id: "U2",
    phase: "Forståelse",
    kind: "sort",
    title: "Representativitet eller fravær",
    prompt: "Sorter utsagnene etter hvilket kildeproblem de først og fremst viser.",
    points: 4,
    items: ["Ett fotografi viser bare et valgt utsnitt", "195 rader mangler avreisestat", "Én hagedam kan ikke beskrive alle boligblokker", "Avisen viser ikke om alle var enige"],
    choices: ["Representativitet", "Fravær i materialet"],
    answerMap: {
      "Ett fotografi viser bare et valgt utsnitt": "Representativitet",
      "195 rader mangler avreisestat": "Fravær i materialet",
      "Én hagedam kan ikke beskrive alle boligblokker": "Representativitet",
      "Avisen viser ikke om alle var enige": "Fravær i materialet",
    },
    hint: "Representativitet handler om hvor bredt et utsnitt kan gjelde. Fravær handler om det materialet ikke registrerer eller viser.",
    explanation: "Et snevert utsnitt kan være dårlig egnet til generalisering, mens manglende felt eller stemmer er et konkret fravær. Begge deler må synliggjøres.",
  },
  {
    id: "U3",
    phase: "Forståelse",
    kind: "choice",
    title: "Et forsvarlig forbehold",
    prompt: "Hvilken formulering går ikke lenger enn materialet?",
    points: 1,
    options: [
      "Hagefunnet beviser at alle internerte frivillig skapte de samme hagene.",
      "Avisen dokumenterer at komiteene løste konfliktene for alle ved Manzanar.",
      "Fotografiet kan støtte en beskrivelse av utendørs romlig organisering i fotografens valgte utsnitt.",
      "Avreisestatistikken viser hvorfor hver person valgte sin destinasjon.",
    ],
    correct: 2,
    hint: "Se etter en formulering som nevner både mulig støtte og materialets utsnitt.",
    explanation: "Fotografiet kan beskrive synlige romlige trekk i utsnittet, men ikke privatliv, motiv eller hele leiren.",
  },
  {
    id: "U4",
    phase: "Forståelse",
    kind: "order",
    title: "Revider en for sterk påstand",
    prompt: "Sett revisjonsarbeidet i en nyttig rekkefølge.",
    points: 4,
    items: ["Legg inn et presist forbehold", "Finn ordet som gjør påstanden for sikker", "Kontroller påstanden mot konkrete spor", "Sammenlign med et annet materiale"],
    expected: ["Finn ordet som gjør påstanden for sikker", "Kontroller påstanden mot konkrete spor", "Sammenlign med et annet materiale", "Legg inn et presist forbehold"],
    hint: "Oppdag først hva som går for langt, og bruk deretter belegg før du formulerer på nytt.",
    explanation: "Revisjon er faglig arbeid: identifiser styrken i påstanden, prøv den mot belegg og sammenligning, og avgrens det som fortsatt er usikkert.",
  },
  {
    id: "L1",
    phase: "Lange linjer",
    kind: "choice",
    title: "Kommunikasjon som lang linje",
    prompt: "Hva kan W-01 brukes til å undersøke i en lang linje om kommunikasjon?",
    points: 1,
    options: [
      "Hvordan en lokal avis kunne formulere og distribuere informasjon om møter, komiteer og hverdagsstoff.",
      "Hvor effektivt alle lesere fulgte rådene og om alle støttet redaksjonen.",
      "Hvordan alle leiraviser brukte samme språk og hadde samme rolle under krigen.",
      "Hvorfor myndighetene valgte tvangsinternering som nasjonal politikk.",
    ],
    correct: 0,
    hint: "Hold deg til hva den konkrete avisutgaven viser at ble publisert.",
    explanation: "Avisutgaven dokumenterer formulert og distribuert informasjon lokalt. Virkning, enighet og representativitet må undersøkes med andre kilder.",
  },
  {
    id: "L2",
    phase: "Lange linjer",
    kind: "choice",
    title: "Makt og administrasjon",
    prompt: "Hvilken langlinjepåstand er mest presis?",
    points: 1,
    options: [
      "Administrative kategorier i en sluttliste kan gjøre mennesker tellbare, men sier ikke alene hvordan ordningen ble opplevd.",
      "En sluttliste viser at alle administrative valg ble gjennomført på samme måte gjennom hele perioden.",
      "Manglende verdier beviser at myndighetene ønsket å skjule bestemte personer.",
      "Tallmaterialet gjør de andre materialtypene overflødige fordi det dekker flest personer.",
    ],
    correct: 0,
    hint: "Skill mellom hva administrativ registrering gjør synlig og hva den ikke registrerer.",
    explanation: "Aggregert statistikk kan vise mønstre i registrerte kategorier. Erfaring, motiv og praksis over tid må undersøkes på andre måter.",
  },
  {
    id: "L3",
    phase: "Lange linjer",
    kind: "reflection",
    title: "Når blir fravær historisk viktig?",
    prompt: "Velg to av materialene. Forklar hvordan det som mangler, påvirker en mulig lang linje om demografi, kommunikasjon eller makt.",
    points: 2,
    hint: "Nevn først hva materialet viser, deretter hvilken gruppe, periode, stemme eller forklaring som ikke er synlig.",
    explanation: "Et godt svar bruker fravær som en avgrensning, ikke som bevis for det motsatte.",
    modelResponse: "Q-01 viser et aggregert mønster i registrert avreisestat, men 195 rader mangler verdi, og tabellen sier ikke hvorfor personer reiste dit. W-01 viser hvilke saker en avisutgave formidlet, men ikke hvordan alle leste eller vurderte dem. En lang linje om administrasjon og kommunikasjon må derfor skille mellom registrerte kategorier, publisert informasjon og menneskers erfaringer.",
  },
  {
    id: "K1",
    phase: "Kildeblikk",
    kind: "choice",
    title: "Hva tåler M-01?",
    prompt: "Hvilken slutning støttes best av M-01?",
    points: 1,
    options: [
      "Det fantes en dokumentert dam/hage ved Block 15, Barracks 5, leilighet 2, med husholdningsrelaterte gjenstander i øvre fyll.",
      "Alle hager ved Manzanar ble laget av samme grunn og på samme måte.",
      "Gjenstandene viser nøyaktig hvem som bygde hagen og hva personen følte.",
      "Hagen viser at livet i tvangsinterneringen først og fremst var frivillig fritid.",
    ],
    correct: 0,
    hint: "Velg observasjonen som beholder sted, funnkontekst og begrensning.",
    explanation: "M-01 dokumenterer et bestemt anlegg og en bestemt funnkontekst. Det kan ikke alene fastslå opphavsperson, motiv, følelser eller representativitet.",
  },
  {
    id: "K2",
    phase: "Kildeblikk",
    kind: "choice",
    title: "Hva tåler W-01?",
    prompt: "Hva kan avisutgaven 24. oktober 1942 dokumentere?",
    points: 1,
    options: [
      "At alle innbyggere støttet komiteene og deltok i blokk-møtene.",
      "At lokal selvorganisering, møter og praktisk informasjon ble formulert og distribuert i denne utgaven.",
      "At avisen var en nøytral og fullstendig gjengivelse av alle konflikter.",
      "At komiteene hadde samme virkning i alle tvangsinterneringsleirer.",
    ],
    correct: 1,
    hint: "Spør hva som faktisk står i og utgis gjennom én bestemt avisutgave.",
    explanation: "Utgaven viser hva avisen publiserte om organisering og hverdagsstoff. Den viser ikke alles enighet, faktisk effekt eller alle erfaringer.",
  },
  {
    id: "K3",
    phase: "Kildeblikk",
    kind: "choice",
    title: "Fotografi og tall",
    prompt: "Hvorfor er V-01 og Q-01 nyttige å sammenstille?",
    points: 1,
    options: [
      "De kan sammen bevise hvordan alle personer opplevde leiren og hvorfor de reiste.",
      "Fotografiet viser et romlig utsnitt, mens statistikken viser et aggregert administrativt mønster; forskjellen gjør kildegrensene synlige.",
      "Tallmaterialet kan kontrollere om fotografens utsnitt er visuelt korrekt i alle deler av leiren.",
      "Fotografiet kan fylle alle manglende verdier i den administrative sluttlisten.",
    ],
    correct: 1,
    hint: "Se etter to ulike skalaer og to ulike formidlingsmåter.",
    explanation: "Materialene belyser ulike sider og skalaer. Sammenstilling er ikke sammensmelting: hvert materiale beholder sine egne begrensninger.",
  },
  {
    id: "K4",
    phase: "Kildeblikk",
    kind: "reflection",
    title: "Bygg og avgrens et svar",
    prompt: "Skriv 120–180 ord: Hva kan minst tre materialtyper dokumentere om rammer og lokale praksiser ved Manzanar, og hva kan de ikke avgjøre?",
    points: 4,
    hint: "Bruk ID-ene M-01, W-01, V-01 og/eller Q-01. Skill observasjon fra tolkning, og avslutt med representativitet eller fravær.",
    explanation: "Et godt svar har et avgrenset spørsmål, konkrete spor fra minst tre materialtyper, en sammenstilling og tydelige forbehold.",
    modelResponse: "M-01 dokumenterer en bestemt dam/hage ved Block 15 og husholdningsrelaterte gjenstander i øvre fyll. W-01 viser at en avisutgave publiserte stoff om blokk-møter, komiteer og hverdagsinformasjon. V-01 kan brukes til å beskrive barrakker, utendørs rom og landskap i fotografens valgte utsnitt. Q-01 viser at 10 875 av 11 070 rader har registrert avreisestat, med 5 965 til California og 4 910 til andre kjente stater. Samlet viser materialene både tvungne romlige og administrative rammer og enkelte lokale praksiser. De kan likevel ikke avgjøre hvem som skapte alle tiltak, hvordan alle opplevde dem, eller hvorfor hver person reiste til en bestemt stat. Ett anlegg, én avisutgave, ett fotografisk utsnitt og en sluttregistrering er ikke representative for alle tider og erfaringer.",
  },
];

const sourceWorkshop1_1: SourceWorkshop = {
  id: "1-1-manzanar-kildeverksted",
  chapterId: "1.1",
  sectionId: "kildeverksted",
  title: "Fire materialvinduer mot Manzanar",
  guidingQuestion: "Hvilke romlige og administrative rammer, og hvilke utvalgte lokale praksiser, kan de fire materialene dokumentere ved Manzanar i 1942–45 – og hva kan de ikke avgjøre?",
  learningGoals: [
    "Skille konkrete observasjoner fra tolkninger og for sterke konklusjoner.",
    "Forklare hvordan opphav, utvalg, bevaring, representativitet og fravær påvirker et historisk svar.",
    "Sammenstille minst tre ulike materialtyper uten å gjøre dem til en komplett fortelling.",
    "Skrive 250–400 ord og gjennomføre en reell faglig revisjon etter modellrespons.",
  ],
  context: {
    time: "21. mars 1942–21. november 1945; materialvinduene er fra 1942, leirperioden og avslutningen i 1945, mens M-01 ble undersøkt i 2010.",
    place: "Manzanar War Relocation Center, Owens Valley, California, USA.",
    findContext: "Materialene er skapt i ulike situasjoner: et arkeologisk undersøkt hageanlegg, en lokalt utgitt avis, et oppdragsfotografi og en administrativ sluttregistrering.",
    preservation: "NPS, Densho, Library of Congress og NARA-relatert transkripsjonsarbeid har bevart og formidlet ulike utsnitt. Ingen av materialene er en komplett tidsserie.",
    documentedBy: "NPS-arkeologi og samfunnsarbeid; Manzanar Free Press/Densho; Dorothea Lange/OWI/Library of Congress; WRA/NARA og NPS-transkripsjon formidlet av Densho.",
    limitations: [
      "Fire utvalgte vinduer kan ikke representere alle personer, boligblokker, år eller tvangsinterneringsleirer.",
      "M-01 ble undersøkt lenge etter leirperioden, W-01 er redigert, V-01 er et valgt utsnitt, og Q-01 er en avslutningsregistrering.",
      "Fravær av stemmer, motiv og private erfaringer skal beskrives som fravær – ikke fylles med gjetting.",
      "Institusjonelle betegnelser fra samtidige kilder må analyseres som språk; elevteksten bruker «tvangsinternering» og «fengsling».",
    ],
  },
  materials: [
    {
      id: "M-01",
      label: "M-01 · Dam/hage ved Block 15",
      materialType: "materielt/arkeologisk spor",
      date: "Leirperioden 1942–45; arkeologisk undersøkt i 2010",
      place: "Block 15, Barracks 5, apartment 2, Manzanar",
      findContext: "NPS beskriver et dam-/hageanlegg og husholdningsrelaterte gjenstander i øvre fyll. Omtalen av om lag 4 000 gjenstander gjelder de bredere hageundersøkelsene, ikke denne ene dammen.",
      preservation: "Fysiske spor er undersøkt gjennom senere arkeologi. Lag, fyll og tiltak etter leirperioden påvirker hva som er bevart.",
      documentedBy: "National Park Service, Manzanar National Historic Site, med arkeologisk feltarbeid og samfunnskunnskap som ulike dokumentasjonsbidrag.",
      documentedDescription: "Beskrivelsen registrerer en betongdam med øy-/skallopert kant i en boligblokk og husholdningsrelaterte gjenstander i den øvre fyllmassen.",
      possibleObservations: [
        "Anlegget ligger ved Block 15, Barracks 5, apartment 2.",
        "NPS registrerer betongform, dam-/hagepreg og husholdningsrelaterte gjenstander i øvre fyll.",
      ],
      supportedInterpretations: [
        "Noen beboere kan ha endret og brukt et avgrenset uteområde innenfor leirens romlige rammer.",
        "Anlegget kan undersøkes som spor etter en lokal materiell praksis.",
      ],
      alternativeInterpretations: [
        "Gjenstander i øvre fyll kan ha flere avsetningshistorier og trenger ikke alle å være del av den opprinnelige bruken.",
        "Et anlegg ved én leilighet kan ha vært individuelt, husholdsbasert eller del av bredere samarbeid; materialet avgjør ikke dette alene.",
      ],
      cannotProve: "Hvem som bygget anlegget, motiv, følelser, grad av frivillighet eller om praksisen var representativ for alle ved Manzanar.",
      sourceIds: ["M-01"],
      rights: {
        rightsHolder: "National Park Service; tredjepartsmateriale på siden kan ha egne rettighetshavere.",
        originalUrl: "https://www.nps.gov/articles/community-archeology-at-manzanar.htm",
        licenseStatus: "Lenket og parafrasert institusjonell dokumentasjon; ingen generell lisens for alt sidemateriale legges til grunn.",
        credit: "National Park Service, Manzanar National Historic Site.",
        adaptation: "Kort norsk parafrase; ingen bilder eller objektfiler kopiert.",
        checked: "27. august 2026",
      },
    },
    {
      id: "W-01",
      label: "W-01 · Manzanar Free Press, 24. oktober 1942",
      materialType: "skriftlig dokument",
      date: "24. oktober 1942, vol. II nr. 41",
      place: "Manzanar War Relocation Center",
      findContext: "En lokalt produsert avis knyttet til leiradministrasjonen og Manzanar Community Enterprises, med redaktør og redaksjon oppgitt i mastheaden.",
      preservation: "Densho formidler objektside og stabil HTML-transkripsjon. Verkstedet bruker korte parafraser, ikke en full gjengivelse.",
      documentedBy: "Manzanar Free Press; digitalt bevart og transkribert/formidlet av Densho.",
      documentedDescription: "Utgaven har masthead og stoff om blant annet selvstyre, blokk-møter, Fair Practice Committee, hagekonkurranse og praktiske meldinger.",
      possibleObservations: [
        "Avisutgaven navngir redaksjonelle og administrative roller i mastheaden.",
        "Utgaven publiserer informasjon om møter, komitéarbeid, en hagekonkurranse og praktiske ordninger.",
      ],
      supportedInterpretations: [
        "Institusjonell og beboerrettet organisering ble formulert i et lokalt skriftlig offentlig rom.",
        "Avisen kan brukes som spor etter hvordan informasjon og bestemte former for deltakelse ble presentert.",
      ],
      alternativeInterpretations: [
        "Redaksjonelt utvalg og institusjonell tilknytning kan ha gjort noen saker eller stemmer mer synlige enn andre.",
        "Publisert informasjon viser ikke automatisk hvordan tiltakene fungerte i praksis.",
      ],
      cannotProve: "At alle sluttet seg til forslagene, at ordningene virket likt for alle, eller at avisen gir et uhildet og komplett bilde.",
      sourceIds: ["W-01"],
      rights: {
        rightsHolder: "Manzanar Free Press; digital formidling og transkripsjonsgrensesnitt ved Densho.",
        originalUrl: "https://ddr.densho.org/ddr-densho-125-1/",
        licenseStatus: "Densho oppgir ingen kjente opphavsrettsbegrensninger for arbeidet; sidegrensesnitt/transkripsjon er merket CC BY-NC-SA 4.0.",
        credit: "Courtesy of Densho, ddr-densho-125-1.",
        adaptation: "Korte norske parafraser; ingen full avisutgave eller mediefil kopiert.",
        checked: "27. august 2026",
      },
      externalLink: {
        href: "https://ddr.densho.org/media/ddr-densho-125/ddr-densho-125-1-mezzanine-38466bc636.htm",
        label: "Åpne Denshos transkripsjon",
      },
    },
    {
      id: "V-01",
      label: "V-01 · Dorothea Langes oversiktsfotografi",
      materialType: "visuelt materiale",
      date: "April–juli 1942",
      place: "Manzanar, California",
      findContext: "Dorothea Lange fotograferte på oppdrag i en myndighetsbundet dokumentasjonssituasjon for Office of War Information. Katalogposten identifiserer ett bestemt utsnitt.",
      preservation: "Library of Congress beskriver negativ, filmkopi og digital gjengivelse. Verkstedet lenker til katalogvisningen og lagrer ikke bildet lokalt.",
      documentedBy: "Dorothea Lange; United States Office of War Information; Library of Congress, Prints and Photographs Division.",
      documentedDescription: "Katalogvisningen viser et utendørs oversiktsutsnitt med barrakker/boliger, åpne rom, avstander og landskap. Den viser ikke interiører eller hele leiren.",
      possibleObservations: [
        "Barrakker, utendørs rom, avstand og omkringliggende landskap er synlige i fotografens utsnitt.",
        "Bildet er ett valgt perspektiv, ikke en plan eller fullstendig oversikt.",
      ],
      supportedInterpretations: [
        "Fotografiet kan støtte en avgrenset vurdering av romlig organisering, avstand, kontroll og synlighet.",
        "Oppdrag og utsnitt kan undersøkes som del av hvordan leiren ble dokumentert.",
      ],
      alternativeInterpretations: [
        "Et åpent oversiktsutsnitt kan framheve orden og landskap, mens andre rom og erfaringer faller utenfor.",
        "Det som ikke er synlig, kan skyldes utsnitt, tidspunkt eller oppdrag – ikke nødvendigvis at det ikke fantes.",
      ],
      cannotProve: "Privat erfaring, innendørsforhold, hele leiren, alle perioder eller hvordan de avbildede oppfattet fotograferingen.",
      sourceIds: ["V-01"],
      rights: {
        rightsHolder: "Dorothea Lange/United States Office of War Information; Library of Congress som forvalter.",
        originalUrl: "https://www.loc.gov/item/2017699966/",
        licenseStatus: "Item-posten viser til rettighetsveiledning; FSA/OWI-samlingen beskrives av LOC som public domain. Ingen Creative Commons-lisens påstås.",
        credit: "Dorothea Lange, Japanese relocation, California…, 1942 Apr.–July; Library of Congress; LC-USZ62-113725; cph 3c13725; record 2017699966.",
        adaptation: "Kun ekstern kataloglenke og egen beskrivelse; ingen lokal bildekopi.",
        checked: "28. august 2026",
      },
      externalLink: {
        href: "https://www.loc.gov/item/2017699966/",
        label: "Åpne fotografiet hos Library of Congress",
      },
    },
    {
      id: "Q-01",
      label: "Q-01 · Aggregert avreisestatistikk",
      materialType: "kvantitativt materiale",
      date: "Final Accountability Roster, november 1945",
      place: "Manzanar; administrativ sluttregistrering",
      findContext: "WRA opprettet sluttregisteret. NPS-ansatte transkriberte Manzanar-materialet fra NARA-mikrofilm i 2002; Densho Names Registry formidler den separate CSV-en.",
      preservation: "Aggregatet er beregnet fra feltet f_destinationstate. Bare summer brukes her; ingen navn, ID-er, fødselsår, adresser eller rå rader publiseres.",
      documentedBy: "War Relocation Authority/National Archives; transkribert av National Park Service-ansatte; distribuert via Densho Names Registry.",
      documentedDescription: "Av 11 070 rader har 10 875 kjent destinasjonsstat: 5 965 har CA og 4 910 en annen kjent verdi. 195 felt er blanke. CA er 54,85 prosent av kjente destinasjonsstater.",
      possibleObservations: [
        "Tabellen teller 11 070 rader, hvor 10 875 har en registrert destinasjonsstat og 195 er blanke.",
        "Blant kjente destinasjonsstater er 5 965 CA og 4 910 andre verdier; CA-andelen er 54,85 prosent.",
      ],
      supportedInterpretations: [
        "Administrasjonen klassifiserte bevegelser ved leirens avslutning gjennom bestemte felt og kategorier.",
        "Aggregatet viser et avgrenset mønster i registrert destinasjonsstat ved avslutningen.",
      ],
      alternativeInterpretations: [
        "Blank verdi kan ha flere administrative forklaringer; fraværet viser ikke én bestemt årsak.",
        "Destinasjonsstat er ikke det samme som varig bosetting, ønsket mål eller individuell begrunnelse.",
      ],
      cannotProve: "Motiver, opplevelser, uregistrerte forhold, hele befolkningsforløpet eller årsaken til hver enkelt destinasjon.",
      sourceIds: ["Q-01"],
      rights: {
        rightsHolder: "War Relocation Authority/NARA; NPS-transkripsjon formidlet av Densho Names Registry.",
        originalUrl: "https://ddr.densho.org/names/",
        licenseStatus: "Densho Names Registry tilbyr den transkriberte FAR-datasamlingen under CC0; skannede Ancestry-filer er separate og brukes ikke.",
        credit: "Densho Names Registry; FAR Manzanar CSV, transkribert fra NARA-mikrofilm av NPS-ansatte i 2002.",
        adaptation: "Kun kontrollerte aggregater fra f_destinationstate; ingen personopplysninger eller rådata gjengis.",
        checked: "28. august 2026",
      },
    },
  ],
  claims: [
    { id: "P1", text: "M-01 dokumenterer et dam-/hageanlegg ved én bestemt leilighet og husholdningsrelaterte gjenstander i øvre fyll.", classification: "direct", explanation: "Dette er en avgrenset beskrivelse i NPS-dokumentasjonen. Den sier ikke hvem som bygget anlegget eller hvorfor.", sourceIds: ["M-01"] },
    { id: "P2", text: "Q-01 inneholder 11 070 rader, hvor 195 mangler registrert destinasjonsstat.", classification: "direct", explanation: "Dette følger av den kontrollerte aggregeringen av feltet f_destinationstate.", sourceIds: ["Q-01"] },
    { id: "P3", text: "W-01 kan tyde på at et lokalt offentlig rom for informasjon og organisering fantes innenfor leirens tvungne rammer.", classification: "possible", explanation: "Innholdet støtter en forsiktig tolkning av organisering, men publikasjon er ikke det samme som allmenn deltakelse eller virkning.", sourceIds: ["W-01"] },
    { id: "P4", text: "V-01 og Q-01 kan sammen bidra til en tolkning av romlig og administrativ kontroll, selv om de dokumenterer ulike skalaer.", classification: "possible", explanation: "Fotografiet og registeret belyser ulike rammer. Sammenstillingen er mulig, men materialene kan ikke alene måle kontrollens erfaring eller virkning.", sourceIds: ["V-01", "Q-01"] },
    { id: "P5", text: "M-01 og W-01 beviser at de internerte hadde frihet til å forme hverdagen slik de ønsket.", classification: "too-strong", explanation: "Lokale praksiser innenfor tvangsinterneringen må ikke omtolkes til frihet, frivillighet eller likt handlingsrom.", sourceIds: ["M-01", "W-01"] },
    { id: "P6", text: "V-01 viser hvordan alle boligområder og alle perioder ved Manzanar så ut.", classification: "too-strong", explanation: "Ett fotografi er et valgt utsnitt fra et begrenset tidspunkt.", sourceIds: ["V-01"] },
    { id: "P7", text: "M-01 avgjør hvilken navngitt person som bygget dammen og hvilke følelser arbeidet uttrykte.", classification: "cannot-determine", explanation: "Materialet identifiserer ikke sikkert opphavsperson, motiv eller følelser.", sourceIds: ["M-01"] },
    { id: "P8", text: "Q-01 avgjør hvorfor hver person reiste til den registrerte staten.", classification: "cannot-determine", explanation: "En registrert kategori er ikke dokumentasjon av individuell begrunnelse.", sourceIds: ["Q-01"] },
  ],
  synthesisPrompt: "Velg konkrete spor fra minst tre materialtyper. Forklar hva sporene styrker samlet, hvor de belyser ulike sider, og hvilket fravær eller representativitetsproblem som fortsatt begrenser svaret.",
  synthesisCriteria: [
    "Bruk material-ID og et konkret spor, ikke bare et generelt kildenavn.",
    "La hvert materiale beholde sin egen opphavssituasjon, skala og begrensning.",
    "Skill mellom det som er direkte registrert, en mulig tolkning og en påstand som går for langt.",
    "Behandle forskjeller og fravær som informasjon; et flertall av kilder avgjør ikke automatisk hva som er sant.",
  ],
  synthesisMinimumMaterials: 3,
  conclusionPrompt: "Skriv 250–400 ord som svarer på hovedspørsmålet. Bruk minst tre materialtyper, vis konkrete observasjoner og tolkninger, drøft representativitet og fravær, og si tydelig hva materialene ikke kan avgjøre.",
  conclusionWordRange: { min: 250, max: 400 },
  requiresRevision: true,
  modelResponse: {
    observations: "M-01 registrerer et avgrenset dam-/hageanlegg ved Block 15, Barracks 5, apartment 2 og husholdningsrelaterte gjenstander i øvre fyll. W-01 publiserer 24. oktober 1942 stoff om selvstyre, blokk-møter, komitéarbeid, hagekonkurranse og praktiske meldinger. V-01 viser barrakker, åpne uteområder, avstander og landskap i ett fotografisk utsnitt. Q-01 teller 11 070 rader: 10 875 med kjent destinasjonsstat, 5 965 CA, 4 910 andre kjente verdier og 195 blanke.",
    interpretation: "Materialene kan samlet støtte et avgrenset historisk svar: Manzanar hadde sterke romlige og administrative rammer, samtidig som noen lokale materielle og organisatoriske praksiser er dokumentert innenfor disse rammene. M-01 og W-01 åpner for å undersøke hvordan uteområder og et lokalt informasjonsrom ble brukt. V-01 og Q-01 synliggjør forskjellige sider av romlig orden og administrativ kategorisering. Dette er en sammenstilling av ulike kildeskalaer, ikke bevis for én sammenhengende erfaring.",
    reservation: "Representativiteten er begrenset. Ett anlegg, én avisutgave, ett valgt fotografisk utsnitt og en sluttregistrering dekker ikke alle blokker, personer eller år. Avisens publiserte innhold viser ikke alles enighet eller tiltakets virkning. Fotografiet utelater interiør og privatliv. I tallmaterialet er 195 destinasjonsfelt blanke, og kjente verdier sier ikke hvorfor personer reiste eller om destinasjonen ble varig.",
    limitation: "Materialene kan ikke avgjøre hvem som skapte alle lokale tiltak, hvor frivillige aktivitetene var, hva alle internerte tenkte og følte, eller hvordan erfaringene fordelte seg mellom grupper og over tid. De kan heller ikke brukes som et representativt bilde av alle amerikanske tvangsinterneringsleirer. Et forsvarlig svar må derfor beholde tvangsrammen, navngi de konkrete vinduene og bruke formuleringer som «kan støtte» der slutningen er tolkende.",
  },
  rubric: [
    "250–400 ord og et tydelig svar på det avgrensede undersøkelsesspørsmålet.",
    "Minst tre av materialtypene materiell/arkeologisk, skriftlig, visuell og kvantitativ.",
    "Minst ett konkret spor med material-ID fra hver materialtype som brukes.",
    "Tydelig skille mellom observasjon, tolkning og det som ikke kan bevises.",
    "Drøfting av både representativitet og fravær i materialene.",
    "Presise forbehold uten automatisk utviklingskjede eller generalisering til alle.",
    "En reell revisjon som forbedrer kildebruk, påstand eller forbehold etter modellresponsen.",
  ],
  sourceIds: ["M-01", "W-01", "V-01", "Q-01"],
  progressVersion: 1,
  lastChecked: "30. august 2026",
};

const teacherGuide1_1: TeacherGuide = {
  overview: "Kapitlet etablerer arbeidsmåten for resten av læreverket: spørsmål → observasjon → kontekst → påstandsvurdering → sammenstilling → konklusjon → revisjon. Manzanar er en avgrenset øvingsundersøkelse, ikke en full framstilling av tvangsinterneringen. Elevene skal holde tvangsrammen fast og samtidig undersøke hva fire svært ulike materialvinduer kan og ikke kan dokumentere.",
  teachingPhases: [
    {
      id: "forkunnskap-og-sporsmal",
      title: "1. Aktiver forkunnskap og avgrens spørsmålet",
      duration: "20–30 min",
      purpose: "Synliggjøre at historisk kunnskap bygges i møtet mellom spørsmål og materiale.",
      teacherActions: ["Vis et hverdagslig spor uten forklaring og samle forskjellen mellom observasjon og gjetning.", "Presenter Manzanar-spørsmålet, tidsrommet og hvorfor fire vinduer ikke er hele historien."],
      studentActions: ["Skrive to observasjoner og to spørsmål.", "Markere ord i hovedspørsmålet som avgrenser sted, tid og påstand."],
      sectionIds: ["forkunnskap", "mal", "tid-og-sted"],
    },
    {
      id: "metodebegreper",
      title: "2. Bygg metodebegrepene",
      duration: "35–45 min",
      purpose: "Gi elevene språk for kilde, levning/beretning, kontekst, representativitet og fravær.",
      teacherActions: ["Modeller hvordan samme avis kan brukes som levning og beretning avhengig av spørsmål.", "Lag en felles tavle med tre kolonner: funn, tolkning, kan ikke bevise."],
      studentActions: ["Forklare begrepene med egne eksempler.", "Gjøre F1–F3 individuelt før parsamtale."],
      sectionIds: ["fakta", "fagtekst", "oppgaver"],
    },
    {
      id: "materialmote",
      title: "3. Møt fire materialtyper",
      duration: "45–60 min",
      purpose: "Trene observasjon før kontekst og gjøre ulike dokumentasjonsveier synlige.",
      teacherActions: ["La elevene møte de korte materialbeskrivelsene før full kontekst.", "Påpek at V-01 er ekstern katalogvisning, og at Q-01 bare viser aggregater uten persondata."],
      studentActions: ["Notere konkrete spor med material-ID.", "Sammenligne hva som er synlig i fysisk, skriftlig, visuelt og kvantitativt materiale."],
      sectionIds: ["kildeblikk", "kildeverksted"],
    },
    {
      id: "kontekst-og-pastand",
      title: "4. Kontekstualiser og vurder påstander",
      duration: "45–60 min",
      purpose: "Skille direkte støtte, mulig tolkning, for sterk konklusjon og ikke mulig å avgjøre.",
      teacherActions: ["Modeller én påstand høyt med opphav, utsnitt og alternativ forklaring.", "Vent med forklaringer til elevene har brukt hintet og gjort nytt forsøk."],
      studentActions: ["Vurdere alle åtte påstandene.", "Begrunne én endret klassifisering med konkret kildebegrensning."],
      sectionIds: ["kildeverksted", "oppgaver"],
    },
    {
      id: "sammenstilling",
      title: "5. Sammenstill uten å stemme over sannheten",
      duration: "35–45 min",
      purpose: "Koble minst tre materialtyper og beholde forskjeller i skala, opphav og fravær.",
      teacherActions: ["Vis at materialer kan utfylle eller utfordre hverandre uten at flest kilder automatisk vinner.", "Stopp generaliseringer fra ett vindu til alle personer eller leirer."],
      studentActions: ["Velge spor fra minst tre materialer.", "Skrive en sammenstilling med både styrke og begrensning."],
      sectionIds: ["kildeverksted", "lange-linjer"],
    },
    {
      id: "konklusjon-og-revisjon",
      title: "6. Skriv og revider et historisk svar",
      duration: "60–75 min",
      purpose: "Skrive 250–400 ord og bruke modellrespons til en faktisk faglig forbedring.",
      teacherActions: ["Bruk rubrikken før førsteutkastet.", "Be elevene markere hva de endret i påstand, kildebruk eller forbehold etter modellresponsen."],
      studentActions: ["Skrive førsteutkast med minst tre materialtyper.", "Lagre en reell revisjon og forklare én faglig forbedring til en medelev."],
      sectionIds: ["kildeverksted", "oppsummering"],
    },
    {
      id: "henting-og-overforing",
      title: "7. Hent fram og overfør metoden",
      duration: "20–30 min nå, deretter korte økter",
      purpose: "Gjøre kildearbeidet gjenbrukbart i senere kapitler.",
      teacherActions: ["Planlegg henting etter 2–3 dager og 1–2 uker.", "Bruk L1–L3 til å koble materialenes begrensninger til kommunikasjon, demografi og makt."],
      studentActions: ["Gjøre repetisjonsoppgaver uten å lese først.", "Revidere en eldre setning som generaliserer eller mangler forbehold."],
      sectionIds: ["lange-linjer", "repetisjon", "oppsummering"],
    },
  ],
  priorKnowledgeActivation: {
    prompt: "Hva måtte være bevart fra dagen i går for at en ukjent person skulle kunne skrive en forsvarlig historie om klassen – og hva ville fortsatt mangle?",
    cues: ["Skill mellom spor og spørsmål.", "Nevn minst én stemme eller erfaring som lett blir borte.", "Spør hvem som skapte, valgte og bevarte materialet."],
    sectionIds: ["forkunnskap", "mal"],
  },
  textWork: {
    instructions: ["La elevene merke hvert avsnitt med O for observasjon, T for tolkning eller B for begrensning.", "Stopp ved levning/beretning og bytt undersøkelsesspørsmål til samme materiale.", "Bruk «kan», «mulig» og «bidro til» som presisjonsverktøy, ikke som pynt.", "La elevene finne én representativitetsfare og ett konkret fravær i hver materialpakke."],
    sectionIds: ["fakta", "forstaelse", "fagtekst", "kildeblikk"],
  },
  taskUse: {
    sequence: "F1–F5 før U1–U4; bruk L1–L3 etter sammenstillingen og K1–K4 før eller etter sluttproduktet.",
    firstAttempt: "Elevene svarer individuelt uten fasit. Første feil skal bare utløse hint.",
    retry: "Eleven prøver på nytt før forklaring eller modellrespons brukes til egenkontroll.",
    openResponses: "L3, K4 og verkstedets sluttprodukt beholdes lokalt. Vurder kilde-ID-er, skille mellom observasjon og tolkning, representativitet, fravær og presise forbehold – ikke om teksten kopierer modellen.",
    sectionIds: ["oppgaver", "kildeverksted", "lange-linjer"],
  },
  selfAssessmentAndReview: {
    selfAssessment: ["Kan eleven forklare hvorfor et materiale ikke er en kilde uten et spørsmål?", "Kan eleven navngi opphavssituasjon og formidlingsvei for minst tre materialer?", "Kan eleven peke på en faktisk revisjon som gjorde påstanden mer presis?"],
    repetition: ["Hent F1–F5 etter 2–3 dager.", "Gjør U2 og K3 etter 1–2 uker uten å åpne fagteksten først.", "Bruk K4 som senere overgangsoppgave og sammenlign med verkstedets lagrede revisjon."],
    sectionIds: ["oppsummering", "repetisjon"],
  },
  misconceptions: [
    { belief: "Gamle materialer er kilder i seg selv og forteller sannheten direkte.", whyUnderstandable: "Dagligtale bruker «kilde» som navn på en ting eller tekst.", diagnosticQuestion: "Hvilket svar gir W-01 hvis vi ikke har formulert et spørsmål?", response: "Vis at spørsmål velger hvilke sider av materialet som blir relevante, og at svar krever tolkning." },
    { belief: "Levning betyr gjenstand, og beretning betyr tekst.", whyUnderstandable: "Eksempler presenteres ofte som faste typer.", diagnosticQuestion: "Kan W-01 være spor etter en redaksjon og samtidig fortelle om et møte?", response: "Bruk levning og beretning som funksjoner i forhold til et spørsmål." },
    { belief: "Et fotografi viser det som virkelig var, uten utvalg.", whyUnderstandable: "Fotografiet ligner en direkte avbildning.", diagnosticQuestion: "Hva finnes utenfor V-01s bildekant, før og etter eksponeringen?", response: "Analyser oppdrag, utsnitt, tidspunkt, synlighet og fravær." },
    { belief: "Store tall er automatisk representative og objektive.", whyUnderstandable: "Tall virker presise og dekker mange rader.", diagnosticQuestion: "Hva forteller feltet f_destinationstate ikke om én persons reise?", response: "Skill registrert kategori fra motiv, erfaring og utvikling over tid; påpek 195 blanke felt." },
    { belief: "Fravær i en kilde beviser at noe ikke skjedde.", whyUnderstandable: "Det er lett å forveksle «ikke synlig» med «fantes ikke».", diagnosticQuestion: "Beviser manglende interiør i V-01 at privatliv ikke fantes?", response: "Undersøk hvorfor noe kan mangle, og formuler fravær som begrensning." },
    { belief: "Tre kilder som peker samme vei gjør konklusjonen sikker.", whyUnderstandable: "Flertall er en kjent beslutningsregel.", diagnosticQuestion: "Kan tre kilder bygge på samme institusjonelle utvalg?", response: "Vurder uavhengighet, opphav, skala og hva hvert materiale faktisk belyser." },
    { belief: "Lokale hager og komiteer betyr at interneringen var frivillig eller fri.", whyUnderstandable: "Handling og organisering kan forveksles med fravær av tvang.", diagnosticQuestion: "Kan handlingsrom finnes innenfor en tvungen ramme?", response: "Hold tvangsinterneringen som ramme og analyser lokale praksiser uten å omtolke rammen." },
    { belief: "En revisjon er å rette språkfeil eller gjøre teksten lengre.", whyUnderstandable: "Revisjon brukes ofte om språkvask.", diagnosticQuestion: "Hvilken påstand, kildekobling eller begrensning ble faglig endret?", response: "Krev en synlig endring i argument, belegg eller forbehold." },
  ],
  assessmentCriteria: [
    { area: "Faktakunnskap", shortAnswer: "Identifiserer riktig sted, periode og minst tre materialer.", extendedAnswer: "Bruker presise detaljer fra M-01, W-01, V-01 og/eller Q-01 uten å flytte tall eller trekk mellom materialene." },
    { area: "Historiske begreper", shortAnswer: "Bruker kilde, kontekst, levning/beretning og representativitet forståelig.", extendedAnswer: "Bruker begrepene analytisk og viser at levning/beretning avhenger av spørsmål og at fravær ikke er motbevis." },
    { area: "Årsaker og virkninger", shortAnswer: "Unngår å gjøre materialene til en automatisk årsakskjede.", extendedAnswer: "Skiller rammer, praksiser og mulige virkninger, og bruker «kan» eller «bidro til» der materialet ikke bærer en sikker kjede." },
    { area: "Kildebruk", shortAnswer: "Knytter påstander til material-ID og konkret spor.", extendedAnswer: "Drøfter opphav, utvalg, formidlingsvei, korroborering, representativitet og fravær for minst tre materialtyper." },
    { area: "Konkrete eksempler", shortAnswer: "Nevner ett presist eksempel fra minst tre typer.", extendedAnswer: "Integrerer flere detaljer, for eksempel Block 15-funnet, avisstoffet, fotografiets utsnitt og Q-01s aggregater, uten å gjøre dem representative for alle." },
    { area: "Nyansering og historisk usikkerhet", shortAnswer: "Har minst ett presist forbehold og ett «kan ikke bevise».", extendedAnswer: "Viser hvilke alternative tolkninger som finnes, hva som mangler, og hvordan en reell revisjon styrket svaret." },
  ],
  sourceWorkshop: {
    workshopId: "1-1-manzanar-kildeverksted",
    purpose: "Trene hele kjeden fra observasjon til revidert historisk svar med fire ulike materialvinduer.",
    recommendedPlacement: "Etter metodefagteksten og F/U-oppgavene; fordel gjerne de seks trinnene over to økter.",
    distinctions: ["Observasjon beskriver et registrert trekk; tolkning forklarer mulig betydning.", "Opphavssituasjon er ikke det samme som senere bevaring og digital formidling.", "Representativitet gjelder hvor bredt et utsnitt kan brukes; fravær gjelder det som ikke er registrert eller synlig.", "Lokalt handlingsrom innenfor tvang er ikke det samme som frihet fra tvang."],
    commonMisreadings: ["4 000 gjenstander gjelder den bredere NPS-undersøkelsen, ikke én dam.", "W-01 viser publisert informasjon, ikke enighet eller effekt.", "V-01 er ett oppdragsbundet utsnitt, ikke hele leiren.", "Q-01 er en sluttregistrering; CA-andelen gjelder bare kjente destinasjonsstater."],
    discussionQuestions: ["Hva blir synlig når fire materialtyper settes sammen?", "Hvor overlapper materialene, og hvor belyser de helt ulike spørsmål?", "Hvilket fravær er viktigst for konklusjonen?", "Hvordan kan vi beskrive lokale praksiser uten å svekke forståelsen av tvangsrammen?"],
    assessmentCriteria: ["Minst tre materialtyper og konkrete ID-er.", "250–400 ord.", "Observasjon og tolkning er synlig skilt.", "Representativitet og fravær er begge behandlet.", "Konklusjonen sier hva materialene ikke kan avgjøre.", "Revisjonen endrer faglig innhold, ikke bare språk."],
    sourceIds: ["M-01", "W-01", "V-01", "Q-01"],
  },
  adaptation: {
    supports: ["Gi en skriveramme med fire setningsstarter: «M-01 viser …», «Dette kan bety …», «Sammen med …», «Materialene kan ikke …».", "La elever bruke tre materialer i stedet for fire, men behold kravet om tre ulike typer.", "Les opp materialbeskrivelsene og bruk material-ID som tydelige overskrifter.", "Del 250–400-ordsteksten i observasjon, sammenstilling og forbehold før eleven binder den sammen."],
    extensions: ["La eleven undersøke hvordan levning/beretning-funksjonen endres når spørsmålet til W-01 byttes.", "Be eleven formulere to konkurrerende tolkninger av samme fravær.", "La eleven kritisere modellresponsens representativitet og foreslå hvilken ny kildetype som trengs.", "Sammenlign institusjonelle samtidstermer med faglig begrunnet språk om tvangsinternering."],
  },
  resources: [
    { label: "Elevens kildeverksted", description: "Seks trinn med lokal lagring, ordkrav og revisjon.", visibility: "public", sectionId: "kildeverksted" },
    { label: "Oppgaveprogresjon", description: "Fakta → forståelse → lange linjer → kildeblikk.", visibility: "public", sectionId: "oppgaver" },
    { label: "Repetisjonsløp", description: "Kapittelspesifikke henteoppgaver og senere blandet repetisjon.", visibility: "public", sectionId: "repetisjon" },
    { label: "Lokal observasjonsmal", description: "Valgfri tavle- eller papirressurs med kolonnene observasjon, tolkning og begrensning. Ikke publisert og ingen elevdata samles inn.", visibility: "local" },
  ],
};

const tasks2_2: LearningTask[] = [
  {
    id: "F1",
    phase: "Fakta",
    kind: "choice",
    title: "Domestisering",
    prompt: "Hvilken forklaring på domestisering er mest presis?",
    points: 1,
    options: [
      "At mennesker kunne temme ville dyr og planter på bare noen få år i bosetningen.",
      "En gradvis prosess der menneskelig utvalg endrer både planter og dyr over tid.",
      "At planter og dyr kunne endre seg av seg selv i et varmere og tørrere klima.",
      "At mennesker kunne holde ville dyr uten at artene endret seg gjennom flere år.",
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
      "Jordbruk oppstod i én region og kunne senere spre seg til andre områder.",
      "Jordbruk utviklet seg i flere regioner, til ulike tider og med ulike arter.",
      "Jordbruk begynte omtrent samtidig i flere områder etter den siste istiden i verden.",
      "Jordbruk kunne først begynne etter at de første statene var dannet.",
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
    choices: ["ris, hirse og gris", "potet, quinoa og lama", "hvete, bygg, sau og geit", "mais, squash og bønner"],
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
      "Velge egenskaper over mange generasjoner",
      "Høste ville planter",
      "Domestiserte planter blir vanligere",
      "Så nyttige frø nær bosetningen",
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
      "Fordi endringene i steinalderen kunne skje raskt i mange samfunn og regioner over lang tid.",
      "Fordi jordbruk kunne gi bedre helse for de fleste som tok det i bruk i starten av perioden.",
      "Fordi følgene for samfunn og natur ble grunnleggende, selv om prosessen var langsom.",
      "Fordi én jordbruksregion kunne sette i gang den samme utviklingen overalt i verden.",
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
      "At innbyggerne kunne leve mest av jakt uten å dyrke planter i området.",
      "At stedet var en langvarig, tett og organisert bosetning med lagring.",
      "At alle innbyggerne kunne ha samme roller og tilgang til ressurser.",
      "At en konge kunne styre stedet fra et stort administrativt palass med lagre.",
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
      "En klimaendring kan alene forklare overgangen i mange ulike regioner.",
      "Befolkningsvekst kunne gjøre at alle grupper måtte bli bønder for å overleve.",
      "Flere forhold virket sammen, og kombinasjonen var ulik fra region til region.",
      "Jordbruk kunne gi større utbytte enn jakt og sanking i alle miljøer.",
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
      "De fleste kunne bruke mer tid på matproduksjon og få færre andre oppgaver i hver husholdning over tid.",
      "Overskudd kunne forsørge mennesker som arbeidet med håndverk, handel, ritualer eller ledelse.",
      "Overskudd kunne fjerne forskjeller mellom samfunn og gjøre arbeidsdelingen lik overalt.",
      "Lagring kunne ha liten betydning for hvordan mennesker fordelte det daglige arbeidet.",
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
      "Mange kunne få et mer variert kosthold og mindre fysisk arbeid hver dag i bosetningen enn tidligere.",
      "Flere kalorier per areal og trolig kortere mellomrom mellom fødsler kunne øke befolkningen.",
      "Smittepresset kunne bli mindre fordi flere mennesker bodde tett sammen over lang tid.",
      "Befolkningen kunne vokse fordi alle familier sluttet å flytte mellom steder i regionen.",
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
      "Fordi jakt og sanking kunne bli mindre viktig i mange ulike områder over tid.",
      "Fordi tett bosetning, avfall, lagre og nær kontakt med husdyr kunne gi flere smitteveier.",
      "Fordi sykdommer kunne oppstå først da mennesker begynte å bruke metallredskaper over tid.",
      "Fordi lagring av mat kunne hindre mennesker i å flytte etter ressursene mellom årstidene.",
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
      "Lagring",
      "Mer varige forskjeller i rikdom og makt",
      "Mer mat per areal",
      "Arbeidsdeling og spesialisering",
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
      "Jordbruk kunne endre eldre levemåter raskt i alle samfunn som tok det i bruk.",
      "Jakt og sanking kunne få mindre betydning etter at noen samfunn begynte å dyrke.",
      "Mange samfunn kunne kombinere dyrking og husdyrhold med jakt, fiske og sanking.",
      "Bofasthet kunne først bli mulig etter at mennesker hadde begynt med jordbruk.",
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
      "Jordbruk kunne øke produksjonen, men skade naturen på samme måte overalt i lange perioder i alle samfunn.",
      "Jordbruk kunne løse matmangel og miljøproblemer når produksjonen ble større i flere regioner over tid.",
      "Jordbruk kunne øke produksjonen, men også gi erosjon, utarming, saltproblemer og tap av mangfold.",
      "Bærekraft kunne først bli relevant da moderne industri og byer vokste fram i mange samfunn.",
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
      "At innbyggerne kunne dele samme tro og ha like ritualer.",
      "At stedet hadde langvarig bosetning og organisert ressursbruk.",
      "At en bestemt konge kunne styre stedet og fordele alle ressursene.",
      "At jakt og sanking ikke kunne inngå i matforsyningen på stedet.",
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
      "At det kunne ha bodd mennesker på stedet over lang tid.",
      "At det kunne ha fantes hus, redskaper eller matrester i området.",
      "Nøyaktig hva alle innbyggerne tenkte, eller hvem som bestemte.",
      "At mennesker kunne ha brukt ressurser på bestemte måter.",
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
      "At monumenter kunne kreve en stor og sentral statlig administrasjon i regionen.",
      "At samarbeid kunne organiseres før jordbruket var fullt utviklet på stedet.",
      "At jordbruk ikke kunne ha hatt betydning for noen av samfunnene i regionen.",
      "At arkeologiske funn kunne gi et fullstendig bilde av fortiden på stedet.",
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

const teacherGuide2_2: TeacherGuide = {
  overview:
    "Kapitlet følger progresjonen forkunnskaper → fakta → forståelse → kildearbeid → lange linjer → egenvurdering → repetisjon. Elevene undersøker en gradvis og regional overgang, og må hele tiden skille mellom det sporene viser, en mulig tolkning og det materialet ikke kan bevise.",
  teachingPhases: [
    {
      id: "forkunnskaper",
      title: "Hent fram forkunnskaper",
      duration: "0–10 min",
      purpose: "Synliggjør elevenes første forestillinger og spørsmål før faglige presiseringer.",
      teacherActions: ["Skriv «jordbruksrevolusjonen» på tavla.", "Be elevene notere tre assosiasjoner og ett spørsmål uten å korrigere alt ennå."],
      studentActions: ["Noter egne assosiasjoner.", "Formuler ett spørsmål som kan undersøkes i kapitlet."],
      sectionIds: ["forkunnskap"],
    },
    {
      id: "kartet",
      title: "Bygg tid- og stedskartet",
      duration: "10–25 min",
      purpose: "Gi elevene et rammeverk for regionale forskjeller, arter og periodisering.",
      teacherActions: ["Bruk tidslinjen og kartdelen som felles orientering.", "Be elevene markere minst tre regioner og forklare hvorfor én startdato ikke passer overalt."],
      studentActions: ["Finn tidspunkter og regioner i elevkapitlet.", "Bruk begrepet domestisering i en egen setning."],
      sectionIds: ["tid-og-sted", "tidslinje", "mal"],
    },
    {
      id: "fakta",
      title: "Sikre faktapunktene",
      duration: "25–45 min",
      purpose: "Etabler presise faktapunkter før elevene lager forklaringer og lange linjer.",
      teacherActions: ["La elevene arbeide med faktaoppgavene.", "Stopp ved region- og artskoblingene og la elevene begrunne valgene muntlig."],
      studentActions: ["Løs faktaoppgavene uten å lete etter et ferdig svar.", "Marker hvilke faktapunkter du fortsatt må undersøke i fagteksten."],
      sectionIds: ["fakta", "oppgaver"],
    },
    {
      id: "forstaelse",
      title: "Les og forklar",
      duration: "45–80 min",
      purpose: "Koble mulige forutsetninger til mulige følger uten å gjøre utviklingen automatisk.",
      teacherActions: ["La elevene lese utvalgte deler av fagteksten.", "Be dem lage to kolonner for mulige forutsetninger og mulige følger.", "Stopp ved befolkningsparadokset og spør hva som er forskjellen på befolkningsvekst og individuell helse."],
      studentActions: ["Finn formuleringer som viser forbehold.", "Forklar minst én årsak–virkning-kobling med «kan» eller «bidro til»."],
      sectionIds: ["fagtekst", "forstaelse"],
    },
    {
      id: "kildearbeid",
      title: "Arbeid med spor",
      duration: "80–100 min",
      purpose: "Øv på å skille funn, slutning og kildebegrensning.",
      teacherActions: ["La elevene arbeide parvis med Çatalhöyük og Göbekli Tepe.", "Be hvert par formulere én påstand med konkret belegg og én begrensning."],
      studentActions: ["Pek på konkrete materielle spor.", "Skill mellom hva sporet støtter og hva det ikke kan avgjøre alene."],
      sectionIds: ["kildeblikk"],
    },
    {
      id: "lange-linjer",
      title: "Koble til større utviklinger",
      duration: "100–120 min",
      purpose: "La elevene bruke faktapunkter og kildearbeid til å vurdere brudd, kontinuitet og bærekraft.",
      teacherActions: ["La elevene velge en lang linje og bruke minst tre historiske punkter.", "Avslutt med en exit-lapp med tre punkter, én lang linje og én reservasjon."],
      studentActions: ["Skriv en sammenhengende forklaring.", "Vis både mulige gevinster og kostnader, og hvem eller hva som kunne bli ulikt berørt."],
      sectionIds: ["lange-linjer", "oppgaver"],
    },
    {
      id: "repetisjon",
      title: "Egenvurder og repeter",
      duration: "Etter økten",
      purpose: "Flytt elevene fra gjenlesing til gjenhenting og revisjon over tid.",
      teacherActions: ["Bruk egenvurderingen som en kort metakognitiv stopp.", "Avtal en ny økt der fakta- og kildeoppgaver hentes fram uten at fagteksten åpnes først."],
      studentActions: ["Marker hvilke læringsmål du kan forklare med egne ord.", "Gå tilbake til oppgavene etter noen dager og sammenlign begrunnelse og forbehold."],
      sectionIds: ["oppsummering", "repetisjon"],
    },
  ],
  priorKnowledgeActivation: {
    prompt: "Be elevene skrive tre ting de forbinder med jordbruksrevolusjonen og ett spørsmål de vil ha svar på.",
    cues: [
      "Hva tror du ordet «revolusjon» betyr i denne sammenhengen?",
      "Måtte mennesker bli bønder før de kunne bo fast eller samarbeide om store prosjekter?",
      "Hva kan ha blitt bedre, og hva kan ha blitt vanskeligere?",
    ],
    sectionIds: ["forkunnskap"],
  },
  textWork: {
    instructions: [
      "La elevene bruke tidslinjen og begrepslisten som støtte før de leser hele fagteksten.",
      "Be dem markere mulige forutsetninger med én farge og mulige følger med en annen.",
      "Be elevene samle setninger som viser forbehold eller regional forskjell.",
      "La dem forklare ett avsnitt med egne ord før de går videre til lange linjer.",
    ],
    sectionIds: ["fagtekst", "tid-og-sted", "forstaelse"],
  },
  taskUse: {
    sequence: "Arbeid i rekkefølgen fakta → forståelse → lange linjer → kildeblikk.",
    firstAttempt: "La elevene gjøre et eget første forsøk. Ved første feil skal de bruke det avgrensede hintet som støtte.",
    retry: "Be elevene prøve på nytt før de leser forklaringen. Samtal om hva som endret seg i begrunnelsen, ikke bare om svaret ble riktig.",
    openResponses: "For åpne svar skal eleven skrive et eget, meningsbærende svar før modellresponsen vises. Bruk modellen til å finne konkrete eksempler, koblinger og forbehold som kan forbedres.",
    sectionIds: ["oppgaver", "fakta", "forstaelse", "lange-linjer", "kildeblikk"],
  },
  selfAssessmentAndReview: {
    selfAssessment: [
      "Bruk læringsmålene som en sjekkliste: Kan eleven forklare med egne ord, eller kjenner eleven bare igjen formuleringen?",
      "Be eleven velge ett mål som er sikkert, ett som er på vei og ett som trenger et nytt forsøk.",
      "La eleven hente fram ett konkret funn og forklare hva det kan og ikke kan vise.",
    ],
    repetition: [
      "Nå: Lukk fagteksten og gjenfortell oppsummeringen med egne ord.",
      "Om 2–3 dager: Hent fram faktaoppgavene uten å lese først, og bruk bare hint hvis du står fast.",
      "Om 1–2 uker: Svar på en langlinje- og kildeoppgave på nytt og sammenlign eksempler og forbehold.",
    ],
    sectionIds: ["oppsummering", "repetisjon", "oppgaver"],
  },
  misconceptions: [
    {
      belief: "«Jordbruk ble oppfunnet én gang.»",
      whyUnderstandable: "En vanlig fortelling starter i én kjent region og hopper raskt til spredning.",
      diagnosticQuestion: "Hvilke regioner og arter finner du i kapitlet, og har de samme tidspunkt?",
      response: "Bruk flere regioner i samme forklaring. Skill mellom lokal utvikling, spredning av mennesker og opptak av kunnskap.",
    },
    {
      belief: "«Revolusjon betyr at alt skjedde raskt.»",
      whyUnderstandable: "I dagligtale betyr revolusjon ofte en plutselig hendelse.",
      diagnosticQuestion: "Hva er forskjellen på tempoet i prosessen og hvor store følgene ble?",
      response: "Presiser at ordet her viser til grunnleggende følger, mens overgangen kunne ta mange generasjoner og ha mellomformer.",
    },
    {
      belief: "«Folk ble bofaste først etter jordbruket.»",
      whyUnderstandable: "Kart og lærebøker kobler ofte landsbyer direkte til dyrking.",
      diagnosticQuestion: "Hvilke ressurser kan gjøre et jeger- og sankersamfunn fast eller sesongfast?",
      response: "Vis at bofasthet kunne finnes før fullt utviklet jordbruk, og at matstrategier kan kombineres.",
    },
    {
      belief: "«Jakt og sanking sluttet med en gang.»",
      whyUnderstandable: "En trinnvis fortelling gjør jeger og bonde til to adskilte kategorier.",
      diagnosticQuestion: "Finn spor eller formuleringer som viser blandede matstrategier.",
      response: "La elevene bruke brudd og kontinuitet i samme setning: dyrking fikk større betydning, men jakt, fiske og sanking kunne fortsette.",
    },
    {
      belief: "«Bønder fikk automatisk bedre liv.»",
      whyUnderstandable: "Mer mat per areal kan høres ut som bedre helse for hver person.",
      diagnosticQuestion: "Hvordan kan en befolkning vokse samtidig som kosthold, arbeid eller smitte blir mer belastende?",
      response: "Skill mellom hvor mange et område kan brødfø og livsvilkårene til enkeltmennesker. Vei gevinster og kostnader mot hverandre.",
    },
    {
      belief: "«Overskudd skapte automatisk stater.»",
      whyUnderstandable: "Mange oversikter tegner en rett kjede fra mat til by og stat.",
      diagnosticQuestion: "Hvilket mellomledd må forklares før overskudd kan knyttes til spesialisering eller makt?",
      response: "Bruk forbehold: lagring kunne forsørge andre oppgaver og kontroll kunne bidra til ulikhet, men utviklingen var ikke uunngåelig.",
    },
    {
      belief: "«Arkeologiske funn viser nøyaktig hva folk tenkte.»",
      whyUnderstandable: "Materielle spor er konkrete, mens tolkningen av menneskers tanker er vanskeligere å se.",
      diagnosticQuestion: "Hva er et konkret funn, hva er en rimelig slutning, og hva kan materialet ikke avgjøre alene?",
      response: "Krev at elevene bruker tre ledd: belegg, avgrenset tolkning og kildebegrensning.",
    },
  ],
  assessmentCriteria: [
    {
      area: "Faktakunnskap",
      shortAnswer: "Gjengir relevante faktapunkter presist og svarer direkte på spørsmålet.",
      extendedAnswer: "Velger flere faktapunkter som faktisk belyser problemstillingen, uten å blande regionale tidspunkt eller gjøre en mulighet til en sikker regel.",
    },
    {
      area: "Historiske begreper",
      shortAnswer: "Bruker begreper som domestisering, bofasthet, brudd og kontinuitet med riktig betydning.",
      extendedAnswer: "Definerer eller presiserer begrepene når det trengs, og bruker dem til å strukturere en historisk forklaring.",
    },
    {
      area: "Årsaker og virkninger",
      shortAnswer: "Knytter en mulig forutsetning til en mulig følge med en forklart kobling.",
      extendedAnswer: "Forklarer flere ledd i en årsakskjede og viser at årsaker og virkninger kunne virke sammen ulikt i ulike regioner.",
    },
    {
      area: "Kildebruk",
      shortAnswer: "Bruker minst ett konkret spor og skiller det fra en tolkning.",
      extendedAnswer: "Sammenstiller spor fra mer enn ett sted og forklarer tydelig hva materialet ikke kan bevise alene.",
    },
    {
      area: "Konkrete eksempler",
      shortAnswer: "Bruker et navngitt sted, en region, en art eller et tidsrom som støtter poenget.",
      extendedAnswer: "Integrerer flere konkrete eksempler i resonnementet og forklarer hvorfor hvert eksempel er relevant.",
    },
    {
      area: "Nyansering og historisk usikkerhet",
      shortAnswer: "Bruker forbehold som «kan», «mulig» eller «bidro til» der materialet ikke gir en sikker kjede.",
      extendedAnswer: "Veier ulike perspektiver mot hverandre, viser regional eller sosial variasjon og markerer hvor tolkningen er usikker.",
    },
  ],
  sourceWorkshop: {
    workshopId: "2-2-jordbruk-kildeverksted",
    purpose: "Et strukturert kildearbeid der eleven går fra beskrivelse av materielle spor til en avgrenset og begrunnet slutning.",
    recommendedPlacement: "Etter fagteksten og det korte kildeblikket, før lange linjer og de interaktive oppgavene.",
    distinctions: [
      "observasjon: det som kan beskrives konkret i materialet",
      "tolkning: en mulig forklaring som må støttes av flere spor",
      "kildebegrensning: det materialet ikke kan avgjøre alene",
    ],
    commonMisreadings: [
      "å lese en tolkning som om den var et direkte funn",
      "å gjøre fravær av ett funn til sikkert bevis på fravær",
      "å anta at monumenter eller lagring automatisk viser én bestemt maktform",
    ],
    discussionQuestions: [
      "Hvilke ord i elevens svar beskriver et spor, og hvilke ord forklarer sporet?",
      "Hva ville vi trengt å finne for å kunne si mer om makt eller sosial likhet?",
      "Kan den samme observasjonen passe med mer enn én forklaring?",
    ],
    assessmentCriteria: [
      "minst to konkrete observasjoner før tolkningen",
      "en tolkning som viser hvordan sporene brukes som begrunnelse",
      "et forbehold eller en alternativ forklaring",
      "en eksplisitt setning om hva materialet ikke kan bevise",
    ],
    sourceIds: ["catalhoyuk", "catalhoyuk-guide", "gobekli-unesco", "dai-gobekli", "gobekli-grain"],
  },
  resources: [
    { label: "Start i elevkapitlet", description: "Åpne hovedspørsmål og læringsmål før undervisningen begynner.", visibility: "public", sectionId: "mal" },
    { label: "Bruk tidslinjen", description: "Orienter klassen i tid, sted og regionale forskjeller.", visibility: "public", sectionId: "tid-og-sted" },
    { label: "Arbeid med kildeblikk", description: "La elevene skille funn, tolkning og begrensning.", visibility: "public", sectionId: "kildeblikk" },
    { label: "Åpne oppgavene", description: "Bruk oppgavene til gjenhenting, respons og nytt forsøk.", visibility: "public", sectionId: "oppgaver" },
    { label: "Planlegg repetisjon", description: "Finn forslag til egenvurdering og repetisjon over tid.", visibility: "public", sectionId: "repetisjon" },
    { label: "Lokalt undervisningsmateriale", description: "Et mer detaljert internt arbeidsmateriale finnes i prosjektmappen. Det er ikke offentlig publisert, og siden viser ingen nedlastingslenke.", visibility: "local" },
    { label: "Lokalt arbeidsark", description: "Et lokalt arbeidsark finnes som redaksjonelt arbeidsmateriale. Det er ikke offentlig publisert, og innholdet legges ikke i nettleseren.", visibility: "local" },
  ],
};


const tasks2_3: LearningTask[] = [
  {
    id: "F1",
    phase: "Fakta",
    kind: "choice",
    title: "Hva mener vi med by?",
    prompt: "Hvilken arbeidsdefinisjon passer best med kapitlets bruk av ordet by?",
    points: 1,
    options: [
      "En bosetning med konge, palass og hær; andre ordninger kunne finnes, men dette er minimumskravet i den strenge modellen.",
      "En bosetning med skrift og bofasthet, selv om enkelte byer kunne bruke andre uttrykk og ordninger.",
      "Et sted med minst en fast innbyggertallgrense, selv om grensen kunne variere mellom regioner og landskap.",
      "En bosetning der mennesker, aktiviteter og/eller institusjoner er konsentrert og virker inn på et større omland.",
    ],
    correct: 3,
    hint: "Se etter en definisjon som åpner for flere politiske ordninger og regionale forskjeller.",
    explanation: "By er et analytisk arbeidsbegrep. Kildene kan vise konsentrasjon av mennesker, aktiviteter eller institusjoner uten å avgjøre én styreform.",
  },
  {
    id: "F2",
    phase: "Fakta",
    kind: "match",
    title: "Tre case, tre steder",
    prompt: "Koble caseområdet til riktig region.",
    points: 3,
    items: ["Mesopotamia", "Mohenjo-daro", "Caral-Supe"],
    choices: ["Indusdalen", "Supe-dalen på Perus nord-sentrale kyst", "Tigris–Eufrat-området"],
    answerMap: {
      Mesopotamia: "Tigris–Eufrat-området",
      "Mohenjo-daro": "Indusdalen",
      "Caral-Supe": "Supe-dalen på Perus nord-sentrale kyst",
    },
    hint: "Finn elvene og landskapet først; navnet på området er ikke nok.",
    explanation: "Caseområdene ligger i tre ulike regioner. Geografien er en del av forklaringen fordi mat, vann, råvarer og forbindelser varierer.",
  },
  {
    id: "F3",
    phase: "Fakta",
    kind: "order",
    title: "Perioder uten én global startdato",
    prompt: "Sorter punktene fra eldst til yngst. Bruk de regionale intervallene, ikke en påstått global startdato.",
    points: 3,
    items: [
      "Uruk-periodens urbane vekst ca. 3500–3100 f.Kr.",
      "Mohenjo-daro i moden Indus-periode ca. 2600–1900 f.Kr.",
      "Tidlig urbanisering i nordlige Mesopotamia i fjerde årtusen f.Kr.",
      "Caral-Supe ca. 3000–1800 f.Kr.",
    ],
    expected: [
      "Tidlig urbanisering i nordlige Mesopotamia i fjerde årtusen f.Kr.",
      "Uruk-periodens urbane vekst ca. 3500–3100 f.Kr.",
      "Caral-Supe ca. 3000–1800 f.Kr.",
      "Mohenjo-daro i moden Indus-periode ca. 2600–1900 f.Kr.",
    ],
    hint: "Sorter etter tidligste del av det foreslåtte intervallet, og husk at intervaller kan overlappe.",
    explanation: "Tidslinjen viser at urbanisering foregikk i ulike regioner med overlappende forløp. En dato for ett sted er ikke startdato for alle.",
  },
  {
    id: "F4",
    phase: "Fakta",
    kind: "choice",
    title: "Hvilke spor er dokumentert?",
    prompt: "Hvilket utsagn er best støttet som en beskrivelse av Caral-Supe?",
    points: 1,
    options: [
      "Et palass kan vise at én konge fordelte arbeidet, selv om andre ordninger også er mulige her.",
      "En skriftlig lovsamling kan forklare styringen, selv om slike tekster ikke er dokumentert for hele perioden.",
      "Monumentale plattformhauger og nedsenkede sirkulære plasser inngår i et større bosetningslandskap.",
      "Innbyggerne kan ha levd bare av korn fra irrigasjon, selv om marine ressurser også var viktige.",
    ],
    correct: 2,
    hint: "Velg den formuleringen som beskriver synlige eller dokumenterte trekk uten å legge til en bestemt hersker.",
    explanation: "Kildene dokumenterer monumental arkitektur og et større bosetningslandskap. De avgjør ikke alene hvem som bestemte eller at én matvare dominerte.",
  },
  {
    id: "F5",
    phase: "Fakta",
    kind: "choice",
    title: "Mohenjo-daro og infrastruktur",
    prompt: "Hva beskriver et dokumentert trekk ved Mohenjo-daro best?",
    points: 1,
    options: [
      "Kvartaler og gater kan ha vært tilfeldig plassert, selv om dreneringen også kan ha vært lokal.",
      "Alle husene kan ha vært like, så ulikhet kunne ikke finnes, selv om hjem kunne variere.",
      "En prestekonge kan ha styrt fra et palass og planlagt dreneringen, selv om funnet er uklart.",
      "Kvartaler, gater, brønner og drenering inngår i et planlagt bylandskap ved Mohenjo-daro.",
    ],
    correct: 3,
    hint: "Skill mellom det en arkeolog kan beskrive i et anlegg og det som krever en tolkning av samfunnet.",
    explanation: "Gater, hus, brønner og dreneringsspor er dokumentert. De sier ikke alene hvem som styrte eller hvor effektivt systemet var.",
  },
  {
    id: "F6",
    phase: "Fakta",
    kind: "choice",
    title: "Mesopotamia er ikke én modell",
    prompt: "Hva er mest presist om tidlig urbanisering i Mesopotamia?",
    points: 1,
    options: [
      "Uruk var det eneste sentrumet, selv om nordlige steder kunne vokse med lokal organisering.",
      "Sørlige og nordlige områder utviklet urbane trekk med både kontakt og lokale forskjeller.",
      "Alle mesopotamiske bosetninger ble byer samtidig, selv om dateringer også kunne overlappe.",
      "Nordlige samfunn hadde bare landsbyer fram til etter 2000 f.Kr., selv om lokale sentre kunne ha andre trekk.",
    ],
    correct: 0,
    hint: "Se etter alternativet som rommer både forbindelser og selvstendige regionale forløp.",
    explanation: "Forskningen beskriver tidlige urbane prosesser i nord som samtidige med utviklingen i sør. Det gjør ikke kontakt uviktig, men svekker en enkel kjerne–periferi-fortelling.",
  },
  {
    id: "U1",
    phase: "Forståelse",
    kind: "choice",
    title: "Hvorfor kan byer oppstå?",
    prompt: "Hvilken forklaring på tidlig urbanisering er mest historisk forsvarlig?",
    points: 1,
    options: [
      "Jordbruk gjorde byer nødvendige overalt, selv om lokale ressurser kunne variere mellom regioner og landskap.",
      "Flere forhold, som ressursgrunnlag, forbindelser, institusjoner og lokale valg, kunne virke sammen ulikt.",
      "Monumenter viser at en konge alltid planla byen fra starten i alle regioner, selv om bygg kunne ha flere funksjoner.",
      "Befolkningsvekst forklarer alle endringer, selv om omland, arbeid og lokale forhold kunne ha betydning.",
    ],
    correct: 1,
    hint: "Finn forklaringen som gjør plass for ulikhet mellom caseområdene.",
    explanation: "Urbanisering er en prosess med flere mulige drivkrefter. Kildene støtter ikke én automatisk overgang.",
  },
  {
    id: "U2",
    phase: "Forståelse",
    kind: "sort",
    title: "Omland og by",
    prompt: "Sorter utsagnene som det et omland kan bidra med, eller det en by kan organisere. Velg den mest direkte funksjonen.",
    points: 2,
    items: ["mat, vann og råvarer", "arbeidskraft og forbindelser", "gater, drenering eller offentlige rom", "registrering og samordning av aktiviteter"],
    choices: ["Omlandets bidrag", "Byens organiserte funksjoner"],
    answerMap: {
      "mat, vann og råvarer": "Omlandets bidrag",
      "arbeidskraft og forbindelser": "Omlandets bidrag",
      "gater, drenering eller offentlige rom": "Byens organiserte funksjoner",
      "registrering og samordning av aktiviteter": "Byens organiserte funksjoner",
    },
    hint: "Spør hvor ressursen kommer fra, og hvor ordningen blir synlig.",
    explanation: "En by kan samle og organisere, men den er avhengig av mennesker og ressurser fra et større landskap. Grensen er analytisk, ikke en absolutt fysisk vegg.",
  },
  {
    id: "U3",
    phase: "Forståelse",
    kind: "match",
    title: "Kontroll eller kollektiv handling?",
    prompt: "Koble sporet til den mest forsvarlige tolkningen. Tolkningen skal ikke gå lenger enn sporet.",
    points: 3,
    items: ["Mange hushold er koblet til drenering", "store bygg og registreringsspor i Mesopotamia", "monumentale bygg og ressursforbindelser i Caral-Supe"],
    choices: ["regional organisering og arbeidsinnsats kunne opprettholde store prosjekter", "institusjoner og aktiviteter var samlet, men styreformen er åpen", "flere grupper måtte koordinere vedlikehold eller bruk"],
    answerMap: {
      "Mange hushold er koblet til drenering": "flere grupper måtte koordinere vedlikehold eller bruk",
      "store bygg og registreringsspor i Mesopotamia": "institusjoner og aktiviteter var samlet, men styreformen er åpen",
      "monumentale bygg og ressursforbindelser i Caral-Supe": "regional organisering og arbeidsinnsats kunne opprettholde store prosjekter",
    },
    hint: "Unngå tolkninger som navngir en konge eller en klasse uten et konkret spor for det.",
    explanation: "Kollektiv handling kan oppstå gjennom flere ordninger. Sporene kan støtte koordinering, men de avgjør ikke om den var sentralisert, lokal eller blandet.",
  },
  {
    id: "U4",
    phase: "Forståelse",
    kind: "choice",
    title: "Hva betyr «kompleks»?",
    prompt: "Hvorfor bør ordet «kompleks» brukes forsiktig om tidlige bysamfunn?",
    points: 1,
    options: [
      "Fordi ordet kan skjule hvilke trekk som faktisk beskrives, og få ulikhet eller stat til å se nødvendig ut.",
      "Fordi komplekse samfunn kunne være bedre enn små samfunn, selv om vurderingen kan skjule andre mål i alle sammenhenger.",
      "Fordi bare samfunn med skrift kunne være komplekse, selv om andre institusjoner og praksiser kunne finnes.",
      "Fordi arkeologer ikke kunne beskrive bygninger eller bosetninger, selv om funn kunne gi kunnskap.",
    ],
    correct: 0,
    hint: "Spør hvilke konkrete egenskaper ordet erstatter.",
    explanation: "Bruk heller spesifikke ord som konsentrasjon, arbeidsdeling, infrastruktur eller institusjoner. «Kompleks» skal ikke bety bedre eller høyere på en trapp.",
  },
  {
    id: "U5",
    phase: "Forståelse",
    kind: "choice",
    title: "Gevinst og kostnad",
    prompt: "Hvilken formulering veier best mulige fordeler og kostnader ved større bosetninger?",
    points: 1,
    options: [
      "Større bosetninger ga bare trygghet og bedre liv for alle, selv om noen kunne arbeide hardere og ha mindre innflytelse.",
      "Større bosetninger kunne samle samarbeid og utveksling, men også kreve vedlikehold og gi ulikt fordelte belastninger.",
      "Byer kunne være mer sårbare enn landsbyer, selv om enkelte kunne vare lenge og håndtere belastninger.",
      "Infrastruktur løste alle problemer fordi tekniske systemer kunne virke likt i alle perioder og steder.",
    ],
    correct: 1,
    hint: "Velg en formulering som sier «kunne» og som nevner både ordning og belastning.",
    explanation: "Tidlige byer var sosiale eksperimenter. Kildene åpner for både fordeler og problemer, men virkningen kan ha vært ulik mellom grupper og steder.",
  },
  {
    id: "L1",
    phase: "Lange linjer",
    kind: "order",
    title: "En mulig, ikke nødvendig, kjede",
    prompt: "Sett en mulig kjede fra ressurser til urban organisering.",
    points: 2,
    items: ["infrastruktur og institusjoner må vedlikeholdes", "mulige forskjeller i arbeid, ressurser og makt", "ressursgrunnlag og forbindelser", "ulike former for koordinering og kontroll", "mennesker og aktiviteter samles"],
    expected: [
      "ressursgrunnlag og forbindelser",
      "mennesker og aktiviteter samles",
      "infrastruktur og institusjoner må vedlikeholdes",
      "ulike former for koordinering og kontroll",
      "mulige forskjeller i arbeid, ressurser og makt",
    ],
    hint: "Et senere ledd må forklares som en mulighet, ikke som en sikker følge.",
    explanation: "Kjeden er en syntese. Den viser hva som må kunne henge sammen, men caseområdene viser at samme problem kan løses på ulike måter.",
  },
  {
    id: "L2",
    phase: "Lange linjer",
    kind: "reflection",
    title: "Sammenligne uten å rangere",
    prompt: "Sammenlign Mohenjo-daro med Caral-Supe. Bruk ett likhetstrekk, to forskjeller og én begrensning ved sammenligningen.",
    points: 2,
    hint: "Sammenlign trekk, ikke rang. Skriv først observasjonene før du forklarer dem.",
    explanation: "Et godt svar bruker konkrete spor, viser både likhet og forskjell, og forklarer hvorfor ulike perioder og kildetyper begrenser sammenligningen.",
    modelResponse: "Begge steder viser at store prosjekter og konsentrerte bosetninger krevde organisering. Mohenjo-daro har et tydelig dokumentert gatenett og drenering, mens Caral-Supe har plattformhauger, sirkulære plasser og et regionalt ressursgrunnlag med fiske og irrigasjon. Materialet er ikke likt, og vi kan derfor ikke konkludere med samme styreform eller samme religion.",
  },
  {
    id: "L3",
    phase: "Lange linjer",
    kind: "choice",
    title: "Ressurser og bærekraft",
    prompt: "Hvilken vurdering kobler tidlig urbanisering til bærekraft uten å bruke dagens begrep som en direkte dom?",
    points: 1,
    options: [
      "Byer var bærekraftige når de hadde store monumenter, selv om ressursbruken kunne variere mellom grupper.",
      "Byer var aldri bærekraftige fordi urbane samfunn kunne belaste naturen, selv når ressursgrunnlaget endret seg.",
      "Vi kan undersøke ressursbruk, vedlikehold, sårbarhet og fordeling, men må bruke regionale spor og unngå en enkel ja/nei-dom.",
      "Bærekraft kunne først vurderes etter industrialiseringen, selv om historiske ressursvalg kunne undersøkes.",
    ],
    correct: 3,
    hint: "Bærekraftsspørsmålet må knyttes til konkrete ressurser og til hvem som bar kostnadene.",
    explanation: "Historiske perspektiver kan undersøke ressursbruk og sårbarhet uten å late som om dagens målekriterier kan leses direkte ut av fortiden.",
  },
  {
    id: "L4",
    phase: "Lange linjer",
    kind: "reflection",
    title: "Var urbanisering et framskritt?",
    prompt: "Skriv en begrunnet vurdering av om urbanisering bør beskrives som et framskritt.",
    points: 3,
    hint: "Vei mulige gevinster mot kostnader, og bruk minst to case.",
    explanation: "Et historisk svar kan vurdere urbanisering som en endring med både muligheter og belastninger, ulikt fordelt mellom mennesker og steder.",
    modelResponse: "Urbanisering kunne samle mennesker, ressurser og samarbeid, men den kunne også kreve mer arbeid, vedlikehold og håndtering av ulikhet og sårbarhet. Derfor bør den ikke beskrives som et entydig framskritt. Mesopotamia, Mohenjo-daro og Caral-Supe viser dessuten ulike kombinasjoner av ressurser, infrastruktur og organisering.",
  },
  {
    id: "K1",
    phase: "Kildeblikk",
    kind: "choice",
    title: "Funn eller tolkning?",
    prompt: "Hvilket utsagn skiller best mellom observasjon og tolkning?",
    points: 1,
    options: [
      "Dreneringsspor kan beskrives konkret; de kan støtte en tolkning om koordinering, men avgjør ikke hvem som bestemte.",
      "Drenering viser at alle innbyggerne hadde god helse, selv om virkningen kunne variere mellom grupper.",
      "Plattformhauger betyr at Caral-Supe hadde en konge, selv om styret kunne være lokalt og skiftende.",
      "Registrering beviser at alle aktiviteter var tvunget, selv om noen kunne delta frivillig eller lokalt.",
    ],
    correct: 0,
    hint: "Finn alternativet som først beskriver sporet og deretter avgrenser tolkningen.",
    explanation: "Kildekritikk betyr å skille det som er dokumentert fra en mulig forklaring og fra det materialet ikke avgjør alene.",
  },
  {
    id: "K2",
    phase: "Kildeblikk",
    kind: "sort",
    title: "Styrken i en påstand",
    prompt: "Sorter formuleringene etter om de er direkte dokumentert, mulig tolkning eller for sterk påstand.",
    points: 3,
    items: [
      "Det finnes gater, brønner og drenering ved Mohenjo-daro.",
      "Flere grupper kan ha koordinert vedlikehold.",
      "En prestekonge styrte hele byen.",
      "Monumentene viser at alle innbyggere var enige.",
    ],
    choices: ["Direkte dokumentert", "Mulig tolkning", "For sterk påstand"],
    answerMap: {
      "Det finnes gater, brønner og drenering ved Mohenjo-daro.": "Direkte dokumentert",
      "Flere grupper kan ha koordinert vedlikehold.": "Mulig tolkning",
      "En prestekonge styrte hele byen.": "For sterk påstand",
      "Monumentene viser at alle innbyggere var enige.": "For sterk påstand",
    },
    hint: "Se etter «kan» og spør om påstanden navngir personer eller erfaringer som ikke er dokumentert.",
    explanation: "Et konkret anlegg kan være direkte dokumentert. Forklaringen kan være mulig, mens sikre utsagn om herskere eller enighet går lenger enn materialet.",
  },
  {
    id: "K3",
    phase: "Kildeblikk",
    kind: "choice",
    title: "Bildet av prestekongen",
    prompt: "Hvordan bør vi bruke et uttrykk som «prestekonge» i arbeidet med Mohenjo-daro?",
    points: 1,
    options: [
      "Som et sikkert navn på herskeren fordi en skulptur alltid viser personen som styrte byen.",
      "Som en mulig eller eldre tolkning som må skilles fra det skulpturen faktisk dokumenterer.",
      "Som bevis på at alle indusbyer hadde samme politiske system, selv om lokale forskjeller kunne finnes.",
      "Som et ord som gjør gater og drenering unødvendige i forklaringen, selv om infrastruktur kunne være viktig.",
    ],
    correct: 2,
    hint: "Spør hva et bilde kan vise, og hva det ikke kan bevise om personen eller styret.",
    explanation: "Et visuelt funn kan dokumentere en framstilling, men identitet, rolle og politisk makt er tolkninger som må holdes åpne.",
  },
  {
    id: "K4",
    phase: "Kildeblikk",
    kind: "reflection",
    title: "Skriv fra spor til syntese",
    prompt: "Skriv en kort konklusjon som sammenstiller minst to case. Skill mellom observasjon, tolkning og begrensning.",
    points: 3,
    hint: "Bruk én setning for konkrete spor, én for en mulig sammenheng og én for det materialet ikke kan avgjøre.",
    explanation: "En god syntese sammenligner uten å rangere og viser tydelig hvor sikker eller åpen forklaringen er.",
    modelResponse: "Mohenjo-daros gater og drenering og Caral-Supes plattformhauger viser ulike former for organisering av større bosetninger. Sporene kan støtte at mennesker måtte koordinere arbeid og ressurser, men de avgjør ikke om ordningen var styrt av en konge, lokale grupper eller en kombinasjon. Derfor bør sammenligningen beskrive både fellestrekk og regionale forskjeller.",
  },
];
const sourceWorkshop2_2: SourceWorkshop = {
  id: "2-2-jordbruk-kildeverksted",
  chapterId: "2.2",
  sectionId: "kildeverksted",
  title: "Fra materielle spor til begrunnede slutninger",
  guidingQuestion:
    "Hva kan to arkeologiske spor fortelle om mat, samarbeid og bosetning – og hva må vi fortsatt holde åpent?",
  learningGoals: [
    "skrive konkrete observasjoner uten å blande inn forklaringer",
    "bruke tid, sted, funnkontekst og dokumentasjon når et spor skal tolkes",
    "vurdere påstander som direkte støttet, mulige, for sterke eller ikke avgjørbare",
    "sammenstille spor fra Çatalhöyük og Göbekli Tepe med tydelige forbehold",
    "forklare hva materialet ikke kan bevise alene",
  ],
  context: {
    time: "Çatalhöyük: ca. 7400–6200 f.Kr. for den østre haugen. Göbekli Tepe: ca. 9600–8200 f.Kr.",
    place: "Den østre haugen ved Çatalhöyük på den anatoliske høysletta og Göbekli Tepe i sørøstlige Anatolia.",
    findContext:
      "Çatalhöyük-sporene kommer fra lagdelte hus og husholdningsområder. Göbekli-sporene kommer fra monumentale og rektangulære bygg, arbeidsområder, slipesteiner og sedimentprøver.",
    preservation:
      "Çatalhöyük har bevarte stratigrafiske lag og husrester, men tidligere beboere fylte og bygde over hus. Ved Göbekli Tepe er forkullede planterester svakt bevart, så analyser av bruksspor og fytolitter er viktige.",
    documentedBy:
      "Çatalhöyük Research Project, UNESCO World Heritage Centre, Deutsches Archäologisches Institut og Dietrich m.fl. i PLOS ONE.",
    limitations: [
      "Arkeologer dokumenterer spor og kontekst, men ingen av kildene gir oss direkte utsagn fra menneskene som laget sporene.",
      "En bygning eller et redskap kan ha hatt flere funksjoner, og fravær av et funn er ikke automatisk bevis på fravær av en praksis.",
      "Tolkninger av makt, ritualer, tanker og sosial likhet må derfor formuleres som mulige eller uavklarte.",
    ],
  },
  materials: [
    {
      id: "catalhoyuk-huslag",
      label: "Materiale A · huslag og husholdningsspor",
      materialType: "bosetningsspor",
      date: "ca. 7400–6200 f.Kr.",
      place: "Çatalhöyük, den østre haugen, sentrale Anatolia",
      findContext:
        "Utgravninger av den østre haugen har dokumentert 18 neolittiske bosetningsnivåer. Husene ligger tett, med vegger mot hverandre og adgang via tak.",
      preservation:
        "Tidligere beboere fylte hus som ble forlatt og bygde nye hus over dem. Det har bevart lag, men betyr også at de øvre delene av mange hus ble fjernet eller omformet.",
      documentedBy: "Çatalhöyük Research Project sin Site Guide Book og UNESCOs verdensarvbeskrivelse.",
      documentedDescription:
        "Beskrivelsen gjelder et lagdelt bosetningsmateriale: husrester med takadkomst, rom for lagring og matbehandling, dyrebein og kornrester, samt begravelser under husgulv.",
      possibleObservations: [
        "Det finnes mange bosetningslag på samme sted.",
        "Husene ligger tett og har ikke vanlige gater mellom seg.",
        "Kildene beskriver siderom for lagring og matbehandling.",
        "Noen døde ble gravlagt under gulv inne i hus.",
      ],
      supportedInterpretations: [
        "Sporene støtter at mennesker bodde lenge på samme sted og organiserte hverdagsarbeid i hus.",
        "Lagring og matbehandling var deler av husholdningenes aktiviteter.",
      ],
      alternativeInterpretations: [
        "Tett bygging kan ha vært knyttet til praktiske forhold, tradisjoner eller sosial organisering; materialet avgjør ikke én forklaring.",
        "Begravelser under gulv kan ha hatt flere betydninger, ikke bare én felles «religion».",
      ],
      cannotProve:
        "Sporene avgjør ikke alene hvem som bestemte, hvordan alle husholdninger var organisert eller hva alle beboerne mente.",
      sourceIds: ["catalhoyuk", "catalhoyuk-guide"],
      rights: {
        rightsHolder: "Çatalhöyük Research Project og UNESCO World Heritage Centre",
        originalUrl: "https://catalhoyuk.ku.edu.tr/sites/default/files/Catalhoyuk-Guidebook-ENGLISH.pdf",
        licenseStatus:
          "Ingen mediefil er kopiert. Teksten er en egen norsk parafrase; UNESCOs stedbeskrivelse er merket CC-BY-SA IGO 3.0, mens prosjektguiden ikke oppgir noen lisens og derfor bare brukes som kort parafrase med kreditering.",
        credit: "Çatalhöyük Research Project og UNESCO World Heritage Centre, se kildelisten.",
        adaptation: "Kun pedagogisk parafrase brukes; ingen bilder, kart eller faksimiler er bearbeidet.",
        checked: "22. august 2026",
      },
    },
    {
      id: "gobekli-kornspor",
      label: "Materiale B · slipesteiner og plantespor",
      materialType: "redskaps- og plantespor",
      date: "10. og 9. årtusen f.Kr. (ca. 9600–8200 f.Kr.)",
      place: "Göbekli Tepe, sørøstlige Anatolia",
      findContext:
        "Materialet kommer fra monumentale runde/ovale bygg og mindre rektangulære bygg, med redskaper og sedimentprøver fra ulike arbeidsområder.",
      preservation:
        "Forkullede planterester er svakt bevart på stedet. Forskerne kombinerte derfor bruksspor på mer enn 7000 gjenstander med analyser av fytolitter og funnkontekst.",
      documentedBy: "Dietrich m.fl. (2019) i PLOS ONE og Deutsches Archäologisches Institut.",
      documentedDescription:
        "Forskerne beskriver mange slipesteiner, skåler, håndsteiner, støtere og mortere. Bruksspor og fytolittanalyser peker mot omfattende bearbeiding av korn, samtidig som ville dyrebein og monumentale søyler inngår i materialet.",
      possibleObservations: [
        "Materialet omfatter svært mange redskaper knyttet til maling eller knusing.",
        "Bruksspor på redskapene passer med bearbeiding av korn.",
        "Fytolittanalyser viser betydelig tilstedeværelse av korn i prøvene.",
        "Monumentale bygg og spor etter bearbeiding av mat finnes i samme større område.",
      ],
      supportedInterpretations: [
        "Sporene støtter at plante- og kornbearbeiding var en viktig aktivitet ved stedet.",
        "Fellesprosjekter og matforsyning må ha blitt organisert på en eller annen måte.",
      ],
      alternativeInterpretations: [
        "Matbearbeiding kan ha vært knyttet til daglig bruk, sesongvise samlinger, arbeidsfester eller flere formål.",
        "At korn ble bearbeidet, avgjør ikke alene om kornet var vilt eller fullt domestisert.",
      ],
      cannotProve:
        "Materialet avgjør ikke alene om stedet først og fremst var en samlingsplass eller fast bosetning, eller nøyaktig hvordan arbeid og makt var fordelt.",
      sourceIds: ["gobekli-unesco", "dai-gobekli", "gobekli-grain"],
      rights: {
        rightsHolder: "Deutsches Archäologisches Institut og PLOS ONE",
        originalUrl: "https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0215214",
        licenseStatus:
          "PLOS ONE-artikkelen er åpen tilgang under CC BY 4.0. Ingen figur, fotografi eller annet medieinnhold er kopiert; prosjektet bruker en egen norsk parafrase.",
        credit: "Dietrich m.fl. (2019), Deutsches Archäologisches Institut og PLOS ONE, se kildelisten.",
        adaptation: "Kun tekstlig pedagogisk bearbeiding av funn og tolkninger; ingen mediefil er bearbeidet.",
        checked: "22. august 2026",
      },
    },
  ],
  claims: [
    {
      id: "påstand-1",
      text: "Ved Çatalhöyük ble noen døde gravlagt under gulvene inne i husene.",
      classification: "direct",
      explanation:
        "Dette står som dokumentert observasjon i både prosjektguiden og UNESCOs stedbeskrivelse, og er derfor direkte støttet av materialet.",
      sourceIds: ["catalhoyuk", "catalhoyuk-guide"],
    },
    {
      id: "påstand-2",
      text: "Ved Göbekli Tepe bærer et stort antall redskaper bruksspor som passer med bearbeiding av korn.",
      classification: "direct",
      explanation:
        "Dietrich m.fl. bygger på bruksspor på mer enn 7000 gjenstander kombinert med fytolittanalyser. Selve bearbeidingssporet er dokumentert.",
      sourceIds: ["gobekli-grain", "dai-gobekli"],
    },
    {
      id: "påstand-3",
      text: "Matbearbeidingen ved Göbekli Tepe hørte til sesongvise samlinger der flere grupper møttes.",
      classification: "possible",
      explanation:
        "Dette er en av flere tolkninger materialet åpner for. Bearbeidingen kan like gjerne høre til daglig bruk eller til arbeid rundt byggeprosjektene.",
      sourceIds: ["gobekli-grain", "dai-gobekli"],
    },
    {
      id: "påstand-4",
      text: "Den tette byggemåten ved Çatalhöyük hang sammen med hvordan husholdningene var organisert.",
      classification: "possible",
      explanation:
        "Sammenhengen er rimelig, men ikke vist. Tett bygging kan også henge sammen med byggeskikk, terreng eller tradisjon.",
      sourceIds: ["catalhoyuk-guide", "catalhoyuk"],
    },
    {
      id: "påstand-5",
      text: "Begravelsene under husgulvene viser at alle beboerne ved Çatalhöyük delte den samme religionen.",
      classification: "too-strong",
      explanation:
        "Materialet viser gravskikk, ikke trosinnhold. Én praksis kan ha hatt ulik betydning for ulike mennesker på samme sted.",
      sourceIds: ["catalhoyuk", "catalhoyuk-guide"],
    },
    {
      id: "påstand-6",
      text: "Kornsporene ved Göbekli Tepe viser at menneskene der dyrket fullt domestisert korn på stedet.",
      classification: "too-strong",
      explanation:
        "Sporene viser at korn ble bearbeidet. De avgjør ikke om kornet var vilt eller domestisert, og heller ikke om det ble dyrket på stedet.",
      sourceIds: ["gobekli-grain"],
    },
    {
      id: "påstand-7",
      text: "Ved begge stedene var det de eldste i hver husholdning som bestemte over lagrene.",
      classification: "cannot-determine",
      explanation:
        "Materialet inneholder ingen spor som skiller mellom aldersgrupper eller beslutningsroller. Spørsmålet kan ikke avgjøres med dette materialet.",
      sourceIds: ["catalhoyuk-guide", "dai-gobekli"],
    },
    {
      id: "påstand-8",
      text: "Göbekli Tepe var først og fremst en samlingsplass og ikke en fast bosetning.",
      classification: "cannot-determine",
      explanation:
        "Funnkonteksten rommer både monumentale bygg og hverdagsspor. Materialet peker ikke entydig mot én av de to forklaringene.",
      sourceIds: ["gobekli-unesco", "dai-gobekli", "gobekli-grain"],
    },
  ],
  synthesisPrompt:
    "Velg minst to ulike spor. Forklar hva de samlet styrker, hvordan de kan tolkes forskjellig, og hva som fortsatt er usikkert.",
  synthesisCriteria: [
    "viser til minst to konkrete spor fra materialet",
    "skiller mellom det sporene samlet støtter og en mulig tolkning",
    "nevner minst én alternativ forklaring eller begrensning",
  ],
  conclusionPrompt:
    "Skriv en kort begrunnet konklusjon. Bruk minst to konkrete observasjoner, en tydelig tolkning, et forbehold eller en alternativ forklaring og én setning om hva materialet ikke kan bevise.",
  modelResponse: {
    observations:
      "Ved Çatalhöyük er husene lagdelt og tett bygde, med rom for lagring og matbehandling. Ved Göbekli Tepe er det funnet mange redskaper med bruksspor som passer med kornbearbeiding, og fytolittanalyser viser korn i prøvene.",
    interpretation:
      "Samlet støtter sporene at mennesker kunne organisere mat, arbeid og bosetning på flere måter, og at omfattende samarbeid ikke følger én enkel trapp fra jakt til jordbruk.",
    reservation:
      "Det er mulig at matbearbeiding og felles arbeid bidro til samlinger eller større prosjekter, men den samme kombinasjonen kan ha hatt ulike funksjoner og ha endret seg over tid.",
    limitation:
      "Materialet kan ikke alene bevise hvem som bestemte, hva alle menneskene tenkte eller om kornet ved Göbekli Tepe var fullt domestisert.",
  },
  rubric: [
    "Observasjon: minst to konkrete spor er beskrevet uten å forklare dem i samme setning.",
    "Tolkning: svaret knytter sporene til en avgrenset historisk påstand.",
    "Forbehold: svaret bruker «kan», «mulig» eller viser til en alternativ forklaring.",
    "Begrensning: svaret sier tydelig hva materialet ikke kan avgjøre alene.",
  ],
  sourceIds: ["catalhoyuk", "catalhoyuk-guide", "gobekli-unesco", "dai-gobekli", "gobekli-grain"],
  progressVersion: 1,
  lastChecked: "22. august 2026",
};

const teacherGuide2_3: TeacherGuide = {
  overview: "Kapitlet følger progresjonen forkunnskaper → fakta → forståelse → kildearbeid → lange linjer → egenvurdering → repetisjon. Elevene sammenligner tre tidlige urbane prosesser og skiller mellom spor, tolkninger og begrensninger.",
  teachingPhases: [
    { id: "aktiver-2-2", title: "Aktiver 2.2", duration: "0–10 min", purpose: "Hent fram lagring, arbeidsdeling, omland og forskjellen mellom funn og tolkning.", teacherActions: ["Skriv «by» og «omland» på tavlen.", "Be elevene hente fram ett forbehold fra 2.2."], studentActions: ["Skriv en mulig kobling til større bosetninger.", "Formuler ett spørsmål du fortsatt ikke kan svare på."], sectionIds: ["forkunnskap", "mal"] },
    { id: "kart-og-tidslinje-2-3", title: "Bygg kart og tidslinje", duration: "10–25 min", purpose: "Vis tre regioner og overlappende intervaller uten én global startdato.", teacherActions: ["Bruk tid- og sted-delen og tidslinjen.", "Stopp ved ordet «først» og spør hvilket kriterium eleven bruker."], studentActions: ["Plasser de tre caseområdene.", "Forklar hvorfor intervaller kan overlappe."], sectionIds: ["tid-og-sted", "tidslinje"] },
    { id: "sikre-fakta-2-3", title: "Sikre faktapunktene", duration: "25–45 min", purpose: "Etabler presise trekk ved Mesopotamia, Mohenjo-daro og Caral-Supe.", teacherActions: ["La elevene arbeide med F1–F6.", "Be dem begrunne svar med region, tid eller spor."], studentActions: ["Hent fram faktapunkter uten å lese teksten.", "Marker punkter som trenger nytt forsøk."], sectionIds: ["fakta", "oppgaver"] },
    { id: "les-og-forklar-2-3", title: "Les og forklar", duration: "45–80 min", purpose: "Koble omland, ressurser og organisering uten å gjøre by eller stat til nødvendige trinn.", teacherActions: ["Be elevene lage kolonner for dokumentert, mulig og uavklart.", "Stopp ved forskjellen mellom koordinering og kontroll."], studentActions: ["Finn formuleringer med «kan» eller «mulig».", "Forklar hvordan samme spor kan støtte flere tolkninger."], sectionIds: ["forstaelse", "fagtekst"] },
    { id: "kildeverksted-2-3", title: "Arbeid med spor", duration: "80–115 min", purpose: "Gjennomfør seks trinn fra observasjon til revidert konklusjon.", teacherActions: ["La grupper starte med ett materiale og sammenstille minst to case.", "Spør hvilke ord som er spor og hvilke som er forklaringer."], studentActions: ["Observer, kontekstualiser og vurder påstander.", "Skriv, begrunn og revider en konklusjon."], sectionIds: ["kildeblikk", "kildeverksted"] },
    { id: "lange-linjer-2-3", title: "Sammenlign uten å rangere", duration: "115–135 min", purpose: "Vurder mulige kjeder, fordeler, kostnader og sårbarhet.", teacherActions: ["Test årsakskjeden med et «ikke alltid»-spørsmål.", "La elevene bruke minst to case i en lang linje."], studentActions: ["Skriv én likhet, to forskjeller og én begrensning.", "Vurder hvem som kan ha fått fordeler eller båret kostnader."], sectionIds: ["lange-linjer", "oppgaver"] },
    { id: "egenvurdering-2-3", title: "Egenvurder og repeter", duration: "Etter økten", purpose: "Flytt læringen fra gjenlesing til gjenhenting og revisjon.", teacherActions: ["Bruk egenvurderingen som metakognitiv stopp.", "Avtal gjenhenting av F1–F6 og K4."], studentActions: ["Marker mål som sikkert, på vei eller nytt forsøk.", "Revider en setning som gikk for langt."], sectionIds: ["oppsummering", "repetisjon"] },
  ],
  priorKnowledgeActivation: {
    prompt: "Be elevene hente fram lagring, arbeidsdeling, omland og ett skille mellom funn og tolkning fra 2.2.",
    cues: ["Hvordan kan lagring og arbeidsdeling gjøre større bosetninger mulig uten at en stat følger automatisk?", "Hva kan et omland bidra med, og hvorfor trenger en by forbindelser utenfor bosetningen?", "Hva er forskjellen på et konkret spor og en forklaring vi lager ut fra sporet?"],
    sectionIds: ["forkunnskap", "mal"],
  },
  textWork: {
    instructions: ["La elevene bruke tid, sted og begreper før fagteksten.", "Marker konkrete funn og tolkninger med ulike farger.", "Samle setninger som viser regional forskjell eller kildebegrensning.", "Forklar hvorfor by, stat og sivilisasjon ikke er samme type kategori."],
    sectionIds: ["tid-og-sted", "fakta", "fagtekst", "forstaelse"],
  },
  taskUse: {
    sequence: "Arbeid i rekkefølgen fakta → forståelse → lange linjer → kildeblikk.",
    firstAttempt: "La elevene gjøre et eget første forsøk. Ved første feil bruker de det avgrensede hintet.",
    retry: "Be elevene prøve på nytt før forklaringen. Samtal om hva som endret seg i begrunnelsen.",
    openResponses: "Åpne svar skal være egne, meningsbærende forsøk før modellresponsen vises. Bruk modellen til å finne spor, sammenligninger og forbehold som kan forbedres.",
    sectionIds: ["oppgaver", "fakta", "forstaelse", "lange-linjer", "kildeblikk"],
  },
  selfAssessmentAndReview: {
    selfAssessment: ["Kan eleven definere by eller urbanisering uten å bruke sivilisasjon som rangering?", "Kan eleven forklare by og omland med et konkret case?", "Kan eleven skille dokumentert spor fra mulig tolkning?", "Kan eleven sammenligne to case og skrive hva kildene ikke kan avgjøre?"],
    repetition: ["Nå: Tegn tre bokser: spor, tolkning, begrensning, og fyll inn ett eksempel fra hvert case.", "Om 2–3 dager: Hent fram F1–F6 uten å lese først.", "Om 1–2 uker: Svar på L2 eller L4 på nytt og sammenlign case og forbehold.", "Senere: Hent fram K4 og revider én setning som gikk for langt."],
    sectionIds: ["oppsummering", "repetisjon", "oppgaver"],
  },
  misconceptions: [
    { belief: "«By betyr konge, palass og hær.»", whyUnderstandable: "Kjente statsbygg brukes ofte som synlige kjennetegn.", diagnosticQuestion: "Hvilke demografiske eller funksjonelle trekk kan være relevante uten en identifisert konge?", response: "Bruk by som et analytisk arbeidsbegrep for konsentrasjon av mennesker, aktiviteter og institusjoner med virkninger for et omland." },
    { belief: "«Jordbruk fører automatisk til by.»", whyUnderstandable: "En rett pil fra matoverskudd til by er lett å huske.", diagnosticQuestion: "Hvilke mellomledd og regionale valg må undersøkes?", response: "Lagring, arbeid, forbindelser og institusjoner kunne virke sammen, men ingen kilde støtter en universell og nødvendig kjede." },
    { belief: "«Uruk var sentrumet som alle andre byer kopierte.»", whyUnderstandable: "Uruk har lenge dominert fortellingen om de første byene.", diagnosticQuestion: "Hva viser kildene om nordlige Mesopotamia?", response: "Nordlige prosesser var samtidige og hadde lokale trekk. Kontakt kan ha funnet sted uten at én kjerne–periferi-modell forklarer alt." },
    { belief: "«Drenering beviser at Mohenjo-daro var egalitært.»", whyUnderstandable: "Felles infrastruktur kan se ut som direkte likhet.", diagnosticQuestion: "Hva viser dreneringen konkret, og hva står åpent?", response: "Drenering kan støtte koordinering, men avgjør ikke helse, rettigheter, ulikhet eller én styringsform." },
    { belief: "«Priest-king er et funn.»", whyUnderstandable: "Eldre lærebokfortellinger kan gi tolkninger status som fakta.", diagnosticQuestion: "Hvordan beskriver du arkitekturen før herskertolkningen?", response: "Presenter «priest-king» som en eldre eller omstridt tolkning, uten å erstatte den med sikker egalitarisme." },
    { belief: "«Monumenter beviser tvangsarbeid.»", whyUnderstandable: "Store bygg krever arbeid, som intuitivt kobles til kontroll.", diagnosticQuestion: "Hvilke andre ordninger kan organisere arbeid?", response: "Monumentalitet viser arbeid og organisering i stor skala, men ikke automatisk konge, tvang eller fast klasseordning." },
    { belief: "«Caral var bare et tempelområde.»", whyUnderstandable: "Monumentale plattformer blir lett tolket ut fra én funksjon.", diagnosticQuestion: "Hvilke bolig-, ikke-bolig- og ressursforbindelser inngår?", response: "Caral-Supe beskrives som et større urbant landskap med flere bosetninger og en regional ressurskombinasjon." },
    { belief: "«Sammenligning betyr rangering.»", whyUnderstandable: "Ord som først, størst og mest avansert er vanlige i oversikter.", diagnosticQuestion: "Kan du skrive én likhet, to forskjeller og én begrensning?", response: "Sammenlign konkrete trekk og forklar hvor sammenligningen bryter sammen. Likhet betyr ikke samme årsak eller politisk form." },
  ],
  assessmentCriteria: [
    { area: "Faktakunnskap", shortAnswer: "Gjengir region, tid og minst ett dokumentert spor presist.", extendedAnswer: "Velger relevante faktapunkter uten å blande case eller gjøre intervaller til globale startdatoer." },
    { area: "Historiske begreper", shortAnswer: "Bruker by, urbanisering og omland riktig.", extendedAnswer: "Problematiserer stat, sivilisasjon eller kompleks når kategoriene kan skjule kriterier eller rangering." },
    { area: "Årsaker og virkninger", shortAnswer: "Forklarer én mulig kobling med «kan» eller «bidro til».", extendedAnswer: "Viser flere mulige ledd og minst én alternativ forklaring på tvers av case." },
    { area: "Kildebruk", shortAnswer: "Skiller ett konkret spor fra én tolkning.", extendedAnswer: "Sammenstiller minst to case og sier hva materialet ikke kan bevise alene." },
    { area: "Konkrete eksempler", shortAnswer: "Nevner et sted og et tidsrom eller spor.", extendedAnswer: "Bruker tre case som belyser samme spørsmål uten å gjøre dem like." },
    { area: "Nyansering og historisk usikkerhet", shortAnswer: "Bruker forbehold der kilden er åpen.", extendedAnswer: "Viser variasjon og reviderer en for sterk setning." },
  ],
  sourceWorkshop: {
    workshopId: "2-3-byer-kildeverksted",
    purpose: "Trene eleven i å gå fra materielle spor til en avgrenset sammenligning av koordinering, ressurser og makt.",
    recommendedPlacement: "Etter fagteksten og kildeblikket, før lange linjer og oppgavene.",
    distinctions: ["observasjon: det materialet beskriver konkret", "kontekst: tid, sted, funnkontekst, bevaring og dokumentasjon", "tolkning: en mulig forklaring som må støttes av spor", "begrensning: det kildene ikke kan avgjøre alene"],
    commonMisreadings: ["å lese UNESCOs stat eller sivilisasjon som universell definisjon", "å gjøre drenering til bevis for helse eller egalitarisme", "å gjøre monumentalitet til bevis for konge eller tvang", "å bruke fravær av palass som bevis for fravær av makt"],
    discussionQuestions: ["Hvilket ord i svaret viser til et spor, og hvilket ord er en forklaring?", "Kan infrastruktur være felles uten én konge?", "Hvilken forskjell gjør en enkel utviklingskjede mindre sannsynlig?", "Hvilket nytt funn ville endret tolkningen mest?"],
    assessmentCriteria: ["minst tre navngitte og konkrete spor", "tydelig skille mellom observasjon og tolkning", "sammenligning av minst to case uten å gjøre likhet til identitet", "minst ett forbehold eller en alternativ forklaring", "én setning om hva kildene ikke kan bevise", "en revidert formulering som presiserer første svar"],
    sourceIds: ["2-3-k-02", "2-3-k-03", "2-3-k-04", "2-3-k-06", "2-3-k-07", "2-3-k-08", "2-3-k-09", "2-3-k-11"],
  },
  resources: [
    { label: "Start i elevkapitlet", description: "Åpne hovedspørsmål og læringsmål.", visibility: "public", sectionId: "mal" },
    { label: "Bruk tidslinjen", description: "Orienter klassen i regionale intervaller.", visibility: "public", sectionId: "tid-og-sted" },
    { label: "Arbeid med kildeblikk", description: "Skill spor, tolkning og begrensning.", visibility: "public", sectionId: "kildeblikk" },
    { label: "Åpne oppgavene", description: "Bruk 19 oppgaver til gjenhenting og nytt forsøk.", visibility: "public", sectionId: "oppgaver" },
    { label: "Planlegg repetisjon", description: "Finn egenvurdering og repetisjon over tid.", visibility: "public", sectionId: "repetisjon" },
    { label: "Lokalt undervisningsmateriale", description: "Internt materiale er ikke offentlig publisert og har ingen nettleserlenke.", visibility: "local" },
    { label: "Lokalt arbeidsark", description: "Redaksjonelt arbeidsmateriale er ikke offentlig publisert.", visibility: "local" },
  ],
};

const sourceWorkshop2_3: SourceWorkshop = {
  id: "2-3-byer-kildeverksted",
  chapterId: "2.3",
  sectionId: "kildeverksted",
  title: "Hva holder en by sammen?",
  guidingQuestion: "Var tidlige bysamfunn først og fremst et resultat av kontroll, samarbeid eller en kombinasjon?",
  learningGoals: [
    "skrive observasjoner før tolkninger",
    "kontekstualisere tid, sted, funnkontekst, bevaring og dokumentasjon",
    "vurdere påstander som direkte støttet, mulige, for sterke eller ikke avgjørbare",
    "sammenstille minst to case med både mønstre og brudd",
    "skrive og revidere en begrenset konklusjon",
  ],
  context: {
    time: "Uruk og nordlige Mesopotamia: fjerde årtusen f.Kr.; Mohenjo-daro: hovedsakelig ca. 2600–1900 f.Kr.; Caral-Supe: ca. 3000–1800 f.Kr. i UNESCOs stedramme.",
    place: "Sørlige og nordlige Mesopotamia, Indusdalen i dagens Pakistan og Supe-dalen på nord-sentrale kysten av Peru.",
    findContext: "Materialene er tekstlige, egne beskrivelser av bosetningsareal, bygg, registrering, hushold, gater, drenering, monumenter og ressursforbindelser.",
    preservation: "Utgravningsgrad, bevaring og dokumentasjon varierer mellom case. Mohenjo-daro er bare delvis undersøkt, og materialet gir ikke direkte utsagn fra menneskene som laget sporene.",
    documentedBy: "McMahon, Ur, UNESCO World Heritage Centre, Green og Sandweiss m.fl.; materialene er redaksjonelle parafraser med kilde-ID-er.",
    limitations: ["Et bygg eller anlegg kan ha hatt flere funksjoner.", "Fravær av et identifisert palass eller en herskergrav beviser ikke fravær av makt.", "Miljøendring i Supe-området er en mulig bidragsforklaring, ikke en sikker eller eneste årsak.", "Tre case kan vise variasjon, men kan ikke beskrive alle tidlige bysamfunn."],
  },
  materials: [
    {
      id: "uruk-registrering-og-bosetning",
      label: "Materiale A · Uruk og nordlige Mesopotamia",
      materialType: "arkitektoniske spor",
      date: "Fjerde årtusen f.Kr., med Uruk-periodens vekst ca. 3500–3100 f.Kr.",
      place: "Sørlige og nordlige Mesopotamia, særlig Uruk og Tell Brak-området.",
      findContext: "Oversikter over store bosetningsarealer, monumentale/offentlige bygg, produksjonsområder og administrative gjenstander eller registreringsspor.",
      preservation: "Dokumentasjonen er ujevnt fordelt mellom steder og regioner; bosetningsstørrelse og funksjon må tolkes i landskapskontekst.",
      documentedBy: "Augusta McMahon og Jason Ur.",
      documentedDescription: "Beskrivelsene gjelder bygg, bosetningsareal, produksjon og registrering som materielle spor.",
      possibleObservations: ["store bosetningsarealer", "monumentale eller offentlige bygg", "produksjonsområder", "administrative gjenstander eller registreringsspor"],
      supportedInterpretations: ["aktiviteter og institusjoner var samlet på en skala som kan beskrives som tidlig urbanisering", "ulike grupper og praksiser kan ha måttet koordineres"],
      alternativeInterpretations: ["byggene kan ha hatt flere funksjoner", "administrasjon kan beskrive praksiser uten å bevise et moderne byråkrati", "lokal og regional makt kan ha vært blandet"],
      cannotProve: "Én stat, én konge, én religion, «verdens første by» eller at nord var en passiv mottaker fra sør.",
      sourceIds: ["2-3-k-03", "2-3-k-04"],
      rights: { rightsHolder: "Augusta McMahon, Jason Ur og respektive utgivere.", originalUrl: "https://doi.org/10.1007/s10814-019-09136-7", licenseStatus: "K-03 er CC BY 4.0; K-04 brukes som referanse og egen parafrase uten åpen gjenbrukslisens.", credit: "McMahon (2020) og Ur (2014), DOI-ene i kildelisten.", adaptation: "Egen norsk tekstlig beskrivelse; ingen tabeller, figurer eller mediefiler.", checked: "25. august 2026" },
    },
    {
      id: "mohenjo-daro-gater-og-dren",
      label: "Materiale B · Mohenjo-daro",
      materialType: "arkitektoniske spor",
      date: "Moden Indus-periode, hovedsakelig ca. 2600–1900 f.Kr.",
      place: "Mohenjo-daro i Indusdalen, dagens Sindh i Pakistan.",
      findContext: "Stedbeskrivelser og forskning på murte hus og kvartaler, gater, brønner, bad-/vaskeplattformer og sammenkoblede dreneringsanlegg.",
      preservation: "Bare deler av området er utgravd, og bevarings- og tolkningsproblemer gjør at effekten av anleggene ikke kan leses direkte.",
      documentedBy: "UNESCO World Heritage Centre, Adam S. Green (2021; online 2020) og Adam S. Green (2022).",
      documentedDescription: "Beskrivelsene gjelder hus, kvartaler, gater, brønner, plattformer og dreneringsspor som materielle mønstre.",
      possibleObservations: ["murte hus og kvartaler", "gater og brønner", "bad- eller vaskeplattformer", "sammenkoblede dreneringsspor"],
      supportedInterpretations: ["mange hushold og grupper måtte forholde seg til felles eller sammenkoblede infrastrukturer", "kollektiv koordinering er en mulig forklaring på vedlikehold og bruk"],
      alternativeInterpretations: ["infrastrukturen kan ha blitt vedlikeholdt gjennom lokale ordninger", "flere sentre eller en mer sentralisert ordning kan ha virket sammen"],
      cannotProve: "Moderne hygiene, bedre helse for alle, en «priest-king», fravær av hierarki eller lik erfaring for alle.",
      sourceIds: ["2-3-k-06", "2-3-k-07", "2-3-k-08"],
      rights: { rightsHolder: "UNESCO World Heritage Centre, Adam S. Green og respektive utgivere.", originalUrl: "https://whc.unesco.org/en/list/138", licenseStatus: "UNESCOs stedbeskrivelse er CC-BY-SA IGO 3.0; K-07 og K-08 er CC BY 4.0.", credit: "UNESCO, Green (2021; online 2020) og Green (2022), med lenker i kildelisten.", adaptation: "Egen norsk tekstlig beskrivelse; ingen UNESCO-galleri, NHK-video, foto eller artikkelfigur.", checked: "25. august 2026" },
    },
    {
      id: "caral-monumenter-og-ressurser",
      label: "Materiale C · Caral-Supe",
      materialType: "arkitektoniske spor",
      date: "Ca. 3000–1800 f.Kr. i UNESCOs stedramme; miljøstudien bruker en bredere kalibrert tidsramme.",
      place: "Supe-dalen og tilgrensende dalfører på nord-sentrale kysten av Peru.",
      findContext: "Stedbeskrivelser og forskning på plattformhauger, nedsenkede sirkulære plasser, bolig- og ikke-boligbygg, flere bosetninger, fiske, irrigasjon og planteproduksjon.",
      preservation: "Stedene er ulikt undersøkt. Ressursspor og miljødata gir ikke alene svar på fordeling, arbeidsforhold eller politisk organisering.",
      documentedBy: "UNESCO World Heritage Centre, Ruth Shady Solís m.fl. og Daniel H. Sandweiss m.fl.",
      documentedDescription: "Beskrivelsene gjelder monumental arkitektur, et større bosetningslandskap og kombinasjoner av marine og landbaserte ressurser.",
      possibleObservations: ["monumentale plattformhauger", "nedsenkede sirkulære plasser", "bolig- og ikke-boligbygg", "marine ressurser, irrigasjon og planteproduksjon"],
      supportedInterpretations: ["urbane og monumentale prosjekter kunne opprettholdes gjennom en regional ressurskombinasjon", "Caral-Supe fulgte ikke samme material- og ressurskombinasjon som Mesopotamia"],
      alternativeInterpretations: ["monumentalitet kan ha uttrykt religiøse, sosiale, politiske eller overlappende funksjoner", "ressursnettverket kan ha vært organisert gjennom ulike former for gjensidighet eller makt"],
      cannotProve: "Én konge, tvang, en fast klassestruktur, én felles religion eller at miljøendring alene forklarte senere omforming.",
      sourceIds: ["2-3-k-09", "2-3-k-10", "2-3-k-11"],
      rights: { rightsHolder: "UNESCO World Heritage Centre, Shady Solís m.fl. og Sandweiss m.fl.", originalUrl: "https://whc.unesco.org/en/list/1269", licenseStatus: "UNESCOs stedtekst er CC-BY-SA IGO 3.0; K-10 og K-11 har ingen åpen lisens registrert i Crossref.", credit: "UNESCO, Shady Solís m.fl. (2001) og Sandweiss m.fl. (2009).", adaptation: "Egen norsk tekstlig beskrivelse; ingen fotografier, kart, figurer eller tabeller.", checked: "25. august 2026" },
    },
  ],
  claims: [
    { id: "påstand-1", text: "Uruk-området hadde store bosetninger, monumentale bygg og registreringsspor i fjerde årtusen f.Kr.", classification: "direct", explanation: "Sporene og oversiktene dokumenterer størrelse, bygg og registrering; «by» er neste analytiske steg.", sourceIds: ["2-3-k-03", "2-3-k-04"] },
    { id: "påstand-2", text: "Tidlig urbanisering i Mesopotamia utviklet seg bare ved at Uruk spredte seg fra sør til et passivt nord.", classification: "too-strong", explanation: "Nordlige prosesser var samtidige og hadde lokale forløp; kontakt kan ha forekommet uten én kjerne–periferi-modell.", sourceIds: ["2-3-k-03", "2-3-k-04"] },
    { id: "påstand-3", text: "Mohenjo-daros drenering viser at alle innbyggerne hadde bedre helse enn folk utenfor byen.", classification: "too-strong", explanation: "Drenering er dokumentert, men effekt, bruk og helsekonsekvens kan ikke leses direkte ut av anlegget.", sourceIds: ["2-3-k-06", "2-3-k-07", "2-3-k-08"] },
    { id: "påstand-4", text: "Dreneringsanleggene ved Mohenjo-daro tyder på at mange grupper deltok i eller var avhengige av kollektiv koordinering.", classification: "possible", explanation: "Omfanget støtter en tolkning av koordinering; ordningen kan ha vært lokal, sentral eller blandet.", sourceIds: ["2-3-k-07", "2-3-k-08"] },
    { id: "påstand-5", text: "Caral-Supe hadde urban og monumental organisering samtidig som marine ressurser og irrigert planteproduksjon inngikk i økonomien.", classification: "direct", explanation: "Kildene dokumenterer arkitektur, store bosetninger og kombinasjonen av fiske, irrigasjon og planter.", sourceIds: ["2-3-k-09", "2-3-k-11"] },
    { id: "påstand-6", text: "Materialet avgjør ikke alene om én konge tvang alle til å arbeide ved Caral-Supe.", classification: "cannot-determine", explanation: "Monumentene viser arbeid i stor skala, men materialet avgjør ikke alene hersker, tvang eller arbeidsforhold.", sourceIds: ["2-3-k-09", "2-3-k-11"] },
    { id: "påstand-7", text: "Alle tidlige byer måtte ha en sentral stat før de kunne vedlikeholde felles infrastruktur.", classification: "cannot-determine", explanation: "Sammenligningen viser flere mulige ordninger; materialet kan ikke avgjøre en universell regel.", sourceIds: ["2-3-k-02", "2-3-k-07", "2-3-k-08"] },
    { id: "påstand-8", text: "Likhet mellom tidlige byer kan peke mot noen felles utfordringer, men viser ikke at alle fulgte samme utviklingskjede fra jordbruk til stat.", classification: "possible", explanation: "Likheter kan støtte en avgrenset sammenligning, men perioder, ressurser og institusjoner varierer; en felles utviklingskjede er ikke vist.", sourceIds: ["2-3-k-02", "2-3-k-03", "2-3-k-07", "2-3-k-09", "2-3-k-11"] },
  ],
  synthesisPrompt: "Velg minst to case. Forklar hva sporene samlet kan si om hvordan en by kunne holdes sammen. Skill mellom observasjon og tolkning, vis én forskjell og skriv hva materialet ikke kan avgjøre.",
  synthesisCriteria: ["minst to materialer er representert med konkrete spor", "observasjon og tolkning er skilt", "minst én likhet og én forskjell er forklart", "minst én begrensning er synlig"],
  conclusionPrompt: "Skriv en kort begrunnet konklusjon til spørsmålet: Var tidlige bysamfunn først og fremst et resultat av kontroll, samarbeid eller en kombinasjon? Bruk minst tre konkrete spor, ett forbehold og én alternativ forklaring.",
  modelResponse: {
    observations: "I Mesopotamia beskrives store bosetninger, monumentale bygg, produksjonsområder og registreringsspor. Ved Mohenjo-daro beskrives gater, hushold, brønner og sammenkoblede dreneringsanlegg. I Caral-Supe beskrives plattformhauger, sirkulære plasser, flere bosetninger, fiske, irrigasjon og planteproduksjon.",
    interpretation: "Sporene kan støtte at mennesker, aktiviteter og ressurser måtte koordineres i større bosetninger. Koordineringen kan ha vært lokal, sentralisert, regional eller en kombinasjon.",
    reservation: "Likheter i stor skala og organisering betyr ikke at caseområdene fulgte samme utviklingskjede. De hadde ulike ressurser, perioder og dokumentasjonsforhold.",
    limitation: "Materialet kan ikke bevise én konge, én stat, samme religion, moderne helseeffekt, tvang eller hvordan alle grupper opplevde fordelingen.",
  },
  rubric: ["minst tre navngitte og konkrete spor", "tydelig skille mellom observasjon og tolkning", "sammenligning av minst to case uten å gjøre likhet til identitet", "minst ett «kan» eller «mulig» der materialet er åpent", "én setning om hva kildene ikke kan bevise", "en revidert formulering som presiserer første svar"],
  sourceIds: ["2-3-k-02", "2-3-k-03", "2-3-k-04", "2-3-k-06", "2-3-k-07", "2-3-k-08", "2-3-k-09", "2-3-k-11"],
  progressVersion: 1,
  lastChecked: "26. august 2026",
};

const sourceRights: Record<string, string> = {
  udir: "Institusjonell offentlig kilde; kun referanse og egen pedagogisk formulering, ingen medier kopiert.",
  openstax: "OpenStax CC BY-NC-SA 4.0; ingen tekst eller medier kopiert, kun kildebasert parafrase og kreditering.",
  catalhoyuk: "UNESCO-beskrivelsen er merket CC-BY-SA IGO 3.0; ingen medier kopiert, kreditering beholdt.",
  "catalhoyuk-guide": "Lisensstatus ikke dokumentert av utgiver; ingen bilder kopiert, norsk parafrase og kreditering.",
  "gobekli-unesco": "UNESCO-beskrivelsen er merket CC-BY-SA IGO 3.0; ingen medier kopiert, kreditering beholdt.",
  "dai-gobekli": "DAI-institusjonsside; kun kort, egen parafrase og lenke, ingen medier kopiert.",
  "gobekli-grain": "PLOS ONE CC BY 4.0; ingen figur eller annet medieinnhold kopiert, egen parafrase og kreditering.",
  zeder: "Fagfellevurdert artikkel brukt som referanse; ingen tekst eller medier kopiert, egen parafrase og kreditering.",
  denham: "Fagfellevurdert artikkel brukt som referanse; ingen tekst eller medier kopiert, egen parafrase og kreditering.",
  "holocene-ics": "Offisiell tabell brukt som referanse; ingen medieinnhold kopiert, datering kontrollert og kilde lenket.",
  "scientific-reports": "Scientific Reports CC BY 4.0; ingen tekst, figurer eller medier kopiert, egen parafrase og kreditering.",
};

export const historiskMetode: Chapter = {
  id: "1.1",
  number: "1.1",
  slug: "1-1-hva-kan-vi-vite-om-fortiden",
  sectionSlug: "01-historiefaglig-grunnlag",
  title: "Hva kan vi vite om fortiden?",
  shortIntro: "Fortiden er borte, men spor er bevart. I dette kapitlet lærer du å gjøre spørsmål, opphav, kontekst, sammenstilling og forbehold til deler av ett begrunnet historisk svar.",
  guidingQuestion: "Hvordan bygges et historisk svar av spørsmål, kilder, kontekst, sammenstilling og forbehold?",
  priorKnowledge: {
    prompt: "Tenk på gårsdagen: Hvilke spor finnes, hvem skapte dem, og hva ville en ukjent person fortsatt ikke kunne vite?",
    cues: ["Skill mellom det sporet viser og det du husker eller antar.", "Finn én stemme eller erfaring som lett mangler.", "Formuler ett spørsmål som kan undersøkes med sporene."],
  },
  period: "Historisk metode på tvers av tid; elevundersøkelsen er avgrenset til Manzanar 1942–45.",
  geography: "Metode på tvers av steder; case: Manzanar, Owens Valley, California, USA.",
  status: "published",
  learningGoals: [
    "Formulere og avgrense et historisk spørsmål.",
    "Skille observasjon, tolkning og det et materiale ikke kan bevise.",
    "Forklare opphav, kontekst, bevaring, representativitet og fravær.",
    "Bruke levning og beretning som kildefunksjoner, ikke faste materialtyper.",
    "Sammenstille ulike materialer og skrive en begrunnet konklusjon med forbehold.",
    "Revidere et historisk svar når kildebruk eller påstand går for langt.",
  ],
  competenceGoals: [
    "reflektere over hvordan fortiden former oss som mennesker",
    "utforske fortiden ved å stille spørsmål og innhente, tolke og bruke ulikt historisk materiale for å finne svar",
  ],
  facts: [
    { text: "Et historisk materiale brukes som kilde i forhold til et spørsmål; materialet gir ikke ett ferdig svar av seg selv.", sourceIds: ["M-02", "P-01"] },
    { text: "Levning og beretning beskriver funksjoner i historikerens bruk av materialet, ikke faste og gjensidig utelukkende materialtyper.", sourceIds: ["M-02", "S-01"] },
    { text: "Historisk resonnering omfatter blant annet spørsmål, kildebruk, kontekstualisering, argumentasjon og metakunnskap.", sourceIds: ["P-01"] },
    { text: "Sammenstilling betyr å sammenligne materialers opphav, utsagn, utsnitt og begrensninger mot samme spørsmål; uenighet kan også være et resultat.", sourceIds: ["P-01", "P-02"] },
    { text: "Manzanar var i drift fra 21. mars 1942 til 21. november 1945, og NPS oppgir at 11 070 mennesker ble fengslet/tvangsinternerte der.", sourceIds: ["H-01", "H-04"] },
    { text: "Boligområdet var organisert i 36 blokker med brakker og fellesfunksjoner innenfor leirens kontrollerte rom.", sourceIds: ["H-02", "H-05"] },
    { text: "De fire elevmaterialene har ulike kildevinduer: et fysisk leirspor undersøkt i 2010, en avis og et fotografi fra 1942 og en administrativ sluttregistrering fra 1945.", sourceIds: ["M-01", "W-01", "V-01", "Q-01"] },
    { text: "Q-01s kontrollerte aggregat har 11 070 rader, 10 875 kjente destinasjonsstater, 5 965 CA, 4 910 andre kjente verdier og 195 blanke felt.", sourceIds: ["Q-01"] },
  ],
  concepts: [
    { term: "Historisk spørsmål", definition: "Et avgrenset spørsmål om fortiden som styrer hvilke materialer, begreper og sammenligninger som er relevante." },
    { term: "Kilde/materiale", definition: "Et bevart spor eller produkt som brukes til å begrunne et svar på et historisk spørsmål." },
    { term: "Opphav", definition: "Hvem eller hva som skapte materialet, når, hvor og i hvilken situasjon." },
    { term: "Kontekst", definition: "Historiske, sosiale, materielle og institusjonelle sammenhenger som gjør materialet forståelig." },
    { term: "Observasjon", definition: "En beskrivelse av noe som faktisk kan registreres i materialet før betydningen forklares." },
    { term: "Tolkning", definition: "En begrunnet forklaring av hva et observert spor kan bety i forhold til spørsmålet." },
    { term: "Levning/spor", definition: "Materialet brukt som rest eller produkt av situasjonen der det ble skapt, brukt eller bevart." },
    { term: "Beretning", definition: "Materialets meddelende utsagn brukt som opplysning om det utsagnet handler om." },
    { term: "Sammenstilling/korroborering", definition: "Å prøve ulike materialers utsagn, utsnitt, opphav og begrensninger mot samme spørsmål." },
    { term: "Representativitet", definition: "Hvor langt et materiale eller utvalg med rimelighet kan brukes utover det konkrete tilfellet." },
    { term: "Fravær", definition: "Det som ikke er bevart, registrert, valgt eller synlig; fravær er en begrensning og ikke automatisk et motbevis." },
    { term: "Usikkerhet", definition: "En presis angivelse av hvor sterkt belegg en påstand har, hvilke alternativer som finnes og hva som ikke kan avgjøres." },
    { term: "Begrunnet konklusjon", definition: "Et svar som kobler påstand og konkrete belegg, viser styrkegrad og sier hva materialet ikke kan bevise." },
  ],
  narrative: [
    {
      heading: "Fortiden er borte – sporene er ikke svar",
      paragraphs: [
        { text: "Historikere kan ikke gå tilbake og observere fortiden direkte. De arbeider med materialer som er skapt, valgt, bevart og formidlet i bestemte situasjoner. Et materiale blir relevant som kilde når vi stiller det et spørsmål.", sourceIds: ["M-02", "P-01"] },
        { text: "Derfor er «Hva kan vi vite?» ikke et spørsmål med svaret «alt» eller «ingenting». Vi kan begrunne noen påstander sterkere enn andre når vi viser konkrete spor, kontekst og begrensninger.", sourceIds: ["P-01", "U-01"] },
      ],
    },
    {
      heading: "Spørsmålet bestemmer kildefunksjonen",
      paragraphs: [
        { text: "En avis kan brukes som beretning når vi undersøker hva den meddeler om et møte. Den samme avisen kan brukes som levning når vi undersøker redaksjon, ordvalg og institusjonell organisering. Funksjonen følger spørsmålet, ikke materialtypen.", sourceIds: ["M-02", "S-01"] },
        { text: "Dette betyr ikke at alle spørsmål passer like godt. Et fotografi kan vise synlige romlige trekk, men er dårlig egnet til å avgjøre private tanker. En administrativ tabell kan vise registrerte kategorier, men ikke automatisk menneskers motiv.", sourceIds: ["P-01", "V-01", "Q-01"] },
      ],
    },
    {
      heading: "Observer før du forklarer",
      paragraphs: [
        { text: "Observasjon beskriver et registrert trekk: en betongform, en avisoverskrift, en barrakke i et utsnitt eller et antall blanke felt. Tolkning knytter trekket til spørsmålet, for eksempel som mulig spor etter lokal praksis eller administrativ kategorisering.", sourceIds: ["M-02", "M-01", "W-01", "V-01", "Q-01"] },
        { text: "Skillet er analytisk, ikke absolutt. Også observasjon styres av begreper og utvalg. Likevel tvinger rekkefølgen oss til å vise hva påstanden bygger på før vi forklarer hva sporet kan bety.", sourceIds: ["M-02", "P-01"] },
      ],
    },
    {
      heading: "Opphav, kontekst og formidlingsvei",
      paragraphs: [
        { text: "M-01 er et fysisk leirspor undersøkt gjennom senere arkeologi. W-01 er en redigert lokal avis. V-01 er et oppdragsbundet fotografisk utsnitt. Q-01 er et administrativt register som senere er transkribert og aggregert. Ulike opphav krever ulike kontrollspørsmål.", sourceIds: ["M-01", "W-01", "V-01", "Q-01"] },
        { text: "Formidlingsveien er også del av kildekritikken. Et objekt i jordlag, en digital transkripsjon, en skannet katalogvisning og en CSV er ikke nøytrale beholdere. Bevaring og utvalg gjør noe synlig og lar annet bli borte.", sourceIds: ["M-01", "W-01", "V-01", "Q-01", "P-01"] },
      ],
    },
    {
      heading: "Sammenstill uten å telle stemmer",
      paragraphs: [
        { text: "Korroborering betyr ikke at tre kilder «slår» én. Materialene kan være avhengige av samme institusjon, belyse ulike skalaer eller motsi hverandre fordi de har forskjellig formål. Sammenlign derfor opphav, utsagn, utsnitt og fravær mot det samme spørsmålet.", sourceIds: ["P-01", "P-02"] },
        { text: "I Manzanar-undersøkelsen kan V-01 og Q-01 belyse romlige og administrative rammer, mens M-01 og W-01 åpner for avgrensede spørsmål om materiell og organisatorisk praksis. Det er en forsiktig syntese, ikke en komplett tidsserie eller en fortelling om alles hverdag.", sourceIds: ["H-01", "M-01", "W-01", "V-01", "Q-01"] },
      ],
    },
    {
      heading: "Representativitet, fravær og usikkerhet",
      paragraphs: [
        { text: "Ett hageanlegg kan være svært godt dokumentert og likevel lite representativt for hele leiren. En tabell med mange rader kan dekke en stor administrativ registrering og likevel mangle motiv, erfaring og utvikling over tid. Rekkevidde må vurderes i forhold til spørsmålet.", sourceIds: ["P-01", "M-01", "Q-01"] },
        { text: "Det som ikke finnes i materialet, er ikke automatisk bevis for at noe ikke skjedde. Interiør utenfor fotografiets utsnitt, stemmer utenfor avisen og 195 blanke felt må behandles som konkret fravær med flere mulige forklaringer.", sourceIds: ["W-01", "V-01", "Q-01"] },
      ],
    },
    {
      heading: "Historiske svar former også nåtiden",
      paragraphs: [
        { text: "Hvordan vi navngir og avgrenser fortiden, påvirker hvilke mennesker og handlinger som blir synlige. I dette kapitlet brukes «tvangsinternering» eller «fengsling», mens samtidige institusjonelle uttrykk undersøkes som historisk språk, ikke gjentas som nøytrale kategorier.", sourceIds: ["H-01", "H-02", "W-01", "U-01"] },
        { text: "En begrunnet konklusjon er derfor både kunnskap og ansvar: Den skal si hva som støttes, hvor sterkt, hvilke alternativer som finnes, og hva materialene ikke avgjør. Revisjon gjør denne usikkerheten tydeligere i stedet for å skjule den.", sourceIds: ["P-01", "U-01"] },
      ],
    },
  ],
  causes: [
    "Et avgrenset spørsmål gjør bestemte sider av et materiale relevante.",
    "Konkrete observasjoner gir etterprøvbare holdepunkter.",
    "Opphav, kontekst og formidlingsvei viser hvordan materialet ble skapt og bevart.",
    "Sammenstilling kan styrke, nyansere eller utfordre en foreløpig påstand.",
  ],
  effects: [
    "Materialutvalg og kildevinduer begrenser hvilke personer, tider og erfaringer som blir synlige.",
    "Representativitetsproblemer stopper generalisering fra ett tilfelle til alle.",
    "Fravær krever alternative forklaringer og kan ikke fylles med gjetning.",
    "En historisk konklusjon må uttrykke styrkegrad og det som ikke kan avgjøres.",
  ],
  continuities: [
    "Materialets konkrete opphav og dokumentasjonsvei må holdes fast når spørsmålet eller tolkningen endres.",
    "Skillet mellom belegg og påstand gjelder for fysiske, skriftlige, visuelle og kvantitative materialer.",
    "Alle historiske svar må kunne revideres når nye spørsmål, spor eller bedre begrunnelser kommer til.",
  ],
  breaks: [
    "Det samme materialet kan få en annen kildefunksjon når undersøkelsesspørsmålet endres.",
    "Nye materialtyper kan flytte oppmerksomheten fra enkeltsted til offentlig språk, rom eller aggregert mønster.",
    "En revisjon kan endre påstandens styrke uten at de underliggende observasjonene endres.",
  ],
  causeChain: ["Avgrens spørsmålet", "Observer konkrete spor", "Undersøk opphav og kontekst", "Prøv påstander og alternativer", "Sammenstill ulike materialer", "Konkluder med forbehold og revider"],
  sourceLooks: [
    { label: "M-01 · Materielt/arkeologisk spor", period: "Leirperioden 1942–45; undersøkt 2010", place: "Block 15, Manzanar", sourceIds: ["M-01"], evidence: ["dam-/hageanlegg ved én leilighet", "betongform og øy-/skallopert kant", "husholdningsrelaterte gjenstander i øvre fyll"], supports: "Noen beboere kan ha formet et avgrenset uteområde innenfor leirens rammer.", cannotProve: "Opphavsperson, motiv, følelser, frivillighet eller representativitet." },
    { label: "W-01 · Skriftlig dokument", period: "24. oktober 1942", place: "Manzanar", sourceIds: ["W-01"], evidence: ["masthead", "stoff om selvstyre, blokk-møter og komité", "hagekonkurranse og praktiske meldinger"], supports: "Organisering og informasjon ble formulert og distribuert i en lokal offentlighet.", cannotProve: "Enighet, faktisk deltakelse, virkning eller alle stemmer." },
    { label: "V-01 · Visuelt materiale", period: "April–juli 1942", place: "Manzanar", sourceIds: ["V-01"], evidence: ["barrakker/boliger", "utendørs rom og avstander", "landskap og fotografisk utsnitt"], supports: "Et valgt utsnitt kan brukes i en avgrenset vurdering av romlig organisering og dokumentasjonsblikk.", cannotProve: "Interiør, privat erfaring, hele leiren eller alle perioder." },
    { label: "Q-01 · Kvantitativt materiale", period: "November 1945", place: "Administrativ sluttregistrering for Manzanar", sourceIds: ["Q-01"], evidence: ["11 070 rader", "10 875 kjente destinasjonsstater", "5 965 CA, 4 910 andre kjente og 195 blanke"], supports: "Administrasjonen registrerte destinasjon gjennom kategorier ved leirens avslutning.", cannotProve: "Motiv, varig destinasjon, hele befolkningsforløpet eller individuell erfaring." },
  ],
  sourceIntroduction: "Fire materialtyper belyser samme avgrensede Manzanar-spørsmål fra ulike kildevinduer. Les først hva som faktisk er registrert. Undersøk deretter opphav, formidlingsvei, representativitet og fravær før du tolker. Ingen av materialene er en komplett tidsserie eller et representativt bilde av alle.",
  sourceWorkshops: [sourceWorkshop1_1],
  understandingLabels: {
    heading: "Fra materiale til begrunnet historisk svar",
    intro: "Et historisk svar blir sterkere når sammenhengen mellom spørsmål, spor og forbehold er synlig.",
    leftTitle: "Det som styrker et svar",
    rightTitle: "Det som begrenser et svar",
    chainTitle: "Arbeidskjeden",
    chainIntro: "Rekkefølgen er en læringsmodell. I faktisk historisk arbeid kan du gå fram og tilbake mellom leddene.",
    comparisonTitle: "Når spørsmålet endres",
    breaksTitle: "Det som kan endre seg",
    continuitiesTitle: "Det som må holdes fast",
  },
  longLineIds: ["demografi", "kommunikasjon-og-kulturmoter", "makt-og-legitimering"],
  longLinesPrompt: "Bruk metodebegrepene til å undersøke hvordan registrering, kommunikasjon og romlig kontroll kan bli synlige i lange linjer – og hvordan skiftende kilder gjør at noen mennesker, erfaringer og motiver forblir fraværende.",
  reviewPlan: [
    { label: "Nå", text: "Lukk teksten og tegn arbeidskjeden fra spørsmål til revisjon. Legg inn ett kildebegrep ved hvert ledd." },
    { label: "Om 2–3 dager", text: "Gjør F1–F5 uten å lese først. Bruk hint bare etter første feil." },
    { label: "Om 1–2 uker", text: "Hent fram U2 og K3. Forklar representativitet og fravær med to forskjellige materialtyper." },
    { label: "Senere", text: "Åpne den lokalt lagrede verkstedteksten og revider én ny setning etter at du har arbeidet med kilder i et annet kapittel." },
  ],
  summary: [
    "Historiske spørsmål styrer hvilke materialer og sider av materialet som blir relevante.",
    "Observasjon, tolkning og det en kilde ikke kan bevise må skilles tydelig.",
    "Levning og beretning er funksjoner i forhold til spørsmål, ikke faste kildetyper.",
    "Opphav, kontekst, bevaring og formidlingsvei påvirker hva materialet kan støtte.",
    "Sammenstilling krever sammenligning av opphav, utsnitt og begrensninger – ikke flertallsavstemning.",
    "Representativitet, fravær, usikkerhet og reell revisjon er deler av et begrunnet historisk svar.",
  ],
  timeline: [
    { sortKey: 19420321, date: "21. mars 1942", title: "Manzanar tas i bruk", description: "NPS bruker datoen som startpunkt for leirens drift; konteksten avgrenser materialundersøkelsen.", sourceIds: ["H-01", "H-04"] },
    { sortKey: 19420401, date: "april–juli 1942", title: "Dorothea Lange fotograferer ved Manzanar", description: "V-01 er ett oppdragsbundet fotografisk utsnitt fra leirens første måneder.", sourceIds: ["V-01"] },
    { sortKey: 19421024, date: "24. oktober 1942", title: "Manzanar Free Press vol. II nr. 41", description: "W-01 publiserer stoff om organisering, møter, komitéarbeid og hverdagsordninger.", sourceIds: ["W-01"] },
    { sortKey: 19451101, date: "november 1945", title: "Final Accountability Roster", description: "Q-01 er en administrativ sluttregistrering, ikke en fortløpende folketelling eller erfaringskilde.", sourceIds: ["Q-01", "Q-02"] },
    { sortKey: 20100000, date: "2010", title: "Arkeologisk undersøkelse i Block 15", description: "NPS undersøker fysiske leirspor; undersøkelsestidspunktet må skilles fra sporenes historiske tid.", sourceIds: ["M-01"] },
  ],
  tasks: tasks1_1,
  progressVersion: 1,
  teacherGuide: teacherGuide1_1,
  sources: [
    { id: "U-01", title: "Utdanningsdirektoratet · Kompetansemål og vurdering, Historie Vg2 HIS01-03", href: "https://www.udir.no/lk20/his01-03/kompetansemaal-og-vurdering/kv84?lang=nob", note: "Gjeldende bokmålsformulering av KM1, KM2 og relevante vurderingspassasjer; læreplan, ikke historisk belegg om Manzanar.", rights: "Offentlig forvaltningsside; korte nødvendige målformuleringer; kontrollert 27. august 2026." },
    { id: "P-01", title: "van Drie og van Boxtel (2008) · Historical Reasoning: Towards a Framework for Analyzing Students’ Reasoning about the Past", href: "https://doi.org/10.1007/s10648-007-9056-1", note: "Forskningsrammeverk for spørsmål, kildebruk, kontekstualisering, argumentasjon, begreper og metakunnskap.", rights: "Springer-siden oppgir CC BY-NC 2.0; egen norsk parafrase; kontrollert 27. august 2026." },
    { id: "P-02", title: "Digital Inquiry Group · History Lessons", href: "https://www.inquirygroup.org/history-lessons", note: "Pedagogisk designreferanse for sentralt spørsmål, sourcing, contextualization, corroboration og evidensbasert svar.", rights: "Åpen beskrivelse; egne formuleringer, ingen leksjonsfiler eller postere kopiert; kontrollert 27. august 2026." },
    { id: "M-02", title: "Ottar Dahl (1966–67) · Terminologi og systematikk i kildeteorien", href: "https://tidsskrift.dk/historiejyskesamling/article/download/38515/41662?inline=1", note: "Metodestøtte for kilde relativt til problem, levning/beretning som funksjon og ledd i kildegransking.", rights: "Åpent tilgjengelig tidsskriftartikkel; kort egen parafrase; kontrollert 27. august 2026." },
    { id: "S-01", title: "Kjersheim og Roos · levning (historievitenskap), Store norske leksikon", href: "https://snl.no/levning_-_historievitenskap", note: "Norsk oppslagsstøtte for at samme materiale kan undersøkes som levning eller beretning.", rights: "SNL oppgir fri gjenbruk; egen kort parafrase og kreditering; kontrollert 27. august 2026." },
    { id: "H-01", title: "National Park Service · Manzanar National Historic Site", href: "https://www.nps.gov/places/manzanar-national-historic-site.htm", note: "Sted, driftsperiode, konteksttall og institusjonell oversikt.", rights: "U.S. Government-side; tekst parafrasert, ingen medier kopiert; kontrollert 27. august 2026." },
    { id: "H-02", title: "National Park Service · Japanese Americans at Manzanar", href: "https://www.nps.gov/manz/learn/historyculture/japanese-americans-at-manzanar.htm", note: "Bakgrunn om WRA, boligblokker, fellesfunksjoner, aktiviteter og befolkningsendringer.", rights: "U.S. Government-side; egen parafrase, medieinnhold ikke kopiert; kontrollert 27. august 2026." },
    { id: "H-04", title: "National Park Service · Timeline: Manzanar 1942–1945", href: "https://home.nps.gov/articles/000/timeline-manzanar-1942-1945.htm", note: "Kontrollpunkter for start, befolkningsutvikling og stenging.", rights: "U.S. Government-side; egen parafrase og lenke; kontrollert 27. august 2026." },
    { id: "H-05", title: "National Park Service · Manzanar camp layout", href: "https://www.nps.gov/articles/000/manzanar-camp-layout.htm", note: "Romlig bakgrunn om leirens utstrekning, 36 boligblokker, brakker og fellesfunksjoner.", rights: "NPS-tekst parafrasert; kart og illustrasjoner ikke kopiert; kontrollert 27. august 2026." },
    { id: "M-01", title: "National Park Service · Community archaeology at Manzanar", href: "https://www.nps.gov/articles/community-archeology-at-manzanar.htm", note: "Hovedkilde for Block 15-anlegget, 2010-undersøkelsen og skillet mellom konkret funn og bredere hageprosjekt.", rights: "NPS-tekst parafrasert; bilder og tredjepartsmateriale ikke kopiert; kontrollert 27. august 2026." },
    { id: "W-01", title: "Manzanar Free Press, vol. II nr. 41, 24. oktober 1942 · Densho ddr-densho-125-1", href: "https://ddr.densho.org/ddr-densho-125-1/", note: "Objektmetadata, masthead og kort parafrase av stoff om møter, komitéarbeid og hverdagsordninger.", rights: "Arbeidet oppgis fri for kjente opphavsrettsbegrensninger; Densho-grensesnitt CC BY-NC-SA 4.0; Courtesy of Densho; kontrollert 27. august 2026." },
    { id: "V-01", title: "Dorothea Lange · Japanese relocation, California. A view of the quarters at Manzanar…, LOC 2017699966", href: "https://www.loc.gov/item/2017699966/", note: "Ekstern katalogpost for ett fotografisk utsnitt, april–juli 1942; ingen lokal bildekopi.", rights: "LOC item Rights Advisory viser til samlingssiden; FSA/OWI-samlingen beskrives som public domain; ingen CC-lisens påstås; kontrollert 28. august 2026." },
    { id: "Q-01", title: "WRA/NARA · Final Accountability Roster, FAR Manzanar CSV via Densho Names Registry", href: "https://ddr.densho.org/names/", note: "Separat CSV transkribert fra NARA-mikrofilm av NPS-ansatte i 2002; bare aggregater fra f_destinationstate brukes. SHA-256 47B861F15809EC0CF60213A7D6A514B98AE2B065CEE7D8D621BE84BE97332B72.", rights: "Densho oppgir CC0 for nedlastbart ikke-Ancestry-datasett; ingen rådata eller personopplysninger gjengis; kontrollert 28. august 2026." },
    { id: "Q-02", title: "National Archives · Records of the War Relocation Authority, Record Group 210", href: "https://www.archives.gov/research/guide-fed-records/groups/210.html", note: "Arkivproveniens for statistiske rapporter og final accountability rosters; brukes ikke som elevdatasett.", rights: "Offentlig NARA-katalogside; referanse og egen parafrase; kontrollert 27. august 2026." },
  ],
  lastChecked: "30. august 2026",
};

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
    { text: "Befolkninger kunne vokse selv om enkeltmennesker fikk mer ensidig kosthold og hardere arbeid; dette er målt på vekst-, kroppsmasse- og isotopdata fra det sentrale Middelhavsområdet. Tettere bosetning kan i tillegg ha økt smittepresset.", sourceIds: ["scientific-reports", "openstax"] },
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
  sourceWorkshops: [sourceWorkshop2_2],
  longLineIds: ["mat-og-naturressurser", "demografi", "handel-og-okonomi", "kommunikasjon-og-kulturmoter", "makt-og-legitimering"],
  summary: [
    "Jordbruket utviklet seg gradvis og på ulike måter i flere deler av verden.",
    "Domestisering forandret både planter, dyr og menneskenes levemåte.",
    "Jordbruk kunne gi mer mat per areal og støtte større, bofaste befolkninger.",
    "Overskudd og lagring kunne bidra til arbeidsdeling, eiendom og forskjeller i makt.",
    "Overgangen hadde også kostnader: hardt arbeid, sykdom, ensidig kosthold og sterkere naturinngrep.",
  ],
  reviewPlan: [
    { label: "Nå", text: "Lukk fagteksten og gjenfortell de fem punktene i oppsummeringen med egne ord." },
    { label: "Om 2–3 dager", text: "Gjør faktaoppgavene på nytt uten å lese først. Bruk bare hint hvis du står fast." },
    { label: "Om 1–2 uker", text: "Svar på framskrittsspørsmålet og kildeoppgaven på nytt. Sammenlign begrunnelse, eksempler og forbehold." },
  ],
  timeline: [
    { sortKey: -9700, date: "ca. 9700 f.Kr.", title: "Holocen begynner", description: "Holocen begynner – formelt datert til 11 700 år før nåtid, altså ca. 9700 f.Kr. Varmere og ofte mer stabile lokale miljøer endrer ressursgrunnlaget.", sourceIds: ["holocene-ics", "openstax"] },
    { sortKey: -9600, date: "ca. 9600–8800 f.Kr.", title: "Dyrking av ville kornslag", description: "Mennesker sår og høster ville kornslag i deler av Sørvest-Asia før plantene er biologisk domestiserte.", sourceIds: ["zeder", "openstax"] },
    { sortKey: -9600, date: "ca. 9600–8200 f.Kr.", title: "Göbekli Tepe", description: "Monumentale fellesprosjekter viser at samarbeid og store anlegg ikke kan plasseres i en enkel trapp etter jordbruket.", sourceIds: ["gobekli-unesco", "dai-gobekli"] },
    { sortKey: -8700, date: "ca. 8700–8000 f.Kr.", title: "Domestiserte kornslag, sau og geit", description: "Hvete og bygg får domestiserte trekk, mens sau og geit holdes i flokk. Tidspunktet varierer mellom regioner.", sourceIds: ["zeder"] },
    { sortKey: -8000, date: "ca. 8000–3000 f.Kr.", title: "Flere regionale jordbrukssystemer", description: "Ris, hirse, mais, squash, bønner, potet, quinoa, banan, taro og yam blir viktige i ulike regioner.", sourceIds: ["openstax", "denham"] },
    { sortKey: -7400, date: "ca. 7400–6200 f.Kr.", title: "Çatalhöyük", description: "En stor, tett og langvarig bosetning kombinerer flere matstrategier.", sourceIds: ["catalhoyuk", "catalhoyuk-guide"] },
    { sortKey: -3500, date: "fram mot ca. 3500–3000 f.Kr.", title: "Større bysamfunn noen steder", description: "Overskudd, spesialisering og maktkonsentrasjon blir viktig i noen områder, men ikke som automatisk følge overalt.", sourceIds: ["openstax"] },
  ],
  tasks: tasks2_2,
  progressVersion: 2,
  teacherGuide: teacherGuide2_2,
  sources: ([
    { id: "udir", title: "Utdanningsdirektoratet · Kompetansemål etter vg2 (HIS01-03)", href: "https://www.udir.no/lk20/his01-03/kompetansemaal-og-vurdering/kv84", note: "Gjeldende kompetansemål og føringer for underveisvurdering i historie vg2." },
    { id: "openstax", title: "OpenStax · World History Volume 1: 2.3 The Neolithic Revolution", href: "https://openstax.org/books/world-history-volume-1/pages/2-3-the-neolithic-revolution", note: "Åpen læreboktekst om neolittisk tid og konsekvenser av overgangen." },
    { id: "catalhoyuk", title: "UNESCO · Neolithic Site of Çatalhöyük", href: "https://whc.unesco.org/en/list/1405/", note: "Verdensarvstedets beskrivelse av den østre haugens neolittiske lag og husklynger." },
    { id: "catalhoyuk-guide", title: "Çatalhöyük Research Project · Site Guide Book", href: "https://catalhoyuk.ku.edu.tr/sites/default/files/Catalhoyuk-Guidebook-ENGLISH.pdf", note: "Åpen prosjektguide som dekker lagring, matbehandling, obsidian, husgulvbegravelser og utveksling. Lisensstatus ikke dokumentert av utgiver." },
    { id: "gobekli-unesco", title: "UNESCO · Göbekli Tepe", href: "https://whc.unesco.org/en/list/1572/", note: "Verdensarvstedets beskrivelse av monumentale anlegg og den tradisjonelle jeger- og sankertolkningen." },
    { id: "dai-gobekli", title: "Deutsches Archäologisches Institut · Göbekli Tepe", href: "https://www.dainst.org/en/research/projects/noslug/5746", note: "Forskningsprosjektets oversikt over pågående dokumentasjon, geofysiske undersøkelser og nytolkninger." },
    { id: "gobekli-grain", title: "Dietrich m.fl. · Cereal processing at Early Neolithic Göbekli Tepe", href: "https://doi.org/10.1371/journal.pone.0215214", note: "Fagfellevurdert studie av omfattende kornbearbeiding og behovet for en mer integrert tolkning av rituelle og hverdagslige aktiviteter." },
    { id: "zeder", title: "Zeder (2008) · Domestication and early agriculture in the Mediterranean Basin", href: "https://doi.org/10.1073/pnas.0801317105", note: "Fagfellevurdert oversikt over dyrking, flokkforvaltning og domestisering i Middelhavsområdet." },
    { id: "denham", title: "Denham m.fl. (2003) · Origins of agriculture at Kuk Swamp", href: "https://doi.org/10.1126/science.1085255", note: "Fagfellevurdert studie av uavhengig jordbruksutvikling på Ny-Guinea; dokumenterer banan og tidlig bruk av taro." },
    { id: "holocene-ics", title: "International Commission on Stratigraphy · GSSP tables", href: "https://stratigraphy.org/gssps/", note: "Offisiell stratigrafisk datering av Holocens base til 11 700 år før 2000 (b2k)." },
    { id: "scientific-reports", title: "Parkinson m.fl. (2023) · Multiproxy bioarchaeological data reveals interplay between growth, diet and population dynamics across the transition to farming in the central Mediterranean", href: "https://www.nature.com/articles/s41598-023-49406-5", note: "Forskning på forholdet mellom vekst, kosthold og demografi gjennom overgangen til jordbruk i det sentrale Middelhavsområdet." },
  ]).map((source) => ({ ...source, rights: sourceRights[source.id] })),
  lastChecked: "22. august 2026",
};

export const byerUtenEnOppskrift: Chapter = {
  id: "2.3",
  number: "2.3",
  slug: "2-3-byer-uten-en-oppskrift",
  sectionSlug: "02-fra-jegere-til-bysamfunn",
  title: "Byer uten én oppskrift: mennesker, ressurser og makt i tidlige bysamfunn",
  shortIntro: "Hvordan kunne mennesker bygge og opprettholde store bosetninger, og hva kan materielle spor fortelle om samarbeid, ressurser og makt?",
  guidingQuestion: "Hvordan kunne noen steder bli byer uten at jordbruk, stat og makt fulgte én fast oppskrift?",
  priorKnowledge: {
    prompt: "Hent fram det du husker fra 2.2 om lagring, arbeidsdeling, bofasthet og mulige utviklingskjeder.",
    cues: ["Hva kan et omland bidra med til en større bosetning?", "Må jordbruk alltid føre til by eller stat?", "Hva er forskjellen på et funn, en tolkning og det en kilde ikke kan bevise?"],
  },
  period: "Omtrent fjerde til andre årtusen f.Kr., med regionale intervaller",
  geography: "Sørlige og nordlige Mesopotamia, Indusdalen i dagens Pakistan og nordvestlige India, samt Supe-dalen på nord-sentrale kysten av Peru",
  status: "published",
  learningGoals: [
    "plassere de tre caseområdene på tidslinje og forklare hvorfor intervaller overlapper",
    "bruke et arbeidsbegrep for by, urbanisering, omland og institusjon",
    "gjøre rede for dokumenterte trekk ved Mesopotamia, Mohenjo-daro og Caral-Supe",
    "forklare hvordan ressurser, arbeid, forbindelser og institusjoner kunne organiseres ulikt",
    "skille observasjon, tolkning, syntese og det materialet ikke kan avgjøre",
    "sammenligne uten å rangere og skrive en begrenset konklusjon med forbehold",
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
    { text: "Tidlig urbanisering må undersøkes som flere historiske prosesser; «by» er et analytisk arbeidsbegrep og ikke en universell innbyggertallgrense.", sourceIds: ["2-3-k-02"] },
    { text: "Store bosetninger, monumentale bygg, produksjonsområder og registreringsspor finnes i både sørlige og nordlige Mesopotamia i fjerde årtusen f.Kr.", sourceIds: ["2-3-k-03", "2-3-k-04"] },
    { text: "Mohenjo-daro har dokumenterte gater, hus og kvartaler, brønner, bad-/vaskeplattformer og dreneringsspor.", sourceIds: ["2-3-k-06", "2-3-k-07"] },
    { text: "Caral-Supe omfatter et større bosetningslandskap med plattformhauger, nedsenkede sirkulære plasser og bolig- og ikke-boligbygg.", sourceIds: ["2-3-k-09", "2-3-k-10"] },
    { text: "Caral-Supe forbindes i kildene med en lokal kombinasjon av marine ressurser, irrigasjon og planteproduksjon.", sourceIds: ["2-3-k-09", "2-3-k-11"] },
    { text: "En by er avhengig av omland, ressurser, arbeid og forbindelser, men omland betyr ikke nødvendigvis politisk underordning.", sourceIds: ["2-3-k-02", "2-3-k-03"] },
    { text: "Infrastruktur og monumenter kan støtte tolkninger om koordinering, men avgjør ikke alene hvem som bestemte, hvordan makt ble legitimert eller hvordan alle opplevde ordningen.", sourceIds: ["2-3-k-04", "2-3-k-07", "2-3-k-08"] },
    { text: "Miljøendring i Supe-området kan ha bidratt til senere omforming, men kilden støtter ikke en enkel eller eneste «kollaps»-forklaring.", sourceIds: ["2-3-k-11"] },
    { text: "Sammenligningen av tre case viser mulige mønstre og tydelige brudd, men kan ikke beskrive alle tidlige bysamfunn.", sourceIds: ["2-3-k-02", "2-3-k-03", "2-3-k-07", "2-3-k-09", "2-3-k-11"] },
  ],
  concepts: [
    { term: "By", definition: "Et analytisk arbeidsbegrep for en bosetning der mennesker, aktiviteter og/eller institusjoner er konsentrert og virker inn på et større omland. Ingen terskel passer alle perioder og regioner." },
    { term: "Urbanisering", definition: "En prosess der mennesker, bosetning, aktiviteter eller institusjoner samles og organiseres på nye måter. Det er ikke bare et spørsmål om innbyggertall." },
    { term: "Omland", definition: "Området som forsyner, bruker eller påvirkes av en sentral bosetning. Omland betyr ikke nødvendigvis politisk underordning." },
    { term: "Institusjon", definition: "En varig ordning, praksis eller organisasjon som samordner handlinger, ressurser eller forventninger." },
    { term: "Stat", definition: "En historisk og analytisk kategori for politisk organisering. Monumenter og administrative spor kan støtte en tolkning av sentralisering, men beviser ikke alene en bestemt statstype." },
    { term: "Sivilisasjon", definition: "En senere samle- og vurderingskategori som ikke skal brukes som synonym for avansert eller som en universell utviklingstrapp." },
    { term: "Registrering", definition: "At informasjon blir materialisert gjennom tegn, avtrykk eller andre systemer. Registrering sier ikke automatisk hva tegnene betydde eller hvem som brukte dem." },
    { term: "Koordinering", definition: "At mennesker eller grupper samordner arbeid, ressurser eller handlinger. Koordinering kan skje gjennom flere politiske og sosiale ordninger." },
    { term: "Syntese", definition: "En begrenset sammenstilling av flere spor og tolkninger som viser både mønstre, forskjeller og kildebegrensninger." },
    { term: "Periodisering", definition: "Å dele fortiden inn etter valgte kriterier. Regionale intervaller kan overlappe uten å utgjøre én global startdato." },
  ],
  narrative: [
    {
      heading: "Hva mener vi med by?",
      paragraphs: [
        { text: "Ordet «by» kan brukes på flere måter. I dette kapitlet undersøker vi en bosetning der mennesker, aktiviteter og/eller institusjoner er konsentrert og virker inn på et større omland. Det er et arbeidsbegrep: Det hjelper oss å stille spørsmål, men er ikke en naturlov eller en universell innbyggertallgrense.", sourceIds: ["2-3-k-02"] },
        { text: "En slik definisjon gjør to kriterier synlige. Vi kan spørre om mennesker er samlet i en større bosetning, og om bestemte aktiviteter eller institusjoner har virkninger utover de enkelte husholdene. Et sted kan derfor være viktig i et nettverk selv om vi ikke kan rekonstruere én stat eller én hersker.", sourceIds: ["2-3-k-02"] },
      ],
    },
    {
      heading: "Fra 2.2 til større bosetninger",
      paragraphs: [
        { text: "I 2.2 møtte du lagring, arbeidsdeling og omland som mulige deler av historiske utviklingskjeder. Når mennesker og aktiviteter samles, må mat, vann, råvarer, arbeid og informasjon på en eller annen måte forbindes. Det betyr ikke at jordbruk automatisk skapte byer. Det betyr at vi må undersøke hvilke ressurser og ordninger som faktisk finnes i hvert case.", sourceIds: ["2-3-k-02", "2-3-k-03"] },
        { text: "Et omland er heller ikke bare en leverandør til en by. Mennesker i omlandet kan bruke, påvirke og forhandle med den sentrale bosetningen. Derfor skal «omland» ikke automatisk bety provins, underordning eller én bestemt politisk relasjon.", sourceIds: ["2-3-k-02", "2-3-k-03"] },
      ],
    },
    {
      heading: "Mesopotamia: flere urbane prosesser",
      paragraphs: [
        { text: "Uruk er en kjent referanse for urban vekst i sørlige Mesopotamia. Kildene beskriver store bosetninger, monumentale bygg, produksjonsområder og registreringsspor. Slike spor kan støtte at aktiviteter og institusjoner ble samlet på en skala som kan beskrives som tidlig urbanisering.", sourceIds: ["2-3-k-03", "2-3-k-04"] },
        { text: "Samtidig viser forskning på nordlige Mesopotamia store og mangfoldige bosetninger og lokale urbane prosesser i samme brede periode. Kontakt mellom nord og sør kan ha vært viktig, men kontakt er ikke det samme som at ett sentrum forklarer alle andre. «Administrasjon», «stat» og «by» er tolkende kategorier som må brukes med forbehold.", sourceIds: ["2-3-k-03", "2-3-k-04"] },
      ],
    },
    {
      heading: "Mohenjo-daro: by med infrastruktur",
      paragraphs: [
        { text: "Ved Mohenjo-daro beskrives murte hus og kvartaler, gater, brønner, bad-/vaskeplattformer og dreneringsanlegg. Dette er materielle spor som gjør det rimelig å undersøke hvordan mange hushold kunne forholde seg til sammenkoblede infrastrukturer.", sourceIds: ["2-3-k-06", "2-3-k-07"] },
        { text: "Dreneringen avgjør likevel ikke hvor effektivt systemet var etter moderne helsekriterier. Den avgjør heller ikke om ordningen var lokal, sentralisert eller blandet. «Priest-king» skal derfor presenteres som en eldre eller omstridt tolkning, mens hus, gater og drenering beskrives som spor.", sourceIds: ["2-3-k-07", "2-3-k-08"] },
      ],
    },
    {
      heading: "Caral-Supe: bylandskap uten standardpakken",
      paragraphs: [
        { text: "Caral-Supe på nord-sentrale kysten av Peru beskrives som et større landskap med flere urbane steder, monumental stein- og jordarkitektur, plattformhauger og nedsenkede sirkulære plasser. UNESCO bruker også kategorier som «sivilisasjon» og «stat». I elevteksten merker vi disse som institusjonelle eller ettertidige kategorier, ikke som en universell utviklingstrapp.", sourceIds: ["2-3-k-09", "2-3-k-10"] },
        { text: "Ressursgrunnlaget viser en annen kombinasjon enn den mesopotamiske fortellingen: intensivt fiske, irrigert dyrking, bomull, matvekster og store monumentale bosetninger. Det gjør ikke Caral-Supe til en motsats uten forbindelser, men viser at stor skala ikke krever én fast pakke av arter, keramikk, skrift eller politiske uttrykk.", sourceIds: ["2-3-k-09", "2-3-k-11"] },
      ],
    },
    {
      heading: "Sammenlign uten å rangere",
      paragraphs: [
        { text: "Mesopotamia, Mohenjo-daro og Caral-Supe har spor av konsentrerte aktiviteter og store prosjekter. Men sporene er ulike: registrering og produksjonsområder i Mesopotamia, gater og drenering ved Mohenjo-daro, og plattformhauger, sirkulære plasser og et regionalt ressursnettverk i Caral-Supe.", sourceIds: ["2-3-k-02", "2-3-k-03", "2-3-k-07", "2-3-k-09", "2-3-k-11"] },
        { text: "En likhet kan derfor gi et godt spørsmål, men ikke en ferdig årsak. Ulike ressurser, perioder, dokumentasjonsforhold og politiske ordninger kan ha ført til at lignende problemer ble håndtert på forskjellige måter.", sourceIds: ["2-3-k-02", "2-3-k-04", "2-3-k-07"] },
      ],
    },
    {
      heading: "Byer, makt og sårbarhet",
      paragraphs: [
        { text: "Monumenter, registrering og infrastruktur kan vise at arbeid, ressurser eller informasjon ble organisert. De avgjør ikke alene hvem som bestemte, hvordan makt ble legitimert eller om arbeid var frivillig, pålagt eller en blanding. Fravær av et identifisert palass er heller ikke bevis for fravær av maktforskjeller.", sourceIds: ["2-3-k-04", "2-3-k-07", "2-3-k-08"] },
        { text: "Større bosetninger kunne samle utveksling og samarbeid, men kunne også kreve vedlikehold, arbeid og håndtering av tetthet, ressursavhengighet og ulik fordeling. I Supe-området argumenterer forskere for at jordskjelv, El Niño-flom, strandvoller og sanddyner kan ha bidratt til senere omforming. Det er en hypotese om mulig bidrag, ikke en enkel kollapsårsak.", sourceIds: ["2-3-k-02", "2-3-k-11"] },
      ],
    },
  ],
  causes: [
    "Ressursgrunnlag og forbindelser mellom bosetning, omland, vann, råvarer og arbeid.",
    "Mennesker, aktiviteter og institusjoner samles på nye måter.",
    "Behov for å vedlikeholde infrastruktur, registrering, produksjon eller offentlige rom.",
    "Lokale valg og ulike former for koordinering, kontroll eller gjensidighet.",
  ],
  effects: [
    "Større konsentrasjon av mennesker, aktiviteter og institusjoner.",
    "Muligheter for utveksling, samarbeid, spesialisering og felles infrastruktur.",
    "Arbeidskrav, vedlikehold, ressursavhengighet og mulige forskjeller i fordeling.",
    "Sårbarhet for miljøendring, forsyningsbrudd eller tetthet, med regionale variasjoner.",
    "Nye spørsmål om makt og styring som materielle spor sjelden avgjør alene.",
  ],
  continuities: [
    "Byer var fortsatt avhengige av omland, jord, vann, råvarer, arbeid og forbindelser.",
    "Lokale ressurser og praksiser fortsatte å forme hvordan større bosetninger fungerte.",
    "Samarbeid, kontroll og gjensidighet kan ha eksistert samtidig i ulike kombinasjoner.",
  ],
  breaks: [
    "Mennesker, aktiviteter og institusjoner ble noen steder samlet tettere i større bosetninger.",
    "Infrastruktur og monumentale prosjekter fikk virkninger på tvers av mange hushold eller steder.",
    "By og omland ble knyttet sammen gjennom nye former for registrering, arbeid og ressursflyt.",
  ],
  causeChain: ["Ressursgrunnlag og forbindelser", "Mennesker og aktiviteter samles", "Infrastruktur og institusjoner må vedlikeholdes", "Ulike former for koordinering og kontroll", "Mulige forskjeller i arbeid, ressurser og makt"],
  sourceLooks: [
    { label: "Kilde A · Uruk og nordlige Mesopotamia", period: "Fjerde årtusen f.Kr.", place: "Sørlige og nordlige Mesopotamia", sourceIds: ["2-3-k-03", "2-3-k-04"], evidence: ["store bosetningsarealer og monumentale bygg", "produksjonsområder", "administrative gjenstander eller registreringsspor"], supports: "Aktiviteter og institusjoner var samlet på en skala som kan beskrives som tidlig urbanisering.", cannotProve: "Én konge, én stat, én religion, «verdens første by» eller at nord var en passiv mottaker." },
    { label: "Kilde B · Mohenjo-daro", period: "Ca. 2600–1900 f.Kr.", place: "Indusdalen", sourceIds: ["2-3-k-06", "2-3-k-07", "2-3-k-08"], evidence: ["murte hus og kvartaler", "gater, brønner og bad-/vaskeplattformer", "sammenkoblede dreneringsspor"], supports: "Mange hushold og grupper kan ha måttet forholde seg til felles eller sammenkoblede infrastrukturer.", cannotProve: "Moderne hygiene, bedre helse for alle, prestekonge, fravær av hierarki eller lik erfaring." },
    { label: "Kilde C · Caral-Supe", period: "Ca. 3000–1800 f.Kr. i UNESCOs ramme", place: "Supe-dalen, Peru", sourceIds: ["2-3-k-09", "2-3-k-10", "2-3-k-11"], evidence: ["plattformhauger og nedsenkede sirkulære plasser", "bolig- og ikke-boligbygg og flere bosetninger", "marine ressurser, irrigasjon og planteproduksjon"], supports: "Monumentale prosjekter kunne inngå i en regional ressurskombinasjon som ikke fulgte en mesopotamisk standardpakke.", cannotProve: "Én konge, tvang, fast klassestruktur, én religion eller miljøendring som eneste forklaring." },
  ],
  reviewPlan: [
    { label: "Nå", text: "Lukk fagteksten og tegn tre bokser: spor, tolkning, begrensning. Fyll inn ett eksempel fra hvert case." },
    { label: "Om 2–3 dager", text: "Hent fram F1–F6 uten å lese først. Bruk bare hint etter første feil." },
    { label: "Om 1–2 uker", text: "Svar på L2 eller L4 på nytt og sammenlign hvilke case og forbehold du faktisk brukte." },
    { label: "Senere", text: "Hent fram K4 og revider én setning som gikk for langt. Koble urbanisering til én lang linje fra 2.2." },
  ],
  sourceWorkshops: [sourceWorkshop2_3],
  longLineIds: ["mat-og-naturressurser", "demografi", "handel-og-okonomi", "kommunikasjon-og-kulturmoter", "makt-og-legitimering", "religion-og-identitet"],
  summary: ["Tidlige bysamfunn utviklet seg i flere regioner og etter ulike forløp.", "En by kan undersøkes som konsentrasjon av mennesker, aktiviteter og institusjoner, men begrepet må tilpasses spørsmål og kilde.", "Byer var avhengige av omland, ressurser, arbeid og forbindelser.", "Infrastruktur og monumenter kan vise koordinering, men avgjør ikke alene hvem som bestemte eller hvordan fordeler ble fordelt.", "Sammenligning av Mesopotamia, Mohenjo-daro og Caral-Supe viser både mulige mønstre og historisk variasjon."],
  timeline: [
    { sortKey: -4000, date: "ca. 4000 f.Kr.", title: "Store og komplekse bosetninger i nordlige Mesopotamia", description: "Store bosetninger og institusjonelle trekk viser at tidlig urbanisering ikke må fortelles som én sørmesopotamisk oppfinnelse.", sourceIds: ["2-3-k-03"] },
    { sortKey: -3500, date: "ca. 3500–3100 f.Kr.", title: "Uruk-periodens urbane vekst og registrering", description: "Større bosetning, monumental arkitektur og administrative spor kan undersøkes uten å gjøre én stat til automatisk forklaring.", sourceIds: ["2-3-k-03", "2-3-k-04"] },
    { sortKey: -3000, date: "ca. 3000–1800 f.Kr.", title: "Caral-Supe og flere urbane bosetninger i Supe-området", description: "Monumental og urban organisering inngår i Andes med en annen ressurskombinasjon enn Mesopotamia.", sourceIds: ["2-3-k-09", "2-3-k-11"] },
    { sortKey: -2600, date: "ca. 2600–1900 f.Kr.", title: "Moden urbanisering i Indusdalen", description: "Mohenjo-daros gater, hus og drenering åpner for spørsmål om kollektiv handling og styring.", sourceIds: ["2-3-k-06", "2-3-k-07", "2-3-k-08"] },
    { sortKey: -1900, date: "etter ca. 1900 f.Kr.", title: "Urban omforming og miljømessig sårbarhet i Supe-området", description: "Miljøendring kan ha bidratt til omforming, men kilden støtter ikke en enkel kollapsforklaring.", sourceIds: ["2-3-k-11"] },
  ],
  tasks: tasks2_3,
  progressVersion: 1,
  teacherGuide: teacherGuide2_3,
  sources: [
    { id: "2-3-k-01", title: "Utdanningsdirektoratet · Kompetansemål etter vg2 – Læreplan i historie fellesfag (HIS01-03)", href: "https://www.udir.no/lk20/his01-03/kompetansemaal-og-vurdering/kv84", note: "Offisiell læreplanside for kompetansekobling og underveisvurdering; ikke historisk dokumentasjon.", rights: "Offentlig institusjonell referansekilde; korte nødvendige målhenvisninger; kontrollert 25. august 2026." },
    { id: "2-3-k-02", title: "Fernández-Götz og Smith (2024) · The Archaeology of Early Cities: “What Is the City but the People?”", href: "https://doi.org/10.1146/annurev-anthro-041222-094823", note: "Fagfellevurdert komparativ oversikt, fulltekst lest; støtter definisjon og sammenligningsmetode, men ingen universell årsakskjede.", rights: "CC BY 4.0; egen norsk parafrase; tredjepartsmateriale kan ha egne vilkår; kontrollert 25. august 2026." },
    { id: "2-3-k-03", title: "McMahon (2020) · Early Urbanism in Northern Mesopotamia", href: "https://doi.org/10.1007/s10814-019-09136-7", note: "Fagfellevurdert oversikt, fulltekst lest; støtter nordlige prosesser, lokale variasjoner og omland i fjerde årtusen f.Kr.", rights: "CC BY 4.0; egen parafrase, ingen figurer; kontrollert 25. august 2026." },
    { id: "2-3-k-04", title: "Ur (2014) · Households and the Emergence of Cities in Ancient Mesopotamia", href: "https://doi.org/10.1017/S095977431400047X", note: "Fagfellevurdert studie, fulltekst lest; støtter Uruk/Tell Brak og problematiserer projisering av senere statsmodeller.", rights: "Cambridge terms-felt, ikke dokumentert åpen gjenbrukslisens; referanse og egen kort parafrase; kontrollert 25. august 2026." },
    { id: "2-3-k-05", title: "Emberling (2015) · Mesopotamian cities and urban process, 3500–1600BCE", href: "https://doi.org/10.1017/CHO9781139035606.016", note: "Akademisk bokkapittel brukt som bibliografisk kontrollspor; sammendrag alene bærer ikke sentrale elevpåstander.", rights: "Cambridge terms-felt; referansebruk og egen parafrase; kontrollert 25. august 2026." },
    { id: "2-3-k-06", title: "UNESCO · Archaeological Ruins at Moenjodaro", href: "https://whc.unesco.org/en/list/138", note: "Institusjonell stedbeskrivelse av Mohenjo-daro, gater, bygg, brønner, offentlige bad og dreneringsspor; bare delvis utgravet.", rights: "CC-BY-SA IGO 3.0 for stedbeskrivelsen; ingen UNESCO-/NHK-medier; egen parafrase; kontrollert 25. august 2026." },
    { id: "2-3-k-07", title: "Green (2021; online 2020) · Killing the Priest-King: Addressing Egalitarianism in the Indus Civilization", href: "https://doi.org/10.1007/s10814-020-09147-9", note: "Fagfellevurdert artikkel, fulltekst lest; drøfter drenering, kollektiv handling og den omstridte prestekonge-tolkningen.", rights: "CC BY 4.0; egen parafrase, ingen figurer; kontrollert 25. august 2026." },
    { id: "2-3-k-08", title: "Green (2022) · Of Revenue Without Rulers: Public Goods in the Egalitarian Cities of the Indus Civilization", href: "https://doi.org/10.3389/fpos.2022.823071", note: "Fagfellevurdert åpen artikkel, fulltekst lest; viser at offentlige goder ikke automatisk krever en påvist herskende elite.", rights: "CC BY 4.0; egen parafrase, ingen bilder eller figurer; kontrollert 25. august 2026." },
    { id: "2-3-k-09", title: "UNESCO · Sacred City of Caral-Supe", href: "https://whc.unesco.org/en/list/1269", note: "Institusjonell stedbeskrivelse av omtrent 18 urbane steder, monumental arkitektur og UNESCOs ca. 3000–1800 f.Kr.-ramme.", rights: "CC-BY-SA IGO 3.0 for stedbeskrivelsen; UNESCOs kategorier merkes som kategorier; ingen medier; kontrollert 25. august 2026." },
    { id: "2-3-k-10", title: "Shady Solís, Haas og Creamer (2001) · Dating Caral, a Preceramic Site in the Supe Valley on the Central Coast of Peru", href: "https://doi.org/10.1126/science.1059519", note: "Fagfellevurdert radiokarbondateringsstudie brukt som støtte- og kontrollspor; sammendraget bærer ikke påstander om makt eller økonomi alene.", rights: "Ingen åpen lisens registrert i Crossref; referanse og egen parafrase, ingen tabell eller figur; kontrollert 25. august 2026." },
    { id: "2-3-k-11", title: "Sandweiss, Shady Solís, Moseley, Keefer og Ortloff (2009) · Environmental change and economic development in coastal Peru between 5,800 and 3,600 years ago", href: "https://doi.org/10.1073/pnas.0812645106", note: "Fagfellevurdert fulltekst lest; støtter ressurskombinasjon og hypotesen om mulig miljøbidrag til senere omforming.", rights: "Fulltekst via PMC, men ingen åpen lisens registrert i Crossref; egen parafrase, ingen figurer; kontrollert 25. august 2026." },
    { id: "2-3-k-12", title: "Haas, Creamer og Ruiz (2004) · Dating the Late Archaic occupation of the Norte Chico region in Peru", href: "https://doi.org/10.1038/nature03146", note: "Kronologi- og kontrollspor basert på metadata og sammendrag; brukes ikke alene for politisk, økonomisk eller sosial forklaring.", rights: "Springer TDM-felt, ikke generell åpen gjenbrukslisens; referansebruk og egen parafrase; kontrollert 25. august 2026." },
  ],
  lastChecked: "26. august 2026",
};

export const chapters = [historiskMetode, jordbruksrevolusjonen, byerUtenEnOppskrift];

export const curriculumSections = curriculumSectionDefinitions.map((section) => ({
  ...section,
  chapters: chapters.filter((chapter) => chapter.sectionSlug === section.slug),
}));

const publicAssetPaths = new Set(["/favicon.svg", "/og.png"]);
const teacherAssessmentAreas: TeacherAssessmentCriterion["area"][] = [
  "Faktakunnskap",
  "Historiske begreper",
  "Årsaker og virkninger",
  "Kildebruk",
  "Konkrete eksempler",
  "Nyansering og historisk usikkerhet",
];

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validateSectionIds(chapterId: string, label: string, sectionIds: unknown, issues: string[]) {
  if (!Array.isArray(sectionIds) || sectionIds.length === 0) {
    issues.push("Lærerelementet " + label + " i " + chapterId + " mangler kapittelseksjon");
    return;
  }
  for (const sectionId of sectionIds) {
    if (typeof sectionId !== "string" || !chapterSectionIds.includes(sectionId as ChapterSectionId)) {
      issues.push("Ukjent kapittelseksjon i lærerelementet " + label + " for " + chapterId + ": " + String(sectionId));
    }
  }
}

function validateStringList(chapterId: string, label: string, values: unknown, issues: string[]) {
  if (!Array.isArray(values) || values.length === 0 || values.some((value) => !hasText(value))) {
    issues.push("Lærerelementet " + label + " i " + chapterId + " mangler tekst");
  }
}
const workshopClassifications: WorkshopClaimClassification[] = ["direct", "possible", "too-strong", "cannot-determine"];
function validateSourceRights(label: string, rights: unknown, issues: string[]) {
  if (typeof rights !== "object" || rights === null || Array.isArray(rights)) {
    issues.push("Kildematerialet " + label + " mangler rettighetsinformasjon");
    return;
  }
  const candidate = rights as Partial<SourceRights>;
  for (const [field, value] of [["opphav", candidate.rightsHolder], ["originaladresse", candidate.originalUrl], ["lisensstatus", candidate.licenseStatus], ["kreditering", candidate.credit], ["bearbeiding", candidate.adaptation], ["kontrolldato", candidate.checked]] as const) {
    if (!hasText(value)) issues.push("Kildematerialet " + label + " mangler " + field);
  }
  if (hasText(candidate.originalUrl) && !candidate.originalUrl.startsWith("https://")) issues.push("Kildematerialet " + label + " må bruke HTTPS i originaladressen");

}
export function getSourceWorkshopIssues(
  chapterId: string,
  workshop: SourceWorkshop | undefined,
  availableSourceIds: Iterable<string>,
  availablePublicAssets: ReadonlySet<string> = publicAssetPaths,
) {
  const issues: string[] = [];
  if (!workshop) {
    issues.push("Publisert kapittel " + chapterId + " mangler kildeverksted");
    return issues;
  }
  if (workshop.chapterId !== chapterId) issues.push("Kildeverkstedet " + workshop.id + " er koblet til feil kapittel");
  if (workshop.sectionId !== "kildeverksted") issues.push("Kildeverkstedet " + workshop.id + " peker til ukjent kapittelseksjon");
  for (const [label, value] of [["ID", workshop.id], ["tittel", workshop.title], ["hovedspørsmål", workshop.guidingQuestion], ["siste faglige kontroll", workshop.lastChecked]] as const) {
    if (!hasText(value)) issues.push("Kildeverkstedet for " + chapterId + " mangler " + label);
  }
  validateStringList(chapterId, "læringsmål i kildeverkstedet", workshop.learningGoals, issues);
  validateStringList(chapterId, "begrensninger i kildeverkstedet", workshop.context?.limitations, issues);
  validateStringList(chapterId, "sammenstillingskriterier", workshop.synthesisCriteria, issues);
  validateStringList(chapterId, "vurderingskriterier i kildeverkstedet", workshop.rubric, issues);
  const minimumMaterials = workshop.synthesisMinimumMaterials ?? 2;
  if (!Number.isInteger(minimumMaterials) || minimumMaterials < 2 || minimumMaterials > (workshop.materials?.length ?? 0)) issues.push("Kildeverkstedet for " + chapterId + " har ugyldig materialkrav");
  const wordRange = workshop.conclusionWordRange;
  if (wordRange && (!Number.isInteger(wordRange.min) || !Number.isInteger(wordRange.max) || wordRange.min < 15 || wordRange.max < wordRange.min)) issues.push("Kildeverkstedet for " + chapterId + " har ugyldig ordkrav");
  const sourceIds = new Set(availableSourceIds);
  for (const sourceId of workshop.sourceIds ?? []) {
    if (!sourceIds.has(sourceId)) issues.push("Ukjent kilde-ID i kildeverkstedet for " + chapterId + ": " + sourceId);
  }
  if (!workshop.sourceIds?.length) issues.push("Kildeverkstedet for " + chapterId + " mangler kildekobling");
  const materialIds = new Set<string>();
  let hasLimitation = false;
  for (const material of workshop.materials ?? []) {
    if (materialIds.has(material.id)) issues.push("Duplisert material-ID i kildeverkstedet for " + chapterId + ": " + material.id);
    materialIds.add(material.id);
    for (const [label, value] of [["ID", material.id], ["etikett", material.label], ["type materiell kilde", material.materialType], ["datering", material.date], ["funnsted", material.place], ["funnkontekst", material.findContext], ["bevaring", material.preservation], ["dokumentasjon", material.documentedDescription], ["dokumentert av", material.documentedBy], ["kildebegrensning", material.cannotProve]] as const) {
      if (!hasText(value)) issues.push("Materialet " + (material.id || "ukjent") + " i " + chapterId + " mangler " + label);
    }
    if (!material.possibleObservations?.length) issues.push("Materialet " + material.id + " mangler mulige observasjoner");
    if (!material.supportedInterpretations?.length) issues.push("Materialet " + material.id + " mangler forsvarlige tolkninger");
    if (!material.alternativeInterpretations?.length) issues.push("Materialet " + material.id + " mangler alternative tolkninger");
    if (Object.prototype.hasOwnProperty.call(material, "observation") || Object.prototype.hasOwnProperty.call(material, "interpretation")) issues.push("Materialet " + material.id + " må skille observasjon og tolkning i separate felt");
    const observations = new Set(material.possibleObservations ?? []);
    if ((material.supportedInterpretations ?? []).some((interpretation) => observations.has(interpretation))) issues.push("Materialet " + material.id + " blander identisk observasjon og tolkning");
    if (hasText(material.cannotProve)) hasLimitation = true;
    for (const sourceId of material.sourceIds ?? []) {
      if (!sourceIds.has(sourceId)) issues.push("Ukjent kilde-ID i materialet " + material.id + ": " + sourceId);
    }
    validateSourceRights(material.label || material.id, material.rights, issues);
    if (material.externalLink) {
      if (!hasText(material.externalLink.label)) issues.push("Eksternlenken for " + material.id + " mangler etikett");
      if (!material.externalLink.href.startsWith("https://")) issues.push("Eksternlenken for " + material.id + " må bruke HTTPS");
    }
    if (material.media) {
      if (!availablePublicAssets.has(material.media.path)) issues.push("Mediefilen for " + material.id + " finnes ikke i public: " + material.media.path);
      if (!hasText(material.media.altText)) issues.push("Mediefilen for " + material.id + " mangler alternativtekst");
      validateSourceRights(material.id + " medie", material.media.rights, issues);
    }
  }
  if (!workshop.materials?.length) issues.push("Kildeverkstedet for " + chapterId + " mangler kildemateriale");
  if (!hasLimitation) issues.push("Kildeverkstedet for " + chapterId + " må ha minst én kildebegrensning");
  const claimIds = new Set<string>();
  const classifications = new Set<WorkshopClaimClassification>();
  for (const claim of workshop.claims ?? []) {
    if (claimIds.has(claim.id)) issues.push("Duplisert påstands-ID i kildeverkstedet for " + chapterId + ": " + claim.id);
    claimIds.add(claim.id);
    if (!hasText(claim.text) || !hasText(claim.explanation)) issues.push("Påstand " + (claim.id || "ukjent") + " mangler tekst eller forklaring");
    if (!workshopClassifications.includes(claim.classification)) issues.push("Påstand " + claim.id + " har ugyldig klassifisering");
    classifications.add(claim.classification);
    for (const sourceId of claim.sourceIds ?? []) if (!sourceIds.has(sourceId)) issues.push("Ukjent kilde-ID i påstand " + claim.id + ": " + sourceId);
  }
  if (!workshop.claims || workshop.claims.length < 4) issues.push("Kildeverkstedet for " + chapterId + " trenger minst fire faglig ulike påstander");
  for (const classification of workshopClassifications) if (!classifications.has(classification)) issues.push("Kildeverkstedet mangler en påstand av typen " + classification);
  const response = workshop.modelResponse;
  if (!response || !hasText(response.observations) || !hasText(response.interpretation) || !hasText(response.reservation) || !hasText(response.limitation)) issues.push("Kildeverkstedet for " + chapterId + " mangler komplett modellrespons");
  if (!hasText(workshop.conclusionPrompt)) issues.push("Kildeverkstedet for " + chapterId + " mangler konklusjonsspørsmål");
  return issues;
}

export function getTeacherGuideIssues(chapterId: string, teacherGuide: TeacherGuide | undefined) {
  const issues: string[] = [];
  if (!teacherGuide) {
    issues.push("Publisert kapittel " + chapterId + " mangler lærerdata");
    return issues;
  }
  if (!hasText(teacherGuide.overview)) issues.push("Læreroversikten for " + chapterId + " mangler kapitteloversikt");
  if (!teacherGuide.sourceWorkshop) {
    issues.push("Læreroversikten for " + chapterId + " mangler verkstedveiledning");
  } else {
    for (const [label, value] of [["verksted-ID", teacherGuide.sourceWorkshop.workshopId], ["hensikt", teacherGuide.sourceWorkshop.purpose], ["anbefalt plass", teacherGuide.sourceWorkshop.recommendedPlacement]] as const) {
      if (!hasText(value)) issues.push("Verkstedveiledningen for " + chapterId + " mangler " + label);
    }
    validateStringList(chapterId, "skillet mellom observasjon og tolkning", teacherGuide.sourceWorkshop.distinctions, issues);
    validateStringList(chapterId, "vanlige verkstedmisforståelser", teacherGuide.sourceWorkshop.commonMisreadings, issues);
    validateStringList(chapterId, "samtalespørsmål for kildeverkstedet", teacherGuide.sourceWorkshop.discussionQuestions, issues);
    validateStringList(chapterId, "vurderingskriterier for kildeverkstedet", teacherGuide.sourceWorkshop.assessmentCriteria, issues);
    validateStringList(chapterId, "kildegrunnlag for kildeverkstedet", teacherGuide.sourceWorkshop.sourceIds, issues);
  }
  if (!Array.isArray(teacherGuide.teachingPhases) || teacherGuide.teachingPhases.length < 3) {
    issues.push("Læreroversikten for " + chapterId + " mangler undervisningsfaser");
  } else {
    const phaseIds = new Set<string>();
    for (const phase of teacherGuide.teachingPhases) {
      if (!hasText(phase.id) || phaseIds.has(phase.id)) issues.push("Undervisningsfase med tom eller duplisert ID i " + chapterId);
      phaseIds.add(phase.id);
      for (const [label, value] of [["tittel", phase.title], ["varighet", phase.duration], ["formål", phase.purpose]] as const) {
        if (!hasText(value)) issues.push("Undervisningsfasen " + (phase.id || "ukjent") + " i " + chapterId + " mangler " + label);
      }
      validateStringList(chapterId, "lærerhandlinger i " + (phase.id || "ukjent"), phase.teacherActions, issues);
      validateStringList(chapterId, "elevhandlinger i " + (phase.id || "ukjent"), phase.studentActions, issues);
      validateSectionIds(chapterId, "undervisningsfase " + (phase.id || "ukjent"), phase.sectionIds, issues);
    }
  }
  if (!teacherGuide.priorKnowledgeActivation || !hasText(teacherGuide.priorKnowledgeActivation.prompt)) {
    issues.push("Læreroversikten for " + chapterId + " mangler forkunnskapsaktivering");
  } else {
    validateStringList(chapterId, "forkunnskapsaktivering", teacherGuide.priorKnowledgeActivation.cues, issues);
    validateSectionIds(chapterId, "forkunnskapsaktivering", teacherGuide.priorKnowledgeActivation.sectionIds, issues);
  }
  if (!teacherGuide.textWork) {
    issues.push("Læreroversikten for " + chapterId + " mangler arbeid underveis i fagteksten");
  } else {
    validateStringList(chapterId, "arbeid underveis i fagteksten", teacherGuide.textWork.instructions, issues);
    validateSectionIds(chapterId, "arbeid underveis i fagteksten", teacherGuide.textWork.sectionIds, issues);
  }
  if (!teacherGuide.taskUse) {
    issues.push("Læreroversikten for " + chapterId + " mangler oppgavebruk");
  } else {
    for (const [label, value] of [["rekkefølge", teacherGuide.taskUse.sequence], ["første forsøk", teacherGuide.taskUse.firstAttempt], ["nytt forsøk", teacherGuide.taskUse.retry], ["åpne svar", teacherGuide.taskUse.openResponses]] as const) {
      if (!hasText(value)) issues.push("Oppgavebruken for " + chapterId + " mangler " + label);
    }
    validateSectionIds(chapterId, "oppgavebruk", teacherGuide.taskUse.sectionIds, issues);
  }
  if (!teacherGuide.selfAssessmentAndReview) {
    issues.push("Læreroversikten for " + chapterId + " mangler egenvurdering og repetisjon");
  } else {
    validateStringList(chapterId, "egenvurdering", teacherGuide.selfAssessmentAndReview.selfAssessment, issues);
    validateStringList(chapterId, "repetisjon", teacherGuide.selfAssessmentAndReview.repetition, issues);
    validateSectionIds(chapterId, "egenvurdering og repetisjon", teacherGuide.selfAssessmentAndReview.sectionIds, issues);
  }
  if (!Array.isArray(teacherGuide.misconceptions) || teacherGuide.misconceptions.length === 0) {
    issues.push("Læreroversikten for " + chapterId + " mangler misoppfatninger");
  } else {
    teacherGuide.misconceptions.forEach((item, index) => {
      for (const [label, value] of [["forestilling", item.belief], ["hvorfor", item.whyUnderstandable], ["avdekkende spørsmål", item.diagnosticQuestion], ["respons", item.response]] as const) {
        if (!hasText(value)) issues.push("Misoppfatning " + (index + 1) + " i " + chapterId + " mangler " + label);
      }
    });
  }
  if (!Array.isArray(teacherGuide.assessmentCriteria) || teacherGuide.assessmentCriteria.length === 0) {
    issues.push("Læreroversikten for " + chapterId + " mangler vurderingskriterier");
  } else {
    const areas = new Set<string>();
    for (const criterion of teacherGuide.assessmentCriteria) {
      if (!teacherAssessmentAreas.includes(criterion.area)) issues.push("Ukjent vurderingsområde i " + chapterId + ": " + criterion.area);
      if (areas.has(criterion.area)) issues.push("Duplisert vurderingsområde i " + chapterId + ": " + criterion.area);
      areas.add(criterion.area);
      if (!hasText(criterion.shortAnswer) || !hasText(criterion.extendedAnswer)) issues.push("Vurderingsområdet " + criterion.area + " i " + chapterId + " mangler kriterietekst");
    }
    for (const area of teacherAssessmentAreas) if (!areas.has(area)) issues.push("Vurderingsområdet " + area + " mangler i " + chapterId);
  }
  if (teacherGuide.adaptation) {
    validateStringList(chapterId, "tilpasningsstøtte", teacherGuide.adaptation.supports, issues);
    validateStringList(chapterId, "utvidelsesstøtte", teacherGuide.adaptation.extensions, issues);
  }
  if (!Array.isArray(teacherGuide.resources) || teacherGuide.resources.length === 0) {
    issues.push("Læreroversikten for " + chapterId + " mangler ressursmarkører");
  } else {
    teacherGuide.resources.forEach((resource, index) => {
      if (!hasText(resource.label) || !hasText(resource.description)) issues.push("Lærerressurs " + (index + 1) + " i " + chapterId + " mangler tekst");
      if (resource.visibility !== "public" && resource.visibility !== "local") issues.push("Lærerressurs " + (index + 1) + " i " + chapterId + " har ugyldig synlighet");
      if (resource.visibility === "local") {
        if (resource.href || resource.sectionId) issues.push("Lokal lærerressurs " + (resource.label || index + 1) + " i " + chapterId + " kan ikke ha offentlig lenke");
      } else {
        if (resource.href && resource.sectionId) issues.push("Offentlig lærerressurs " + (resource.label || index + 1) + " i " + chapterId + " har to lenkemål");
        if (!resource.href && !resource.sectionId) issues.push("Offentlig lærerressurs " + (resource.label || index + 1) + " i " + chapterId + " mangler lenkemål");
        if (resource.sectionId && !chapterSectionIds.includes(resource.sectionId)) issues.push("Offentlig lærerressurs " + (resource.label || index + 1) + " peker til ukjent seksjon");
        if (resource.href) {
          const path = resource.href.split("#")[0];
          if (path.startsWith("/") && !publicAssetPaths.has(path)) issues.push("Offentlig lærerressurs " + (resource.label || index + 1) + " peker til manglende fil: " + path);
          if (!path.startsWith("/") && !path.startsWith("https://")) issues.push("Offentlig lærerressurs " + (resource.label || index + 1) + " må bruke HTTPS eller rot-relativ sti");
        }
      }
    });
  }
  return issues;
}

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
      if (!hasText(source.rights)) issues.push(`Kilden «${source.title}» mangler rettighetsstatus`);
      sourceIds.add(source.id);
    }
    for (const claim of chapter.facts) {
      if (!claim.text.trim() || claim.sourceIds.length === 0) issues.push(`Faktapunkt i ${chapter.id} mangler tekst eller kildekobling`);
      for (const sourceId of claim.sourceIds) if (!sourceIds.has(sourceId)) issues.push(`Ukjent kilde-ID i faktapunkt for ${chapter.id}: ${sourceId}`);
    }
    let previousSortKey: number | undefined;
    for (const narrativeSection of chapter.narrative) {
      for (const paragraph of narrativeSection.paragraphs) {
        if (typeof paragraph === "string") continue;
        if (!paragraph.text.trim() || paragraph.sourceIds.length === 0) issues.push(`Fagtekst i ${chapter.id} mangler tekst eller kildekobling`);
        for (const sourceId of paragraph.sourceIds) if (!sourceIds.has(sourceId)) issues.push(`Ukjent kilde-ID i fagtekst for ${chapter.id}: ${sourceId}`);
      }
    }

    for (const point of chapter.timeline) {
      if (!Number.isInteger(point.sortKey)) issues.push(`Tidslinjepunktet «${point.title}» i ${chapter.id} mangler gyldig sortKey`);
      if (previousSortKey !== undefined && point.sortKey < previousSortKey) issues.push(`Tidslinjen i ${chapter.id} er ikke sortert på sortKey`);
      previousSortKey = point.sortKey;
      if (point.sourceIds.length === 0) issues.push(`Tidslinjepunktet «${point.title}» i ${chapter.id} mangler kildekobling`);
      for (const sourceId of point.sourceIds) if (!sourceIds.has(sourceId)) issues.push(`Ukjent kilde-ID i tidslinjen for ${chapter.id}: ${sourceId}`);
    }
    for (const sourceLook of chapter.sourceLooks) {
      for (const sourceId of sourceLook.sourceIds) if (!sourceIds.has(sourceId)) issues.push(`Ukjent kilde-ID i kildeblikket for ${chapter.id}: ${sourceId}`);
    }
    const workshopIds = new Set<string>();
    for (const workshop of chapter.sourceWorkshops ?? []) {
      if (workshopIds.has(workshop.id)) issues.push(`Duplisert verksted-ID i ${chapter.id}: ${workshop.id}`);
      workshopIds.add(workshop.id);
      issues.push(...getSourceWorkshopIssues(chapter.id, workshop, sourceIds));
    }
    if (chapter.status === "published" && workshopIds.size === 0) issues.push(`Publisert kapittel ${chapter.id} mangler kildeverksted`);
    if (chapter.teacherGuide?.sourceWorkshop && !workshopIds.has(chapter.teacherGuide.sourceWorkshop.workshopId)) issues.push(`Lærerens verkstedlenke i ${chapter.id} peker til ukjent verksted`);
    if (chapter.status === "published" || chapter.teacherGuide) issues.push(...getTeacherGuideIssues(chapter.id, chapter.teacherGuide));
    if (chapter.summaryPdf) {
      const summaryPath = chapter.summaryPdf.href.split("#")[0];
      if (!summaryPath.startsWith("/")) issues.push("PDF-stien for " + chapter.id + " må være rot-relativ");
      else if (!publicAssetPaths.has(summaryPath)) issues.push("Oppsummerings-PDF for " + chapter.id + " finnes ikke i public: " + summaryPath);
    }
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
).sort((first, second) => first.sortKey - second.sortKey);
