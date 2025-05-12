
import { test, expect } from '@playwright/test';
const { customtest } = require('../utils/test-base');
const {POManager} = require('../pageobjects/POManager');
const dataset =  JSON.parse(JSON.stringify(require("../utils/ClientAppPageObjectTestData.json")));


for(const data of dataset)
    {
     test(`Client App login for ${data.productName}`, async ({ page }) => {
    const poManager= new POManager(page);
    const loginPage = poManager.getLoginPage()
    await loginPage.goTo()
    await loginPage.validLogin(data.username,data.password)

    // Validate the page title
    await expect(page).toHaveTitle("Let's Shop");
    // Validate that the expected text is present
    await expect(page.locator('.left.mt-1 p')).toHaveText('Automation Practice');
    const dashboardPage = poManager.getDashboardPage()
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    // Check if the item is visible
    const checkoutPage = poManager.getCheckoutPage()
    await checkoutPage.ProductVisibleInCart(data.productName);
    await checkoutPage.navigateToCheckout();
    
    const paymentPage = poManager.getPaymentPage()
    await paymentPage.fillPaymentData(data.month,data.year,data.csv, data.name,data.coupon);
    await paymentPage.validateShippingInformation(data.username);
    await paymentPage.SearchCountryAndSelect(data.countryName);
    const trimmedOrderId = await paymentPage.SubmitAndGetOrderId();
   
   

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
    await expect(page.locator("p.text").first()).toHaveText(data.username);
    await expect(page.locator("p.text").nth(1)).toContainText(data.countryName);
});
    }

customtest('Client App login', async ({ page, testDataForOrder }) => {
    const poManager= new POManager(page);
    const loginPage = poManager.getLoginPage()
    await loginPage.goTo()
    await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password)

    // Validate the page title
    await expect(page).toHaveTitle("Let's Shop");
    // Validate that the expected text is present
    await expect(page.locator('.left.mt-1 p')).toHaveText('Automation Practice');
    const dashboardPage = poManager.getDashboardPage()
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    // Check if the item is visible
    const checkoutPage = poManager.getCheckoutPage()
    await checkoutPage.ProductVisibleInCart(testDataForOrder.productName);
    await checkoutPage.navigateToCheckout();
});