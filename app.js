import { menuArray } from "./data.js";

let orderedItems = [];

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

//LOOK INTO GETTING DATA ID ATTRIBUTE FROM THE ELEMENT CLICKED IN THE EVENT LISTENER

function addItems(itemId) {
  const targetItem = menuArray.filter((item) => {
    return item.id == itemId;
  })[0];

  orderedItems.push(targetItem);

  console.log(orderedItems);

  document.getElementById("total").classList.remove("hidden");

  renderOrderedItems();

  renderTotal();
  // let priceArray = [];
  // let newPriceArray = priceArray.shift(targetItemID.price);

  // console.log(totalPrice);

  // document.getElementById("total-price").textContent = totalPrice;

  // let getOrderItemsHtml = "";
  // targetItem.map((target) => {
  //   getOrderItemsHtml += `
  //       <div class="order-items">
  //        <div class="item-row">
  //       <h4>${target.name}</h4>
  //       <button data-remove="remove" class="remove-btn">remove</button>
  //        </div>
  //       <p data-price="price">$${target.price}</p>
  //       </div>
  //   `;
  // });

  // document.getElementById("total").innerHTML = getOrderItemsHtml;
}

function renderOrderedItems() {
  const html = orderedItems.map((item, index) => {
    return `
    <div class="order-items">
     <div class="item-row">
    <h4>${item.name}</h4>
    <button data-remove="remove" data-id="${index}" class="remove-btn">remove</button>
     </div>
    <p data-price="price">$${item.price}</p>
    </div>`;
  });
  document.getElementById("total").innerHTML = html.join("");
}

function renderTotal() {
  const itemPrices = orderedItems.map((item) => item.price);
  const totalPrice = itemPrices.reduce((a, b) => a + b, 0);
  document.getElementById(
    "total-price"
  ).innerHTML = `Total Price: $${totalPrice}`;
}

function renderMenu() {
  document.getElementById("menu").innerHTML = getMenuHtml();
}

renderMenu();

//Modal Function
// const modal = document.getElementById("modal");
// const closeButton = document.getElementById("modal-close-btn");

// closeButton.addEventListener("click", () => (modal.style.display = "none"));
