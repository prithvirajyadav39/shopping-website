const $ = id => document.getElementById(id);

/* ---------- Category icons (used as placeholder product art) ---------- */
const CAT_ICONS = {
  electronics: `<path d="M4 6h16v11H4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><line x1="9" y1="21" x2="15" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" stroke-width="2"/>`,
  fashion: `<path d="M8 4l4 3 4-3 4 4-3 3v10H7V11L4 8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>`,
  home: `<path d="M4 11l8-7 8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M6 10v10h12V10" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>`,
  books: `<path d="M4 5h7v15H4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><path d="M11 5h9v15h-9" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>`,
  beauty: `<path d="M12 3l2 5h5l-4 3.5 1.5 5.5-4.5-3-4.5 3L9 11.5 5 8h5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>`,
  sports: `<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2"/><path d="M4 12h16M12 4v16M6.5 6.5l11 11M17.5 6.5l-11 11" stroke="currentColor" stroke-width="1.4"/>`,
};
const CAT_BG = {
  electronics: '#E7ECF5',
  fashion: '#F6E7EE',
  home: '#EAF2E9',
  books: '#F3ECDE',
  beauty: '#F7E9E2',
  sports: '#E5EEF3',
};
const CAT_LABELS = {
  all: 'All',
  electronics: 'Electronics',
  fashion: 'Fashion',
  home: 'Home & Kitchen',
  books: 'Books',
  beauty: 'Beauty',
  sports: 'Sports & Fitness',
};

/* ---------- Product catalog ---------- */
const PRODUCTS = [
  { id: 1, cat: 'electronics', title: 'Wireless Over-Ear Headphones, Active Noise Cancelling', price: 2499, was: 4999, rating: 4.3, ratingCount: 812 },
  { id: 2, cat: 'electronics', title: '20000mAh Fast-Charging Power Bank', price: 999, was: 1799, rating: 4.1, ratingCount: 2340 },
  { id: 3, cat: 'electronics', title: 'Smart Watch with Heart Rate & SpO2 Monitor', price: 1799, was: 3499, rating: 4.0, ratingCount: 1560 },
  { id: 4, cat: 'fashion', title: "Men's Slim Fit Cotton Casual Shirt", price: 649, was: 1299, rating: 4.2, ratingCount: 934 },
  { id: 5, cat: 'fashion', title: "Women's Everyday Canvas Sneakers", price: 1199, was: 2199, rating: 4.4, ratingCount: 1102 },
  { id: 6, cat: 'fashion', title: 'Unisex Water-Resistant Backpack, 25L', price: 899, was: 1599, rating: 4.5, ratingCount: 640 },
  { id: 7, cat: 'home', title: 'Non-Stick 3-Piece Cookware Set', price: 1349, was: 2499, rating: 4.3, ratingCount: 455 },
  { id: 8, cat: 'home', title: 'Memory Foam Pillow, Set of 2', price: 799, was: 1299, rating: 4.1, ratingCount: 1890 },
  { id: 9, cat: 'home', title: 'LED Desk Lamp with Adjustable Brightness', price: 549, was: 999, rating: 4.2, ratingCount: 723 },
  { id: 10, cat: 'books', title: 'Atomic Habits — Paperback', price: 299, was: 599, rating: 4.7, ratingCount: 5230 },
  { id: 11, cat: 'books', title: 'The Complete Ruled Notebook, Set of 3', price: 199, was: 349, rating: 4.4, ratingCount: 310 },
  { id: 12, cat: 'beauty', title: 'Vitamin C Face Serum, 30ml', price: 449, was: 899, rating: 4.0, ratingCount: 2110 },
  { id: 13, cat: 'beauty', title: 'Herbal Shampoo & Conditioner Combo', price: 349, was: 599, rating: 4.2, ratingCount: 980 },
  { id: 14, cat: 'sports', title: 'Yoga Mat with Carry Strap, 6mm', price: 549, was: 999, rating: 4.5, ratingCount: 1440 },
  { id: 15, cat: 'sports', title: 'Adjustable Dumbbell Set, 10kg Pair', price: 1899, was: 3299, rating: 4.3, ratingCount: 366 },
  { id: 16, cat: 'sports', title: 'Insulated Steel Water Bottle, 1L', price: 399, was: 699, rating: 4.4, ratingCount: 2870 },
];

/* ---------- State ---------- */
let activeCategory = 'all';
let searchQuery = '';
let cart = {}; // id -> qty

function formatPrice(n){
  return '₹' + n.toLocaleString('en-IN');
}

/* ---------- Category nav ---------- */
function renderCategoryRow(){
  const cats = ['all', ...Object.keys(CAT_LABELS).filter(c => c !== 'all')];
  $('categoryRow').innerHTML = cats.map(c =>
    `<button data-cat="${c}" class="${c === activeCategory ? 'active' : ''}">${CAT_LABELS[c]}</button>`
  ).join('');
  $('categoryRow').querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      renderCategoryRow();
      renderGrid();
    });
  });
}

/* ---------- Product grid ---------- */
function getVisibleProducts(){
  return PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'all' || p.cat === activeCategory;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });
}

function starRow(rating){
  return `<span class="rating-badge">${rating.toFixed(1)} ★</span>`;
}

function renderGrid(){
  const items = getVisibleProducts();
  $('resultsLine').textContent = `${items.length} result${items.length === 1 ? '' : 's'}` + (searchQuery ? ` for "${searchQuery}"` : '');
  if(items.length === 0){
    $('productGrid').innerHTML = `<p style="grid-column:1/-1;color:var(--ink-dim);padding:40px 0;text-align:center;">No products match that search.</p>`;
    return;
  }
  $('productGrid').innerHTML = items.map(p => {
    const off = Math.round((1 - p.price / p.was) * 100);
    return `
    <div class="card" data-id="${p.id}">
      <div class="card-media" style="background:${CAT_BG[p.cat]}">
        <svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" style="color:${'#5A6B8C'}">${CAT_ICONS[p.cat]}</svg>
      </div>
      <div class="card-body">
        <div class="card-cat">${CAT_LABELS[p.cat]}</div>
        <p class="card-title">${escapeHtml(p.title)}</p>
        <div class="rating-row">${starRow(p.rating)}<span class="rating-count">${p.ratingCount.toLocaleString('en-IN')}</span></div>
        <div class="price-row">
          <span class="price-now">${formatPrice(p.price)}</span>
          <span class="price-was">${formatPrice(p.was)}</span>
          <span class="price-off">${off}% off</span>
        </div>
        <button class="add-btn" data-id="${p.id}">Add to cart</button>
      </div>
    </div>`;
  }).join('');

  $('productGrid').querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = Number(btn.dataset.id);
      addToCart(id);
      btn.textContent = 'Added ✓';
      btn.classList.add('added');
      setTimeout(() => { btn.textContent = 'Add to cart'; btn.classList.remove('added'); }, 1100);
    });
  });
}

function escapeHtml(str){
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

/* ---------- Cart ---------- */
function addToCart(id){
  cart[id] = (cart[id] || 0) + 1;
  renderCartCount();
  renderCartDrawer();
}
function setQty(id, qty){
  if(qty <= 0){ delete cart[id]; } else { cart[id] = qty; }
  renderCartCount();
  renderCartDrawer();
}
function cartEntries(){
  return Object.entries(cart).map(([id, qty]) => ({ product: PRODUCTS.find(p => p.id === Number(id)), qty }));
}
function cartSubtotal(){
  return cartEntries().reduce((sum, e) => sum + e.product.price * e.qty, 0);
}
function renderCartCount(){
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  $('cartCount').textContent = count;
}
function renderCartDrawer(){
  const entries = cartEntries();
  if(entries.length === 0){
    $('cartItems').innerHTML = `<div class="cart-empty">Your cart is empty.</div>`;
    $('checkoutBtn').disabled = true;
  } else {
    $('cartItems').innerHTML = entries.map(e => `
      <div class="cart-row" data-id="${e.product.id}">
        <div class="cart-media" style="background:${CAT_BG[e.product.cat]}">
          <svg viewBox="0 0 24 24" fill="none" style="color:#5A6B8C">${CAT_ICONS[e.product.cat]}</svg>
        </div>
        <div class="cart-row-body">
          <p class="cart-row-title">${escapeHtml(e.product.title)}</p>
          <p class="cart-row-price">${formatPrice(e.product.price)}</p>
          <div class="qty-row">
            <button class="qty-btn" data-action="dec">−</button>
            <span class="qty-val">${e.qty}</span>
            <button class="qty-btn" data-action="inc">+</button>
            <button class="remove-link" data-action="remove">Remove</button>
          </div>
        </div>
      </div>
    `).join('');
    $('checkoutBtn').disabled = false;

    $('cartItems').querySelectorAll('.cart-row').forEach(row => {
      const id = Number(row.dataset.id);
      row.querySelector('[data-action="inc"]').addEventListener('click', () => setQty(id, (cart[id] || 0) + 1));
      row.querySelector('[data-action="dec"]').addEventListener('click', () => setQty(id, (cart[id] || 0) - 1));
      row.querySelector('[data-action="remove"]').addEventListener('click', () => setQty(id, 0));
    });
  }
  $('cartSubtotal').textContent = formatPrice(cartSubtotal());
}

function openCart(){ $('overlay').classList.add('show'); $('cartDrawer').classList.add('open'); }
function closeCart(){ $('overlay').classList.remove('show'); $('cartDrawer').classList.remove('open'); }

/* ---------- Checkout ---------- */
function renderCheckoutForm(){
  const entries = cartEntries();
  const subtotal = cartSubtotal();
  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;

  $('checkoutContent').innerHTML = `
    <h1>Checkout</h1>
    <div class="co-section">
      <h3>shipping details</h3>
      <div class="co-field"><label>Full name</label><input type="text" id="coName" placeholder="Your name"></div>
      <div class="co-field"><label>Email</label><input type="email" id="coEmail" placeholder="you@example.com"></div>
      <div class="co-field"><label>Address</label><input type="text" id="coAddress" placeholder="Street address"></div>
      <div class="co-row2">
        <div class="co-field"><label>City</label><input type="text" id="coCity" placeholder="City"></div>
        <div class="co-field"><label>PIN code</label><input type="text" id="coPin" placeholder="PIN code"></div>
      </div>
    </div>
    <div class="co-section">
      <h3>order summary</h3>
      ${entries.map(e => `<div class="co-item-row"><span class="name">${escapeHtml(e.product.title)} × ${e.qty}</span><span class="amt">${formatPrice(e.product.price * e.qty)}</span></div>`).join('')}
      <div class="co-item-row"><span class="name">Shipping</span><span class="amt">${shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
      <div class="co-total-row"><span>Total</span><span>${formatPrice(total)}</span></div>
      <button class="place-order-btn" id="placeOrderBtn">Place order</button>
    </div>
  `;

  $('placeOrderBtn').addEventListener('click', () => {
    const name = $('coName').value.trim();
    const address = $('coAddress').value.trim();
    if(!name || !address){
      (name ? $('coAddress') : $('coName')).focus();
      return;
    }
    const orderId = 'BZ-' + Math.floor(100000 + Math.random() * 900000);
    renderConfirmation(orderId, name);
    cart = {};
    renderCartCount();
    renderCartDrawer();
  });
}

function renderConfirmation(orderId, name){
  $('checkoutContent').innerHTML = `
    <div class="confirm-wrap">
      <div class="confirm-check">✓</div>
      <h1>Order placed</h1>
      <p>Thanks${name ? ', ' + escapeHtml(name) : ''} — your order is confirmed.</p>
      <p>Order ID: <span class="confirm-order-id">${orderId}</span></p>
      <button class="continue-btn" id="continueShoppingBtn">Continue shopping</button>
    </div>
  `;
  $('continueShoppingBtn').addEventListener('click', closeCheckout);
}

function openCheckout(){
  closeCart();
  renderCheckoutForm();
  $('checkoutOverlay').classList.add('show');
  window.scrollTo(0,0);
}
function closeCheckout(){
  $('checkoutOverlay').classList.remove('show');
}

/* ---------- Wire up ---------- */
renderCategoryRow();
renderGrid();
renderCartCount();
renderCartDrawer();

$('searchBtn').addEventListener('click', () => { searchQuery = $('searchInput').value.trim(); renderGrid(); });
$('searchInput').addEventListener('keydown', e => {
  if(e.key === 'Enter'){ searchQuery = $('searchInput').value.trim(); renderGrid(); }
});
$('brandHome').addEventListener('click', () => {
  activeCategory = 'all'; searchQuery = ''; $('searchInput').value = '';
  renderCategoryRow(); renderGrid();
});

$('cartBtn').addEventListener('click', openCart);
$('closeCart').addEventListener('click', closeCart);
$('overlay').addEventListener('click', closeCart);
$('checkoutBtn').addEventListener('click', openCheckout);
$('backToShop').addEventListener('click', closeCheckout);
