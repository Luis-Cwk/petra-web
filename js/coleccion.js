// Array con las obras de la colección
const coleccionObras = [
    {
        id: "kinetics-bodies",
        title: "Kinetics of Bodies, Branches and Circuits",
        description: `
            <div class="row g-2 mb-5">
                <div class="col-4">
                    <img src="imagenesOBRA/Makindt-2-2025.jpg" class="img-fluid w-100" style="height: 100%; object-fit: cover;" alt="Kinetics Detail 2">
                </div>
                <div class="col-4">
                    <img src="imagenesOBRA/Makindt-3-2025.jpg" class="img-fluid w-100" style="height: 100%; object-fit: cover;" alt="Kinetics Detail 3">
                </div>
                <div class="col-4">
                    <img src="imagenesOBRA/Makindt-2025.jpg" class="img-fluid w-100" style="height: 100%; object-fit: cover;" alt="Kinetics Detail 1">
                </div>
            </div>

            <p class="mb-4">Kinetics of Bodies, Branches, and Circuits is an audiovisual project that explores generative choreography based on movement improvisation in dialogue with technology. The piece is constructed as a developing score, where the spontaneity of the body is translated into real-time visuals, generating an immersive and constantly transforming aesthetic experience. What poetics can we propose from improvisation, from the ephemeral and sudden nature of movement in combination with technology? This collection reflects on how our bodies can be seen as extensions of a broader, universal system. Through movement and form, it evokes the fusion of dance and technology.</p>
            
            <p class="mb-4">Artwork stems from the meeting of two artists from different cities, brought together solely for the purpose of collaborating on the creation of this experimental stage production. The project emerged as a laboratory to test new forms of interaction between dance and digital imagery, opening up a space for research where the ephemeral nature of gesture is expanded through technology. The work is conceived as an interdisciplinary exploration that questions: How and why do we need to empower and transform ourselves by hybridizing body, movement, and machine?</p>
        `,
        categories: ["arte-generativo", "ia", "coleccion", "performance"],
        type: "manifold",
        manifoldUrl: "https://manifold.xyz/@petra/p/kinetics",
        linkText: "Coleccion disponible en Manifold: https://manifold.xyz/@petra/p/kinetics",
        thumbnail: "kinetics-cover.jpg" // Note: This internal thumbnail isn't strictly used if we don't setup thumbnails, but we should keeping consistent. However, the user didn't ask for a thumbnail update here, just the content. The layout uses text primarily? No, existing layout uses generates simple HTML.
    },
    {
        id: "collective-consciousness",
        title: "Collective Consciousness",
        description: "",
        categories: ["arte-generativo", "ia", "coleccion"],
        type: "ordinals",
        ordinalsId: "ed2aa353d70d4626993291d5422824f8b2fc5f609f4e3aa2d09a92edce64dadci0",
        thumbnail: "cc.gif",
        gammaUrl: "https://gamma.io/ordinals/collections/collective-consciousness",
        linkText: "Ver en Gamma"
    },
    {
        id: "cypher-infinite",
        title: "Cypher - Infinite Environment",
        description: "",
        categories: ["arte-generativo", "ia", "coleccion"],
        type: "ordinals",
        ordinalsId: "6ab91dbf0b916206d821e953bf9f733a2ea5a09ddb2209390a6f4b3f86d70740i0",
        thumbnail: "cypher.gif",
        gammaUrl: "https://gamma.io/ordinals/collections/cypher-infinite-environment",
        linkText: "Ver en Gamma"
    },
    {
        id: "pixel-cascade",
        title: "Pixel Cascade",
        description: "",
        categories: ["arte-generativo", "ia", "coleccion"],
        type: "ordinals",
        ordinalsId: "b73e82984d68e50a291c8690ca331b21a0f016ae1dc78bb5febef1f39010e0e7i0",
        thumbnail: "2.PixelCasade.gif",
        gammaUrl: "https://gamma.io/ordinals/collections/pixel-cascade",
        linkText: "Ver en Gamma"
    },
    {
        id: "oda-paisajes-futuro",
        title: "Oda a los paisajes del futuro en cuerpos trashumanos",
        description: "",
        categories: ["fotografía", "arte-digital", "ia", "coleccion"],
        type: "zora",
        zoraUrl: "https://zora.co/collect/zora:0x069e026d47362ef0ce1b4b34f7016d21a975db12",
        linkText: "Ver en Zora",
        thumbnail: "placeholder.jpg"
    },
    {
        id: "genes",
        title: "Genes",
        description: "",
        categories: ["arte-generativo", "ia", "coleccion", "nft", "performance"],
        type: "manifold",
        manifoldUrl: "https://manifold.gallery/petra/curation/genes",
        linkText: "Ver en Manifold Gallery",
        thumbnail: "genes-preview.jpg"
    },
    {
        id: "moveinprompts",
        title: "MoveInPrompts",
        description: "",
        categories: ["arte-generativo", "coleccion", "nft"],
        type: "opensea",
        openseaUrl: "https://opensea.io/collection/moveinprompts",
        linkText: "Ver en OpenSea",
        thumbnail: "moveinprompts.gif"
    },
    {
        id: "genes-v3",
        title: "Genes V3",
        description: "",
        categories: ["arte-generativo", "coleccion", "nft"],
        type: "opensea",
        openseaUrl: "https://opensea.io/collection/genes-v3",
        linkText: "Ver en OpenSea",
        thumbnail: "genes-v3.gif"
    },
    {
        id: "ai-672",
        title: "AI",
        description: "",
        categories: ["arte-generativo", "ia", "coleccion", "nft"],
        type: "opensea",
        openseaUrl: "https://opensea.io/collection/ai-672",
        linkText: "Ver en OpenSea",
        thumbnail: "ai-672.gif"
    },
    {
        id: "2554cai",
        title: "2554Cai",
        description: "",
        categories: ["arte-generativo", "coleccion", "nft"],
        type: "objkt",
        objktUrl: "https://objkt.com/collections/KT1Sjd44qbNjqPzCtHXQt2m9ezzgiXrXnX6r",
        linkText: "Ver en Objkt",
        thumbnail: "2554cai.gif"
    },
    {
        id: "ki",
        title: "Ki",
        description: "",
        categories: ["arte-generativo", "coleccion", "nft"],
        type: "objkt",
        objktUrl: "https://objkt.com/collections/KT1AU7rYPpQDLSjc5gdCG7F1bGRGDkjffHwq",
        linkText: "Ver en Objkt",
        thumbnail: "ki.gif"
    },
    {
        id: "color-studies-in-motion",
        title: "Color Studies in Motion",
        description: "",
        categories: ["arte-generativo", "coleccion", "nft"],
        type: "objkt",
        objktUrl: "https://objkt.com/collections/KT1GWh2bzw9ZqrsVdcGRa4w58gJoS3T8tJxU",
        linkText: "Ver en Objkt",
        thumbnail: "color-studies.gif"
    },
    {
        id: "yapayaso",
        title: "Yapayaso",
        description: "",
        categories: ["arte-generativo", "coleccion", "nft"],
        type: "opensea",
        openseaUrl: "https://opensea.io/collection/yapayaso",
        linkText: "Ver en OpenSea",
        thumbnail: "yapayaso.gif"
    },
    {
        id: "gen-art",
        title: "Gen Art",
        description: "",
        categories: ["arte-generativo", "ia", "coleccion", "nft"],
        type: "manifold",
        manifoldUrl: "https://manifold.gallery/petra/curation/GenArt",
        linkText: "Ver en Manifold Gallery",
        thumbnail: "gen-art-preview.jpg"
    }
];

// Función para obtener la URL de la obra según su tipo
function obtenerUrlObra(obra) {
    switch (obra.type) {
        case 'ordinals':
            return obra.gammaUrl;
        case 'zora':
            return obra.zoraUrl;
        case 'opensea':
            return obra.openseaUrl;
        case 'objkt':
            return obra.objktUrl;
        case 'manifold':
            return obra.manifoldUrl;
        default:
            return '#';
    }
}

// Función para crear el HTML de una obra
function generarObraHTML(obra) {
    const url = obtenerUrlObra(obra);
    return `
    <div class="col-12 artwork-item" data-category="${obra.categories.join(',')}" id="${obra.id}">
        <div class="project-card">
            <div class="card-body">
                <h3 class="project-title">${obra.title}</h3>
                <div class="project-description text-start mx-auto" style="max-width: 800px;">
                    ${obra.description}
                </div>
                ${url !== '#' ? `<p class="mt-3"><a href="${url}" target="_blank" class="project-link">${obra.linkText}</a></p>` : ''}
            </div>
        </div>
    </div>`;
}

// Función para cargar las obras en el DOM
function cargarObrasColeccion() {
    const container = document.getElementById('coleccion-container');
    if (!container) return;

    // Generar el HTML para cada obra y unirlo
    const obrasHTML = coleccionObras.map(obra => generarObraHTML(obra)).join('');

    // Insertar las obras en el contenedor
    container.innerHTML = `
        <div class="container-fluid">
            <div class="row" id="coleccion-obras">
                ${obrasHTML}
            </div>
        </div>`;

    // Inicializar los thumbnails para las obras de la colección
    if (typeof setupVideoThumbnails === 'function') {
        setupVideoThumbnails('ordinals');
    }
}

// Función para mostrar/ocultar la colección basada en la categoría seleccionada
function actualizarVisibilidadColeccion(categoria) {
    const esColeccion = categoria === 'coleccion';
    const contenedor = document.getElementById('coleccion-container');

    if (esColeccion && !document.querySelector('#coleccion-container .artwork-item')) {
        // Si se seleccionó la categoría colección y no se han cargado las obras aún
        cargarObrasColeccion();
    }

    if (contenedor) {
        contenedor.style.display = esColeccion ? 'block' : 'none';
    }
}

// Cargar las obras cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    // Crear un contenedor específico para la colección
    const container = document.createElement('div');
    container.id = 'coleccion-container';
    container.style.display = 'none'; // Oculto por defecto
    container.style.paddingTop = '80px'; // Espacio superior para separar de la navbar
    document.getElementById('artworks-container').parentNode.insertBefore(container, document.getElementById('artworks-container'));

    // Escuchar cambios en los filtros de categoría
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const categoria = this.getAttribute('data-filter');
            actualizarVisibilidadColeccion(categoria);
        });
    });

    // Si la categoría 'todas' está activa por defecto, asegurarse de que la colección esté oculta
    actualizarVisibilidadColeccion('all');
});

// Función global para navegar a una obra en la colección
window.mostrarObraEnColeccion = function (id) {
    // Activar el filtro de colección
    const coleccionBtn = document.querySelector('.filter-btn[data-filter="coleccion"]');
    if (coleccionBtn) {
        coleccionBtn.click();

        // Esperar a que se renderice y desplazar
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }
};
