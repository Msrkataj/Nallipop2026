export const photobooth = {
  name: "Fotobudka",
  path: "/fotobudka",
  description: "Fotobudka od 700 zł brutto na wesela, urodziny i inne wydarzenia. Transport i montaż do 50 km od centrum Warszawy w cenie. Poznaj scenografie i przykładowe kadry.",
};

export const photoboothPricing = {
  packages: [
    { hours: 1, label: "1 godzina", price: 700, caption: "Mała impreza. Wielkie uśmiechy.", action: "Wybieram 1 godzinę" },
    { hours: 2, label: "2 godziny", price: 900, caption: "Więcej czasu na wspólne kadry.", action: "Wybieram 2 godziny" },
    { hours: 3, label: "3 godziny", price: 1100, caption: "Niech dobra zabawa trwa dłużej.", action: "Wybieram 3 godziny" },
  ],
  extraHourPrice: 200,
  includedRadiusKm: 50,
  priceNote: "Wszystkie ceny to kwoty brutto do zapłaty przez klienta.",
  transportNote: "Transport i montaż w promieniu 50 km od centrum Warszawy wliczone w cenę.",
};

export const photoboothGallery = [
  { id: "weselny-usmiech", label: "Weselny uśmiech", alt: "Uśmiechnięci goście weselni w zabawnych okularach i z wąsami na patyczku na tle kwiatów" },
  { id: "disco-ekipa", label: "Ekipa w rytmie disco", alt: "Trójka przyjaciół w kolorowej peruce, wielkich okularach i błyszczącym kapeluszu na tle srebrnej kurtyny" },
  { id: "maskowy-blask", label: "Odrobina tajemnicy", alt: "Goście balu z weneckimi maskami i cylindrem na tle bordowego aksamitu" },
  { id: "swiateczny-kadr", label: "Święta w jednym kadrze", alt: "Rodzice i dwoje dzieci w świątecznych dodatkach pozują przy choince" },
  { id: "urodzinowa-radosc", label: "Urodzinowa radość", alt: "Śmiejące się dzieci w dużych okularach i imprezowym kapeluszu na pastelowym tle" },
  { id: "firmowa-druzyna", label: "Zgrana drużyna", alt: "Czworo współpracowników z zabawnymi dodatkami pozuje na tle granatowej kurtyny i turkusowych świateł" },
  { id: "rozowe-okulary", label: "Przez różowe okulary", alt: "Dwie przyjaciółki w różowych okularach i opasce z uszami królika śmieją się do aparatu" },
  { id: "rekwizyty-w-ruch", label: "Rekwizyty w ruch!", alt: "Goście wybierają kapelusz i kolorowe okulary ze stolika z perukami i rekwizytami" },
].map((item) => ({ ...item, image: `/images/fotobudka/galeria/${item.id}.webp` }));

export const photoboothScenes = [
  {
    id: "wesele", label: "Wesele", icon: "heart", offer: "wesela", number: "01",
    title: ["Miłość w dobrym", "świetle."], mood: "Romantycznie. Blisko. Razem.",
    description: "Jeden kadr z babcią. Drugi z przyjaciółmi. Trzeci już zupełnie spontaniczny. Fotobudka zbiera te małe chwile, z których składa się Wasz wielki dzień.",
    image: "/images/fotobudka/lustro-wesele.webp", alt: "Czarna fotobudka z wysokim ekranem i podświetlaną ramą w weselnej scenografii z kremową draperią i różami",
    tags: ["Kwiaty i draperie", "Szampański blask", "Romantyczny klimat"],
    colors: { background: "#f8f1ec", ink: "#412b35", muted: "#76636b", accent: "#994561", stage: "#442a35", highlight: "#f4c9b9" },
    details: [
      ["Scena jak z Waszej historii", "Kremowe tkaniny, kwiaty i ciepłe światło. Punktem wyjścia jest styl Waszego wesela."],
      ["Cała rodzina w kadrze", "Od eleganckiego zdjęcia z dziadkami po spontaniczne ujęcie z ekipą z parkietu."],
      ["Wasz osobisty akcent", "Opowiedzcie o kolorach, motywie i detalach przyjęcia. Wspólnie dobierzemy oprawę strefy zdjęć."],
    ],
  },
  {
    id: "komunia", label: "Komunia", icon: "leaf", offer: "komunie", number: "02",
    title: ["Małe chwile.", "Wielka pamiątka."], mood: "Lekko. Jasno. Rodzinnie.",
    description: "Uśmiechy rodzeństwa, przytulasy z dziadkami i bliscy w jednym miejscu. Jasna, subtelna scenografia pięknie dopełnia rodzinne świętowanie.",
    image: "/images/fotobudka/lustro-komunia.webp", alt: "Czarna fotobudka z podświetlaną ramą i górną lampą w jasnej komunijnej aranżacji z kwiatami i zielenią",
    tags: ["Biel i zieleń", "Naturalne detale", "Rodzinne ujęcia"],
    colors: { background: "#f2f5ed", ink: "#2e4438", muted: "#607362", accent: "#426a50", stage: "#294438", highlight: "#d8e9bb" },
    details: [
      ["Subtelna oprawa", "Biel, delikatna zieleń i naturalne dodatki tworzą spokojne tło dla ważnych rodzinnych chwil."],
      ["Bliscy obok siebie", "Wspólny kadr z chrzestnymi, kuzynami i dziadkami staje się częścią tego wyjątkowego dnia."],
      ["W rytmie przyjęcia", "Miejsce strefy oraz czas działania dopasujemy do planu uroczystości i Waszych gości."],
    ],
  },
  {
    id: "mikolajki", label: "Mikołajki", icon: "snowflake", offer: "mikolajki", number: "03",
    title: ["Ho, ho, ho!", "Ale to był kadr."], mood: "Ciepło. Bajkowo. Świątecznie.",
    description: "Lampki migoczą, prezenty czekają, a w kadrze robi się naprawdę świątecznie. Pomysł na Mikołajki w przedszkolu, rodzinną imprezę albo firmową gwiazdkę.",
    image: "/images/fotobudka/lustro-mikolajki.webp", alt: "Wysoka czarna fotobudka z podświetlaną ramą przy choince, bordowej kurtynie i prezentach",
    tags: ["Czerwień i złoto", "Choinka i światełka", "Świąteczna magia"],
    colors: { background: "#f8eee8", ink: "#5a2633", muted: "#82616a", accent: "#a2344c", stage: "#55202d", highlight: "#f5d291" },
    details: [
      ["Kawałek świątecznej bajki", "Głęboka czerwień, zieleń choinki i ciepły blask lampek. Scena, do której chce się wejść."],
      ["Zdjęcia pełne radości", "Rodzinne przytulasy, świąteczne swetry i wspólne wygłupy. Każda ekipa ma swój pomysł na kadr."],
      ["Jeszcze więcej świąt", "Fotobudkę możesz połączyć z wizytą Mikołaja lub warsztatami z Elfem. Dodatki wyceniamy osobno."],
    ],
  },
  {
    id: "urodziny", label: "Urodziny", icon: "cake", offer: "urodziny", number: "04",
    title: ["Dziś wszystkie", "kadry są Wasze!"], mood: "Kolorowo. Głośno. Po swojemu.",
    description: "Najlepsza paczka, ulubione kolory i miny, których nie da się zaplanować. Fotobudka dodaje urodzinom jeszcze jeden powód do wspólnego śmiechu.",
    image: "/images/fotobudka/lustro-urodziny.webp", alt: "Czarna fotobudka z kolorową ramą w urodzinowej scenografii z pastelowymi balonami i liliowym łukiem",
    tags: ["Balonowy zawrót głowy", "Kolory solenizanta", "Ekipa w komplecie"],
    colors: { background: "#faf0fc", ink: "#472e65", muted: "#77658d", accent: "#7951a7", stage: "#482966", highlight: "#f6c9ec" },
    details: [
      ["Kolor ma znaczenie", "Pastelowo, tęczowo, a może z przewagą ulubionego koloru? To dobry początek Waszej scenografii."],
      ["Pomysł na wspólną zabawę", "Zaproście paczkę do kadru, wymyślcie minę i zamieńcie kolejne ujęcie w małe wyzwanie."],
      ["Przyjęcie po Waszemu", "Strefę zdjęć możemy dopasować do motywu urodzin i połączyć z animacjami dla dzieci."],
    ],
  },
  {
    id: "event-firmowy", label: "Event firmowy", icon: "star", offer: "eventy", number: "05",
    title: ["Dobra ekipa.", "Świetne ujęcie."], mood: "Wieczorowo. Stylowo. Z energią.",
    description: "Zespół w trochę innym świetle. Fotobudka przełamuje pierwsze lody i daje gościom pretekst do wspólnego zdjęcia podczas gali, integracji czy firmowego jubileuszu.",
    image: "/images/fotobudka/lustro-event-firmowy.webp", alt: "Czarna fotobudka z wysokim ekranem i górną lampą w granatowej scenografii z turkusowymi łukami",
    tags: ["Wieczorowy blask", "Kolory wydarzenia", "Wspólna energia"],
    colors: { background: "#edf4f7", ink: "#213c54", muted: "#5a7180", accent: "#236782", stage: "#152d43", highlight: "#9ce8e9" },
    details: [
      ["Oprawa z charakterem", "Granat, światło i eleganckie detale. Możemy też zacząć od kolorów Waszego wydarzenia."],
      ["Spotkanie poza schematem", "Wspólne zdjęcie staje się okazją do rozmowy i zabawy między kolejnymi punktami programu."],
      ["Dopasowanie do eventu", "Omówimy miejsce, harmonogram i pomysły na personalizację. Zakres ustalimy przed realizacją."],
    ],
  },
  {
    id: "impreza-disco", label: "Impreza disco", icon: "disco", offer: "impreza", number: "06",
    title: ["Załóż perukę.", "Zrób show!"], mood: "Brokat. Kolor. Zero sztywnych póz.",
    description: "Dziś możesz być gwiazdą disco. Wybierz szaloną perukę, ogromne okulary albo błyszczący kapelusz i zbierz ekipę do kadru. Im więcej pomysłów, tym lepsza zabawa!",
    image: "/images/fotobudka/lustro-impreza-disco.webp", alt: "Czarna fotobudka z podświetlaną ramą w scenografii disco obok stołu z perukami, wielkimi okularami i kapeluszami",
    tags: ["Peruki i okulary", "Błyszczące kapelusze", "Disco i neonowe kolory"],
    colors: { background: "#f5edfb", ink: "#4a2462", muted: "#796088", accent: "#903e9e", stage: "#3d1e52", highlight: "#f6b9e8" },
    details: [
      ["Przebieralnia dobrego humoru", "Kolorowe peruki, wielkie okulary, kapelusze, boa i wąsy na patyczkach. Proponowany zestaw rekwizytów ustalimy razem."],
      ["Błysk w każdym kadrze", "Srebrna kurtyna, dyskotekowe refleksy i intensywne kolory zamieniają kącik zdjęć w małą scenę."],
      ["Jedna ekipa, wiele wcieleń", "Zmień dodatek, wymyśl nową pozę i wróć przed ekran. Pasuje do osiemnastek, domówek i integracji."],
    ],
  },
  {
    id: "bal-maskowy", label: "Bal maskowy", icon: "mask", offer: "impreza", number: "07",
    title: ["Odrobina tajemnicy.", "Mnóstwo blasku."], mood: "Złoto. Aksamit. Wielkie wejście.",
    description: "Maska, cylinder, pióra — i już jesteście w innej roli. Elegancka scena w czerni, złocie i bordo dodaje karnawałowi, gali lub tematycznej imprezie filmowego charakteru.",
    image: "/images/fotobudka/lustro-bal-maskowy.webp", alt: "Czarna fotobudka w eleganckiej aranżacji z bordową kurtyną, złotymi detalami i stołem z maskami oraz cylindrem",
    tags: ["Maski i cylindry", "Złoto i aksamit", "Glamour w kadrze"],
    colors: { background: "#f6f0e5", ink: "#46372c", muted: "#7b6a55", accent: "#89622d", stage: "#302723", highlight: "#efd09c" },
    details: [
      ["Twoje wielkie wejście", "Bordowe tkaniny, złote akcenty i ciepłe światło. Scenografia z atmosferą balu i czerwonego dywanu."],
      ["Mały detal, inna postać", "Maski weneckie, cylinder, wachlarz, perły lub boa. Dobierzemy dodatki do motywu wydarzenia."],
      ["Elegancko i z przymrużeniem oka", "Najpierw stylowy portret, potem wspólny wygłup. Taki klimat sprawdzi się na karnawale i wieczornej imprezie."],
    ],
  },
];

export function getPhotoboothScene(id) {
  return photoboothScenes.find((scene) => scene.id === id) || photoboothScenes[0];
}

export function photoboothReservationHref(scene, hours) {
  const params = new URLSearchParams({ atrakcja: photobooth.name, oferta: scene.offer, scenografia: scene.id });
  if (photoboothPricing.packages.some((item) => item.hours === hours)) params.set("czas-fotobudki", String(hours));
  return `/formularz-rezerwacji?${params.toString()}#atrakcje-dodatkowe`;
}

export const photoboothFaqs = [
  ["Na jakie wydarzenia pasuje fotobudka?", "Na wesela, komunie, Mikołajki, urodziny, eventy firmowe i wiele innych wydarzeń, także rocznice, jubileusze czy spotkania tematyczne. Pokazane okazje i scenografie to inspiracje. Opowiedz nam o swoich planach — klimat strefy zdjęć dopasujemy do Waszego wydarzenia, miejsca i uczestników."],
  ["Jak wygląda fotobudka i czy można się przebierać?", "Wizualizacje pokazują wysoką czarną fotobudkę z ekranem, podświetlaną ramą i lampą u góry. Możemy zaproponować stację z perukami, dużymi okularami, kapeluszami, maskami czy boa. Dokładny zestaw rekwizytów i dekoracji potwierdzimy w ofercie."],
  ["Czy mogę wybrać własne kolory i motyw?", "Tak — opowiedz nam o swoim pomyśle. Pokazane scenografie są wizualizacjami inspiracji. Dostępne tło, dekoracje, rekwizyty i możliwości personalizacji potwierdzimy w indywidualnej ofercie."],
  ["Czy w ofercie są wydruki zdjęć?", "Sposób przekazania zdjęć, możliwość wydruków, ich liczbę i wygląd ustalamy przy przygotowaniu oferty. Napisz, jaka forma pamiątki najbardziej Cię interesuje."],
  ["Ile miejsca potrzeba i jak długo działa fotobudka?", "Przestrzeń zależy od wybranej aranżacji. Podaj dostępną powierzchnię, miejsce wydarzenia i planowany czas zabawy. Uzgodnimy ustawienie, dostęp do zasilania oraz zakres obsługi."],
  ["Ile kosztuje fotobudka?", "1 godzina kosztuje 700 zł, 2 godziny — 900 zł, a 3 godziny — 1100 zł. Każda kolejna godzina po trzech godzinach to 200 zł. Wszystkie ceny to kwoty brutto do zapłaty przez klienta. Transport i montaż w promieniu 50 km od centrum Warszawy są wliczone w cenę."],
  ["Czy transport i montaż są w cenie?", "Tak. Transport i montaż w promieniu 50 km od centrum Warszawy są wliczone w podane ceny. Jeśli planujesz wydarzenie dalej, podaj lokalizację w zapytaniu — ustalimy warunki dojazdu."],
];
