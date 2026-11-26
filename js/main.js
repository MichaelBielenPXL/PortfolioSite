// Michaël Bielen – Portfolio

document.getElementById('year').textContent = new Date().getFullYear();

// ----- Header border on scroll -----
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ----- Mobile nav -----
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');

function setNav(open) {
  links.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
}

toggle.addEventListener('click', () => setNav(!links.classList.contains('open')));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setNav(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setNav(false); });

// ----- Active nav link -----
const navAnchors = [...links.querySelectorAll('a')];
const spy = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navAnchors.forEach(a => a.classList.toggle('active', a.hash === '#' + entry.target.id));
  }),
  { rootMargin: '-45% 0px -50% 0px' }
);
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

// ----- Reveal on scroll -----
const revealer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealer.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll('.service, .process, .case, .site-card, .project-row, .role, .edu li, .toolkit > div').forEach(el => {
  el.classList.add('reveal');
  revealer.observe(el);
});
