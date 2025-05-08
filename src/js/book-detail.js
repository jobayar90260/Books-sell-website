// DOM Elements
const bookContainer = document.getElementById('book-container');
const bookTitleBreadcrumb = document.getElementById('book-title-breadcrumb');
const bookDescription = document.getElementById('book-description');
const bookDetailsTable = document.getElementById('book-details-table');
const overallRating = document.getElementById('overall-rating');
const ratingValue = document.getElementById('rating-value');
const totalReviews = document.getElementById('total-reviews');
const ratingBreakdown = document.getElementById('rating-breakdown');
const reviewList = document.getElementById('review-list');
const reviewCount = document.getElementById('review-count');
const relatedBooksContainer = document.getElementById('related-books');
const reviewForm = document.getElementById('review-form');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Current book
let currentBook = null;

// Initialize book detail page
function initBookDetail() {
  loadBookFromURL();
  setupTabNavigation();
  setupReviewForm();
}

// Load book based on URL parameter
function loadBookFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = parseInt(urlParams.get('id'));
  
  if (!bookId) {
    window.location.href = 'catalog.html';
    return;
  }
  
  const book = window.booksAPI.getBookById(bookId);
  
  if (!book) {
    window.location.href = 'catalog.html';
    return;
  }
  
  currentBook = book;
  
  // Update page title
  document.title = `${book.title} | Luminary Books`;
  
  // Update breadcrumb
  if (bookTitleBreadcrumb) {
    bookTitleBreadcrumb.textContent = book.title;
  }
  
  // Display book details
  displayBookDetails();
  
  // Update book description
  if (bookDescription) {
    bookDescription.innerHTML = `<p>${book.description}</p>`;
  }
  
  // Update book details table
  displayBookDetailsTable();
  
  // Update reviews
  displayReviews();
  
  // Display related books
  displayRelatedBooks();
}

// Display book details
function displayBookDetails() {
  if (!bookContainer || !currentBook) return;
  
  const discount = currentBook.originalPrice > currentBook.price 
    ? Math.round((1 - currentBook.price / currentBook.originalPrice) * 100) 
    : null;
  
  const badges = [];
  if (currentBook.new) badges.push('<span class="badge badge-new">New Release</span>');
  if (currentBook.bestseller) badges.push('<span class="badge badge-bestseller">Bestseller</span>');
  
  bookContainer.innerHTML = `
    <div class="book-image">
      <img src="${currentBook.coverImage}" alt="${currentBook.title}">
      ${badges.length > 0 ? `<div class="book-badges">${badges.join('')}</div>` : ''}
    </div>
    <div class="book-info">
      <h1 class="book-title-detail">${currentBook.title}</h1>
      <p class="book-author-detail">by ${currentBook.author}</p>
      
      <div class="book-meta">
        <div class="book-rating">
          <div class="book-rating-stars">
            ${window.utils.createStarRating(currentBook.rating)}
          </div>
          <span class="book-rating-count">${currentBook.reviewCount} reviews</span>
        </div>
        <div class="book-category">
          <span>Category:</span>
          <a href="catalog.html?genre=${encodeURIComponent(currentBook.genre.toLowerCase())}">${currentBook.genre}</a>
        </div>
      </div>
      
      <div class="book-price-detail">
        <span class="current-price">$${currentBook.price.toFixed(2)}</span>
        ${discount ? `
          <span class="original-price">$${currentBook.originalPrice.toFixed(2)}</span>
          <span class="discount-badge">${discount}% OFF</span>
        ` : ''}
      </div>
      
      <p class="book-short-description">
        ${currentBook.description.split('.').slice(0, 2).join('.')}...
      </p>
      
      <div class="book-actions">
        <div class="quantity-control">
          <button class="quantity-btn decrease-quantity">-</button>
          <input type="number" value="1" min="1" class="quantity-input" id="book-quantity">
          <button class="quantity-btn increase-quantity">+</button>
        </div>
        <button class="btn btn-primary add-to-cart-btn">Add to Cart</button>
      </div>
      
      <div class="book-attributes">
        <div class="book-attribute">
          <span class="attribute-label">Publisher</span>
          <span class="attribute-value">${currentBook.publisher}</span>
        </div>
        <div class="book-attribute">
          <span class="attribute-label">Publication Date</span>
          <span class="attribute-value">${formatDate(currentBook.publishDate)}</span>
        </div>
        <div class="book-attribute">
          <span class="attribute-label">Pages</span>
          <span class="attribute-value">${currentBook.pages}</span>
        </div>
        <div class="book-attribute">
          <span class="attribute-label">Language</span>
          <span class="attribute-value">${currentBook.language}</span>
        </div>
      </div>
    </div>
  `;
  
  // Set up quantity control
  const decreaseBtn = bookContainer.querySelector('.decrease-quantity');
  const increaseBtn = bookContainer.querySelector('.increase-quantity');
  const quantityInput = bookContainer.querySelector('#book-quantity');
  const addToCartBtn = bookContainer.querySelector('.add-to-cart-btn');
  
  decreaseBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    if (value > 1) {
      quantityInput.value = value - 1;
    }
  });
  
  increaseBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    quantityInput.value = value + 1;
  });
  
  addToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(quantityInput.value);
    window.cartUtils.addToCart(currentBook, quantity);
  });
}

// Display book details in table
function displayBookDetailsTable() {
  if (!bookDetailsTable || !currentBook) return;
  
  const details = [
    { label: 'Title', value: currentBook.title },
    { label: 'Author', value: currentBook.author },
    { label: 'Publisher', value: currentBook.publisher },
    { label: 'Publication Date', value: formatDate(currentBook.publishDate) },
    { label: 'Language', value: currentBook.language },
    { label: 'Pages', value: currentBook.pages },
    { label: 'ISBN', value: currentBook.isbn },
    { label: 'Dimensions', value: currentBook.dimensions },
    { label: 'Categories', value: currentBook.categories ? currentBook.categories.join(', ') : currentBook.genre }
  ];
  
  bookDetailsTable.innerHTML = '';
  
  details.forEach(detail => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <th>${detail.label}</th>
      <td>${detail.value}</td>
    `;
    bookDetailsTable.appendChild(row);
  });
}

// Display reviews
function displayReviews() {
  if (!currentBook || !currentBook.reviews) return;
  
  const reviews = currentBook.reviews;
  
  // Update review count
  if (reviewCount) {
    reviewCount.textContent = `(${reviews.length})`;
  }
  
  // Update overall rating
  if (overallRating && ratingValue && totalReviews) {
    overallRating.innerHTML = window.utils.createStarRating(currentBook.rating);
    ratingValue.textContent = currentBook.rating.toFixed(1);
    totalReviews.textContent = reviews.length;
  }
  
  // Generate rating breakdown
  if (ratingBreakdown) {
    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    
    reviews.forEach(review => {
      ratingCounts[review.rating]++;
    });
    
    ratingBreakdown.innerHTML = '';
    
    for (let i = 5; i >= 1; i--) {
      const count = ratingCounts[i] || 0;
      const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
      
      const row = document.createElement('div');
      row.className = 'rating-row';
      row.innerHTML = `
        <div class="rating-label">${i} stars</div>
        <div class="rating-bar-container">
          <div class="rating-bar" style="width: ${percentage}%"></div>
        </div>
        <div class="rating-count">${count}</div>
      `;
      
      ratingBreakdown.appendChild(row);
    }
  }
  
  // Display individual reviews
  if (reviewList) {
    reviewList.innerHTML = '';
    
    if (reviews.length === 0) {
      reviewList.innerHTML = `
        <div class="empty-reviews">
          <p>There are no reviews yet. Be the first to review this book!</p>
        </div>
      `;
      return;
    }
    
    reviews.forEach(review => {
      const reviewElement = document.createElement('div');
      reviewElement.className = 'review';
      reviewElement.innerHTML = `
        <div class="review-header">
          <div class="reviewer-info">
            <span class="reviewer-name">${review.name}</span>
            <span class="review-date">${formatDate(review.date)}</span>
          </div>
          <div class="review-rating">
            ${window.utils.createStarRating(review.rating)}
          </div>
        </div>
        <div class="review-text">
          ${review.text}
        </div>
        <div class="review-helpful">
          <span>Was this review helpful?</span>
          <button class="helpful-btn helpful-yes">Yes</button>
          <button class="helpful-btn helpful-no">No</button>
        </div>
      `;
      
      reviewList.appendChild(reviewElement);
    });
    
    // Add event listeners to helpful buttons
    document.querySelectorAll('.helpful-btn').forEach(button => {
      button.addEventListener('click', () => {
        const helpfulText = button.classList.contains('helpful-yes') ? 'Thank you for your feedback!' : 'Thank you for your feedback!';
        button.parentElement.innerHTML = `<span>${helpfulText}</span>`;
      });
    });
  }
}

// Display related books
function displayRelatedBooks() {
  if (!relatedBooksContainer || !currentBook) return;
  
  const relatedBooks = window.booksAPI.getRelatedBooks(currentBook.id);
  
  relatedBooksContainer.innerHTML = '';
  
  if (relatedBooks.length === 0) {
    relatedBooksContainer.innerHTML = `
      <div class="empty-related">
        <p>No related books found.</p>
      </div>
    `;
    return;
  }
  
  relatedBooks.forEach(book => {
    const discount = book.originalPrice > book.price 
      ? Math.round((1 - book.price / book.originalPrice) * 100) 
      : null;
    
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
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
    
    relatedBooksContainer.appendChild(bookCard);
  });
  
  // Add event listeners to "Add to cart" buttons
  document.querySelectorAll('.book-add-btn').forEach(button => {
    button.addEventListener('click', () => {
      const bookId = parseInt(button.dataset.bookId);
      const book = window.booksAPI.getBookById(bookId);
      if (book) {
        window.cartUtils.addToCart(book);
      }
    });
  });
}

// Setup tab navigation
function setupTabNavigation() {
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tab = button.dataset.tab;
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      document.getElementById(tab).classList.add('active');
    });
  });
}

// Setup review form
function setupReviewForm() {
  if (!reviewForm) return;
  
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('reviewer-name').value;
    const email = document.getElementById('reviewer-email').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const text = document.getElementById('review-text').value;
    
    // In a real app, you would send this to your backend
    console.log('Review submitted:', { name, email, rating, text });
    
    // Show thank you message
    reviewForm.innerHTML = `
      <div class="review-thank-you">
        <h3>Thank You for Your Review!</h3>
        <p>Your review has been submitted and will be published soon.</p>
      </div>
    `;
    
    // Switch to the reviews tab
    document.querySelector('[data-tab="reviews"]').click();
  });
}

// Helper function to format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Initialize the page on load
document.addEventListener('DOMContentLoaded', initBookDetail);