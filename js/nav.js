document.querySelectorAll('.nav-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const nav = document.getElementById(btn.getAttribute('aria-controls'));
    if (!nav) return;
    const isOpen = nav.classList.toggle('open');
    btn.classList.toggle('is-active', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  });
});
