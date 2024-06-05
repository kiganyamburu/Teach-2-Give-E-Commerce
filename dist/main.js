"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Select DOM elements
const createProductForm = document.querySelector("#create-product-form");
const productFormContainer = document.querySelector("#product-form");
const productList = document.querySelector("#products");
// Create product card
const createProductCard = (product) => {
    const productCard = document.createElement("li");
    const productName = document.createElement("h3");
    const productPrice = document.createElement("p");
    const productNumber = document.createElement("p");
    const deleteBtn = document.createElement("button");
    productName.textContent = `Name: ${product.name}`;
    productPrice.textContent = `Price: $${product.price.toFixed(2)}`;
    productNumber.textContent = `Item Number: ${product.number}`;
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteProduct(product.id));
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(productNumber);
    productCard.appendChild(deleteBtn);
    return productCard;
};
// Display all products
const displayProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    while (productList === null || productList === void 0 ? void 0 : productList.firstElementChild) {
        productList.removeChild(productList.firstElementChild);
    }
    const response = yield fetch("http://localhost:3000/products");
    const products = yield response.json();
    products.forEach((product) => {
        const productCard = createProductCard(product);
        productList === null || productList === void 0 ? void 0 : productList.appendChild(productCard);
    });
});
displayProducts();
// Add product
const addProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    displayProducts();
});
// Delete product
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
    });
    displayProducts();
});
// Handle form submission
createProductForm === null || createProductForm === void 0 ? void 0 : createProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(createProductForm);
    const newProduct = {
        name: formData.get("name"),
        price: parseFloat(formData.get("price")),
        number: parseInt(formData.get("number")),
    };
    addProduct(newProduct);
    createProductForm.reset();
});
