precision highp float;

uniform float time;
uniform float u_scroll;
uniform vec2 u_mouse;
uniform vec2 resolution;

varying vec2 vUv;

// --- 2D Simplex Noise by Ashima Arts ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626, // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main() {
    vec2 uv = vUv;
    
    // Interacción con el ratón/toque
    vec2 mouseVec = (uv - u_mouse) * vec2(1.0, 0.6); // Ajuste de aspecto para 1280x720
    float mouseDist = length(mouseVec);
    
    // Añadir ruido para hacer la mancha más orgánica
    float noise = snoise(uv * 5.0 + time * 1.0) * 0.2 + 0.9;
    float distortedDist = mouseDist * noise;
    
    // Suavizar el movimiento en dispositivos táctiles
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    float touchSmoothness = 0.1;
    #else
    float touchSmoothness = 0.2;
    #endif
    
    // Aplicar suavizado al movimiento
    mouseDist = mix(mouseDist, distortedDist, touchSmoothness);
    
    // Crear una mancha más pequeña y orgánica
    float lensEffect = smoothstep(0.12, 0.0, distortedDist) * 
                      smoothstep(0.25, 0.12, mouseDist) * 1.2;
    
    // Interacción con el Scroll y Tiempo
    float scroll_offset = u_scroll * 0.5;
    
    // Ajustar la sensibilidad en dispositivos táctiles
    float touchSensitivity = 1.0;
    #ifdef GL_ES
    touchSensitivity = 1.5; // Mayor sensibilidad en móviles
    #endif
    
    // Aplicar la sensibilidad
    mouseDist *= touchSensitivity;
    
    // Combinar ruido de diferentes frecuencias
    float noise_slow = snoise(uv * 2.0 + time * 0.1 - scroll_offset);
    float noise_fast = snoise(uv * 5.0 + time * 0.5 + scroll_offset);
    
    // Distorsión total
    float distortion = (noise_slow * 0.7 + noise_fast * 0.3) * 0.05 + (lensEffect * 0.2);
    
    // Mapeo de Relieve (Bump Mapping)
    vec2 offset = vec2(0.002, 0.0);
    float h_x = snoise((uv + offset.xy) * 3.0 + scroll_offset) - snoise((uv - offset.xy) * 3.0 + scroll_offset);
    float h_y = snoise((uv + offset.yx) * 3.0 + scroll_offset) - snoise((uv - offset.yx) * 3.0 + scroll_offset);
    vec3 normal = normalize(vec3(-h_x, -h_y, 1.0));
    
    // Simulación de luz para crear reflejos
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    float lighting = dot(normal, lightDir) * 0.5 + 0.5;
    lighting = pow(lighting, 4.0);

    // Aberración Cromática
    vec2 R_offset = vec2(distortion * (1.0 + lensEffect * 2.0));
    vec2 B_offset = vec2(-distortion * (1.0 + lensEffect * 2.0));
    
    // Generar colores basados en el ruido
    float r = lighting * 0.7 + snoise(uv * 2.0 + R_offset + scroll_offset) * 0.3;
    float g = lighting * 0.5 + snoise(uv * 2.0 + scroll_offset) * 0.1;
    float b = lighting * 0.9 + snoise(uv * 2.0 + B_offset + scroll_offset) * 0.5;

    // Color final en blanco y negro
    float intensity = (r + g + b) / 3.0;  // Convertir a escala de grises
    vec3 baseColor = vec3(intensity);
    
    // Ajustar el contraste
    float contrast = 1.2;
    intensity = (intensity - 0.5) * contrast + 0.5;
    
    // Aplicar un tono ligeramente frío al blanco y negro
    vec3 finalColor = mix(
        vec3(intensity * 0.9, intensity * 0.95, intensity),  // Blanco ligeramente azulado
        vec3(intensity * 0.8, intensity * 0.8, intensity * 0.9),  // Gris azulado
        smoothstep(0.3, 0.7, intensity)
    );
    
    // Resaltar con blanco puro en las zonas más iluminadas
    finalColor = mix(finalColor, vec3(1.0), pow(lighting, 4.0) * 0.5);
    
    // Efecto de viñeta
    float vignette = smoothstep(1.0, 0.2, length(uv - 0.5));
    
    gl_FragColor = vec4(finalColor * vignette, 1.0);
}
