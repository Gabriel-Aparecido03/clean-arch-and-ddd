import { InMemoryCartRepository } from "../repository/in-memory/in-memory-cart-repository.js";
import { InMemoryProductRepository } from "../repository/in-memory/in-memory-product-repository.js";

import { ProductController } from "./product-controller.js";
import { CartController } from "./cart-controller.js";

import { AddItemToCart } from "../../domain/store/application/use-cases/add-item-to-cart.js";
import { GetCartSummary } from "../../domain/store/application/use-cases/get-cart-summary.js";
import { RemoveItemToCart } from "../../domain/store/application/use-cases/remove-item-from-cart.js";
import { ClearCart } from "../../domain/store/application/use-cases/clear-cart.js";

import { FindAllProducts } from "../../domain/store/application/use-cases/find-all-products.js";
import { CreateProduct } from "../../domain/store/application/use-cases/create-product.js";

const productRepository = new InMemoryProductRepository();
const cartRepository = new InMemoryCartRepository();

const addItemToCartUseCase = new AddItemToCart(cartRepository,productRepository);
const getCartSummaryUseCase = new GetCartSummary(cartRepository);
const removeItemToCartUseCase = new RemoveItemToCart(cartRepository,productRepository);
const clearCart = new ClearCart(cartRepository);
const findAllUseCase = new FindAllProducts(productRepository);
const createProductUseCase = new CreateProduct(productRepository);


export class ControllerModuleCart {
  static usage() {
    return new CartController(
      addItemToCartUseCase,
      getCartSummaryUseCase,
      removeItemToCartUseCase,
      clearCart
    );
  }
}

export class ControllerModuleProduct {
  static usage() {
    return new ProductController(
      findAllUseCase,
      createProductUseCase,
      (productId, quantity) => ControllerModuleCart.usage().addProduct(productId, quantity));
  }
}

