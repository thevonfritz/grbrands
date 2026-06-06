const html  = document.documentElement;
const saved = localStorage.getItem('gr-theme') || 'dark';
html.setAttribute('data-theme', saved);
document.documentElement.style.colorScheme = saved;

document.getElementById('themeToggle').addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  document.documentElement.style.colorScheme = next;
  localStorage.setItem('gr-theme', next);
});

// Voltar: usa histórico se veio do site, senão vai para #portfolio
const backBtn = document.querySelector('.back-btn');
if (backBtn) {
  backBtn.addEventListener('click', e => {
    if (document.referrer && document.referrer.includes(location.hostname)) {
      e.preventDefault();
      history.back();
    }
    // se não tem histórico, o href="../index.html#portfolio" funciona normalmente
  });
}

// Grid parallax
const g = document.getElementById('grid-bg');
let tx = 0, ty = 0, cx = 0, cy = 0;
document.addEventListener('mousemove', e => {
  tx = (e.clientX / window.innerWidth  - .5) * 22;
  ty = (e.clientY / window.innerHeight - .5) * 18;
});
(function loop() {
  cx += (tx - cx) * .04;
  cy += (ty - cy) * .04;
  g.style.transform = `rotate(-9deg) translate(${cx}px,${cy}px)`;
  requestAnimationFrame(loop);
})();
