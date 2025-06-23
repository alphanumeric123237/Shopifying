var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CartLines } from "./cartlines";
import { v4 as uuidv4 } from "uuid";
import { AdminStoreFront } from "./adminStorefront";
/**
 * Outlines a cart instance with its components
 */
export class Cart {
    /**
     * Creates a new Cart instance with a unique cart ID.
     */
    constructor() {
        this._cartLines = [];
        this._cartID = uuidv4();
    }
    /**
     * Adds a new line item to the cart.
     * @param merchID - The merchandise variant ID to add.
     * @param merchQuantity - The quantity of the merchandise.
     */
    addLine(merchID, merchQuantity) {
        const newLine = new CartLines(uuidv4(), merchID, merchQuantity);
        this._cartLines = [...this._cartLines, newLine];
    }
    /**
     * Clears all items from the cart.
     */
    clearCart() {
        this._cartLines = [];
    }
    /**
     * Gets the total number of line items in the cart.
     */
    get total() {
        return this._cartLines.length;
    }
    /**
     * Gets the unique identifier for this cart.
     */
    get CartID() {
        return this._cartID;
    }
    /**
     * Checks if the cart is empty.
     * @returns true if no line items exist in the cart, false otherwise.
     */
    isEmpty() {
        return this._cartLines.length === 0;
    }
    /**
     * Maps the cart's line items to an array of objects formatted for Shopify's checkout mutation.
     * @returns An array of objects containing variantId and quantity as strings.
     */
    mapLineItems() {
        let items = [];
        for (let i = 0; i < this._cartLines.length; i++) {
            items[i] = {
                variantId: this._cartLines[i].merchID,
                quantity: this._cartLines[i].productQuantity.toString()
            };
        }
        return items;
    }
    /**
     * Performs the checkout process by creating a Shopify checkout session.
     * Opens a new window with the checkout URL on success.
     * @returns A promise resolving to a status string describing the checkout outcome.
     */
    checkout() {
        return __awaiter(this, void 0, void 0, function* () {
            const STOREFRONT_ACCESS_TOKEN = "c0acb1e5870575922556e30a9406473f";
            let mutation = `
            mutation {
                checkoutCreate(input: {
                    lineItems: [${this.mapLineItems}]
                }) {
                    checkout {
                    id
                    webUrl
                    }
                    checkoutUserErrors {
                    message
                    }
                }
            }
        `;
            try {
                let fetchCheckout = yield fetch(`${AdminStoreFront.SHOPIFY_DOMAIN}/api/2023-04/graphql.json`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN
                    },
                    body: JSON.stringify({ query: mutation })
                });
                if (!fetchCheckout.ok) {
                    return "Checkout failed: " + fetchCheckout.statusText;
                }
                let checkoutData = yield fetchCheckout.json();
                window.open(checkoutData.data.checkoutCreate.checkout.webUrl);
                return "Successfully checked out, click on this link to complete checkout: " + checkoutData.data.checkoutCreate.checkout.webUrl;
            }
            catch (error) {
                return "Encountered error: " + error;
            }
        });
    }
}
//# sourceMappingURL=cart.js.map