import { CartRepository } from "../../../domain/store/application/repositories/cart-repository.js";

export  class InMemoryCartRepository extends CartRepository {
  constructor() {
    super()
    this.cart = new Map();
  }

  save(cart) {
    this.cart.set("cart", cart);
  }

  get() {
    return this.cart.get("cart") || { items : [] }
  }
}