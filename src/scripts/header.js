 const CYCLE   = 4600;   // ms between advances
  const ANIM    = 950;    // must match CSS transition duration
 
  const allImgs = [
    "https://picsum.photos/seed/crmpipe/1000/700",
    "https://picsum.photos/seed/agendacal/1000/700",
    "https://picsum.photos/seed/expeddb/1000/700",
    "https://picsum.photos/seed/reportkpi/1000/700",
  ];
 
  let curr     = 0;
  let nxt      = 1;
 
  // The two DOM slots — we swap their roles each cycle
  let activeEl = document.getElementById('rs-a');
  let peekEl   = document.getElementById('rs-b');
 
  function advance() {
    // ── 1. Kick off animation ──
    // Active sweeps out to the left
    activeEl.classList.replace('rs--active', 'rs--exiting');
    // Peek rotates in to face position
    peekEl.classList.replace('rs--peek', 'rs--entering');
 
    // ── 2. After animation ends: reset state ──
    setTimeout(() => {
      // peekEl is now the new active
      peekEl.classList.replace('rs--entering', 'rs--active');
 
      // Advance counters
      curr = nxt;
      nxt  = (nxt + 1) % allImgs.length;
 
      // Instantly snap activeEl to peek position (right side) — no transition
      activeEl.classList.add('rs--snap');
      activeEl.classList.replace('rs--exiting', 'rs--peek');
      // Load the upcoming image into it
      const img = activeEl.querySelector('img');
      if (img) img.src = allImgs[nxt];
 
      // Force reflow so snap takes effect before we re-enable transition
      void activeEl.offsetWidth;
      activeEl.classList.remove('rs--snap');
 
      // Swap references for next cycle
      [activeEl, peekEl] = [peekEl, activeEl];
 
    }, ANIM);
  }
 
  setInterval(advance, CYCLE);