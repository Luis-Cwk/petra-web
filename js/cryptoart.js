// Archivo cryptoart.js - Inicialmente vacío
// Este archivo se cargará cuando se acceda a la sección de cryptoart

// Función para inicializar la sección de cryptoart
function initCryptoArt() {
    console.log('Sección de CryptoArt inicializada');
    // Aquí iría el código específico para la sección de cryptoart
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en la página de cryptoart
    if (document.querySelector('.cryptoart-section')) {
        initCryptoArt();
    }
});
