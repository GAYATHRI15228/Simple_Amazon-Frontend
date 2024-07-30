// Assuming products.js is loaded and the products array is available globally
import {cart, addtocart} from '../data/cart.js';
import { products } from '../data/products.js'; // we turn into module
let productsHTML = '';

products.forEach((product) => {
  productsHTML +=
    `<div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>
      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>
      <div class="product-rating-container">
        <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>
      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>
      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <div class="product-spacer"></div>
      <div class="added-to-cart">
        <img src="images/icons/checkmark.png"> Added
      </div>
      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>`;
});

document.querySelector('.products-grid').innerHTML = productsHTML;
// moving function addtocart() to cart.js because it contain all the cart file.

function updatecartquantity(){
  let cartQuantity = 0;

  cart.forEach((item) =>{
    cartQuantity += item.quantity;
  });

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {

    // instead of using product name use product id to avoid the confussion.
    const productId = button.dataset.productId;
    // Add the product to the cart (assuming a cart array exists)
    // check the item is already in the list. 1 way to check is loop through our cart.

    addtocart(productId);
    updatecartquantity();
   

  });
});
