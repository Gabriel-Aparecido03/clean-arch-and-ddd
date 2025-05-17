
export class ClearCart {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  async execute() {
    this.cartRepository.save({ items : [] })
  }
}