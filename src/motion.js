// ZAKAAS motion layer — scroll reveals + header state.
// Progressive enhancement: content is visible unless JS marks `html.motion-ready`.
// Fully disabled under prefers-reduced-motion.

const REVEAL_SELECTORS = [
  '.zakaas-anti-header',
  '.zakaas-anti-card',
  '.gift-teaser-media',
  '.gift-teaser-copy',
  '.community-header',
  '.community-card',
  '.b2b-strip-inner',
  '.about-chapter > *',
  '.about-craft article',
  '.about-cta > *',
  '.faq-accordion-item',
  '.policy-block',
].join(',');

export function initMotion() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches || !('IntersectionObserver' in window)) return;

  const root = document.documentElement;
  root.classList.add('motion-ready');

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      });
    },
    { rootMargin: '150px 0px 150px 0px', threshold: 0 }
  );

  const seen = new WeakSet();
  const scan = () => {
    const nodes = document.querySelectorAll(REVEAL_SELECTORS);
    nodes.forEach((el) => {
      if (seen.has(el)) return;
      seen.add(el);
      const rect = el.getBoundingClientRect();
      // Already on screen at first sight (above the fold): leave untouched, no flash.
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) return;
      // Stagger siblings in the same row/grid, capped so nothing feels slow.
      const index = Array.prototype.indexOf.call(el.parentElement?.children || [], el);
      el.style.setProperty('--reveal-i', String(Math.min(Math.max(index, 0), 4)));
      el.setAttribute('data-reveal', '');
      io.observe(el);
    });
  };

  let queued = false;
  const queueScan = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      scan();
    });
  };

  // Routes and async product data mount new nodes after load.
  new MutationObserver(queueScan).observe(document.getElementById('root') || document.body, {
    childList: true,
    subtree: true,
  });
  queueScan();

  // Header gains a quiet shadow once the page scrolls.
  let scrolled = false;
  const onScroll = () => {
    const next = window.scrollY > 8;
    if (next !== scrolled) {
      scrolled = next;
      document.querySelector('.site-header')?.classList.toggle('is-scrolled', next);
    }
    // Fallback: manually reveal items that are in viewport but got stuck
    document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight + 100) {
        el.classList.add('is-revealed');
        io.unobserve(el);
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
