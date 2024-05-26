"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const apiUrl = "http://localhost:3000/products";
// Get elements
const productForm = document.getElementById("create-product-form");
const productsList = document.getElementById("products");
// Fetch and display products
const fetchProducts = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(apiUrl);
    productsList.innerHTML = "";
    response.data.forEach((product) => {
      const productItem = document.createElement("li");
      productItem.textContent = `${product.name} - $${product.price}`;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteProduct(product.id));
      productItem.appendChild(deleteButton);
      productsList.appendChild(productItem);
    });
  });
// Add a product
productForm.addEventListener("submit", (event) =>
  __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const formData = new FormData(productForm);
    const newProduct = {
      name: formData.get("name"),
      price: Number(formData.get("price")),
      description: formData.get("description"),
    };
    yield axios_1.default.post(apiUrl, newProduct);
    productForm.reset();
    fetchProducts();
  })
);
// Delete a product
const deleteProduct = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.delete(`${apiUrl}/${id}`);
    fetchProducts();
  });
// Initial fetch
fetchProducts();
