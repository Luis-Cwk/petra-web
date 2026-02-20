// Función para cargar la sección de talleres
document.addEventListener('DOMContentLoaded', function () {
    const talleresHTML = `
    <section id="talleres" class="section content-section">
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-lg-10 text-center">
                    <h3 class="mb-4">Entrenamiento para danza contemporánea</h3>
                    <h4 class="mb-4">"Cuerpo Tridimensional"</h4>

                    <div class="row justify-content-center">
                        <div class="col-lg-8 mb-4">
                            <div class="ratio ratio-16x9">
                                <iframe src="https://player.vimeo.com/video/372892366?h=49aefbf094"
                                    title="Taller Cuerpo Tridimensional" frameborder="0"
                                    allow="autoplay; fullscreen; picture-in-picture">
                                </iframe>
                            </div>
                        </div>
                    </div>

                    <!-- Clases y Talleres -->
                    <div class="row justify-content-center mt-5">
                        <div class="col-lg-10">
                            <div class="row">
                                <div class="col-md-6 mb-4">
                                    <div class="card h-100 project-card">
                                        <div class="card-body text-center">
                                            <i class="fas fa-3x mb-3" style="color: #4cc9f0;"></i>
                                            <h4 class="mb-3">Clases de Danza</h4>
                                            <p class="mb-3">Aprende nuevos estilos de danza, mejora tu confianza,
                                                flexibilidad y coordinación con clases personalizadas.
                                            </p>
                                            <a href="https://www.superprof.mx/aprende-nuevos-estilos-danza-mejora-confianza-flexibilidad-coordinacion-con-clases-personalizadas.html"
                                                class="btn btn-outline-light" target="_blank">Más información</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-4">
                                    <div class="card h-100 project-card">
                                        <div class="card-body text-center">
                                            <i class="fas fa-3x mb-3" style="color: #4cc9f0;"></i>
                                            <h4 class="mb-3">Programación Creativa</h4>
                                            <p class="mb-3">Crea tu propia página web desde cero y aprende sobre
                                                programación creativa.</p>
                                            <a href="https://www.superprof.mx/crea-propia-pagina-web-desde-cero-aprende-sobre-programacion-creativa.html"
                                                class="btn btn-outline-light" target="_blank">Más información</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

    // Insertar la sección de talleres en el contenedor correspondiente
    const talleresContainer = document.getElementById('talleres-container');
    if (talleresContainer) {
        // Primero, asegurarse de que el contenedor esté vacío
        talleresContainer.innerHTML = '';
        // Luego, insertar el HTML
        talleresContainer.insertAdjacentHTML('beforeend', talleresHTML);
    }
});
