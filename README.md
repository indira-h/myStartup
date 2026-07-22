# My Start-Up – Website-Vorlage

Diese Vorlage ist der Ausgangspunkt für die Website, die ihr im Rahmen des
Moduls **„My Start-Up – Wie gründe ich meine eigene Firma?“** (FH Graubünden,
Institut für Multimedia Production) als Leistungsnachweis in eurer 4er-Gruppe
erstellt und am letzten Unterrichtstag präsentiert.

Der Seitenaufbau orientiert sich am Scribble aus `Scribble_Website_MYS.pdf`:
Firmenname, Claim/Slogan, vier thematische Bereiche (Team, Business Model,
Juristerei, Marketing & Sales), ein Mood Board sowie zwei Video-Thumbnails.

Reines HTML/CSS/JavaScript, keine Frameworks, keine Build-Schritte – ihr
könnt die Dateien direkt im Browser öffnen oder auf einem beliebigen
Webspace hochladen.

## Projektstruktur

```
myStartup/
├── index.html                     Startseite (Titel, Claim, 4 Bereichs-Kacheln, Mood Board, Videos)
├── team/
│   └── index.html                 Team-Seite
├── business-model/
│   └── index.html                 Business-Model-Seite (Canvas, Finanzierung, Buchhaltung, Controlling)
├── juristerei/
│   ├── index.html                 Übersicht rechtliche Themen
│   ├── impressum.html             Impressum
│   ├── datenschutz.html           Datenschutzerklärung
│   └── agb.html                   Allgemeine Geschäftsbedingungen
├── marketing-sales/
│   └── index.html                 Marketing-&-Sales-Seite (Branding, Massnahmen, Sales, Markttests)
├── css/
│   └── style.css                  EINZIGES Stylesheet für alle Seiten
├── js/
│   └── script.js                  EINZIGES Script für alle Seiten
└── README.md                      diese Datei
```

Jede HTML-Seite bindet dieselbe `css/style.css` und `js/script.js` ein. Wer
Header, Footer oder Navigation ändert, muss das **in jeder HTML-Datei**
nachziehen (kein Templating-System, bewusst einfach gehalten).

## Website lokal öffnen

Am einfachsten doppelklickt ihr `index.html` – die Seite funktioniert auch
direkt aus dem Dateisystem (`file://`), da ausschliesslich relative Pfade
verwendet werden. Für die volle Erfahrung (z. B. wenn ihr später einen
Server braucht) reicht z. B. die VS-Code-Erweiterung „Live Server“ oder
`python3 -m http.server`.

## Was ihr anpassen müsst

### 1. Farben, Schrift, Abstände → `css/style.css`, Abschnitt 2

Ganz oben in der Datei stehen die **Design-Tokens** (CSS-Variablen), z. B.:

```css
:root {
  --color-primary: #2563eb; /* eure Hauptfarbe */
  --color-primary-hover: #1d4ed8;
  --color-accent: #f59e0b;
  --font-heading: "Segoe UI", system-ui, sans-serif;
  --font-body: "Segoe UI", system-ui, sans-serif;
}
```

Wenn ihr nur diese Werte ändert, passt sich die **gesamte Website** an, weil
überall mit `var(--...)` statt fixer Farben gearbeitet wird. Für den
Dark-Mode gibt es direkt darunter einen zweiten Block mit den passenden
dunklen Farbwerten.

Wer eine Google Font nutzen will: Link im `<head>` jeder HTML-Seite
einfügen (Anleitung steht als Kommentar in `style.css`, Abschnitt 1) und den
Font-Namen bei `--font-heading` / `--font-body` eintragen.

### 2. Texte, Bilder, Firmenname

Alle Stellen zum Anpassen sind im HTML mit `<!-- ANPASSEN: ... -->`
kommentiert und/oder enthalten Platzhaltertext in `[eckigen Klammern]`.
Sucht in eurem Editor projektweit nach `ANPASSEN`, um keine Stelle zu
übersehen.

- **Firmenname & Claim**: in `index.html` im `.brand`-Bereich (Header) und
  im `.hero`-Bereich, danach idealerweise auch im `<title>` jeder Seite.
- **Mood Board**: Platzhalterfeld in `index.html`. Ersetzt den Inhalt von
  `.mood-board__placeholder` durch ein eigenes Bild, z. B.
  `<img src="images/moodboard.jpg" alt="Moodboard von [Firmenname]">`
  (legt dafür einen Ordner `images/` an).
- **Team-Fotos**: analog in `team/index.html`, `.team-card__photo`.
- **Videos**: In `index.html` bei den zwei `data-video-thumb`-Buttons das
  Attribut `data-video-id="VIDEO_ID_HIER"` durch eure echte YouTube-Video-ID
  ersetzen (der Teil der URL nach `v=`). Ein Klick auf das Thumbnail öffnet
  automatisch ein Video-Fenster (Modal). Solange keine echte ID eingetragen
  ist, erscheint stattdessen ein Hinweis.

### 3. Rechtliche Inhalte → `juristerei/`

`impressum.html`, `datenschutz.html` und `agb.html` enthalten Platzhalter,
die **keine Rechtsberatung** sind. Ersetzt die `[eckigen Klammern]` mit den
im Unterricht „Rechtliche Herausforderungen“ erarbeiteten, korrekten
Angaben. Weitere im Modul geforderte Themen (Urheberrecht/Lizenzen, KI &
Social Media, Kundenverträge, Arbeitsverträge, Markenrecht, Werberecht)
sind als Übersichtskarten in `juristerei/index.html` vorbereitet – ihr
könnt sie dort direkt ausformulieren oder nach demselben Muster wie
`impressum.html` zu eigenen Unterseiten ausbauen.

### 4. Navigation erweitern

Um eine neue Seite hinzuzufügen:

1. Eine bestehende `index.html` (z. B. `team/index.html`) kopieren und Inhalt
   anpassen.
2. In **allen** HTML-Dateien den `<nav class="main-nav">`-Block um einen
   Link zur neuen Seite ergänzen.
3. Im Footer jeder Seite ebenfalls verlinken, falls sinnvoll.

## Funktionen der Vorlage

### Dark- / Light-Mode

Oben rechts im Header schaltet ein Button (Sonne/Mond-Icon) zwischen Light-
und Dark-Mode um. Die Wahl wird in `localStorage` gespeichert und bei
jedem weiteren Besuch automatisch wieder angewendet. Ist noch keine Wahl
gespeichert, richtet sich die Seite nach der Systemeinstellung des Geräts
(`prefers-color-scheme`). Die Farblogik steckt komplett in `css/style.css`
(CSS-Variablen), die Umschalt-Logik in `js/script.js`.

### Responsive / Mobile-Menü

Das Layout ist mobile-first aufgebaut und funktioniert auf Smartphone,
Tablet und Desktop. Auf schmalen Bildschirmen verwandelt sich die
Navigation in ein Hamburger-Menü (Button oben rechts); ab ca. 900px
Breite wird die volle Navigationsleiste angezeigt.

### Video-Modal

Ein Klick auf ein Video-Thumbnail öffnet ein Overlay mit eingebettetem
YouTube-Player, statt die Seite zu verlassen. Schliessen per Klick auf das
✕-Icon, Klick ausserhalb des Fensters oder Escape-Taste.

### Barrierefreiheit (Grundlagen)

„Zum Inhalt springen“-Link, sinnvolle `alt`-Texte für eigene Bilder nicht
vergessen, ausreichende Farbkontraste in beiden Modi, Tastaturbedienbarkeit
von Menü und Modal.

## Bekannte Vereinfachungen (bewusst, für den Unterricht)

- Kein Build-Tool, kein Framework, kein Templating: Header/Footer sind auf
  jeder Seite dupliziert.
- Bilder/Videos sind als Platzhalter (gestrichelte Boxen bzw.
  YouTube-Video-ID) angelegt, damit das Projekt ohne eigene Medien
  lauffähig ist.
- Rechtstexte sind didaktische Platzhalter, keine Rechtsberatung.

Viel Erfolg beim „unternehmerisch Fliegen“!
