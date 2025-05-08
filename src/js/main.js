// Cart functionality
const cartState = {
  items: [],
  total: 0
};

// DOM Elements
const cartButton = document.getElementById('cart-button');
const cartOverlay = document.getElementById('cart-overlay');
const cartClose = document.getElementById('cart-close');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalAmount = document.getElementById('cart-total-amount');
const cartCountDisplay = document.querySelector('.cart-count');
const searchToggle = document.getElementById('search-toggle');
const searchContainer = document.getElementById('search-container');
const menuToggle = document.getElementById('menu-toggle');
const navList = document.querySelector('.nav-list');
const header = document.getElementById('header');

// Initialize the cart from localStorage
function initCart() {
  const savedCart = localStorage.getItem('luminaryCart');
  if (savedCart) {
    const parsedCart = JSON.parse(savedCart);
    cartState.items = parsedCart.items || [];
    cartState.total = parsedCart.total || 0;
  }
  updateCartCount();
  renderCart();
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('luminaryCart', JSON.stringify(cartState));
}

// Add item to cart
function addToCart(book, quantity = 1) {
  const existingItem = cartState.items.find(item => item.id === book.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartState.items.push({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      coverImage: book.coverImage,
      quantity: quantity
    });
  }
  
  updateCartTotal();
  updateCartCount();
  renderCart();
  saveCart();
  
  // Show cart when adding items
  showCart();
  
  // Show notification
  showNotification(`Added "${book.title}" to your cart`);
}

// Remove item from cart
function removeFromCart(itemId) {
  cartState.items = cartState.items.filter(item => item.id !== itemId);
  updateCartTotal();
  updateCartCount();
  renderCart();
  saveCart();
}

// Update item quantity
function updateItemQuantity(itemId, quantity) {
  const item = cartState.items.find(item => item.id === itemId);
  if (item) {
    item.quantity = parseInt(quantity);
    if (item.quantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateCartTotal();
      renderCart();
      saveCart();
    }
  }
}

// Update cart total
function updateCartTotal() {
  cartState.total = cartState.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}

// Update cart count display
function updateCartCount() {
  const totalItems = cartState.items.reduce((count, item) => count + item.quantity, 0);
  cartCountDisplay.textContent = totalItems;
  cartCountDisplay.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Render cart items
function renderCart() {
  if (!cartItemsContainer) return;
  
  cartItemsContainer.innerHTML = '';
  cartTotalAmount.textContent = `$${cartState.total.toFixed(2)}`;
  
  if (cartState.items.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">📚</div>
        <p class="empty-cart-text">Your cart is empty</p>
        <a href="catalog.html" class="btn btn-primary">Browse Books</a>
      </div>
    `;
    return;
  }
  
  cartState.items.forEach(item => {
    const cartItemElement = document.createElement('div');
    cartItemElement.className = 'cart-item';
    cartItemElement.innerHTML = `
      <img src="${item.coverImage}" alt="${item.title}" class="cart-item-image">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.title}</h4>
        <p class="cart-item-author">by ${item.author}</p>
        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
        <div class="cart-item-quantity">
          <button class="quantity-btn quantity-decrease" data-id="${item.id}">-</button>
          <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
          <button class="quantity-btn quantity-increase" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">×</button>
    `;
    
    cartItemsContainer.appendChild(cartItemElement);
  });
  
  // Add event listeners to the cart items
  cartItemsContainer.querySelectorAll('.quantity-decrease').forEach(button => {
    button.addEventListener('click', () => {
      const itemId = parseInt(button.dataset.id);
      const item = cartState.items.find(item => item.id === itemId);
      if (item && item.quantity > 1) {
        updateItemQuantity(itemId, item.quantity - 1);
      }
    });
  });
  
  cartItemsContainer.querySelectorAll('.quantity-increase').forEach(button => {
    button.addEventListener('click', () => {
      const itemId = parseInt(button.dataset.id);
      const item = cartState.items.find(item => item.id === itemId);
      if (item) {
        updateItemQuantity(itemId, item.quantity + 1);
      }
    });
  });
  
  cartItemsContainer.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', () => {
      const itemId = parseInt(input.dataset.id);
      updateItemQuantity(itemId, input.value);
    });
  });
  
  cartItemsContainer.querySelectorAll('.cart-item-remove').forEach(button => {
    button.addEventListener('click', () => {
      const itemId = parseInt(button.dataset.id);
      removeFromCart(itemId);
    });
  });
}

// Show cart
function showCart() {
  cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Hide cart
function hideCart() {
  cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
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

// Toggle search container
function toggleSearch() {
  searchContainer.style.display = searchContainer.style.display === 'block' ? 'none' : 'block';
}

// Toggle mobile menu
function toggleMenu() {
  navList.classList.toggle('show');
}

// Handle scroll events
function handleScroll() {
  if (window.scrollY > 100) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
}

// Event listeners
if (cartButton) {
  cartButton.addEventListener('click', (e) => {
    e.preventDefault();
    showCart();
  });
}

if (cartClose) {
  cartClose.addEventListener('click', hideCart);
}

if (cartOverlay) {
  cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) {
      hideCart();
    }
  });
}

if (searchToggle) {
  searchToggle.addEventListener('click', toggleSearch);
}

if (menuToggle) {
  menuToggle.addEventListener('click', toggleMenu);
}

window.addEventListener('scroll', handleScroll);

// Initialize the cart on page load
document.addEventListener('DOMContentLoaded', initCart);

// Expose cart functions globally
window.cartUtils = {
  addToCart,
  removeFromCart,
  updateItemQuantity,
  showCart,
  hideCart
};

// Add notification styles if they don't exist
if (!document.getElementById('notification-styles')) {
  const notificationStyles = document.createElement('style');
  notificationStyles.id = 'notification-styles';
  notificationStyles.textContent = `
    .notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: var(--primary);
      color: white;
      padding: 10px 20px;
      border-radius: var(--radius-md);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }
    
    .slide-in-right {
      animation: slideInRight 0.3s ease forwards;
    }
    
    .slide-out-right {
      animation: slideOutRight 0.3s ease forwards;
    }
    
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(notificationStyles);
}

// Create star rating HTML
function createStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  let starsHTML = '';
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '★';
  }
  
  // Half star
  if (halfStar) {
    starsHTML += '★';
  }
  
  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '☆';
  }
  
  return starsHTML;
}

// Expose utility functions
window.utils = {
  createStarRating
};