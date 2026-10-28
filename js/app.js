/**
 * Parag Rajeshkumar Sanghavi - Portfolio Main Script
 * Handles navigation, mobile menu, scroll spy, project modals,
 * contact form verification, email copy, and theme accents.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Theme & Accent State
  const savedAccent = localStorage.getItem('parag_accent') || 'blue';
  applyAccent(savedAccent);

  const accentBtn = document.getElementById('accent-toggle');
  if (accentBtn) {
    accentBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-accent') || 'blue';
      const next = current === 'blue' ? 'violet' : (current === 'violet' ? 'emerald' : 'blue');
      applyAccent(next);
      localStorage.setItem('parag_accent', next);
    });
  }

  function applyAccent(accent) {
    document.documentElement.setAttribute('data-accent', accent);
    const label = document.getElementById('accent-label');
    if (label) {
      label.textContent = accent.charAt(0).toUpperCase() + accent.slice(1);
    }
    // Update canvas color palette if available
    if (window.updateCanvasColors) {
      if (accent === 'violet') {
        window.updateCanvasColors({ r: 168, g: 85, b: 247 }, { r: 236, g: 72, b: 153 });
      } else if (accent === 'emerald') {
        window.updateCanvasColors({ r: 52, g: 211, b: 153 }, { r: 56, g: 189, b: 248 });
      } else {
        window.updateCanvasColors({ r: 56, g: 189, b: 248 }, { r: 168, g: 85, b: 247 });
      }
    }
  }

  // 2. Mobile Navigation Drawer
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('nav-lock', isOpen);
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-lock');
      });
    });
  }

  // 3. Header Scroll Effect & Back-to-Top Button
  const header = document.getElementById('main-header');
  const backToTopBtn = document.getElementById('back-to-top');

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
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Scroll Spy Navigation Highlight
  const sections = document.querySelectorAll('section[id]');
  function updateScrollSpy() {
    const scrollY = window.pageYOffset;
    const headerHeight = header ? header.offsetHeight + 40 : 100;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - headerHeight;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  updateScrollSpy();

  // 5. Scroll Reveal Animation using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
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
});
