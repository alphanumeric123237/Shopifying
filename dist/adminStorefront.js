var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Represents a Shopify customer with basic information.
 */
class Customer {
    /**
     * Creates a new Customer instance.
     *
     * @param first - First name of the customer
     * @param last - Last name of the customer
     * @param email - Email address of the customer
     * @param phone - Phone number of the customer
     * @param verification - Whether the email is verified
     */
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
/**
 * Represents a product with title, image, variants, and optional metadata.
 */
class Product {
    /**
     * Constructs a new Product instance.
     * @param title - The title of the product
     * @param image - The image object containing a src URL
     * @param variants - An array of product variants
     * @param body_html - Optional HTML description of the product
     * @param vendor - Optional vendor name
     * @param product_type - Optional product category
     * @param tags - Optional tags for the product
     */
    constructor(title, image, variants, body_html, vendor, product_type, tags) {
        this.title = title;
        this.body_html = body_html;
        this.vendor = vendor;
        this.product_type = product_type;
        this.tags = tags;
        this.variants = variants;
        this.image = image;
    }
}
/**
 * Performs administrative operations using the Shopify Admin API
 */
export class AdminStoreFront {
    /**
   * Fetches all currently open orders from the Shopify store.
   * @returns {Promise<string>} A promise that resolves to all open orders if successful, or a string message describing the error.
   */
    getActiveOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let orderQuery = yield fetch(`${AdminStoreFront.SHOPIFY_DOMAIN}/admin/api/2025-04/orders.json?status=open`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Shopify-Access-Token": AdminStoreFront.ADMIN_ACCESS_TOKEN
                    }
                });
                if (!orderQuery.ok) {
                    return `Could not get orders, ${orderQuery.statusText}`;
                }
                const ORDERS = yield orderQuery.json();
                return ORDERS.orders;
            }
            catch (error) {
                return "Encountered error: " + error;
            }
        });
    }
    /**
   * Adds a new product to the Shopify store.
   * @param product - The product object to be added.
   * @returns A promise that resolves to a success message with the new product ID, or an error message if the operation fails.
   */
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let postProduct = yield fetch(`${AdminStoreFront.SHOPIFY_DOMAIN}/admin/api/2025-04/products.json`, {
                    method: "POST",
                    headers: {
                        "X-Shopify-Access-Token": AdminStoreFront.ADMIN_ACCESS_TOKEN
                    },
                    body: JSON.stringify({ product })
                });
                if (!postProduct.ok) {
                    return `Could not add new product, ${postProduct.statusText}`;
                }
                const PRODUCT = yield postProduct.json();
                return `Added new product with ID ${PRODUCT.product.id}`;
            }
            catch (error) {
                return "Encountered error: " + error;
            }
        });
    }
    /**
   * Deletes a product from the Shopify store by its ID.
   *
   * @param id - The ID of the product to remove.
   * @returns A promise that resolves to a success message if the product is deleted, or an error message if the operation fails.
   */
    removeProducts(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let removeRequest = yield fetch(`${AdminStoreFront.SHOPIFY_DOMAIN}/admin/api/2025-04/products/${id}.json`, {
                    method: "DELETE",
                    headers: {
                        "X-Shopify-Access-Token": AdminStoreFront.ADMIN_ACCESS_TOKEN,
                        "Content-Type": "application/json"
                    }
                });
                if (!removeRequest.ok) {
                    return `Could not add new product, ${removeRequest.statusText}`;
                }
                ;
                return `Deleted product with ID: ${id}`;
            }
            catch (error) {
                return "Encountered error: " + error;
            }
        });
    }
    /**
   * Queries the Shopify store for a product by its title.
   *
   * @param title - The title of the product to search for.
   * @returns A promise that resolves to the found product's ID as a string, or an error message if the product is not found or the request fails.
   */
    queryProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productQuery = yield fetch(`${AdminStoreFront.SHOPIFY_DOMAIN}/admin/api/2025-04/products.json?title=${encodeURIComponent(title)}`, {
                    method: "GET",
                    headers: {
                        "X-Shopify-Access-Token": AdminStoreFront.ADMIN_ACCESS_TOKEN,
                        "Content-Type": "application/json"
                    }
                });
                if (!productQuery.ok) {
                    return `Could not get specified product, ${productQuery.statusText}`;
                }
                const QUERY_RESULT = yield productQuery.json();
                if (!QUERY_RESULT.products || QUERY_RESULT.length === 0) {
                    return "Could not find product";
                }
                return `Found ID: ${QUERY_RESULT.products[0].id}`;
            }
            catch (error) {
                return "Encountered error: " + error;
            }
        });
    }
    /**
   * Edits the details of an existing product in the Shopify store.
   * @param id - The ID of the product to edit.
   * @param image - The image object containing a `src` URL.
   * @param title - Optional new title for the product.
   * @param variants - Optional updated variants for the product.
   * @param body_html - Optional new HTML description for the product.
   * @param vendor - Optional new vendor name.
   * @param product_type - Optional new product type/category.
   * @param tags - Optional new tags (comma-separated).
   * @returns A message describing what fields were changed or an error message.
   */
    editProcductInfo(id, image, title, variants, body_html, vendor, product_type, tags) {
        return __awaiter(this, void 0, void 0, function* () {
            let returnMsg = "Changed: ";
            const searchQuery = yield fetch(`${AdminStoreFront.SHOPIFY_DOMAIN}/admin/api/2025-04/customers/products.json?query=id:${encodeURIComponent(id)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": AdminStoreFront.ADMIN_ACCESS_TOKEN
                }
            });
            const SEARCH = yield searchQuery.json();
            //check if response is valid
            if (!SEARCH.products || SEARCH.length === 0) {
                console.log("Product not found");
            }
            if (title !== undefined) {
                SEARCH.products[0].title = title;
                returnMsg += "\nTitle";
            }
            if (variants !== undefined) {
                SEARCH.products[0].variants = variants;
                returnMsg += "\nVariants";
            }
            if (body_html !== undefined) {
                SEARCH.products[0].body_html = body_html;
                returnMsg += "\nBody text";
            }
            if (vendor !== undefined) {
                SEARCH.products[0].vendor = vendor;
                returnMsg += "\nVendor";
            }
            if (product_type !== undefined) {
                SEARCH.products[0].product_type = product_type;
                returnMsg += "\nProduct Type";
            }
            if (tags !== undefined) {
                SEARCH.products[0].tags = tags;
                returnMsg += "\nTags";
            }
            return `Updated customer information for product: ${SEARCH.products[0].title}.` + returnMsg;
        });
    }
    /**
   * Retrieves the location ID from Shopify based on the given location name.
   * @param locationName - The name of the location to search for.
   * @returns A promise resolving to the location ID if found, or an error message if the fetch fails or the location is not found.
   */
    retrieveLocationId(locationName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fetchLocation = yield fetch(`${AdminStoreFront.SHOPIFY_DOMAIN}/admin/api/2025-04/locations.json`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Shopify-Access-Token": AdminStoreFront.ADMIN_ACCESS_TOKEN
                    }
                });
                if (!fetchLocation.ok) {
                    return "Could not fetch location ID with name: " + locationName;
                }
                const LOCATION_DATA = yield fetchLocation.json();
                return `Foud location ID: ${LOCATION_DATA.locations[0].id}`;
            }
            catch (error) {
                return "Encountered error: " + error;
            }
        });
    }
    editInventoryLevels(productId, variant, locationId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            //get inventory item ID
            let inventoryItemID = "";
            try {
                let fetchProduct = yield fetch(`${AdminStoreFront.SHOPIFY_DOMAIN}/admin/api/2025-04/products/${productId}.json`, {
                    method: 'GET',
                    headers: {
                        "X-Shopify-Access-Token": AdminStoreFront.ADMIN_ACCESS_TOKEN,
                        "Content-Type": "application/json"
                    }
                });
                if (!fetchProduct.ok) {
                    return "Could not fetch Inventory item ID with Product ID: " + productId;
                }
                let productData = yield fetchProduct.json();
                inventoryItemID = productData.product.variants[variant].inventory_item_id;
            }
            catch (error) {
                return "Encountered error: " + error;
            }
            try {
                let fetchInventory = yield fetch(`${AdminStoreFront.SHOPIFY_DOMAIN}/admin/api/2025-04/inventory_levels/set.json`, {
                    method: "POST",
                    headers: {
                        "X-Shopify-Access-Token": AdminStoreFront.ADMIN_ACCESS_TOKEN,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        location_id: locationId,
                        inventory_item_id: inventoryItemID,
                        available: quantity
                    })
                });
                if (!fetchInventory.ok) {
                    return "Could not edit inventory levels for product with ID: " + productId;
                }
                return `Inventory for product with product ID: ${productId} has been updated to ${quantity} products at the location with ID: ${locationId}`;
            }
            catch (error) {
                return "Encountered error: " + error;
            }
        });
    }
    /**
   * Adds a new customer to the Shopify store.
   * @param customerData - The customer data for the customer to be added.
   * @returns A promise that resolves to a success message with the new customer ID, or an error message if the operation fails.
   */
    addCustomer(customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${AdminStoreFront.SHOPIFY_DOMAIN}/admin/api/2025-04/customers.json`;
            let requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": AdminStoreFront.ADMIN_ACCESS_TOKEN,
                },
                body: JSON.stringify(customerData),
            };
            try {
                const RESPONSE = yield fetch(url, requestOptions);
                const RESPONDE_BODY = yield RESPONSE.json();
                if (!RESPONSE.ok) {
                    return "Shopify API error response:" + RESPONDE_BODY;
                }
                return "Customer created with ID: " + RESPONDE_BODY.customer.id;
            }
            catch (error) {
                return "Error creating customer:" + error;
            }
        });
    }
    /**
     * Searches for a customer by email and updates their information with the provided data.
     *
     * @param email - The current email address of the customer to update.
     * @param first_name - Optional new first name.
     * @param last_name - Optional new last name.
     * @param newEmail - Optional new email address.
     * @param phone - Optional new phone number.
     * @param verified - Optional new email verification status.
     * @returns A message indicating which fields were updated or if the customer was not found.
     */
    updateCustomer(email, first_name, last_name, newEmail, phone, verified) {
        return __awaiter(this, void 0, void 0, function* () {
            //searches for a customer with given email, when found, update them with given customer data 
            let returnMsg = "Changed:";
            const searchQuery = yield fetch(`${AdminStoreFront.SHOPIFY_DOMAIN}/admin/api/2025-04/customers/search.json?query=email:${encodeURIComponent(email)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": AdminStoreFront.ADMIN_ACCESS_TOKEN
                }
            });
            const SEARCH = yield searchQuery.json();
            //check if response is valid
            if (!SEARCH.customers || SEARCH.length === 0) {
                console.log("customer not found");
            }
            if (first_name !== undefined) {
                SEARCH.customers[0].first_name = first_name;
                returnMsg += "\nFirst name";
            }
            if (last_name !== undefined) {
                SEARCH.customers[0].last_name = last_name;
                returnMsg += "\nLast name";
            }
            if (newEmail !== undefined) {
                SEARCH.customers[0].email = newEmail;
                returnMsg += "\nEmail";
            }
            if (phone !== undefined) {
                SEARCH.customers[0].phone = phone;
                returnMsg += "\nPhone number";
            }
            if (verified !== undefined) {
                SEARCH.customers[0].verified_email = verified;
                returnMsg += "\nVerification status";
            }
            return `Updated customer information for customer: ${SEARCH.customers[0].id}.` + returnMsg;
        });
    }
}
/**@public Stores the domain used for all API calls */
AdminStoreFront.SHOPIFY_DOMAIN = "https://stringliteral.myshopify.com";
/**@private The Shopify Admin API Access Token */
AdminStoreFront.ADMIN_ACCESS_TOKEN = "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";
//# sourceMappingURL=adminStorefront.js.map