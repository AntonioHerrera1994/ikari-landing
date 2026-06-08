(function () {
  "use strict";

  const messagesEl = document.getElementById("ctMessages");
  if (!messagesEl) return;

  const lang = document.querySelector(".ct-section")?.dataset.lang || "es";

  const SCRIPTS = {
    es: [
      { from: "user",   text: "Hola, vi su sistema de CRM. ¿Pueden contarme más?",                                                                                          time: "10:02" },
      { from: "bot",    text: "¡Hola! Somos Ikari — CRM + Gestión Interna para clínicas, agencias y empresas multi-sede. ¿En qué sector trabajas?",                         time: "10:02" },
      { from: "user",   text: "Tenemos una clínica dental con 3 sedes en la ciudad.",                                                                                        time: "10:03" },
      { from: "bot",    text: "Perfecto. Tenemos un módulo especializado para salud: agenda médica, expedientes, recordatorios por WhatsApp y control de cobros. ¿Cuándo te gustaría ver una demo?", time: "10:03" },
      { from: "user",   text: "¿Mañana a las 10 AM está disponible?",                                                                                                        time: "10:04" },
      { from: "bot",    text: "¡Confirmado! Te envío el enlace de Zoom ahora y también un resumen de lo que veremos adaptado a clínicas.",                                   time: "10:04" },
      { from: "system", icon: "📅", text: "Demo agendada — Mañana 10:00 AM · Zoom · Ikari para Salud",                                                                      time: "10:04" },
      { from: "user",   text: "Excelente, muchas gracias. ¿Tienen prueba gratuita?",                                                                                         time: "10:05" },
      { from: "bot",    text: "Sí, 14 días sin tarjeta de crédito. Después de la demo te activamos el acceso de inmediato si decides continuar.",                            time: "10:05" },
    ],
    en: [
      { from: "user",   text: "Hi, I saw your CRM system. Can you tell me more?",                                                                                            time: "10:02" },
      { from: "bot",    text: "Hello! We're Ikari — CRM + Internal Management for clinics, agencies and multi-location businesses. What sector are you in?",                  time: "10:02" },
      { from: "user",   text: "We have a dental clinic with 3 locations in the city.",                                                                                        time: "10:03" },
      { from: "bot",    text: "Perfect. We have a specialized module for healthcare: medical scheduling, patient records, WhatsApp reminders and payment control. When would you like to see a demo?", time: "10:03" },
      { from: "user",   text: "Is tomorrow at 10 AM available?",                                                                                                             time: "10:04" },
      { from: "bot",    text: "Confirmed! I'll send you the Zoom link now along with a summary of what we'll cover, tailored to clinics.",                                    time: "10:04" },
      { from: "system", icon: "📅", text: "Demo scheduled — Tomorrow 10:00 AM · Zoom · Ikari for Healthcare",                                                               time: "10:04" },
      { from: "user",   text: "Excellent, thank you. Do you have a free trial?",                                                                                             time: "10:05" },
      { from: "bot",    text: "Yes, 14 days no credit card required. After the demo we activate your access immediately if you decide to continue.",                          time: "10:05" },
    ],
  };

  const SCRIPT = SCRIPTS[lang] || SCRIPTS.es;
  let step = 0;

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

  function showTyping() {
    const t = document.createElement("div");
    t.className = "ct-typing";
    t.id = "ctTyping";
    t.innerHTML = "<span></span><span></span><span></span>";
    messagesEl.appendChild(t);
    scrollBottom();
  }

  function removeTyping() {
    document.getElementById("ctTyping")?.remove();
  }

  function scrollBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function getTypingDelay(msg) {
    if (msg.from === "system") return 400;
    return Math.min(500 + msg.text.length * 16, 2000);
  }

  function playNext() {
    if (step >= SCRIPT.length) return;
    const msg = SCRIPT[step];

    if (msg.from === "bot") {
      setTimeout(() => {
        showTyping();
        setTimeout(() => {
          removeTyping();
          messagesEl.appendChild(createBubble(msg));
          scrollBottom();
          step++;
          setTimeout(playNext, 800);
        }, getTypingDelay(msg));
      }, 350);
    } else {
      const pause = msg.from === "user" ? 500 : 350;
      setTimeout(() => {
        messagesEl.appendChild(createBubble(msg));
        scrollBottom();
        step++;
        setTimeout(playNext, msg.from === "system" ? 900 : 650);
      }, pause);
    }
  }

  const section = document.getElementById("contacto");

  if (section && "IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(playNext, 600);
          obs.disconnect();
        }
      });
    }, { threshold: 0.2 });
    obs.observe(section);
  } else {
    setTimeout(playNext, 800);
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

})();