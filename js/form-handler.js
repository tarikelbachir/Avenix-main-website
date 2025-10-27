// js/form-handler.js
// Universal form handler voor contact en intake formulieren

(function() {
  'use strict';

  // Initialize form handlers when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormHandlers);
  } else {
    initFormHandlers();
  }

  function initFormHandlers() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Intake form
    const intakeForm = document.getElementById('intakeForm');
    if (intakeForm) {
      intakeForm.addEventListener('submit', handleFormSubmit);
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (!submitBtn) {
      console.error('Submit button not found');
      return;
    }

    const originalText = submitBtn.innerHTML;
    
    // Disable form and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin h-5 w-5 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Verzenden...
    `;
    
    try {
      const formData = new FormData(form);
      
      // Call Cloudflare Pages Function
      const response = await fetch('/send-email', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        // Success
        showNotification(
          '✅ ' + (result.message || 'Bericht succesvol verzonden! We nemen zo snel mogelijk contact met je op.'),
          'success'
        );
        form.reset();
        
        // Optional: Track conversion (Google Analytics, Facebook Pixel, etc.)
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submission', {
            event_category: 'engagement',
            event_label: formData.get('form_type') || 'contact'
          });
        }
      } else {
        // Error from server
        showNotification(
          '❌ ' + (result.error || 'Er is een fout opgetreden. Probeer het opnieuw.'),
          'error'
        );
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showNotification(
        '❌ Netwerkfout. Controleer je internetverbinding en probeer opnieuw.',
        'error'
      );
    } finally {
      // Restore button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }

  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelectorAll('.form-notification');
    existing.forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `form-notification fixed top-4 right-4 z-[9999] p-4 rounded-lg shadow-2xl transition-all duration-300 transform translate-x-full max-w-md ${
      type === 'success' ? 'bg-green-500 text-white' : 
      type === 'error' ? 'bg-red-500 text-white' : 
      'bg-blue-500 text-white'
    }`;
    notification.style.minWidth = '300px';
    notification.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="flex-1">${message}</div>
        <button onclick="this.parentElement.parentElement.remove()" class="text-white/80 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 7 seconds
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 300);
    }, 7000);
  }

  // Client-side validation helpers (optional enhancement)
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return phone.length >= 10 && re.test(phone);
  }
})();

