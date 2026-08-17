import { createPageMetadata } from "@/lib/seo";
import { LegalDocument, LegalList, LegalSection } from "@/components/LegalDocument";

export const metadata = createPageMetadata({
  title: "Klauzule formularza i zgoda na wizerunek",
  description: "Gotowe klauzule informacyjne, wzór zgody rodzica na wizerunek i wymagania wdrożeniowe Nallipop.",
  path: "/zgody-i-wizerunek",
});

const toc = [
  ["formularz", "Teksty pod formularzem"], ["wizerunek", "Zgoda na wizerunek"],
  ["organizator", "Organizator grupy"], ["fotografowanie", "Informacja o zdjęciach"],
  ["wdrozenie", "Wymagania cookies"], ["uwagi", "Ważne uwagi prawne"],
].map(([id, label]) => ({ id, label }));

export default function ZgodyIWizerunekPage() {
  return (
    <LegalDocument
      eyebrow="Klauzule i wizerunek"
      title="Klauzule formularza i zgoda na wizerunek"
      lead="Gotowe teksty wdrożeniowe dla nallipop.pl oraz wydarzeń Nallipop."
      downloadHref="/Klauzule_formularza_i_zgoda_na_wizerunek_Nallipop.docx"
      toc={toc}
    >
      <LegalSection id="rekomendacja" title="Rekomendacja" highlight>
        <p><strong>Zgodę na wizerunek należy zbierać po potwierdzeniu wydarzenia, a nie w formularzu pierwszego zapytania. Musi dotyczyć konkretnego dziecka, wydarzenia i kanałów publikacji.</strong></p>
      </LegalSection>

      <LegalSection id="formularz" title="A. Teksty pod formularzem zapytania">
        <h3>1. Obowiązkowe potwierdzenie zapoznania się</h3>
        <p className="legal-note">☐ Zapoznałam/-em się z Regulaminem oraz Polityką prywatności. Rozumiem, że wysłanie formularza stanowi jedynie zapytanie i nie oznacza rezerwacji terminu ani zawarcia umowy.</p>
        <p>Pole obowiązkowe. Wyrażenie zgody na przetwarzanie zwykłych danych z zapytania nie jest potrzebne – podstawą jest podjęcie działań na żądanie osoby przed ewentualnym zawarciem umowy. Checkbox potwierdza przekazanie dokumentów, a nie zastępuje podstawy prawnej.</p>

        <h3>2. Krótka klauzula informacyjna pod przyciskiem</h3>
        <p>Administratorem danych jest KamaLogic Kamil Tosnowiec, ul. Nadrzeczna 7, 05-840 Krosna-Parcela, NIP 5342671266. Dane wykorzystamy, aby odpowiedzieć na zapytanie i przygotować ofertę. Podanie danych kontaktowych jest dobrowolne, ale konieczne do udzielenia odpowiedzi. Szczegóły dotyczące odbiorców, okresów przechowywania i praw znajdują się w <a href="/polityka-prywatnosci">Polityce prywatności</a>. Kontakt: <a href="mailto:animacje@nallipop.pl">animacje@nallipop.pl</a>.</p>

        <h3>3. Ostrzeżenie przy polu „Uwagi”</h3>
        <p className="legal-note">Nie wpisuj tutaj danych o zdrowiu dzieci, diagnoz ani innych informacji szczególnie chronionych. Informacje potrzebne dla bezpieczeństwa ustalimy odrębnie po potwierdzeniu rezerwacji.</p>
      </LegalSection>

      <LegalSection id="wizerunek" title="B. Formularz zgody rodzica lub opiekuna na wizerunek">
        <div className="legal-fields">
          <div className="legal-field">Imię i nazwisko rodzica/opiekuna: ................................................................................</div>
          <div className="legal-field">Imię dziecka: .............................................................................................................</div>
          <div className="legal-field">Wydarzenie, data i miejsce: .......................................................................................</div>
          <div className="legal-field">Organizator wydarzenia: .............................................................................................</div>
        </div>
        <p>Oświadczam, że jestem rodzicem lub opiekunem prawnym wskazanego dziecka i mogę decydować o rozpowszechnianiu jego wizerunku. Wyrażam dobrowolną i nieodpłatną zgodę na utrwalanie wizerunku dziecka podczas wskazanego wydarzenia w formie fotografii i krótkich nagrań oraz na jego publikację przez KamaLogic Kamil Tosnowiec, markę Nallipop, w zaznaczonych poniżej kanałach w celu prezentowania i promowania usług Nallipop:</p>
        <div className="legal-channel-list">
          <span>☐ Facebook – <a href="https://www.facebook.com/p/Nallipop-100090355616685/" target="_blank" rel="noreferrer">oficjalny profil Nallipop</a></span>
          <span>☐ Instagram – profil <a href="https://www.instagram.com/animacje_nallipop/" target="_blank" rel="noreferrer">@animacje_nallipop</a></span>
          <span>☐ Strona internetowa nallipop.pl</span>
          <span>☐ Materiały promocyjne Nallipop w formie drukowanej (opcjonalnie – zaznaczyć tylko, jeśli faktycznie będą używane)</span>
        </div>
        <p>Zgoda obejmuje zdjęcia i nagrania indywidualne lub grupowe, bez podawania imienia, nazwiska ani innych danych identyfikujących dziecko. Materiały nie będą używane w sposób naruszający godność lub dobre imię dziecka. Zgoda obowiązuje przez 3 lata od daty wydarzenia, chyba że zostanie wcześniej wycofana.</p>
        <p>Wiem, że zgoda jest dobrowolna, odmowa nie wpływa na udział dziecka w wydarzeniu, a zgodę mogę w każdej chwili wycofać, pisząc na <a href="mailto:animacje@nallipop.pl">animacje@nallipop.pl</a>. Wycofanie nie wpływa na zgodność z prawem wykorzystania sprzed wycofania. Administrator usunie materiał z kanałów pozostających pod jego kontrolą w rozsądnym terminie; nie zawsze może usunąć kopie wykonane wcześniej przez innych użytkowników Internetu.</p>
        <div className="legal-fields"><div className="legal-field">Data i podpis rodzica/opiekuna: ...................................................................................</div></div>
      </LegalSection>

      <LegalSection id="organizator" title="C. Potwierdzenie Organizatora wydarzenia grupowego">
        <p className="legal-note"><strong>Stosuj ostrożnie:</strong> ten wariant nadaje się dla szkoły, przedszkola, firmy lub instytucji tylko wtedy, gdy Organizator rzeczywiście zebrał konkretne zgody obejmujące Nallipop i wskazane kanały. Najbezpieczniej, aby Nallipop dysponował kopiami albo listą potwierdzeń.</p>
        <p>Organizator potwierdza, że przed przekazaniem KamaLogic Kamil Tosnowiec lub umożliwieniem utrwalenia wizerunku uczestników uzyskał od osób uprawnionych dobrowolne i możliwe do wykazania zgody obejmujące: utrwalanie zdjęć/nagrań podczas wydarzenia [nazwa, data, miejsce] oraz publikację przez markę Nallipop w następujących kanałach: [wymienić]. Organizator potwierdza, że przekazał osobom pełną informację o administratorze, celu, kanałach, okresie i prawie wycofania oraz na żądanie przedstawi potwierdzenie zakresu zgód. Osoby bez zgody zostaną jednoznacznie wskazane obsłudze przed rozpoczęciem fotografowania.</p>
        <div className="legal-fields">
          <div className="legal-field">Nazwa Organizatora i osoba upoważniona: ....................................................................</div>
          <div className="legal-field">Data i podpis: ...........................................................................................................</div>
        </div>
      </LegalSection>

      <LegalSection id="fotografowanie" title="D. Opcjonalna informacja przy fotografowaniu">
        <p>Podczas wydarzenia zdjęcia i krótkie nagrania promocyjne wykonuje Nallipop (KamaLogic Kamil Tosnowiec). Fotografowane są wyłącznie osoby objęte ważną zgodą. Jeśli dziecko lub opiekun nie chce zdjęć, prosimy poinformować animatora. Kontakt w sprawie wizerunku: <a href="mailto:animacje@nallipop.pl">animacje@nallipop.pl</a>.</p>
      </LegalSection>

      <LegalSection id="wdrozenie" title="E. Wymagania wdrożeniowe dla cookies">
        <LegalList>
          <li>Przycisk „Odrzucam opcjonalne” powinien być widoczny na pierwszej warstwie i równie łatwy do użycia jak „Akceptuję wszystkie”.</li>
          <li>Google Analytics i osadzony feed Facebooka nie mogą uruchomić się przed zgodą na odpowiednią kategorię.</li>
          <li>Należy zapisywać dowód zgody: jej zakres, czas, wersję komunikatu i identyfikator techniczny w rozsądnym zakresie.</li>
          <li>Na każdej podstronie powinien być dostępny link „Ustawienia cookies”, pozwalający równie łatwo wycofać zgodę.</li>
          <li>Po każdej zmianie skryptów lub dostawców należy wykonać skan cookies i uaktualnić panel oraz Politykę.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="uwagi" title="F. Ważne uwagi prawne">
        <LegalList>
          <li>Nie używaj jednego wspólnego checkboxa łączącego Regulamin, cookies, marketing i wizerunek. Każdy odrębny cel wymagający zgody powinien mieć oddzielny wybór.</li>
          <li>Checkbox zgody na wizerunek musi być domyślnie odznaczony. Treść „zgoda na ewentualną publikację w social mediach” jest niewystarczająca, ponieważ nie określa dziecka, wydarzenia, administratora, kanałów ani okresu.</li>
          <li>Jeżeli formularz zapytania wypełnia Organizator, nie może on automatycznie wyrazić zgody za wszystkich rodziców. Potrzebuje ważnego upoważnienia i zgód obejmujących dokładnie planowane wykorzystanie.</li>
          <li>Warto także zapytać dziecko o zdanie i nie fotografować go wbrew wyraźnemu sprzeciwowi, nawet jeżeli rodzic podpisał zgodę.</li>
        </LegalList>
      </LegalSection>
    </LegalDocument>
  );
}
