let shoppingCarts = JSON.parse(localStorage.getItem("carts")) || [];
let cartsResult;
let fillModal;
const cartsNumber = document.querySelector(".number");
const carts = document.querySelector(".carts");
const openModalBtn = document.querySelector(".header__cart");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");
const modalBody = document.querySelector(".modal__body");
function openModal() {
  backdrop.classList.remove("hidden");
  fillModal();
}
function closeModal() {
  backdrop.classList.add("hidden");
}
class Shopping {
  #shoppingDB = [
    {
      id: 1,
      number: 1,
      name: "سرویس خواب دو نفره آرتا",
      price: 3_290_000,
      imageUrl: "/public/images/arta-s-two-3290.jpg",
    },
    {
      id: 2,
      number: 1,
      name: "تخت خواب دو نفره فلورا",
      price: 4_090_000,
      imageUrl: "/public/images/flora-t-two-4090.jpg",
    },
    {
      id: 3,
      number: 1,
      name: "تخت خواب دو طبقه رادو",
      price: 5_290_000,
      imageUrl: "/public/images/rado-2t-5290.jpg",
    },
    {
      id: 4,
      number: 1,
      name: "سرویس خواب دو نفره راموناس",
      price: 23_200_000,
      imageUrl: "/public/images/ramonas-s-two-23200.jpg",
    },
    {
      id: 5,
      number: 1,
      name: "سرویس خواب دو نفره روما",
      price: 2_890_000,
      imageUrl: "/public/images/rooma-s-two-2890.jpg",
    },
    {
      id: 6,
      number: 1,
      name: "تخت خواب یک نفره رویا",
      price: 2_850_000,
      imageUrl: "/public/images/roya-t-one-2850.jpg",
    },
    {
      id: 7,
      number: 1,
      name: "تخت خواب یک نفره صبا",
      price: 1_845_000,
      imageUrl: "/public/images/saba-t-one-1845.jpg",
    },
    {
      id: 8,
      number: 1,
      name: "تخت خواب دو نفره سناتور",
      price: 2_950_000,
      imageUrl: "/public/images/senator-t-two-2950.jpg",
    },
    {
      id: 9,
      number: 1,
      name: "سرویس خواب دو نفره ویدا",
      price: 3_800_000,
      imageUrl: "/public/images/vida-s-two-3800.jpg",
    },
  ];
  #result = "";
  renderProducts() {
    this.#shoppingDB.forEach((product) => {
      this.#result += `<section class="cart">
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
            } class="btn bn--primary add-to-carts">افزودن به سبد خرید</button>
          </div>
        </section>`;
    });
    carts.innerHTML = this.#result;
    const addToCartsBtns = [...document.querySelectorAll(".add-to-carts")];
    addToCartsBtns.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const id = Number(e.target.dataset.id);
        const product = this.#shoppingDB.find((p) => p.id === id);
        this.#addToCarts(product);
        btn.textContent = "به سبد خرید افزوده شده";
        btn.disabled = true;
      })
    );
    this.#checkCarts(addToCartsBtns);
  }
  #checkCarts(buttons) {
    buttons.forEach((btn) => {
      if (shoppingCarts.some((cart) => cart.id === Number(btn.dataset.id))) {
        btn.textContent = "به سبد خرید افزوده شده";
        btn.disabled = true;
      }
    });
  }
  #addToCarts(product) {
    shoppingCarts.push(product);
    cartsNumber.textContent = shoppingCarts.length;
    localStorage.setItem("carts", JSON.stringify(shoppingCarts));
  }
  cartsInModal() {
    modalBody.innerHTML = "";
    cartsResult = "";
    shoppingCarts.forEach((product) => {
      cartsResult += `<div class="modal__cart">
              <div class="modal__cart__image">
                <img src=${product.imageUrl} alt=${product.name} />
              </div>
              <div class="modal__cart__info">
                <p>${product.name}</p>
                <span>${product.price.toLocaleString()} تومان</span>
              </div>
              <div class="modal__cart__numbers">
                <i class="fa-solid fa-chevron-up"></i>
                <span class="num">${product.number}</span>
                <i class="fa-solid fa-chevron-down"></i>
              </div>
              <span data-id=${
                product.id
              } class="trash"><i class="fa-solid fa-trash-can"></i></span>
            </div>`;
    });
    modalBody.innerHTML = cartsResult;
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  cartsNumber.textContent = shoppingCarts.length;
  const shoppingApp = new Shopping();
  shoppingApp.renderProducts();
  fillModal = shoppingApp.cartsInModal;
});

openModalBtn.addEventListener("click", openModal);
backdrop.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => e.stopPropagation());
