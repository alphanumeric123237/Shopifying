var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Customer {
    constructor(first, last, email, phone, verification) {
        this.firstName = first;
        this.lastName = last;
        this.email = email;
        this.phoneNumber = phone;
        this.verifiedEmail = verification;
        this.customer = {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            phone: this.phoneNumber,
            verified_email: this.verifiedEmail,
        };
    }
}
class UpdatedCustomerInfo {
    constructor(first, last, email, phone, verification) {
        this.firstName = first;
        this.lastName = last;
        this.email = email;
        this.phoneNumber = phone;
        this.verifiedEmail = verification;
        this.updatedCustomer = {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            phone: this.phoneNumber,
            verified_email: this.verifiedEmail,
        };
    }
}
class AdminStoreFront {
    constructor() {
        this.SHOPIFY_DOMAIN = "https://stringliteral.myshopify.com";
        this.API_VERSION = "2025-04";
        this.ADMIN_ACCESS_TOKEN = "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";
        this.url = `https://stringliteral.myshopify.com/admin/api/2025-04/customers.json`;
    }
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
    addCustomer(customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const REQUEST_OPTIONS = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": this.ADMIN_ACCESS_TOKEN,
                },
                body: JSON.stringify(customerData),
            };
            try {
                const RESPONSE = yield fetch(this.url, REQUEST_OPTIONS);
                const RESPONDE_BODY = yield RESPONSE.json();
                if (!RESPONSE.ok) {
                    console.log("Shopify API error response:", RESPONDE_BODY);
                    throw new Error(`Shopify API error: ${RESPONDE_BODY.errors || JSON.stringify(RESPONDE_BODY)}`);
                }
                console.log("Customer created:", RESPONDE_BODY.customer);
            }
            catch (error) {
                console.log("Error creating customer:", error);
            }
        });
    }
    updateCustomer(email, updatedCustomerInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            //searches for a customer with given email, when found, update them with given customer data 
            const SEARCH_QUERY = yield fetch(`https://stringliteral.myshopify.com/admin/api/2025-04/customers/search.json?query=email:${encodeURIComponent(email)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": this.ADMIN_ACCESS_TOKEN
                }
            });
            const SEARCH = yield SEARCH_QUERY.json();
            //check if response is valid
            if (!SEARCH.customers || SEARCH.length === 0) {
                console.log("customer not found");
            }
            //const CUSTOMER_ID : any = SEARCH.customers;
            console.log(SEARCH.customers[0].id);
        });
    } //end of function
}
let x = new AdminStoreFront();
let me = new Customer("Colin", "Yim", "yim.colin@gmail.com", "+1 437-982-0316", true);
let mew = new UpdatedCustomerInfo("Collin");
//x.addCustomer(me);
x.updateCustomer("yim.colin@gmail.com", mew);
export {};
//# sourceMappingURL=AdminStorefront.js.map