import { Order } from "./Order.js"

class Customer {
  private firstName : string;
  private lastName : string
  private email : string;
  private phoneNumber : string;
  private verifiedEmail : boolean;

  private customer: {
    first_name: string;
    last_name: string,
    email: string,
    phone: string,
    verified_email: boolean
  }

  public constructor(first : string, last : string, email : string, phone : string, verification : boolean) {
    this.firstName = first;
    this.lastName  = last;
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

class AdminStoreFront {
  private SHOPIFY_DOMAIN = "https://stringliteral.myshopify.com";
  private API_VERSION = "2025-04";
  private ADMIN_ACCESS_TOKEN = "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";
  private url = `https://stringliteral.myshopify.com/admin/api/2025-04/customers.json`;


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

  protected async addCustomer(customerData: Customer) : Promise<void> {

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": this.ADMIN_ACCESS_TOKEN,
      },
      body: JSON.stringify(customerData),
    };

    try {
      const response = await fetch(this.url, requestOptions);
      const responseBody = await response.json();

      if (!response.ok) {
        console.error("Shopify API error response:", responseBody);
        throw new Error(`Shopify API error: ${responseBody.errors || JSON.stringify(responseBody)}`);
      }

      console.log("Customer created:", responseBody.customer);
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  }  
  private updateCustomer(id: string) : void {
  }
}
