"use-strict";
const menuBtn = document.querySelector(".menu-btn");
const navCenter = document.querySelector(".nav-center");
const productWrapper = document.querySelector(".products-wrapper");

const filterInput = document.querySelector(".filter-categories");
const itemCount = document.querySelector(".items-in__cart");
const cartToggle = document.querySelector(".cart-toggle");
const cart = document.querySelector(".main-cart");
cartToggle.addEventListener("click", () => {
  cart.classList.toggle("active");
  overlay.classList.toggle("active");
});

let overlay = document.querySelector(".overlay");

overlay.addEventListener("click", () => {
  overlay.classList.toggle("active");
  cart.classList.remove("active");
  navCenter.classList.remove("active");
  menuBtn.classList.remove("close");
});

function expandMenu(e) {
  navCenter.classList.toggle("active");
  menuBtn.classList.toggle("close");
  overlay.classList.toggle("active");
}

const products = [
  {
    id: 1,
    category: "shoes",
    productname: "Sports shoes",
    price: "$10",
    currentprice: "9$",
    imgurl: "assets/p1.jpg",
  },
  {
    id: 2,
    category: "shoes",
    productname: "Sneakers",
    price: "$12",
    currentprice: "9$",
    imgurl: "assets/p8.jpg",
  },
  {
    id: 3,
    category: "shoes",
    productname: "Nike",
    price: "$12",
    currentprice: "9$",
    imgurl: "assets/p7.jpg",
  },
  {
    id: 3,
    category: "shoes",
    productname: "Air",
    price: "$12",
    currentprice: "$9",
    imgurl: "assets/p2.jpg",
  },
  {
    id: 3,
    category: "shoes",
    productname: "Delta",
    price: "$12",
    currentprice: "$9",
    imgurl: "assets/p5.jpg",
  },
  {
    id: 3,
    category: "shoes",
    productname: "sportif",
    price: "$12",
    currentprice: "$9",
    imgurl: "assets/p4.jpg",
  },
  {
    id: 7,
    category: "shoes",
    productname: "shoe",
    price: "$12",
    currentprice: "9$",
    imgurl: "assets/p3.jpg",
  },
  {
    id: 8,
    category: "bag",
    productname: "bag",
    price: "$12$",
    currentprice: "9$",
    imgurl: "assets/p6.jpg",
  },
];
window.addEventListener("DOMContentLoaded", function () {
  loadProductDom(products);
  displayMenuButtons();

  const removeItemBtns = document.querySelectorAll(".remove-item");
  removeItemBtns.forEach((btn) => {
    btn.addEventListener("click", removeItems);
  });
  let quantityInputs = document.getElementsByClassName("input-quantity");
  for (i = 0; i < quantityInputs.length; i++) {
    let quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", quantityChanged);
  }
  const addToCartBtns = document.querySelectorAll(".cart-btn");
  addToCartBtns.forEach((btn) => btn.addEventListener("click", addItemsToCart));
});

function loadProductDom(items) {
  let displayItems = items.map((product, i, arr) => {
    return `
    <div class="product">
    <div class="product-img">
      <img src="${product.imgurl}" alt="" />
      <span class="cart-btn"> <i class="bx bx-cart"></i></span>
    </div>
    <div class="product-info">
      <h3 class="product-title">${product.productname}</h3>
      
      <h3 class="product-price">${product.price}</h3>
    </div>
  </div>
      `;
  });
  displayItems = displayItems.join("");
  productWrapper.innerHTML = displayItems;
}

function displayMenuButtons() {
  const categories = products.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );

  const filterBtns = categories
    .map((category, i, arr) => {
      return `<button data-id="${category}" class="filter-btn">${category}</button> `;
    })
    .join("");
  const filterBtnsContainer = document.querySelector(".filter-btns__container");
  filterBtnsContainer.innerHTML = filterBtns;
  const filterBtn = document.querySelectorAll(".filter-btn");

  filterItems(filterBtn);
}

function filterItems(filterBtn) {
  filterBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemsid = e.target.dataset.id;
      const menuCategory = products.filter((item) => {
        if (item.category === itemsid) {
          return item;
        }
      });

      if (itemsid === "all") {
        loadProductDom(products);
      } else {
        loadProductDom(menuCategory);
      }
    });
  });
}

filterInput.addEventListener("change", function () {
  let searchQuery = filterInput.value.trim().toLowerCase();
  console.log(searchQuery);
  if (searchQuery === "all") {
    loadProductDom(products);
  } else {
    const menuCategory = products.filter((item) => {
      if (item.category === searchQuery) {
        return item;
      }
      filterInput.value = "";
    });
    loadProductDom(menuCategory);
  }
});

function addItemsToCart(e) {
  console.log(
    e.target.parentElement.previousElementSibling.parentElement
      .nextElementSibling.firstElementChild.nextElementSibling
  );
  if (e.target.parentElement.classList.contains("cart-btn")) {
    const item = {};
    // const name =
    item.name =
      e.target.parentElement.previousElementSibling.parentElement.nextElementSibling.firstElementChild.innerText;

    item.price =
      e.target.parentElement.previousElementSibling.parentElement.nextElementSibling.firstElementChild.nextElementSibling.innerText;
    const partialPath = e.target.parentElement.previousElementSibling.src;

    let position = partialPath.indexOf("assets") + 6;
    let fullPath = partialPath.slice(position);
    console.log(fullPath);
    item.img = `assets${fullPath}`;
    console.log(item);

    createCartUi(item);
    updateCartTotal();
  }
}

function createCartUi(item) {
  let cartItem = document.createElement("div");
  cartItem.classList.add("cart-row");
  const cartitemsContainer = document.querySelector(".cart-items__container");
  const itemTitle = cartitemsContainer.querySelectorAll(".item-name");
  for (i = 0; i < itemTitle.length; i++) {
    let title = itemTitle[i];
    if (title.textContent === item.name) {
      alert(
        `${item.name} already in cart tip: go to cart increase its quantity`
      );
      return;
    }
  }
  cartItem.innerHTML = `
 
  <div class="item label">
    <div class="item-img">
      <img src="${item.img}" alt="" />
    </div>
    <div class="item-info">
      <span class="item-name">${item.name}</span>
      <div class="price-label"><span class="cart-item-price">${item.price}</span></div>
    </div>
  </div>
  <div class="quantity label">
  <input type="number" class="input-quantity" value="1" />
</div>
 

  
  <button class="remove-item" class="label">
remove
</button>
 
  `;

  cartitemsContainer.append(cartItem);
  const removeItemBtns = document.querySelectorAll(".remove-item");
  removeItemBtns.forEach((btn) => {
    btn.addEventListener("click", removeItems);
  });

  let quantityInputs = document.getElementsByClassName("input-quantity");
  for (i = 0; i < quantityInputs.length; i++) {
    let quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", quantityChanged);
  }
}

menuBtn.addEventListener("click", expandMenu);

function removeItems(e) {
  e.target.previousElementSibling.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  let input = event.target;

  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}
const cartitemsContainer = document.querySelector(".cart-items__container");
function updateCartTotal() {
  const cartRowsContainer = document.querySelector(".cart-items__container");

  const cartRows = cartRowsContainer.getElementsByClassName("cart-row");

  const totals = [];
  let finalprice = 0.0;

  for (i = 0; i < cartRows.length; i++) {
    let cartrow = cartRows[i];
    console.log(cartrow);
    const priceEl = cartrow.getElementsByClassName("cart-item-price")[0];

    let quantityEl = cartrow.getElementsByClassName("input-quantity")[0];
    let price = priceEl.textContent;
    let quantity = quantityEl.value;

    console.log(typeof quantity, price);
    totals.push(Number.parseFloat(price.replace("$", "")) * quantity);

    const totalPrice = totals.reduce((total, cur) => total + cur, 0);
    finalprice = totalPrice.toFixed(2);
  }

  const priceLabel = document.querySelector(".total-label");

  console.log(totals);
  priceLabel.textContent = ` $${finalprice}`;

  itemCount.textContent = totals.length;
  let h1 = cartitemsContainer.querySelector("h1");
  if (totals.length === 0) {
    h1.textContent = "your cart is currently empty";
    h1.style.opacity = "1";
  } else {
    h1.style.opacity = "0";
  }
}
updateCartTotal();
