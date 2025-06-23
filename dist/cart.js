var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CartLines } from "./cartLines";
import { v4 as uuidv4 } from "uuid";
import { AdminStoreFront } from "./AdminStorefront";
export class Cart {
    constructor() {
        this._cartID = uuidv4();
    }
    addLine(merchID, merchQuantity) {
        const newLine = new CartLines(uuidv4(), merchID, merchQuantity);
        this._cartLines = [...this._cartLines, newLine];
    }
    clearCart() {
        this._cartLines = [];
    }
    get total() {
        return this._cartLines.length;
    }
    get CartID() {
        return this._cartID;
    }
    isEmpty() {
        return this._cartLines.length === 0;
    }
    mapLineItems() {
        let items = [];
        for (let i = 0; i < this._cartLines.length; i++) {
            items[i] = {
                variantId: `variantId: "${this._cartLines[i].merchID}"`,
                quantity: `quantity: ${this._cartLines[i].productQuantity.toString()}`
            };
        }
        return items;
    }
    checkout() {
        return __awaiter(this, void 0, void 0, function* () {
            const STOREFRONT_ACCESS_TOKEN = "c0acb1e5870575922556e30a9406473f";
            let mutation = `
            mutation {
                checkoutCreate(input: {
                    lineItems: ${this.mapLineItems}
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
                    body: JSON.stringify({ mutation })
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