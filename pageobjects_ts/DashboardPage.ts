import {test, expect, Locator, Page} from '@playwright/test';
export class DashboardPage
{
    page: Page;
    products: Locator;
    productsText: Locator;
    cartButton: Locator;
    ordersButton: Locator;
constructor(page:Page)
{
    this.page = page;
    this.products =  page.locator('.card-body');
    this.productsText = page.locator('.card-body b');
    this.cartButton = page.locator('button.btn-custom:has-text("Cart")');
    this.ordersButton = page.locator("button[routerlink*='myorders']");
}

async searchProductAddCart(productName:string){
    await this.productsText.first().waitFor()
    const iphoneCard =  this.products.filter({ hasText: productName });
    await iphoneCard.locator("text=Add To Cart").click();

}
async navigateToCart(){
    await this.cartButton.click();
}
async navigateToOrders() {
    await this.ordersButton.click();
    await this.page.locator("tbody").waitFor();
}

async verifyOrderPresent(orderId: string) {
    const rows = this.page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (rowOrderId && orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            return true;
        }
    }
    return false;
}

async getOrderDetails(): Promise<string> {
    const details = await this.page.locator(".col-text").textContent();
    return details || '';
}
}
module.exports = {DashboardPage};