export class CartController {
  constructor(
    addProductToCartUseCase,
    getCartSummaryUseCase,
    removeItemFromCartUseCase,
    clearCartUseCase
  ) {
    this.addProductToCartUseCase = addProductToCartUseCase;
    this.getCartSummaryUseCase = getCartSummaryUseCase;
    this.removeItemFromCartUseCase = removeItemFromCartUseCase;
    this.clearCartUseCase = clearCartUseCase;
    this.cartContainer = document.getElementById("cart-container");
  }

  paintAtScreenSummary(summary) {
    let summaryDiv = document.getElementById("summary-container");
    if (!summaryDiv) {
      summaryDiv = document.createElement("div");
      summaryDiv.id = "cart-summary";
      summaryDiv.className = "cart-summary";
      this.cartContainer.appendChild(summaryDiv);
    }

    summaryDiv.innerHTML = `
    <hr />
    <h4>Cart Summary</h4>
    <p>Total Price: $${summary.toFixed(2)}</p>
  `;
  }

  paintAtScreenProduct(product, quantity) {
    const existingProductDiv = document.getElementById(`product-${product.id}`);

    if (existingProductDiv) {
      const quantitySpan = existingProductDiv.querySelector("span");
      const currentQuantity = parseInt(
        quantitySpan.textContent.replace(/\D/g, ""),
        10
      );
      const newQuantity = currentQuantity + quantity;
      quantitySpan.textContent = `Quantity: ${newQuantity}`;
      return;
    }

    const productDiv = document.createElement("div");
    productDiv.className = "product-item";
    productDiv.id = `product-${product.id}`;

    productDiv.innerHTML = `
    <h3>${product.name}</h3>
    <p>Price: $${product.price}</p>
    <span>Quantity: ${quantity}</span>
    <button id="${product.id}-cart">Remove from cart</button>
  `;
    this.cartContainer.appendChild(productDiv);

    const button = document.getElementById(`${product.id}-cart`);
    button.addEventListener("click", () => this.removeItemFromCart(product.id));
  }

  async addProduct(productId, quantity) {
    const product = await this.addProductToCartUseCase.execute(
      productId,
      quantity
    );
    this.paintAtScreenProduct(product, quantity);
    await this.viewCart();
  }

  async viewCart() {
    const summary = await this.getCartSummaryUseCase.execute();
    this.paintAtScreenSummary(summary);
  }

  async removeItemFromCart(productId) {
  await this.removeItemFromCartUseCase.execute(productId);

  const productElement = document.getElementById(`product-${productId}`);
  if (productElement) {
    const quantitySpan = productElement.querySelector("span");
    const currentQuantity = parseInt(
      quantitySpan.textContent.replace(/\D/g, ""),
      10
    );

    const newQuantity = currentQuantity - 1;

    if (newQuantity <= 0) {
      this.cartContainer.removeChild(productElement);
    } else {
      quantitySpan.textContent = `Quantity: ${newQuantity}`;
    }
  }

  await this.viewCart();
}

  clearCart() {
    this.clearCartUseCase.execute();
    this.cartContainer.innerHTML = "";
  }
}
