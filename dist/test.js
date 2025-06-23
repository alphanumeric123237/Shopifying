"use strict";
class CartManager {
    constructor() {
        this.productList = [];
        this.cartButton = document.getElementById("icart");
        this.cartContainer = document.querySelector(".cart-container");
        this.cartClose = document.getElementById("cart-close");
        this.basket = document.querySelector(".cart-content");
        this.initEvents();
        this.setupEventListeners(); // initial listener setup
    }
    initEvents() {
        this.cartButton.addEventListener("click", () => {
            this.cartContainer.classList.add("cart-active");
        });
        this.cartClose.addEventListener("click", () => {
            this.cartContainer.classList.remove("cart-active");
        });
    }
    setupEventListeners() {
        // Remove buttons
        const removeButtons = document.querySelectorAll(".cart-remove");
        removeButtons.forEach((btn) => {
            btn.onclick = (e) => {
                var _a;
                const target = e.target;
                (_a = target.closest(".cart-box")) === null || _a === void 0 ? void 0 : _a.remove();
                this.setupEventListeners(); // rebind
            };
        });
        // Quantity change
        const quantityInputs = document.querySelectorAll(".cart-quantity");
        quantityInputs.forEach((input) => {
            input.onchange = () => {
                if (isNaN(Number(input.value)) || Number(input.value) < 1) {
                    input.value = "1";
                }
                this.setupEventListeners(); // rebind
            };
        });
        // Add to cart buttons
        const addButtons = document.querySelectorAll(".btn-cart");
        addButtons.forEach((btn) => {
            btn.onclick = () => this.addToCart(btn);
        });
        this.updateTotal();
    }
    addToCart(button) {
        var _a, _b, _c;
        const product = button.closest(".product");
        const productTitle = ((_a = product.querySelector("#product-title")) === null || _a === void 0 ? void 0 : _a.innerText) || "";
        const productPrice = ((_b = product.querySelector("#price")) === null || _b === void 0 ? void 0 : _b.innerText) || "";
        const productImg = ((_c = product.querySelector(".product-img")) === null || _c === void 0 ? void 0 : _c.src) || "";
        const newProduct = { productTitle, productPrice, productImg };
        this.productList.push(newProduct);
        const cartHTML = this.createCartProductHTML(productTitle, productPrice, productImg);
        const newDiv = document.createElement("div");
        newDiv.innerHTML = cartHTML;
        this.basket.append(newDiv);
        this.setupEventListeners();
    }
    createCartProductHTML(title, price, img) {
        return `
            <div class="cart-box">
                <img src="${img}" class="cart-img">
                <div class="detail-box">
                    <div class="cart-food-title">${title}</div>
                    <div class="price-box">
                        <div class="cart-price">${price}</div>
                        <div class="cart-amt">${price}</div>
                    </div>
                    <input type="number" value="1" class="cart-quantity">
                </div>
                <i name="trash" class="bi bi-trash cart-remove"></i>
            </div>
        `;
    }
    updateTotal() {
        const cartItems = document.querySelectorAll(".cart-box");
        const totalPriceElement = document.querySelector(".total-price");
        let total = 0;
        cartItems.forEach(item => {
            var _a;
            const priceText = ((_a = item.querySelector(".cart-price")) === null || _a === void 0 ? void 0 : _a.innerText) || "0";
            const quantityInput = item.querySelector(".cart-quantity");
            const price = parseFloat(priceText.replace("Rs.", ""));
            const qty = Number((quantityInput === null || quantityInput === void 0 ? void 0 : quantityInput.value) || 1);
            total += price * qty;
            const amountEl = item.querySelector(".cart-amt");
            if (amountEl)
                amountEl.innerText = "Rs." + (price * qty);
        });
        if (totalPriceElement) {
            totalPriceElement.innerText = "Rs." + total;
        }
        // cart count
        const cartCountEl = document.getElementById("cart-count");
        const count = this.productList.length;
        if (cartCountEl) {
            cartCountEl.innerText = count.toString();
            cartCountEl.style.display = count === 0 ? "none" : "block";
        }
    }
}
// Initialize cart after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    new CartManager();
});
//# sourceMappingURL=test.js.map