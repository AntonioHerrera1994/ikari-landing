// RoadmapWhatsApp.js
// Lógica de la consola de simulación WhatsApp API

(function () {
  "use strict";

  const btn      = document.getElementById("simular-btn");
  const feedback = document.getElementById("simulation-feedback");
  const feedText = document.getElementById("feedback-text");

  if (!btn) return;

  /** Construye el texto del mensaje simulado a partir de los inputs */
  function buildMessage() {
    const paciente = document.getElementById("paciente")?.value.trim() || "Paciente";
    const doctor   = document.getElementById("doctor")?.value.trim()   || "el especialista";
    const fecha    = document.getElementById("fecha")?.value.trim()    || "próximamente";

    return (
      `✅ *IKARI HEALTH*: Estimado(a) *${paciente}*, le recordamos su cita médica agendada ` +
      `para el día *${fecha}* con el especialista *${doctor}*. ` +
      `Para confirmar responda con *1*, para reagendar responda con *2*. ¡Le esperamos! 🏥`
    );
  }

  /** Simula el envío con feedback visual */
  function simulateMessage() {
    if (btn.classList.contains("loading")) return;

    // Estado de carga
    btn.classList.add("loading");
    btn.textContent = "Enviando…";

    // Ocultar feedback previo
    feedback.classList.add("hidden");

    setTimeout(() => {
      const msg = buildMessage();

      // Mostrar feedback
      feedText.textContent = `Mensaje enviado: "${msg.substring(0, 80)}…"`;
      feedback.classList.remove("hidden");

      // Restaurar botón
      btn.classList.remove("loading");
      btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        Simular Envío de Recordatorio (WhatsApp Web API)
      `;

      // Ocultar feedback después de 5 s
      setTimeout(() => {
        feedback.classList.add("hidden");
      }, 5000);
    }, 1400);
  }

  btn.addEventListener("click", simulateMessage);

  // Permite disparar con Enter desde los inputs
  const inputs = document.querySelectorAll(".form-input");
  inputs.forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") simulateMessage();
    });
  });
})();