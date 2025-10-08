let productsData = [];
let cartBar = document.querySelector("#cart");
let itemContainer = document.querySelector(".item-container");
let cartCancel = document.querySelector(".cart-cancel");
let totalPrice = document.querySelector(".totalPrice");
cartCancel.addEventListener("click", () => cancel());

console.log(itemContainer);
let cart = [];

async function fetchData() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  productsData = data.products; //returns array
  console.log(data);
  console.log(productsData);
  displayProducts(productsData);
}
fetchData();

function displayProducts(productsData) {
  let container = document.getElementById("cardContainer");
  productsData.map((el) => {
    let card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML += `
     <div class="imgContainer">
          <img src="${el.images[0]}" alt="image" />
        </div>
        <div class="info">
          <div class="desc">
            <h6>${el.title}</h6>
            <p>
                ${el.description}
            </p>
          </div>
          <div class="bottom">
            <div class="price">$${el.price}</div>
            <button onclick="addToCart(event, ${el.id});" id="btn${el.id}" class="cartBtn btn${el.id} ">Add to cart</button>
          </div>
            <div class="rating">
                <div class="star">
                </div>
                
            <div class="availStatus">${el.stock} ${el.availabilityStatus}</div>
  
            </div>
             
        </div>
      `;
    container.append(card);
    rating(card, el);
  });
}

let myCollection = document.querySelectorAll('.cartBtn'); // querySelectorAll returns a NodeList, which is iterable.
console.log(myCollection);
const btnArray = Array.from(myCollection);
console.log(btnArray);

btnArray.forEach(element => {
});


function rating(card, el) {
  let rating = Math.floor(el.rating);
  for (let i = 0; i < 5; i++) {
    let star = document.createElement("span");
    let icon = document.createElement("i");
    if (i < rating) {
      icon.classList.add("fa", "fa-star", "checked");
    } else {
      icon.classList.add("fa", "fa-star", "unchecked");
    }
    star.appendChild(icon);
    card.lastElementChild.lastElementChild.firstElementChild.appendChild(star);
  }
}

function addToCart(event, idd) {
  // event.target.style.backgroundColor = "grey";

  let item = productsData.find((i) => i.id == idd);
  cart.push(item); //add item in cart array
  cart.forEach((el) => {
    if (el.id == idd) {
      el["addedQty"] = 1;
      el["cartId"] = 1;
    }
  });
  productsData.forEach((ele) => {
    if (ele.id == item.id) {
      console.log(ele.id);
      ele.stock -= 1;
    }
  });

  cartBar.classList.remove("cartHide");
  cartBar.classList.add("cartDisplay");
  displayCart();
  disableBtn(event, idd);

}

function disableBtn(event, id) {
  cart.forEach((el) => {
    if (el.id == id) {
      event.target.style.backgroundColor = "grey";
      event.target.disabled = true;
    }
    // else{
    //   event.target.disabled = false;
    //   event.target.backgroundColor = 'black'; 
    // }
  });
}

// function enableBtn(event,id){
//   console.log(event.target);
//   cart.forEach(el=>{
//     if(el.id==id){
      
//     }
//   })
// }
function displayCart() {
  itemContainer.innerHTML = "";
  displayTotalPrice();
  if (!cart.length) {
    itemContainer.textContent = "Cart is Empty!";
  }
  cart.forEach((item) => {
    itemContainer.innerHTML += `<div class="item">
          
          <div class="item-img">
          <img src="${item.images[0]}" alt="image" />
          </div>

        <div class="item-info">
          <div class="item-info-content">
            <div class="item-name">
              ${item.title}
            </div>
            
            <div class="item-bottom-info">
             <div>
                $${item.price}
             </div>
             <div class="totalItemQty">
               <button class="minusBtn" onclick="remove(event,${item.id})">-</button>
               <span class="itemQty">${item.addedQty}</span>
               <button class="plusBtn" onclick="add(event,${item.id})">+</button>
             </div>
           </div>
          </div>
            <div class="remove-item" onclick="deleteItem(${item.id})"><img src="cross.svg" alt=""></div>

        </div>
        
        </div>
        `;
  });
}

function displayTotalPrice() {
  let totPrice = 0;
  cart.forEach((el) => {
    console.log(el.addedQty);
    totPrice += el.price * el.addedQty;
  });
  totPrice = totPrice.toFixed(2);
  console.log("p", totPrice);
  console.log("priceDisplay");
  if (!cart.length) {
    totalPrice.innerHTML = "$0";
  } else {
    totalPrice.innerHTML = `$${totPrice}`;
  }
}

function deleteItem(itemId) {
  console.log(itemId);
  const data=document.getElementById(itemId);
  console.log(data);
  cart = cart.filter((i) => i.id != itemId);
  console.log(cart);
  displayCart();
 
}
function cancel() {
  console.log("cancel");
  cartBar.classList.remove("cartDisplay");
  cartBar.classList.add("cartHide");
}
function remove(event,id) {
  console.log("remove");
  console.log(event.target);
  cart.forEach((el) => {
    if (el.id == id && el.addedQty != 1) {
      el.addedQty -= 1;
    } else {
      event.target.disabled = true;
    }
  });

  productsData.forEach((item) => {
    if (item.id == id && item.addedQty != 1) {
      item.stock += 1;
    }
  });
  displayCart();
  // console.log(productsData);
  console.log(cart);
}

function add(event,id) {
  console.log("add");
  cart.forEach((el) => {
    if (el.id == id && el.stock != 0) {
      el.addedQty += 1;
    } else {
      // el.stock = 0;
      event.target.disabled = true;
    }
  });
  productsData.forEach((item) => {
    if (item.id == id && item.stock != 0) {
      item.stock -= 1;
    }
  });
  console.log(productsData);
  console.log(cart);
  displayCart();
}
