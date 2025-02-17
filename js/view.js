import { Storage } from "./storage.js";

const productsDOM = document.querySelector(".carts");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".foot-price");
const cartContent = document.querySelector(".modal__body");

let cart = [];
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
                <i class="fa-solid fa-chevron-up"></i>
                <span>${product.qty}</span>
                <i class="fa-solid fa-chevron-down"></i>
              </div>
              <span data-id="1" class="trash"><i class="fa-solid fa-trash-can"></i></span>`;
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
}
