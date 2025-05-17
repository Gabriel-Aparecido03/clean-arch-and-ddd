import { ProductRepository } from "../../../domain/store/application/repositories/product-repository.js";

export class InMemoryProductRepository extends ProductRepository {
  constructor() {
    super()
    this.products = new Map();
  }

  save(product) {
    this.products.set(product.id, product);
  }

  findById(id) {
    return this.products.get(id) || null;
  }

  findAll() {
    return Array.from(this.products.values());
  }

  delete(id) {
    this.products.delete(id);
  }
}
