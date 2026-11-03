export const spherePackageDetails = {
  hours: 2,
  capacity: 12,
  availableUntil: "2026-10-31",
  dateLabel: "Do 31 października 2026",
  dimensions: [
    { label: "Długość z tunelem", value: "6 m" },
    { label: "Szerokość", value: "4,5 m" },
    { label: "Wysokość", value: "3 m" },
    { label: "Średnica kuli", value: "4 m" },
  ],
};

export const autumnPackage = {
  ...spherePackageDetails,
  id: "jesienna-kula",
  variant: "jesien",
  label: "Jesienna kula",
  name: "Jesienna kula — animacje i warsztaty",
  path: "/jesienna-kula",
  image: "/images/hero-animacje-w-kuli.webp",
  reservationHref: "/formularz-rezerwacji#pakiet-sezonowy",
  gallery: [
    { src: "/images/kula/autumn-side.webp", label: "Widok z boku", alt: "Jesienna kula z boku — dzieci na warsztatach w środku" },
    { src: "/images/hero-animacje-w-kuli.webp", label: "Wejście do kuli", alt: "Jesienna kula z tunelem, dekoracjami i warsztatami dla dzieci" },
  ],
  title: ["Jesienna magia.", "Dziecięca radość."],
  lead: "Animacje i warsztaty w jesiennej kuli",
  intro: "Ciepłe światełka, złote liście i pomysły, które rodzą się przy wspólnym tworzeniu. W środku kuli prowadzimy tematyczne warsztaty dla dzieci — w kameralnej grupie do 12 uczestników jednocześnie.",
  cta: "Zapytaj o jesienną kulę",
  note: ["Złap chwilę.", "Zachowaj jesienną magię."],
  ribbon: ["Jesienna aranżacja", "Warsztaty w środku kuli", "Animacje z Nallipop"],
  sectionTitle: "Wejdźcie do świata jesiennych zachwytów",
  sectionIntro: "Dwie godziny wspólnej zabawy i tematycznych warsztatów w ciepłej, jesiennej scenerii.",
  experiences: [
    ["Jesienna sceneria", "Kula pełna ciepłych kolorów", "Złote liście, dynie i światełka tworzą przytulne miejsce spotkania. Przezroczysta kopuła otula dzieci jesienną opowieścią."],
    ["Warsztaty w środku", "Małe ręce, jesienne pomysły", "Wewnątrz kuli dzieci biorą udział w tematycznych warsztatach inspirowanych jesienią. Tworzymy, odkrywamy i rozwijamy wyobraźnię — temat dobieramy do wieku grupy."],
    ["Animacje Nallipop", "Dwie godziny pełne radości", "Animatorzy zapraszają do wspólnych zabaw i twórczych aktywności. W kuli przebywa do 12 dzieci jednocześnie, dzięki czemu każdy może poczuć się częścią przygody."],
  ],
  galleryTitle: "Zobacz, gdzie dzieje się jesienna magia",
  galleryIntro: "Zajrzyj do naszej kuli i przyjrzyj się jej jesiennej aranżacji z różnych stron.",
  careTitle: "Jesienna przygoda. Spokojna głowa organizatora.",
  careCopy: "Przygotowujemy jesienną scenerię, prowadzimy warsztaty i pomagamy dzieciom korzystać z kuli. Ty możesz cieszyć się ich zachwytem.",
  planTitle: "Zaplanujmy Waszą jesienną przygodę",
  finaleTitle: "Podaruj dzieciom jesień, którą będą wspominać.",
  footer: "Animacje z uśmiechem. W kolorach jesieni.",
};

export const halloweenPackage = {
  ...spherePackageDetails,
  id: "halloweenowa-kula",
  variant: "halloween",
  label: "Kula halloweenowa",
  name: "Kula halloweenowa — animacje i warsztaty",
  path: "/jesienna-kula?wariant=halloween",
  image: "/images/kula/halloween-front.webp",
  reservationHref: "/formularz-rezerwacji#pakiet-sezonowy",
  gallery: [
    { src: "/images/kula/halloween-inside.webp", label: "Wnętrze kuli", alt: "Wnętrze kuli halloweenowej — fioletowe światła, duszki i dynie" },
    { src: "/images/kula/halloween-side.webp", label: "Widok z boku", alt: "Kula halloweenowa z boku z duszkami, nietoperzami i świecącymi dyniami" },
    { src: "/images/kula/halloween-front.webp", label: "Wejście do kuli", alt: "Wejście do kuli halloweenowej w pomarańczowo-fioletowej aranżacji" },
  ],
  title: ["Wesołe Halloween.", "Strrrasznie dużo frajdy!"],
  lead: "Animacje i warsztaty w kuli halloweenowej",
  intro: "Przyjazne duszki, ciekawskie nietoperze i fioletowy blask. W środku kuli czekają tematyczne warsztaty Halloween oraz wspólna zabawa — dla maksymalnie 12 dzieci jednocześnie.",
  cta: "Zapytaj o kulę Halloween",
  note: ["Małe czary.", "Wielkie halloweenowe WOW!"],
  ribbon: ["Aranżacja Halloween", "Warsztaty w środku kuli", "Animacje z Nallipop"],
  sectionTitle: "Przekroczcie próg halloweenowej przygody",
  sectionIntro: "Dwie godziny animacji i tematycznych warsztatów Halloween, wśród duszków, nietoperzy i rozświetlonych dyń.",
  experiences: [
    ["Sceneria Halloween", "Przyjazne duszki i odrobina czarów", "Fioletowe i pomarańczowe światła, dynie, nietoperze oraz duszki tworzą niezwykły świat pod kopułą. Halloween w odsłonie pełnej dziecięcej ciekawości."],
    ["Warsztaty w środku", "Halloweenowe pomysły małych twórców", "Tematyczne warsztaty odbywają się wewnątrz kuli. Dzieci tworzą w klimacie Halloween, a rodzaj prac i poziom trudności dopasowujemy do ich wieku."],
    ["Animacje Nallipop", "Strrrasznie wesołe dwie godziny", "Z animatorami zamieniamy halloweenowy klimat we wspólną zabawę. W środku może przebywać do 12 dzieci jednocześnie — jest miejsce na twórczość i małe wielkie odkrycia."],
  ],
  galleryTitle: "Zajrzyj do środka. Tu mieszkają małe czary.",
  galleryIntro: "Obejrzyj wnętrze, dekoracje i wejście do kuli w halloweenowej odsłonie.",
  careTitle: "Halloweenowe emocje. Dobra organizacja.",
  careCopy: "Dbamy o aranżację Halloween, tematyczne warsztaty i komfort korzystania z kuli. Dzieci skupiają się na zabawie, a my na jej sprawnym przebiegu.",
  planTitle: "Zaplanujmy Wasze wesołe Halloween",
  finaleTitle: "Niech to Halloween będzie pełne małych zachwytów.",
  footer: "Nallipop — strrrasznie dużo dobrej zabawy!",
};

export const seasonalPackages = [autumnPackage, halloweenPackage];
export function getSeasonalPackage(id) {
  return seasonalPackages.find((item) => item.id === id) || null;
}
export function formatSeasonalPackage(id) {
  const item = getSeasonalPackage(id);
  return item ? `${item.name} — ${item.hours} godz. animacji i warsztatów; do ${item.capacity} dzieci jednocześnie w kuli` : "Brak";
}
