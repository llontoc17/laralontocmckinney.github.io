document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.case-image').forEach((img) => {
    img.addEventListener('click', () => openLightbox(img.currentSrc || img.src, img.alt));
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });

  const carouselEntries = Array.from(document.querySelectorAll('.case-carousel')).map((carousel) => {
    const viewport = carousel.querySelector('.case-carousel-viewport');
    const track = carousel.querySelector('.case-carousel-track');
    const slides = Array.from(track.children);
    const dots = Array.from(carousel.querySelectorAll('.case-carousel-dot'));
    const prevBtn = carousel.querySelector('.case-carousel-prev');
    const nextBtn = carousel.querySelector('.case-carousel-next');
    return { carousel, viewport, track, slides, dots, prevBtn, nextBtn, firstImg: slides[0], index: 0 };
  });

  function updatePosition(entry) {
    const target = entry.slides[entry.index];
    entry.track.style.transform = `translateX(-${target.offsetLeft}px)`;
    entry.dots.forEach((dot, i) => dot.classList.toggle('active', i === entry.index));
  }

  function recomputeHeights() {
    carouselEntries.forEach((entry) => {
      if (entry.carousel.dataset.matchHeight) return;
      if (!entry.firstImg.naturalWidth) return;
      const ratio = entry.firstImg.naturalHeight / entry.firstImg.naturalWidth;
      entry.viewport.style.height = `${entry.viewport.clientWidth * ratio}px`;
    });
    carouselEntries.forEach((entry) => {
      const selector = entry.carousel.dataset.matchHeight;
      if (!selector) return;
      const targetViewport = document.querySelector(`${selector} .case-carousel-viewport`);
      if (targetViewport && targetViewport.style.height) {
        entry.viewport.style.height = targetViewport.style.height;
      }
    });
    carouselEntries.forEach(updatePosition);
  }

  carouselEntries.forEach((entry) => {
    entry.slides.forEach((img) => {
      if (img.complete) {
        recomputeHeights();
      } else {
        img.addEventListener('load', recomputeHeights);
      }
    });

    entry.prevBtn.addEventListener('click', () => {
      entry.index = (entry.index - 1 + entry.slides.length) % entry.slides.length;
      updatePosition(entry);
    });
    entry.nextBtn.addEventListener('click', () => {
      entry.index = (entry.index + 1) % entry.slides.length;
      updatePosition(entry);
    });
    entry.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        entry.index = i;
        updatePosition(entry);
      });
    });
  });

  window.addEventListener('resize', recomputeHeights);
});
