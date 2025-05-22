export class RemoveItemToCart {
  constructor(cartRepository, productRepository) {
    this.cartRepository = cartRepository;
    this.productRepository = productRepository;
  }

  async execute(productId) {
    const product = await this.productRepository.findById(productId);
    if (!product) throw new Error("Product not found");

    let cart = await this.cartRepository.get();
    if (!cart) throw new Error("Cart not found");

    const itemIndex = cart.items.findIndex(
      item => toString(item.productId) === toString(productId)
    );

    if (itemIndex === -1) throw new Error("Item not found in cart");

    const item = cart.items[itemIndex];

    item.quantity -= 1;

    if (item.quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    }

    await this.cartRepository.save(cart);
  }
}