// Coding2Projects - Main Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initDomainFilters();
  initProjectCalculator();
  initFAQAccordion();
  initModals();
});

// Mobile Navigation Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
    });
  }

  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    });
  }

  // Close menu when clicking links
  const links = mobileMenu?.querySelectorAll('a');
  links?.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    });
  });
}

// Domain Filtering System
function initDomainFilters() {
  const filterBtns = document.querySelectorAll('.domain-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active state
      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-500/30');
        b.classList.add('bg-slate-800/80', 'text-slate-300', 'hover:bg-slate-700');
      });
      btn.classList.remove('bg-slate-800/80', 'text-slate-300', 'hover:bg-slate-700');
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-500/30');

      // Filter cards
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Project Package Estimator
function initProjectCalculator() {
  const degreeSelect = document.getElementById('calc-degree');
  const domainSelect = document.getElementById('calc-domain');
  const deliverableCheckboxes = document.querySelectorAll('.calc-deliverable');
  const estTimeline = document.getElementById('est-timeline');
  const estDeliverablesCount = document.getElementById('est-deliverables-count');
  const whatsappCtaBtn = document.getElementById('calc-whatsapp-btn');

  if (!degreeSelect || !domainSelect) return;

  function updateEstimate() {
    const degree = degreeSelect.value;
    const domain = domainSelect.value;
    
    let selectedDeliverables = [];
    deliverableCheckboxes.forEach(cb => {
      if (cb.checked) {
        selectedDeliverables.push(cb.value);
      }
    });

    // Timeline calculation rules
    let baseDays = 3;
    if (degree === 'M.E / M.Tech') baseDays += 2;
    if (domain === 'ai-ml' || domain === 'iot') baseDays += 2;
    if (selectedDeliverables.length > 3) baseDays += 1;

    estTimeline.textContent = `${baseDays} - ${baseDays + 3} Days`;
    estDeliverablesCount.textContent = `${selectedDeliverables.length} Deliverables Included`;

    // Construct WhatsApp message
    const msg = `Hi Coding2Projects! 🚀%0A%0AI would like to get a quote & details for my final year project:%0A🎓 *Degree:* ${degree}%0A💻 *Domain:* ${domain}%0A📦 *Deliverables Needed:* ${selectedDeliverables.join(', ')}.%0A%0APlease guide me with available project ideas and pricing!`;
    
    whatsappCtaBtn.href = `https://wa.me/917397730585?text=${msg}`;
  }

  degreeSelect.addEventListener('change', updateEstimate);
  domainSelect.addEventListener('change', updateEstimate);
  deliverableCheckboxes.forEach(cb => cb.addEventListener('change', updateEstimate));

  // Initial run
  updateEstimate();
}

// Accordions for FAQ
function initFAQAccordion() {
  const faqToggles = document.querySelectorAll('.faq-toggle');

  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const icon = toggle.querySelector('.faq-icon');

      const isHidden = content.classList.contains('hidden');

      // Close all
      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

      // If it was hidden, open it
      if (isHidden) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

// Modal handling
function initModals() {
  const openBtns = document.querySelectorAll('.open-inquiry-modal');
  const closeBtns = document.querySelectorAll('.close-inquiry-modal');
  const modal = document.getElementById('inquiry-modal');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const domain = btn.getAttribute('data-domain') || 'Project Inquiry';
      const domainInput = document.getElementById('modal-domain-input');
      if (domainInput) domainInput.value = domain;
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  });

  // Handle modal background click
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });
}

// Utility function to copy email/phone
window.copyToClipboard = function(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    alert(`${label} copied to clipboard: ${text}`);
  }).catch(() => {
    prompt(`Copy this ${label}:`, text);
  });
};
