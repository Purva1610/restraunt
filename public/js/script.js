// Handle Reservation Form
document.getElementById('reservationForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    name: e.target[0].value,
    email: e.target[1].value,
    phone: e.target[2].value,
    date: e.target[3].value,
    time: e.target[4].value,
    guests: e.target[5].value
  };

  try {
    const response = await fetch('/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    
    if (result.success) {
      alert('✅ ' + result.message);
      e.target.reset();
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ Failed to submit reservation. Please try again.');
  }
});

// Handle Contact Form
document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    name: e.target[0].value,
    email: e.target[1].value,
    message: e.target[5].value
  };

  try {
    const response = await fetch('/contact-us', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    
    if (result.success) {
      alert('✅ ' + result.message);
      e.target.reset();
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ Failed to send message. Please try again.');
  }
});

// Smooth scrolling for anchor links
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

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
  } else {
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
});

// Format phone number input
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
  input.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
      if (value.length <= 2) {
        value = value;
      } else if (value.length <= 5) {
        value = value.slice(0, 2) + ' ' + value.slice(2);
      } else if (value.length <= 10) {
        value = value.slice(0, 2) + ' ' + value.slice(2, 5) + ' ' + value.slice(5);
      } else {
        value = value.slice(0, 2) + ' ' + value.slice(2, 5) + ' ' + value.slice(5, 10);
      }
    }
    e.target.value = value;
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.dish-card, .feature, .info-box, .menu-category').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
