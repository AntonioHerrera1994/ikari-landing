function updateClock() {
  const el = document.getElementById('navbar-clock');
  if (!el) return;

  const now = new Date();

  const fmt = (timeZone) =>
    new Intl.DateTimeFormat('es-MX', {
      timeZone,
      hour:   '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(now);

  const zones = [
    { label: 'TIJ', tz: 'America/Tijuana'  },
    { label: 'CDMX', tz: 'America/Mexico_City' },
    { label: 'LON', tz: 'Europe/London'    },
    { label: 'TYO', tz: 'Asia/Tokyo'       },
  ];

  el.innerHTML = zones
    .map(z => `<span class="clock-zone"><em>${z.label}</em> ${fmt(z.tz)}</span>`)
    .join('<span class="clock-sep">·</span>');
}
updateClock();
setInterval(updateClock, 1000);