var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class AdminStoreFront {
    getActiveOrders() {
    }
    changeStoreDetails() {
    }
    removeProducts() {
    }
    queryProduct(id) {
    }
    editProcductDesc(id, desc) {
    }
    editProductName(id, name) {
    }
    editProductPrice(id, price) {
    }
    editProductInventory(id, inventory) {
    }
    addCustomer(id) {
    }
    updateCustomer(id) {
    }
}
const SHOPIFY_DOMAIN = "https://stringliteral.myshopify.com";
const API_VERSION = "2025-04";
export function createShopifyCustomer() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://stringliteral.myshopify.com/admin/api/2025-04/customers.json`;
        const customerData = {
            customer: {
                first_name: "Jane",
                last_name: "Doe",
                email: "jane.doe@example.com",
                phone: "+1 437-982-0317",
                verified_email: true,
                tags: "new, vip",
                send_email_welcome: true
            }
        };
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": ADMIN_ACCESS_TOKEN,
            },
            body: JSON.stringify(customerData),
        };
        try {
            const response = yield fetch(url, requestOptions);
            const responseBody = yield response.json();
            if (!response.ok) {
                console.error("❌ Shopify API error response:", responseBody);
                throw new Error(`Shopify API error: ${responseBody.errors || JSON.stringify(responseBody)}`);
            }
            console.log("✅ Customer created:", responseBody.customer);
        }
        catch (error) {
            console.error("❌ Error creating customer:", error);
        }
    });
}
createShopifyCustomer();
//# sourceMappingURL=AdminStorefront.js.map