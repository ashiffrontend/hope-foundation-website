/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Hope Foundation - Modern NGO Web Engine (Vanilla JS ES6)
 * Designed & Developed with ❤️ by Ashif Web Studio
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initThemeToggle();
  initScrollProgress();
  initStickyNavbar();
  initMobileNav();
  initTypingEffect();
  initCounters();
  initBeforeAfterSlider();
  initProgramsFilter();
  initMedicalBooking();
  initGalleryLightbox();
  initImpactCharts();
  initStoriesSlider();
  initDonationSystem();
  initVolunteerForm();
  initEventCountdowns();
  initNewsFilter();
  initFaqAccordion();
  initContactForm();
  initCookieBanner();
  initRippleEffect();
  initBackToTop();
});

/* ==========================================================================
   1. Preloader
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 450);
  });
  // Fallback if load already fired
  setTimeout(() => {
    if (!preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
    }
  }, 1200);
}

/* ==========================================================================
   2. Theme Toggle (Dark / Light)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('hope_theme') || 'light';
  
  applyTheme(savedTheme);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hope_theme', theme);
    toggleBtns.forEach(btn => {
      btn.innerHTML = theme === 'dark' 
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
    });
  }
}

/* ==========================================================================
   3. Scroll Progress Bar & Sticky Header
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  });
}

function initStickyNavbar() {
  const header = document.querySelector('.header-sticky');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Active Section Spy
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = sec.getAttribute('id') || '';
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   4. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-actions .btn');

  if (!hamburger || !drawer) return;

  function toggleMenu() {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      hamburger.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  hamburger.addEventListener('click', toggleMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   5. Dynamic Hero Typing Effect
   ========================================================================== */
function initTypingEffect() {
  const target = document.getElementById('hero-typed-text');
  if (!target) return;

  const phrases = [
    'Every Family Fed.',
    'Every Child Educated.',
    'Free Medical Relief.',
    'Rapid Disaster Rescue.',
    'Clean Water For Villages.'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      target.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 45;
    } else {
      target.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 95;
    }

    if (!isDeleting && charIndex === current.length) {
      typeSpeed = 1800; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   6. Statistics Counter Animation
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 2000;
          const stepTime = 30;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = formatNumber(target);
              clearInterval(timer);
            } else {
              counter.textContent = formatNumber(Math.floor(current));
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats-bar');
  if (statsSection) observer.observe(statsSection);

  function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
    if (num >= 1000) return num.toLocaleString() + '+';
    return num.toString();
  }
}

/* ==========================================================================
   7. Before & After Image Comparison Slider
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.querySelector('.comparison-slider-container');
  if (!container) return;

  const afterImg = container.querySelector('.comparison-img.after');
  const handle = container.querySelector('.comparison-slider-handle');

  let isSliding = false;

  function slide(e) {
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    const percent = (x / rect.width) * 100;

    afterImg.style.clipPath = `inset(0 0 0 ${percent}%)`;
    handle.style.left = `${percent}%`;
  }

  container.addEventListener('mousedown', () => { isSliding = true; });
  container.addEventListener('touchstart', () => { isSliding = true; }, { passive: true });

  window.addEventListener('mouseup', () => { isSliding = false; });
  window.addEventListener('touchend', () => { isSliding = false; });

  window.addEventListener('mousemove', (e) => {
    if (!isSliding) return;
    slide(e);
  });

  window.addEventListener('touchmove', (e) => {
    if (!isSliding) return;
    slide(e);
  }, { passive: true });
}

/* ==========================================================================
   8. Programs Category Filter & Program Details Modal
   ========================================================================== */
function initProgramsFilter() {
  const filterBtns = document.querySelectorAll('.programs-filter-wrap .filter-btn');
  const programCards = document.querySelectorAll('.program-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      programCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'zoom-in 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Program Detail Buttons
  document.querySelectorAll('.btn-view-program').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');
      const goal = btn.getAttribute('data-goal');
      const raised = btn.getAttribute('data-raised');
      const impact = btn.getAttribute('data-impact');
      const image = btn.getAttribute('data-image');

      const modal = document.getElementById('program-detail-modal');
      if (!modal) return;

      document.getElementById('modal-program-title').textContent = title;
      document.getElementById('modal-program-desc').textContent = desc;
      document.getElementById('modal-program-goal').textContent = goal;
      document.getElementById('modal-program-raised').textContent = raised;
      document.getElementById('modal-program-impact').textContent = impact;
      document.getElementById('modal-program-img').setAttribute('src', image);

      modal.classList.add('active');
    });
  });

  // Modal Closers
  document.querySelectorAll('.app-modal .modal-close-btn, .app-modal .btn-modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.target.closest('.app-modal').classList.remove('active');
    });
  });

  // Close on outside click
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('app-modal')) {
      e.target.classList.remove('active');
    }
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.app-modal.active').forEach(m => m.classList.remove('active'));
      const lightbox = document.getElementById('lightbox-modal');
      if (lightbox) lightbox.classList.remove('active');
    }
  });
}

/* ==========================================================================
   9. Medical Camps Appointment Booking
   ========================================================================== */
function initMedicalBooking() {
  const form = document.getElementById('medical-booking-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const patientName = document.getElementById('med-patient-name').value;
    const campLocation = document.getElementById('med-camp-select').value;
    const doctorSpecialty = document.getElementById('med-specialty-select').value;
    const patientPhone = document.getElementById('med-patient-phone').value;

    const tokenNumber = 'MED-' + Math.floor(100000 + Math.random() * 900000);

    const tokenBox = document.getElementById('appointment-pass-result');
    tokenBox.innerHTML = `
      <div style="background: var(--color-secondary-light); border: 2px dashed var(--color-secondary); padding: 1.5rem; border-radius: var(--radius-lg); text-align: center; margin-top: 1rem;">
        <div style="font-size: 1.8rem; margin-bottom: 6px;">🩺</div>
        <h4 style="color: var(--color-secondary); font-size: 1.2rem; font-weight: 800; margin-bottom: 4px;">Appointment Confirmed!</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">Free Medical Consultation Pass</p>
        <div style="background: var(--bg-card); padding: 12px; border-radius: var(--radius-md); font-size: 0.88rem; text-align: left; margin-bottom: 1rem;">
          <p><strong>Token Number:</strong> <span style="color: var(--color-primary); font-weight: 800;">${tokenNumber}</span></p>
          <p><strong>Patient Name:</strong> ${patientName}</p>
          <p><strong>Selected Camp:</strong> ${campLocation}</p>
          <p><strong>Specialty:</strong> ${doctorSpecialty}</p>
          <p><strong>Registered Phone:</strong> ${patientPhone}</p>
          <p><strong>Status:</strong> Free Consultation + Free Medicines</p>
        </div>
        <p style="font-size: 0.8rem; color: var(--text-muted);">An SMS confirmation with this token has been simulated to ${patientPhone}. Show this pass at the camp reception counter.</p>
        <button type="button" class="btn btn-secondary btn-sm" onclick="window.print()" style="margin-top: 10px;">
          🖨️ Print Pass
        </button>
      </div>
    `;

    showToast('Medical appointment booked successfully!', 'success');
  });
}

/* ==========================================================================
   10. Gallery Filter & Lightbox
   ========================================================================== */
function initGalleryLightbox() {
  const filterBtns = document.querySelectorAll('.gallery-filter-wrap .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  const closeBtn = document.querySelector('.lightbox-close');

  let activeIndex = 0;
  let visibleItems = Array.from(galleryItems);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter') || 'all';

      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (category === 'all' || cat === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    });
  });

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
      activeIndex = visibleItems.indexOf(item);
      openLightbox();
    });
  });

  function openLightbox() {
    if (!visibleItems[activeIndex]) return;
    const img = visibleItems[activeIndex].querySelector('.gallery-item-img');
    const title = visibleItems[activeIndex].querySelector('.gallery-item-title')?.textContent || '';
    const tag = visibleItems[activeIndex].querySelector('.gallery-item-tag')?.textContent || '';

    lightboxImg.setAttribute('src', img.getAttribute('src'));
    lightboxCaption.innerHTML = `<strong>${title}</strong> — <span>${tag}</span>`;
    lightbox.classList.add('active');
  }

  function showNext() {
    activeIndex = (activeIndex + 1) % visibleItems.length;
    openLightbox();
  }

  function showPrev() {
    activeIndex = (activeIndex - 1 + visibleItems.length) % visibleItems.length;
    openLightbox();
  }

  nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  closeBtn?.addEventListener('click', () => { lightbox.classList.remove('active'); });

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });

  window.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* ==========================================================================
   11. Interactive Canvas Charts (Fund Allocation & Yearly Growth)
   ========================================================================== */
function initImpactCharts() {
  drawAllocationChart();
  drawGrowthChart();

  window.addEventListener('resize', () => {
    drawAllocationChart();
    drawGrowthChart();
  });

  // Re-draw on theme change
  const observer = new MutationObserver(() => {
    drawAllocationChart();
    drawGrowthChart();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}

function drawAllocationChart() {
  const canvas = document.getElementById('allocation-chart-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.parentElement.clientWidth;
  const height = 280;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(dpr, dpr);

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  ctx.clearRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - 25;
  const innerRadius = radius * 0.58;

  const data = [
    { label: 'Direct Program Relief (87%)', value: 87, color: '#16A34A' },
    { label: 'Operational & Logistical (8%)', value: 8, color: '#0F62FE' },
    { label: 'Fundraising & Awareness (5%)', value: 5, color: '#F59E0B' }
  ];

  let startAngle = -0.5 * Math.PI;

  data.forEach(slice => {
    const sliceAngle = (slice.value / 100) * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = slice.color;
    ctx.fill();

    startAngle = endAngle;
  });

  // Center Circle Text
  ctx.beginPath();
  ctx.arc(centerX, centerY, innerRadius - 2, 0, 2 * Math.PI);
  ctx.fillStyle = isDark ? '#151D2F' : '#FFFFFF';
  ctx.fill();

  ctx.fillStyle = isDark ? '#FFFFFF' : '#111827';
  ctx.font = 'bold 22px Poppins, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('87%', centerX, centerY - 8);

  ctx.fillStyle = '#16A34A';
  ctx.font = '600 11px Poppins, sans-serif';
  ctx.fillText('DIRECT RELIEF', centerX, centerY + 14);
}

function drawGrowthChart() {
  const canvas = document.getElementById('growth-chart-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.parentElement.clientWidth;
  const height = 280;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(dpr, dpr);

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  ctx.clearRect(0, 0, width, height);

  const padding = { top: 30, right: 30, bottom: 40, left: 50 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const years = ['2021', '2022', '2023', '2024', '2025', '2026'];
  const values = [4200, 7800, 11500, 16200, 22000, 31000]; // Beneficiaries served
  const maxVal = 35000;

  // Grid lines
  ctx.strokeStyle = isDark ? '#2D3748' : '#E2E8F0';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();

    ctx.fillStyle = isDark ? '#9CA3AF' : '#6B7280';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'right';
    const labelVal = Math.round(maxVal - (maxVal / 4) * i);
    ctx.fillText(labelVal.toLocaleString(), padding.left - 8, y + 3);
  }

  // Draw Bars
  const barWidth = Math.min(36, chartW / years.length - 14);
  values.forEach((val, idx) => {
    const x = padding.left + (idx * (chartW / years.length)) + (chartW / years.length - barWidth) / 2;
    const barH = (val / maxVal) * chartH;
    const y = padding.top + chartH - barH;

    const gradient = ctx.createLinearGradient(0, y, 0, y + barH);
    gradient.addColorStop(0, '#0F62FE');
    gradient.addColorStop(1, '#2563EB');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth, barH, [6, 6, 0, 0]);
    ctx.fill();

    // Value label
    ctx.fillStyle = isDark ? '#E2E8F0' : '#111827';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${(val / 1000).toFixed(1)}k`, x + barWidth / 2, y - 6);

    // Year label
    ctx.fillStyle = isDark ? '#9CA3AF' : '#6B7280';
    ctx.font = '11px sans-serif';
    ctx.fillText(years[idx], x + barWidth / 2, height - padding.bottom + 18);
  });
}

/* ==========================================================================
   12. Success Stories Testimonial Slider
   ========================================================================== */
function initStoriesSlider() {
  const track = document.querySelector('.stories-track');
  const slides = document.querySelectorAll('.story-slide');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const dotsContainer = document.querySelector('.slider-dots');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;

  // Create dots
  dotsContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.slider-dot');

  function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
  });

  prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(currentIndex);
  });

  // Auto advance every 6 seconds
  let timer = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
  }, 6000);

  track.addEventListener('mouseenter', () => clearInterval(timer));
  track.addEventListener('mouseleave', () => {
    timer = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      goToSlide(currentIndex);
    }, 6000);
  });
}

/* ==========================================================================
   13. Complete Donation System, QR Code & 80G Receipt
   ========================================================================== */
function initDonationSystem() {
  const freqBtns = document.querySelectorAll('.freq-btn');
  const amountBtns = document.querySelectorAll('.amount-btn');
  const customInput = document.getElementById('custom-donation-amount');
  const impactHighlight = document.getElementById('calc-impact-highlight');
  const impactSub = document.getElementById('calc-impact-sub');
  const donateForm = document.getElementById('donation-active-form');

  let selectedAmount = 1000;
  let donationFreq = 'one-time';

  freqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      freqBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      donationFreq = btn.getAttribute('data-freq') || 'one-time';
      updateImpact(selectedAmount);
    });
  });

  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedAmount = parseInt(btn.getAttribute('data-amount') || '1000', 10);
      if (customInput) customInput.value = '';
      updateImpact(selectedAmount);
    });
  });

  customInput?.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) {
      amountBtns.forEach(b => b.classList.remove('active'));
      selectedAmount = val;
      updateImpact(selectedAmount);
    }
  });

  function updateImpact(amt) {
    if (!impactHighlight || !impactSub) return;
    const freqSuffix = donationFreq === 'monthly' ? 'every month' : '';

    if (amt < 500) {
      impactHighlight.textContent = `Feeds ${Math.floor(amt / 50)} hungry individuals`;
      impactSub.textContent = `Your ₹${amt} ${freqSuffix} provides wholesome nutritious warm meals and fresh water.`;
    } else if (amt < 1500) {
      impactHighlight.textContent = `Feeds 20 children or provides complete monthly medicine`;
      impactSub.textContent = `Your ₹${amt} ${freqSuffix} provides essential grain & oil rations or essential prescription drugs.`;
    } else if (amt < 3000) {
      impactHighlight.textContent = `Sponsors 1 child's education kit + nutrition`;
      impactSub.textContent = `Your ₹${amt} ${freqSuffix} pays for school bags, uniforms, books, and daily mid-day meals.`;
    } else if (amt < 7000) {
      impactHighlight.textContent = `Emergency disaster kit for 1 displaced flood family`;
      impactSub.textContent = `Your ₹${amt} ${freqSuffix} gives tarp shelters, waterproof blankets, clean drinking water, and dry rations.`;
    } else {
      impactHighlight.textContent = `Funds a free cataract surgery or village water handpump`;
      impactSub.textContent = `Your ₹${amt} ${freqSuffix} restores sight to an impoverished elder or provides clean water to 80+ villagers!`;
    }
  }

  // Payment tab switching
  const payTabs = document.querySelectorAll('.pay-tab-btn');
  const payContents = document.querySelectorAll('.pay-tab-content');

  payTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      payTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-target');

      payContents.forEach(content => {
        content.style.display = content.id === target ? 'block' : 'none';
      });
    });
  });

  // Copy UPI ID
  const copyUpiBtn = document.getElementById('copy-upi-btn');
  copyUpiBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText('hopefoundation@upi').then(() => {
      showToast('UPI ID copied to clipboard: hopefoundation@upi', 'success');
    }).catch(() => {
      showToast('Copied: hopefoundation@upi', 'success');
    });
  });

  // Donation Form Submission -> Generate 80G Digital Receipt
  donateForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const donorName = document.getElementById('donor-name').value || 'Generous Supporter';
    const donorEmail = document.getElementById('donor-email').value || 'donor@example.com';
    const donorPan = document.getElementById('donor-pan').value || 'XXXXX9999X';

    generate80GReceipt(donorName, donorEmail, donorPan, selectedAmount, donationFreq);
  });
}

function generate80GReceipt(name, email, pan, amount, freq) {
  const modal = document.getElementById('receipt-modal');
  if (!modal) return;

  const receiptNo = 'HF-80G-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000);
  const dateStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  document.getElementById('receipt-no').textContent = receiptNo;
  document.getElementById('receipt-date').textContent = dateStr;
  document.getElementById('receipt-donor-name').textContent = name;
  document.getElementById('receipt-donor-pan').textContent = pan.toUpperCase();
  document.getElementById('receipt-amount').textContent = '₹' + amount.toLocaleString('en-IN');
  document.getElementById('receipt-type').textContent = freq === 'monthly' ? 'Monthly Recurring Donation' : 'One-Time Donation';

  modal.classList.add('active');
  showToast('Donation successful! Your 80G tax receipt is ready.', 'success');
}

/* ==========================================================================
   14. Full Volunteer Application Form & ID Card Generator
   ========================================================================== */
function initVolunteerForm() {
  const form = document.getElementById('volunteer-application-form');
  const photoInput = document.getElementById('vol-photo-file');
  const photoPreviewBox = document.getElementById('photo-preview-box');
  const photoPreviewImg = document.getElementById('photo-preview-img');

  // Photo live preview
  photoInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        photoPreviewImg.src = event.target.result;
        photoPreviewBox.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });

  // Resume file name feedback
  const resumeInput = document.getElementById('vol-resume-file');
  resumeInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      document.getElementById('resume-file-name').textContent = `Attached: ${file.name} (${(file.size / 1024).toFixed(0)} KB)`;
    }
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `⏳ Submitting Application...`;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      const fullName = document.getElementById('vol-fullname').value;
      const bloodGroup = document.getElementById('vol-blood-group').value;
      const domain = document.getElementById('vol-domain').value;
      const city = document.getElementById('vol-city').value;
      const photoSrc = photoPreviewImg.src || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
      const volId = 'HF-VOL-2026-' + Math.floor(1000 + Math.random() * 9000);

      // Render Success Badge Card
      const resultWrap = document.getElementById('volunteer-badge-result');
      resultWrap.innerHTML = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="font-size: 2.5rem; margin-bottom: 6px;">🎉</div>
          <h3 style="color: var(--color-secondary); font-size: 1.4rem; font-weight: 800;">Welcome to the Hope Family!</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Your volunteer application has been approved. Here is your official provisional badge:</p>
        </div>
        
        <div class="volunteer-id-card">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.25); padding-bottom: 8px; margin-bottom: 14px;">
            <div style="font-weight: 800; font-size: 0.95rem; letter-spacing: 0.5px;">HOPE FOUNDATION</div>
            <div style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 700;">PROVISIONAL ID</div>
          </div>
          <div style="display: flex; gap: 16px; align-items: center;">
            <img src="${photoSrc}" style="width: 76px; height: 76px; border-radius: 50%; object-fit: cover; border: 3px solid #fff;" alt="Volunteer" />
            <div>
              <h4 style="font-size: 1.15rem; font-weight: 800; line-height: 1.2;">${fullName}</h4>
              <p style="font-size: 0.8rem; opacity: 0.9;"><strong>Role:</strong> ${domain}</p>
              <p style="font-size: 0.8rem; opacity: 0.9;"><strong>Location:</strong> ${city}</p>
              <p style="font-size: 0.8rem; opacity: 0.9;"><strong>Blood Group:</strong> <span style="background: #DC2626; padding: 1px 6px; border-radius: 3px; font-weight: 700;">${bloodGroup}</span></p>
              <p style="font-size: 0.75rem; font-family: monospace; opacity: 0.85; margin-top: 4px;">ID: ${volId}</p>
            </div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 1rem;">
          <button class="btn btn-secondary btn-sm" onclick="window.print()">🖨️ Print Volunteer Card</button>
        </div>
      `;

      const modal = document.getElementById('volunteer-success-modal');
      modal?.classList.add('active');

      form.reset();
      photoPreviewBox.style.display = 'none';
      showToast('Volunteer application submitted successfully!', 'success');
    }, 1200);
  });
}

/* ==========================================================================
   15. Event Live Countdown Timers
   ========================================================================== */
function initEventCountdowns() {
  const timers = document.querySelectorAll('.event-countdown-unit');
  if (timers.length === 0) return;

  function update() {
    const now = new Date().getTime();

    document.querySelectorAll('.event-card').forEach(card => {
      const targetDateStr = card.getAttribute('data-date');
      if (!targetDateStr) return;
      const targetTime = new Date(targetDateStr).getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        card.querySelector('.event-countdown-bar').innerHTML = '<span>Event In Progress / Active</span>';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const dEl = card.querySelector('.unit-days');
      const hEl = card.querySelector('.unit-hours');
      const mEl = card.querySelector('.unit-mins');
      const sEl = card.querySelector('.unit-secs');

      if (dEl) dEl.textContent = String(days).padStart(2, '0');
      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(mins).padStart(2, '0');
      if (sEl) sEl.textContent = String(secs).padStart(2, '0');
    });
  }

  update();
  setInterval(update, 1000);

  // Event Register buttons
  document.querySelectorAll('.btn-register-event').forEach(btn => {
    btn.addEventListener('click', () => {
      const eventName = btn.getAttribute('data-event');
      const modal = document.getElementById('event-register-modal');
      if (!modal) return;
      document.getElementById('modal-event-name').textContent = eventName;
      modal.classList.add('active');
    });
  });

  const eventRegForm = document.getElementById('event-registration-form');
  eventRegForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Event registration confirmed! Pass sent to your email.', 'success');
    document.getElementById('event-register-modal')?.classList.remove('active');
  });
}

/* ==========================================================================
   16. News Search & Read Modal
   ========================================================================== */
function initNewsFilter() {
  const searchInput = document.getElementById('news-search-input');
  const newsCards = document.querySelectorAll('.news-card');

  searchInput?.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();

    newsCards.forEach(card => {
      const title = card.querySelector('.news-title')?.textContent.toLowerCase() || '';
      const excerpt = card.querySelector('.news-excerpt')?.textContent.toLowerCase() || '';
      if (title.includes(term) || excerpt.includes(term)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });

  document.querySelectorAll('.btn-read-news').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const date = btn.getAttribute('data-date');
      const content = btn.getAttribute('data-content');
      const image = btn.getAttribute('data-image');

      const modal = document.getElementById('news-detail-modal');
      if (!modal) return;

      document.getElementById('modal-news-title').textContent = title;
      document.getElementById('modal-news-date').textContent = date;
      document.getElementById('modal-news-body').innerHTML = content;
      document.getElementById('modal-news-img').setAttribute('src', image);

      modal.classList.add('active');
    });
  });
}

/* ==========================================================================
   17. FAQ Accordion with Search
   ========================================================================== */
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  const searchInput = document.getElementById('faq-search-input');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      accordionItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  searchInput?.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    accordionItems.forEach(item => {
      const question = item.querySelector('.accordion-header')?.textContent.toLowerCase() || '';
      const answer = item.querySelector('.accordion-content')?.textContent.toLowerCase() || '';

      if (question.includes(term) || answer.includes(term)) {
        item.style.display = 'block';
        if (term.length > 2) item.classList.add('active');
      } else {
        item.style.display = 'none';
        item.classList.remove('active');
      }
    });
  });
}

/* ==========================================================================
   18. Contact Form & Toast Notifications
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const newsletterForms = document.querySelectorAll('.newsletter-form');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const ticketNo = 'HF-TKT-' + Math.floor(10000 + Math.random() * 90000);

    showToast(`Thank you ${name}! Your inquiry #${ticketNo} has been received. Our team will respond within 4 hours.`, 'success');
    form.reset();
  });

  newsletterForms.forEach(nf => {
    nf.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for subscribing to Hope Foundation newsletter!', 'success');
      nf.reset();
    });
  });
}

/* ==========================================================================
   19. Toast Notification System
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-msg ${type}`;

  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️';

  toast.innerHTML = `
    <span>${icon}</span>
    <span style="flex:1;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4200);
}

/* ==========================================================================
   20. Cookie Consent Banner
   ========================================================================== */
function initCookieBanner() {
  const banner = document.getElementById('cookie-consent-banner');
  if (!banner) return;

  const accepted = localStorage.getItem('hope_cookie_accepted');
  if (!accepted) {
    setTimeout(() => banner.classList.add('show'), 1500);
  }

  document.getElementById('cookie-accept-btn')?.addEventListener('click', () => {
    localStorage.setItem('hope_cookie_accepted', 'true');
    banner.classList.remove('show');
    showToast('Cookie preferences saved.', 'info');
  });

  document.getElementById('cookie-decline-btn')?.addEventListener('click', () => {
    localStorage.setItem('hope_cookie_accepted', 'declined');
    banner.classList.remove('show');
  });
}

/* ==========================================================================
   21. Ripple Button Animation
   ========================================================================== */
function initRippleEffect() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const radius = diameter / 2;

      const rect = this.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple');

      const ripple = this.querySelector('.ripple');
      if (ripple) ripple.remove();

      this.appendChild(circle);
    });
  });
}

/* ==========================================================================
   22. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const topBtn = document.getElementById('back-to-top-btn');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
