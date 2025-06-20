type Role = "Customer" | "Admin" | "None";

interface User {
  email: string;
  password: string;
}

interface Customer extends User {
  role: Role;
  orderHistory: string[];
  address: string;
  name: string;
}

interface Admin extends User {
  role: Role;
}

class Login {
  private _admins: Admin[] = [
    { email: "admin1@example.com", password: "adminpass1", role: "Admin" },
    { email: "admin2@example.com", password: "adminpass2", role: "Admin" },
  ];

  private _customers: Customer[] = [
    // Example customer
    {
      email: "customer1@example.com",
      password: "custpass1",
      role: "Customer",
      orderHistory: [],
      address: "",
      name: "",
    },
  ];

  constructor() {
    this.setupEventListeners();
  }

  private setupEventListeners() {
    const loginBtn = document.getElementById("login");
    const createAccountBtn = document.getElementById("create-new-account");

    loginBtn?.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent form submission if inside a form
      const inputs = this.getInputValues();
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

    createAccountBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      const inputs = this.getInputValues();
      if (!inputs) return;

      const success = this.createAccount(inputs.email, inputs.password);
      if (success) {
        alert("Account created! You can now log in.");
      } else {
        alert("Account creation failed. Email already exists.");
      }
    });
  }

  private getInputValues(): { email: string; password: string } | null {
    const emailInput = document.getElementById("email") as HTMLInputElement | null;
    const passwordInput = document.getElementById("password") as HTMLInputElement | null;
    if (!emailInput || !passwordInput) return null;
    return { email: emailInput.value, password: passwordInput.value };
  }

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

  public createAccount(email: string, password: string): boolean {
    if (this._customers.some((c) => c.email === email)) {
      return false; // email already taken
    }

    const newCustomer: Customer = {
      email,
      password,
      role: "Customer",
      orderHistory: [],
      address: "",
      name: "",
    };

    this._customers.push(newCustomer);
    return true;
  }
}

// Instantiate Login when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  new Login();
});
