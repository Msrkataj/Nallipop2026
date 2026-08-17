import { createPageMetadata } from "@/lib/seo";
import { LegalDocument, LegalList, LegalSection, LegalTable } from "@/components/LegalDocument";

export const metadata = createPageMetadata({
  title: "Polityka prywatności i cookies",
  description: "Informacje o przetwarzaniu danych na nallipop.pl, formularzach, Google Analytics i treściach z Facebooka.",
  path: "/polityka-prywatnosci",
});

const toc = [
  ["administrator", "Administrator danych"], ["zakres", "Zakres danych"], ["cele", "Cele i okresy"],
  ["odbiorcy", "Odbiorcy danych"], ["eog", "Dane poza EOG"], ["prawa", "Prawa osób"],
  ["dzieci", "Dane dzieci i wizerunek"], ["cookies", "Cookies"], ["kategorie", "Kategorie technologii"],
  ["bezpieczenstwo", "Bezpieczeństwo"], ["zmiany", "Zmiany Polityki"],
].map(([id, label]) => ({ id, label }));

export default function PolitykaPrywatnosciPage() {
  const purposeRows = [
    ["Odpowiedź na zapytanie i przygotowanie Oferty", "Dane kontaktowe i wydarzenia; art. 6 ust. 1 lit. b RODO (działania przed umową) oraz lit. f (obsługa korespondencji instytucjonalnej)", "Do 12 miesięcy od zakończenia kontaktu, chyba że powstanie umowa lub spór", "Dobrowolne, lecz bez danych kontaktowych odpowiedź może być niemożliwa"],
    ["Zawarcie i realizacja umowy", "Dane Klienta, Organizatora i wydarzenia; art. 6 ust. 1 lit. b RODO", "Przez czas umowy, a następnie do upływu właściwych terminów roszczeń", "Konieczne do zawarcia i wykonania umowy"],
    ["Rozliczenia i dokumentacja", "Dane identyfikacyjne i płatnicze; art. 6 ust. 1 lit. c RODO", "Przez okres wymagany prawem podatkowym i rachunkowym, co do zasady 5 lat liczonych zgodnie z tymi przepisami", "Konieczne, gdy obowiązek wynika z prawa"],
    ["Ustalenie, dochodzenie i obrona roszczeń", "Dane związane ze zleceniem i korespondencją; art. 6 ust. 1 lit. f RODO", "Do przedawnienia roszczeń lub prawomocnego zakończenia sprawy", "Nie jest odrębnym warunkiem usługi"],
    ["Bezpieczeństwo strony i logi", "IP, logi, dane techniczne; art. 6 ust. 1 lit. f RODO", "Przez okres wynikający z konfiguracji usług, nie dłużej niż jest to potrzebne; dłużej tylko w razie incydentu lub obowiązku prawnego", "Powstają automatycznie podczas korzystania ze strony"],
    ["Analityka strony", "Identyfikatory i zdarzenia Google Analytics; art. 6 ust. 1 lit. a RODO i zgoda na opcjonalne technologie", "Do wycofania zgody lub upływu okresu ustawionego w narzędziu, nie dłużej niż jest to potrzebne do analizy", "Dobrowolne; odmowa nie ogranicza podstawowych funkcji"],
    ["Wizerunek w celach promocyjnych", "Zdjęcia/filmy; art. 6 ust. 1 lit. a RODO oraz zezwolenie na rozpowszechnianie wizerunku", "Przez okres wskazany w zgodzie lub do jej wcześniejszego wycofania", "Całkowicie dobrowolne; brak zgody nie wpływa na usługę"],
  ];

  return (
    <LegalDocument
      eyebrow="Prywatność i cookies"
      title="Polityka prywatności i cookies Nallipop"
      lead="Informacje o przetwarzaniu danych na nallipop.pl oraz w związku z zapytaniami i realizacją usług."
      downloadHref="/Polityka_prywatnosci_i_cookies_Nallipop.docx"
      toc={toc}
    >
      <LegalSection id="w-skrocie" title="W skrócie" highlight>
        <p><strong>Dane z formularza służą do odpowiedzi na zapytanie. Google Analytics i osadzony feed Facebooka mogą uruchamiać się dopiero po dobrowolnej zgodzie na opcjonalne technologie.</strong></p>
      </LegalSection>

      <LegalSection id="administrator" title="1. Administrator danych">
        <LegalList>
          <li>Administratorem danych osobowych jest KamaLogic Kamil Tosnowiec, ul. Nadrzeczna 7, 05-840 Krosna-Parcela, NIP 5342671266, działający pod marką Nallipop.</li>
          <li>W sprawach danych osobowych można skontaktować się przez <a href="mailto:animacje@nallipop.pl">animacje@nallipop.pl</a> lub telefonicznie: <a href="tel:+48795103108">795 103 108</a>.</li>
          <li>Natalia Marciniak jest główną przedstawicielką marki Nallipop i może przetwarzać dane w imieniu Administratora jako osoba upoważniona; nie jest z tego powodu odrębnym administratorem danych z formularza.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="zakres" title="2. Zakres pozyskiwanych danych">
        <LegalList>
          <li>Administrator może przetwarzać dane podane w Formularzu lub korespondencji: imię i nazwisko, telefon, e-mail, dane organizacji, termin, godzinę, miejsce i rodzaj wydarzenia, liczbę i przedziały wieku dzieci, wybrane atrakcje, treść uwag oraz historię ustaleń.</li>
          <li>Podczas korzystania ze strony mogą być automatycznie przetwarzane dane techniczne, takie jak adres IP, data i czas żądania, typ urządzenia i przeglądarki, adres URL, identyfikatory cookies oraz dane o zdarzeniach na stronie – zależnie od ustawień zgód.</li>
          <li>Administrator może otrzymać dane od osoby składającej zapytanie, Organizatora, szkoły, pracodawcy lub instytucji. Osoba przekazująca dane innych osób powinna być uprawniona do ich przekazania i przekazać im odpowiednie informacje o przetwarzaniu.</li>
          <li>Nie należy wpisywać danych o zdrowiu dziecka w otwartym polu Formularza. Jeżeli po rezerwacji informacje o alergii, chorobie lub ograniczeniu są konieczne dla bezpieczeństwa, Administrator pozyska je odrębnie, w minimalnym zakresie i – gdy jest to wymagane – na podstawie wyraźnej zgody.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="cele" title="3. Cele, podstawy prawne i okresy przechowywania">
        <LegalTable headers={["Cel", "Dane / podstawa", "Okres", "Czy podanie jest konieczne?"]} rows={purposeRows} />
      </LegalSection>

      <LegalSection id="odbiorcy" title="4. Odbiorcy danych">
        <LegalList>
          <li>Dane mogą być przekazywane wyłącznie w zakresie niezbędnym: osobom upoważnionym współpracującym przy realizacji Usług, dostawcom hostingu i utrzymania IT, Google w związku z Google Cloud Run, Google Workspace, kalendarzem i – po zgodzie – Google Analytics, dostawcom poczty, bankom i operatorom płatności, księgowości, doradcom prawnym oraz organom publicznym, gdy wymagają tego przepisy.</li>
          <li>Po wyrażeniu zgody na osadzone treści społecznościowe dane techniczne mogą być przekazywane Meta Platforms Ireland Limited i podmiotom z grupy Meta zgodnie z ich zasadami prywatności. Samo odwiedzenie profilu Nallipop na Facebooku lub Instagramie podlega także zasadom tych serwisów.</li>
          <li>Podmioty przetwarzające działają na podstawie umów i poleceń Administratora, o ile przepisy nie nadają im roli niezależnego administratora.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="eog" title="5. Przekazywanie danych poza EOG">
        <LegalList>
          <li>Korzystanie z usług Google i Meta może wiązać się z dostępem do danych lub ich przekazywaniem poza Europejski Obszar Gospodarczy, w szczególności do Stanów Zjednoczonych. Zależnie od usługi i odbiorcy podstawą są decyzja Komisji Europejskiej stwierdzająca odpowiedni stopień ochrony, w tym EU–US Data Privacy Framework, jeżeli odbiorca jest objęty, albo standardowe klauzule umowne wraz z wymaganymi zabezpieczeniami.</li>
          <li>Informacje o zabezpieczeniach można uzyskać, kontaktując się z Administratorem. Szczegóły przetwarzania przez dostawców są również opisane w ich aktualnych politykach prywatności.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="prawa" title="6. Prawa osób">
        <LegalList>
          <li>W zakresie przewidzianym przez RODO osobie przysługuje prawo dostępu do danych, otrzymania ich kopii, sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych oraz wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie.</li>
          <li>Zgodę można wycofać w dowolnym momencie, równie łatwo jak jej udzielono, np. przez ustawienia cookies albo wiadomość na <a href="mailto:animacje@nallipop.pl">animacje@nallipop.pl</a>. Wycofanie nie wpływa na zgodność z prawem wcześniejszego przetwarzania.</li>
          <li>Osobie przysługuje prawo skargi do Prezesa Urzędu Ochrony Danych Osobowych: ul. Stanisława Moniuszki 1A, 00-014 Warszawa, <a href="https://uodo.gov.pl/" target="_blank" rel="noreferrer">uodo.gov.pl</a>.</li>
          <li>Administrator nie podejmuje wobec użytkowników decyzji wywołujących skutki prawne wyłącznie w sposób zautomatyzowany i nie prowadzi profilowania w tym znaczeniu.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="dzieci" title="7. Dane dzieci i wizerunek">
        <LegalList>
          <li>Dane dzieci są przetwarzane wyłącznie w minimalnym zakresie koniecznym do zaplanowania i bezpiecznego przeprowadzenia Usługi. Formularz zapytania powinien co do zasady zawierać liczbę i wiek dzieci, a nie ich imiona i nazwiska.</li>
          <li>Publikowanie zdjęć i filmów dzieci w celach promocyjnych wymaga osobnej, konkretnej i dobrowolnej zgody rodzica lub opiekuna prawnego. Zgoda nie może być warunkiem udziału w wydarzeniu i nie może być domyślnie zaznaczona.</li>
          <li>Zgoda powinna określać wydarzenie, dziecko, rodzaje materiałów i kanały publikacji. Administrator nie publikuje imienia, nazwiska ani innych identyfikujących informacji o dziecku bez dodatkowej, wyraźnej podstawy.</li>
          <li>Administrator uwzględnia dobro i zdanie dziecka odpowiednio do jego wieku i dojrzałości. W razie wycofania zgody Administrator usuwa materiały z kontrolowanych przez siebie kanałów w rozsądnym terminie, z zastrzeżeniem kopii wymaganych prawem i technicznie nieuniknionych kopii bezpieczeństwa.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="cookies" title="8. Cookies i podobne technologie">
        <LegalList>
          <li>Strona może korzystać z cookies lub podobnych technologii zapisywanych na urządzeniu albo uzyskiwać dostęp do informacji już zapisanych. Technologie niezbędne mogą działać bez zgody, gdy są konieczne do transmisji komunikatu lub dostarczenia usługi wyraźnie żądanej przez użytkownika.</li>
          <li>Technologie analityczne Google Analytics i technologie związane z osadzonym feedem Facebooka są opcjonalne. Nie powinny być uruchamiane ani pobierać danych przed zgodą użytkownika.</li>
          <li>Baner udostępnia na pierwszej warstwie równorzędne opcje: „Akceptuję wszystkie”, „Odrzucam opcjonalne” i „Ustawienia”. Brak działania, przewijanie strony ani domyślnie zaznaczone pola nie stanowią zgody.</li>
          <li>Użytkownik może w każdej chwili zmienić wybór przez stale dostępny przycisk „Ustawienia cookies” w stopce. Wycofanie zgody jest równie łatwe jak jej udzielenie.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="kategorie" title="9. Kategorie stosowanych technologii">
        <LegalTable
          headers={["Kategoria", "Cel", "Podstawa", "Domyślne ustawienie"]}
          rows={[
            ["Niezbędne", "Bezpieczeństwo, transmisja, zapamiętanie wyboru cookies i obsługa żądanych funkcji", "Niezbędność techniczna / prawnie uzasadniony interes w bezpieczeństwie", "Zawsze aktywne, tylko w niezbędnym zakresie"],
            ["Analityczne", "Pomiar ruchu i sposobu korzystania ze strony za pomocą Google Analytics", "Dobrowolna zgoda", "Wyłączone do czasu zgody"],
            ["Treści społecznościowe", "Wyświetlenie osadzonego feedu Facebooka i interakcja z treścią Meta", "Dobrowolna zgoda", "Wyłączone do czasu zgody"],
          ]}
        />
        <p>Dokładne nazwy, dostawcy i okresy działania cookies zależą od bieżącej konfiguracji strony i powinny być automatycznie prezentowane w panelu ustawień zgód. Administrator okresowo weryfikuje tę listę po zmianach technicznych.</p>
      </LegalSection>

      <LegalSection id="bezpieczenstwo" title="10. Bezpieczeństwo">
        <LegalList>
          <li>Administrator stosuje środki organizacyjne i techniczne odpowiednie do ryzyka, w tym kontrolę dostępu, aktualizacje, szyfrowaną transmisję HTTPS i ograniczanie zakresu danych.</li>
          <li>Użytkownik powinien zachować ostrożność przy przesyłaniu danych, nie umieszczać danych szczególnie chronionych w Formularzu oraz chronić własne urządzenie i pocztę.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="zmiany" title="11. Zmiany Polityki">
        <LegalList>
          <li>Polityka może być aktualizowana w razie zmian prawa, funkcji strony, dostawców lub sposobów przetwarzania. Aktualna wersja jest publikowana na nallipop.pl z datą aktualizacji.</li>
          <li>Zmiana Polityki nie legalizuje wstecz nowych celów opartych na zgodzie. Jeżeli nowy cel wymaga zgody, zostanie ona pozyskana odrębnie.</li>
        </LegalList>
        <h3>Źródła i informacje uzupełniające</h3>
        <LegalList>
          <li><a href="https://eur-lex.europa.eu/legal-content/PL/TXT/HTML/?uri=CELEX:32016R0679" target="_blank" rel="noreferrer">RODO</a></li>
          <li><a href="https://eli.gov.pl/api/acts/DU/2024/1221/text.html" target="_blank" rel="noreferrer">Prawo komunikacji elektronicznej</a></li>
          <li><a href="https://uodo.gov.pl/pl/138/3720" target="_blank" rel="noreferrer">UODO – poradnik o wizerunku dzieci</a></li>
          <li><a href="https://policies.google.com/privacy?hl=pl" target="_blank" rel="noreferrer">Google – prywatność</a></li>
          <li><a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noreferrer">Meta – zasady prywatności</a></li>
        </LegalList>
      </LegalSection>
    </LegalDocument>
  );
}
