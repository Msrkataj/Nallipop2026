import { createPageMetadata } from "@/lib/seo";
import { LegalDocument, LegalList, LegalSection } from "@/components/LegalDocument";

export const metadata = createPageMetadata({
  title: "Regulamin strony i świadczenia usług",
  description: "Zasady korzystania z nallipop.pl, składania zapytań oraz realizacji usług animacyjnych i eventowych Nallipop.",
  path: "/regulamin",
});

const toc = Array.from({ length: 14 }, (_, index) => ({
  id: `paragraf-${index + 1}`,
  label: [
    "Dane Usługodawcy", "Definicje", "Formularz zapytania", "Oferta i umowa", "Cena i płatności",
    "Rezygnacja i zmiana terminu", "Odstąpienie konsumenta", "Bezpieczeństwo", "Dmuchańce",
    "Bubble House", "Zdjęcia i wizerunek", "Reklamacje", "Odpowiedzialność strony", "Postanowienia końcowe",
  ][index],
}));

export default function RegulaminPage() {
  return (
    <LegalDocument
      eyebrow="Regulamin"
      title="Regulamin strony i świadczenia usług Nallipop"
      lead="Zasady korzystania z nallipop.pl, składania zapytań oraz realizacji usług animacyjnych i eventowych."
      downloadHref="/Regulamin_Nallipop.docx"
      toc={toc}
    >
      <LegalSection id="najwazniejsze" title="Najważniejsza informacja" highlight>
        <p><strong>Wysłanie formularza na nallipop.pl jest wyłącznie zapytaniem. Nie powoduje automatycznej rezerwacji terminu ani zawarcia umowy.</strong></p>
      </LegalSection>

      <LegalSection id="paragraf-1" title="§ 1. Dane Usługodawcy i zakres Regulaminu">
        <LegalList>
          <li>Usługodawcą i stroną umów zawieranych pod marką Nallipop jest KamaLogic Kamil Tosnowiec, adres: ul. Nadrzeczna 7, 05-840 Krosna-Parcela, NIP: 5342671266, dalej „Usługodawca”.</li>
          <li>Główną przedstawicielką marki Nallipop jest Natalia Marciniak. Kontakt: <a href="mailto:animacje@nallipop.pl">animacje@nallipop.pl</a>, <a href="tel:+48795103108">795 103 108</a>.</li>
          <li>Regulamin określa zasady korzystania ze strony nallipop.pl i formularza kontaktowego oraz zasady uzgadniania i realizacji usług oferowanych pod marką Nallipop.</li>
          <li>Regulamin stosuje się do konsumentów, przedsiębiorców na prawach konsumenta oraz klientów biznesowych i instytucjonalnych, w zakresie dopuszczonym przez bezwzględnie obowiązujące przepisy.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="paragraf-2" title="§ 2. Definicje">
        <LegalList>
          <li><strong>Klient</strong> – osoba fizyczna, przedsiębiorca, szkoła, przedszkole, hotel, instytucja, jednostka samorządu lub inny podmiot składający zapytanie albo zawierający umowę z Usługodawcą.</li>
          <li><strong>Organizator</strong> – Klient albo wskazana przez niego osoba odpowiedzialna za wydarzenie, miejsce i uczestników.</li>
          <li><strong>Usługi</strong> – w szczególności animacje, warsztaty, Bubble House, wynajem lub obsługa dmuchańców, atrakcje dodatkowe oraz obsługa wydarzeń prywatnych, firmowych i publicznych.</li>
          <li><strong>Oferta</strong> – indywidualna propozycja obejmująca co najmniej rodzaj i zakres Usługi, termin, miejsce, cenę, płatności i istotne warunki realizacji.</li>
          <li><strong>Opłata rezerwacyjna</strong> – uzgodniona indywidualnie część ceny, zaliczana na poczet wynagrodzenia i służąca potwierdzeniu rezerwacji terminu.</li>
          <li><strong>Formularz</strong> – formularz na nallipop.pl umożliwiający wysłanie niezobowiązującego zapytania.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="paragraf-3" title="§ 3. Usługa elektroniczna – formularz zapytania">
        <LegalList>
          <li>Usługodawca nieodpłatnie udostępnia Formularz pozwalający wysłać zapytanie o termin, ofertę lub szczegóły Usług.</li>
          <li>Do użycia Formularza potrzebne są: urządzenie z dostępem do Internetu, aktualna przeglądarka, aktywny adres e-mail, obsługa JavaScript oraz – w zakresie niezbędnym – plików cookies technicznych.</li>
          <li>Umowa o świadczenie usługi elektronicznej zostaje zawarta na czas wysłania zapytania i kończy się z chwilą jego skutecznego przesłania albo przerwania korzystania z Formularza.</li>
          <li>Klient powinien podawać dane prawdziwe, aktualne i niezbędne. Zabronione jest przesyłanie treści bezprawnych, obraźliwych, naruszających prawa osób trzecich, złośliwego kodu oraz niezamówionych komunikatów reklamowych.</li>
          <li>Formularz może obejmować: imię i nazwisko, telefon, e-mail, datę i godzinę wydarzenia, liczbę godzin, rodzaj i miejsce wydarzenia, liczbę i wiek dzieci, atrakcje dodatkowe oraz uwagi.</li>
          <li>W polu „uwagi” nie należy wpisywać danych o zdrowiu dzieci ani innych danych szczególnie chronionych. Informacje konieczne dla bezpieczeństwa uczestnika są uzgadniane odrębnie po rezerwacji.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="paragraf-4" title="§ 4. Zapytanie, Oferta i zawarcie umowy">
        <LegalList>
          <li>Wysłanie Formularza, wiadomości e-mail, wiadomości w mediach społecznościowych albo kontakt telefoniczny nie oznacza zawarcia umowy ani rezerwacji terminu.</li>
          <li>Po otrzymaniu zapytania Usługodawca może poprosić o dodatkowe informacje i przedstawić Ofertę. Oferta obowiązuje przez termin w niej wskazany, a jeżeli terminu nie wskazano – do chwili poinformowania o zmianie dostępności lub warunków.</li>
          <li>Umowa zostaje zawarta, gdy Klient zaakceptuje Ofertę, a Usługodawca potwierdzi przyjęcie rezerwacji. Jeżeli Oferta wymaga Opłaty rezerwacyjnej, termin zostaje skutecznie zarezerwowany po zaksięgowaniu tej opłaty albo po innym wyraźnym potwierdzeniu Usługodawcy.</li>
          <li>Przed zawarciem umowy Klient otrzymuje na trwałym nośniku, np. w wiadomości e-mail, uzgodnione warunki, całkowitą cenę lub sposób jej obliczenia, płatności, termin, miejsce i zakres Usługi.</li>
          <li>Zmiany zakresu Usługi wymagają uzgodnienia stron; mogą wpływać na cenę, czas realizacji, liczbę animatorów i wymagania techniczne.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="paragraf-5" title="§ 5. Cena i płatności">
        <LegalList>
          <li>Cena jest ustalana indywidualnie i potwierdzana w Ofercie. Klient otrzymuje informację o cenie całkowitej oraz ewentualnych kosztach dodatkowych, w tym dojazdu, materiałów, obsługi i wydłużenia czasu Usługi.</li>
          <li>Płatność może nastąpić przelewem, gotówką lub BLIK-iem, zgodnie z Ofertą. Termin i wysokość Opłaty rezerwacyjnej są dobierane indywidualnie do wartości i charakteru wydarzenia.</li>
          <li>Opłata rezerwacyjna jest zaliczana na poczet ceny. Pozostała część ceny jest płatna w terminie ustalonym w Ofercie.</li>
          <li>W razie opóźnienia Klienta w płatności Usługodawca może wyznaczyć dodatkowy odpowiedni termin, a po jego bezskutecznym upływie odstąpić od umowy, z uwzględnieniem obowiązujących przepisów.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="paragraf-6" title="§ 6. Rezygnacja, odwołanie i zmiana terminu">
        <LegalList>
          <li>W przypadku rezygnacji Klienta wcześniej niż 14 pełnych dni przed wydarzeniem Usługodawca zwraca otrzymaną Opłatę rezerwacyjną.</li>
          <li>W przypadku rezygnacji 14 dni lub mniej przed wydarzeniem Usługodawca może zatrzymać uzgodnioną Opłatę rezerwacyjną. Jej wysokość powinna być proporcjonalna do wartości rezerwacji, przygotowań, poniesionych kosztów i utraty możliwości przyjęcia innego zlecenia; bezwzględnie obowiązujące prawa konsumenta pozostają nienaruszone.</li>
          <li>Jeżeli Usługodawca odwoła Usługę z przyczyn leżących po jego stronie, Klient wybiera pełny zwrot wpłaconych kwot albo – jeżeli strony tak uzgodnią – nowy termin. Zwrot następuje niezwłocznie, nie później niż w 14 dni od uzgodnienia sposobu rozliczenia.</li>
          <li>Przy złej pogodzie, ostrzeżeniach pogodowych, silnym wietrze, opadach, burzy, skrajnej temperaturze albo innych warunkach zagrażających bezpieczeństwu strony uzgadniają zmianę miejsca, programu lub terminu. Usługodawca może przerwać albo odmówić uruchomienia atrakcji, jeżeli bezpieczna realizacja nie jest możliwa.</li>
          <li>Jeżeli przeszkoda ma charakter siły wyższej, strony w pierwszej kolejności próbują uzgodnić zmianę terminu lub zakresu, a rozliczenie następuje z uwzględnieniem wykonanej części Usługi, poniesionych uzasadnionych kosztów i bezwzględnie obowiązujących przepisów.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="paragraf-7" title="§ 7. Prawo odstąpienia konsumenta">
        <LegalList>
          <li>Samo wysłanie zapytania przez Formularz nie jest umową odpłatną i nie wymaga składania oświadczenia o odstąpieniu.</li>
          <li>Jeżeli umowa zawarta na odległość dotyczy usługi związanej z wypoczynkiem lub wydarzeniem rozrywkowym i wskazuje konkretny dzień albo okres świadczenia, konsumentowi co do zasady nie przysługuje ustawowe 14-dniowe prawo odstąpienia (art. 38 pkt 12 ustawy o prawach konsumenta). Informacja o zastosowaniu tego wyjątku jest przekazywana przed zawarciem umowy.</li>
          <li>Jeżeli dana umowa nie mieści się w ustawowym wyjątku, konsument może odstąpić od niej w terminie 14 dni na zasadach określonych w ustawie o prawach konsumenta. Rozpoczęcie wykonywania usługi przed upływem tego terminu wymaga wyraźnego żądania konsumenta, a po pełnym wykonaniu usługi prawo odstąpienia może wygasnąć wyłącznie po spełnieniu warunków ustawowych.</li>
          <li>Postanowienia o dobrowolnej rezygnacji z § 6 nie ograniczają ustawowego prawa odstąpienia, jeżeli ono przysługuje.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="paragraf-8" title="§ 8. Obowiązki Organizatora i zasady ogólnego bezpieczeństwa">
        <LegalList>
          <li>Organizator zapewnia legalny dostęp do miejsca wydarzenia, odpowiednią przestrzeń, dostęp do energii lub wody, jeżeli uzgodniono, oraz spełnienie wymagań przekazanych w Ofercie.</li>
          <li>Organizator podaje prawidłową liczbę i wiek uczestników oraz informuje – w odrębnym, uzgodnionym trybie – o alergiach, chorobach, niepełnosprawnościach lub ograniczeniach istotnych dla bezpieczeństwa.</li>
          <li>Usługi animacyjne nie stanowią opieki nad dziećmi ani przejęcia pieczy, chyba że strony wyraźnie uzgodnią inaczej. Rodzic, opiekun lub Organizator zapewnia odpowiednią liczbę dorosłych sprawujących bieżący nadzór.</li>
          <li>Uczestnicy stosują się do poleceń animatorów i obsługi. Osoba zagrażająca sobie, innym lub sprzętowi może zostać czasowo lub trwale odsunięta od atrakcji.</li>
          <li>Organizator niezwłocznie zgłasza wypadek, uszkodzenie sprzętu lub niebezpieczną sytuację. Nie wolno samodzielnie naprawiać, przestawiać, odłączać ani uruchamiać sprzętu Usługodawcy.</li>
          <li>Usługodawca odpowiada za prawidłową realizację Usługi i nie wyłącza odpowiedzialności, której zgodnie z prawem wyłączyć nie można. Organizator odpowiada za szkody spowodowane zawinionym naruszeniem instrukcji przez niego lub osoby, za które ponosi odpowiedzialność.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="paragraf-9" title="§ 9. Szczególne zasady korzystania z dmuchańców">
        <LegalList>
          <li>Dmuchaniec może być używany wyłącznie po prawidłowym rozłożeniu, zakotwieniu i uruchomieniu zgodnie z instrukcją producenta oraz ustaleniami z Usługodawcą.</li>
          <li>Obowiązują limity wieku, wzrostu, masy i liczby użytkowników wskazane przez producenta lub obsługę. Dzieci wyraźnie różniące się wzrostem i masą powinny korzystać z atrakcji oddzielnie.</li>
          <li>Przed wejściem należy zdjąć obuwie, okulary i ostre przedmioty, opróżnić kieszenie oraz usunąć biżuterię mogącą spowodować uraz lub uszkodzenie. Zakazane są jedzenie, napoje i guma do żucia.</li>
          <li>Zakazane jest popychanie, zapasy, salta, wspinanie na ściany i siatki, skakanie przy wejściu, blokowanie wyjścia oraz korzystanie niezgodne z przeznaczeniem.</li>
          <li>Dmuchaniec wymaga stałego nadzoru pełnoletniej osoby. W przypadku wynajmu bez obsługi osobę nadzorującą zapewnia Klient i odpowiada ona za stosowanie instrukcji przekazanej przy wydaniu.</li>
          <li>Nie wolno korzystać z dmuchańca podczas deszczu, burzy, silnego wiatru, zaniku zasilania, niestabilności konstrukcji ani w innych warunkach wskazanych przez producenta lub obsługę. Atrakcję należy natychmiast opuścić po poleceniu obsługi.</li>
          <li>Nie mogą korzystać osoby, u których aktywność tego typu jest niewskazana ze względu na stan zdrowia, uraz, złe samopoczucie lub ograniczenia przekazane przez lekarza lub opiekuna.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="paragraf-10" title="§ 10. Szczególne zasady Bubble House">
        <LegalList>
          <li>Z Bubble House korzysta jednocześnie liczba osób wskazana przez obsługę, z uwzględnieniem wieku i warunków wewnątrz atrakcji.</li>
          <li>Przed wejściem należy zdjąć obuwie i przedmioty ostre lub mogące uszkodzić powłokę. Zabronione są jedzenie, napoje, guma do żucia, przepychanki, wspinanie i celowe uszkadzanie balonów lub konstrukcji.</li>
          <li>Małe dzieci korzystają pod bezpośrednim nadzorem opiekuna zgodnie z poleceniami obsługi. Elementy balonów nie mogą być wkładane do ust; pęknięte elementy są niezwłocznie usuwane.</li>
          <li>Obsługa może ograniczyć czas, wstrzymać wejścia albo zakończyć korzystanie w razie problemów technicznych, pogorszenia pogody, przegrzania, niewłaściwego zachowania lub innego zagrożenia.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="paragraf-11" title="§ 11. Zdjęcia i wizerunek">
        <LegalList>
          <li>Udział w wydarzeniu ani zawarcie umowy nie oznaczają zgody na utrwalanie lub publikowanie wizerunku uczestnika w celach promocyjnych.</li>
          <li>Zdjęcia lub nagrania marketingowe są wykonywane i publikowane wyłącznie na podstawie osobnej, dobrowolnej i konkretnej zgody właściwej osoby, a w przypadku dziecka – rodzica lub opiekuna prawnego. Brak zgody nie wpływa na udział w Usłudze.</li>
          <li>Organizator wydarzenia grupowego może zebrać zgody tylko wtedy, gdy został do tego prawidłowo umocowany, przekazał pełną informację o zakresie publikacji i potrafi wykazać zgody. Usługodawca może zażądać ich potwierdzenia.</li>
          <li>Usługodawca i Organizator uwzględniają zdanie dziecka odpowiednio do jego wieku i dojrzałości; wyraźny sprzeciw dziecka wobec fotografowania powinien być respektowany.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="paragraf-12" title="§ 12. Reklamacje">
        <LegalList>
          <li>Reklamacje dotyczące Formularza lub Usług można składać na <a href="mailto:animacje@nallipop.pl">animacje@nallipop.pl</a> albo pisemnie na adres ul. Nadrzeczna 7, 05-840 Krosna-Parcela. Zaleca się podanie danych kontaktowych, daty wydarzenia, opisu problemu i oczekiwanego rozwiązania.</li>
          <li>Reklamacja konsumenta zostanie rozpatrzona bez zbędnej zwłoki, nie później niż w 14 dni, chyba że bezwzględnie obowiązujący przepis przewiduje inny termin. Brak informacji potrzebnych do rozpatrzenia reklamacji może wymagać ich uzupełnienia.</li>
          <li>Konsument może skorzystać z bezpłatnej pomocy miejskiego lub powiatowego rzecznika konsumentów albo informacji dostępnych w serwisie <a href="https://prawakonsumenta.uokik.gov.pl/" target="_blank" rel="noreferrer">Urzędu Ochrony Konkurencji i Konsumentów</a>.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="paragraf-13" title="§ 13. Odpowiedzialność i dostępność strony">
        <LegalList>
          <li>Usługodawca podejmuje rozsądne działania zapewniające prawidłowe działanie strony, ale może czasowo ograniczyć dostęp z powodu konserwacji, aktualizacji, awarii lub zdarzeń niezależnych.</li>
          <li>Usługodawca nie odpowiada za skutki podania nieprawdziwych lub niepełnych danych, działania urządzenia albo łącza Klienta ani za działania zewnętrznych serwisów, z zastrzeżeniem odpowiedzialności, której nie można wyłączyć.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="paragraf-14" title="§ 14. Postanowienia końcowe">
        <LegalList>
          <li>Do Regulaminu i umów stosuje się prawo polskie. Wybór prawa nie pozbawia konsumenta ochrony wynikającej z bezwzględnie obowiązujących przepisów właściwych dla jego zwykłego miejsca pobytu.</li>
          <li>Zmiana Regulaminu nie narusza praw nabytych ani warunków już zawartych umów, chyba że strony uzgodnią inaczej albo zmiana wynika z bezwzględnie obowiązującego prawa.</li>
          <li>Regulamin jest dostępny nieodpłatnie na nallipop.pl w formie umożliwiającej jego zapisanie i odtworzenie. Wchodzi w życie w dniu publikacji.</li>
        </LegalList>
        <h3>Podstawowe akty prawne</h3>
        <LegalList>
          <li><a href="https://eli.gov.pl/api/acts/DU/2002/1204/text.html" target="_blank" rel="noreferrer">Ustawa o świadczeniu usług drogą elektroniczną</a></li>
          <li><a href="https://eli.gov.pl/api/acts/DU/2014/827/text.html" target="_blank" rel="noreferrer">Ustawa o prawach konsumenta</a></li>
          <li><a href="https://eli.gov.pl/api/acts/DU/2024/1221/text.html" target="_blank" rel="noreferrer">Prawo komunikacji elektronicznej</a></li>
          <li><a href="https://eur-lex.europa.eu/legal-content/PL/TXT/HTML/?uri=CELEX:32016R0679" target="_blank" rel="noreferrer">RODO</a></li>
        </LegalList>
      </LegalSection>
    </LegalDocument>
  );
}
