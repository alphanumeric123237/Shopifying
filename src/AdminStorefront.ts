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


  private async getActiveOrders() : Promise<any> {
    try {
      const ORDER_QUERY = await fetch("https://stringliteral.myshopify.com/admin/api/2023-04/orders.json?status=open", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": this.ADMIN_ACCESS_TOKEN
        }
      });
      if (!ORDER_QUERY.ok) {
        return `Could not get orders, ${ORDER_QUERY.statusText}` 
      }
      const ORDERS : any = await ORDER_QUERY.json();
      return ORDERS.orders;
    }
    catch(error:any){
      return "Encountered error: " + error;
    }
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
  protected async addCustomer(customerData: Customer) : Promise<any> {
    const REQUEST_OPTIONS: any = {
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
        return "Shopify API error response:" + RESPONDE_BODY
      }

      return "Customer created with ID: " + RESPONDE_BODY.customer.id;
    } 

    catch (error:any) {
      return "Error creating customer:" + error;
    }
  }  
  protected async updateCustomer(email : string, first_name ?: string, last_name ?: string, newEmail ?: string, phone ?: string, verified ?: boolean) : Promise<any> {
    //searches for a customer with given email, when found, update them with given customer data 
    let returnMsg : string = "Changed:";
    const SEARCH_QUERY : any = await fetch (`https://stringliteral.myshopify.com/admin/api/2025-04/customers/search.json?query=email:${encodeURIComponent(email)}`,
    {
      method : "GET",
      headers : {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": this.ADMIN_ACCESS_TOKEN
      }
    });
    const SEARCH : any = await SEARCH_QUERY.json();
    //check if response is valid
    if (!SEARCH.customers || SEARCH.length === 0) {
      console.log("customer not found");
    }
    if (first_name !== undefined) {
      SEARCH.customers[0].first_name = first_name;
      returnMsg += "\nFirst name"
    }
    if (last_name !== undefined) {
      SEARCH.customers[0].last_name = last_name;
      returnMsg += "\nLast name"
    }
    if (newEmail!==undefined){
      SEARCH.customers[0].email=newEmail;
      returnMsg += "\nEmail"
    }
    if (phone!==undefined){
      SEARCH.customers[0].phone=phone;
      returnMsg += "\nPhone number"
    }
    if (verified!==undefined){
      SEARCH.customers[0].verified_email=verified;
      returnMsg += "\nVerification status"
    }
    return `Updated customer information for customer: ${SEARCH.customers[0].id}.` + returnMsg;
  }
  
}