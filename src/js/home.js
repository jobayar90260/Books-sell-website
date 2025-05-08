// DOM Elements
const featuredBooksContainer = document.getElementById('featured-books');

// Populate featured books
function populateFeaturedBooks() {
  if (!featuredBooksContainer) return;
  
  const featuredBooks = window.booksAPI.getFeaturedBooks();
  
  featuredBooksContainer.innerHTML = '';
  
  featuredBooks.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.setAttribute('data-aos', 'fade-up');
    bookCard.setAttribute('data-aos-delay', `${index * 100}`);
    
    const discount = book.originalPrice > book.price 
      ? Math.round((1 - book.price / book.originalPrice) * 100) 
      : null;
    
    bookCard.innerHTML = `
      <div class="book-cover">
        <img src="${book.coverImage}" alt="${book.title}" loading="lazy">
        <div class="book-overlay">
          <a href="book-detail.html?id=${book.id}" class="btn btn-primary">View Details</a>
        </div>
      </div>
      <div class="book-details">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">by ${book.author}</p>
        <div class="rating">
          ${window.utils.createStarRating(book.rating)}
          <span class="rating-count">(${book.reviewCount})</span>
        </div>
        <div class="book-price">
          <span class="price">$${book.price.toFixed(2)}</span>
          ${discount ? `<span class="discount">-${discount}%</span>` : ''}
          <button class="book-add-btn" data-book-id="${book.id}" aria-label="Add to cart">+</button>
        </div>
      </div>
    `;
    
    featuredBooksContainer.appendChild(bookCard);
  });
  
  // Add event listeners to "Add to cart" buttons
  document.querySelectorAll('.book-add-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const bookId = parseInt(button.dataset.bookId);
      const book = window.booksAPI.getBookById(bookId);
      if (book) {
        window.cartUtils.addToCart(book);
      }
    });
  });
}

// Handle newsletter form submission
function setupNewsletterForm() {
  const newsletterForm = document.getElementById('newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (email) {
        // In a real app, you would send this to your backend
        console.log('Newsletter signup:', email);
        
        // Clear the input and show success message
        emailInput.value = '';
        showNotification('Thank you for subscribing to our newsletter!');
      }
    });
  }
}

// Add animation to hero section
function animateHero() {
  const heroContent = document.querySelector('.hero-content');
  const heroImage = document.querySelector('.hero-image');
  
  if (heroContent && heroImage) {
    heroContent.classList.add('fade-in');
    heroImage.classList.add('fade-in');
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  populateFeaturedBooks();
  setupNewsletterForm();
  animateHero();
});

// Show notification
function showNotification(message) {
  if (window.cartUtils && window.cartUtils.showNotification) {
    window.cartUtils.showNotification(message);
    return;
  }
  
  // Fallback if the main notification function isn't available
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