import {test, expect,Locator,Page} from '@playwright/test';
export class DashboardPage
{
    page: Page;
    products: Locator;
    productsText: Locator;
    cartButton: Locator;
constructor(page:Page)
{
    this.products =  page.locator('.card-body');
    this.productsText = page.locator('.card-body b');
    this.cartButton = page.locator('button.btn-custom:has-text("Cart")');
}

async searchProductAddCart(productName:string){
    await this.productsText.first().waitFor()
    const iphoneCard =  this.products.filter({ hasText: productName });
    await iphoneCard.locator("text=Add To Cart").click();

}
async navigateToCart(){
    await this.cartButton.click();
}


}
module.exports = {DashboardPage};