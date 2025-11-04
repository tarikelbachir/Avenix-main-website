// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add js-loaded class to enable animations
    document.documentElement.classList.add('js-loaded');
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize all components
    initNavigation();
    initTypewriter();
    initScrollAnimations();
    initMobileMenu();
    initNewMobileMenu();
    initSmoothScrolling();
});

// Navigation scroll effect
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const desktopNav = document.getElementById('desktopNav');
    
    window.addEventListener('scroll', function() {
        if (navbar && window.scrollY > 20) {
            navbar.classList.add('navbar-scrolled');
        } else if (navbar) {
            navbar.classList.remove('navbar-scrolled');
        }

        if (desktopNav) {
            if (window.scrollY > 50) {
                desktopNav.classList.add('scrolled');
            } else {
                desktopNav.classList.remove('scrolled');
            }
        }
    });
}

// Typewriter effect
function initTypewriter() {
    const texts = [
        "Digitale Oplossingen Die Uw Bedrijf Laten Groeien",
        "Moderne Websites Die Converteren",
        "E-commerce Platforms Die Verkopen"
    ];
    
    const typewriterElement = document.getElementById('typewriter-text');
    const cursor = document.getElementById('cursor');
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    if (typewriterElement) {
        type();
    }
}

// Scroll animations - Unified voor alle animatie classes
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.add('revealed');
                // Stop met observeren na reveal voor betere performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe alle elementen met scroll animatie classes
    const animateElements = document.querySelectorAll(
        '.animate-on-scroll, .scroll-reveal, .scroll-animate, .scroll-animate-left, .scroll-animate-right, .stagger-children, .fade-in'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = !mobileMenu.classList.contains('hidden');
            
            if (isOpen) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="h-6 w-6"></i>';
            } else {
                mobileMenu.classList.remove('hidden');
                mobileMenuBtn.innerHTML = '<i data-lucide="x" class="h-6 w-6"></i>';
            }
            
            // Reinitialize icons after DOM change
            lucide.createIcons();
        });
        
        // Close mobile menu when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="h-6 w-6"></i>';
                lucide.createIcons();
            });
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Nieuw mobiel menu (moderne versie)
function initNewMobileMenu() {
  const toggleBtn = document.getElementById('newMobileMenuBtn');
  const closeBtn = document.getElementById('closeMobileMenuBtn');
  const menu = document.getElementById('newMobileMenu');
  const overlay = document.getElementById('newMobileMenuOverlay');

  if (!toggleBtn || !menu || !overlay) return;

  const isMenuOpen = () => menu.classList.contains('menu-open');

  function openMenu() {
    if (isMenuOpen()) return;
    menu.classList.add('menu-open');
    overlay.classList.add('active');
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!isMenuOpen()) return;
    menu.classList.remove('menu-open');
    overlay.classList.remove('active');
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.setAttribute('aria-controls', 'newMobileMenu');
  toggleBtn.setAttribute('aria-expanded', 'false');

  toggleBtn.addEventListener('click', (event) => {
    event.preventDefault();
    (isMenuOpen() ? closeMenu : openMenu)();
  });

  overlay.addEventListener('click', (event) => {
    event.preventDefault();
    closeMenu();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeMenu();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  // Dropdown functionaliteit voor "Diensten"
  document.querySelectorAll('.new-dropdown-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const arrow = this.querySelector('.new-dropdown-arrow');
      const isOpen = content.classList.contains('open');

      content.classList.toggle('open', !isOpen);
      arrow.classList.toggle('rotate', !isOpen);
      this.classList.toggle('open', !isOpen);
    });
  });
}
