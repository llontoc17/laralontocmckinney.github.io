document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.home-quote-carousel');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.home-quote-slide'));
  const dots = Array.from(carousel.querySelectorAll('.case-carousel-dot'));
  const prevBtn = carousel.querySelector('.home-quote-prev');
  const nextBtn = carousel.querySelector('.home-quote-next');
  let index = slides.findIndex((slide) => slide.classList.contains('is-active'));
  if (index < 0) index = 0;

  const FADE_MS = 200;
  const HOLD_MS = 80;
  let isAnimating = false;

  function goTo(nextIndex) {
    if (isAnimating || nextIndex === index) return;
    isAnimating = true;
    slides[index].classList.remove('is-active');
    setTimeout(() => {
      index = nextIndex;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      slides[index].classList.add('is-active');
      isAnimating = false;
    }, FADE_MS + HOLD_MS);
  }

  prevBtn.addEventListener('click', () => {
    goTo((index - 1 + slides.length) % slides.length);
  });
  nextBtn.addEventListener('click', () => {
    goTo((index + 1) % slides.length);
  });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
    });
  });
});
