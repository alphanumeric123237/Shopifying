type Role = "Customer" | "Admin" | "None";

interface User {
  email: string;
  password: string;
}

interface Customer extends User {
  role: Role;
  orderHistory: string[];
  address: string;
}

interface Admin extends User {
  role: Role;
}

class Login {
    // fixed admins
    private _admins: Admin[] = [
    { email: "admin1@example.com", password: "adminpass1", role: "Admin" },
    { email: "admin2@example.com", password: "adminpass2", role: "Admin" },
  ];

  private _customers: Customer[] = [
    {
      email: "customer1@example.com",
      password: "custpass1",
      role: "Customer",
      address: "",
      orderHistory: []
    },
  ];

  public constructor() {
    // get the button from the html
    const loginBtn = document.getElementById("login") as HTMLButtonElement;

    loginBtn?.addEventListener("click", (e) => {
      e.preventDefault(); 
      const inputs = this.InputValues;
      if (!inputs) return;

      const role = this.login(inputs.email, inputs.password);

      if (role === "Admin") {
        window.location.href = "Admin.html";
      } else if (role === "Customer") {
        window.location.href = "final.html";
      } else {
        alert("Login failed. Please check your email or password.");
      }
    });

    this.loadCustomers();
  }

  private get InputValues(): {email: string; password: string} | null {
    const emailInput = document.getElementById("email") as HTMLInputElement | null;
    const passwordInput = document.getElementById("password") as HTMLInputElement | null;

    if (!emailInput || !passwordInput) {
        return null;
    }

    return { email: emailInput.value, password: passwordInput.value };
  }

  // this will load the stored customers every time the web page runs
  private loadCustomers(): void {
    const customerData = localStorage.getItem("customers");
    if (customerData) {
        this._customers = JSON.parse(customerData);
    }
  }

  // identify whether the login user is a customer or an admin
  public login(email: string, password: string): Role {
    for (const admin of this._admins) {
      if (admin.email === email && admin.password === password) {
        return "Admin";
      }
    }

    for (const customer of this._customers) {
      if (customer.email === email && customer.password === password) {
        return "Customer";
      }
    }

    return "None";
  }
}

// Instantiate Login when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  new Login();
});
