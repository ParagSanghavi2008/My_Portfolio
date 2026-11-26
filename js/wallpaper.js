const vertexShader = `
  attribute vec2 position;
  varying vec2 vUv;

  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;

  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uTime;
  uniform float uScroll;
  uniform float uQuality;
  uniform vec3 uBase;
  uniform vec3 uShadow;
  uniform vec3 uAccent;
  uniform vec3 uHighlight;

  float random(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
      mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float field(vec2 p) {
    float value = 0.0;
    float weight = 0.55;
    for (int i = 0; i < 4; i++) {
      if (uQuality < 0.5 && i > 1) break;
      value += noise(p) * weight;
      p = p * 2.02 + 17.13;
      weight *= 0.48;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    p += (uPointer - 0.5) * 0.06;
    p.y += uScroll * 0.22;
    float time = uTime * 0.018;
    float flow = field(p * 2.2 + vec2(time, -time * 0.7));
    float wave = sin((uv.y * 5.2 + flow * 1.8 + uScroll * 0.45) * 3.14159);
    float band = smoothstep(0.2, 0.95, wave * 0.5 + 0.5);
    float haze = smoothstep(0.32, 0.82, field(p * 1.35 - vec2(time * 0.6, time)));
    float section = clamp(uScroll * 2.0, 0.0, 1.0);
    vec3 palette = mix(uShadow, uAccent, smoothstep(0.12, 0.82, section));
    palette = mix(palette, uHighlight, smoothstep(0.62, 1.0, section) * 0.42);
    float light = clamp(band * 0.11 + haze * 0.07, 0.0, 0.18);
    float vignette = 1.0 - smoothstep(0.22, 1.18, length((uv - 0.5) * vec2(aspect, 1.0)));
    vec3 color = mix(uBase, palette, light * (0.65 + vignette * 0.35));
    gl_FragColor = vec4(color, 1.0);
  }
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Unable to allocate a WebGL shader.');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || 'Unknown shader compilation error.';
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

function createProgram(gl) {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
  let fragment;
  try {
    fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
  } catch (error) {
    gl.deleteShader(vertex);
    throw error;
  }
  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    throw new Error('Unable to allocate a WebGL program.');
  }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) || 'Unknown program link error.';
    gl.deleteProgram(program);
    throw new Error(message);
  }
  return program;
}

function readColor(styles, property) {
  const value = styles.getPropertyValue(property).trim();
  const match = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!match) throw new Error(`Wallpaper palette token ${property} must be a hex color.`);
  const hex = match[1].length === 3
    ? match[1].split('').map(character => character + character).join('')
    : match[1];
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255
  ];
}

export function initWallpaper(config) {
  const host = document.querySelector('.aurora-bg');
  const lowPower = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2)
    || (navigator.deviceMemory && navigator.deviceMemory <= 2);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!host || lowPower || reducedMotion) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'aurora-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    powerPreference: 'low-power'
  });
  if (!gl) return;

  let program;
  try {
    program = createProgram(gl);
  } catch (error) {
    console.warn('Ambient wallpaper shader could not be initialized; using the CSS background.', error);
    return;
  }

  const position = gl.getAttribLocation(program, 'position');
  const buffer = gl.createBuffer();
  if (!buffer || position < 0) {
    console.warn('Ambient wallpaper could not allocate its full-screen geometry.');
    gl.deleteProgram(program);
    return;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1, 1, -1, -1, 1,
    -1, 1, 1, -1, 1, 1
  ]), gl.STATIC_DRAW);
  gl.useProgram(program);
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const palette = config.palette;
  const uniforms = {
    resolution: gl.getUniformLocation(program, 'uResolution'),
    pointer: gl.getUniformLocation(program, 'uPointer'),
    time: gl.getUniformLocation(program, 'uTime'),
    scroll: gl.getUniformLocation(program, 'uScroll'),
    quality: gl.getUniformLocation(program, 'uQuality'),
    base: gl.getUniformLocation(program, 'uBase'),
    shadow: gl.getUniformLocation(program, 'uShadow'),
    accent: gl.getUniformLocation(program, 'uAccent'),
    highlight: gl.getUniformLocation(program, 'uHighlight')
  };

  function updatePalette() {
    const paletteStyles = getComputedStyle(document.documentElement);
    gl.uniform3fv(uniforms.base, readColor(paletteStyles, palette.base));
    gl.uniform3fv(uniforms.shadow, readColor(paletteStyles, palette.shadow));
    gl.uniform3fv(uniforms.accent, readColor(paletteStyles, palette.accent));
    gl.uniform3fv(uniforms.highlight, readColor(paletteStyles, palette.highlight));
  }

  updatePalette();
  gl.uniform1f(uniforms.quality, window.matchMedia('(max-width: 700px)').matches ? 0 : 1);
  host.prepend(canvas);
  host.classList.add('webgl-active');

  let pointerX = 0.5;
  let pointerY = 0.5;
  let scrollProgress = 0;
  let frame = 0;
  let inView = true;
  let visible = !document.hidden;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

  function resize() {
    const width = Math.max(1, Math.floor(host.clientWidth * pixelRatio));
    const height = Math.max(1, Math.floor(host.clientHeight * pixelRatio));
    if (canvas.width === width && canvas.height === height) return;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
    gl.uniform2f(uniforms.resolution, width, height);
  }

  function updateScroll() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = scrollable > 0 ? window.scrollY / scrollable : 0;
  }

  function render(time) {
    frame = 0;
    if (!inView || !visible) return;
    gl.uniform1f(uniforms.time, time * 0.001);
    gl.uniform1f(uniforms.scroll, scrollProgress);
    gl.uniform2f(uniforms.pointer, pointerX, pointerY);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    frame = window.requestAnimationFrame(render);
  }

  function syncRenderState() {
    if (inView && visible && !frame) frame = window.requestAnimationFrame(render);
    if ((!inView || !visible) && frame) {
      window.cancelAnimationFrame(frame);
      frame = 0;
    }
  }

  const observer = new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    syncRenderState();
  });
  observer.observe(host);
  const accentObserver = new MutationObserver(updatePalette);
  accentObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-accent'] });
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('pointermove', event => {
    pointerX = event.clientX / Math.max(window.innerWidth, 1);
    pointerY = 1 - event.clientY / Math.max(window.innerHeight, 1);
  }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    visible = !document.hidden;
    syncRenderState();
  });

  resize();
  updateScroll();
  syncRenderState();
}
