# Panel galerii Nallipop

Panel jest dostępny pod `/admin`. Lokalne dane logowania znajdują się w `.admin-access.txt` (plik jest wykluczony z Git). Hasło warto zapisać w menedżerze haseł.

## Obsługa

- **Dodaj nowe zdjęcia**: wybierz jeden lub kilka plików JPG, PNG, WebP lub AVIF, do 12 MB i 40 megapikseli każdy. Wpisz kategorię, opcjonalnie tytuł pojedynczego zdjęcia, i kliknij **Dodaj do galerii**.
- **Edytuj**: zmień tytuł, kategorię, opis alternatywny lub podmień plik. Zatwierdź przyciskiem **Zapisz zmiany**.
- **Ukryj / Pokaż**: steruje widocznością w publicznej galerii.
- **Do kosza**: usuwa pozycję z widoku publicznego. Zakładka **Kosz** umożliwia przywrócenie. Panel nie usuwa bezpowrotnie oryginałów z Firebase.
- **Sprawdź dotychczasowe foldery**: jednorazowo importuje nowe pozycje dodane poza panelem do starych folderów. Zachowuje edycje, ukryte zdjęcia i kosz.

Zmiany są widoczne po ponownym pobraniu galerii, np. odświeżeniu strony. Panel obejmuje katalog galerii, także fotografie i filmy wczytywane stamtąd na stronie głównej i w ofercie. Statyczne zdjęcia banerów i ilustracje poszczególnych ofert pozostają częścią kodu strony. Dotychczasowe filmy można opisywać i ukrywać; dodawanie nowych plików w panelu obejmuje zdjęcia.

## Uruchomienie i wdrożenie

Wymagany Node.js 22. Gotową aplikację uruchamia `npm run build` i `npm start` (lub istniejący serwer `app.js`). Panel wymaga uruchomionego serwera Next.js — nie działa jako sam statyczny eksport.

Zmienne środowiskowe na serwerze:

- `FIRESTORE_MONGODB_URI` i `FIRESTORE_MONGODB_DATABASE`: istniejące połączenie z bazą MongoDB/Firestore MongoDB.
- `ADMIN_USERNAME` i `ADMIN_PASSWORD_HASH`: wartości wygenerowane lokalnie w `.env.local`.
- `NEXT_PUBLIC_SITE_URL`: właściwy adres HTTPS strony, np. `https://nallipop.pl`.

Nie dodawaj prefiksu `NEXT_PUBLIC_` do hasła ani danych bazy. Ustawienie zmiennych i restart aplikacji są niezbędne po przeniesieniu na hosting. Produkcyjny adres powinien używać HTTPS; ciasteczko sesji jest oznaczone Secure poza localhost.

`npm run admin:setup` tworzy konto tylko wtedy, gdy nie zostało jeszcze skonfigurowane. `npm run admin:setup -- --reset` generuje nowe losowe hasło i hash. Po resecie należy zaktualizować zmienne na serwerze i zrestartować aplikację; poprzednie sesje przestają działać. Nie wysyłaj pliku `.admin-access.txt` do repozytorium ani katalogu publicznego.

## Przechowywanie i wydajność

Metadane znajdują się w `gallery_media`, zoptymalizowane pliki WebP i miniatury w `gallery_images`, stan importu w `gallery_settings`. Uwierzytelnianie używa `admin_sessions` i `admin_login_limits`. Kopia zapasowa bazy powinna obejmować katalog oraz obrazy. Pliki nie zależą od lokalnego dysku serwera i przetrwają ponowne wdrożenie.

Nowe zdjęcia są automatycznie obracane zgodnie z EXIF, pomniejszane do maksymalnie 1920 px i zapisywane jako WebP; miniatury mają maksymalnie 560 px. Metadane EXIF są usuwane z wersji publicznych. Duże pliki mogą zostać dodatkowo pomniejszone, by oba warianty zmieściły się w dokumencie bazy.

Dotychczasowe pliki z Firebase są importowane do katalogu, a ich zoptymalizowane wersje zapisywane przy pierwszym odczycie. Obecne 37 zdjęć zostało już przetworzonych: oryginały mają łącznie 133 963 715 bajtów, miniatury 1 454 386 bajtów (około 99% mniej). Są też 4 dotychczasowe filmy. Odczyt dodatkowej kolekcji Firestore nie był dostępny; import z trzech dotychczasowych folderów Storage zakończył się poprawnie.

Publiczna galeria pobiera 24 pozycje na stronę, strona główna 12. Miniatury wczytują się leniwie, a filmy dopiero po wybraniu. Lista publiczna jest rewalidowana, obrazy mają wersjonowane adresy i godzinną pamięć podręczną. Wcześniej pobrana kopia zdjęcia może pozostać w cache przeglądarki do jego wygaśnięcia.

## Weryfikacja

`npm run admin:test` sprawdza hasła, tokeny, pochodzenie żądań, dozwolone źródła obrazów, limity danych oraz przetwarzanie plików. `npm run build` sprawdza kompilację.

Dodatkowo sprawdzono HTTP: logowanie i błędne hasło, brak dostępu bez sesji, blokadę żądań z obcej domeny, wysłanie i podmianę zdjęcia, edycję opisu, ukrywanie, kosz i przywracanie, odrzucenie nieprawidłowego pliku oraz unieważnienie sesji po wylogowaniu. Dane testowe usunięto.
