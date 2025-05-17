export class RemoveItemToCart {
  constructor(cartRepository, productRepository) {
    this.cartRepository = cartRepository;
    this.productRepository = productRepository;
  }

  async execute(productId) {
    const product = this.productRepository.findById(productId)
    if (!product) throw new Error("Product not found");

    let cart = this.cartRepository.get()
    if(!cart) throw new Error("Product not found");
    const filteredItems = cart.items.filter(item => item.productId !== productId);
    cart.items = filteredItems

    this.cartRepository.save(cart)
  }
}