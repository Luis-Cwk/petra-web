// Script para ocultar extensiones .html - Maneja ambos casos
(function() {
    'use strict';
    
    // Mapeo completo de archivos a URLs limpias
    const fileToUrlMap = {
        // Páginas existentes
        '/articulos/index.html': '/articulos',
        '/about/index.html': '/about',
        '/exhibiciones/index.html': '/exhibiciones',
        '/talleres/index.html': '/talleres',
        '/noticias/index.html': '/noticias',
        '/cryptoart/index.html': '/cryptoart',
        // Página de colecciones
        '/colecciones/index.html': '/colecciones',
        // Casos con archivo .html (para compatibilidad)
        '/articulos/articulos.html': '/articulos',
        '/about/about.html': '/about',
        '/exhibiciones/exhibiciones.html': '/exhibiciones',
        '/talleres/talleres.html': '/talleres',
        '/noticias/noticias.html': '/noticias',
        '/cryptoart/cryptoart.html': '/cryptoart',
        '/colecciones/colecciones.html': '/colecciones'
    };
    
    // Función para limpiar URL
    function cleanUrl() {
        const path = window.location.pathname;
        
        // Buscar en el mapeo y limpiar la URL
        if (fileToUrlMap[path]) {
            const cleanUrl = fileToUrlMap[path];
            window.history.replaceState({}, '', cleanUrl);
        }
    }

    // Ejecutar inmediatamente
    cleanUrl();
    
    // También ejecutar cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', cleanUrl);
})();
