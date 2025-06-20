import { Cart } from "./cart.js";
import { Checkout } from "./checkout.js";
class CustomerStoreFront {
    constructor(customerID, email) {
        this._orders = [];
        this._checkout = null;
        this._customerID = customerID;
        this._email = email;
        this._cart = new Cart();
    }
    get customerID() {
        return this._customerID;
    }
    get email() {
        return this._email;
    }
    checkOrderStatus() {
        // condition: We don't always have orders
        if (this._orders.length === 0) {
            return "You have no order.";
        }
        let status = "";
        for (let i = 0; i < this._orders.length; i++) {
            const order = this._orders[i];
            status += "Order ID:" + order.orderID + " - Status: " + order["orderStatus"] + "\n";
            if (i !== this._orders.length - 1) {
                status += "\n";
            }
        }
        return status;
    }
    changeZone(newZone) {
        this._userAddress = newZone;
        return "Your address is updated to: " + newZone;
    }
    changeDetails(newEmail) {
        this._email = newEmail;
    }
    checkOut() {
        // Condition: There is always in the cart before customers add something to it
        if (this._cart.isEmpty()) {
            alert("Your cart is empty.");
            return;
        }
        this._checkout = new Checkout(this._cart, this._email);
        const newOrder = this._checkout.placeOrder();
        this._orders[this._orders.length] = newOrder;
    }
    cartCreate() {
        if (!this._cart) {
            this._cart = new Cart();
            return true;
        }
        return false;
    }
    cartDelete() {
        if (this._cart) {
            this._cart.clearCart();
            return true;
        }
        return false;
    }
    addToCart(merchID, merchQuantity) {
        if (!merchID || merchQuantity <= 0) {
            return false;
        }
        this._cart.addLine(merchID, merchQuantity);
        return true;
    }
    redirectedToCheckout() {
        alert("Redirecting to checkout");
        this.checkOut();
    }
    returnOption() {
        const order = this._orders[this._orders.length - 1];
        if (!order) {
            return "No order found";
        }
        const result = order.requestReturn();
        return `Return Status: ${result}`;
    }
}
//# sourceMappingURL=CustomerStorefront.js.map