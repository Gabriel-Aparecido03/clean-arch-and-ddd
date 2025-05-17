export class UpdateQuantityAtCart {
  constructor(cartRepository, productRepository) {
    this.cartRepository = cartRepository;
    this.productRepository = productRepository;
  }

  async execute(productId, quantity = 1) {
    const product = this.productRepository.findById(productId)
    if (!product) throw new Error("Product not found");

    const cart = this.cartRepository.get() || { items : [] }
    const existingItem = cart.items.find(item => item.productId === productId);

    if(!existingItem)throw new Error("Product not found");
    if(existingItem) existingItem.quantity = quantity

    this.cartRepository.save(cart)
  }
}