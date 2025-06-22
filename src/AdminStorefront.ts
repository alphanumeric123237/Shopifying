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

class Product {
  private title : string;
  private body_html ?: string;
  private vendor ?: string;
  private product_type ?: string;
  private tags ?: string;
  private image : {
    "src" : string;
  }
  private variants : {
    option1 : string;
    option2: string | null;
    option3: string | null;
    price : string;
    sku : string 
  }[];
  public constructor(
    title : string,
    image : {
      "src" : string;
    },
    variants : {
      option1 : string;
      option2 :string | null;
      option3: string | null;
      price : string;
      sku : string;
    }[],
    body_html ?: string, 
    vendor ?: string, 
    product_type ?: string, 
    tags ?: string, 
  ) {
    this.title = title;
    this.body_html = body_html;
    this.vendor = vendor;
    this.product_type = product_type;
    this.tags = tags;
    this.variants = variants;
    this.image = image;
  }
}

class AdminStoreFront {
  private SHOPIFY_DOMAIN = "https://stringliteral.myshopify.com";
  private API_VERSION = "2025-04";
  private ADMIN_ACCESS_TOKEN = "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";
  private url = `${this.SHOPIFY_DOMAIN}/admin/api/2025-04/customers.json`;


  private async getActiveOrders() : Promise<any> {
    try {
      let orderQuery = await fetch(`${this.SHOPIFY_DOMAIN}/admin/api/2023-04/orders.json?status=open`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": this.ADMIN_ACCESS_TOKEN
        }
      });
      if (!orderQuery.ok) {
        return `Could not get orders, ${orderQuery.statusText}`;
      }
      const ORDERS : any = await orderQuery.json();
      return ORDERS.orders;
    }
    catch(error:any){
      return "Encountered error: " + error;
    }
  }
  
  private async addProduct(product : Product) : Promise<any> {
    try {
      let postProduct : any = await fetch(`${this.SHOPIFY_DOMAIN}/admin/api/2023-04/products.json`,{
        method : "POST",
        headers : {
          "X-Shopify-Access-Token": this.ADMIN_ACCESS_TOKEN
        },
        body : JSON.stringify({product})
      });
      if (!postProduct.ok) {
        return `Could not add new product, ${postProduct.statusText}`;
      }
      const PRODUCT : any = await postProduct.json();
      return `Added new product with ID ${PRODUCT.product.id}`
    }
    catch(error : any){
      return "Encountered error: " + error;
    }
  }

  protected async removeProducts(id: number) : Promise<any> {
    try {
      let removeRequest : any = await fetch(`${this.SHOPIFY_DOMAIN}/admin/api/2023-04/products/${id}.json`, {
        method : "DELETE",
        headers: {
        "X-Shopify-Access-Token": this.ADMIN_ACCESS_TOKEN,
        "Content-Type": "application/json"
        }
      });
      if (!removeRequest.ok) {
        return `Could not add new product, ${removeRequest.statusText}`;
      };
      return `Deleted product with ID: ${id}`;
    }
    catch (error : any) {
      return "Encountered error: " + error; 
    }
  }

  protected async queryProduct(title: string) : Promise<any> {
    try {
      let productQuery : any = await fetch(`${this.SHOPIFY_DOMAIN}/admin/api/2023-04/products.json?title=${encodeURIComponent(title)}`,{
        method : "GET",
        headers : {
          "X-Shopify-Access-Token": this.ADMIN_ACCESS_TOKEN,
          "Content-Type": "application/json"
        }
      });
      if(!productQuery.ok) {
        return `Could not get specified product, ${productQuery.statusText}`;
      }
      const QUERY_RESULT : any = await productQuery.json();
      if(!QUERY_RESULT.products || QUERY_RESULT.length === 0) {
        return "Could not find product";        
      }
      return `Found ID: ${QUERY_RESULT.products[0].id}`;
    }
    catch(error : any) {
      return "Encountered error: " + error; 
    }
  }

  protected async editProcductInfo(
    id : string,
    image : {
      "src" : string;
    },
    title ?: string, 
    variants ?: {
      option1 ?: string;
      option2 ?: string | null;
      option3 ?: string | null;
      price ?: string | null;
      sku ?: string;
    }[],
    body_html ?: string, 
    vendor ?: string, 
    product_type ?: string, 
    tags ?: string, 
  ) : Promise<any> {
    let returnMsg = "Changed: "
    const searchQuery : any = await fetch (`${this.SHOPIFY_DOMAIN}/admin/api/2025-04/customers/search.json?query=id:${encodeURIComponent(id)}`,
      {
        method : "GET",
        headers : {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": this.ADMIN_ACCESS_TOKEN
        }
      });
      const SEARCH : any = await searchQuery.json();
      //check if response is valid
      if (!SEARCH.products || SEARCH.length === 0) {
        console.log("Product not found");
      }
      if (title !== undefined) {
        SEARCH.products[0].title = title;
        returnMsg += "\nTitle"
      }
      if (variants !== undefined) {
        SEARCH.products[0].variants = variants;
        returnMsg += "\nVariants"
      }
      if (body_html!==undefined){
        SEARCH.products[0].body_html=body_html;
        returnMsg += "\nBody text"
      }
      if (vendor!==undefined){
        SEARCH.products[0].vendor=vendor;
        returnMsg += "\nVendor"
      }
      if (product_type!==undefined){
        SEARCH.products[0].product_type=product_type;
        returnMsg += "\nProduct Type"
      }
      if (tags!==undefined){
        SEARCH.products[0].tags=tags;
        returnMsg += "\nTags"
      }
      return `Updated customer information for product: ${SEARCH.products[0].title}.` + returnMsg;
  } 

  protected async retrieveLocationId(locationName : string) : Promise<string> {
    try {
      let fetchLocation : any = await fetch(`${this.SHOPIFY_DOMAIN}/admin/api/2023-04/locations.json`,{
        method:"GET",
        headers : {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": this.ADMIN_ACCESS_TOKEN
        }
      });
      if (!fetchLocation.ok) {
        return "Could not fetch location ID with name: " + locationName;
      }
      const LOCATION_DATA : any = await fetchLocation.json();
      return `Foud location ID: ${LOCATION_DATA.locations[0].id}`;
    }
    catch(error:any) {
      return "Encountered error: " + error; 
    }
  }

  protected async editInventoryLevels(productId : string, variant : number, locationId : string, quantity : number) : Promise<any> {
    //get inventory item ID
    let inventoryItemID : string = "";
    try {
      let fetchProduct : any = await fetch(`${this.SHOPIFY_DOMAIN}/admin/api/2023-04/products/${productId}.json`,{
        method: 'GET',
        headers: {
          "X-Shopify-Access-Token": this.ADMIN_ACCESS_TOKEN,
          "Content-Type": "application/json"
        }
      });
      if (!fetchProduct.ok) {
        return "Could not fetch Inventory item ID with Product ID: " + productId;
      }
      let productData : any = await fetchProduct.json();
      inventoryItemID = productData.product.variants[variant].inventory_item_id;
    }
    catch(error:any) {
      return "Encountered error: " + error; 
    }
    try {
      let fetchInventory : any = await fetch (`${this.SHOPIFY_DOMAIN}/admin/api/2023-04/inventory_levels/set.json`,{
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": this.ADMIN_ACCESS_TOKEN,
          "Content-Type": "application/json"
        },
        body: JSON.stringify ({
          location_id : locationId,
          inventory_item_id : inventoryItemID,
          available : quantity
        })
      });
      if (!fetchInventory.ok) {
        return "Could not edit inventory levels for product with ID: "+ productId;
      }
      return `Inventory for product with product ID: ${productId} has been updated to ${quantity} products at the location with ID: ${locationId}`;
    }
    catch (error: any) {
      return "Encountered error: " + error; 
    }
  }

  protected async addCustomer(customerData: Customer) : Promise<any> {
    let requestOptions: any = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": this.ADMIN_ACCESS_TOKEN,
      },
      body: JSON.stringify(customerData),
    };

    try {
      const RESPONSE = await fetch(this.url, requestOptions);
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
    const searchQuery : any = await fetch (`${this.SHOPIFY_DOMAIN}/admin/api/2025-04/customers/search.json?query=email:${encodeURIComponent(email)}`,
    {
      method : "GET",
      headers : {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": this.ADMIN_ACCESS_TOKEN
      }
    });
    const SEARCH : any = await searchQuery.json();
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