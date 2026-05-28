// Çekiç Trans — main.js
// Lightweight: no framework, no dependencies.

(() => {
  'use strict';

  // Mark <html> so CSS can opt into JS-only styles (e.g. data-reveal hide-then-show)
  document.documentElement.classList.add('js');

  // ----- Footer year -----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ----- Nav scroll state -----
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 12) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Reveal on scroll (opt-in only via [data-reveal] in HTML) -----
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    // No IO support: reveal immediately
    revealEls.forEach((el) => el.classList.add('is-revealed'));
  }

  // ----- Counter animations -----
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length && 'IntersectionObserver' in window) {
    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.getAttribute('data-counter') || '0', 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
          const val = Math.floor(target * eased);
          el.textContent = val + suffix;
          if (t < 1) requestAnimationFrame(tick);
          else el.textContent = target + suffix;
        };
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => counterIO.observe(c));
  }

  // ----- Smooth in-page anchors with nav offset -----
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = (nav ? nav.offsetHeight : 0) + 32;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ----- Quote form: WhatsApp handoff -----
  const form = document.getElementById('quoteForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const get = (k) => (fd.get(k) || '').toString().trim();

      const name = get('name');
      const phone = get('phone');
      if (!name || !phone) {
        alert('Lütfen ad ve telefon bilgisini girin.');
        return;
      }

      const lines = [
        'Merhaba, cekictrans.com üzerinden teklif talebim:',
        '',
        `Ad / Firma : ${name}`,
        `Telefon    : ${phone}`,
        `E-posta    : ${get('email')}`,
        `Yükleme    : ${get('from')}`,
        `Varış      : ${get('to')}`,
        `Yük tipi   : ${get('type')}`,
        `Tarih      : ${get('date')}`,
        '',
        'Notlar:',
        get('note')
      ];

      const url = `https://wa.me/905333183554?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(url, '_blank', 'noopener');
    });
  }

  // ----- Subtle parallax on hero background image -----
  const heroBgImg = document.querySelector('.hero__bg img');
  if (heroBgImg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 600);
        heroBgImg.style.transform = `translateY(${y * 0.18}px) scale(1.05)`;
        ticking = false;
      });
      ticking = true;
    }, { passive: true });
  }
})();
