import { Order } from "./Order.js"

class AdminStoreFront {
  private SHOPIFY_DOMAIN = "https://stringliteral.myshopify.com";
  private API_VERSION = "2025-04";
  private ADMIN_ACCESS_TOKEN = "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";
  private getActiveOrders() : void {
    
  }

  
  private changeStoreDetails() : void {

  }

  protected removeProducts() : void {

  }

  protected queryProduct(id: number) : void {

  }

  protected editProcductDesc(id: number, desc: string) : void {

  } 

  protected editProductName(id: number, name: string) : void {

  }

  protected editProductPrice(id: number, price: number) : void {

  }

  protected editProductInventory(id: number, inventory: number) : void {

  }

  protected async addCustomer(id: string) : Promise<void> {
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

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": this.ADMIN_ACCESS_TOKEN,
      },
      body: JSON.stringify(customerData),
    };

    try {
      const response = await fetch(url, requestOptions);
      const responseBody = await response.json();

      if (!response.ok) {
        console.error("❌ Shopify API error response:", responseBody);
        throw new Error(`Shopify API error: ${responseBody.errors || JSON.stringify(responseBody)}`);
      }

      console.log("✅ Customer created:", responseBody.customer);
    } catch (error) {
      console.error("❌ Error creating customer:", error);
    }
  }  
  private updateCustomer(id: string) : void {
//sigma
  }
}