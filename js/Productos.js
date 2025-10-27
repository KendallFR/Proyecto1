document.addEventListener('DOMContentLoaded', () => {

  // ================================
  // ANIMACIÓN REVEAL
  // ================================
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => obs.observe(el));

  // ================================
  // MENÚ MÓVIL (no se modifica)
  // ================================
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileNav.getAttribute('aria-hidden') === 'false';
    mobileNav.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
    menuToggle.classList.toggle('open', !isOpen);
  });

  // ================================
  // BUSCADOR Y FILTROS DINÁMICOS
  // ================================
  const filterTags = document.querySelectorAll('.filter-tag');
  const searchInput = document.getElementById('searchInput');
  const productCards = document.querySelectorAll('.product-card');

  // Función de filtrado principal
  function filterProducts(category, search) {
    productCards.forEach(card => {
      const matchesCategory = category === 'all' || card.dataset.category === category;
      const matchesSearch = card.querySelector('h3').textContent.toLowerCase().includes(search.toLowerCase());
      
      if (matchesCategory && matchesSearch) {
        card.style.display = 'block';
        card.classList.add('reveal'); // Para animación suave
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.style.display = 'none';
        card.classList.remove('visible');
      }
    });
  }

  // ================================
  // EVENTOS FILTROS
  // ================================
  filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
      // Activar solo un filtro
      filterTags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');

      const category = tag.dataset.category;
      const searchText = searchInput.value.trim();
      filterProducts(category, searchText);
    });

    // Animación hover artística
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = 'scale(1.15) rotate(-3deg)';
      tag.style.transition = 'all 0.35s ease';
    });
    tag.addEventListener('mouseleave', () => {
      if (!tag.classList.contains('active')) {
        tag.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });

  // ================================
  // EVENTO BUSCADOR
  // ================================
  searchInput.addEventListener('input', () => {
    const activeTag = document.querySelector('.filter-tag.active');
    const category = activeTag ? activeTag.dataset.category : 'all';
    const searchText = searchInput.value.trim();
    filterProducts(category, searchText);
  });

  // ================================
  // REVEAL ANIMADO AL CARGAR PRODUCTOS
  // ================================
  productCards.forEach(card => card.classList.add('reveal'));
});
