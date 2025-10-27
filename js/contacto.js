// ============================================
// FORMULARIO DE CONTACTO 
// ============================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Cuando se envía el formulario
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que la página se recargue
        
        // Obtiene los valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        
        // Validación simple
        if (name === '' || email === '' || service === '') {
            showMessage('Por favor completa todos los campos obligatorios', 'error');
            return;
        }
        
        // Validar email básico
        if (!email.includes('@')) {
            showMessage('Por favor ingresa un correo válido', 'error');
            return;
        }
        
        // Si todo está bien, muestra mensaje de éxito
        showMessage('¡Gracias por contactarnos! Te responderemos pronto.', 'success');
        
        // Limpia el formulario
        contactForm.reset();
    });
}

// Función para mostrar mensajes
function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = 'form-message show ' + type;
    
    // Oculta el mensaje después de 5 segundos
    setTimeout(function() {
        formMessage.classList.remove('show');
    }, 5000);
}