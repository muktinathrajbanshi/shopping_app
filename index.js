document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  displayProducts(products.filter(p => p.name.toLowerCase().includes(value)));
});

document.getElementById("categoryFilter").addEventListener("change", (e) => {
  const category = e.target.value;
  if (category === "all") {
    displayProducts(products);
  } else {
    displayProducts(products.filter(p => p.category === category));
  }
});

let wishlist = [];

function addToWishlist(id) {
  wishlist.push(id);
  alert("Added to wishlist ❤️");
}

const products = [
  { id: 1, name: "Sneakers", price: 50, img: "https://cdn-icons-png.flaticon.com/512/2589/2589903.png" },
  { id: 2, name: "Smart Watch", price: 80, img: "https://cdn-icons-png.flaticon.com/512/747/747376.png" },
  { id: 3, name: "Backpack", price: 40, img: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png" },
  { id: 4, name: "Headphones", price: 60, img: "https://cdn-icons-png.flaticon.com/512/727/727245.png" }
];

let cart = [];

function displayProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

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
        <div>
          <p>${item.name}</p>
          <small>Qty: ${item.qty}</small>
        </div>
        <div class="cart-controls">
          <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
          <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
          <button class="remove-btn" onclick="removeItem(${index})">✕</button>
        </div>
      </div>
    `;
  });

  totalDiv.innerText = "Total: $" + total;
}

function changeQty(index, amount) {
  cart[index].qty += amount;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

displayProducts();