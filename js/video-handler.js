/**
 * Manejador de videos para carga eficiente
 * Incluye soporte para YouTube, Vimeo y Ordinals
 */

class VideoManager {
    constructor() {
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        
        // Configurar miniaturas para todos los proveedores
        this.setupVideoThumbnails('youtube');
        this.setupVideoThumbnails('vimeo');
        this.setupVideoThumbnails('ordinals');
        
        this.setupHoverEffects();
        this.initialized = true;
    }

    setupVideoThumbnails(provider) {
        const videoContainers = document.querySelectorAll(`.video-container[data-${provider}-id]`);

        videoContainers.forEach(container => {
            const videoId = container.getAttribute(`data-${provider}-id`);
            let iframe = container.querySelector('iframe');

            if (!iframe) {
                iframe = this.createIframe(provider, videoId, container);
                container.appendChild(iframe);
            } else {
                iframe.style.display = 'none';
            }

            if (!container.querySelector('.video-thumbnail')) {
                this.createThumbnail(container, provider, videoId, iframe);
            }
        });
    }

    createIframe(provider, videoId, container) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen');
        iframe.style.display = 'none';

        const title = container.closest('.project-card')?.querySelector('.project-title')?.textContent || 'Video';
        
        switch(provider) {
            case 'youtube':
                iframe.setAttribute('data-src', `https://www.youtube.com/embed/${videoId}?rel=0`);
                break;
            case 'vimeo':
                iframe.setAttribute('data-src', `https://player.vimeo.com/video/${videoId}`);
                break;
            case 'ordinals':
                iframe.setAttribute('data-src', `https://ordinals.com/preview/${videoId}`);
                break;
        }
        
        iframe.setAttribute('title', `${title} - ${provider}`);
        return iframe;
    }

    async createThumbnail(container, provider, videoId, iframe) {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'video-thumbnail';

        try {
            switch(provider) {
                case 'youtube':
                    await this.setYoutubeThumbnail(thumbnail, videoId);
                    break;
                case 'vimeo':
                    await this.setVimeoThumbnail(thumbnail, videoId);
                    break;
                default:
                    thumbnail.style.backgroundColor = '#111';
            }
        } catch (error) {
            console.error('Error al cargar miniatura:', error);
            thumbnail.style.backgroundColor = '#111';
        }

        thumbnail.style.backgroundSize = 'cover';
        thumbnail.style.backgroundPosition = 'center';
        thumbnail.style.backgroundRepeat = 'no-repeat';
        thumbnail.style.width = '100%';
        thumbnail.style.height = '100%';
        thumbnail.style.position = 'absolute';
        thumbnail.style.top = '0';
        thumbnail.style.left = '0';
        thumbnail.style.cursor = 'pointer';
        thumbnail.style.transition = 'opacity 0.3s ease';

        thumbnail.addEventListener('click', (e) => this.handleThumbnailClick(e, container, iframe, provider, videoId));
        container.appendChild(thumbnail);
    }

    async setYoutubeThumbnail(thumbnail, videoId) {
        return new Promise((resolve) => {
            const img = new Image();
            const maxResUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            const hqUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            
            // Primero intentamos con maxresdefault.jpg
            img.src = maxResUrl;
            
            img.onload = () => {
                // Verificamos si la imagen cargada realmente existe (no es la miniatura por defecto)
                if (img.width > 120) {  // Las miniaturas por defecto suelen ser 120x90
                    thumbnail.style.backgroundImage = `url(${img.src})`;
                } else {
                    // Si es la miniatura por defecto, intentamos con hqdefault.jpg
                    img.src = hqUrl;
                    thumbnail.style.backgroundImage = `url(${hqUrl})`;
                }
                resolve();
            };
            
            img.onerror = () => {
                // Si falla maxresdefault, intentamos con hqdefault.jpg
                img.onerror = null; // Limpiamos el manejador de errores anterior
                img.src = hqUrl;
                thumbnail.style.backgroundImage = `url(${hqUrl})`;
                resolve();
            };
        });
    }

    async setVimeoThumbnail(thumbnail, videoId) {
        try {
            // Verificar si el ID parece ser un ID de Vimeo válido
            if (!/^\d+$/.test(videoId)) {
                throw new Error('ID de Vimeo no válido');
            }
            
            // Usar Promise.race para establecer un tiempo de espera
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos de tiempo de espera
            
            try {
                const response = await fetch(`https://vimeo.com/api/v2/video/${videoId}.json`, {
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data[0]?.thumbnail_large) {
                    thumbnail.style.backgroundImage = `url(${data[0].thumbnail_large})`;
                } else {
                    throw new Error('No se encontró la miniatura');
                }
            } catch (error) {
                clearTimeout(timeoutId);
                throw error; // Relanzar el error para manejarlo en el catch externo
            }
        } catch (error) {
            console.warn(`No se pudo cargar la miniatura de Vimeo (ID: ${videoId}):`, error.message);
            // Usar una imagen de respaldo o un color de fondo
            thumbnail.style.backgroundImage = 'none';
            thumbnail.style.backgroundColor = '#111';
            thumbnail.style.display = 'flex';
            thumbnail.style.alignItems = 'center';
            thumbnail.style.justifyContent = 'center';
            thumbnail.style.color = '#666';
            thumbnail.style.fontSize = '14px';
            thumbnail.textContent = 'Miniatura no disponible';
        }
    }

    handleThumbnailClick(e, container, iframe, provider, videoId) {
        e.preventDefault();
        e.stopPropagation();

        const thumbnail = e.currentTarget;
        if (thumbnail.getAttribute('data-loading') === 'true') return;
        thumbnail.setAttribute('data-loading', 'true');

        if (provider === 'ordinals') {
            window.open(iframe.getAttribute('data-src'), '_blank');
            thumbnail.setAttribute('data-loading', 'false');
        } else {
            this.loadVideo(container, iframe, thumbnail, provider, videoId);
        }
    }

    loadVideo(container, iframe, thumbnail, provider, videoId) {
        const loading = this.createLoadingIndicator();
        container.appendChild(loading);

        if (thumbnail) {
            thumbnail.style.opacity = '0';
            setTimeout(() => {
                if (thumbnail.parentNode === container) {
                    container.removeChild(thumbnail);
                }
            }, 300);
        }

        const src = iframe.getAttribute('data-src');
        if (src) {
            if (provider === 'youtube' || provider === 'vimeo') {
                iframe.src = `${src}${src.includes('?') ? '&' : '?'}autoplay=1`;
            } else {
                iframe.src = src;
            }
        }

        iframe.style.display = 'block';
        iframe.style.opacity = '0';
        iframe.offsetHeight; // Forzar reflow
        iframe.style.transition = 'opacity 0.5s ease';
        iframe.style.opacity = '1';

        const onLoad = () => {
            if (loading.parentNode === container) {
                loading.style.opacity = '0';
                setTimeout(() => {
                    if (loading.parentNode === container) {
                        container.removeChild(loading);
                    }
                }, 300);
            }
            iframe.removeEventListener('load', onLoad);
        };

        iframe.addEventListener('load', onLoad);
        if (iframe.complete || iframe.readyState > 3) {
            onLoad();
        }

        iframe.addEventListener('error', () => {
            console.error('Error al cargar el video');
            if (loading.parentNode === container) {
                container.removeChild(loading);
            }
            if (thumbnail) {
                thumbnail.style.opacity = '1';
                thumbnail.style.display = 'block';
            }
        });
    }

    createLoadingIndicator() {
        const loading = document.createElement('div');
        loading.className = 'video-loading';
        loading.innerHTML = `
            <div class="spinner"></div>
            <span>Cargando...</span>
        `;
        return loading;
    }

    setupHoverEffects() {
        document.querySelectorAll('.media-hover-container').forEach(container => {
            const image = container.querySelector('.media-hover-image');
            const video = container.querySelector('.media-hover-video iframe');
            let videoPaused = true;

            container.addEventListener('mouseenter', () => {
                if (image) image.style.opacity = '0';
                const videoContainer = container.querySelector('.media-hover-video');
                if (videoContainer) videoContainer.style.opacity = '1';

                if (video && videoPaused) {
                    video.src += '&autoplay=1';
                    videoPaused = false;
                }
            });

            container.addEventListener('mouseleave', () => {
                if (image) image.style.opacity = '1';
                const videoContainer = container.querySelector('.media-hover-video');
                if (videoContainer) videoContainer.style.opacity = '0';

                if (video && !videoPaused) {
                    video.src = video.src.replace('&autoplay=1', '');
                    videoPaused = true;
                }
            });
        });
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    const videoManager = new VideoManager();
    videoManager.init();
});
