document.addEventListener('DOMContentLoaded', function() {
    document.documentElement.classList.add('js-loaded');
    
    initNavigation();
    initScrollAnimations();
    initNewMobileMenu();
    initDesktopSubmenu();
    initSmoothScrolling();
    initRotatingText();
    initMobileLogoHide();
});

function initNavigation() {
    const desktopNav = document.getElementById('desktopNav');
    if (!desktopNav) return;
    
    let ticking = false;
    let wasScrolled = false;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        const isScrolled = scrollY > 50;
        
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

// Mobile menu initialization
function initNewMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileMenuOverlay');
  const closeBtn = document.getElementById('mobileMenuClose');

  if (!toggle || !menu || !overlay) return;

  let isOpen = false;

  function openMenu() {
    if (isOpen) return;
    isOpen = true;
    toggle.setAttribute('aria-expanded', 'true');
    menu.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!isOpen) return;
    isOpen = false;
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', openMenu, { passive: true });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeMenu();
    }, { passive: false });
  }
  
  overlay.addEventListener('click', function(e) {
    if (!menu.contains(e.target)) {
      closeMenu();
    }
  }, { passive: true });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  }, { passive: true });
  
  menu.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(closeMenu, 150);
    }, { passive: true });
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


// Rotating text animation
function initRotatingText() {
    const rotatingText = document.getElementById('rotatingText');
    if (!rotatingText) return;
    
    const words = ['werken', 'converteren', 'groeien', 'presteren'];
    let currentIndex = 0;
    
    function rotateText() {
        rotatingText.style.opacity = '0';
        rotatingText.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % words.length;
            rotatingText.textContent = words[currentIndex];
            rotatingText.style.opacity = '1';
            rotatingText.style.transform = 'translateY(0)';
        }, 300);
    }
    
    rotatingText.textContent = words[0];
    rotatingText.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    setTimeout(() => {
        rotateText();
        setInterval(rotateText, 3000);
    }, 2000);
}

// Hide mobile logo when scrolling down
function initMobileLogoHide() {
    const logoContainer = document.getElementById('mobileHeroLogo');
    if (!logoContainer) return;
    
    let ticking = false;
    
    function updateLogoVisibility() {
        const scrollY = window.scrollY;
        
        requestAnimationFrame(() => {
            if (scrollY > 50) {
                logoContainer.style.opacity = '0';
                logoContainer.style.pointerEvents = 'none';
            } else {
                logoContainer.style.opacity = '1';
                logoContainer.style.pointerEvents = 'auto';
            }
            ticking = false;
        });
    }
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateLogoVisibility);
            ticking = true;
        }
    }
    
    logoContainer.style.transition = 'opacity 0.3s ease-out';
    window.addEventListener('scroll', onScroll, { passive: true });
    updateLogoVisibility();
}
