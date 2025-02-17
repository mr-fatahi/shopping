import { shoppingDB } from "/data/products.js";

export class Products {
  getProducts() {
    return shoppingDB;
  }
}
