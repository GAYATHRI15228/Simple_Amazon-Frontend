// which variable, access outside the file.
export let cart = JSON.parse(localStorage.getItem('cart'));
// we might not have cart at first, it will null
if(!cart){
  cart =[{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryoptionid:'1'
},{
    productId:'83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    quantity: 1,
    deliveryoptionid:'2'
}];
}

// we save productid and we search the id in product.js this technique is called deduplicating or Normalizing the data.
export function addtocart(productId) {
  let matchingItem;
  cart.forEach((item) => {
    if(productId === item.productId) {
      matchingItem = item;
    }
  });

  if(matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryoptionid:'1'
    });
  }

  savetostorage();
}

function savetostorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
  
}

export function removefromcart(productid){
  const newcart =[];
  cart.forEach((item) =>{
    if(item.productId !== productid){
      newcart.push(item);
    }
  });
  cart = newcart;
  savetostorage();
}

export function updateDeliveryoption(productid, delivayoptionid){
  let matchingItem;
  cart.forEach((item) => {
    const productid = item.productId;
    const matchingproduct = products.find((product) => product.id === productid);
});

matchingItem.delivayoptionid = delivayoptionid;

savetostorage();
}