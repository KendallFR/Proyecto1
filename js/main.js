// ============================================
// MENÚ HAMBURGUESA (NAVEGACIÓN PRINCIPAL)
// ============================================

// Selecciona el botón hamburguesa y el menú de navegación principal
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

// Verifica que ambos elementos existan en el DOM antes de añadir eventos
if (menuToggle && mainNav) {
    // Al hacer clic en el botón hamburguesa
    menuToggle.addEventListener('click', function () {
        // Alterna la clase 'active' para mostrar/ocultar el menú
        mainNav.classList.toggle('active');
        
        // Cambia el icono del botón: ✕ cuando está abierto, ☰ cuando está cerrado
        this.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
    });
}

// ============================================
// MENÚ FLOTANTE MÓVIL (TABLA DE CONTENIDOS)
// ============================================

// Selecciona los elementos del menú flotante de tabla de contenidos
const floatingTocBtn = document.getElementById('floatingTocBtn'); // Botón flotante
const mobileTocMenu = document.getElementById('mobileTocMenu');   // Menú lateral
const mobileTocOverlay = document.getElementById('mobileTocOverlay'); // Overlay oscuro de fondo
const mobileTocClose = document.getElementById('mobileTocClose'); // Botón de cerrar (X)
const mobileTocLinks = document.querySelectorAll('.mobile-toc-link'); // Enlaces de navegación

// Función para abrir el menú de tabla de contenidos móvil
function openMobileToc() {
    mobileTocMenu.classList.add('show');      // Muestra el menú lateral
    mobileTocOverlay.classList.add('show');   // Muestra el overlay oscuro
    floatingTocBtn.classList.add('active');   // Marca el botón como activo
    document.body.style.overflow = 'hidden';  // Bloquea el scroll del body
}

// Función para cerrar el menú de tabla de contenidos móvil
function closeMobileToc() {
    mobileTocMenu.classList.remove('show');     // Oculta el menú lateral
    mobileTocOverlay.classList.remove('show');  // Oculta el overlay
    floatingTocBtn.classList.remove('active');  // Desmarca el botón
    document.body.style.overflow = '';          // Restaura el scroll del body
}

// Event listener para el botón flotante
if (floatingTocBtn) {
    floatingTocBtn.addEventListener('click', function () {
        // Si el menú está abierto, lo cierra; si está cerrado, lo abre
        if (mobileTocMenu.classList.contains('show')) {
            closeMobileToc();
        } else {
            openMobileToc();
        }
    });
}

// Cierra el menú al hacer clic en el botón de cerrar (X)
if (mobileTocClose) mobileTocClose.addEventListener('click', closeMobileToc);

// Cierra el menú al hacer clic en el overlay (fondo oscuro)
if (mobileTocOverlay) mobileTocOverlay.addEventListener('click', closeMobileToc);

// ============================================
// CERRAR MENÚ AL SELECCIONAR UNA SECCIÓN
// ============================================

// Para cada enlace en el menú móvil de tabla de contenidos
mobileTocLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Previene el comportamiento por defecto del enlace
        
        // Obtiene el elemento de destino usando el href del enlace
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            closeMobileToc(); // Cierra el menú primero
            
            // Después de 300ms (tiempo de animación de cierre), hace scroll suave a la sección
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    });
});

// ============================================
// FORMULARIO DE COMENTARIOS
// ============================================

// Selecciona el formulario de comentarios
const commentForm = document.getElementById('commentForm');

if (commentForm) {
    // Al enviar el formulario
    commentForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Previene el envío real del formulario
        
        // Muestra un mensaje de confirmación
        alert('¡Gracias por tu comentario! Será publicado después de ser revisado.');
        
        // Resetea todos los campos del formulario
        this.reset();
    });
}

// ============================================
// SMOOTH SCROLL Y RESALTADO DEL ÍNDICE (DESKTOP)
// ============================================

// Selecciona todos los enlaces de la tabla de contenidos del sidebar (escritorio)
const tocLinks = document.querySelectorAll('.article-sidebar .table-of-contents a');

// Selecciona todas las secciones que tienen un atributo 'id'
const sections = document.querySelectorAll('section[id]');

// Añade smooth scroll a los enlaces del índice de escritorio
tocLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Previene el salto brusco por defecto
        
        // Obtiene el elemento de destino
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Hace scroll suave hacia la sección objetivo
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// RESALTAR SECCIÓN ACTIVA EN AMBOS ÍNDICES
// ============================================

// Detecta qué sección está visible mientras el usuario hace scroll
window.addEventListener('scroll', () => {
    let current = ''; // Almacena el ID de la sección actual
    
    // Recorre todas las secciones para determinar cuál está en el viewport
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150; // Offset de 150px para activar antes
        
        // Si el scroll ha pasado el inicio de la sección, la marca como actual
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    // Actualiza el resaltado en el índice de escritorio
    tocLinks.forEach(link => {
        link.classList.remove('active'); // Remueve la clase activa de todos
        
        // Si el href del enlace coincide con la sección actual, lo marca como activo
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Actualiza el resaltado en el índice móvil
    mobileTocLinks.forEach(link => {
        link.classList.remove('active'); // Remueve la clase activa de todos
        
        // Si el href del enlace coincide con la sección actual, lo marca como activo
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});