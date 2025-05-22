# Test info

- Name: Client App login for ADIDAS ORIGINAL
- Location: /home/runner/work/playwright/playwright/tests/ClientAppPO.spec.js:10:10

# Error details

```
TimeoutError: locator.waitFor: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('.ta-results') to be visible

    at PaymentPage.SearchCountryAndSelect (/home/runner/work/playwright/playwright/pageobjects/PaymentPage.js:44:29)
    at /home/runner/work/playwright/playwright/tests/ClientAppPO.spec.js:32:5
```

# Page snapshot

```yaml
- navigation:
  - link "Automation Automation Practice":
    - /url: ""
    - heading "Automation" [level=3]
    - paragraph: Automation Practice
  - link "QA Meetup with Rahul Shetty @Pune - Limited Seats! Book Now!":
    - /url: https://qasummit.org/
  - list:
    - listitem:
      - button " HOME"
    - listitem
    - listitem:
      - button " ORDERS"
    - listitem:
      - button " Cart 1"
    - listitem:
      - button "Sign Out"
- text: "ADIDAS ORIGINAL $ 31500 Quantity: 1"
- list:
  - listitem: Addias Originals
- text: Payment Method Credit Card Paypal SEPA Invoice Personal Information Credit Card Number
- textbox: 4542 9931 9292 2293
- text: Expiry Date
- combobox:
  - option "01"
  - option "02"
  - option "03"
  - option "04" [selected]
  - option "05"
  - option "06"
  - option "07"
  - option "08"
  - option "09"
  - option "10"
  - option "11"
  - option "12"
- combobox:
  - option "01"
  - option "02"
  - option "03"
  - option "04"
  - option "05"
  - option "06"
  - option "07"
  - option "08"
  - option "09"
  - option "10"
  - option "11"
  - option "12"
  - option "13"
  - option "14"
  - option "15"
  - option "16"
  - option "17"
  - option "18"
  - option "19"
  - option "20"
  - option "21"
  - option "22" [selected]
  - option "23"
  - option "24"
  - option "25"
  - option "26"
  - option "27"
  - option "28"
  - option "29"
  - option "30"
  - option "31"
- text: CVV Code ?
- textbox: "123"
- text: Name on Card
- textbox: Raphael Doe
- text: Apply Coupon
- textbox: rahulshettyacademy
- paragraph: "* Coupon Applied"
- button "Apply Coupon"
- text: Shipping Information damasceno99@hotmail.com
- textbox: damasceno99@hotmail.com
- textbox "Select Country"
- text: Place Order
```

# Test source

```ts
   1 | const {expect} = require('@playwright/test');
   2 | class PaymentPage
   3 | {
   4 | constructor(page){
   5 |     this.page = page
   6 |     this.cvvInput = page.locator('div.field:has-text("CVV Code") input.input.txt')
   7 |     this.nameOnCardInput = page.locator('div.field:has-text("Name on Card") input.txt');
   8 |     this.couponInput = page.locator("[name='coupon']");
   9 |     this.applyCoupon = page.locator('button.btn.btn-primary:has-text("Apply Coupon")')
  10 |     this.orderBttn = page.locator('text=Place Order')
  11 |     this.country = page.locator("[placeholder*='Country']");
  12 |     this.dropdown = page.locator(".ta-results");
  13 |     this.submit =  page.locator(".action__submit");
  14 |     this.orderConfirmationText = page.locator(".hero-primary");
  15 |     this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
  16 |  }
  17 |
  18 |
  19 |  async fillPaymentData(month,year,csv,name, couponValue){
  20 |     this.month_dropdown = await this.page.locator('div.field:has-text("Expiry Date") select.input.ddl').first();
  21 |     this.year_dropdown = await this.page.locator('div.field:has-text("Expiry Date") select.input.ddl').last();
  22 |     await this.month_dropdown.selectOption({ label: month });
  23 |     await this.year_dropdown.selectOption({ label: year });
  24 |     await this.cvvInput.fill(csv); 
  25 |     await this.nameOnCardInput.fill(name);
  26 |     await this.couponInput.fill(couponValue)
  27 |     await this.applyCoupon.click();
  28 |  }
  29 |
  30 |
  31 |
  32 |  async validateShippingInformation(username)
  33 |
  34 |  {
  35 |     await expect(this.page.locator('label', { hasText: username })).toBeVisible();
  36 |  }
  37 |
  38 |
  39 |
  40 |  async SearchCountryAndSelect(countryName) {
  41 |     const subsCountryString = countryName.substring(0, 3);
  42 |     await this.country.pressSequentially(subsCountryString, { delay: 300 });
  43 |        // await this.country.fill(countryCode,{delay:100});
> 44 |         await this.dropdown.waitFor();
     |                             ^ TimeoutError: locator.waitFor: Timeout 30000ms exceeded.
  45 |         const optionsCount = await this.dropdown.locator("button").count();
  46 |         for(let i =0;i< optionsCount; ++i)
  47 |         {
  48 |           const  text =  await this.dropdown.locator("button").nth(i).textContent();
  49 |             if(text.trim() === countryName)
  50 |             {
  51 |                await this.dropdown.locator("button").nth(i).click();
  52 |                break;
  53 |             }
  54 |         }
  55 |     
  56 |     }
  57 |   
  58 |
  59 | async SubmitAndGetOrderId() {
  60 |     await this.submit.click();
  61 |     await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
  62 |         
  63 |     const rawOrderId = await this.orderId.textContent();
  64 |     const orderId = rawOrderId.replace(/\|/g, '').trim();
  65 |       
  66 |     return orderId;
  67 |     }
  68 |
  69 | }
  70 |
  71 | module.exports = {PaymentPage};
```