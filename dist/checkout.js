import { Order } from "./Order";
export class Checkout {
    constructor(cart, userEmail) {
        this._cart = cart;
        this._userEmail = userEmail;
    }
    redirectToCheckout() {
    }
    placeOrder() {
        const orderID = Math.floor(Math.random() * 1000000);
        const customerEmail = this._userEmail; // Pass from customer data
        const totalAmount = this._cart.total;
        const orderDate = new Date();
        return new Order(orderID, customerEmail, totalAmount, orderDate);
    }
}
//# sourceMappingURL=checkout.js.map