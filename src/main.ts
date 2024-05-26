import axios from "axios";

interface Product {
  id?: number;
  name: string;
  price: number;
  description: string;
}

const apiUrl = "http://localhost:3000/products";

// Get elements
const productForm = document.getElementById(
  "create-product-form"
) as HTMLFormElement;
const productsList = document.getElementById("products") as HTMLUListElement;

// Fetch and display products
const fetchProducts = async () => {
  const response = await axios.get<Product[]>(apiUrl);
  productsList.innerHTML = "";
  response.data.forEach((product) => {
    const productItem = document.createElement("li");
    productItem.textContent = `${product.name} - $${product.price}`;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteProduct(product.id!));
    productItem.appendChild(deleteButton);
    productsList.appendChild(productItem);
  });
};

// Add a product
productForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(productForm);
  const newProduct: Product = {
    name: formData.get("name") as string,
    price: Number(formData.get("price")),
    description: formData.get("description") as string,
  };
  await axios.post(apiUrl, newProduct);
  productForm.reset();
  fetchProducts();
});

// Delete a product
const deleteProduct = async (id: number) => {
  await axios.delete(`${apiUrl}/${id}`);
  fetchProducts();
};

// Initial fetch
fetchProducts();
