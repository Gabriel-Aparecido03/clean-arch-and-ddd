  export class FindAllProducts {
    constructor(productRepository) {  
      this.productRepository = productRepository
    }

    async execute() {
      return await this.productRepository.findAll()
    }
  }