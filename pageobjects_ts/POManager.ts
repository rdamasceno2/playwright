

import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import { PaymentPage } from './PaymentPage';
import { CheckoutPage } from './CheckoutPage';
import {Page} from '@playwright/test';

export class POManager
{
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    checkoutPage : CheckoutPage;
    paymentPage : PaymentPage;
    page : Page;

constructor(page:Page)
{
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.paymentPage = new PaymentPage(this.page);

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

getCheckoutPage()
{
    return this.checkoutPage;
}
}
module.exports = {POManager};