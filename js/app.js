import { Products } from "./data.js";
import { UI } from "./view.js";
import { Storage } from "./storage.js";

const openModalBtn = document.querySelector(".header__cart");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");

document.addEventListener("DOMContentLoaded", () => {
  const productsData = new Products().getProducts();
  const ui = new UI();
  ui.displayProducts(productsData);
  Storage.saveProducts(productsData);
});

function openModal() {
  backdrop.classList.remove("hidden");
}
function closeModal() {
  backdrop.classList.add("hidden");
}
openModalBtn.addEventListener("click", openModal);
backdrop.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => e.stopPropagation());
