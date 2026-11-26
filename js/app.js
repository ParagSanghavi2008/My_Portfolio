/**
 * Parag Rajeshkumar Sanghavi - Portfolio Main Script
 * Handles page navigation, menu, project modals,
 * contact form verification, email copy, and motion.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const motionConfig = window.PORTFOLIO_MOTION_CONFIG;
  const motionStyle = document.documentElement.style;
  motionStyle.setProperty('--motion-ease', motionConfig.easing);
  motionStyle.setProperty('--motion-duration', motionConfig.duration);
  motionStyle.setProperty('--motion-stagger', motionConfig.stagger);

  document.documentElement.classList.add('js-ready');

  const themeLamp = document.getElementById('theme-lamp');
  if (themeLamp) {
    const themes = {
      sapphire: 'Deep Sapphire',
      champagne: 'Champagne'
    };
    let savedTheme;
    try {
      savedTheme = window.localStorage.getItem('portfolio-theme');
    } catch (error) {
      console.warn('Saved theme preference could not be read.', error);
    }
    let activeTheme = savedTheme === 'champagne' ? 'champagne' : 'sapphire';

    function applyTheme(theme) {
      activeTheme = theme;
      document.documentElement.dataset.theme = theme;
      themeLamp.setAttribute('aria-label', `Change theme. Current theme: ${themes[theme]}`);
      themeLamp.setAttribute('aria-pressed', String(theme === 'champagne'));
      try {
        window.localStorage.setItem('portfolio-theme', theme);
      } catch (error) {
        console.warn('Theme preference could not be saved.', error);
      }
      document.dispatchEvent(new CustomEvent('portfolio:theme-change', { detail: { theme } }));
    }

    applyTheme(activeTheme);
    themeLamp.addEventListener('click', () => {
      themeLamp.classList.remove('is-pulling');
      void themeLamp.offsetWidth;
      themeLamp.classList.add('is-pulling');
      applyTheme(activeTheme === 'sapphire' ? 'champagne' : 'sapphire');
    });
    themeLamp.addEventListener('animationend', event => {
      if (event.animationName === 'lamp-pull') themeLamp.classList.remove('is-pulling');
    });
  }

  const pageLoader = document.getElementById('page-loader');
  if (pageLoader) {
    window.addEventListener('load', () => {
      pageLoader.setAttribute('aria-hidden', 'true');
      pageLoader.classList.add('is-hidden');
    }, { once: true });
  }

  // 1. Mobile Navigation Drawer
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  const navSections = Array.from(navLinks)
    .map(link => document.getElementById(new URL(link.href, window.location.href).hash.slice(1)))
    .filter(Boolean);

  function setActiveSection(sectionId) {
    navLinks.forEach(link => {
      const isActive = new URL(link.href, window.location.href).hash === `#${sectionId}`;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  const initialSection = window.location.hash.slice(1);
  setActiveSection(navSections.some(section => section.id === initialSection) ? initialSection : 'hero');

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      const visibleSections = entries.filter(entry => entry.isIntersecting);
      if (!visibleSections.length) return;
      const activeSection = visibleSections.reduce((closest, entry) => (
        Math.abs(entry.boundingClientRect.top) < Math.abs(closest.boundingClientRect.top)
          ? entry
          : closest
      ));
      setActiveSection(activeSection.target.id);
    }, { rootMargin: '-18% 0px -68% 0px', threshold: 0 });

    navSections.forEach(section => sectionObserver.observe(section));
  }

  if (navToggle && navMenu) {
    function closeNavigation() {
      navMenu.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation menu');
      document.body.classList.remove('nav-lock');
    }

    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      document.body.classList.toggle('nav-lock', isOpen && window.matchMedia('(max-width: 867px)').matches);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', closeNavigation);
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeNavigation();
        navToggle.focus();
      }
    });

    document.addEventListener('click', event => {
      if (
        navMenu.classList.contains('is-open')
        && event.target instanceof Node
        && !navMenu.contains(event.target)
        && !navToggle.contains(event.target)
      ) {
        closeNavigation();
      }
    });
  }

  // 3. Header Scroll Effect & Back-to-Top Button
  const header = document.getElementById('main-header');
  const backToTopBtn = document.getElementById('back-to-top');
  const scrollProgress = document.querySelector('.scroll-progress span');

  function updateScrollProgress() {
    if (!scrollProgress) return;

    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? Math.min(window.scrollY / scrollableHeight, 1) : 0;
    scrollProgress.style.transform = `scaleX(${progress})`;
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    updateScrollProgress();
  }, { passive: true });
  updateScrollProgress();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Scroll Reveal Animation using IntersectionObserver
  const motionTargets = document.querySelectorAll(
    '.reveal-on-scroll, .section-tag, .section-title, .section-description, .project-media-icon, .pillar-icon-box, ' +
    '.section p, .section li, .section .tag, .section .badge, .terminal-stats > *, .hero-social-row > *, ' +
    '.exploring-chip, .contact-method-card, .to-achieve-card'
  );
  const variantCount = Math.max(50, motionConfig.revealVariantCount);
  motionTargets.forEach((element, index) => {
    const angle = (index % variantCount) * 2.399963229728653;
    const travel = motionConfig.revealTravel * (0.55 + ((index * 7) % 10) / 20);
    element.classList.add('motion-reveal');
    element.style.setProperty('--motion-sequence', index % 6);
    element.style.setProperty('--motion-offset-x', `${(Math.cos(angle) * travel).toFixed(1)}px`);
    element.style.setProperty('--motion-offset-y', `${(Math.sin(angle) * travel).toFixed(1)}px`);
    element.style.setProperty('--motion-offset-scale', `${(0.975 + ((index * 3) % 8) * 0.003).toFixed(3)}`);
    element.style.setProperty('--motion-offset-rotation', `${(Math.sin(angle * 0.73) * motionConfig.revealRotation).toFixed(2)}deg`);
  });

  const revealElements = document.querySelectorAll('.reveal-on-scroll, .motion-reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // 6. Project Architecture Details Modal
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalContentContainer = document.getElementById('modal-project-content');
  const projectDetailButtons = document.querySelectorAll('.btn-project-details');

  function openProjectModal(projectId) {
    const config = window.PORTFOLIO_CONFIG;
    if (!config || !config.projects) return;

    const project = config.projects.find(p => p.id === projectId);
    if (!project || !modalContentContainer) return;

    const ext = project.extendedDetails || {};
    const archList = (ext.architectureHighlights || [])
      .map(item => `<li><span class="bullet">▹</span> ${item}</li>`)
      .join('');

    const tagsHtml = (project.tags || [])
      .map(t => `<span class="tag">${t}</span>`)
      .join('');

    const githubBtn = project.links && project.links.github 
      ? `<a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
           <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
           View Repository
         </a>`
      : `<span class="text-muted text-xs italic">Repository will be linked upon initial release.</span>`;

    modalContentContainer.innerHTML = `
      <div class="modal-badge-row">
        <span class="badge badge-${project.badgeType}">${project.badge}</span>
        <span class="text-muted text-xs font-mono">${project.category}</span>
      </div>
      <h2 class="modal-title">${project.title}</h2>
      <p class="modal-tagline">${project.tagline}</p>

      <div class="modal-section">
        <h4 class="modal-subtitle">Problem Context</h4>
        <p class="modal-body-text">${ext.problemStatement || project.description}</p>
      </div>

      <div class="modal-section">
        <h4 class="modal-subtitle">Technical Approach & Exploration</h4>
        <p class="modal-body-text">${ext.approach || 'Technical prototyping in progress.'}</p>
      </div>

      <div class="modal-section">
        <h4 class="modal-subtitle">System Architecture Highlights</h4>
        <ul class="modal-feature-list">
          ${archList}
        </ul>
      </div>

      <div class="modal-callout">
        <div class="callout-label">Status Verification:</div>
        <p class="callout-text">${ext.statusNote || 'In ongoing study and active iteration.'}</p>
      </div>

      <div class="modal-footer-row">
        <div class="modal-tags">${tagsHtml}</div>
        <div class="modal-actions">${githubBtn}</div>
      </div>
    `;

    modalOverlay.classList.add('is-active');
    document.body.classList.add('modal-lock');
  }

  function closeProjectModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('is-active');
      document.body.classList.remove('modal-lock');
    }
  }

  projectDetailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pid = btn.getAttribute('data-project-id');
      if (pid) openProjectModal(pid);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      const formDialog = document.getElementById('contact-guide-modal');
      if (formDialog && formDialog.classList.contains('is-active')) {
        formDialog.classList.remove('is-active');
        document.body.classList.remove('modal-lock');
      }
    }
  });

  // 7. Email Copy to Clipboard with Feedback Toast
  const copyEmailBtns = document.querySelectorAll('.btn-copy-email');
  const toast = document.getElementById('toast');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.personal.email) || 'paragsanghavi.101@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast('✓ Email address copied to clipboard!');
      } catch (err) {
        showToast(`Email: ${email}`);
      }
    });
  });

  // 8. Contact Form Handling
  // Honest implementation: validates client-side, explains configuration, and offers direct email mailto action
  const contactForm = document.getElementById('contact-form');
  const formGuideModal = document.getElementById('contact-guide-modal');
  const formGuideClose = document.getElementById('form-guide-close');
  const formGuideMailtoBtn = document.getElementById('form-guide-mailto-btn');

  let pendingFormData = { name: '', email: '', message: '' };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // Validation
      if (!name || !email || !message) {
        showToast('Please fill in all required fields.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.');
        return;
      }

      pendingFormData = { name, email, message };

      // Open the explanatory modal
      if (formGuideModal) {
        const targetEmail = (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.personal.email) || 'paragsanghavi.101@gmail.com';
        const guideEmailSpan = document.getElementById('guide-target-email');
        if (guideEmailSpan) guideEmailSpan.textContent = targetEmail;

        formGuideModal.classList.add('is-active');
        document.body.classList.add('modal-lock');
      }
    });
  }

  if (formGuideClose && formGuideModal) {
    formGuideClose.addEventListener('click', () => {
      formGuideModal.classList.remove('is-active');
      document.body.classList.remove('modal-lock');
    });
  }

  if (formGuideMailtoBtn) {
    formGuideMailtoBtn.addEventListener('click', () => {
      const targetEmail = (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.personal.email) || 'paragsanghavi.101@gmail.com';
      const subject = encodeURIComponent(`Portfolio Inquiry from ${pendingFormData.name}`);
      const body = encodeURIComponent(
        `Hi Parag,\n\n${pendingFormData.message}\n\n---\nFrom: ${pendingFormData.name}\nReply to: ${pendingFormData.email}`
      );
      window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

      if (formGuideModal) {
        formGuideModal.classList.remove('is-active');
        document.body.classList.remove('modal-lock');
      }

      if (contactForm) contactForm.reset();
      showToast('Opening your default email client...');
    });
  }

  // 9. Current Year in Footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 10. Motion Primitives: Interactive 3D Card Tilt & Glare Effect
  const tiltCards = document.querySelectorAll('.tilt-card');
  const prefersReducedMotionCheck = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotionCheck && tiltCards.length > 0) {
    tiltCards.forEach(card => {
      // Inject specular glare element if not present
      if (!card.querySelector('.card-glare')) {
        const glare = document.createElement('div');
        glare.className = 'card-glare';
        card.appendChild(glare);
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
        card.style.setProperty('--mouse-x', `${(x / rect.width * 100).toFixed(1)}%`);
        card.style.setProperty('--mouse-y', `${(y / rect.height * 100).toFixed(1)}%`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  const cardSelector = [
    '.about-card',
    '.pillar-item',
    '.skill-card',
    '.project-card',
    '.pr-card',
    '.timeline-content-card',
    '.education-card',
    '.worldquant-card',
    '.to-achieve-card',
    '.activity-card',
    '.contact-info-panel',
    '.contact-form-card',
    '.os-spotlight-card'
  ].join(', ');

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (finePointer.matches && !prefersReducedMotionCheck) {
    const cursor = document.createElement('div');
    const cursorLabel = document.createElement('span');
    cursor.className = 'motion-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.appendChild(cursorLabel);
    document.body.appendChild(cursor);
    document.body.classList.add('has-motion-cursor');

    document.addEventListener('pointermove', event => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
    }, { passive: true });

    function updateCursor(target) {
      const interactiveTarget = target instanceof Element
        ? target.closest('a, button, [data-cursor-label], .project-card')
        : null;
      const labeledTarget = target instanceof Element
        ? target.closest('[data-cursor-label], .project-card')
        : null;
      cursor.classList.toggle('is-active', Boolean(interactiveTarget));
      cursorLabel.textContent = labeledTarget
        ? (labeledTarget.getAttribute('data-cursor-label') || 'View')
        : '';
    }

    document.addEventListener('pointerover', event => updateCursor(event.target));

    document.addEventListener('pointerout', event => {
      updateCursor(event.relatedTarget);
    });

    document.querySelectorAll('a.btn, button.btn').forEach(button => {
      button.addEventListener('pointermove', event => {
        const bounds = button.getBoundingClientRect();
        const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
        const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
        button.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
      });
      button.addEventListener('pointerleave', () => {
        button.style.translate = '0px 0px';
      });
    });
  }

  document.addEventListener('click', (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!(event.target instanceof Element)) return;

    const card = event.target.closest(cardSelector);
    if (!card || typeof card.animate !== 'function') return;

    const restingTransform = getComputedStyle(card).transform;
    const pressedTransform = restingTransform === 'none'
      ? 'scale(0.985)'
      : `${restingTransform} scale(0.985)`;

    card.animate([
      { transform: restingTransform },
      { transform: pressedTransform, offset: 0.45 },
      { transform: restingTransform }
    ], {
      duration: 240,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
    });
  });
});
