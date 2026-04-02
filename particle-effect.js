// ===== PARTICLE DISINTEGRATION EFFECT =====
// Each gallery item gets a canvas that reads the image and breaks it into
// particles that scatter as the element scrolls out of view.

(function initParticleEffect() {
  const PARTICLE_SIZE = 4;       // px per particle grid cell
  const SCATTER_FORCE = 250;     // how far particles fly
  const SCATTER_ROTATION = 2;    // rotation randomness

  function createParticleCanvas(galleryItem) {
    const img = galleryItem.querySelector('img');
    if (!img || !img.complete || !img.naturalWidth) return null;

    const rect = galleryItem.getBoundingClientRect();
    const w = Math.floor(rect.width);
    const h = Math.floor(rect.height);
    if (w === 0 || h === 0) return null;

    // Read pixel data from image
    const offscreen = document.createElement('canvas');
    offscreen.width = w;
    offscreen.height = h;
    const offCtx = offscreen.getContext('2d');
    offCtx.drawImage(img, 0, 0, w, h);

    let imageData;
    try {
      imageData = offCtx.getImageData(0, 0, w, h);
    } catch (e) {
      // CORS — can't read pixels from cross-origin images, use fallback color
      return createFallbackParticles(galleryItem, w, h);
    }

    // Create visible canvas overlay
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.className = 'particle-canvas';
    canvas.style.cssText = `position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:2;opacity:0;`;

    const ctx = canvas.getContext('2d');
    const cols = Math.ceil(w / PARTICLE_SIZE);
    const rows = Math.ceil(h / PARTICLE_SIZE);
    const particles = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * PARTICLE_SIZE;
        const y = row * PARTICLE_SIZE;
        const px = Math.min(x, w - 1);
        const py = Math.min(y, h - 1);
        const idx = (py * w + px) * 4;
        const r = imageData.data[idx];
        const g = imageData.data[idx + 1];
        const b = imageData.data[idx + 2];
        const a = imageData.data[idx + 3];
        if (a < 30) continue;

        // Random scatter direction
        const angle = Math.random() * Math.PI * 2;
        const dist = (0.5 + Math.random()) * SCATTER_FORCE;

        particles.push({
          x, y,
          originX: x,
          originY: y,
          targetX: x + Math.cos(angle) * dist,
          targetY: y + Math.sin(angle) * dist,
          rotation: (Math.random() - 0.5) * SCATTER_ROTATION,
          size: PARTICLE_SIZE * (0.6 + Math.random() * 0.8),
          color: `rgba(${r},${g},${b},${a / 255})`,
          delay: Math.random() * 0.3,
        });
      }
    }

    return { canvas, ctx, particles, w, h };
  }

  function createFallbackParticles(galleryItem, w, h) {
    // For cross-origin images, use the card's background color tones
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.className = 'particle-canvas';
    canvas.style.cssText = `position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:2;opacity:0;`;

    const ctx = canvas.getContext('2d');
    const cols = Math.ceil(w / PARTICLE_SIZE);
    const rows = Math.ceil(h / PARTICLE_SIZE);
    const particles = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * PARTICLE_SIZE;
        const y = row * PARTICLE_SIZE;
        const angle = Math.random() * Math.PI * 2;
        const dist = (0.5 + Math.random()) * SCATTER_FORCE;
        const shade = 25 + Math.random() * 30;

        particles.push({
          x, y,
          originX: x, originY: y,
          targetX: x + Math.cos(angle) * dist,
          targetY: y + Math.sin(angle) * dist,
          rotation: (Math.random() - 0.5) * SCATTER_ROTATION,
          size: PARTICLE_SIZE * (0.6 + Math.random() * 0.8),
          color: `rgba(${shade + 100},${shade + 80},${shade + 50},0.8)`,
          delay: Math.random() * 0.3,
        });
      }
    }

    return { canvas, ctx, particles, w, h };
  }

  function renderParticles(ctx, particles, progress, w, h) {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      const t = Math.max(0, Math.min(1, (progress - p.delay) / (1 - p.delay)));
      const ease = t * t * (3 - 2 * t); // smoothstep

      const cx = p.originX + (p.targetX - p.originX) * ease;
      const cy = p.originY + (p.targetY - p.originY) * ease;
      const alpha = 1 - ease;
      const scale = 1 - ease * 0.5;

      if (alpha <= 0) continue;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx + p.size / 2, cy + p.size / 2);
      ctx.rotate(p.rotation * ease);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size * scale / 2, -p.size * scale / 2, p.size * scale, p.size * scale);
      ctx.restore();
    }
  }

  // ===== SCROLL-DRIVEN ANIMATION =====
  const effectInstances = new Map();

  function initEffectForItem(item) {
    if (effectInstances.has(item)) return;

    const img = item.querySelector('img');
    if (!img) return;

    function setup() {
      const result = createParticleCanvas(item);
      if (!result) return;

      item.appendChild(result.canvas);
      effectInstances.set(item, result);
    }

    if (img.complete && img.naturalWidth) {
      setup();
    } else {
      img.addEventListener('load', setup, { once: true });
    }
  }

  function updateEffects() {
    const viewH = window.innerHeight;

    effectInstances.forEach((effect, item) => {
      const rect = item.getBoundingClientRect();
      const center = rect.top + rect.height / 2;

      // Start dissolving when element center passes 80% of viewport
      // Fully dissolved when center is off-screen (top or bottom)
      let progress = 0;

      if (center < viewH * 0.15) {
        // Scrolling up past top — dissolve
        progress = 1 - (center / (viewH * 0.15));
      } else if (center > viewH * 0.85) {
        // Scrolling down past bottom — dissolve
        progress = (center - viewH * 0.85) / (viewH * 0.15);
      }

      progress = Math.max(0, Math.min(1, progress));

      if (progress > 0) {
        effect.canvas.style.opacity = '1';
        item.querySelector('img').style.opacity = String(1 - progress);
        renderParticles(effect.ctx, effect.particles, progress, effect.w, effect.h);
      } else {
        effect.canvas.style.opacity = '0';
        item.querySelector('img').style.opacity = '1';
      }
    });

    requestAnimationFrame(updateEffects);
  }

  // Observe gallery for new items
  const galleryGrid = document.getElementById('gallery-grid');

  const mo = new MutationObserver(() => {
    document.querySelectorAll('.gallery-item').forEach(initEffectForItem);
  });
  mo.observe(galleryGrid, { childList: true });

  // Init existing items
  document.querySelectorAll('.gallery-item').forEach(initEffectForItem);

  // Start render loop
  requestAnimationFrame(updateEffects);
})();
