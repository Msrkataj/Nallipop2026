# Newsletter: jesienna kula

## Podgląd bez wysyłania

W katalogu `nallipop` uruchom `npm run newsletter:preview` i otwórz wygenerowany `newsletter-preview/jesienna-kula.html`. Plik jest samowystarczalny, z osadzoną grafiką. Podgląd nie potrzebuje hasła SMTP i nie wysyła wiadomości.

## Test na własną skrzynkę

Uruchom `npm run newsletter:test`. To świadomie wysyła jeden e-mail wyłącznie na `msrkataj@gmail.com`. Kolejne uruchomienie wyśle kolejny test. Nie ma importu ani wysyłki do bazy klientów.

Skrypt korzysta z `GMAIL_USER` i `GMAIL_APP_PASSWORD` z istniejącej konfiguracji `.env.local`, tej samej co formularze. Nie umieszczaj tych danych w kodzie ani pliku HTML. Odpowiedzi trafiają na `animacje@nallipop.pl`. Grafika jest dołączona do wiadomości przez CID; test nie wymaga publikacji jej na hostingu.

Szablon i tekst są w `src/lib/autumn-newsletter.mjs`, grafika w `public/images/newsletter-jesienna-kula.png`. Nadawca SMTP pozostaje uwierzytelnionym kontem, aby nie podszywać się pod inny adres.

`npm run newsletter:check` sprawdza szablon i strukturę MIME bez wysyłania. Podgląd w przeglądarce nie zastępuje testu w Gmailu i Outlooku. Sprawdź także telefon, folder Oferty/Spam i działanie przycisku.

## Przed wysyłką do klientów

Ten wariant jest testowy. Masowa wysyłka wymaga wdrożenia działającego mechanizmu wypisu, listy rezygnacji i zweryfikowanych zgód na marketing e-mailowy (zgoda na Customer Match nie zastępuje tej zgody). Nie dodano fikcyjnego linku wypisu. Termin oferty to 31 października 2026; przed ponownym użyciem zaktualizuj ofertę.

Nie zmieniono formularzy, API rezerwacji ani publicznych endpointów wysyłki. Dla lokalnego testu nie trzeba niczego publikować na hostingu.
