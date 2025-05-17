export class ProductController {
  constructor(findAllUseCase, createProductUseCase, addItemToCart) {
    this.findAllUseCase = findAllUseCase;
    this.createProductUseCase = createProductUseCase;
    this.addItemToCartUseCase = addItemToCart
    this.productContainer = document.getElementById("product-container");
  }

  async setMockProduct() {
    await Promise.all([
      this.createProductUseCase.execute({ name: "Produto-1", id: "1", price: 200 }),
      this.createProductUseCase.execute({ name: "Produto-2", id: "2", price: 150 }),
      this.createProductUseCase.execute({ name: "Produto-3", id: "3", price: 300 }),
      this.createProductUseCase.execute({ name: "Produto-4", id: "4", price: 250 }),
      this.createProductUseCase.execute({ name: "Produto-5", id: "5", price: 100 }),
      this.createProductUseCase.execute({ name: "Produto-6", id: "6", price: 350 }),
      this.createProductUseCase.execute({ name: "Produto-7", id: "7", price: 400 }),
      this.createProductUseCase.execute({ name: "Produto-8", id: "8", price: 220 }),
      this.createProductUseCase.execute({ name: "Produto-9", id: "9", price: 180 }),
      this.createProductUseCase.execute({ name: "Produto-10", id: "10", price: 275 }),
      this.createProductUseCase.execute({ name: "Produto-11", id: "11", price: 320 }),
      this.createProductUseCase.execute({ name: "Produto-12", id: "12", price: 90 }),
      this.createProductUseCase.execute({ name: "Produto-13", id: "13", price: 500 }),
      this.createProductUseCase.execute({ name: "Produto-14", id: "14", price: 125 }),
      this.createProductUseCase.execute({ name: "Produto-15", id: "15", price: 260 }),
      this.createProductUseCase.execute({ name: "Produto-16", id: "16", price: 330 }),
      this.createProductUseCase.execute({ name: "Produto-17", id: "17", price: 145 }),
      this.createProductUseCase.execute({ name: "Produto-18", id: "18", price: 215 }),
      this.createProductUseCase.execute({ name: "Produto-19", id: "19", price: 385 }),
      this.createProductUseCase.execute({ name: "Produto-20", id: "20", price: 295 }),
      this.createProductUseCase.execute({ name: "Produto-21", id: "21", price: 199 }),
    ]);
  }

  async loadProducts() {
    const products = await this.findAllUseCase.execute();
    this.productContainer.innerHTML = "";
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product-item";

      productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <button data-id="${product.id}">Add to Cart</button>
      `;
      this.productContainer.appendChild(productDiv);
    });

    this.productContainer.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", async(event) => {
        const productId = event.target.getAttribute("data-id");
        await this.addItemToCartUseCase(productId,1);
      });
    });
  }
}
