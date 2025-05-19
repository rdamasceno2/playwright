import { Page, expect } from '@playwright/test';

export class OrdersPage {
    constructor(private page: Page) {}

    /**
     * Find order by ID in the orders list
     * @param orderId The order ID to search for
     * @returns Promise<void>
     */
    async findOrder(orderId: string): Promise<void> {
        await this.page.locator("button[routerlink*='myorders']").click();
        await this.page.locator("tbody").waitFor();

        const rows = this.page.locator("tbody tr");
        for(let i = 0; i < await rows.count(); i++) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (rowOrderId && orderId.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

    /**
     * Get order details from the details page
     * @returns Promise<string>
     */
    async getOrderDetails(): Promise<string> {
        return (await this.page.locator(".col-text").textContent()) || '';
    }

    /**
     * Verify if the order details match the expected order ID
     * @param orderId The expected order ID
     */
    async verifyOrderDetails(orderId: string): Promise<void> {
        const orderDetails = await this.getOrderDetails();
        expect(orderId.includes(orderDetails), 
            `Order details (${orderDetails}) don't match expected ID (${orderId})`
        ).toBeTruthy();
    }
}
