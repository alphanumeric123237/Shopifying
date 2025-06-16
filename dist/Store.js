"use strict";
class Store {
    constructor(product) {
        this.storeName = '';
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.products = [];
        this.cart = [];
        this.products = product;
        this.draw();
        this.displayProducts();
        this.canvas.addEventListener("click", this.handleClick.bind(this));
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillRect(0, 0, this.canvas.width, 80);
        this.ctx.fillText(this.storeBanner, 30, 50);
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width - 50, 40, 25, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillStyle = "#fff";
        this.ctx.fillText("🛒", this.canvas.width - 62, 48);
        this.ctx.fillText(`${this.cart.length}`, this.canvas.width - 30, 48);
    }
    displayProducts() {
        let x = 50;
        let y = 120;
        for (const products of this.products) {
            this.ctx.fillStyle = "#fff";
            this.ctx.fillRect(x, y, 200, 150);
            this.ctx.strokeStyle = "#ccc";
            this.ctx.strokeRect(x, y, 200, 150);
        }
    }
    handleClick(mouse) {
        const rect = this.canvas.getBoundingClientRect();
        const mx = mouse.clientX - rect.left;
        const my = mouse.clientY - rect.top;
        let x = 50;
        let y = 120;
        for (const product of this.products) {
            const btnX = x + 10;
            const btnY = y + 120;
            const btnW = 180;
            const btnH = 20;
            if (mx >= btnX && mx <= btnX + btnW && my >= btnY && my <= btnY + btnH) {
                this.cart.push(product);
                this.draw();
                this.displayProducts();
                return;
            }
            x += 250;
            if (x + 200 > this.canvas.width) {
                x = 50;
                y += 200;
            }
        }
        const dist = Math.hypot(mx - (this.canvas.width - 50), my - 40);
        if (dist <= 25) {
            alert(`Cart:\n${this.cart.map(p => `${p.name} - $${p.price.toFixed(2)}`).join("\n")}`);
        }
    }
    login(email, password) {
        if (!email || !password) {
            return false;
        }
        else if (!email && !password) {
            return false;
        }
        else {
            return true;
        }
    }
}
//# sourceMappingURL=Store.js.map