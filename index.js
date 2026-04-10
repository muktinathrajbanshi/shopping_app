const products = [
  { id: 1, name: "Sneakers", price: 50, category: "shoes", img: "https://cdn-icons-png.flaticon.com/512/2589/2589903.png" },
  { id: 2, name: "Smart Watch", price: 80, category: "electronics", img: "https://cdn-icons-png.flaticon.com/512/747/747376.png" },
  { id: 3, name: "Backpack", price: 40, category: "bags", img: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png" },
  { id: 4, name: "Headphones", price: 60, category: "electronics", img: "https://cdn-icons-png.flaticon.com/512/727/727245.png" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = [];

// DISPLAY PRODUCTS
function displayProducts(list) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>

        <button onclick="addToCart(${p.id})">Add</button>
        <button onclick="addToWishlist(${p.id})">❤️</button>
      </div>
    `;
  });
}

// SEARCH
document.getElementById("search").addEventListener("input", (e) => {
  filterProducts();
});

// CATEGORY
document.getElementById("categoryFilter").addEventListener("change", () => {
  filterProducts();
});

// FILTER LOGIC
function filterProducts() {
  const search = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(search)
  );

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  displayProducts(filtered);
}

// CART
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const totalDiv = document.getElementById("total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name} (${item.qty})</span>
        <div>
          <button onclick="changeQty(${index}, -1)">-</button>
          <button onclick="changeQty(${index}, 1)">+</button>
          <button onclick="removeItem(${index})">✕</button>
        </div>
      </div>
    `;
  });

  totalDiv.innerText = "Total: $" + total;
}

function changeQty(index, val) {
  cart[index].qty += val;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

// WISHLIST
function addToWishlist(id) {
  if (!wishlist.includes(id)) {
    wishlist.push(id);
    alert("Added to wishlist ❤️");
  }
}

// STORAGE
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// CHECKOUT
function checkout() {
  alert("Order placed 🎉");
  cart = [];
  saveCart();
  updateCart();
}

// THEME
function toggleTheme() {
  document.body.classList.toggle("light");
}

// INIT
displayProducts(products);
updateCart();