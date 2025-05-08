// DOM Elements
const booksContainer = document.getElementById('books-container');
const totalCountElement = document.getElementById('total-count');
const sortSelect = document.getElementById('sort-select');
const clearFiltersButton = document.getElementById('clear-filters');
const viewButtons = document.querySelectorAll('.view-btn');
const genreFiltersContainer = document.getElementById('genre-filters');
const priceSlider = document.getElementById('price-slider');
const priceValue = document.getElementById('price-value');
const catalogSearch = document.getElementById('catalog-search');
const searchButton = document.getElementById('search-button');
const paginationContainer = document.getElementById('pagination');

// State
let currentBooks = [];
let currentPage = 1;
const booksPerPage = 12;
let filters = {
  genres: [],
  minRating: 0,
  maxPrice: 100,
  inStock: false,
  search: ''
};

// Initialize catalog page
function initCatalog() {
  loadBooksFromURL();
  populateGenreFilters();
  setupEventListeners();
  applyFiltersAndSort();
}

// Load books based on URL parameters
function loadBooksFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const genreParam = urlParams.get('genre');
  const searchParam = urlParams.get('search');
  
  if (genreParam) {
    filters.genres = [genreParam.toLowerCase()];
    // Check the corresponding checkbox
    setTimeout(() => {
      const checkbox = document.querySelector(`input[name="genre"][value="${genreParam.toLowerCase()}"]`);
      if (checkbox) checkbox.checked = true;
    }, 0);
  }
  
  if (searchParam) {
    filters.search = searchParam;
    if (catalogSearch) catalogSearch.value = searchParam;
  }
}

// Populate genre filters
function populateGenreFilters() {
  if (!genreFiltersContainer) return;
  
  const genres = window.booksAPI.getAllGenres();
  
  genres.forEach(genre => {
    const label = document.createElement('label');
    label.className = 'filter-option';
    
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = 'genre';
    input.value = genre.toLowerCase();
    input.checked = filters.genres.includes(genre.toLowerCase());
    
    label.appendChild(input);
    label.appendChild(document.createTextNode(` ${genre}`));
    
    genreFiltersContainer.appendChild(label);
  });
}

// Setup event listeners
function setupEventListeners() {
  // View toggle
  viewButtons.forEach(button => {
    button.addEventListener('click', () => {
      const view = button.dataset.view;
      viewButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      if (booksContainer) {
        booksContainer.className = `books-container ${view}-view`;
      }
    });
  });
  
  // Genre filters
  document.querySelectorAll('input[name="genre"]').forEach(input => {
    input.addEventListener('change', () => {
      updateGenreFilters();
      applyFiltersAndSort();
    });
  });
  
  // Rating filters
  document.querySelectorAll('input[name="rating"]').forEach(input => {
    input.addEventListener('change', () => {
      updateRatingFilters();
      applyFiltersAndSort();
    });
  });
  
  // Price slider
  if (priceSlider) {
    priceSlider.addEventListener('input', () => {
      const value = priceSlider.value;
      filters.maxPrice = parseInt(value);
      priceValue.textContent = `$${value}`;
    });
    
    priceSlider.addEventListener('change', () => {
      applyFiltersAndSort();
    });
  }
  
  // Sort select
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      applyFiltersAndSort();
    });
  }
  
  // Clear filters
  if (clearFiltersButton) {
    clearFiltersButton.addEventListener('click', () => {
      resetFilters();
      applyFiltersAndSort();
    });
  }
  
  // Search
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      if (catalogSearch) {
        filters.search = catalogSearch.value.trim();
        currentPage = 1;
        applyFiltersAndSort();
      }
    });
  }
  
  if (catalogSearch) {
    catalogSearch.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        filters.search = catalogSearch.value.trim();
        currentPage = 1;
        applyFiltersAndSort();
      }
    });
  }
}

// Update genre filters based on checkboxes
function updateGenreFilters() {
  const checkedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked'))
    .map(input => input.value);
  
  filters.genres = checkedGenres;
}

// Update rating filters based on checkboxes
function updateRatingFilters() {
  const checkedRatings = Array.from(document.querySelectorAll('input[name="rating"]:checked'))
    .map(input => parseInt(input.value));
  
  filters.minRating = checkedRatings.length > 0 ? Math.min(...checkedRatings) : 0;
}

// Reset all filters
function resetFilters() {
  filters = {
    genres: [],
    minRating: 0,
    maxPrice: 100,
    inStock: false,
    search: ''
  };
  
  // Reset UI
  document.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.checked = false;
  });
  
  if (priceSlider) {
    priceSlider.value = 100;
    priceValue.textContent = '$100';
  }
  
  if (catalogSearch) {
    catalogSearch.value = '';
  }
}

// Apply filters and sort
function applyFiltersAndSort() {
  // Get all books
  let filteredBooks = window.booksAPI.getAllBooks();
  
  // Apply search filter
  if (filters.search) {
    filteredBooks = window.booksAPI.searchBooks(filters.search);
  }
  
  // Apply genre filter
  if (filters.genres.length > 0) {
    filteredBooks = filteredBooks.filter(book => 
      filters.genres.includes(book.genre.toLowerCase())
    );
  }
  
  // Apply rating filter
  if (filters.minRating > 0) {
    filteredBooks = filteredBooks.filter(book => book.rating >= filters.minRating);
  }
  
  // Apply price filter
  filteredBooks = filteredBooks.filter(book => book.price <= filters.maxPrice);
  
  // Apply in-stock filter
  if (filters.inStock) {
    filteredBooks = filteredBooks.filter(book => book.inStock);
  }
  
  // Sort books
  const sortValue = sortSelect ? sortSelect.value : 'relevance';
  
  switch (sortValue) {
    case 'price-low':
      filteredBooks.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredBooks.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredBooks.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      filteredBooks.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
      break;
    case 'relevance':
    default:
      // For relevance, prioritize bestsellers and featured books
      filteredBooks.sort((a, b) => {
        if (a.bestseller && !b.bestseller) return -1;
        if (!a.bestseller && b.bestseller) return 1;
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
  }
  
  // Update state
  currentBooks = filteredBooks;
  
  // Update total count
  if (totalCountElement) {
    totalCountElement.textContent = currentBooks.length;
  }
  
  // Display paginated books
  displayBooks();
  
  // Update pagination
  updatePagination();
}

// Display books
function displayBooks() {
  if (!booksContainer) return;
  
  // Calculate pagination
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const booksToDisplay = currentBooks.slice(startIndex, endIndex);
  
  booksContainer.innerHTML = '';
  
  if (booksToDisplay.length === 0) {
    booksContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📚</div>
        <p class="empty-text">No books found matching your criteria</p>
        <button class="btn btn-primary" id="reset-search">Clear Search</button>
      </div>
    `;
    
    const resetButton = document.getElementById('reset-search');
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        resetFilters();
        applyFiltersAndSort();
      });
    }
    
    return;
  }
  
  const isGridView = booksContainer.classList.contains('grid-view');
  
  booksToDisplay.forEach(book => {
    const bookElement = document.createElement('div');
    bookElement.className = isGridView ? 'book-card' : 'book-card-list';
    
    const discount = book.originalPrice > book.price 
      ? Math.round((1 - book.price / book.originalPrice) * 100) 
      : null;
    
    if (isGridView) {
      bookElement.innerHTML = `
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
    } else {
      // List view
      bookElement.innerHTML = `
        <div class="book-cover">
          <img src="${book.coverImage}" alt="${book.title}" loading="lazy">
        </div>
        <div class="book-details">
          <h3 class="book-title">${book.title}</h3>
          <p class="book-author">by ${book.author}</p>
          <div class="rating">
            ${window.utils.createStarRating(book.rating)}
            <span class="rating-count">(${book.reviewCount})</span>
          </div>
          <p class="book-description">${book.description.substring(0, 150)}...</p>
          <div class="book-price">
            <span class="price">$${book.price.toFixed(2)}</span>
            ${discount ? `<span class="discount">-${discount}%</span>` : ''}
            <div class="book-actions">
              <a href="book-detail.html?id=${book.id}" class="btn btn-secondary">View Details</a>
              <button class="btn btn-primary add-to-cart-btn" data-book-id="${book.id}">Add to Cart</button>
            </div>
          </div>
        </div>
      `;
    }
    
    booksContainer.appendChild(bookElement);
  });
  
  // Add event listeners to "Add to cart" buttons
  document.querySelectorAll('.book-add-btn, .add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
      const bookId = parseInt(button.dataset.bookId);
      const book = window.booksAPI.getBookById(bookId);
      if (book) {
        window.cartUtils.addToCart(book);
      }
    });
  });
}

// Update pagination
function updatePagination() {
  if (!paginationContainer) return;
  
  const totalPages = Math.ceil(currentBooks.length / booksPerPage);
  
  paginationContainer.innerHTML = '';
  
  if (totalPages <= 1) {
    return;
  }
  
  // Previous button
  const prevItem = document.createElement('li');
  prevItem.className = 'page-item';
  const prevLink = document.createElement('a');
  prevLink.className = `page-link page-prev ${currentPage === 1 ? 'disabled' : ''}`;
  prevLink.innerHTML = '&laquo;';
  prevLink.href = '#';
  if (currentPage > 1) {
    prevLink.addEventListener('click', (e) => {
      e.preventDefault();
      goToPage(currentPage - 1);
    });
  }
  prevItem.appendChild(prevLink);
  paginationContainer.appendChild(prevItem);
  
  // Page numbers
  const maxPageItems = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageItems / 2));
  let endPage = Math.min(totalPages, startPage + maxPageItems - 1);
  
  if (endPage - startPage + 1 < maxPageItems) {
    startPage = Math.max(1, endPage - maxPageItems + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    const pageItem = document.createElement('li');
    pageItem.className = 'page-item';
    const pageLink = document.createElement('a');
    pageLink.className = `page-link ${i === currentPage ? 'active' : ''}`;
    pageLink.textContent = i;
    pageLink.href = '#';
    pageLink.addEventListener('click', (e) => {
      e.preventDefault();
      goToPage(i);
    });
    pageItem.appendChild(pageLink);
    paginationContainer.appendChild(pageItem);
  }
  
  // Next button
  const nextItem = document.createElement('li');
  nextItem.className = 'page-item';
  const nextLink = document.createElement('a');
  nextLink.className = `page-link page-next ${currentPage === totalPages ? 'disabled' : ''}`;
  nextLink.innerHTML = '&raquo;';
  nextLink.href = '#';
  if (currentPage < totalPages) {
    nextLink.addEventListener('click', (e) => {
      e.preventDefault();
      goToPage(currentPage + 1);
    });
  }
  nextItem.appendChild(nextLink);
  paginationContainer.appendChild(nextItem);
}

// Go to specific page
function goToPage(page) {
  currentPage = page;
  displayBooks();
  updatePagination();
  
  // Scroll to top of books container
  if (booksContainer) {
    window.scrollTo({
      top: booksContainer.offsetTop - 100,
      behavior: 'smooth'
    });
  }
}

// Initialize the catalog on page load
document.addEventListener('DOMContentLoaded', initCatalog);