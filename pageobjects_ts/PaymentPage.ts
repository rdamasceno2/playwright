import {test, expect,Locator,Page} from '@playwright/test';
export class PaymentPage
{
   page : Page;
   cvvInput: Locator;
   nameOnCardInput: Locator;
   couponInput: Locator;
   applyCoupon: Locator;
   orderBttn: Locator;
   country: Locator;
   dropdown: Locator;
   submit: Locator;
   orderConfirmationText: Locator;
   orderId: Locator;
   month_dropdown: Locator;
   year_dropdown: Locator;
   
constructor(page:Page)
{
    this.page = page
    this.cvvInput = page.locator('div.field:has-text("CVV Code") input.input.txt')
    this.nameOnCardInput = page.locator('div.field:has-text("Name on Card") input.txt');
    this.couponInput = page.locator("[name='coupon']");
    this.applyCoupon = page.locator('button.btn.btn-primary:has-text("Apply Coupon")')
    this.orderBttn = page.locator('text=Place Order')
    this.country = page.locator("[placeholder*='Country']");
    this.dropdown = page.locator(".ta-results");
    this.submit =  page.locator(".action__submit");
    this.orderConfirmationText = page.locator(".hero-primary");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
 }


 async fillPaymentData(month:string,year:string,csv:string,name:string, couponValue:string){
    this.month_dropdown = await this.page.locator('div.field:has-text("Expiry Date") select.input.ddl').first();
    this.year_dropdown = await this.page.locator('div.field:has-text("Expiry Date") select.input.ddl').last();
    await this.month_dropdown.selectOption({ label: month });
    await this.year_dropdown.selectOption({ label: year });
    await this.cvvInput.fill(csv); 
    await this.nameOnCardInput.fill(name);
    await this.couponInput.fill(couponValue)
    await this.applyCoupon.click();
 }



 async validateShippingInformation(username:string)

 {
    await expect(this.page.locator('label', { hasText: username })).toBeVisible();
 }


    
async SearchCountryAndSelect(countryName: string) {
  const subsCountryString = countryName.substring(0, 3);
  await this.country.pressSequentially(subsCountryString, { delay: 300 });

  await this.dropdown.waitFor();
  const optionsCount = await this.dropdown.locator("button").count();

  for (let i = 0; i < optionsCount; ++i) {
    const textContent = await this.dropdown.locator("button").nth(i).textContent();
    const text = textContent?.trim() ?? "";

    if (text === countryName) {
      await this.dropdown.locator("button").nth(i).click();
      break;
    }
  }
}

  

async SubmitAndGetOrderId() {
    await this.submit.click();
    await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
    let rawOrderId:any;    
    rawOrderId= await this.orderId.textContent();
    const orderId = rawOrderId.replace(/\|/g, '').trim();
      
    return orderId;
    }

}

module.exports = {PaymentPage};