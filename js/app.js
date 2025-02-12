const shoppingDB = [
  {
    id: 1,
    name: "سرویس خواب دو نفره آرتا",
    price: 3_290_000,
    imageUrl: "/public/images/arta-s-two-3290.jpg",
  },
  {
    id: 2,
    name: "تخت خواب دو نفره فلورا",
    price: 4_090_000,
    imageUrl: "/public/images/flora-t-two-4090.jpg",
  },
  {
    id: 3,
    name: "تخت خواب دو طبقه رادو",
    price: 5_290_000,
    imageUrl: "/public/images/rado-2t-5290.jpg",
  },
  {
    id: 4,
    name: "سرویس خواب دو نفره راموناس",
    price: 23_200_000,
    imageUrl: "/public/images/ramonas-s-two-23200.jpg",
  },
  {
    id: 5,
    name: "سرویس خواب دو نفره روما",
    price: 2_890_000,
    imageUrl: "/public/images/rooma-s-two-2890.jpg",
  },
  {
    id: 6,
    name: "تخت خواب یک نفره رویا",
    price: 2_850_000,
    imageUrl: "/public/images/roya-t-one-2850.jpg",
  },
  {
    id: 7,
    name: "تخت خواب یک نفره صبا",
    price: 1_845_000,
    imageUrl: "/public/images/saba-t-one-1845.jpg",
  },
  {
    id: 8,
    name: "تخت خواب دو نفره سناتور",
    price: 2_950_000,
    imageUrl: "/public/images/senator-t-two-2950.jpg",
  },
  {
    id: 9,
    name: "سرویس خواب دو نفره ویدا",
    price: 3_800_000,
    imageUrl: "/public/images/vida-s-two-3800.jpg",
  },
];
const carts = document.querySelector(".carts");
class Shopping {
  #db;
  constructor(_db) {
    this.#db = _db;
  }
  renderProducts() {
    this.#db.forEach((product) => {
      const cart = document.createElement("section");
      cart.classList.add("cart");
      cart.innerHTML = `<figure class="cart__image">
            <img
              src=${product.imageUrl}
              alt=${product.name}
            />
          </figure>
          <div class="cart__info block">
            <div class="cart__intro">
              <p>${product.name}</p>
              <span><i>${product.price}</i> تومان</span>
            </div>
            <button class="btn bn--primary">افزودن به سبد خرید</button>
          </div>`;
      carts.append(cart);
    });
  }
}

const shoppingApp = new Shopping(shoppingDB);
document.addEventListener("DOMContentLoaded", shoppingApp.renderProducts());
