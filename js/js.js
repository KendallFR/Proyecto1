/* main.js — animaciones profesionales
   - Mobile toggle
   - Smooth scroll
   - Reveal on scroll (IntersectionObserver)
   - Hero micro-parallax for floating pets
   - Shrink header on scroll
   - Button ripple effect
   - Simple form submit mock
*/

document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------
  // MOBILE MENU TOGGLE
  // ---------------------------
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    const toggleMenu = () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      document.body.classList.toggle('no-scroll', isOpen);
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Cierra menú al hacer click en un link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });

    // Cierra al hacer click fuera del menú
    document.addEventListener('click', (e) => {
      if (mobileNav.classList.contains('open') &&
          !mobileNav.contains(e.target) &&
          !menuToggle.contains(e.target)) {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('open');
        document.body.classList.remove('no-scroll');
      }
    });
  }

  // ---------------------------
  // SMOOTH SCROLL
  // ---------------------------
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------------------------
  // REVEAL ON SCROLL
  // ---------------------------
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => observer.observe(el));

  // ---------------------------
  // FLOATING DECORATIONS (parallax)
  // ---------------------------
  const floaters = document.querySelectorAll('.floating');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    floaters.forEach(el => {
      const speed = parseFloat(el.dataset.speed) || 0.6;
      el.style.transform = `translateY(${Math.sin(scrolled * 0.001 * speed) * 10}px)`;
    });
  });

  // ---------------------------
  // SHRINK HEADER ON SCROLL
  // ---------------------------
  const header = document.querySelector('.site-header');
  const brandCircle = document.querySelector('.brand-circle');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.backdropFilter = 'blur(10px)';
      header.style.boxShadow = '0 6px 30px rgba(0,0,0,0.08)';
      if (brandCircle) brandCircle.style.transform = 'scale(0.92)';
    } else {
      header.style.backdropFilter = 'blur(6px)';
      header.style.boxShadow = 'none';
      if (brandCircle) brandCircle.style.transform = 'scale(1)';
    }
  });

  // ---------------------------
  // BUTTON RIPPLE EFFECT
  // ---------------------------
  function addRipple(btn) {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      ripple.className = 'ripple';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  }
  document.querySelectorAll('.btn-primary, .card-btn, .btn-cta').forEach(addRipple);

  // ---------------------------
  // FORM SUBMIT MOCK
  // ---------------------------
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      if (!name || !email) {
        formMessage.textContent = 'Por favor completa nombre y correo.';
        formMessage.style.color = '#c0392b';
        return;
      }
      formMessage.style.color = 'var(--verde)';
      formMessage.textContent = 'Solicitud enviada ✓ — Te contactaremos pronto.';
      setTimeout(() => form.reset(), 1400);
    });
  }

});
