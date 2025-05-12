// @ts-check
import { test, expect } from '@playwright/test';





test('E2E flow test', async ({ page }) => {
    const email = "damasceno999@gmail.com";
    const productName = 'IPHONE 13 PRO';

    // Navigate to the login page
    await page.goto('https://rahulshettyacademy.com/client');
    
    // Validate the page title
    await expect(page).toHaveTitle("Let's Shop");
    
    // Fill in the login form
    await page.fill('#userEmail', email);
    await page.fill('#userPassword', 'Learning1');
    await page.click('#login');
  
    // Validate that the expected text is present
    await expect(page.locator('.left.mt-1 p')).toHaveText('Automation Practice');
    
    // Get card titles
    await page.locator('.card-body b').first().waitFor();
    const all_Titles =  await  page.locator('.card-body b').allTextContents();
    const iphoneCard = page.locator('.card-body').filter({ hasText: productName });
    await iphoneCard.locator("text=Add To Cart").click();
  
    const cartButton = page.locator('button.btn-custom:has-text("Cart")');
    await cartButton.click();


    // Check if the item is visible
    await expect(page.locator('.cartSection h3')).toHaveText(productName);
    await page.locator('text=Checkout').click();
    const month_dropdown = await page.locator('div.field:has-text("Expiry Date") select.input.ddl').first();
    const year_dropdown = await page.locator('div.field:has-text("Expiry Date") select.input.ddl').last();
    await month_dropdown.selectOption({ label: '02' });
    await year_dropdown.selectOption({ label: '22' });
    const cvvInput = await page.locator('div.field.small input.txt').first();

    // Input the CVV code
    await cvvInput.fill('123'); // Replace '123' with the actual CVV code you want to input
    // Locate the input field where the title is "Name on Card"
    const nameOnCardInput = page.locator('div.field:has-text("Name on Card") input.txt');

    // Input the name on the card
    await nameOnCardInput.fill('Raphael Doe');
    const couponInput = page.locator("[name='coupon']");

    // Input the coupon code
    await couponInput.fill('rahulshettyacademy')
    await page.locator('button.btn.btn-primary:has-text("Apply Coupon")').click();
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator("[placeholder*='Country']").pressSequentially("bra", {delay:100});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
       const text = await dropdown.locator("button").nth(i).textContent();
       if (text === " Brazil") {
          await dropdown.locator("button").nth(i).click();
          break;
       }
    }
    await page.locator('text=Place Order').click();
    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ")
    // Retrieve the order ID from the label
    const orderId = await page.locator('label.ng-star-inserted').textContent();
    const cleanedValue = orderId.replace(/\|/g, '').trim();
    const trimmedOrderId = cleanedValue.trim(); // Trim whitespace

    // Click the button to navigate to the orders page
    await page.waitForSelector('tbody');
    await page.locator("button[routerlink*='myorders']").click();

    // Set the maximum number of retries
    const maxRetries = 3;
    let attempt = 0;
    let orderRow;

    while (attempt < maxRetries) {
        // Locate the row that contains the specific order ID
        orderRow = page.locator(`tr:has(th:has-text("${trimmedOrderId}"))`);
        console.log(`Looking for order ID: ${trimmedOrderId}, Attempt: ${attempt + 1}`);

        // Check if the row exists before trying to get its content
        if (await orderRow.count() > 0) {
            const rowContent = await orderRow.textContent();
            console.log(rowContent); // Print the entire row content

            // Example: Click the "View" button in that row
            const viewButton = orderRow.locator('button.btn.btn-primary');
            await viewButton.click();
            break; // Exit the loop if found
        } else {
            console.error(`Order row with ID ${trimmedOrderId} not found on attempt ${attempt + 1}.`);

            // Optionally, wait for some time before the next attempt
            await page.waitForTimeout(2000); // Wait for 2 seconds before retrying
            attempt++;
        }
    }

    if (attempt === maxRetries) {
        console.error(`Order row with ID ${trimmedOrderId} not found after ${maxRetries} attempts.`);
    }
    await expect(page.locator(".col-text.-main")).toHaveText(trimmedOrderId);
    await expect(page.locator("p.text").first()).toHaveText(email);
    await expect(page.locator("p.text").nth(1)).toContainText("Brazil");
  });
