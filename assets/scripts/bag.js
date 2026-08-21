const ConvenienceFees = 99;
let bagItemObjects = [];
onLoad();

function onLoad() {
  loadBagItemObject();
  displayBagItems();
  displayBagSummary();
  displayBagCount();
}

function loadBagItemObject() {
  bagItemObjects = bagItems
    .map((itemId) => items.find((item) => item.id == itemId))
    .filter(Boolean);
}

function displayBagItems() {
  const containerElement = document.querySelector(".bag-items-container");

  if (!containerElement) return;

  containerElement.innerHTML = bagItemObjects.map((bagItem) => generateItemHtml(bagItem)).join("");

  containerElement.onclick = (event) => {
    const removeButton = event.target.closest(".remove-from-cart");
    if (!removeButton) return;

    removeBagItems(Number(removeButton.dataset.id));
  };
}

function removeBagItems(itemId) {
  const itemCard = document.querySelector(`.remove-from-cart[data-id="${itemId}"]`)?.closest(".bag-item-container");

  if (itemCard) {
    itemCard.classList.add("removing");
    setTimeout(() => {
      bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
      localStorage.setItem("lalBatti", JSON.stringify(bagItems));
      loadBagItemObject();
      displayBagItems();
      displayBagCount();
      displayBagSummary();
    }, 180);
    return;
  }

  bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("lalBatti", JSON.stringify(bagItems));
  loadBagItemObject();
  displayBagItems();
  displayBagCount();
  displayBagSummary();
}

function generateItemHtml(item) {
  return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">₹ ${item.current_price}</span>
                <span class="original-price">₹ ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" data-id="${item.id}">X</div>
          </div>`;
}

function displayBagSummary() {
  const bagSummaryElement = document.querySelector(".bag-summary");
  if (!bagSummaryElement) return;

  let totalItem = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemObjects.forEach((bagItem) => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });

  let finalPayment = totalMRP - totalDiscount + ConvenienceFees;

  bagSummaryElement.innerHTML = `
            <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">₹ 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">₹ ${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>
  `;
}
