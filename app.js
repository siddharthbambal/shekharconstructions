/* ═══════════════════════════════════════════════════════
   SHEKHAR CONSTRUCTIONS — JavaScript
   Hero Slideshow, Scroll Animations, Enquiry Form
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Preloader ──
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      initScrollReveal();
    }, 1200);
  });

  // Prevent scroll while loading
  document.body.style.overflow = 'hidden';

  // ══════════════════════════════════════════
  // HERO SLIDESHOW
  // ══════════════════════════════════════════
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.hero-indicator');
  const heroTitles = [
    'Building<br /><em>Timeless</em> Spaces',
    'Where <em>Luxury</em><br />Meets Living',
    'Crafting <em>Dreams</em><br />Into Reality'
  ];
  const heroSubtitles = [
    'Where architectural excellence meets uncompromising quality. Discover residences designed for those who demand the extraordinary.',
    'Every home we build is a masterpiece — blending contemporary aesthetics with enduring comfort.',
    'From concept to key handover, we transform your vision into architectural marvels that stand the test of time.'
  ];

  let currentSlide = 0;
  let slideInterval;
  const SLIDE_DURATION = 5000;

  function goToSlide(index) {
    // Remove active from all
    slides.forEach(s => s.classList.remove('active'));
    indicators.forEach(i => i.classList.remove('active'));

    // Reset indicator animation
    indicators.forEach(i => {
      const after = i.querySelector('::after');
      i.style.animation = 'none';
      void i.offsetHeight; // force reflow
      i.style.animation = '';
    });

    currentSlide = index;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');

    // Update hero text with smooth transition
    const titleEl = document.getElementById('hero-title');
    const subtitleEl = document.getElementById('hero-subtitle');

    titleEl.style.opacity = '0';
    titleEl.style.transform = 'translateY(20px)';
    subtitleEl.style.opacity = '0';
    subtitleEl.style.transform = 'translateY(20px)';

    setTimeout(() => {
      titleEl.innerHTML = heroTitles[currentSlide];
      subtitleEl.textContent = heroSubtitles[currentSlide];
      titleEl.style.opacity = '1';
      titleEl.style.transform = 'translateY(0)';
      subtitleEl.style.opacity = '1';
      subtitleEl.style.transform = 'translateY(0)';
    }, 300);
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function startSlideshow() {
    if (slides.length < 2) return;
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, SLIDE_DURATION);
  }

  // Add transition styles to hero text
  const heroTitle = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroTitle) {
    heroTitle.style.transition = 'opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)';
  }
  if (heroSubtitle) {
    heroSubtitle.style.transition = 'opacity 0.4s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.4s cubic-bezier(0.16,1,0.3,1) 0.1s';
  }

  // Indicator clicks
  indicators.forEach((indicator, idx) => {
    indicator.addEventListener('click', () => {
      goToSlide(idx);
      startSlideshow(); // reset timer
    });
  });

  // Touch swipe for hero
  let touchStartX = 0;
  let touchEndX = 0;
  const heroSection = document.querySelector('.hero');

  if (heroSection) {
    heroSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // swipe left → next
          goToSlide((currentSlide + 1) % slides.length);
        } else {
          // swipe right → prev
          goToSlide((currentSlide - 1 + slides.length) % slides.length);
        }
        startSlideshow();
      }
    }, { passive: true });
  }

  startSlideshow();

  // ══════════════════════════════════════════
  // NAVIGATION
  // ══════════════════════════════════════════
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');
  const actionBar = document.getElementById('mobile-action-bar');

  // Scroll effects
  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Nav background
    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Mobile action bar
    if (actionBar && scrollY > window.innerHeight * 0.5) {
      actionBar.classList.add('visible');
    } else if (actionBar) {
      actionBar.classList.remove('visible');
    }

    lastScrollY = scrollY;
  }, { passive: true });

  // Hamburger toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
  }

  // Close mobile menu on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ══════════════════════════════════════════
  // SMOOTH SCROLL
  // ══════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ══════════════════════════════════════════
  // SCROLL REVEAL ANIMATIONS
  // ══════════════════════════════════════════
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-scale');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  // ══════════════════════════════════════════
  // COUNTER ANIMATION
  // ══════════════════════════════════════════
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'));
          const duration = 2000;
          const startTime = performance.now();

          function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
          }

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = Math.round(easedProgress * target);

            counter.textContent = current.toLocaleString('en-IN') + '+';

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          }

          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  animateCounters();

  // ══════════════════════════════════════════
  // ENQUIRY FORM
  // ══════════════════════════════════════════
  const btnConstruction = document.getElementById('btn-construction');
  const btnArchitecture = document.getElementById('btn-architecture');
  const dynamicField = document.getElementById('dynamic-field');
  const budgetField = document.getElementById('budget-field');
  const enquiryForm = document.getElementById('enquiry-form');
  const formSuccess = document.getElementById('form-success');
  const btnSubmit = document.getElementById('btn-submit');

  // Bambal Constructions enquiry options
  function setBambalEnquiryType(type) {
    const isHomeEnquiry = type === 'construction';
    btnConstruction.classList.toggle('active', isHomeEnquiry);
    btnArchitecture.classList.toggle('active', !isHomeEnquiry);
    budgetField.style.display = isHomeEnquiry ? 'block' : 'none';
    btnSubmit.textContent = isHomeEnquiry ? 'Submit Enquiry' : 'Request Consultation';
    dynamicField.innerHTML = isHomeEnquiry ? `
      <label class="form-label" for="enquiry-project">Interested Project</label>
      <select class="form-select" id="enquiry-project">
        <option value="">Select a project</option>
        <option value="ish-sparsh">Ish Sparsh — 2–4 BHK</option>
        <option value="shreeansh-residency">Shreeansh Residency — 2–4 BHK</option>
        <option value="shiv-park">Shiv Park — 2–4 BHK</option>
        <option value="shivantara-living">Shivantara Living — 2–4 BHK</option>
        <option value="other">Other / General Enquiry</option>
      </select>` : `
      <label class="form-label" for="enquiry-service">Service Required</label>
      <select class="form-select" id="enquiry-service">
        <option value="">Select service</option>
        <option value="architecture">Architectural Design & Planning</option>
        <option value="interiors">Interior Design</option>
        <option value="renovation">Renovation</option>
        <option value="consultation">General Consultation</option>
      </select>`;
  }

  // Type toggle
  function setEnquiryType(type) {
    if (type === 'construction') {
      btnConstruction.classList.add('active');
      btnArchitecture.classList.remove('active');
      dynamicField.innerHTML = `
        <label class="form-label" for="enquiry-project">Interested Project</label>
        <select class="form-select" id="enquiry-project">
          <option value="">Select a project</option>
          <option value="ish-sparsh">Ish Sparsh — 2–4 BHK</option>
          <option value="shreeansh-residency">Shreeansh Residency — 2–4 BHK</option>
          <option value="shiv-park">Shiv Park — 2–4 BHK</option>
          <option value="shivantara-living">Shivantara Living — 2–4 BHK</option>
          <option value="other">Other / General Enquiry</option>
        </select>
      `;
      budgetField.style.display = 'block';
      btnSubmit.textContent = 'Submit Enquiry';
    } else {
      btnArchitecture.classList.add('active');
      btnConstruction.classList.remove('active');
      dynamicField.innerHTML = `
        <label class="form-label" for="enquiry-service">Service Required</label>
        <select class="form-select" id="enquiry-service">
          <option value="">Select service</option>
          <option value="design">Architectural Design & Planning</option>
          <option value="interior">Interior Design</option>
          <option value="renovation">Renovation & Remodelling</option>
          <option value="3d">3D Visualization & Walkthrough</option>
          <option value="consultation">General Consultation</option>
        </select>
      `;
      budgetField.style.display = 'none';
      btnSubmit.textContent = 'Request Consultation';
    }
  }

  if (btnConstruction) {
    btnConstruction.addEventListener('click', () => setBambalEnquiryType('construction'));
  }
  if (btnArchitecture) {
    btnArchitecture.addEventListener('click', () => setBambalEnquiryType('architecture'));
  }

  // Form submission
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Button loading state
      btnSubmit.textContent = 'Sending...';
      btnSubmit.disabled = true;
      btnSubmit.style.opacity = '0.7';

      // Simulate submission
      setTimeout(() => {
        enquiryForm.style.display = 'none';
        document.querySelector('.enquiry-type-toggle').style.display = 'none';
        formSuccess.classList.add('show');

        // Reset after 5 seconds
        setTimeout(() => {
          enquiryForm.reset();
          enquiryForm.style.display = 'block';
          document.querySelector('.enquiry-type-toggle').style.display = 'flex';
          formSuccess.classList.remove('show');
          btnSubmit.textContent = 'Submit Enquiry';
          btnSubmit.disabled = false;
          btnSubmit.style.opacity = '1';
          setBambalEnquiryType('construction');
        }, 5000);
      }, 1500);
    });
  }

  // ══════════════════════════════════════════
  // PARALLAX SCROLL EFFECT
  // ══════════════════════════════════════════
  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;

    // Subtle parallax on hero images
    const heroSlides = document.querySelector('.hero-slides');
    if (heroSlides && scrollY < window.innerHeight) {
      heroSlides.style.transform = `translateY(${scrollY * 0.3}px)`;
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // ══════════════════════════════════════════
  // ONGOING PROJECTS AUTOSCROLL & WHATSAPP REDIRECT
  // ══════════════════════════════════════════
  const projectsScroll = document.getElementById('projects-scroll');
  if (projectsScroll) {
    let scrollInterval;
    
    const startAutoScroll = () => {
      if(scrollInterval) clearInterval(scrollInterval);
      scrollInterval = setInterval(() => {
        const maxScrollLeft = projectsScroll.scrollWidth - projectsScroll.clientWidth;
        // If reached the end, reset to start
        if (projectsScroll.scrollLeft >= maxScrollLeft - 10) {
          projectsScroll.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll by approx one card width
          projectsScroll.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }, 2500);
    };

    const stopAutoScroll = () => {
      if(scrollInterval) clearInterval(scrollInterval);
    };

    // Initialize auto-scroll
    startAutoScroll();

    // Pause on hover or touch
    projectsScroll.addEventListener('mouseenter', stopAutoScroll);
    projectsScroll.addEventListener('mouseleave', startAutoScroll);
    projectsScroll.addEventListener('touchstart', stopAutoScroll, {passive: true});
    projectsScroll.addEventListener('touchend', startAutoScroll, {passive: true});

    // Make entire project card redirect to WhatsApp
    const projectCards = projectsScroll.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        // Let anchor tag handle its own click
        if (e.target.closest('a')) return;
        
        const nameEl = card.querySelector('.project-card-name');
        if (nameEl) {
          const projectName = nameEl.textContent.trim();
          const text = encodeURIComponent(`Hello, I would like to enquire about ${projectName}`);
          window.open(`https://wa.me/919766660230?text=${text}`, '_blank', 'noopener,noreferrer');
        }
      });
    });
  }

})();
