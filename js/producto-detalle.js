document.addEventListener('DOMContentLoaded', () => {

  // ================================
  // CARRUSEL DE IMÁGENES
  // ================================
  const imagenPrincipal = document.getElementById('imagen-principal');
  const miniaturas = Array.from(document.querySelectorAll('.thumb'));
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let currentIndex = 0;

  function actualizarCarrusel(idx) {
    // Cambiar imagen principal
    imagenPrincipal.src = miniaturas[idx].src;
    imagenPrincipal.alt = miniaturas[idx].alt;

    // Actualizar clase active en miniaturas
    miniaturas.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === idx);
    });

    currentIndex = idx;
  }

  // Click en miniaturas
  miniaturas.forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      actualizarCarrusel(i);
    });
  });

  // Botón anterior
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const idx = (currentIndex - 1 + miniaturas.length) % miniaturas.length;
      actualizarCarrusel(idx);
    });
  }

  // Botón siguiente
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const idx = (currentIndex + 1) % miniaturas.length;
      actualizarCarrusel(idx);
    });
  }

  // Inicializar carrusel con la primera imagen
  actualizarCarrusel(currentIndex);

  // ================================
  // BOTÓN AGREGAR AL CARRITO
  // ================================
  const btnComprar = document.getElementById('agregarCarrito');
  const mensajeAgregado = document.getElementById('mensajeAgregado');

  if (btnComprar && mensajeAgregado) {
    btnComprar.addEventListener('click', () => {
      mensajeAgregado.style.display = 'block';
      mensajeAgregado.textContent = '✅ Producto agregado al carrito';
      setTimeout(() => {
        mensajeAgregado.style.display = 'none';
      }, 2500);
    });
  }

  // ================================
  // ANIMACIÓN REVEAL
  // ================================
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

  // ================================
  // MENÚ MÓVIL
  // ================================
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      document.body.classList.toggle('no-scroll');
      mobileNav.classList.toggle('open');
      mobileNav.setAttribute('aria-hidden', mobileNav.classList.contains('open') ? 'false' : 'true');
    });
  }

});


// Calificación por estrellas
const stars = document.querySelectorAll('.rating .star');
const inputCalificacion = document.getElementById('calificacion');

stars.forEach(star => {
  star.addEventListener('click', () => {
    inputCalificacion.value = star.dataset.value;
    stars.forEach(s => s.classList.remove('seleccionada'));
    star.classList.add('seleccionada');
    // colorea todas las estrellas hasta la seleccionada
    let valor = parseInt(star.dataset.value);
    stars.forEach(s => {
      if (parseInt(s.dataset.value) <= valor) {
        s.classList.add('seleccionada');
      }
    });
  });
});


