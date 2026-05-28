// ArquitecturaSistema.js
// Este componente es mayormente estático.
// Aquí puedes añadir interacciones futuras (hover, animaciones de entrada, etc.)

function initArquitecturaSistema() {
  const cards = document.querySelectorAll('.arq-card');

  // Animación de entrada con IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(card);
  });

  // Banner también anima
  const banner = document.querySelector('.arq-banner');
  if (banner) {
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(16px)';
    banner.style.transition = 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s';
    observer.observe(banner);
  }
}

document.addEventListener('DOMContentLoaded', initArquitecturaSistema);