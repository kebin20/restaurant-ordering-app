import { menuArray } from "./data.js";

function getMenuHtml() {
  let menuHtml = "";
  menuArray.forEach((menu) => {
    menuHtml += `
      <div class="menu-items" id="menu-items">
        <span>${menu.emoji}</span>
        <div class="details">
        <h3>${menu.name}</h3>
        <p>${menu.ingredients}</p>
        <p><strong>$${menu.price}</strong></p></div>
      <button class="add-btn" data-item="${menu.id}">+</button>
      </div>
      `;
  });
  return menuHtml;
}

document.addEventListener("click", (e) => {
  document.getElementById("order-total").classList.remove("hidden");
  if (e.target.dataset.item) {
    addItems(e.target.dataset.item);
  } else if (e.target.dataset.remove) {
    removeItems(e.target.dataset.remove);
  } else if (e.target.id === "complete-order-btn") {
    completeOrder();
  } else if (e.target.id === "close-modal") {
    closeModal();
  }
});

function addItems(itemId) {
  const targetItemID = menuArray.filter((item) => {
    return item.id == itemId;
  })[0];

  console.log(targetItemID.price);

  document.getElementById("total").classList.remove("hidden");

  let priceArray = [];
  let newPriceArray = priceArray.shift(targetItemID.price);
  const totalPrice = newPriceArray.reduce((a, b) => a + b, 0);

  console.log(totalPrice);

  // document.getElementById("total-price").textContent = totalPrice;

  return (document.getElementById("total").innerHTML += `
        <div class="order-items">
         <div class="item-row">
        <h4>${targetItemID.name}</h4>
        <button data-remove="remove" class="remove-btn">remove</button>
         </div>
        <p data-price="price">$${targetItemID.price}</p>
        </div>
    `);
}

function renderMenu() {
  document.getElementById("menu").innerHTML = getMenuHtml();
}

renderMenu();

//Modal Function
// const modal = document.getElementById("modal");
// const closeButton = document.getElementById("modal-close-btn");

// closeButton.addEventListener("click", () => (modal.style.display = "none"));
