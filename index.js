const products = [
  { id:1, name:"Shoes", price:50, img:"https://via.placeholder.com/200" },
  { id:2, name:"Watch", price:80, img:"https://via.placeholder.com/200" },
  { id:3, name:"Bag", price:40, img:"https://via.placeholder.com/200" },
  { id:4, name:"Headphone", price:60, img:"https://via.placeholder.com/200" }
];

let cart = [];

function displayProducts(){
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