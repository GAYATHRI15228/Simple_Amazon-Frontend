// checkout.js
// Import necessary modules and data
import { cart, removefromcart, updateDeliveryoption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formateCurrency } from "../utils/money.js";
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryoption } from '../../data/deliveryoption.js'
// use add method which take 2 parameter 1st para is the no.of times we want to add, 2nd link of time we want to add

// Get the current date
const today = dayjs();

// Calculate the delivery date (7 days from today)
const deliverydate = today.add(7, 'days');
console.log(deliverydate.format('dddd, MMMM D'));
export function renderordersummary(){
// Initialize the cart summary HTML
let cartsummaryHTML = '';

// Loop through each item in the cart
cart.forEach((item) => {
  const productid = item.productId;
  const matchingproduct = products.find((product) => product.id === productid);

  // If a matching product is found
  if (matchingproduct) {
    cartsummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
        <div class="delivery-date">
          Delivery date: ${deliverydate.format('dddd, MMMM D')}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingproduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingproduct.name}
            </div>
            <div class="product-price">
              $${formateCurrency(matchingproduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${item.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link js-delete-link link-primary" data-productid="${matchingproduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryoptionshtml(matchingproduct)}
          </div>
        </div>
      </div>
    `;
  } else {
    console.log(`No matching product found for product ID ${productid}`);
  }
});

// Function to generate the delivery options HTML
function deliveryoptionshtml(matchingproduct){
  let html ='';

  // Loop through each delivery option
  deliveryoption.forEach((deliveryoption) =>{
    const today = dayjs();
    let deliverydate;
    if(deliveryoption.deliverydays){
      deliverydate = today.add(deliveryoption.deliverydays, 'days');
    } else if(deliveryoption.deliveryoption){
      deliverydate = today.add(deliveryoption.deliveryoption, 'days');
    } else {
      deliverydate = today;
    }
    const datstring = deliverydate.format('dddd, MMMM D');
    const priceString = deliveryoption.pricecents === 0?'FREE':`$${formateCurrency(deliveryoption.pricecents)} -`;
    html +=
    `
    <div class="delivery-option js-delivery-option" data-product-id="${matchingproduct.id}"
    data-delivery-option-id="${deliveryoption.id}">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingproduct.id}">
          <div>
            <div class="delivery-option-date">
              ${datstring}
            </div>
            <div class="delivery-option-price">
              ${priceString} shipping
            </div>
          </div>
        </div>

    `
  });
  return html;
}
/*
    select all delete links in the page
    when we click 
    1. remove the product from the cart
    2. update the html
    steps:
      1. use the DOM to get the element to remove.
      2. use .remove() method
*/

// Update the order summary HTML
document.querySelector('.js-order-summary')
   .innerHTML = cartsummaryHTML;

// Add event listeners to the delete links
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    const productId = link.dataset.productid;
    removefromcart(productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
  });
});

// Add event listeners to the delivery option links
document.querySelectorAll('.js-delivery-option')
 .forEach((element)=>{
    element.addEventListener('click',() =>{
      const {productId,deliveryoption}=element.dataset;
      updateDeliveryoption(productId,deliveryoption);
      renderordersummary();
    });
  });
}
