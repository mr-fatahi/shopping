const productsDOM = document.querySelector(".carts");

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
                <button class="btn bn--primary">افزودن به سبد خرید</button>
            </div>
        </section>`;
    });
    productsDOM.innerHTML = result;
  }
}
