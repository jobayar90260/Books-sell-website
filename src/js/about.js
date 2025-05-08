// DOM Elements
const contactForm = document.getElementById('contact-form');

// Set up the contact form
function setupContactForm() {
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // In a real app, you would send this to your backend
    console.log('Contact form submitted:', { name, email, subject, message });
    
    // Show success message
    contactForm.innerHTML = `
      <div class="contact-success">
        <h2>Message Sent!</h2>
        <p>Thank you for contacting us. We will get back to you as soon as possible.</p>
      </div>
    `;
    
    // Show notification
    showNotification('Your message has been sent successfully!');
  });
}

// Add animation to about sections
function addAnimations() {
  const sections = document.querySelectorAll('.about-grid, .values-grid, .team-grid');
  
  function checkScroll() {
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.85) {
        section.classList.add('fade-in');
      }
    });
  }
  
  // Initial check
  checkScroll();
  
  // Add scroll listener
  window.addEventListener('scroll', checkScroll);
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification slide-in-right';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.remove('slide-in-right');
    notification.classList.add('slide-out-right');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Scroll to contact section if URL has #contact
function scrollToContactIfNeeded() {
  if (window.location.hash === '#contact') {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      setTimeout(() => {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  setupContactForm();
  addAnimations();
  scrollToContactIfNeeded();
});