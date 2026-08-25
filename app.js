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

  const albumHeroTitles = [
    'A Moment of<br /><em>Distinction</em>',
    'Recognition Beyond<br /><em>the Built</em>',
    'Recognised Among<br /><em>the Best</em>',
    'A New Chapter of<br /><em>Leadership</em>',
    'Recognition from<br /><em>the Industry</em>',
    'Celebrating Women in<br /><em>Leadership</em>',
    'Recognising<br /><em>Excellence</em>',
    'Leading the<br /><em>Conversation</em>'
  ];
  const albumHeroSubtitles = [
    'In the presence of leadership. A distinguished moment with Hon. Shri Devendra Fadnavis, Chief Minister of Maharashtra.',
    'Trust that extends further. A moment of recognition with Hon. Shri Chandrashekhar Bawankule, Cabinet Minister for Revenue.',
    'Excellence in residential development. Honoured at the MAREDCO Maharashtra awards for Best Residential Project — 2022.',
    'Women shaping the industry. A proud moment at the CREDAI Maharashtra Women’s Wing Installation.',
    'Honoured by industry leadership. Receiving a Certificate of Appreciation from NAREDCO Vidarbha.',
    'By women, for women. A moment of recognition at FemmiCon, celebrating women in real estate.',
    'Celebrating achievement. A proud moment of receiving recognition at the IIA Maharashtra platform.',
    'Building a stronger industry together. A distinguished moment at the CREDAI Women’s Wing Zonal Meet.'
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
      titleEl.innerHTML = albumHeroTitles[currentSlide];
      subtitleEl.textContent = albumHeroSubtitles[currentSlide];
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

  // Form submission — Web3Forms Email Dispatch & WhatsApp Lead Redirect
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Collect form data
      const name = document.getElementById('enquiry-name')?.value.trim() || 'N/A';
      const phone = document.getElementById('enquiry-phone')?.value.trim() || 'N/A';
      const email = document.getElementById('enquiry-email')?.value.trim() || 'N/A';
      
      const typeToggle = document.querySelector('.enquiry-type-btn.active');
      const enquiryType = typeToggle ? typeToggle.textContent.trim() : 'General';
      
      const projectSelect = document.getElementById('enquiry-project');
      const selectedProject = projectSelect && projectSelect.options[projectSelect.selectedIndex] ? projectSelect.options[projectSelect.selectedIndex].text : 'N/A';
      
      const budgetSelect = document.getElementById('enquiry-budget');
      const selectedBudget = budgetSelect && budgetSelect.options[budgetSelect.selectedIndex] && budgetSelect.value ? budgetSelect.options[budgetSelect.selectedIndex].text : 'N/A';
      
      const userMessage = document.getElementById('enquiry-message')?.value.trim() || 'None';

      // Button loading state
      const originalBtnText = btnSubmit.textContent;
      btnSubmit.textContent = 'Sending Enquiry...';
      btnSubmit.disabled = true;
      btnSubmit.style.opacity = '0.7';

      // Construct formatted WhatsApp message for instant notification
      let waMessage = `*NEW WEBSITE ENQUIRY*\n----------------------\n`;
      waMessage += `*Name:* ${name}\n`;
      waMessage += `*Phone:* ${phone}\n`;
      waMessage += `*Email:* ${email}\n`;
      waMessage += `*Type:* ${enquiryType}\n`;
      if (selectedProject !== 'N/A' && selectedProject !== 'Select a project') {
        waMessage += `*Requirement:* ${selectedProject}\n`;
      }
      if (selectedBudget !== 'N/A' && selectedBudget !== 'Select budget range') {
        waMessage += `*Budget:* ${selectedBudget}\n`;
      }
      if (userMessage !== 'None') {
        waMessage += `*Message:* ${userMessage}\n`;
      }

      // 1. Submit to Web3Forms API to deliver emails to siddharthbambal10@gmail.com, shekharconstructions@gmail.com, bambalinfrastructure@gmail.com
      try {
        const formData = new FormData();
        formData.append("access_key", "58f4a9b5-4122-4467-9377-50fb7bdfed97"); // Web3Forms Public Key configured for your emails
        formData.append("subject", `New Web Lead: ${name} (${enquiryType})`);
        formData.append("from_name", "Bambal Infrastructure Website");
        formData.append("to_email", "siddharthbambal10@gmail.com, shekharconstructions@gmail.com, bambalinfrastructure@gmail.com");
        formData.append("Name", name);
        formData.append("Phone", phone);
        formData.append("Email", email);
        formData.append("Enquiry Type", enquiryType);
        formData.append("Project / Service", selectedProject);
        formData.append("Budget Range", selectedBudget);
        formData.append("Message", userMessage);

        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        }).catch(err => console.log("Background email submission error:", err));
      } catch (err) {
        console.log("Web3Forms error:", err);
      }

      // 2. Display success UI state
      enquiryForm.style.display = 'none';
      const toggleEl = document.querySelector('.enquiry-type-toggle');
      if (toggleEl) toggleEl.style.display = 'none';
      if (formSuccess) formSuccess.classList.add('show');

      // 3. Automatically open WhatsApp to immediately alert you (+91 77450 27821)
      const encodedWaText = encodeURIComponent(waMessage);
      window.open(`https://wa.me/917745027821?text=${encodedWaText}`, '_blank', 'noopener,noreferrer');

      // Reset form after delay
      setTimeout(() => {
        enquiryForm.reset();
        enquiryForm.style.display = 'block';
        if (toggleEl) toggleEl.style.display = 'flex';
        if (formSuccess) formSuccess.classList.remove('show');
        btnSubmit.textContent = originalBtnText;
        btnSubmit.disabled = false;
        btnSubmit.style.opacity = '1';
        setBambalEnquiryType('construction');
      }, 5000);
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
