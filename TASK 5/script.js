const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    category: "smartphone",
    price: 999,
    rating: 4.8,
    image: "📱"
  },
  {
    id: 2,
    name: "MacBook Pro 16\"",
    category: "laptop",
    price: 2499,
    rating: 4.9,
    image: "💻"
  },
  {
    id: 3,
    name: "iPad Air",
    category: "tablet",
    price: 599,
    rating: 4.7,
    image: "📱"
  },
  {
    id: 4,
    name: "Sony WH-1000XM5",
    category: "accessory",
    price: 399,
    rating: 4.6,
    image: "🎧"
  }
];

let cart = [];

const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const sortFilter = document.getElementById("sortFilter");
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

function renderProducts(list) {
  productsGrid.innerHTML = "";
  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image">${product.image}</div>
      <h3 class="product-title">${product.name}</h3>
      <p>$${product.price}</p>
      <p>Rating: ${product.rating} ⭐</p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    productsGrid.appendChild(card);
  });

  document.querySelectorAll(".add-to-cart").forEach(btn =>
    btn.addEventListener("click", e => {
      const id = parseInt(e.target.dataset.id);
      addToCart(id);
    })
  );
}

function filterAndSortProducts() {
  let filtered = [...products];

  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm));
  }

  const category = categoryFilter.value;
  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }

  const priceRange = priceFilter.value;
  if (priceRange) {
    const [min, max] = priceRange === "2000+" ? [2000, Infinity] : priceRange.split("-").map(Number);
    filtered = filtered.filter(p => p.price >= min && p.price <= max);
  }

  const sort = sortFilter.value;
  if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "price-low") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-high") filtered.sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);

  renderProducts(filtered);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} x${item.qty}</span>
      <span>$${item.qty * item.price}</span>
    `;
    cartItems.appendChild(div);
  });

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

searchInput.addEventListener("input", filterAndSortProducts);
categoryFilter.addEventListener("change", filterAndSortProducts);
priceFilter.addEventListener("change", filterAndSortProducts);
sortFilter.addEventListener("change", filterAndSortProducts);

cartBtn.addEventListener("click", () => {
  cartModal.style.display = "flex";
});
closeCartBtn.addEventListener("click", () => {
  cartModal.style.display = "none";
});

renderProducts(products);
