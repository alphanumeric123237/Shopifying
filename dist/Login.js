"use strict";
class Login {
    constructor() {
        // fixed admins
        this._admins = [
            { email: "admin1@example.com", password: "adminpass1", role: "Admin" },
            { email: "admin2@example.com", password: "adminpass2", role: "Admin" },
        ];
        this._customers = [
            {
                email: "customer1@example.com",
                password: "custpass1",
                role: "Customer",
                address: "",
                orderHistory: []
            },
        ];
        // get the button from the html
        const loginBtn = document.getElementById("login");
        loginBtn === null || loginBtn === void 0 ? void 0 : loginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const inputs = this.InputValues;
            if (!inputs)
                return;
            const role = this.login(inputs.email, inputs.password);
            if (role === "Admin") {
                window.location.href = "Admin.html";
            }
            else if (role === "Customer") {
                window.location.href = "final.html";
            }
            else {
                alert("Login failed. Please check your email or password.");
            }
        });
        this.loadCustomers();
    }
    get InputValues() {
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        if (!emailInput || !passwordInput) {
            return null;
        }
        return { email: emailInput.value, password: passwordInput.value };
    }
    // this will load the stored customers every time the web page runs
    loadCustomers() {
        const customerData = localStorage.getItem("customers");
        if (customerData) {
            this._customers = JSON.parse(customerData);
        }
    }
    // identify whether the login user is a customer or an admin
    login(email, password) {
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
//# sourceMappingURL=Login.js.map