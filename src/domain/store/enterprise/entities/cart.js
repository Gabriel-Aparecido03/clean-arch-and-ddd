export class CartEntity {
  constructor() {
    this.items = [];
  }

  addItem(cartItem) {
    this.items.push(cartItem);
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.productId !== productId);
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.productId === productId);
    if (!item) throw new Error("Product not found in cart");
    item.quantity = quantity;
  }

  clearCart() {
    this.items = [];
  }

  getSummary() {
    return this.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
  }
}