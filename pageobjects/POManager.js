const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CheckoutPage} = require('./CheckoutPage');
const {PaymentPage} = require('./PaymentPage');
const {OrdersPage} = require('./OrdersPage');

class POManager
{
constructor(page)
{
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.paymentPage = new PaymentPage(this.page);
    this.ordersPage = new OrdersPage(this.page);

}

getLoginPage()
{
    return this.loginPage;
}

getDashboardPage()
{
    return this.dashboardPage;
}
getPaymentPage()
{
    return this.paymentPage;
}

getOrdersPage()
{
    return this.ordersPage;
}

getCheckoutPage()
{
    return this.checkoutPage;
}
}
module.exports = {POManager};