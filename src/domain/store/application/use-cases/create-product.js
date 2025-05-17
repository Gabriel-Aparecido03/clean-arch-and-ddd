import { ProductEntity } from '../../enterprise/entities/product.js'

export class CreateProduct {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute({ name , id , price }) {
    const product = new ProductEntity({ name , id ,price })
    await this.productRepository.save(product)
  }
}