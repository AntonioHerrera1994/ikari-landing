// sectores.js — Selector de sectores interactivo Ikari

(function () {
  "use strict";

  /* ── Datos por sector ────────────────────────────────── */
  const SECTORES = {
    salud: {
      color:    "#53c6d6",
      colorDk:  "#0e6678",
      eyebrow:  "⚕ Clínicas y Centros de Salud",
      eyeBg:    "#eef7f9",
      eyeColor: "#0e6678",
      titleLine1: "Gestión clínica sin",
      titleLine2: "caos ni ausentismo.",
      desc: "Ikari centraliza expedientes, agenda médica, cobros y recordatorios automáticos en un solo sistema. Tus doctores atienden, tú controlas.",
      features: [
        "Agenda visual por doctor y sede",
        "Expedientes clínicos y CRUD de pacientes",
        "Recordatorios automáticos por WhatsApp",
        "Control de cobros y caja diaria",
        "Reducción del 35% en ausentismo clínico",
      ],
      stats: [
        { n: "−35%", l: "Ausentismo" },
        { n: "+2h",  l: "Productividad/día" },
        { n: "100%", l: "Trazabilidad" },
      ],
      cta: "Ver demo para clínicas",
    },
    agencias: {
      color:    "#2b61ae",
      colorDk:  "#1a4a8a",
      eyebrow:  "📋 Agencias y Consultoras",
      eyeBg:    "#e8f0fb",
      eyeColor: "#1a4a8a",
      titleLine1: "Cierra más contratos,",
      titleLine2: "más rápido.",
      desc: "Pipeline Kanban con etapas personalizadas para ciclos de venta largos. Gestiona propuestas, da seguimiento a cada tomador de decisión y mide tu conversión en tiempo real.",
      features: [
        "Pipeline Kanban totalmente configurable",
        "Historial de interacciones por prospecto",
        "Email marketing automatizado por etapa",
        "Reportes de conversión y tiempo de cierre",
        "Roles y permisos por asesor comercial",
      ],
      stats: [
        { n: "+60%", l: "Leads convertidos" },
        { n: "3×",   l: "Velocidad de cierre" },
        { n: "0",    l: "Leads perdidos" },
      ],
      cta: "Ver demo para agencias",
    },
    real: {
      color:    "#f26b4f",
      colorDk:  "#8c3a20",
      eyebrow:  "🏢 Bienes Raíces",
      eyeBg:    "#fff3f0",
      eyeColor: "#8c3a20",
      titleLine1: "Del primer contacto",
      titleLine2: "al cierre firmado.",
      desc: "Conecta tu catálogo de propiedades con el CRM. Asigna asesores, agenda visitas, da seguimiento a cada oferta y cierra operaciones sin perder ningún lead en el camino.",
      features: [
        "Pipeline inmobiliario con etapas personalizadas",
        "Agenda de visitas a inmuebles por asesor",
        "Asignación automática de prospectos",
        "Seguimiento hasta escritura firmada",
        "App móvil para asesores en campo",
      ],
      stats: [
        { n: "0",   l: "Leads sin seguimiento" },
        { n: "+40%", l: "Visitas realizadas" },
        { n: "1",   l: "Sistema para todo" },
      ],
      cta: "Ver demo para real estate",
    },
    corp: {
      color:    "#ccdc60",
      colorDk:  "#3a5000",
      eyebrow:  "🏗 Multi-sede y Corporativo",
      eyeBg:    "#f5fadf",
      eyeColor: "#3a5000",
      titleLine1: "Una operación.",
      titleLine2: "Múltiples sedes.",
      desc: "Administra todas tus sedes desde un panel central. Usuarios ilimitados, WhatsApp Business API oficial, reportes consolidados y un gestor de cuenta que conoce tu negocio.",
      features: [
        "Dashboard consolidado multi-sede",
        "WhatsApp Business API oficial (Meta)",
        "Usuarios, roles y permisos ilimitados",
        "Reportes comparativos por sede y globales",
        "Onboarding dedicado y gestor de cuenta",
      ],
      stats: [
        { n: "∞",    l: "Sedes activas" },
        { n: "99.9%", l: "Uptime garantizado" },
        { n: "24/7",  l: "Soporte prioritario" },
      ],
      cta: "Ver demo corporativo",
    },
  };

  /* ── Referencias DOM ─────────────────────────────────── */
  const cards      = document.querySelectorAll(".sec-card");
  const panelInner = document.getElementById("secPanelInner");

  if (!panelInner || !cards.length) return;

  /* ── Render del panel ────────────────────────────────── */
  function renderPanel(key) {
    const d = SECTORES[key];
    if (!d) return;

    const featuresHTML = d.features.map(f => `
      <li class="sec-feature">
        <span class="sec-check" style="background:${d.color}22">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke="${d.color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </span>
        ${escHtml(f)}
      </li>`).join("");

    const statsHTML = d.stats.map(s => `
      <div class="sec-stat">
        <span class="sec-stat-n" style="color:${d.color}">${escHtml(s.n)}</span>
        <span class="sec-stat-l">${escHtml(s.l)}</span>
      </div>`).join("");

    panelInner.innerHTML = `
      <span class="sec-panel-eyebrow"
        style="background:${d.eyeBg};color:${d.eyeColor}">
        ${d.eyebrow}
      </span>
      <h3 class="sec-panel-title">
        ${escHtml(d.titleLine1)}<br/>
        <em style="color:${d.color}">${escHtml(d.titleLine2)}</em>
      </h3>
      <p class="sec-panel-desc">${escHtml(d.desc)}</p>
      <ul class="sec-features">${featuresHTML}</ul>
      <a href="#demo" class="sec-panel-cta" style="background:${d.colorDk}">
        ${escHtml(d.cta)}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
      <div class="sec-stats">${statsHTML}</div>
    `;

    /* Re-trigger animation */
    panelInner.classList.remove("animating");
    void panelInner.offsetWidth;
    panelInner.classList.add("animating");
  }

  /* ── Cambio de sector ────────────────────────────────── */
  function selectSector(key) {
    cards.forEach(card => {
      const isActive = card.dataset.sector === key;
      card.classList.toggle("active", isActive);
      card.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    renderPanel(key);
  }

  /* ── Eventos ─────────────────────────────────────────── */
  cards.forEach(card => {
    card.addEventListener("click", () => selectSector(card.dataset.sector));

    // Teclado: Enter / Space
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectSector(card.dataset.sector);
      }
    });
  });

  /* ── Escape ──────────────────────────────────────────── */
  function escHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* ── Init ────────────────────────────────────────────── */
  selectSector("salud");

})();