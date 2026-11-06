// 1. Menu data
const menuItems = [
  { name: "Paneer Tikka", cat: "starter", veg: true, price: "₹280", desc: "Char-grilled cottage cheese with mint chutney." },
  { name: "Samosa Chaat", cat: "starter", veg: true, price: "₹160", desc: "Crisp samosas, yogurt, tamarind and spice." },
  { name: "Chicken 65", cat: "starter", veg: false, price: "₹320", desc: "Spicy fried chicken with curry leaves." },
  { name: "Butter Chicken", cat: "main", veg: false, price: "₹420", desc: "Tandoori chicken in a creamy tomato gravy." },
  { name: "Dal Makhani", cat: "main", veg: true, price: "₹300", desc: "Black lentils slow-cooked overnight with butter." },
  { name: "Lamb Rogan Josh", cat: "main", veg: false, price: "₹480", desc: "Kashmiri-style lamb curry with whole spices." },
  { name: "Garlic Naan", cat: "bread", veg: true, price: "₹70", desc: "Tandoor-baked with garlic and butter." },
  { name: "Tandoori Roti", cat: "bread", veg: true, price: "₹40", desc: "Whole wheat bread from the clay oven." }
];

// 2. Show menu cards
const grid = document.getElementById("menuGrid");

function showMenu(cat) {
  grid.innerHTML = "";
  menuItems
    .filter(item => cat === "all" || item.cat === cat)
    .forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3><span class="dot ${item.veg ? 'veg' : 'nonveg'}"></span>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="price">${item.price}</div>
      `;
      grid.appendChild(card);
    });
}

// 3. Menu filter tabs
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.active").classList.remove("active");
    tab.classList.add("active");
    showMenu(tab.dataset.cat);
  });
});

// 4. Mobile nav toggle
const nav = document.getElementById("nav");
document.getElementById("menuBtn").addEventListener("click", () => {
  nav.classList.toggle("open");
});
nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// 5. Booking form
document.getElementById("resForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("formMsg").textContent =
    "Thank you! Your table request has been received.";
  e.target.reset();
});

// Load all items on start
showMenu("all");

// 6. Open / Closed badge
function updateStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const mins = now.getHours() * 60 + now.getMinutes();
  const weekend = day === 0 || day === 6;

  const openTime = 12 * 60;
  const closeTime = weekend ? 23 * 60 + 30 : 22 * 60 + 30;
  const isOpen = mins >= openTime && mins < closeTime;

  const el = document.getElementById("status");
  if (isOpen) {
    el.textContent = "● Open now · until " + (weekend ? "11:30 pm" : "10:30 pm");
    el.className = "status open";
  } else {
    el.textContent = "● Closed now · opens at 12:00 pm";
    el.className = "status closed";
  }
}

updateStatus();
setInterval(updateStatus, 60000);
