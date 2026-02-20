class InteractiveGlassMaterial {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        this.program = null;
        this.resizeTimeout = null;
        this.mousePosition = [0.5, 0.5]; // Posición central por defecto
        this.touchPositions = []; // Para manejar múltiples toques
        this.scrollPosition = 0;
        this.vertexShaderSource = null;
        this.fragmentShaderSource = null;

        // Cargar shaders
        this.loadShaders().then(() => {
            this.init();
        }).catch(error => {
            console.error('Error al cargar los shaders:', error);
        });
    }

    async loadShaders() {
        try {
            const [vertResponse, fragResponse] = await Promise.all([
                fetch('shaders/glass.vert'),
                fetch('shaders/glass.frag')
            ]);
            
            if (!vertResponse.ok || !fragResponse.ok) {
                throw new Error('Error al cargar los shaders');
            }
            
            this.vertexShaderSource = await vertResponse.text();
            this.fragmentShaderSource = await fragResponse.text();
        } catch (error) {
            console.error('Error al cargar los shaders:', error);
            throw error;
        }
    }

    init() {
        // Configurar el canvas
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1000';
        this.canvas.style.pointerEvents = 'none'; // Permite hacer clic a través del canvas
        document.body.appendChild(this.canvas);

        // Manejar redimensionamiento
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => this.onWindowResize(), 200);
        });

        // Manejar movimiento del ratón
        document.addEventListener('mousemove', (e) => {
            this.mousePosition[0] = e.clientX / window.innerWidth;
            this.mousePosition[1] = 1.0 - (e.clientY / window.innerHeight);
        });

        // Manejar toques en pantalla táctil con opción passive
        document.addEventListener('touchstart', (e) => this.handleTouch(e), { passive: true });
        document.addEventListener('touchmove', (e) => this.handleTouch(e), { passive: true });
        document.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

        // Manejar scroll
        window.addEventListener('scroll', () => {
            this.scrollPosition = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        });

        // Inicializar
        this.handleResize();
        this.onWindowResize();
        this.initShaders();
        this.initBuffers();
        this.render();
    }

    handleTouch(e) {
        if (e.touches.length > 0) {
            // Usar el primer toque para la interacción principal
            const touch = e.touches[0];
            this.mousePosition[0] = touch.clientX / window.innerWidth;
            this.mousePosition[1] = 1.0 - (touch.clientY / window.innerHeight);

            // Actualizar posiciones de toques múltiples
            this.touchPositions = [];
            for (let i = 0; i < Math.min(e.touches.length, 5); i++) {
                const t = e.touches[i];
                this.touchPositions.push({
                    x: t.clientX / window.innerWidth,
                    y: 1.0 - (t.clientY / window.innerHeight)
                });
            }
        }
    }

    handleTouchEnd() {
        // Restablecer a la posición central cuando se levanta el dedo
        this.mousePosition = [0.5, 0.5];
        this.touchPositions = [];
    }

    onWindowResize() {
        this.handleResize();
    }

    handleResize() {
        // Ajustar el tamaño del canvas al tamaño de la ventana
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.canvas.width = width * window.devicePixelRatio;
        this.canvas.height = height * window.devicePixelRatio;
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';

        // Actualizar el viewport de WebGL
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        // Actualizar uniformes si el programa ya está compilado
        if (this.program) {
            const resolutionLocation = this.gl.getUniformLocation(this.program, 'resolution');
            this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);
        }
    }

    initShaders() {
        if (!this.vertexShaderSource || !this.fragmentShaderSource) {
            console.error('Los shaders no se han cargado correctamente');
            return;
        }

        // Compilar shaders
        const vertexShader = this.compileShader(this.gl.VERTEX_SHADER, this.vertexShaderSource);
        const fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, this.fragmentShaderSource);

        // Crear y enlazar programa
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);

        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            console.error('Error al inicializar el programa shader:', this.gl.getProgramInfoLog(this.program));
            return;
        }

        this.gl.useProgram(this.program);
    }

    compileShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Error al compilar shader:', this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    initBuffers() {
        // Crear un buffer con las coordenadas de un cuadrado que cubra toda la pantalla
        const positions = [
            -1.0, -1.0,
            1.0, -1.0,
            -1.0, 1.0,
            1.0, 1.0,
        ];

        const positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

        // Obtener la ubicación del atributo de posición
        const positionAttributeLocation = this.gl.getAttribLocation(this.program, 'a_position');
        this.gl.enableVertexAttribArray(positionAttributeLocation);
        this.gl.vertexAttribPointer(positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);

        // Configurar uniformes
        const resolutionLocation = this.gl.getUniformLocation(this.program, 'resolution');
        this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);
    }

    render(time = 0) {
        if (!this.program) {
            requestAnimationFrame((t) => this.render(t));
            return;
        }

        // Actualizar uniformes
        const timeLocation = this.gl.getUniformLocation(this.program, 'time');
        const mouseLocation = this.gl.getUniformLocation(this.program, 'u_mouse');
        const scrollLocation = this.gl.getUniformLocation(this.program, 'u_scroll');

        this.gl.uniform1f(timeLocation, time * 0.001);
        this.gl.uniform2f(mouseLocation, this.mousePosition[0], this.mousePosition[1]);
        this.gl.uniform1f(scrollLocation, this.scrollPosition);

        // Limpiar y dibujar
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

        // Siguiente frame
        requestAnimationFrame((t) => this.render(t));
    }
}

// Inicializar el shader cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    const shader = new InteractiveGlassMaterial();
});
