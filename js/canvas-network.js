/**
 * Interactive 3D Neural Constellation & Perspective Cyber-Grid
 * Full 3D spatial simulation with pitch/yaw matrix rotation, depth-attenuated
 * synaptic pulses, cursor gravitation, and aesthetic lighting.
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

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const config = {
    nodeCount: window.innerWidth < 768 ? 42 : 72,
    connectionDistance3D: 180,
    fov: 380,
    cameraZ: 420,
    speedMultiplier: prefersReducedMotion ? 0.2 : 0.7,
    primaryColor: { r: 56, g: 189, b: 248 },    // Electric Blue (#38bdf8)
    secondaryColor: { r: 168, g: 85, b: 247 },  // Cyber Violet (#a855f7)
    accentColor: { r: 99, g: 102, b: 241 }      // Indigo (#6366f1)
  };

  // 3D Rotation angles
  let rotX = 0.08;
  let rotY = 0;
  let targetRotX = 0.08;
  let targetRotY = 0;

  // Mouse tracking
  const mouse = {
    x: 0,
    y: 0,
    normX: 0,
    normY: 0,
    isActive: false
  };

  let nodes = [];
  let pulses = [];

  class Node3D {
    constructor() {
      this.reset();
    }

    reset() {
      const radiusRange = 320;
      this.x = (Math.random() - 0.5) * radiusRange * 2;
      this.y = (Math.random() - 0.5) * (radiusRange * 1.3);
      this.z = (Math.random() - 0.5) * radiusRange * 2;
      this.vx = (Math.random() - 0.5) * 0.7 * config.speedMultiplier;
      this.vy = (Math.random() - 0.5) * 0.7 * config.speedMultiplier;
      this.vz = (Math.random() - 0.5) * 0.7 * config.speedMultiplier;
      this.baseRadius = 1.8 + Math.random() * 1.6;
      this.colorType = Math.random() > 0.45 ? 'primary' : (Math.random() > 0.5 ? 'secondary' : 'accent');
      this.glowPhase = Math.random() * Math.PI * 2;

      // Screen projected properties
      this.projX = 0;
      this.projY = 0;
      this.scale = 1;
      this.depth = 1;
      this.visible = true;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.z += this.vz;

      const boundary = 300;
      if (Math.abs(this.x) > boundary) this.vx *= -1;
      if (Math.abs(this.y) > boundary * 0.7) this.vy *= -1;
      if (Math.abs(this.z) > boundary) this.vz *= -1;

      this.glowPhase += 0.025;
    }

    project(centerX, centerY, cosY, sinY, cosX, sinX) {
      // 3D rotation Y
      const x1 = this.x * cosY - this.z * sinY;
      const z1 = this.z * cosY + this.x * sinY;

      // 3D rotation X
      const y2 = this.y * cosX - z1 * sinX;
      const z2 = z1 * cosX + this.y * sinX;

      const depth = z2 + config.cameraZ;
      if (depth <= 20) {
        this.visible = false;
        return;
      }

      this.visible = true;
      this.depth = depth;
      this.scale = config.fov / depth;
      this.projX = centerX + x1 * this.scale;
      this.projY = centerY + y2 * this.scale;
    }

    draw() {
      if (!this.visible) return;

      const color = this.colorType === 'primary' 
        ? config.primaryColor 
        : (this.colorType === 'secondary' ? config.secondaryColor : config.accentColor);

      const alpha = Math.min(Math.max((600 - this.depth) / 450, 0.15), 0.95);
      const radius = Math.max(this.baseRadius * this.scale * (Math.sin(this.glowPhase) * 0.3 + 0.85), 1.0);

      // Outer glow
      ctx.beginPath();
      ctx.arc(this.projX, this.projY, radius * 2.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.18})`;
      ctx.fill();

      // Core node
      ctx.beginPath();
      ctx.arc(this.projX, this.projY, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
      ctx.fill();
    }
  }

  class SynapsePulse3D {
    constructor(nodeA, nodeB) {
      this.a = nodeA;
      this.b = nodeB;
      this.progress = 0;
      this.speed = (0.012 + Math.random() * 0.012);
      this.alive = true;
      this.color = Math.random() > 0.5 ? config.primaryColor : config.secondaryColor;
    }

    update() {
      this.progress += this.speed;
      if (this.progress >= 1) this.alive = false;
    }

    draw() {
      if (!this.alive || !this.a.visible || !this.b.visible) return;

      const curX = this.a.projX + (this.b.projX - this.a.projX) * this.progress;
      const curY = this.a.projY + (this.b.projY - this.a.projY) * this.progress;
      const curScale = this.a.scale + (this.b.scale - this.a.scale) * this.progress;

      const r = Math.max(2.4 * curScale, 1.2);
      ctx.beginPath();
      ctx.arc(curX, curY, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.95)`;
      ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
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
    config.nodeCount = width < 768 ? 40 : 68;
    initNodes();
  }

  function initNodes() {
    nodes = [];
    pulses = [];
    for (let i = 0; i < config.nodeCount; i++) {
      nodes.push(new Node3D());
    }
  }

  function maybeSpawnPulse() {
    if (pulses.length > 7 || Math.random() > 0.06 || nodes.length < 2) return;

    const source = nodes[Math.floor(Math.random() * nodes.length)];
    let closest = null;
    let minDist = config.connectionDistance3D;

    for (let i = 0; i < nodes.length; i++) {
      const target = nodes[i];
      if (target === source) continue;
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const dz = target.z - source.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < minDist) {
        minDist = dist;
        closest = target;
      }
    }

    if (closest) {
      pulses.push(new SynapsePulse3D(source, closest));
    }
  }

  // Draw Subtle Perspective Cyber Floor Grid
  let gridOffset = 0;
  function drawPerspectiveGrid(centerX, centerY) {
    const gridY = centerY + 160;
    const gridDepthStart = 100;
    const gridDepthEnd = 500;
    const gridLines = 14;

    ctx.save();
    gridOffset = (gridOffset + 0.4) % 30;

    // Longitudinal perspective rays
    for (let i = -gridLines; i <= gridLines; i++) {
      const worldX = i * 40;
      const nearScale = config.fov / gridDepthStart;
      const farScale = config.fov / gridDepthEnd;

      const xNear = centerX + worldX * nearScale;
      const yNear = gridY + 60 * nearScale;
      const xFar = centerX + worldX * farScale;
      const yFar = gridY - 20 * farScale;

      ctx.beginPath();
      ctx.moveTo(xNear, yNear);
      ctx.lineTo(xFar, yFar);
      ctx.strokeStyle = `rgba(56, 189, 248, 0.04)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();
  }

  function render() {
    if (!isVisible) {
      animationFrameId = requestAnimationFrame(render);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const centerX = width * 0.5;
    const centerY = height * 0.5;

    // Smooth continuous rotation + mouse interaction
    rotY += 0.0016;
    if (mouse.isActive) {
      targetRotX = 0.08 + mouse.normY * 0.25;
      targetRotY = mouse.normX * 0.4;
    } else {
      targetRotX = 0.08;
      targetRotY = 0;
    }

    rotX += (targetRotX - rotX) * 0.04;
    const effectiveRotY = rotY + targetRotY;

    const cosY = Math.cos(effectiveRotY);
    const sinY = Math.sin(effectiveRotY);
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);

    // Subtle 3D background grid
    drawPerspectiveGrid(centerX, centerY);

    // Update & project all nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].project(centerX, centerY, cosY, sinY, cosX, sinX);
    }

    // Sort nodes by depth for correct 3D spatial rendering
    nodes.sort((a, b) => b.depth - a.depth);

    // Draw 3D connection lines
    const connDist = config.connectionDistance3D;
    for (let i = 0; i < nodes.length; i++) {
      const n1 = nodes[i];
      if (!n1.visible) continue;

      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        if (!n2.visible) continue;

        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dz = n1.z - n2.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connDist) {
          const depthAlpha = Math.min(Math.max((600 - (n1.depth + n2.depth) / 2) / 450, 0.08), 0.7);
          const alpha = (1 - dist / connDist) * depthAlpha * 0.35;
          ctx.beginPath();
          ctx.moveTo(n1.projX, n1.projY);
          ctx.lineTo(n2.projX, n2.projY);
          ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
          ctx.lineWidth = Math.max(0.6 * ((n1.scale + n2.scale) * 0.5), 0.4);
          ctx.stroke();
        }
      }
    }

    // Pulses
    maybeSpawnPulse();
    for (let i = pulses.length - 1; i >= 0; i--) {
      pulses[i].update();
      pulses[i].draw();
      if (!pulses[i].alive) {
        pulses.splice(i, 1);
      }
    }

    // Nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].draw();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  // Event Listeners
  window.addEventListener('resize', resize, { passive: true });

  const heroSection = document.getElementById('hero') || canvas.parentElement;
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.normX = (mouse.x / rect.width) * 2 - 1;
      mouse.normY = (mouse.y / rect.height) * 2 - 1;
      mouse.isActive = true;
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      mouse.isActive = false;
      mouse.normX = 0;
      mouse.normY = 0;
    });

    heroSection.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = heroSection.getBoundingClientRect();
        mouse.normX = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
        mouse.normY = ((e.touches[0].clientY - rect.top) / rect.height) * 2 - 1;
        mouse.isActive = true;
      }
    }, { passive: true });

    heroSection.addEventListener('touchend', () => {
      mouse.isActive = false;
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(canvas);
  }

  window.updateCanvasColors = function (primary, secondary) {
    if (primary) config.primaryColor = primary;
    if (secondary) config.secondaryColor = secondary;
  };

  resize();
  render();
})();