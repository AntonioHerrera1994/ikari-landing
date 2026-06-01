// PreciosIkari.js
// Toggle mensual/anual + animaciones de entrada

(function () {
  "use strict";

  /* ── Formateador de números con coma ────────────────── */
  const fmt = (n) => n.toLocaleString("es-MX");

  /* ── Datos de precios ───────────────────────────────── */
  const PRECIOS = {
    ancla:       { mensual: 1699,  anual: 1499  },
    comando:     { mensual: 2199,  anual: 1999  },
    corporativo: { mensual: 2699,  anual: 2499  },
  };

  const NOTAS = {
    mensual: "Facturado mensualmente",
    anual:   (precio) => `$${fmt(precio * 12)}/año — ahorras $${fmt(Math.round(precio * 12 * 0.167))}`,
  };

  /* ── Referencias DOM ────────────────────────────────── */
  const toggleBtn    = document.getElementById("billing-toggle");
  const labelMensual = document.getElementById("label-mensual");
  const labelAnual   = document.getElementById("label-anual");

  let isAnual = false;

  /* ── Toggle ─────────────────────────────────────────── */
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
    const plan = isAnual ? "anual" : "mensual";

    Object.entries(PRECIOS).forEach(([key, prices]) => {
      const amountEl = document.querySelector(`#plan-${key} .price-amount`);
      const noteEl   = document.getElementById(`note-${key}`);
      if (!amountEl) return;

      amountEl.classList.add("animating");

      setTimeout(() => {
        const newPrecio = prices[plan];
        amountEl.textContent = fmt(newPrecio);

        if (noteEl) {
          noteEl.textContent = isAnual
            ? NOTAS.anual(newPrecio)
            : NOTAS.mensual;
        }

        amountEl.classList.remove("animating");
      }, 220);
    });
  }

  /* ── Animaciones de entrada (IntersectionObserver) ─── */
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

  /* ── Init: render inicial con comas + activar label ─── */
  Object.keys(PRECIOS).forEach((key) => {
    const amountEl = document.querySelector(`#plan-${key} .price-amount`);
    if (amountEl) amountEl.textContent = fmt(PRECIOS[key].mensual);
  });

  if (labelMensual) labelMensual.classList.add("active");
})();