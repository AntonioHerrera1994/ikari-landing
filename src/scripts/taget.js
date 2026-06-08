// sectores.js — Selector de sectores interactivo Ikari

(function () {
  "use strict";

  /* ── i18n ────────────────────────────────────────────── */
  const lang = document.querySelector(".sec-section")?.dataset.lang || "es";

  const i18n = {
    es: {
      salud: {
        eyebrow:    "Clínicas y Centros de Salud",
        titleLine1: "Gestión clínica sin",
        titleLine2: "caos ni ausentismo.",
        desc:       "Ikari centraliza expedientes, agenda médica, cobros y recordatorios automáticos en un solo sistema. Tus doctores atienden, tú controlas.",
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
        cta: "Solicitar demo para clínicas",
      },
      agencias: {
        eyebrow:    "Agencias y Consultoras",
        titleLine1: "Cierra más contratos,",
        titleLine2: "más rápido.",
        desc:       "Pipeline Kanban con etapas personalizadas para ciclos de venta largos. Gestiona propuestas, da seguimiento a cada tomador de decisión y mide tu conversión en tiempo real.",
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
      },
      real: {
        eyebrow:    "Bienes Raíces",
        titleLine1: "Del primer contacto",
        titleLine2: "al cierre firmado.",
        desc:       "Conecta tu catálogo de propiedades con el CRM. Asigna asesores, agenda visitas, da seguimiento a cada oferta y cierra operaciones sin perder ningún lead en el camino.",
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
      },
      educacion: {
        eyebrow:    "Educación y Academias",
        titleLine1: "Del prospecto inscrito",
        titleLine2: "al alumno fidelizado.",
        desc:       "Gestiona inscripciones, seguimiento de prospectos, pagos de colegiatura y comunicación con padres o alumnos desde un solo sistema integrado.",
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
      },
      estetica: {
        eyebrow:    "Estética & Wellness",
        titleLine1: "Más citas, clientes",
        titleLine2: "que regresan siempre.",
        desc:       "Agenda de servicios por estilista o terapeuta, historial de tratamientos, control de productos e inventario. Tu salón o spa operando sin papel ni confusión.",
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
      },
      restaurantes: {
        eyebrow:    "Restaurantes y Franquicias",
        titleLine1: "Operación centralizada,",
        titleLine2: "cada sucursal bajo control.",
        desc:       "Gestiona reservaciones, controla proveedores, mide el desempeño de cada sucursal y mantén comunicación fluida con tu equipo desde un panel unificado.",
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
      },
    },
    en: {
      salud: {
        eyebrow:    "Clinics & Healthcare Centers",
        titleLine1: "Clinical management without",
        titleLine2: "chaos or no-shows.",
        desc:       "Ikari centralizes patient records, medical scheduling, payments and automatic reminders in one system. Your doctors focus on care, you stay in control.",
        features: [
          "Visual schedule by doctor and location",
          "Clinical records and patient management",
          "Automatic WhatsApp appointment reminders",
          "Payment and daily cash flow control",
          "35% reduction in clinical no-shows",
        ],
        stats: [
          { n: "−35%", l: "No-shows" },
          { n: "+2h",  l: "Productivity/day" },
          { n: "100%", l: "Traceability" },
        ],
        cta: "Request clinic demo",
      },
      agencias: {
        eyebrow:    "Agencies & Consultancies",
        titleLine1: "Close more contracts,",
        titleLine2: "faster.",
        desc:       "Kanban pipeline with custom stages for long sales cycles. Manage proposals, follow up with every decision-maker and measure conversion in real time.",
        features: [
          "Fully configurable Kanban pipeline",
          "Interaction history per prospect",
          "Stage-based automated email marketing",
          "Conversion and closing time reports",
          "Roles and permissions per sales rep",
        ],
        stats: [
          { n: "+60%", l: "Converted leads" },
          { n: "3×",   l: "Closing speed" },
          { n: "0",    l: "Lost leads" },
        ],
        cta: "Coming soon",
      },
      real: {
        eyebrow:    "Real Estate",
        titleLine1: "From first contact",
        titleLine2: "to signed closing.",
        desc:       "Connect your property catalog with the CRM. Assign agents, schedule visits, follow up on every offer and close deals without losing a single lead.",
        features: [
          "Real estate pipeline with custom stages",
          "Property visit scheduling by agent",
          "Automatic prospect assignment",
          "Follow-up through signed deed",
          "Mobile app for field agents",
        ],
        stats: [
          { n: "0",    l: "Untracked leads" },
          { n: "+40%", l: "Visits completed" },
          { n: "1",    l: "System for everything" },
        ],
        cta: "Coming soon",
      },
      educacion: {
        eyebrow:    "Education & Academies",
        titleLine1: "From enrolled prospect",
        titleLine2: "to loyal student.",
        desc:       "Manage enrollments, prospect follow-up, tuition payments and communication with parents or students from one integrated system.",
        features: [
          "Enrollment pipeline by school cycle",
          "Prospect tracking and campus visits",
          "Payment and balance control per student",
          "Mass communication with parents",
          "Enrollment and dropout reports",
        ],
        stats: [
          { n: "+50%", l: "Enrollment rate" },
          { n: "−40%", l: "School dropout" },
          { n: "1",    l: "Integrated system" },
        ],
        cta: "Coming soon",
      },
      estetica: {
        eyebrow:    "Aesthetics & Wellness",
        titleLine1: "More appointments, clients",
        titleLine2: "who always come back.",
        desc:       "Service scheduling by stylist or therapist, treatment history, product and inventory control. Your salon or spa running without paper or confusion.",
        features: [
          "Appointment schedule by stylist or booth",
          "Service and treatment history per client",
          "Product inventory control",
          "Automatic WhatsApp appointment reminders",
          "Loyalty program and after-sales follow-up",
        ],
        stats: [
          { n: "+45%", l: "Client retention" },
          { n: "−30%", l: "No-show appointments" },
          { n: "360°", l: "Client view" },
        ],
        cta: "Coming soon",
      },
      restaurantes: {
        eyebrow:    "Restaurants & Franchises",
        titleLine1: "Centralized operations,",
        titleLine2: "every branch under control.",
        desc:       "Manage reservations, control suppliers, measure each branch's performance and keep communication flowing with your team from a unified dashboard.",
        features: [
          "Reservation and waitlist management",
          "Supplier and purchase order control",
          "Per-branch dashboard with key metrics",
          "Frequent customer CRM and VIP programs",
          "Lead tracking for events and banquets",
        ],
        stats: [
          { n: "+35%", l: "Table occupancy" },
          { n: "100%", l: "Operational visibility" },
          { n: "1",    l: "Dashboard for everything" },
        ],
        cta: "Coming soon",
      },
    },
  };

  const txt = i18n[lang] || i18n.es;

  /* ── Configuración visual por sector (sin cambios) ───── */
  const SECTOR_CONFIG = {
    salud:        { color: "#53c6d6", colorDk: "#0e6678", eyeBg: "#eef7f9", eyeColor: "#0e6678", ctaHref: "mailto:info@ikaricrm.com", ctaDisabled: false },
    agencias:     { color: "#2b61ae", colorDk: "#1a4a8a", eyeBg: "#e8f0fb", eyeColor: "#1a4a8a", ctaDisabled: true },
    real:         { color: "#f26b4f", colorDk: "#8c3a20", eyeBg: "#fff3f0", eyeColor: "#8c3a20", ctaDisabled: true },
    educacion:    { color: "#7c3aed", colorDk: "#6d28d9", eyeBg: "#f0eafe", eyeColor: "#6d28d9", ctaDisabled: true },
    estetica:     { color: "#db2777", colorDk: "#9d174d", eyeBg: "#fce8f3", eyeColor: "#9d174d", ctaDisabled: true },
    restaurantes: { color: "#d97706", colorDk: "#92400e", eyeBg: "#fef3e2", eyeColor: "#92400e", ctaDisabled: true },
  };

  /* SVGs por sector */
  const SECTOR_SVG = {
    salud:        `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.5l8-8a4.94 4.94 0 0 1 7 7l-8 8a4.94 4.94 0 0 1-7-7"/><path d="M9 12h4"/><path d="M11 10v4"/></svg>`,
    agencias:     `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12.01"/><path d="M3 13a20 20 0 0 0 18 0"/></svg>`,
    real:         `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l18 0"/><path d="M5 21v-16a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 8l1 0"/><path d="M9 12l1 0"/><path d="M14 8l1 0"/><path d="M14 12l1 0"/></svg>`,
    educacion:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>`,
    estetica:     `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    restaurantes: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  };

  /* ── Referencias DOM ─────────────────────────────────── */
  const cards      = document.querySelectorAll(".sec-card");
  const panelInner = document.getElementById("secPanelInner");

  if (!panelInner || !cards.length) return;

  /* ── Render del panel ────────────────────────────────── */
  function renderPanel(key) {
    const d   = txt[key];
    const cfg = SECTOR_CONFIG[key];
    if (!d || !cfg) return;

    const featuresHTML = d.features.map(f => `
      <li class="sec-feature">
        <span class="sec-check" style="background:${cfg.color}22">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke="${cfg.color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </span>
        ${escHtml(f)}
      </li>`).join("");

    const statsHTML = d.stats.map(s => `
      <div class="sec-stat">
        <span class="sec-stat-n" style="color:${cfg.color}">${escHtml(s.n)}</span>
        <span class="sec-stat-l">${escHtml(s.l)}</span>
      </div>`).join("");

    const ctaHTML = cfg.ctaDisabled
      ? `<button class="sec-panel-cta sec-panel-cta--disabled" disabled>
          ${escHtml(d.cta)}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </button>`
      : `<a href="${cfg.ctaHref}" target="_blank" rel="noopener noreferrer"
            class="sec-panel-cta" style="background:${cfg.colorDk}">
          ${escHtml(d.cta)}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>`;

    panelInner.innerHTML = `
      <span class="sec-panel-eyebrow" style="background:${cfg.eyeBg};color:${cfg.eyeColor}">
        ${SECTOR_SVG[key]} ${escHtml(d.eyebrow)}
      </span>
      <h3 class="sec-panel-title">
        ${escHtml(d.titleLine1)}<br/>
        <em style="color:${cfg.color}">${escHtml(d.titleLine2)}</em>
      </h3>
      <p class="sec-panel-desc">${escHtml(d.desc)}</p>
      <ul class="sec-features">${featuresHTML}</ul>
      ${ctaHTML}
      <div class="sec-stats">${statsHTML}</div>
    `;

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

  /* ── Utilidades ──────────────────────────────────────── */
  function escHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* ── Init ────────────────────────────────────────────── */
  selectSector("salud");

})();