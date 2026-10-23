/* ═══════════════════════════════════════════════════════
   BAMBAL INFRASTRUCTURE — Subpages Client Scripts
   Smart Navigation, Image Lightbox, Thumbnail Switcher, Filters
   ═══════════════════════════════════════════════════════ */

// ── Smart Go-Back Navigation ──
function goBack(fallbackUrl) {
  // If user came from the same site, go back in history to keep exact scroll position
  if (window.history.length > 1 && document.referrer && document.referrer.indexOf(window.location.host) !== -1) {
    window.history.back();
  } else {
    window.location.href = fallbackUrl || '../index.html';
  }
}

// ── Universal Lightbox System ──
let lightboxImages = [];
let currentLightboxIndex = 0;

function initLightbox() {
  const lightbox = document.getElementById('subpage-lightbox');
  if (!lightbox) return;

  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  // Collect all zoomable images on page
  const zoomable = document.querySelectorAll('[data-zoom]');
  lightboxImages = Array.from(zoomable).map(el => ({
    src: el.getAttribute('data-zoom') || el.getAttribute('src'),
    caption: el.getAttribute('data-caption') || el.getAttribute('alt') || ''
  }));

  function updateLightbox(index) {
    if (!lightboxImages.length) return;
    currentLightboxIndex = (index + lightboxImages.length) % lightboxImages.length;
    const item = lightboxImages[currentLightboxIndex];
    if (lightboxImg) lightboxImg.src = item.src;
    if (lightboxCaption) lightboxCaption.textContent = item.caption;
  }

  function openLightbox(src, caption) {
    const foundIndex = lightboxImages.findIndex(img => img.src === src);
    if (foundIndex !== -1) {
      updateLightbox(foundIndex);
    } else {
      if (lightboxImg) lightboxImg.src = src;
      if (lightboxCaption) lightboxCaption.textContent = caption || '';
    }
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Attach click to all trigger elements
  zoomable.forEach((el, idx) => {
    el.addEventListener('click', () => {
      const src = el.getAttribute('data-zoom') || el.getAttribute('src');
      const caption = el.getAttribute('data-caption') || el.getAttribute('alt');
      openLightbox(src, caption);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); updateLightbox(currentLightboxIndex - 1); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); updateLightbox(currentLightboxIndex + 1); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLightbox(currentLightboxIndex - 1);
    if (e.key === 'ArrowRight') updateLightbox(currentLightboxIndex + 1);
  });
}

// ── Thumbnail Gallery Switcher ──
function initGallerySwitcher() {
  const mainImg = document.getElementById('gallery-main-img');
  const mainCaption = document.getElementById('gallery-main-caption');
  const thumbs = document.querySelectorAll('.gallery-thumb-item');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      const fullSrc = thumb.getAttribute('data-full-src');
      const caption = thumb.getAttribute('data-caption');

      if (mainImg && fullSrc) {
        mainImg.style.opacity = '0.4';
        setTimeout(() => {
          mainImg.src = fullSrc;
          mainImg.setAttribute('data-zoom', fullSrc);
          mainImg.setAttribute('data-caption', caption || '');
          mainImg.style.opacity = '1';
        }, 150);
      }

      if (mainCaption && caption) {
        mainCaption.textContent = caption;
      }
    });
  });
}

// ── Interactive Catalog Filter (for projects.html) ──
function initProjectFilters() {
  const pills = document.querySelectorAll('.filter-pill[data-filter]');
  const cards = document.querySelectorAll('.filterable-card');

  if (!pills.length || !cards.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-filter');

      cards.forEach(card => {
        const status = card.getAttribute('data-status') || '';
        const loc = card.getAttribute('data-location') || '';

        if (filterVal === 'all' || status.includes(filterVal) || loc.includes(filterVal)) {
          card.style.display = '';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.3s ease';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initLightbox();
  initGallerySwitcher();
  initProjectFilters();
});
