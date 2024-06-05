// Select DOM elements
const createProductForm: HTMLFormElement | null = document.querySelector(
  "#create-product-form"
);
const productFormContainer: HTMLDivElement | null =
  document.querySelector("#product-form");
const productList: HTMLUListElement | null =
  document.querySelector("#products");

interface Product {
  id?: number;
  name: string;
  price: number;
  number: number;
}

// Create product card
const createProductCard = (product: Product): HTMLLIElement => {
  const productCard: HTMLLIElement = document.createElement("li");

  const productName: HTMLHeadingElement = document.createElement("h3");
  const productPrice: HTMLParagraphElement = document.createElement("p");
  const productNumber: HTMLParagraphElement = document.createElement("p");
  const deleteBtn: HTMLButtonElement = document.createElement("button");

  productName.textContent = `Name: ${product.name}`;
  productPrice.textContent = `Price: $${product.price.toFixed(2)}`;
  productNumber.textContent = `Item Number: ${product.number}`;
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", () => deleteProduct(product.id!));

  productCard.appendChild(productName);
  productCard.appendChild(productPrice);
  productCard.appendChild(productNumber);
  productCard.appendChild(deleteBtn);

  return productCard;
};

// Display all products
const displayProducts = async () => {
  while (productList?.firstElementChild) {
    productList.removeChild(productList.firstElementChild);
  }

  const response = await fetch("http://localhost:3000/products");
  const products: Product[] = await response.json();
  products.forEach((product: Product) => {
    const productCard: HTMLLIElement = createProductCard(product);
    productList?.appendChild(productCard);
  });
};
displayProducts();

// Add product
const addProduct = async (product: Product) => {
  await fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  displayProducts();
};

// Delete product
const deleteProduct = async (id: number) => {
  await fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE",
  });
  displayProducts();
};

// Handle form submission
createProductForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(createProductForm);
  const newProduct: Product = {
    name: formData.get("name") as string,
    price: parseFloat(formData.get("price") as string),
    number: parseInt(formData.get("number") as string),
  };
  addProduct(newProduct);
  createProductForm.reset();
});
