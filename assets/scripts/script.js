let bagItems = JSON.parse(localStorage.getItem('lalBatti'))|| [];
function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("lalBatti", JSON.stringify(bagItems));
}
onLoad();
function onLoad() {
  displayItemsOnHomepage();
  displayBagCount();
}

function displayItemsOnHomepage() {
  let itemsContainerElement = document.querySelector(".items-container");
  if(!itemsContainerElement){
    return;
  }

  let innerHtml = "";
  items.forEach((item) => {
    innerHtml += ` <div class="item-container">
                <img class="item-image" src="${item.image}" alt="img">
                <div class="rating">
                    ${item.rating.stars}⭐ | ${item.rating.count}
                </div>
                <div class="company-name">
                    ${item.company}
                </div>
                <div class="item-name">${item.item_name}</div>
                <div class="price">
                    <span class="current-price">₹ ${item.current_price}</span>
                    <span class="original-price"> ₹ ${item.original_price} </span>
                    <span class="discount">${item.discount_percentage}% OFF</span>
                </div>
                <button class="bag-button" onclick = "addToBag(${item.id})
                displayBagCount()">Add to Bag</button>
            </div>`;
  });
  itemsContainerElement.innerHTML = innerHtml;
}

function displayBagCount() {
  let show = document.querySelector(".bag-item-count");
  if (bagItems.length > 0) {
    show.innerText = bagItems.length;
    show.style.visibility = "visible";
  } else {
    show.style.visibility = "hidden";
  }
}
