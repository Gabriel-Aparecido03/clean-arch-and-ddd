export class AddItemToCart {
  constructor(cartRepository, productRepository) {
    this.cartRepository = cartRepository;
    this.productRepository = productRepository;
  }

  async execute(productId, quantity = 1) {
    const product = await this.productRepository.findById(productId)
    if (!product) throw new Error("Product not found");

    const cart = await this.cartRepository.get() || { items : [] }
    const existingItem = cart.items.find(item => item.id === productId);
    if(existingItem) existingItem.quantity += 1
    else cart.items.push({ ...product , quantity })

    await this.cartRepository.save(cart)
    return product
  }
}