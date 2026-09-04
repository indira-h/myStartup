/* =============================================================================
   MY START-UP – WEBSITE TEMPLATE
   Script: js/script.js
   -----------------------------------------------------------------------------
   Dies ist die EINZIGE JavaScript-Datei des Projekts und wird von jeder
   HTML-Seite eingebunden (kurz vor dem schliessenden </body>-Tag).

   INHALTSVERZEICHNIS:
     1. Dark/Light-Mode-Umschalter
     2. Mobiles Navigationsmenü (Hamburger)
     3. Video-Modal (Lightbox für die zwei Video-Thumbnails)
     4. Aktuellen Menüpunkt hervorheben (aria-current)
     5. Footer-Jahr automatisch aktuell halten

   HINWEIS: Der Dark/Light-Mode-Teil ganz unten läuft NICHT hier, sondern als
   kleines Inline-Script im <head> jeder Seite (siehe Kommentar dort). Das ist
   nötig, damit die Seite beim Laden nicht kurz im falschen Modus aufblitzt
   ("Flash of wrong theme"). Dieses Script hier kümmert sich nur noch um den
   KLICK auf den Umschalt-Button.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileNav();
  initVideoModal();
  highlightCurrentNavLink();
  updateFooterYear();
});


/* -----------------------------------------------------------------------------
   1. DARK / LIGHT MODE UMSCHALTER
   -----------------------------------------------------------------------------
   Die eigentliche Theme-Logik (Farben) steckt in css/style.css unter
   "html[data-theme='dark']" bzw. "html[data-theme='light']".
   Dieses Script setzt/liest nur das Attribut data-theme auf <html> und merkt
   sich die Wahl der Nutzer:in in localStorage, damit sie beim nächsten Besuch
   erhalten bleibt.
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleButtons = document.querySelectorAll("[data-theme-toggle]");
  if (!toggleButtons.length) return;

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const root = document.documentElement;
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";

      root.setAttribute("data-theme", next);
      localStorage.setItem("my-startup-theme", next);

      // Für Screenreader hörbar machen, welcher Modus jetzt aktiv ist.
      button.setAttribute(
        "aria-label",
        next === "dark" ? "Zu Light-Mode wechseln" : "Zu Dark-Mode wechseln"
      );
    });
  });
}


/* -----------------------------------------------------------------------------
   2. MOBILES NAVIGATIONSMENÜ (HAMBURGER)
   -----------------------------------------------------------------------------
   Auf kleinen Bildschirmen (siehe Media Queries in style.css) ist die
   Hauptnavigation standardmässig ausgeblendet. Der Hamburger-Button
   (Klasse .nav-toggle) blendet sie ein/aus.
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const mainNav = document.querySelector("[data-main-nav]");
  if (!navToggle || !mainNav) return;

  // Zentrale Funktion für Öffnen/Schliessen: setzt alle nötigen Attribute an
  // einer Stelle (Menü, Button, aria-label) und sperrt zusätzlich das
  // Scrollen im Hintergrund, solange das Menü offen ist – genau wie beim
  // Bild-/Video-Modal weiter unten in dieser Datei.
  function setOpen(isOpen) {
    mainNav.setAttribute("data-open", String(isOpen));
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Menü schliessen" : "Menü öffnen");
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.getAttribute("data-open") === "true";
    setOpen(!isOpen);
  });

  // Menü schliessen, sobald ein Link angeklickt wird (z. B. bei Sprungmarken).
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setOpen(false);
    });
  });

  // Menü schliessen, wenn die Seite auf Desktop-Breite vergrössert wird,
  // damit es nicht "offen" hängen bleibt, wenn man das Fenster verkleinert.
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 900) {
      setOpen(false);
    }
  });
}


/* -----------------------------------------------------------------------------
   3. VIDEO-MODAL (LIGHTBOX)
   -----------------------------------------------------------------------------
   Jedes Element mit [data-video-thumb] öffnet beim Klick ein Modal-Fenster
   mit einem eingebetteten YouTube-Video. Die Video-ID wird aus dem Attribut
   data-video-id gelesen.

   ANPASSEN: Tragt eure eigene YouTube-Video-ID im HTML ein, z. B.
   <button data-video-thumb data-video-id="dQw4w9WgXcQ"> ... </button>
   Die ID ist der Teil der YouTube-URL nach "v=", z. B.
   https://www.youtube.com/watch?v=dQw4w9WgXcQ  ->  dQw4w9WgXcQ

   Wer lieber Vimeo nutzt, kann die Zeile mit "youtube.com/embed/" unten durch
   die Vimeo-Embed-URL ersetzen, z. B. "https://player.vimeo.com/video/".
   -------------------------------------------------------------------------- */
function initVideoModal() {
  const modal = document.querySelector("[data-video-modal]");
  const thumbs = document.querySelectorAll("[data-video-thumb]");
  if (!modal || !thumbs.length) return;

  const iframe = modal.querySelector("iframe");
  const closeButton = modal.querySelector("[data-modal-close]");
  let lastFocusedElement = null;

  function openModal(videoId) {
    lastFocusedElement = document.activeElement;
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    closeButton.focus();
    document.addEventListener("keydown", handleKeydown);
  }

  function closeModal() {
    modal.hidden = true;
    iframe.src = ""; // Video stoppen, indem die Quelle geleert wird.
    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleKeydown);
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function handleKeydown(event) {
    if (event.key === "Escape") closeModal();
  }

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const videoId = thumb.getAttribute("data-video-id");
      if (!videoId || videoId === "VIDEO_ID_HIER") {
        // Solange noch keine echte Video-ID eingetragen wurde, informieren
        // wir kurz statt einen leeren Player zu öffnen.
        alert(
          "Hier ist noch kein Video hinterlegt.\n" +
            "Trage im HTML beim jeweiligen Thumbnail das Attribut " +
            'data-video-id="DEINE_YOUTUBE_VIDEO_ID" ein.'
        );
        return;
      }
      openModal(videoId);
    });
  });

  closeButton.addEventListener("click", closeModal);

  // Klick auf den dunklen Hintergrund schliesst das Modal ebenfalls.
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
}


/* -----------------------------------------------------------------------------
   4. AKTUELLEN MENÜPUNKT HERVORHEBEN
   -----------------------------------------------------------------------------
   Vergleicht die aktuelle URL mit den Links in der Navigation und markiert
   den passenden Link mit aria-current="page" (wird in style.css optisch
   hervorgehoben). Rein kosmetisch/UX, keine Anpassung nötig.
   -------------------------------------------------------------------------- */
function highlightCurrentNavLink() {
  const links = document.querySelectorAll("[data-main-nav] a");
  const currentPath = window.location.pathname.replace(/\/index\.html$/, "/");

  links.forEach((link) => {
    const linkUrl = new URL(link.href);
    const linkPath = linkUrl.pathname.replace(/\/index\.html$/, "/");
    if (linkPath === currentPath) {
      link.setAttribute("aria-current", "page");
    }
  });
}


/* -----------------------------------------------------------------------------
   5. FOOTER-JAHR AUTOMATISCH AKTUELL HALTEN
   -----------------------------------------------------------------------------
   Ersetzt den Inhalt jedes Elements mit [data-current-year] durch das
   aktuelle Jahr, damit im Footer nie ein veraltetes Copyright-Jahr steht.
   -------------------------------------------------------------------------- */
function updateFooterYear() {
  const yearElements = document.querySelectorAll("[data-current-year]");
  const currentYear = new Date().getFullYear();
  yearElements.forEach((el) => {
    el.textContent = String(currentYear);
  });
}
(function () {
  var trigger = document.querySelector('[data-image-trigger]');
  var modal = document.querySelector('[data-image-modal]');
  if (!trigger || !modal) return;

  var img = modal.querySelector('[data-image-modal-img]');
  var closeBtn = modal.querySelector('[data-modal-close]');

  function openModal() {
    img.src = trigger.getAttribute('data-image-src');
    img.alt = trigger.getAttribute('data-image-alt') || '';
    modal.hidden = false;
  }

  function closeModal() {
    modal.hidden = true;
    img.src = '';
  }

  trigger.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
})();