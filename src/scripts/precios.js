(function () {
  "use strict";

  const fmt = (n, locale) => n.toLocaleString(locale || "es-MX");

  const PRECIOS_DEFAULT = {
    ancla:       { mensual: 1699, anual: 1499 },
    comando:     { mensual: 2199, anual: 1999 },
    corporativo: { mensual: 2699, anual: 2499 },
  };

  const toggleBtn    = document.getElementById("billing-toggle");
  const labelMensual = document.getElementById("label-mensual");
  const labelAnual   = document.getElementById("label-anual");

  let isAnual = false;

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      isAnual = !isAnual;
      toggleBtn.classList.toggle("on", isAnual);
      toggleBtn.setAttribute("aria-checked", String(isAnual));
      labelMensual.classList.toggle("active", !isAnual);
      labelAnual.classList.toggle("active", isAnual);
      updatePrices();
    });
  }

  function updatePrices() {
    const cfg     = window.__ikariPrecios;
    const locale  = cfg?.locale || "es-MX";
    const precios = cfg || PRECIOS_DEFAULT;
    const plan    = isAnual ? "anual" : "mensual";

    const notaMensual = cfg?.notaMensual || "Facturado mensualmente";
    const notaAnual   = cfg?.notaAnual   || ((p) => `$${fmt(p * 12, locale)}/año — ahorras $${fmt(Math.round(p * 12 * 0.167), locale)}`);
    const periodo     = cfg?.codigo === "USD" ? "/mo" : "/mes";

    ["ancla", "comando", "corporativo"].forEach((key) => {
      const amountEl  = document.querySelector(`#plan-${key} .price-amount`);
      const noteEl    = document.getElementById(`note-${key}`);
      const periodEls = document.querySelectorAll(`#plan-${key} .price-period`);

      if (!amountEl) return;

      amountEl.classList.add("animating");

      setTimeout(() => {
        const precio = precios[key][plan];
        amountEl.textContent = fmt(precio, locale);

        if (noteEl) {
          noteEl.textContent = isAnual ? notaAnual(precio) : notaMensual;
        }

        periodEls.forEach(el => { el.textContent = periodo; });
        amountEl.classList.remove("animating");
      }, 220);
    });
  }

  /* ── Esperar a que currency.js detecte la moneda ─────── */
  window.addEventListener("ikari:currency", () => {
    updatePrices();
  });

  /* ── Si currency.js ya corrió antes (sessionStorage) ─── */
  if (window.__ikariPrecios) {
    updatePrices();
  }

  /* ── Animaciones de entrada ──────────────────────────── */
  const cards = document.querySelectorAll(".plan-card");
  if (cards.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((card) => observer.observe(card));
  }

  if (labelMensual) labelMensual.classList.add("active");
})();