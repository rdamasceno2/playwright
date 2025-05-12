const {expect} = require('@playwright/test');
class OrdersPage {
    constructor(page) {
        this.page = page;
        this.ordersButton = page.locator("button[routerlink*='myorders']");
        this.orderRow = (orderId) => page.locator(`tr:has(th:has-text("${orderId}"))`);
        this.viewButton = (orderRow) => orderRow.locator('button.btn.btn-primary');
    }

    async navigateToOrdersPage() {
        await this.ordersButton.click();
        await this.page.waitForSelector('tbody');
    }

    async findOrderById(orderId, username, countryName) {
        const maxRetries = 3;
        let attempt = 0;

        while (attempt < maxRetries) {
            const orderRow = this.orderRow(orderId);

            if (await orderRow.count() > 0) {
                const viewButton = this.viewButton(orderRow);
                await viewButton.click();

                // Validate order details
                await expect(this.page.locator(".col-text.-main")).toHaveText(orderId);
                await expect(this.page.locator("p.text").first()).toHaveText(username);
                await expect(this.page.locator("p.text").nth(1)).toContainText(countryName);

                return true; // Order found
            }

            await this.page.waitForTimeout(2000); // Wait before retrying
            attempt++;
        }

        console.error(`Order row with ID ${orderId} not found after ${maxRetries} attempts.`);
        return false; // Order not found
    }
}

module.exports = { OrdersPage };