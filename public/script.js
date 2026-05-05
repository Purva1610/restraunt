// Mobile Navigation Toggle
function initMobileNav() {
    const navMenu = document.querySelector('.nav-menu');
    
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

// Reservation Form
function initReservationForm() {
    const form = document.getElementById('reservationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            if (!validateReservation(data)) {
                return;
            }
            
            // Send to backend API
            fetch('/api/reserve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                const messageDiv = document.getElementById('res-message');
                if (result.success) {
                    messageDiv.className = 'form-message success';
                    messageDiv.innerHTML = '✓ ' + result.message;
                    form.reset();
                } else {
                    messageDiv.className = 'form-message error';
                    messageDiv.innerHTML = '✗ ' + result.message;
                }
                setTimeout(() => {
                    messageDiv.className = 'form-message';
                }, 5000);
            })
            .catch(error => {
                console.error('Error:', error);
                const messageDiv = document.getElementById('res-message');
                messageDiv.className = 'form-message error';
                messageDiv.innerHTML = '✗ Error submitting reservation';
            });
        });
    }
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            if (!validateContact(data)) {
                return;
            }
            
            // Send to backend API
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                const messageDiv = document.getElementById('con-message-div');
                if (result.success) {
                    messageDiv.className = 'form-message success';
                    messageDiv.innerHTML = '✓ ' + result.message;
                    form.reset();
                } else {
                    messageDiv.className = 'form-message error';
                    messageDiv.innerHTML = '✗ ' + result.message;
                }
                setTimeout(() => {
                    messageDiv.className = 'form-message';
                }, 5000);
            })
            .catch(error => {
                console.error('Error:', error);
                const messageDiv = document.getElementById('con-message-div');
                messageDiv.className = 'form-message error';
                messageDiv.innerHTML = '✗ Error sending message';
            });
        });
    }
}

function validateReservation(data) {
    if (!data.name || !data.email || !data.date || !data.time || !data.guests) {
        alert('Please fill in all required fields');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert('Please select a future date');
        return false;
    }
    
    return true;
}

function validateContact(data) {
    if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    return true;
}

// Set minimum date to today
function setMinDate() {
    const dateInput = document.getElementById('res-date');
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
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if ((href === '/' && currentPath === '/') ||
            (href !== '/' && currentPath.includes(href))) {
            link.classList.add('active');
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

// Add interactivity to dish cards
function initDishCards() {
    const dishCards = document.querySelectorAll('.dish-card');
    
    dishCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initReservationForm();
    initContactForm();
    setMinDate();
    initSmoothScroll();
    setActiveNav();
    initDishCards();
});
