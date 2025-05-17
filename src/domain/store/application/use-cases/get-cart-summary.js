export class GetCartSummary {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  async execute() {
    const { items } = await this.cartRepository.get();

    return items.reduce((acc, product) => acc + product.price * product.quantity, 0);
  }
}
