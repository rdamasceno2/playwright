const {expect} = require('@playwright/test');
class PaymentPage
{
constructor(page){
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


 async fillPaymentData(month,year,csv,name, couponValue){
    this.month_dropdown = await this.page.locator('div.field:has-text("Expiry Date") select.input.ddl').first();
    this.year_dropdown = await this.page.locator('div.field:has-text("Expiry Date") select.input.ddl').last();
    await this.month_dropdown.selectOption({ label: month });
    await this.year_dropdown.selectOption({ label: year });
    await this.cvvInput.fill(csv); 
    await this.nameOnCardInput.fill(name);
    await this.couponInput.fill(couponValue)
    await this.applyCoupon.click();
 }



 async validateShippingInformation(username)

 {
    await expect(this.page.locator('label', { hasText: username })).toBeVisible();
 }



 async SearchCountryAndSelect(countryName) {
    const subsCountryString = countryName.substring(0, 3);
    await this.country.pressSequentially(subsCountryString, { delay: 300 });
       // await this.country.fill(countryCode,{delay:100});
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for(let i =0;i< optionsCount; ++i)
        {
          const  text =  await this.dropdown.locator("button").nth(i).textContent();
            if(text.trim() === countryName)
            {
               await this.dropdown.locator("button").nth(i).click();
               break;
            }
        }
    
    }
  

async SubmitAndGetOrderId() {
    await this.submit.click();
    await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        
    const rawOrderId = await this.orderId.textContent();
    const orderId = rawOrderId.replace(/\|/g, '').trim();
      
    return orderId;
    }

}

module.exports = {PaymentPage};