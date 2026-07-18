function equalizeHighlightCardHeights() {
  const cards = document.querySelectorAll('.highlights-card li');
  if (!cards.length) return;

  cards.forEach((card) => { card.style.height = 'auto'; });

  let maxHeight = 0;
  cards.forEach((card) => {
    maxHeight = Math.max(maxHeight, card.offsetHeight);
  });

  cards.forEach((card) => {
    card.style.height = maxHeight + 'px';
  });
}

window.addEventListener('load', equalizeHighlightCardHeights);
window.addEventListener('resize', equalizeHighlightCardHeights);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(equalizeHighlightCardHeights);
}
