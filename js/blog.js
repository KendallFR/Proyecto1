// ===================================
// FUNCIONALIDAD DE CAROUSEL (CARRUSEL)
// ===================================

// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function () {
    
    // Selección de elementos del carousel
    const carouselTrack = document.getElementById('carouselTrack'); // Contenedor que se mueve
    const prevBtn = document.getElementById('prevBtn');             // Botón anterior
    const nextBtn = document.getElementById('nextBtn');             // Botón siguiente
    const indicators = document.querySelectorAll('.indicator');     // Puntos indicadores
    const articles = document.querySelectorAll('.article-card-carousel'); // Tarjetas de artículos
    
    // Variables de control del carousel
    let currentIndex = 0;                    // Índice del slide actual
    const totalArticles = articles.length;   // Número total de artículos
    let autoplayInterval;                    // Variable para almacenar el intervalo de autoplay

    // ===================================
    // FUNCIÓN PARA MOVER EL CAROUSEL
    // ===================================
    function moveToSlide(index) {
        // Manejo de índices circulares (loop infinito)
        if (index < 0) {
            currentIndex = totalArticles - 1; // Si va hacia atrás desde el primero, va al último
        } else if (index >= totalArticles) {
            currentIndex = 0; // Si avanza desde el último, vuelve al primero
        } else {
            currentIndex = index;
        }

        // Calcula el desplazamiento horizontal (cada slide ocupa 100% del ancho)
        const offset = -currentIndex * 100;
        carouselTrack.style.transform = `translateX(${offset}%)`;

        // Actualizar indicadores visuales (puntos)
        indicators.forEach((indicator, i) => {
            // Marca como 'active' solo el indicador correspondiente al slide actual
            indicator.classList.toggle('active', i === currentIndex);
        });
    }

    // ===================================
    // NAVEGACIÓN CON BOTONES
    // ===================================
    
    // Botón anterior: retrocede un slide
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            moveToSlide(currentIndex - 1);
            resetAutoplay(); // Reinicia el autoplay después de la interacción manual
        });
    }

    // Botón siguiente: avanza un slide
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            moveToSlide(currentIndex + 1);
            resetAutoplay(); // Reinicia el autoplay después de la interacción manual
        });
    }

    // ===================================
    // NAVEGACIÓN CON INDICADORES
    // ===================================
    
    // Permite ir directamente a un slide específico haciendo clic en su indicador
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            moveToSlide(index);
            resetAutoplay(); // Reinicia el autoplay después de la interacción manual
        });
    });

    // ===================================
    // AUTOPLAY (REPRODUCCIÓN AUTOMÁTICA)
    // ===================================
    
    // Inicia el autoplay: avanza automáticamente cada 5 segundos
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, 5000); // 5000ms = 5 segundos
    }

    // Reinicia el autoplay (limpia el intervalo anterior y crea uno nuevo)
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Iniciar autoplay al cargar la página
    startAutoplay();

    // ===================================
    // PAUSAR AUTOPLAY AL PASAR EL MOUSE
    // ===================================
    
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        // Pausa el autoplay cuando el mouse entra en el carousel
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        // Reanuda el autoplay cuando el mouse sale del carousel
        carouselContainer.addEventListener('mouseleave', () => {
            startAutoplay();
        });
    }

    // ===================================
    // SOPORTE PARA GESTOS TÁCTILES (SWIPE)
    // ===================================
    
    let touchStartX = 0; // Posición inicial del toque
    let touchEndX = 0;   // Posición final del toque

    if (carouselTrack) {
        // Captura la posición inicial cuando el usuario toca la pantalla
        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true }); // passive: true mejora el rendimiento del scroll

        // Captura la posición final cuando el usuario levanta el dedo
        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe(); // Procesa el gesto de deslizamiento
        });
    }

    // Detecta la dirección del swipe y cambia el slide
    function handleSwipe() {
        const swipeThreshold = 50; // Mínimo de píxeles para considerar un swipe válido
        
        // Swipe hacia la izquierda (avanza al siguiente slide)
        if (touchStartX - touchEndX > swipeThreshold) {
            moveToSlide(currentIndex + 1);
            resetAutoplay();
        }
        
        // Swipe hacia la derecha (retrocede al slide anterior)
        if (touchEndX - touchStartX > swipeThreshold) {
            moveToSlide(currentIndex - 1);
            resetAutoplay();
        }
    }

    // ===================================
    // FUNCIONALIDAD DE FILTROS
    // ===================================
    
    const filterButtons = document.querySelectorAll('.filter-btn'); // Botones de filtro
    const articleCards = document.querySelectorAll('.article-card'); // Tarjetas de artículos

    // Añade funcionalidad a cada botón de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter'); // Obtiene la categoría del filtro

            // Actualizar botones activos (marca visualmente el filtro seleccionado)
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filtrar artículos con animación suave
            articleCards.forEach(card => {
                const category = card.getAttribute('data-category');

                // Mostrar tarjeta si coincide con el filtro o si el filtro es "todos"
                if (filterValue === 'todos' || category === filterValue) {
                    card.style.display = 'flex';
                    // Pequeño delay para la animación de aparición
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    // Ocultar tarjeta con animación de desaparición
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // Espera a que termine la animación antes de ocultar
                }
            });
        });
    });

    // Inicializar estilos de transición en todas las tarjetas
    articleCards.forEach(card => {
        card.style.transition = 'all 0.3s ease';
    });

    // ===================================
    // FILTRO POR TARJETAS DE CATEGORÍA
    // ===================================
    
    const categoryCards = document.querySelectorAll('.category-card');

    // Al hacer clic en una tarjeta de categoría
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            
            // Hace scroll suave hasta la sección de artículos
            const articlesSection = document.querySelector('.all-articles-section');
            if (articlesSection) {
                articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // Activa el filtro correspondiente después de hacer scroll
            setTimeout(() => {
                const targetButton = document.querySelector(`.filter-btn[data-filter="${category}"]`);
                if (targetButton) {
                    targetButton.click(); // Simula un clic en el botón de filtro
                }
            }, 500); // Delay de 500ms para que termine el scroll
        });
    });

    // ===================================
    // FORMULARIO DE NEWSLETTER
    // ===================================
    
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Previene el envío real del formulario
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email) {
                // Muestra mensaje de confirmación con el email ingresado
                alert(`¡Gracias por suscribirte! Te enviaremos nuestras novedades a: ${email}`);
                newsletterForm.reset(); // Limpia el formulario
            }
        });
    }

    // ===================================
    // ANIMACIONES AL HACER SCROLL
    // ===================================
    
    // Opciones para el Intersection Observer
    const observerOptions = {
        threshold: 0.1,                    // Se activa cuando el 10% del elemento es visible
        rootMargin: '0px 0px -50px 0px'    // Margen adicional desde el borde inferior
    };

    // Crea un observador para detectar cuándo los elementos entran en el viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // Si el elemento está visible
                // Anima el elemento hacia su posición final
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animación de entrada
    const animatedElements = document.querySelectorAll('.category-card, .article-card');
    animatedElements.forEach(el => {
        // Estado inicial: oculto y desplazado hacia abajo
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el); // Comienza a observar el elemento
    });

    // ===================================
    // NAVEGACIÓN CON TECLADO PARA CAROUSEL
    // ===================================
    
    // Permite controlar el carousel con las flechas del teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            moveToSlide(currentIndex - 1); // Flecha izquierda: slide anterior
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            moveToSlide(currentIndex + 1); // Flecha derecha: siguiente slide
            resetAutoplay();
        }
    });

    // ===================================
    // SMOOTH SCROLL PARA TODOS LOS ENLACES
    // ===================================
    
    // Selecciona todos los enlaces que apuntan a anclas (#)
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Verifica que no sea solo "#" y que tenga más de 1 carácter
            if (href !== '#' && href.length > 1) {
                e.preventDefault(); // Previene el salto brusco por defecto
                
                const target = document.querySelector(href);
                if (target) {
                    // Hace scroll suave hacia el elemento objetivo
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
});

// ============================================
// FUNCIONALIDAD DE BÚSQUEDA Y FILTRADO
// ============================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // OBTENER ELEMENTOS DEL DOM
    // ========================================
    const searchInput = document.getElementById('searchInput');     // Campo de búsqueda
    const clearSearchBtn = document.getElementById('clearSearch');  // Botón para limpiar búsqueda
    const articlesGrid = document.getElementById('articlesGrid');   // Contenedor de artículos
    const noResults = document.getElementById('noResults');         // Mensaje de "sin resultados"
    const filterButtons = document.querySelectorAll('.filter-btn'); // Botones de categoría
    
    let currentFilter = 'todos'; // Filtro actual seleccionado (por defecto: mostrar todos)
    
    // ========================================
    // FUNCIÓN DE BÚSQUEDA PRINCIPAL
    // ========================================
    function searchArticles() {
        // Obtiene el término de búsqueda en minúsculas y sin espacios extra
        const searchTerm = searchInput.value.toLowerCase().trim();
        const articles = articlesGrid.querySelectorAll('.article-card');
        let visibleCount = 0; // Contador de artículos visibles
        
        // Mostrar/ocultar botón de limpiar según si hay texto
        if (searchTerm.length > 0) {
            clearSearchBtn.style.display = 'flex';
        } else {
            clearSearchBtn.style.display = 'none';
        }
        
        // Recorrer todos los artículos para filtrarlos
        articles.forEach(article => {
            // Obtiene los atributos de datos del artículo
            const category = article.getAttribute('data-category');
            const title = article.getAttribute('data-title');
            const description = article.getAttribute('data-description');
            
            // Verificar si el artículo coincide con el término de búsqueda
            // Busca en título y descripción
            const matchesSearch = searchTerm === '' || 
                                  title.includes(searchTerm) || 
                                  description.includes(searchTerm);
            
            // Verificar si el artículo coincide con el filtro de categoría actual
            const matchesFilter = currentFilter === 'todos' || category === currentFilter;
            
            // Mostrar u ocultar el artículo según los criterios
            if (matchesSearch && matchesFilter) {
                article.classList.remove('hidden'); // Muestra el artículo
                visibleCount++; // Incrementa el contador
            } else {
                article.classList.add('hidden'); // Oculta el artículo
            }
        });
        
        // Mostrar mensaje si no hay resultados
        if (visibleCount === 0) {
            noResults.style.display = 'block';     // Muestra mensaje "sin resultados"
            articlesGrid.style.display = 'none';   // Oculta la grilla de artículos
        } else {
            noResults.style.display = 'none';      // Oculta mensaje
            articlesGrid.style.display = 'grid';   // Muestra la grilla
        }
    }
    
    // ========================================
    // EVENT LISTENERS
    // ========================================
    
    // Búsqueda en tiempo real mientras el usuario escribe
    searchInput.addEventListener('input', searchArticles);
    
    // Limpiar búsqueda al hacer clic en el botón de limpiar
    clearSearchBtn.addEventListener('click', function() {
        searchInput.value = '';                     // Vacía el campo de búsqueda
        clearSearchBtn.style.display = 'none';      // Oculta el botón de limpiar
        searchArticles();                           // Ejecuta la búsqueda (mostrará todos)
        searchInput.focus();                        // Mantiene el foco en el input
    });
    
    // Filtros por categoría
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase 'active' de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase 'active' al botón clickeado (resaltado visual)
            this.classList.add('active');
            
            // Actualizar la variable de filtro actual
            currentFilter = this.getAttribute('data-filter');
            
            // Ejecutar búsqueda con el nuevo filtro aplicado
            searchArticles();
        });
    });
    
    // Búsqueda al presionar la tecla Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();  // Previene el comportamiento por defecto
            searchArticles();    // Ejecuta la búsqueda
        }
    });
    
});