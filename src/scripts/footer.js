// FooterIkari.js
// Animación de entrada con IntersectionObserver

(function () {
  "use strict";

  const footer = document.querySelector(".ikari-footer");
  if (!footer) return;

  // Activar animaciones cuando el footer entra al viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footer.classList.add("footer-visible");
          observer.disconnect(); // una sola vez
        }
      });
    },
    { threshold: 0.08 }
  );

  observer.observe(footer);

  // Año dinámico por si no se pasa via prop
  const copyEl = document.querySelector(".footer-copy");
  if (copyEl) {
    const yearSpan = copyEl.querySelector("[data-year]");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  }
})();