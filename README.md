# ISSK — demonstracyjny system służb konduktorskich

Statyczny prototyp przeznaczony do testów interfejsu na GitHub Pages.

## Uruchomienie

Można opublikować cały katalog jako GitHub Pages albo uruchomić lokalny serwer HTTP, np. `python -m http.server 8000`.

Konta demonstracyjne:
- administrator: `admin` / `1234`
- koordynator: `koordynator` / `1234`
- konduktor: `konduktor` / `1234`

Dane są przechowywane w `localStorage` konkretnej przeglądarki.

## WAŻNE — bezpieczeństwo

Ta wersja NIE jest przeznaczona do prawdziwych danych ani kont użytkowników. GitHub Pages serwuje wyłącznie pliki statyczne, więc kod aplikacji i mechanizm logowania są dostępne użytkownikowi przeglądarki. Nie da się bezpiecznie ukryć hasła, klucza ani uprawnień administratora wyłącznie w HTML/JS.

Przed użyciem produkcyjnym należy przenieść uwierzytelnianie i wszystkie operacje zapisu na backend. Zalecany wariant: Node.js + Express/Fastify + PostgreSQL (lub SQLite dla małej instalacji), HTTPS i sesje serwerowe.

W produkcji należy wdrożyć co najmniej:
- Argon2id (ew. bcrypt) dla haseł; nigdy haseł jawnych;
- cookies sesyjne `HttpOnly`, `Secure`, `SameSite=Lax/Strict`, rotację identyfikatora sesji;
- kontrolę RBAC po stronie serwera dla każdego endpointu;
- CSRF dla operacji zmieniających dane przy sesjach cookie;
- ścisłą walidację i normalizację wejścia po stronie serwera;
- parametryzowane zapytania SQL / ORM i brak konkatenacji SQL;
- rate limiting logowania, rejestracji i resetu hasła;
- jednorazowe, kryptograficznie losowe, hashowane tokeny zaproszeń z krótkim TTL;
- reset hasła zamiast możliwości odczytu hasła przez administratora;
- MFA/TOTP przynajmniej dla administratorów i koordynatorów;
- CSP, HSTS, `frame-ancestors 'none'`, `X-Content-Type-Options: nosniff`, Referrer-Policy;
- log audytowy zmian grafiku, przydziałów, ról i kont;
- kopie zapasowe oraz migracje bazy;
- unieważnianie sesji po zmianie hasła/roli i możliwość wylogowania wszystkich sesji;
- blokadę/usuwanie kont zamiast kasowania historii służb;
- ograniczenia długości pól i bezpieczne renderowanie tekstu użytkownika;
- osobne sekrety środowiskowe (`.env`) poza repozytorium.

## Zaimplementowane funkcje demo

- logowanie i role: konduktor / koordynator / administrator;
- kalendarz trzech miesięcy z kolorami dni;
- tworzenie dnia i określanie koordynacji autobus/tramwaj;
- dowolna liczba służb, linia/brygada, godziny, zajezdnia, pojazd, uwagi, liczba osób;
- szkolenia: brygada szkoleniowa, instruktor, kandydat, godzina;
- data/godzina otwarcia zapisów i ręczne zamknięcie zapisów;
- limit zgłoszeń = obsada + 4;
- zgłaszanie się konduktora;
- przyjmowanie/odrzucanie i ręczne przypisywanie przez koordynatora;
- odrzucony użytkownik nie może ponownie zgłosić się do tej samej służby;
- Moje służby, historia, suma czasu i rezygnacja >=24 h przed służbą;
- komunikaty tworzone przez koordynatora/admina;
- jednorazowe linki rejestracyjne demo, wnioski i akceptacja przez administratora;
- edycja danych, rangi, aktywności i hasła użytkownika.

## Do backendu / następnego etapu

Automatyczne zamykanie zapisów 36 h przed rozpoczęciem dnia powinno być egzekwowane na serwerze (nie tylko w UI). Tak samo limity miejsc, uprawnienia, terminy rezygnacji i wszystkie przydziały muszą być ponownie sprawdzane atomowo przez backend, aby dwóch użytkowników nie mogło obejść limitu równoczesnymi żądaniami.

## Zmiany — wersja 1.1
- po zaakceptowaniu/przypisaniu osoba pojawia się na liście przydzielonych osób;
- szkolenie ma nagłówek „BRYGADA SZKOLENIOWA”, bez pola o tej nazwie;
- instruktor jest wybierany z aktywnych kont, kandydat może być wybrany/wpisany;
- można ręcznie przypisać uczestnika przed otwarciem zapisów;
- konduktor widzi liczbę zgłoszeń, ale nie limit zgłoszeń;
- nieaktywne konto otrzymuje osobny komunikat przy logowaniu;
- nowe/zmieniane hasła wymagają minimum 8 znaków;
- naprawiono publikowanie komunikatów;
- dodanie kolejnej służby zachowuje dane wpisane w poprzednich wierszach.

Konta demonstracyjne po migracji: `admin / 12345678`, `koordynator / 12345678`, `konduktor / 12345678`.

## Zmiany v1.2
- Czerwono-pomarańczowy motyw interfejsu.
- Kopiowanie całego dnia na inną datę bez zgłoszeń, przydziałów, odrzuceń, rezerwy i danych szkoleniowych.
- Tryb „kto pierwszy, ten lepszy”: wolne miejsce jest przydzielane automatycznie w chwili zgłoszenia.
- Rezerwa dnia w trybie „kto pierwszy, ten lepszy”.
- Autobusy nie przyjmują zgłoszeń ponad wymaganą obsadę. Dodatkowe 4 zgłoszenia dotyczą wyłącznie tramwajów w zwykłym trybie.
- Tramwaje są zawsze prezentowane przed autobusami.
- Koordynator/administrator może zmieniać kolejność służb strzałkami w obrębie tramwajów i autobusów.

## Zmiany v1.3
- po publikacji koordynator otwiera ten sam widok dnia co konduktor, z dodatkowymi narzędziami obsady i przyciskiem Edytuj,
- maksymalnie 2 zgłoszenia/przydziały na służby dziennie na użytkownika,
- osobne uprawnienie konta do zapisów tramwajowych,
- podział służby według godziny i miejsca zmiany,
- rozróżnienie rezygnacji z ręcznego przydziału koordynatora od zwykłego/automatycznego zgłoszenia,
- zakładka Informacje,
- pełna obsługa wskazania koordynatora tramwajowego i autobusowego,
- w trybie „kto pierwszy, ten lepszy” ukryta liczba zgłoszeń,
- usunięty domyślny komunikat demonstracyjny,
- kolory zebrane w zmiennych CSS na początku `css/main.css` i opisane komentarzami.
