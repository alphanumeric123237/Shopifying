export class Store {
    constructor() {
        this.storeName = '';
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.products = [];
        this.cart = [];
        this._admins = [];
        this._customers = [];
        this.button = {
            x: 100,
            y: 60,
            width: 100,
            height: 40,
            radius: 10,
            text: "Add to Cart"
        };
        const canvasElement = document.getElementById("canvas");
        if (!canvasElement) {
            throw new Error("Canvas element not found");
        }
        const context = canvasElement.getContext("2d");
        if (!context) {
            throw new Error("2D context not supported");
        }
    }
    drawAddToCartButton() {
        const { x, y, width, height, radius, text } = this.button;
        this.ctx.fillStyle = "#28a745";
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.fillStyle = "white";
        this.ctx.font = "16px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(text, x + width / 2, y + height / 2);
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
    handleClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        const { x, y, width, height } = this.button;
        if (clickX >= x &&
            clickX <= x + width &&
            clickY >= y &&
            clickY <= y + height) {
            alert("Item added to cart!");
        }
    }
    // a login validator helps identify whether the user is an admin or customer
    login(email, password) {
        for (let i = 0; i < this._admins.length; i++) {
            const admin = this._admins[i];
            if (admin.email === email && admin.password === password) {
                return "Welcome Admin.";
            }
        }
        for (let i = 0; i < this._customers.length; i++) {
            const customer = this._customers[i];
            if (customer.email === email && customer.password === password) {
                return "Welcome Customer";
            }
        }
        return "Login failed, please retry or create account";
    }
    // it helps to create a new account
    // and push it to the customer array
    createAccount(email, password) {
        for (let i = 0; i < this._customers.length; i++) {
            if (this._customers[i].email === email) {
                return false;
            }
        }
        const newCustomer = {
            email: email,
            password: password,
            role: "Customer",
            orderHistory: [],
            address: "",
            name: ""
        };
        this._customers[this._customers.length] = newCustomer;
        return true;
    }
}
//# sourceMappingURL=Store.js.map