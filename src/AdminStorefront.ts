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

class UpdatedCustomerInfo {
  private firstName ?: string;
  private lastName ?: string
  private email ?: string;
  private phoneNumber ?: string;
  private verifiedEmail ?: boolean;

  private updatedCustomer: {
    first_name?: string;
    last_name?: string,
    email?: string,
    phone?: string,
    verified_email?: boolean
  }

  public constructor(first ?: string, last ?: string, email ?: string, phone ?: string, verification ?: boolean) {
    this.firstName = first;
    this.lastName  = last;
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

    const REQUEST_OPTIONS: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": this.ADMIN_ACCESS_TOKEN,
      },
      body: JSON.stringify(customerData),
    };

    try {
      const RESPONSE = await fetch(this.url, REQUEST_OPTIONS);
      const RESPONDE_BODY = await RESPONSE.json();

      if (!RESPONSE.ok) {
        console.error("Shopify API error response:", RESPONDE_BODY);
        throw new Error(`Shopify API error: ${RESPONDE_BODY.errors || JSON.stringify(RESPONDE_BODY)}`);
      }

      console.log("Customer created:", RESPONDE_BODY.customer);
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  }  
  private async updateCustomer(email : string, updatedCustomerInfo : UpdatedCustomerInfo) : Promise<void> {
    //searches for a customer with given email, when found, update them with given customer data 
    const SEARCH_QUERY = await fetch (`https://stringliteral.myshopify.com/admin/api/2025-04/customers/search.json?query=email:${encodeURIComponent(email)}`,
    {
      method : "GET",
      headers : {
        "Content-Type": "application/json"
      }
    });
    const SEARCH = await SEARCH_QUERY.json();
    //check if response is valid
    if (!SEARCH.customers || SEARCH.)



  }//end of function
}

