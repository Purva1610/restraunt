// Mobile Navigation Toggle
function initMobileNav() {
    const navMenu = document.querySelector('.nav-menu');
    const navContainer = document.querySelector('.nav-container');
    
    // Add hamburger menu button for mobile
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
}

function createMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const existingToggle = document.querySelector('.nav-toggle');
    
    if (!existingToggle && window.innerWidth <= 768) {
        const toggle = document.createElement('button');
        toggle.className = 'nav-toggle';
        toggle.innerHTML = '☰';
        navContainer.appendChild(toggle);
        
        toggle.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// Form Validation
function initReservationForm() {
    const form = document.getElementById('reservationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!validateForm(data)) {
                return;
            }
            
            // Show success message
            showSuccessMessage(form);
            
            // Reset form
            form.reset();
        });
    }
}

function validateForm(data) {
    // Check if all required fields are filled
    if (!data.name || !data.email || !data.phone || !data.date || !data.time || !data.guests) {
        alert('Please fill in all required fields');
        return false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    // Validate phone
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(data.phone)) {
        alert('Please enter a valid phone number');
        return false;
    }
    
    // Validate date (must be in the future)
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert('Please select a future date');
        return false;
    }
    
    return true;
}

function showSuccessMessage(form) {
    // Create and show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <h3>✓ Reservation Requested!</h3>
        <p>Thank you for your reservation request. We will confirm within 24 hours.</p>
    `;
    
    form.parentNode.insertBefore(successMsg, form);
    
    // Add styling
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            background-color: #d4af37;
            color: #1a1a1a;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            text-align: center;
            animation: slideIn 0.3s ease;
        }
        
        .success-message h3 {
            margin-bottom: 0.5rem;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 5000);
}

// Set minimum date to today
function setMinDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Set Active Navigation Link
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Lazy Loading for Images (future enhancement)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Scroll Animation for Elements
function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Optional: add scroll-animate class to elements you want to animate
    document.querySelectorAll('.scroll-animate').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Update Current Year in Footer
function updateFooterYear() {
    const currentYear = new Date().getFullYear();
    const footers = document.querySelectorAll('.footer p');
    
    footers.forEach(footer => {
        if (footer.textContent.includes('2026')) {
            footer.textContent = footer.textContent.replace('2026', currentYear);
        }
    });
}

// Handle Window Resize for Responsive Menu
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const toggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth > 768) {
            if (toggle) toggle.remove();
            if (navMenu) navMenu.style.display = '';
        } else {
            if (!toggle) createMobileMenu();
        }
    }, 250);
});

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initReservationForm();
    setMinDate();
    initSmoothScroll();
    setActiveNav();
    initLazyLoading();
    initScrollAnimation();
    updateFooterYear();
});

// Add some interactivity to dish cards
document.addEventListener('DOMContentLoaded', function() {
    const dishCards = document.querySelectorAll('.dish-card');
    
    dishCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Contact information quick links
function initContactLinks() {
    const emailLink = document.querySelector('a[href^="mailto"]');
    const phoneLink = document.querySelector('a[href^="tel"]');
    
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            // Allow default mailto behavior
        });
    }
    
    if (phoneLink) {
        phoneLink.addEventListener('click', function(e) {
            // Allow default tel behavior
        });
    }
}

document.addEventListener('DOMContentLoaded', initContactLinks);
