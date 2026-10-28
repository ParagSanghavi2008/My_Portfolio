/**
 * Interactive Neural Synapse & Constellation Network
 * Abstract AI-inspired canvas visualization with gentle physics,
 * synaptic pulse propagation, cursor reactivity, and performance optimizations.
 */

(function () {
  'use strict';

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;
  let animationFrameId = null;
  let isVisible = true;

  // Configuration options
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const config = {
    nodeCount: window.innerWidth < 768 ? 32 : 58,
    connectionDistance: window.innerWidth < 768 ? 110 : 160,
    cursorDistance: 170,
    nodeBaseRadius: 2.2,
    pulseSpeed: 1.4,
    speedMultiplier: prefersReducedMotion ? 0.2 : 0.65,
    primaryColor: { r: 56, g: 189, b: 248 },    // Electric Blue (#38bdf8)
    secondaryColor: { r: 168, g: 85, b: 247 },  // Cyber Violet (#a855f7)
    accentColor: { r: 99, g: 102, b: 241 }      // Indigo (#6366f1)
  };

  // Mouse tracking
  const mouse = {
    x: -9999,
    y: -9999,
    isActive: false,
    radius: config.cursorDistance
  };

  // Nodes & Synaptic Pulses
  let nodes = [];
  let pulses = [];

  class Node {
    constructor(x, y) {
      this.x = x ?? Math.random() * width;
      this.y = y ?? Math.random() * height;
      this.vx = (Math.random() - 0.5) * config.speedMultiplier;
      this.vy = (Math.random() - 0.5) * config.speedMultiplier;
      this.radius = config.nodeBaseRadius + Math.random() * 1.5;
      this.colorType = Math.random() > 0.4 ? 'primary' : (Math.random() > 0.5 ? 'secondary' : 'accent');
      this.glowPhase = Math.random() * Math.PI * 2;
    }

    update() {
      // Base movement
      this.x += this.vx;
      this.y += this.vy;

      // Gentle boundary bounce
      if (this.x < 0) { this.x = 0; this.vx *= -1; }
      else if (this.x > width) { this.x = width; this.vx *= -1; }

      if (this.y < 0) { this.y = 0; this.vy *= -1; }
      else if (this.y > height) { this.y = height; this.vy *= -1; }

      // Mouse interactivity (gentle gravitational pull with soft bounce)
      if (mouse.isActive) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 1) {
          const force = (1 - dist / mouse.radius) * 0.45;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }
      }

      this.glowPhase += 0.02;
    }

    draw() {
      const color = this.colorType === 'primary' 
        ? config.primaryColor 
        : (this.colorType === 'secondary' ? config.secondaryColor : config.accentColor);

      const breathing = Math.sin(this.glowPhase) * 0.4 + 0.8;
      const currentRadius = this.radius * breathing;

      // Glow halo
      ctx.beginPath();
      ctx.arc(this.x, this.y, currentRadius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.12)`;
      ctx.fill();

      // Core node
      ctx.beginPath();
      ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.85)`;
      ctx.fill();
    }
  }

  class SynapsePulse {
    constructor(startNode, endNode) {
      this.start = startNode;
      this.end = endNode;
      this.progress = 0;
      this.speed = (0.008 + Math.random() * 0.008) * config.pulseSpeed;
      this.color = Math.random() > 0.5 ? config.primaryColor : config.secondaryColor;
      this.alive = true;
    }

    update() {
      this.progress += this.speed;
      if (this.progress >= 1) {
        this.alive = false;
      }
    }

    draw() {
      if (!this.alive) return;
      const currentX = this.start.x + (this.end.x - this.start.x) * this.progress;
      const currentY = this.start.y + (this.end.y - this.start.y) * this.progress;

      ctx.beginPath();
      ctx.arc(currentX, currentY, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.95)`;
      ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset
    }
  }

  function resize() {
    const parent = canvas.parentElement;
    width = parent ? parent.clientWidth : window.innerWidth;
    height = parent ? parent.clientHeight : window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);

    // Adjust node count on resize
    config.nodeCount = width < 768 ? 32 : 56;
    initNodes();
  }

  function initNodes() {
    nodes = [];
    pulses = [];
    for (let i = 0; i < config.nodeCount; i++) {
      nodes.push(new Node(Math.random() * width, Math.random() * height));
    }
  }

  function maybeSpawnPulse() {
    if (pulses.length > 6 || Math.random() > 0.04) return;
    if (nodes.length < 2) return;

    const source = nodes[Math.floor(Math.random() * nodes.length)];
    // Find closest connected node
    let closest = null;
    let minDistance = config.connectionDistance;

    for (let i = 0; i < nodes.length; i++) {
      const target = nodes[i];
      if (target === source) continue;
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDistance) {
        minDistance = dist;
        closest = target;
      }
    }

    if (closest) {
      pulses.push(new SynapsePulse(source, closest));
    }
  }

  function render() {
    if (!isVisible) {
      animationFrameId = requestAnimationFrame(render);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // Draw synaptic connection web
    const connDist = config.connectionDistance;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connDist) {
          const alpha = (1 - dist / connDist) * 0.28;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
    }

    // Connect nodes to mouse cursor if within range
    if (mouse.isActive) {
      for (let i = 0; i < nodes.length; i++) {
        const dx = mouse.x - nodes[i].x;
        const dy = mouse.y - nodes[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.55;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    // Update & draw pulses
    maybeSpawnPulse();
    for (let i = pulses.length - 1; i >= 0; i--) {
      pulses[i].update();
      pulses[i].draw();
      if (!pulses[i].alive) {
        pulses.splice(i, 1);
      }
    }

    // Update & draw nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  // Event Listeners
  window.addEventListener('resize', () => {
    resize();
  }, { passive: true });

  const heroSection = document.getElementById('hero') || canvas.parentElement;
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isActive = true;
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      mouse.isActive = false;
      mouse.x = -9999;
      mouse.y = -9999;
    });

    heroSection.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
        mouse.isActive = true;
      }
    }, { passive: true });

    heroSection.addEventListener('touchend', () => {
      mouse.isActive = false;
    });
  }

  // Visibility optimization: Pause render loop when scrolled out of view
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(canvas);
  }

  // Expose theme color updates if accent theme changes
  window.updateCanvasColors = function (primary, secondary) {
    if (primary) config.primaryColor = primary;
    if (secondary) config.secondaryColor = secondary;
  };

  // Initial setup
  resize();
  render();
})();
