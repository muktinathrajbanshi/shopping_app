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