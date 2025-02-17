import { Storage } from "./storage.js";

const productsDOM = document.querySelector(".carts");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".foot-price");
const cartContent = document.querySelector(".modal__body");
const clearCartBtn = document.querySelector(".clear-cart");

let cart = [];
let buttonsDOM = [];
export class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `<section class="cart">
            <figure class="cart__image">
                <img
                src=${product.imageUrl}
                alt=${product.name}
                />
            </figure>
            <div class="cart__info block">
                <div class="cart__intro">
                    <p>${product.name}</p>
                    <span>${product.price.toLocaleString()} تومان</span>
                </div>
                <button data-id=${
                  product.id
                } class="btn bn--primary add-to-cart">افزودن به سبد خرید</button>
            </div>
        </section>`;
    });
    productsDOM.innerHTML = result;
  }
  getAddBtns() {
    const addToCartBtns = [...document.querySelectorAll(".add-to-cart")];
    buttonsDOM = addToCartBtns;
    addToCartBtns.forEach((btn) => {
      const id = Number(btn.dataset.id);
      const isInCart = cart.find((c) => c.id === id);
      if (isInCart) {
        btn.innerText = "افزوده شده";
        btn.disabled = true;
      }
      btn.addEventListener("click", (e) => {
        e.target.innerText = "افزوده شده";
        e.target.disabled = true;
        const addedProduct = { ...Storage.getProductById(id), qty: 1 };
        cart = [...cart, addedProduct];
        Storage.saveCart(cart);
        this.setCartValue(cart);
        this.addCartItem(addedProduct);
      });
    });
  }
  setCartValue(cart) {
    let tempCartItems = 0;
    const totalPrice = cart.reduce((acc, curr) => {
      tempCartItems += curr.qty;
      return curr.qty * curr.price + acc;
    }, 0);
    cartTotal.innerText = totalPrice.toLocaleString();
    cartItems.innerText = tempCartItems;
  }
  addCartItem(product) {
    const div = document.createElement("div");
    div.classList.add("modal__cart");
    div.innerHTML = `<div class="modal__cart__image">
                <img src=${product.imageUrl} alt=${product.name} />
              </div>
              <div class="modal__cart__info">
                <p>${product.name}</p>
                <span>${product.price.toLocaleString()} تومان</span>
              </div>
              <div class="modal__cart__numbers">
                <i data-id=${product.id} class="fa-solid fa-chevron-up"></i>
                <span>${product.qty}</span>
                <i data-id=${product.id} class="fa-solid fa-chevron-down"></i>
              </div>
              <i data-id=${
                product.id
              } class="fa-solid fa-trash-can remove-item"></i>`;
    cartContent.appendChild(div);
  }
  setupApp() {
    cart = Storage.getCart();
    this.setCartValue(cart);
    this.populateCart(cart);
  }
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }
  cartLogic(cb) {
    clearCartBtn.addEventListener("click", () => this.clearCart(cb));
    cartContent.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-item")) {
        const trashIcon = e.target;
        const id = Number(trashIcon.dataset.id);
        cartContent.removeChild(trashIcon.parentElement);
        this.removeItem(id);
      } else if (e.target.classList.contains("fa-chevron-up")) {
        const incIcon = e.target;
        const id = Number(incIcon.dataset.id);
        const addedItem = cart.find((item) => item.id === id);
        addedItem.qty++;
        Storage.saveCart(cart);
        this.setCartValue(cart);
        incIcon.nextElementSibling.innerText = addedItem.qty;
      } else if (e.target.classList.contains("fa-chevron-down")) {
        const decIcon = e.target;
        const id = Number(decIcon.dataset.id);
        const substractedItem = cart.find((item) => item.id === id);
        if (substractedItem.qty === 1) {
          this.removeItem(id);
          cartContent.removeChild(decIcon.parentElement.parentElement);
          return;
        }
        substractedItem.qty--;
        Storage.saveCart(cart);
        this.setCartValue(cart);
        decIcon.previousElementSibling.innerText = substractedItem.qty;
      }
    });
  }
  clearCart(cb) {
    cart.forEach((item) => this.removeItem(item.id));
    while(cartContent.children.length){
      cartContent.removeChild(cartContent.children[0]);
    }
    cb();
  }
  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValue(cart);
    Storage.saveCart(cart);
    const button = this.getSingleButton(id);
    button.innerText = "افزودن به سبد خرید";
    button.disabled = false;
  }
  getSingleButton(id) {
    return buttonsDOM.find((btn) => Number(btn.dataset.id) === id);
  }
}
