// sectores.js — Selector de sectores interactivo Ikari

(function () {
  "use strict";

  /* ── Datos por sector ────────────────────────────────── */
  const SECTORES = {
    salud: {
      color:    "#53c6d6",
      colorDk:  "#0e6678",
      eyebrow:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.5l8-8a4.94 4.94 0 0 1 7 7l-8 8a4.94 4.94 0 0 1-7-7"/><path d="M9 12h4"/><path d="M11 10v4"/></svg> Clínicas y Centros de Salud`,
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
      ctaHref: "https://wa.me/526632477816?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20Ikari%20para%20cl%C3%ADnicas%20y%20centros%20de%20salud.%20%C2%BFPodr%C3%ADan%20darme%20informaci%C3%B3n%20sobre%20el%20sistema%3F",
    },
    agencias: {
      color:    "#2b61ae",
      colorDk:  "#1a4a8a",
      eyebrow:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12.01"/><path d="M3 13a20 20 0 0 0 18 0"/></svg> Agencias y Consultoras`,
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
      cta: "Próximamente",
      ctaDisabled: true,
    },
    real: {
      color:    "#f26b4f",
      colorDk:  "#8c3a20",
      eyebrow:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l18 0"/><path d="M5 21v-16a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 8l1 0"/><path d="M9 12l1 0"/><path d="M14 8l1 0"/><path d="M14 12l1 0"/></svg> Bienes Raíces`,
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
        { n: "0",    l: "Leads sin seguimiento" },
        { n: "+40%", l: "Visitas realizadas" },
        { n: "1",    l: "Sistema para todo" },
      ],
      cta: "Próximamente",
      ctaDisabled: true,
    },
    educacion: {
      color:    "#7c3aed",
      colorDk:  "#6d28d9",
      eyebrow:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg> Educación y Academias`,
      eyeBg:    "#f0eafe",
      eyeColor: "#6d28d9",
      titleLine1: "Del prospecto inscrito",
      titleLine2: "al alumno fidelizado.",
      desc: "Gestiona inscripciones, seguimiento de prospectos, pagos de colegiatura y comunicación con padres o alumnos desde un solo sistema integrado.",
      features: [
        "Pipeline de inscripción por ciclo escolar",
        "Seguimiento de prospectos y visitas al plantel",
        "Control de pagos y adeudos por alumno",
        "Comunicación masiva con padres de familia",
        "Reportes de ocupación y deserción escolar",
      ],
      stats: [
        { n: "+50%", l: "Tasa de inscripción" },
        { n: "−40%", l: "Deserción escolar" },
        { n: "1",    l: "Sistema integrado" },
      ],
      cta: "Próximamente",
      ctaDisabled: true,
    },
    estetica: {
      color:    "#db2777",
      colorDk:  "#9d174d",
      eyebrow:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> Estética & Wellness`,
      eyeBg:    "#fce8f3",
      eyeColor: "#9d174d",
      titleLine1: "Más citas, clientes",
      titleLine2: "que regresan siempre.",
      desc: "Agenda de servicios por estilista o terapeuta, historial de tratamientos, control de productos e inventario. Tu salón o spa operando sin papel ni confusión.",
      features: [
        "Agenda de citas por estilista o cabina",
        "Historial de servicios y tratamientos por cliente",
        "Control de inventario de productos",
        "Recordatorios automáticos de cita por WhatsApp",
        "Programa de lealtad y seguimiento postventa",
      ],
      stats: [
        { n: "+45%", l: "Retención de clientes" },
        { n: "−30%", l: "Citas no asistidas" },
        { n: "360°", l: "Vista del cliente" },
      ],
      cta: "Próximamente",
      ctaDisabled: true,
    },
    restaurantes: {
      color:    "#d97706",
      colorDk:  "#92400e",
      eyebrow:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> Restaurantes y Franquicias`,
      eyeBg:    "#fef3e2",
      eyeColor: "#92400e",
      titleLine1: "Operación centralizada,",
      titleLine2: "cada sucursal bajo control.",
      desc: "Gestiona reservaciones, controla proveedores, mide el desempeño de cada sucursal y mantén comunicación fluida con tu equipo desde un panel unificado.",
      features: [
        "Gestión de reservaciones y listas de espera",
        "Control de proveedores y órdenes de compra",
        "Dashboard por sucursal con métricas clave",
        "CRM de clientes frecuentes y programas VIP",
        "Seguimiento de leads para eventos y banquetes",
      ],
      stats: [
        { n: "+35%", l: "Ocupación de mesas" },
        { n: "100%", l: "Visibilidad operativa" },
        { n: "1",    l: "Panel para todo" },
      ],
      cta: "Próximamente",
      ctaDisabled: true,
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

    const ctaHTML = d.ctaDisabled
      ? `<button class="sec-panel-cta sec-panel-cta--disabled" disabled>
          ${escHtml(d.cta)}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </button>`
      : `<a href="${d.ctaHref}" target="_blank" rel="noopener noreferrer"
            class="sec-panel-cta" style="background:${d.colorDk}">
          ${escHtml(d.cta)}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>`;

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
      ${ctaHTML}
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