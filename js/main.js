document.addEventListener('DOMContentLoaded', function() {
    document.documentElement.classList.add('js-loaded');
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    initNavigation();
    initTypewriter();
    initScrollAnimations();
    initMobileMenu();
    initNewMobileMenu();
    initDesktopSubmenu();
    initSmoothScrolling();
    initActivePageHighlighting();
});

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const desktopNav = document.getElementById('desktopNav');
    
    let ticking = false;
    let wasScrolled = false;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        const isScrolled = scrollY > 50;
        
        if (desktopNav) {
            if (isScrolled !== wasScrolled) {
                requestAnimationFrame(() => {
                    if (isScrolled) {
                        desktopNav.classList.add('scrolled');
                    } else {
                        desktopNav.classList.remove('scrolled');
                    }
                    wasScrolled = isScrolled;
                });
            }
        }
        
        if (navbar) {
            const navbarScrolled = scrollY > 20;
            requestAnimationFrame(() => {
                if (navbarScrolled) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
            });
        }
        
        ticking = false;
    }
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    updateNavbar();
}

function initTypewriter() {
    const texts = [
        "Digitale Oplossingen Die Uw Bedrijf Laten Groeien",
        "Moderne Websites Die Converteren",
        "E-commerce Platforms Die Verkopen"
    ];
    
    const typewriterElement = document.getElementById('typewriter-text');
    
    if (!typewriterElement) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    let lastTime = 0;
    let animationFrameId = null;
    let isVisible = false;
    
    function type(currentTime) {
        if (!isVisible) return;
        
        if (!lastTime) lastTime = currentTime;
        const deltaTime = currentTime - lastTime;
        
        if (deltaTime >= typeSpeed) {
            lastTime = currentTime;
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
        }
        
        animationFrameId = requestAnimationFrame(type);
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isVisible = true;
                if (!animationFrameId) {
                    animationFrameId = requestAnimationFrame(type);
                }
            } else {
                isVisible = false;
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(typewriterElement);
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll(
        '.animate-on-scroll, .scroll-reveal, .scroll-animate, .scroll-animate-left, .scroll-animate-right, .stagger-children, .fade-in'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

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
            
            lucide.createIcons();
        });
        
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="h-6 w-6"></i>';
                lucide.createIcons();
            });
        });
    }
}

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

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

function initNewMobileMenu() {
  const toggleBtn = document.getElementById('newMobileMenuBtn');
  const closeBtn = document.getElementById('closeMobileMenuBtn');
  const menu = document.getElementById('newMobileMenu');
  const overlay = document.getElementById('newMobileMenuOverlay');

  if (!toggleBtn || !menu || !overlay) return;

  const isMenuOpen = () => menu.classList.contains('menu-open');

  function openMenu() {
    if (isMenuOpen()) return;
    
    requestAnimationFrame(() => {
      menu.classList.add('menu-open');
      overlay.classList.add('active');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeMenu() {
    if (!isMenuOpen()) return;
    
    requestAnimationFrame(() => {
      menu.classList.remove('menu-open');
      overlay.classList.remove('active');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  }

  toggleBtn.setAttribute('aria-controls', 'newMobileMenu');
  toggleBtn.setAttribute('aria-expanded', 'false');

  toggleBtn.addEventListener('click', () => {
    (isMenuOpen() ? closeMenu : openMenu)();
  });

  overlay.addEventListener('click', closeMenu);

  if (closeBtn) {
    closeBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      closeMenu();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMenuOpen()) {
      closeMenu();
    }
  });

  document.querySelectorAll('.new-dropdown-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const content = this.nextElementSibling;
      const arrow = this.querySelector('.new-dropdown-arrow');
      if (!content) return;
      
      const isOpen = content.classList.contains('open');

      requestAnimationFrame(() => {
        content.classList.toggle('open', !isOpen);
        if (arrow) arrow.classList.toggle('rotate', !isOpen);
        this.classList.toggle('open', !isOpen);
      });
    });
  });
}

function initDesktopSubmenu() {
  const dienstenBtn = document.getElementById('dienstenBtn');
  const dienstenSubmenu = document.getElementById('dienstenSubmenu');
  
  if (!dienstenBtn || !dienstenSubmenu) return;
  
  let hideTimeout;
  let rafId = null;
  
  function positionSubmenu() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      const btnRect = dienstenBtn.getBoundingClientRect();
      dienstenSubmenu.style.left = btnRect.left + 'px';
      dienstenSubmenu.style.top = (btnRect.bottom + 8) + 'px';
      rafId = null;
    });
  }
  
  function showSubmenu() {
    clearTimeout(hideTimeout);
    positionSubmenu();
    dienstenSubmenu.style.opacity = '1';
    dienstenSubmenu.style.visibility = 'visible';
    dienstenSubmenu.style.transform = 'translate3d(0, 0, 0)';
  }
  
  function hideSubmenu() {
    hideTimeout = setTimeout(() => {
      dienstenSubmenu.style.opacity = '0';
      dienstenSubmenu.style.visibility = 'hidden';
      dienstenSubmenu.style.transform = 'translate3d(0, -10px, 0)';
    }, 150);
  }
  
  dienstenBtn.addEventListener('mouseenter', showSubmenu);
  dienstenBtn.addEventListener('mouseleave', hideSubmenu);
  dienstenSubmenu.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
  dienstenSubmenu.addEventListener('mouseleave', hideSubmenu);
  
  const throttledPosition = debounce(positionSubmenu, 16);
  window.addEventListener('scroll', throttledPosition, { passive: true });
  window.addEventListener('resize', throttledPosition, { passive: true });
}

function initActivePageHighlighting() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage)) {
      link.classList.add('active');
    }
  });
}
