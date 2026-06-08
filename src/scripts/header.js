// hero-pipeline.js — Simulador de Pipeline Kanban para hero de Ikari
// Sin persistencia: datos se reinician al recargar la página

(function () {
  "use strict";

  /* ── Referencias DOM ─────────────────────────────────── */
  const kanbanEl    = document.getElementById("hpKanban");
  const totalEl     = document.getElementById("hpTotalCount");
  const addBtn      = document.getElementById("hpAddBtn");
  const backdrop    = document.getElementById("hpModalBackdrop");
  const modalClose  = document.getElementById("hpModalClose");
  const modalCancel = document.getElementById("hpModalCancel");
  const modalSubmit = document.getElementById("hpModalSubmit");
  const nameInput   = document.getElementById("hpName");
  const phoneInput  = document.getElementById("hpPhone");
  const sourceInput = document.getElementById("hpSource");

  if (!kanbanEl) return;

  /* ── i18n ────────────────────────────────────────────── */
  const lang = kanbanEl.dataset.lang || "es";

  const i18n = {
    es: {
      phases:   ["Nuevo Lead", "Contactado", "Cita Agendada", "Ganado"],
      arrastra: "Arrastra leads aquí",
      eliminar: "Eliminar lead",
    },
    en: {
      phases:   ["New Lead", "Contacted", "Appointment Set", "Won"],
      arrastra: "Drag leads here",
      eliminar: "Delete lead",
    }
  };

  const txt = i18n[lang] || i18n.es;

  /* ── Configuración de fases ──────────────────────────── */
  const PHASES = [
    { id: "nuevo",    label: txt.phases[0], color: "#53c6d6", dot: "#53c6d6" },
    { id: "contacto", label: txt.phases[1], color: "#2b61ae", dot: "#2b61ae" },
    { id: "cita",     label: txt.phases[2], color: "#f26b4f", dot: "#f26b4f" },
    { id: "ganado",   label: txt.phases[3], color: "#ccdc60", dot: "#ccdc60" },
  ];

  /* ── Datos iniciales de demo ─────────────────────────── */
  const SAMPLE_LEADS = [
    { id: "l1", name: "Dr. Marcos Ruiz",    phone: "+52 55 1234 0001", source: "Web", phase: "nuevo"    },
    { id: "l2", name: "Clínica San Pablo",  phone: "+52 55 1234 0002", source: "Ref", phase: "nuevo"    },
    { id: "l3", name: "Laila Herrera",      phone: "+52 55 1234 0003", source: "IG",  phase: "nuevo"    },
    { id: "l4", name: "Agencia Nexo",       phone: "+52 55 1234 0004", source: "WA",  phase: "contacto" },
    { id: "l5", name: "Inmuebles Casas+",   phone: "+52 55 1234 0005", source: "FB",  phase: "contacto" },
    { id: "l6", name: "Dr. Patricia Leal",  phone: "+52 55 1234 0006", source: "Web", phase: "cita"     },
    { id: "l7", name: "Consultora BXM",     phone: "+52 55 1234 0007", source: "Ref", phase: "cita"     },
    { id: "l8", name: "Centro Vital",       phone: "+52 55 1234 0008", source: "WA",  phase: "ganado"   },
    { id: "l9", name: "Inmobiliaria Punta", phone: "+52 55 1234 0009", source: "Web", phase: "ganado"   },
  ];

  /* ── Estado en memoria ───────────────────────────────── */
  let leads       = SAMPLE_LEADS.map(l => ({ ...l }));
  let idCounter   = 100;
  let draggedId   = null;
  let placeholder = null;

  /* ── Render del board ────────────────────────────────── */
  function render() {
    kanbanEl.innerHTML = "";
    PHASES.forEach(phase => {
      const phaseLeads = leads.filter(l => l.phase === phase.id);
      kanbanEl.appendChild(buildColumn(phase, phaseLeads));
    });
    updateTotal();
  }

  function buildColumn(phase, phaseLeads) {
    const col = document.createElement("div");
    col.className = "hp-col";
    col.dataset.phase = phase.id;

    const header = document.createElement("div");
    header.className = "hp-col-header";
    header.innerHTML = `
      <div class="hp-col-title-wrap">
        <span class="hp-col-dot" style="background:${phase.dot}"></span>
        <span class="hp-col-title">${phase.label}</span>
      </div>
      <span class="hp-col-count">${phaseLeads.length}</span>
    `;
    col.appendChild(header);

    const cardsEl = document.createElement("div");
    cardsEl.className = "hp-cards";

    if (phaseLeads.length === 0) {
      cardsEl.innerHTML = `
        <div class="hp-col-empty">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          ${txt.arrastra}
        </div>`;
    } else {
      phaseLeads.forEach(lead => cardsEl.appendChild(buildCard(lead)));
    }

    col.appendChild(cardsEl);

    col.addEventListener("dragover",  onDragOver);
    col.addEventListener("dragenter", onDragEnter);
    col.addEventListener("dragleave", onDragLeave);
    col.addEventListener("drop",      onDrop);

    return col;
  }

  function buildCard(lead) {
    const card = document.createElement("div");
    card.className = "hp-card";
    card.draggable = true;
    card.dataset.id = lead.id;

    card.innerHTML = `
      <p class="hp-card-name">${escHtml(lead.name)}</p>
      <div class="hp-card-meta">
        <span class="hp-card-phone">${escHtml(lead.phone)}</span>
        <span class="hp-card-source source-${lead.source}">${lead.source}</span>
      </div>
      <button class="hp-card-del" data-id="${lead.id}" aria-label="${txt.eliminar}" title="${txt.eliminar}">✕</button>
    `;

    card.addEventListener("dragstart", onDragStart);
    card.addEventListener("dragend",   onDragEnd);
    card.querySelector(".hp-card-del").addEventListener("click", onDelete);

    return card;
  }

  /* ── Drag & Drop ─────────────────────────────────────── */
  function onDragStart(e) {
    draggedId = e.currentTarget.dataset.id;
    e.currentTarget.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", draggedId);
    createPlaceholder();
  }

  function onDragEnd(e) {
    e.currentTarget.classList.remove("dragging");
    removePlaceholder();
    draggedId = null;
    document.querySelectorAll(".hp-col").forEach(c => c.classList.remove("drag-over"));
  }

  function onDragEnter(e) {
    e.preventDefault();
    const col = e.currentTarget.closest(".hp-col");
    if (col) col.classList.add("drag-over");
  }

  function onDragLeave(e) {
    const col = e.currentTarget.closest(".hp-col");
    if (col && !col.contains(e.relatedTarget)) col.classList.remove("drag-over");
  }

  function onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    movePlaceholder(e);
  }

  function onDrop(e) {
    e.preventDefault();
    const col = e.currentTarget.closest(".hp-col");
    if (!col || !draggedId) return;

    const targetPhase = col.dataset.phase;
    const lead = leads.find(l => l.id === draggedId);
    if (lead && lead.phase !== targetPhase) lead.phase = targetPhase;

    col.classList.remove("drag-over");
    removePlaceholder();
    render();
  }

  function createPlaceholder() {
    placeholder = document.createElement("div");
    placeholder.className = "hp-drop-placeholder";
  }

  function removePlaceholder() {
    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.removeChild(placeholder);
    }
    placeholder = null;
  }

  function movePlaceholder(e) {
    if (!placeholder) return;
    const col = e.currentTarget.closest(".hp-col");
    if (!col) return;
    const cardsEl = col.querySelector(".hp-cards");
    if (!cardsEl) return;

    const afterEl = getDragAfterElement(cardsEl, e.clientY);
    if (afterEl) cardsEl.insertBefore(placeholder, afterEl);
    else         cardsEl.appendChild(placeholder);
  }

  function getDragAfterElement(container, y) {
    const els = [...container.querySelectorAll(".hp-card:not(.dragging)")];
    return els.reduce((closest, child) => {
      const box    = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) return { offset, element: child };
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  /* ── Eliminar lead ───────────────────────────────────── */
  function onDelete(e) {
    e.stopPropagation();
    const id = e.currentTarget.dataset.id;
    leads = leads.filter(l => l.id !== id);
    render();
  }

  /* ── Contador total ──────────────────────────────────── */
  function updateTotal() {
    if (totalEl) totalEl.textContent = leads.length;
  }

  /* ── Modal ───────────────────────────────────────────── */
  function openModal() {
    backdrop.classList.add("open");
    setTimeout(() => nameInput?.focus(), 100);
  }

  function closeModal() {
    backdrop.classList.remove("open");
    if (nameInput)   { nameInput.value  = ""; nameInput.classList.remove("error"); }
    if (phoneInput)  { phoneInput.value = ""; phoneInput.classList.remove("error"); }
    if (sourceInput)   sourceInput.value = "Web";
  }

  function submitModal() {
    const name   = nameInput?.value.trim()  || "";
    const phone  = phoneInput?.value.trim() || "";
    const source = sourceInput?.value       || "Web";

    if (!name) {
      nameInput?.classList.add("error");
      nameInput?.focus();
      return;
    }

    nameInput?.classList.remove("error");

    leads.unshift({
      id:    "l" + (++idCounter),
      name,
      phone: phone || "+52 — —",
      source,
      phase: "nuevo",
    });

    render();
    closeModal();
  }

  /* ── Eventos ─────────────────────────────────────────── */
  addBtn?.addEventListener("click", openModal);
  modalClose?.addEventListener("click", closeModal);
  modalCancel?.addEventListener("click", closeModal);
  modalSubmit?.addEventListener("click", submitModal);

  backdrop?.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });

  [nameInput, phoneInput].forEach(inp => {
    inp?.addEventListener("keydown", (e) => {
      if (e.key === "Enter")  submitModal();
      if (e.key === "Escape") closeModal();
    });
  });

  /* ── Utilidades ──────────────────────────────────────── */
  function escHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ── Init ────────────────────────────────────────────── */
  render();

})();