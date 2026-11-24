document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  function closeMobileMenu() {
    if (navLinks && mobileToggle) {
      navLinks.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when tapping outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close menu when selecting a standard nav link
    navLinks.querySelectorAll('a.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }

  // 2. Services Dropdown Menu
  const dropdownBtn = document.getElementById('servicesDropdownBtn');
  const dropdownMenu = document.getElementById('servicesDropdownMenu');

  if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      dropdownMenu.classList.remove('show');
    });
  }

  // 3. Booking Modal Logic
  const bookingModal = document.getElementById('bookingModal');
  const closeBookingModal = document.getElementById('closeBookingModal');
  const openBookingBtns = document.querySelectorAll('.open-booking');
  const shootTypeSelect = document.getElementById('shootType');
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccess = document.getElementById('bookingSuccess');
  const bookedServiceLabel = document.getElementById('bookedServiceLabel');

  function openBookingWithService(serviceName) {
    closeMobileMenu();
    if (serviceName && shootTypeSelect) {
      shootTypeSelect.value = serviceName;
    }
    bookingSuccess.style.display = 'none';
    bookingModal.classList.add('open');
  }

  openBookingBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingWithService();
    });
  });

  document.querySelectorAll('[data-service]').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedService = item.getAttribute('data-service');
      openBookingWithService(selectedService);
    });
  });

  if (closeBookingModal) {
    closeBookingModal.addEventListener('click', () => {
      bookingModal.classList.remove('open');
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      bookedServiceLabel.textContent = shootTypeSelect.value;
      bookingSuccess.style.display = 'block';
      bookingForm.reset();
    });
  }

  // 4. Gallery Modal Logic
  const galleryModal = document.getElementById('galleryModal');
  const closeGalleryModal = document.getElementById('closeGalleryModal');
  const viewGalleryBtn = document.getElementById('viewGalleryBtn');
  const navGalleryBtn = document.getElementById('navGalleryBtn');

  [viewGalleryBtn, navGalleryBtn].forEach((btn) => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeMobileMenu();
        galleryModal.classList.add('open');
      });
    }
  });

  if (closeGalleryModal) {
    closeGalleryModal.addEventListener('click', () => {
      galleryModal.classList.remove('open');
    });
  }

  // 5. "Know More" button
  const knowMoreBtn = document.getElementById('knowMoreBtn');
  if (knowMoreBtn) {
    knowMoreBtn.addEventListener('click', () => {
      openBookingWithService('Wedding Photography');
    });
  }

  // Close modals on outside click
  [bookingModal, galleryModal].forEach((modal) => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
        }
      });
    }
  });
});