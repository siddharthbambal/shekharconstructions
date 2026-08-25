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

  const albumHeroLabels = [
    "In the presence of leadership",
    "Trust that extends further",
    "Excellence in residential development",
    "Women shaping the industry",
    "Honoured by industry leadership",
    "By women, for women",
    "Celebrating achievement with the industry",
    "Building a stronger industry together"
  ];
  const albumHeroTitles = [
    "A Moment of Distinction",
    "Recognition Beyond the Built",
    "Recognised Among the Best",
    "A New Chapter of Leadership",
    "Recognition from the Industry",
    "Celebrating Women in Leadership",
    "Recognising Excellence",
    "Leading the Conversation"
  ];
  const albumHeroSubtitles = [
    "A distinguished moment with Hon. Shri Devendra Fadnavis, Chief Minister of Maharashtra.",
    "A moment of recognition with Hon. Shri Chandrashekhar Bawankule, Cabinet Minister for Revenue, Maharashtra.",
    "Honoured at the MAREDCO Maharashtra awards for Best Residential Project — 2022.",
    "A proud moment at the CREDAI Maharashtra Women’s Wing Installation, marking leadership, representation and a stronger voice for women in real estate.",
    "A proud moment for Bambal Infrastructure, receiving a Certificate of Appreciation from NAREDCO Vidarbha, presented by Dr. Niranjan Hiranandani, Chairman, NAREDCO.",
    "A moment of recognition at FemmiCon, celebrating women making a meaningful mark in the real-estate industry.",
    "A proud moment of receiving recognition at the IIA Maharashtra platform, celebrating contribution and excellence in the built environment.",
    "A distinguished moment at the CREDAI Women’s Wing Zonal Meet, celebrating leadership, collaboration and women’s growing influence in real estate."
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
    const labelEl = document.getElementById('hero-label');
    const titleEl = document.getElementById('hero-title');
    const subtitleEl = document.getElementById('hero-subtitle');

    [labelEl, titleEl, subtitleEl].forEach(el => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
    });

    setTimeout(() => {
      if (labelEl) labelEl.textContent = albumHeroLabels[currentSlide];
      if (titleEl) titleEl.textContent = albumHeroTitles[currentSlide];
      if (subtitleEl) subtitleEl.textContent = albumHeroSubtitles[currentSlide];
      [labelEl, titleEl, subtitleEl].forEach(el => {
        if (!el) return;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
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
  const heroLabel = document.getElementById('hero-label');
  const heroTitle = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroLabel) {
    heroLabel.style.transition = 'opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)';
  }
  if (heroTitle) {
    heroTitle.style.transition = 'opacity 0.4s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 0.4s cubic-bezier(0.16,1,0.3,1) 0.05s';
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
  // ENQUIRY FORMS
  // ══════════════════════════════════════════
  const projectOptions = [
    { value: 'shiv-sparsh-villa', label: 'Shiv Sparsh Villa (New Manish Nagar - 3 BHK)' },
    { value: 'shiv-subah-villas', label: 'Shiv Subah Villas (One Floor One Flat - 3 BHK)' },
    { value: 'shivtara-towers', label: 'Shivtara Towers (Shambhu Nagar - Launching Oct 2026)' },
    { value: 'shiv-kunj', label: 'Shiv Kunj (Arya Nagar - Launching Soon)' },
    { value: 'sapphire-tower', label: 'Sapphire Tower (Dabha - Launching Soon)' },
    { value: 'other-project', label: 'Other / General Project Enquiry' }
  ];

  const serviceOptions = [
    { value: 'architecture', label: 'Architecture & Planning' },
    { value: 'construction', label: 'Construction & Execution' },
    { value: 'turnkey', label: 'Turnkey Projects' },
    { value: 'development', label: 'Real Estate Development' },
    { value: 'interiors', label: 'Interior Design & Finishing' },
    { value: 'resorts', label: 'Resorts' },
    { value: 'redevelopment', label: 'Redevelopment' },
    { value: 'renovation', label: 'Renovation & Remodelling' },
    { value: 'consultation', label: 'General Consultation' }
  ];

  const budgetOptions = [
    { value: 'up-to-35L', label: 'Up to ₹35 Lakh' },
    { value: '35-50L', label: '₹35 Lakh - ₹50 Lakh' },
    { value: '50L+', label: '₹50 Lakh+' }
  ];

  function normalizeEnquiryType(type) {
    return type === 'architecture' || type === 'services' ? 'services' : 'projects';
  }

  function optionListMarkup(options) {
    return options.map(option => `<option value="${option.value}">${option.label}</option>`).join('');
  }

  function setBambalEnquiryType(wrapper, type) {
    const activeType = normalizeEnquiryType(type);
    const isProjectEnquiry = activeType === 'projects';
    const scope = wrapper.dataset.scope || 'enquiry';
    const dynamicField = wrapper.querySelector('[data-dynamic-field]') || wrapper.querySelector('#dynamic-field');
    const budgetField = wrapper.querySelector('[data-budget-field]') || wrapper.querySelector('#budget-field');
    const submitButton = wrapper.querySelector('[data-submit]') || wrapper.querySelector('#btn-submit');

    wrapper.querySelectorAll('.enquiry-type-btn').forEach(button => {
      const buttonType = normalizeEnquiryType(button.dataset.type);
      button.classList.toggle('active', buttonType === activeType);
    });

    if (dynamicField) {
      dynamicField.innerHTML = isProjectEnquiry ? `
        <label class="form-label" for="${scope}-project">Interested Project</label>
        <select class="form-select" id="${scope}-project" data-project-select>
          <option value="">Select a project</option>
          ${optionListMarkup(projectOptions)}
        </select>` : `
        <label class="form-label" for="${scope}-service">Service Required</label>
        <select class="form-select" id="${scope}-service" data-project-select>
          <option value="">Select service</option>
          ${optionListMarkup(serviceOptions)}
        </select>`;
    }

    if (budgetField) {
      budgetField.style.display = isProjectEnquiry ? 'block' : 'none';
      const budgetSelect = budgetField.querySelector('select');
      if (budgetSelect && budgetSelect.options.length <= 1) {
        budgetSelect.insertAdjacentHTML('beforeend', optionListMarkup(budgetOptions));
      }
    }

    if (submitButton) {
      submitButton.textContent = isProjectEnquiry ? 'Submit Enquiry' : 'Request Consultation';
    }
  }

  function getFieldValue(form, selector, fallback = 'N/A') {
    const field = form.querySelector(selector);
    const value = field ? field.value.trim() : '';
    return value || fallback;
  }

  function getSelectedText(select, emptyLabels) {
    if (!select || !select.value || !select.options[select.selectedIndex]) return 'N/A';
    const label = select.options[select.selectedIndex].text.trim();
    return emptyLabels.includes(label) ? 'N/A' : label;
  }

  function initEnquiryForm(wrapper) {
    const form = wrapper.querySelector('form');
    if (!form) return;

    const submitButton = wrapper.querySelector('[data-submit]') || wrapper.querySelector('#btn-submit') || form.querySelector('button[type="submit"]');
    const successState = wrapper.querySelector('[data-form-success]') || wrapper.querySelector('#form-success');
    const toggleEl = wrapper.querySelector('.enquiry-type-toggle');
    const activeButton = wrapper.querySelector('.enquiry-type-btn.active');
    const defaultType = wrapper.dataset.defaultType || (activeButton ? activeButton.dataset.type : 'projects');

    setBambalEnquiryType(wrapper, defaultType);

    wrapper.querySelectorAll('.enquiry-type-btn').forEach(button => {
      button.addEventListener('click', () => setBambalEnquiryType(wrapper, button.dataset.type));
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = getFieldValue(form, '[data-field="name"], #enquiry-name');
      const phone = getFieldValue(form, '[data-field="phone"], #enquiry-phone');
      const email = getFieldValue(form, '[data-field="email"], #enquiry-email');
      const message = getFieldValue(form, '[data-field="message"], #enquiry-message', 'None');
      const activeTypeButton = wrapper.querySelector('.enquiry-type-btn.active');
      const enquiryMode = normalizeEnquiryType(activeTypeButton ? activeTypeButton.dataset.type : defaultType);
      const enquiryType = enquiryMode === 'projects' ? 'Projects' : 'Services';
      const projectOrService = getSelectedText(
        wrapper.querySelector('[data-project-select], #enquiry-project, #enquiry-service'),
        ['Select a project', 'Select service']
      );
      const selectedBudget = getSelectedText(
        wrapper.querySelector('[data-budget-select], #enquiry-budget'),
        ['Select budget range']
      );

      const originalBtnText = submitButton ? submitButton.textContent : '';
      if (submitButton) {
        submitButton.textContent = 'Sending Enquiry...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
      }

      let waMessage = `*NEW WEBSITE ENQUIRY*\n----------------------\n`;
      waMessage += `*Name:* ${name}\n`;
      waMessage += `*Phone:* ${phone}\n`;
      waMessage += `*Email:* ${email}\n`;
      waMessage += `*Type:* ${enquiryType}\n`;
      if (projectOrService !== 'N/A') {
        waMessage += `*Requirement:* ${projectOrService}\n`;
      }
      if (selectedBudget !== 'N/A' && enquiryMode === 'projects') {
        waMessage += `*Budget:* ${selectedBudget}\n`;
      }
      if (message !== 'None') {
        waMessage += `*Message:* ${message}\n`;
      }

      try {
        const formData = new FormData();
        formData.append('access_key', '58f4a9b5-4122-4467-9377-50fb7bdfed97');
        formData.append('subject', `New Web Lead: ${name} (${enquiryType})`);
        formData.append('from_name', 'Bambal Infrastructure Website');
        formData.append('to_email', 'siddharthbambal10@gmail.com, shekharconstructions@gmail.com, bambalinfrastructure@gmail.com');
        formData.append('Name', name);
        formData.append('Phone', phone);
        formData.append('Email', email);
        formData.append('Enquiry Type', enquiryType);
        formData.append('Project / Service', projectOrService);
        formData.append('Budget Range', selectedBudget);
        formData.append('Message', message);

        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        }).catch(err => console.log('Background email submission error:', err));
      } catch (err) {
        console.log('Web3Forms error:', err);
      }

      form.style.display = 'none';
      if (toggleEl) toggleEl.style.display = 'none';
      if (successState) successState.classList.add('show');

      const encodedWaText = encodeURIComponent(waMessage);
      window.open(`https://wa.me/917745027821?text=${encodedWaText}`, '_blank', 'noopener,noreferrer');

      setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        if (toggleEl) toggleEl.style.display = 'flex';
        if (successState) successState.classList.remove('show');
        if (submitButton) {
          submitButton.textContent = originalBtnText;
          submitButton.disabled = false;
          submitButton.style.opacity = '1';
        }
        setBambalEnquiryType(wrapper, defaultType);
      }, 5000);
    });
  }

  document.querySelectorAll('.enquiry-form-wrapper').forEach(initEnquiryForm);

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
  // FLOOR PLAN LIGHTBOX MODAL HANDLER
  // ══════════════════════════════════════════
  const floorplanModal = document.getElementById('floorplan-modal');
  const floorplanOverlay = document.getElementById('floorplan-overlay');
  const floorplanClose = document.getElementById('floorplan-close');
  const floorplanTitle = document.getElementById('floorplan-title');
  const floorplanImg = document.getElementById('floorplan-image');
  const floorplanWaBtn = document.getElementById('floorplan-wa-btn');

  const openFloorplanModal = (title, imgSrc) => {
    if (!floorplanModal) return;
    floorplanTitle.textContent = title || 'Floor Plan';
    floorplanImg.src = imgSrc;

    if (floorplanWaBtn) {
      floorplanWaBtn.href = `https://wa.me/917745027821?text=${encodeURIComponent(`Hello, I am looking at the floor plan for ${title} and would like more details.`)}`;
    }

    floorplanModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  const closeFloorplanModal = () => {
    if (!floorplanModal) return;
    floorplanModal.classList.remove('show');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.btn-floorplan').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-plan-title');
      const imgSrc = btn.getAttribute('data-plan-img');
      openFloorplanModal(title, imgSrc);
    });
  });

  // Full Screen Project Render Image Viewer
  document.querySelectorAll('.img-expand-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const title = btn.getAttribute('data-img-title');
      const imgSrc = btn.getAttribute('data-img-src');
      openFloorplanModal(title, imgSrc);
    });
  });

  if (floorplanClose) floorplanClose.addEventListener('click', closeFloorplanModal);
  if (floorplanOverlay) floorplanOverlay.addEventListener('click', closeFloorplanModal);

})();
