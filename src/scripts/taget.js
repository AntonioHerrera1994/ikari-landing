const NICHOS = {
  salud: {
    iconClass: 'salud',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 12.5l8 -8a4.94 4.94 0 0 1 7 7l-8 8a4.94 4.94 0 0 1 -7 -7"/><path d="M8 8l7 7"/><path d="M9 12h4"/><path d="M11 10v4"/></svg>`,
    title: 'Adaptación Dinámica: Clínicas y Centros de Salud',
    sub: 'Cómo se reconfigura el motor de Ikari',
    aspecto: 'Expedientes, Sobreagenda & Cobros',
    fases: ['Primer Contacto', 'Cita Solicitada', 'Consulta Confirmada', 'Historia Creada'],
  },
  b2b: {
    iconClass: 'b2b',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"/><line x1="12" y1="12" x2="12" y2="12.01"/><path d="M3 13a20 20 0 0 0 18 0"/></svg>`,
    title: 'Adaptación Dinámica: Agencias & Consultoras',
    sub: 'Cómo se reconfigura el motor de Ikari',
    aspecto: 'Propuestas, Follow-ups & Contratos',
    fases: ['Lead Captado', 'Propuesta Enviada', 'Negociación', 'Contrato Firmado'],
  },
  real: {
    iconClass: 'real',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21l18 0"/><path d="M9 8l1 0"/><path d="M9 12l1 0"/><path d="M9 16l1 0"/><path d="M14 8l1 0"/><path d="M14 12l1 0"/><path d="M14 16l1 0"/><path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"/></svg>`,
    title: 'Adaptación Dinámica: Bienes Raíces',
    sub: 'Cómo se reconfigura el motor de Ikari',
    aspecto: 'Catálogo, Visitas & Cierre de Venta',
    fases: ['Interés Inicial', 'Visita Agendada', 'Oferta Presentada', 'Escritura Firmada'],
  },
};

function renderPipeline(fases) {
  const el = document.getElementById('pipeline');
  el.innerHTML = fases
    .map(
      (name, i) =>
        `<div class="phase" role="listitem">
          <p class="phase-num">0${i + 1}</p>
          <p class="phase-name">${name}</p>
        </div>`,
    )
    .join('');
}

function selectNicho(key) {
  const d = NICHOS[key];
  const panel = document.getElementById('detail-panel');

  document.querySelectorAll('.nicho-card').forEach((card) => {
    card.classList.toggle('active', card.dataset.nicho === key);
  });

  const icon = document.getElementById('panel-icon');
  icon.className = `panel-icon ${d.iconClass}`;
  icon.innerHTML = d.iconSvg;

  document.getElementById('panel-title').textContent = d.title;
  document.getElementById('panel-sub').textContent = d.sub;
  document.getElementById('aspecto-value').textContent = d.aspecto;

  renderPipeline(d.fases);

  panel.classList.remove('panel-animate');
  requestAnimationFrame(() => panel.classList.add('panel-animate'));
}

function initMercadoTarget() {
  document.querySelectorAll('.nicho-card').forEach((card) => {
    card.addEventListener('click', () => selectNicho(card.dataset.nicho));
  });

  renderPipeline(NICHOS.salud.fases);
}

// Espera a que el DOM esté listo antes de inicializar
document.addEventListener('DOMContentLoaded', initMercadoTarget);