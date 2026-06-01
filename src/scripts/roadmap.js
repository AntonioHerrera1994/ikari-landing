// contacto.js — Simulación de conversación de ventas Ikari

(function () {
  "use strict";

  const messagesEl = document.getElementById("ctMessages");
  if (!messagesEl) return;

  /* ── Guión de la conversación ────────────────────────── */
  const SCRIPT = [
    { from: "user", text: "Hola, vi su sistema de CRM. ¿Pueden contarme más?", time: "10:02" },
    { from: "bot",  text: "¡Hola! Somos Ikari — CRM + Gestión Interna para clínicas, agencias y empresas multi-sede. ¿En qué sector trabajas?", time: "10:02" },
    { from: "user", text: "Tenemos una clínica dental con 3 sedes en la ciudad.", time: "10:03" },
    { from: "bot",  text: "Perfecto. Tenemos un módulo especializado para salud: agenda médica, expedientes, recordatorios por WhatsApp y control de cobros. ¿Cuándo te gustaría ver una demo?", time: "10:03" },
    { from: "user", text: "¿Mañana a las 10 AM está disponible?", time: "10:04" },
    { from: "bot",  text: "¡Confirmado! Te envío el enlace de Zoom ahora y también un resumen de lo que veremos adaptado a clínicas.", time: "10:04" },
    { from: "system", icon: "📅", text: "Demo agendada — Mañana 10:00 AM · Zoom · Ikari para Salud", time: "10:04" },
    { from: "user", text: "Excelente, muchas gracias. ¿Tienen prueba gratuita?", time: "10:05" },
    { from: "bot",  text: "Sí, 14 días sin tarjeta de crédito. Después de la demo te activamos el acceso de inmediato si decides continuar.", time: "10:05" },
  ];

  let step = 0;
  let running = false;

  /* ── Crear burbuja de mensaje ────────────────────────── */
  function createBubble(msg) {
    const el = document.createElement("div");
    el.className = `ct-msg ct-msg--${msg.from}`;

    if (msg.from === "system") {
      el.innerHTML = `
        <div class="ct-msg-bubble">
          <span>${msg.icon || "✅"}</span>
          ${escHtml(msg.text)}
        </div>
      `;
    } else {
      el.innerHTML = `
        <div class="ct-msg-bubble">${escHtml(msg.text)}</div>
        <span class="ct-msg-time">${msg.time}</span>
      `;
    }

    return el;
  }

  /* ── Typing indicator ────────────────────────────────── */
  function showTyping() {
    const t = document.createElement("div");
    t.className = "ct-typing";
    t.id = "ctTyping";
    t.innerHTML = "<span></span><span></span><span></span>";
    messagesEl.appendChild(t);
    scrollBottom();
    return t;
  }

  function removeTyping() {
    document.getElementById("ctTyping")?.remove();
  }

  /* ── Scroll al fondo ─────────────────────────────────── */
  function scrollBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  /* ── Delays por tipo de emisor ───────────────────────── */
  function getDelay(msg) {
    if (msg.from === "user")   return 800;
    if (msg.from === "system") return 600;
    // Bot: tiempo proporcional al largo del texto
    return Math.min(600 + msg.text.length * 18, 2200);
  }

  /* ── Reproducir un mensaje ───────────────────────────── */
  function playNext() {
    if (step >= SCRIPT.length) {
      // Pausa y reinicia la conversación
      setTimeout(() => {
        step = 0;
        messagesEl.innerHTML = "";
        setTimeout(play, 1200);
      }, 4000);
      return;
    }

    const msg = SCRIPT[step];
    const typingDelay = msg.from === "bot" ? getDelay(msg) : 0;

    if (msg.from === "bot") {
      // Mostrar typing antes del mensaje del bot
      setTimeout(() => {
        showTyping();
        setTimeout(() => {
          removeTyping();
          messagesEl.appendChild(createBubble(msg));
          scrollBottom();
          step++;
          setTimeout(playNext, 900);
        }, typingDelay);
      }, 400);
    } else {
      // Usuario y system: directo con pequeña pausa
      setTimeout(() => {
        messagesEl.appendChild(createBubble(msg));
        scrollBottom();
        step++;
        setTimeout(playNext, msg.from === "system" ? 1000 : 700);
      }, msg.from === "user" ? 500 : 400);
    }
  }

  /* ── Iniciar ─────────────────────────────────────────── */
  function play() {
    if (running) return;
    running = true;
    playNext();
  }

  /* ── Arrancar cuando la sección es visible ───────────── */
  const section = document.getElementById("contacto");

  if (section && "IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(play, 500);
          obs.disconnect();
        }
      });
    }, { threshold: 0.25 });

    obs.observe(section);
  } else {
    setTimeout(play, 800);
  }

  /* ── Utilidades ──────────────────────────────────────── */
  function escHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

})();