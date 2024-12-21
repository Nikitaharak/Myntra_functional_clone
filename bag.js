const CONVENIENCE_FEES = 99;
let bagItemObjects = [];
let bagItems = JSON.parse(localStorage.getItem('bagItems')) || []; // Initialize bagItems from localStorage
let items = [ // Sample data; replace with your actual items
  { id: 1, company: 'Nike', item_name: 'Shoes', original_price: 5000, current_price: 3500, discount_percentage: 30, return_period: 30, delivery_date: '23 Dec 2024', image: 'images/shoes.jpg' },
  { id: 2, company: 'Adidas', item_name: 'T-Shirt', original_price: 2000, current_price: 1500, discount_percentage: 25, return_period: 15, delivery_date: '25 Dec 2024', image: 'images/tshirt.jpg' }
];

onLoad();

function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}

function displayBagSummary() {
  const bagSummaryElement = document.querySelector('.bag-summary');
  const totalItems = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemObjects.forEach(bagItem => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });

  const finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

  bagSummaryElement.innerHTML = `
    <div class="bag-details-container">
      <div class="price-header">PRICE DETAILS (${totalItems} Items)</div>
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
        <span class="price-item-value">₹${CONVENIENCE_FEES}</span>
      </div>
      <hr>
      <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value">₹${finalPayment}</span>
      </div>
    </div>
    <button class="btn-place-order">
      <div class="css-xjhrni">PLACE ORDER</div>
    </button>
  `;
}

function loadBagItemObjects() {
  bagItemObjects = bagItems.map(itemId => {
    return items.find(item => item.id === itemId);
  }).filter(Boolean); // Remove undefined entries
}

function displayBagItems() {
  const containerElement = document.querySelector('.bag-items-container');
  let innerHTML = '';

  bagItemObjects.forEach(bagItem => {
    innerHTML += generateItemHTML(bagItem);
  });

  containerElement.innerHTML = innerHTML;
}

function removeFromBag(itemId) {
  bagItems = bagItems.filter(bagItemId => bagItemId !== itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
}

function displayBagIcon() {
  const bagIconElement = document.querySelector('.bag-item-count');
  bagIconElement.textContent = bagItems.length;
}

function generateItemHTML(item) {
  return `
    <div class="bag-item-container">
      <div class="item-left-part">
        <img class="bag-item-img" src="${item.image}" alt="${item.item_name}">
      </div>
      <div class="item-right-part">
        <div class="company">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price-container">
          <span class="current-price">₹${item.current_price}</span>
          <span class="original-price">₹${item.original_price}</span>
          <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
        </div>
        <div class="return-period">
          <span class="return-period-days">${item.return_period} days</span> return available
        </div>
        <div class="delivery-details">
          Delivery by <span class="delivery-details-days">${item.delivery_date}</span>
        </div>
      </div>
      <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
    </div>
  `;
}

// Update bag icon on page load
displayBagIcon();
