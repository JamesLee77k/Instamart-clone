/* ============================
   INSTAGROCER – APP LOGIC
   ============================ */

// ─── DATA ───────────────────────────────────────────────
const categories = [
  { id: 'fruits', name: 'Fruits & Veggies', emoji: '🥦', color: '#e8f5e9' },
  { id: 'dairy', name: 'Dairy', emoji: '🥛', color: '#e3f2fd' },
  { id: 'snacks', name: 'Snacks', emoji: '🍿', color: '#fff3e0' },
  { id: 'beverages', name: 'Beverages', emoji: '🧃', color: '#fce4ec' },
  { id: 'bakery', name: 'Bakery', emoji: '🍞', color: '#f3e5f5' },
  { id: 'personal', name: 'Personal Care', emoji: '🧴', color: '#e0f2f1' },
  { id: 'meat', name: 'Meat & Fish', emoji: '🥩', color: '#fbe9e7' },
  { id: 'frozen', name: 'Frozen', emoji: '🧊', color: '#e8eaf6' },
  { id: 'breakfast', name: 'Breakfast', emoji: '🥣', color: '#fffde7' },
  { id: 'household', name: 'Household', emoji: '🧹', color: '#f1f8e9' },
  { id: 'baby', name: 'Baby Care', emoji: '👶', color: '#fce4ec' },
  { id: 'pets', name: 'Pets', emoji: '🐾', color: '#e8f5e9' },
];

const products = [
  // Fruits & Veggies
  { id:1, name:'Organic Bananas', weight:'6 pcs', price:49, mrp:65, emoji:'🍌', category:'Fruits & Veggies', badge:'ORGANIC', badgeType:'green' },
  { id:2, name:'Fresh Tomatoes', weight:'500g', price:35, mrp:45, emoji:'🍅', category:'Fruits & Veggies', badge:'FRESH' },
  { id:3, name:'Spinach Bunch', weight:'250g', price:25, mrp:30, emoji:'🥬', category:'Fruits & Veggies', badge:null },
  { id:4, name:'Red Apple', weight:'4 pcs (~600g)', price:120, mrp:150, emoji:'🍎', category:'Fruits & Veggies', badge:'POPULAR', badgeType:'green' },
  { id:5, name:'Green Capsicum', weight:'250g', price:40, mrp:55, emoji:'🫑', category:'Fruits & Veggies', badge:null },
  { id:6, name:'Avocado', weight:'2 pcs', price:99, mrp:130, emoji:'🥑', category:'Fruits & Veggies', badge:'EXOTIC' },

  // Dairy
  { id:7, name:'Amul Full Cream Milk', weight:'1L Tetra', price:68, mrp:70, emoji:'🥛', category:'Dairy', badge:null },
  { id:8, name:'Farm Fresh Eggs', weight:'12 eggs', price:89, mrp:100, emoji:'🥚', category:'Dairy', badge:'FRESH' },
  { id:9, name:'Amul Butter', weight:'500g', price:249, mrp:275, emoji:'🧈', category:'Dairy', badge:null },
  { id:10, name:'Greek Yoghurt', weight:'400g', price:75, mrp:90, emoji:'🍦', category:'Dairy', badge:'NEW', badgeType:'green' },
  { id:11, name:'Paneer Block', weight:'200g', price:85, mrp:100, emoji:'🧀', category:'Dairy', badge:null },

  // Snacks
  { id:12, name:"Lay's Classic Salted", weight:'52g', price:20, mrp:20, emoji:'🍟', category:'Snacks', badge:null },
  { id:13, name:'Dark Chocolate Bar', weight:'100g', price:150, mrp:180, emoji:'🍫', category:'Snacks', badge:'BESTSELLER', badgeType:'green' },
  { id:14, name:'Bingo Mad Angles', weight:'90g', price:30, mrp:30, emoji:'🍿', category:'Snacks', badge:null },
  { id:15, name:'Protein Granola Bar', weight:'60g x 5', price:199, mrp:250, emoji:'🍫', category:'Snacks', badge:'HEALTHY', badgeType:'green' },
  { id:16, name:'Roasted Almonds', weight:'200g', price:180, mrp:220, emoji:'🥜', category:'Snacks', badge:null },

  // Beverages
  { id:17, name:'Real Orange Juice', weight:'1L', price:115, mrp:135, emoji:'🍊', category:'Beverages', badge:null },
  { id:18, name:'Bisleri Mineral Water', weight:'1L x 5', price:75, mrp:80, emoji:'💧', category:'Beverages', badge:null },
  { id:19, name:'Red Bull Energy Drink', weight:'250ml x 4', price:380, mrp:420, emoji:'🥤', category:'Beverages', badge:'HOT' },
  { id:20, name:'Starbucks Cold Coffee', weight:'250ml', price:120, mrp:145, emoji:'☕', category:'Beverages', badge:'NEW', badgeType:'green' },

  // Bakery
  { id:21, name:'Multigrain Bread', weight:'400g', price:55, mrp:65, emoji:'🍞', category:'Bakery', badge:'HEALTHY', badgeType:'green' },
  { id:22, name:'Butter Croissant', weight:'Pack of 4', price:130, mrp:160, emoji:'🥐', category:'Bakery', badge:'FRESH' },
  { id:23, name:'Blueberry Muffin', weight:'Pack of 2', price:90, mrp:110, emoji:'🫐', category:'Bakery', badge:null },

  // Personal Care
  { id:24, name:'Dove Soap Bar', weight:'100g x 3', price:185, mrp:210, emoji:'🧼', category:'Personal Care', badge:null },
  { id:25, name:'Colgate Toothpaste', weight:'200g', price:95, mrp:110, emoji:'🦷', category:'Personal Care', badge:null },
  { id:26, name:'Head & Shoulders', weight:'340ml', price:285, mrp:340, emoji:'🧴', category:'Personal Care', badge:'OFFER' },
];

// ─── STATE ───────────────────────────────────────────────
let cart = {};          // { productId: { product, qty } }
let currentSlide = 0;
let activeCategory = 'all';
let slideInterval;

// ─── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderProducts(products);
  startSlideshow();
  // close search on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-search') && !e.target.closest('#searchDropdown')) {
      document.getElementById('searchDropdown').style.display = 'none';
    }
  });
});

// ─── CATEGORIES ──────────────────────────────────────────
function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  grid.innerHTML = categories.map(cat => `
    <div class="category-card" onclick="filterByCategory('${cat.name}')" id="cat-${cat.id}" style="background:${cat.color}">
      <span class="cat-emoji">${cat.emoji}</span>
      <span class="cat-name">${cat.name}</span>
    </div>
  `).join('');
}

// ─── PRODUCTS ────────────────────────────────────────────
function renderProducts(list) {
  const grid = document.getElementById('productsGrid');
  if (list.length === 0) {
    grid.innerHTML = `<div class="no-results"><span>😕</span><p>No products found</p><small>Try a different search or category</small></div>`;
    return;
  }
  grid.innerHTML = list.map(p => {
    const inCart = cart[p.id];
    const discount = Math.round(((p.mrp - p.price) / p.mrp) * 100);
    return `
      <div class="product-card" id="pcard-${p.id}">
        ${p.badge ? `<div class="product-badge ${p.badgeType === 'green' ? 'green' : ''}">${p.badge}</div>` : ''}
        <div class="product-img-wrap">${p.emoji}</div>
        <div class="product-info">
          <div class="product-name">${p.name}</div>
          <div class="product-weight">${p.weight}</div>
          <div class="product-footer">
            <div>
              <span class="product-price">₹${p.price}</span>
              ${p.mrp > p.price ? `<span class="product-mrp">₹${p.mrp}</span>` : ''}
              ${discount > 0 ? `<span style="font-size:11px;color:var(--green);font-weight:700;display:block">${discount}% OFF</span>` : ''}
            </div>
            ${inCart
              ? `<div class="qty-control">
                  <button class="qty-btn" onclick="changeQty(${p.id},-1)">−</button>
                  <span class="qty-num" id="qty-${p.id}">${inCart.qty}</span>
                  <button class="qty-btn" onclick="changeQty(${p.id},1)">+</button>
                 </div>`
              : `<button class="add-btn" onclick="addToCart(${p.id})" title="Add to cart">+</button>`
            }
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ─── CART LOGIC ──────────────────────────────────────────
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  if (cart[productId]) {
    cart[productId].qty += 1;
  } else {
    cart[productId] = { product, qty: 1 };
  }
  updateCartUI();
  refreshProductCard(productId);
  showToast(`✅ ${product.name} added to cart`);
}

function changeQty(productId, delta) {
  if (!cart[productId]) return;
  cart[productId].qty += delta;
  if (cart[productId].qty <= 0) {
    delete cart[productId];
    showToast('🗑️ Item removed');
  }
  updateCartUI();
  refreshProductCard(productId);
}

function refreshProductCard(productId) {
  // Re-render only the add/qty portion
  const card = document.getElementById(`pcard-${productId}`);
  if (!card) return;
  const footer = card.querySelector('.product-footer');
  const inCart = cart[productId];
  const ctaArea = footer.querySelector('.add-btn, .qty-control');
  if (ctaArea) ctaArea.remove();
  const newCtaDiv = document.createElement('div');
  if (inCart) {
    newCtaDiv.innerHTML = `
      <div class="qty-control">
        <button class="qty-btn" onclick="changeQty(${productId},-1)">−</button>
        <span class="qty-num" id="qty-${productId}">${inCart.qty}</span>
        <button class="qty-btn" onclick="changeQty(${productId},1)">+</button>
      </div>`;
  } else {
    newCtaDiv.innerHTML = `<button class="add-btn" onclick="addToCart(${productId})" title="Add to cart">+</button>`;
  }
  footer.appendChild(newCtaDiv.firstElementChild);
}

function updateCartUI() {
  const items = Object.values(cart);
  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const itemTotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const toPay = itemTotal + 5;

  // Badge
  document.getElementById('cartCount').textContent = totalQty;
  const hBadge = document.getElementById('headerCartBadge');
  hBadge.textContent = totalQty;
  hBadge.style.display = totalQty > 0 ? 'flex' : 'none';

  // Totals
  document.getElementById('itemTotal').textContent = `₹${itemTotal}`;
  document.getElementById('totalPay').textContent = `₹${toPay}`;
  document.getElementById('checkoutTotal').textContent = `₹${toPay}`;

  // Items list
  const cartItemsEl = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');

  if (items.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon">🛒</div>
        <p>Your cart is empty</p>
        <small>Add items to get started</small>
      </div>`;
    cartFooter.style.display = 'none';
  } else {
    cartItemsEl.innerHTML = items.map(({ product: p, qty }) => `
      <div class="cart-item">
        <div class="cart-item-emoji">${p.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-weight">${p.weight}</div>
        </div>
        <div class="cart-item-controls qty-control">
          <button class="qty-btn" onclick="changeQty(${p.id},-1)">−</button>
          <span class="qty-num">${qty}</span>
          <button class="qty-btn" onclick="changeQty(${p.id},1)">+</button>
        </div>
        <div class="cart-item-price">₹${p.price * qty}</div>
      </div>
    `).join('');
    cartFooter.style.display = 'block';
  }
}

// ─── CART SIDEBAR ─────────────────────────────────────────
function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  const isOpen = sidebar.classList.contains('open');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

// ─── PLACE ORDER ──────────────────────────────────────────
function placeOrder() {
  const items = Object.values(cart);
  if (items.length === 0) return;
  // Close cart
  toggleCart();
  // Show order modal
  document.getElementById('orderId').textContent = Math.floor(Math.random() * 900000 + 100000);
  document.getElementById('orderModal').style.display = 'flex';
  // Clear cart
  cart = {};
  updateCartUI();
  // Re-render products (remove qty controls)
  const filtered = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);
  renderProducts(filtered);
}

// ─── FILTER ───────────────────────────────────────────────
function filterByCategory(catName) {
  activeCategory = catName;
  // Update filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim() === (catName === 'all' ? 'All' : catName));
  });
  // Update category cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.classList.remove('active');
  });
  if (catName !== 'all') {
    const cat = categories.find(c => c.name === catName);
    if (cat) {
      const card = document.getElementById(`cat-${cat.id}`);
      if (card) card.classList.add('active');
    }
  }
  const filtered = catName === 'all' ? products : products.filter(p => p.category === catName);
  document.getElementById('productsTitle').textContent = catName === 'all' ? 'All Products' : catName;
  renderProducts(filtered);
  scrollToSection('products');
}

// ─── SEARCH ───────────────────────────────────────────────
function handleSearch(e) {
  const query = e.target.value.trim().toLowerCase();
  const dropdown = document.getElementById('searchDropdown');
  if (!query) { dropdown.style.display = 'none'; return; }

  const results = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  ).slice(0, 8);

  if (results.length === 0) {
    dropdown.innerHTML = `<div class="search-result-item"><span>😕</span><div class="sri-info"><div class="sri-name">No results for "${query}"</div></div></div>`;
  } else {
    dropdown.innerHTML = results.map(p => `
      <div class="search-result-item">
        <div class="sri-emoji">${p.emoji}</div>
        <div class="sri-info">
          <div class="sri-name">${p.name}</div>
          <div class="sri-price">₹${p.price} <span style="color:#9ca3af;text-decoration:line-through;font-size:12px">₹${p.mrp}</span></div>
        </div>
        <button class="sri-add" onclick="addToCart(${p.id}); document.getElementById('searchDropdown').style.display='none'; document.getElementById('searchInput').value=''">Add</button>
      </div>
    `).join('');
  }
  dropdown.style.display = 'block';
}

// ─── SLIDESHOW ────────────────────────────────────────────
function startSlideshow() {
  slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % 3;
    goToSlide(currentSlide);
  }, 4500);
}

function goToSlide(index) {
  clearInterval(slideInterval);
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  slides.forEach((s, i) => s.classList.toggle('active', i === index));
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
  currentSlide = index;
  slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }, 4500);
}

// ─── MODALS ───────────────────────────────────────────────
function showLoginModal() { document.getElementById('loginModal').style.display = 'flex'; }
function showLocationModal() { document.getElementById('locationModal').style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// ─── LOGIN FLOW ───────────────────────────────────────────
function validatePhone() {
  const val = document.getElementById('phoneInput').value;
  document.getElementById('otpBtn').disabled = val.length !== 10;
}

function sendOTP() {
  const phone = document.getElementById('phoneInput').value;
  if (phone.length !== 10) return;
  document.getElementById('otpSection').style.display = 'block';
  document.getElementById('otpBtn').style.display = 'none';
  showToast(`📲 OTP sent to +91 ${phone}`);
  // Auto-fill demo OTP
  setTimeout(() => {
    const boxes = document.querySelectorAll('.otp-box');
    '123456'.split('').forEach((d, i) => { boxes[i].value = d; });
  }, 500);
}

function otpFocus(el, index) {
  if (el.value.length === 1) {
    const next = document.querySelectorAll('.otp-box')[index + 1];
    if (next) next.focus();
  }
}

function verifyOTP() {
  const otp = [...document.querySelectorAll('.otp-box')].map(b => b.value).join('');
  if (otp.length < 6) { showToast('⚠️ Enter 6-digit OTP'); return; }
  closeModal('loginModal');
  document.querySelector('.login-btn').textContent = '👤 Account';
  showToast('✅ Logged in successfully!');
}

// ─── LOCATION ─────────────────────────────────────────────
function detectLocation() {
  showToast('📡 Detecting location…');
  setTimeout(() => {
    setLocation('Current Location', 'Connaught Place, New Delhi');
    showToast('📍 Location set to Connaught Place');
  }, 1200);
}

function setLocation(title, addr) {
  document.querySelector('.loc-title').textContent = title;
  document.querySelector('.loc-addr').textContent = addr;
  closeModal('locationModal');
  showToast(`📍 Delivery to ${addr}`);
}

// ─── TOAST ────────────────────────────────────────────────
let toastTimeout;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.remove('show'), 2500);
}

// ─── SCROLL ───────────────────────────────────────────────
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
