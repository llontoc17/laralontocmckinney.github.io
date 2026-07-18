function burstConfetti(x, y, color) {
  const count = 24;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 60;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - 30;
    piece.style.setProperty('--x0', x + 'px');
    piece.style.setProperty('--y0', y + 'px');
    piece.style.setProperty('--x1', (x + dx) + 'px');
    piece.style.setProperty('--y1', (y + dy) + 'px');
    piece.style.setProperty('--r', Math.floor(Math.random() * 360) + 'deg');
    piece.style.background = color;
    piece.style.width = (4 + Math.random() * 4) + 'px';
    piece.style.height = (4 + Math.random() * 8) + 'px';
    document.body.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.highlights-card li').forEach((card) => {
    card.setAttribute('tabindex', '0');

    card.addEventListener('click', (e) => {
      const color = getComputedStyle(card).getPropertyValue('--highlight-color').trim();
      burstConfetti(e.clientX, e.clientY, color);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const color = getComputedStyle(card).getPropertyValue('--highlight-color').trim();
        const rect = card.getBoundingClientRect();
        burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, color);
      }
    });
  });
});
