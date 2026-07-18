document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.panel').forEach((panel) => {
    function toggle() {
      const expanded = panel.classList.toggle('expanded');
      panel.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }

    panel.addEventListener('click', toggle);
    panel.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
});
