// currency.js — Detección de moneda por geolocalización IP
// MX → MXN | US + resto → USD

(function () {
  "use strict";

  const PRECIOS = {
    mxn: {
      ancla:       { mensual: 1699,  anual: 1499  },
      comando:     { mensual: 2199,  anual: 1999  },
      corporativo: { mensual: 2699,  anual: 2499  },
      simbolo:     "$",
      codigo:      "MXN",
      locale:      "es-MX",
      notaMensual: "Facturado mensualmente",
      notaAnual:   (p) => `$${fmt(p * 12, "es-MX")}/año — ahorras $${fmt(Math.round(p * 12 * 0.167), "es-MX")}`,
    },
    usd: {
      ancla:       { mensual: 199,   anual: 179   },
      comando:     { mensual: 249,   anual: 224   },
      corporativo: { mensual: 299,   anual: 269   },
      simbolo:     "$",
      codigo:      "USD",
      locale:      "en-US",
      notaMensual: "Billed monthly",
      notaAnual:   (p) => `$${fmt(p * 12, "en-US")}/yr — you save $${fmt(Math.round(p * 12 * 0.167), "en-US")}`,
    },
  };

  const PLANES = ["ancla", "comando", "corporativo"];

  /* ── Formateador ─────────────────────────────────────── */
  function fmt(n, locale) {
    return n.toLocaleString(locale);
  }

  /* ── Aplicar moneda al DOM ───────────────────────────── */
  function applyMoneda(currency) {
    const cfg = PRECIOS[currency];
    if (!cfg) return;

    // Guardar en sessionStorage para el toggle mensual/anual
    window.__ikariCurrency = currency;
    window.__ikariPrecios  = cfg;

    // Detectar si el toggle está en anual
    const isAnual = document.getElementById("billing-toggle")?.classList.contains("on") || false;
    const plan    = isAnual ? "anual" : "mensual";

    PLANES.forEach((key) => {
      const amountEl  = document.querySelector(`#plan-${key} .price-amount`);
      const noteEl    = document.getElementById(`note-${key}`);
      const periodEls = document.querySelectorAll(`#plan-${key} .price-period`);

      if (!amountEl) return;

      const precio = cfg[key][plan];
      amountEl.textContent = fmt(precio, cfg.locale);

      if (noteEl) {
        noteEl.textContent = isAnual ? cfg.notaAnual(precio) : cfg.notaMensual;
      }

      // Actualizar /mes o /mo según locale
      periodEls.forEach(el => {
        el.textContent = currency === "usd" ? "/mo" : "/mes";
      });
    });

    // Badge ahorro del toggle
    const badgeEl = document.querySelector(".badge-ahorro");
    if (badgeEl) {
      badgeEl.textContent = currency === "usd" ? "2 months free" : "2 meses gratis";
    }
  }

  /* ── Detectar país ───────────────────────────────────── */
  async function detectCurrency() {
    // Revisar sessionStorage primero para no hacer llamadas repetidas
    const cached = sessionStorage.getItem("ikari_currency");
    if (cached === "mxn" || cached === "usd") {
      applyMoneda(cached);
      return;
    }

    try {
      const res  = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      const currency = data.country_code === "MX" ? "mxn" : "usd";
      sessionStorage.setItem("ikari_currency", currency);
      applyMoneda(currency);
    } catch {
      // Fallback silencioso — deja los precios MXN por defecto
      applyMoneda("mxn");
    }
  }

  /* ── Parchear el toggle para que respete la moneda ───── */
  function patchToggle() {
    const toggleBtn = document.getElementById("billing-toggle");
    if (!toggleBtn) return;

    toggleBtn.addEventListener("change-currency", () => {
      const currency = window.__ikariCurrency || "mxn";
      applyMoneda(currency);
    });
  }

  /* ── Init ────────────────────────────────────────────── */
  // Esperar a que el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      detectCurrency();
      patchToggle();
    });
  } else {
    detectCurrency();
    patchToggle();
  }

})();