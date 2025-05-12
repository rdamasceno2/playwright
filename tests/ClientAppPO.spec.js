
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
    // Orders page actions
    const ordersPage = poManager.getOrdersPage(); // Add a new page object for OrdersPage
    await ordersPage.navigateToOrdersPage();
    const orderFound = await ordersPage.findOrderById(trimmedOrderId, data.username, data.countryName);

    // Assertions
    expect(orderFound).toBeTruthy();



    })}
    
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