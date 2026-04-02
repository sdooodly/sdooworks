// ===== THREE.JS BACKGROUND =====
(function initThreeBackground() {
  const canvas = document.getElementById('bg-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 30;

  // Floating paint particles
  const particleCount = 120;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  const palette = [
    [0.79, 0.66, 0.43],  // gold
    [0.55, 0.45, 0.35],  // warm brown
    [0.35, 0.30, 0.28],  // dark umber
    [0.65, 0.55, 0.45],  // sienna
    [0.45, 0.40, 0.38],  // grey-brown
  ];

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

    const color = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3] = color[0];
    colors[i * 3 + 1] = color[1];
    colors[i * 3 + 2] = color[2];

    sizes[i] = Math.random() * 3 + 1;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Subtle connecting lines
  const lineGeo = new THREE.BufferGeometry();
  const linePositions = new Float32Array(50 * 6);
  for (let i = 0; i < 50; i++) {
    const idx = i * 6;
    linePositions[idx] = (Math.random() - 0.5) * 50;
    linePositions[idx + 1] = (Math.random() - 0.5) * 50;
    linePositions[idx + 2] = (Math.random() - 0.5) * 30;
    linePositions[idx + 3] = linePositions[idx] + (Math.random() - 0.5) * 8;
    linePositions[idx + 4] = linePositions[idx + 1] + (Math.random() - 0.5) * 8;
    linePositions[idx + 5] = linePositions[idx + 2] + (Math.random() - 0.5) * 4;
  }
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  const lineMat = new THREE.LineBasicMaterial({ color: 0xc9a96e, transparent: true, opacity: 0.06 });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.0001;
    lines.rotation.y += 0.0002;

    camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();


// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !expanded);
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== GALLERY =====
const galleryGrid = document.getElementById('gallery-grid');
let currentFilter = 'all';

function renderGallery(filter) {
  galleryGrid.innerHTML = '';
  const filtered = filter === 'all' ? paintings : paintings.filter(p => p.filter === filter);

  filtered.forEach((painting, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `View ${painting.title}`);
    item.innerHTML = `
      <img src="${painting.src}" alt="${painting.title} — ${painting.medium}" loading="lazy"
        onerror="this.style.display='none'" />
      <div class="overlay">
        <h3>${painting.title}</h3>
        <p>${painting.medium} · ${painting.date}</p>
      </div>
    `;

    item.addEventListener('click', () => openLightbox(paintings.indexOf(painting)));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(paintings.indexOf(painting));
      }
    });

    galleryGrid.appendChild(item);

    // Staggered reveal
    setTimeout(() => item.classList.add('visible'), 80 * index);
  });
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderGallery(currentFilter);
  });
});

renderGallery('all');

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxMedium = document.getElementById('lightbox-medium');
const lightboxSize = document.getElementById('lightbox-size');
const lightboxDate = document.getElementById('lightbox-date');
const lightboxDesc = document.getElementById('lightbox-desc');
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const p = paintings[currentIndex];
  lightboxImg.src = p.src;
  lightboxImg.alt = p.title;
  lightboxTitle.textContent = p.title;
  lightboxMedium.textContent = p.medium;
  lightboxSize.textContent = p.size;
  lightboxDate.textContent = p.date;
  lightboxDesc.textContent = p.description;
}

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + paintings.length) % paintings.length;
  updateLightbox();
});
document.querySelector('.lightbox-next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % paintings.length;
  updateLightbox();
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + paintings.length) % paintings.length;
    updateLightbox();
  }
  if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % paintings.length;
    updateLightbox();
  }
});


// ===== CONTACT FORM → GOOGLE SHEETS =====
// HOW TO GET YOUR ENTRY IDS:
// 1. Open your Google Form in Chrome
// 2. Right-click on the "Name" field → Inspect
// 3. Find the <input> or <textarea> with name="entry.XXXXXXX"
// 4. Replace the values below with your actual entry IDs
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSdUzyzBa7JdCKccyH2joy7cLqOfV5ZdDQ0g8ZxfVnhojLv0Dg/formResponse';
const ENTRY_NAME = 'entry.826355120';
const ENTRY_WHATSAPP = 'entry.1912639863';
const ENTRY_DETAILS = 'entry.511796578';

document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('form-status');
  const btn = form.querySelector('.submit-btn');

  const name = form.querySelector('#cf-name').value.trim();
  const whatsapp = form.querySelector('#cf-whatsapp').value.trim();
  const details = form.querySelector('#cf-details').value.trim();

  if (!name || !whatsapp) {
    status.textContent = 'Please fill in the required fields.';
    status.className = 'form-status error';
    return;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  const formData = new URLSearchParams();
  formData.append(ENTRY_NAME, name);
  formData.append(ENTRY_WHATSAPP, whatsapp);
  formData.append(ENTRY_DETAILS, details);

  // Submit via hidden iframe to avoid CORS issues
  const tempForm = document.createElement('form');
  tempForm.method = 'POST';
  tempForm.action = GOOGLE_FORM_ACTION;
  tempForm.target = 'hidden-form-iframe';
  tempForm.style.display = 'none';

  [[ENTRY_NAME, name], [ENTRY_WHATSAPP, whatsapp], [ENTRY_DETAILS, details]].forEach(([key, val]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = val;
    tempForm.appendChild(input);
  });

  document.body.appendChild(tempForm);
  tempForm.submit();
  document.body.removeChild(tempForm);

  // Google doesn't send back a response we can read, so we assume success after a short delay
  setTimeout(() => {
    status.textContent = 'Message sent — thank you!';
    status.className = 'form-status success';
    btn.textContent = 'Send Message';
    btn.disabled = false;
    form.reset();
    setTimeout(() => { status.textContent = ''; }, 4000);
  }, 1500);
});

// ===== SCROLL REVEAL =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe gallery items on scroll (for items loaded after filter change)
const mutationObserver = new MutationObserver(() => {
  document.querySelectorAll('.gallery-item:not(.visible)').forEach(item => {
    observer.observe(item);
  });
});
mutationObserver.observe(galleryGrid, { childList: true });
