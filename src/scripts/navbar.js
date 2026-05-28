 function updateClock() {
    const el = document.getElementById('navbar-clock');
    if (!el) return;
    const now   = new Date();
    const pad   = (n) => String(n).padStart(2, '0');
    const str   =
      `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())} ` +
      `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())} UTC`;
    el.textContent = str;
  }
  updateClock();
  setInterval(updateClock, 1000);