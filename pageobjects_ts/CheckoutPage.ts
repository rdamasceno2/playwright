import {test, expect,Locator,Page} from '@playwright/test';
export class CheckoutPage
{
        page : Page;
        productsInCart: Locator;
        checkoutBttn:Locator;

 constructor(page:Page)
 {

    this.productsInCart= page.locator('.cartSection h3');
    this.checkoutBttn=  page.locator('text=Checkout');
 }


async ProductVisibleInCart(productName:string) {
    await this.productsInCart.waitFor();
    const productLocator = this.productsInCart.filter({ hasText: productName });
    await expect(productLocator).toHaveText(productName, { timeout: 5000 }); // waits up to 5s
}

async navigateToCheckout(){
    await this.checkoutBttn.click();
}

}

module.exports = {CheckoutPage};