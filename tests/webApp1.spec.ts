const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../utils/APiUtils');
const { POManager } = require('../pageobjects_ts/POManager');

const loginPayLoad = {
    userEmail: "damasceno999@gmail.com",
    userPassword: "Learning1"
};

const orderPayLoad = {
    orders: [{
        country: "Cuba",
        productOrderedId: "67a8df1ac0d3e6622a297ccb"
    }]
};

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
});

test('@API Place and verify order', async ({ page }) => {
    // Initialize Page Object Manager
    const poManager = new POManager(page);
    const dashboardPage = poManager.getDashboardPage();
    const loginPage = poManager.getLoginPage();

    // Set authentication and navigate
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await loginPage.goTo();

    // Navigate to orders section
    await dashboardPage.navigateToOrders();

    // Verify order is present and view details
    const isOrderFound = await dashboardPage.verifyOrderPresent(response.orderId);
    expect(isOrderFound, `Order ${response.orderId} should be present in the list`).toBeTruthy();

    // Verify order details match
    const orderDetails = await dashboardPage.getOrderDetails();
    expect(orderDetails).toBeTruthy();
    expect(response.orderId.includes(orderDetails),
        `Order details ${orderDetails} should match order ID ${response.orderId}`
    ).toBeTruthy();

});

//Verify if order created is showing in history page
// Precondition - create order -