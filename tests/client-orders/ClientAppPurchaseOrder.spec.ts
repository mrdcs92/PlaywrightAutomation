import { test, expect, Locator, Page } from "@playwright/test";
import { POManager } from "../../pageObjects/client-orders/POManager";
import { customTest } from '../../helpers/TestBase';
import { placeOrderTestData } from '../../test-data/placeOrderTestData'

import dataset from '../../test-data/placeOrderTestData.json';

for (const data of dataset) {

    test(`JSON Data: Place Order - ${data.productName}`, async ({ page }) => {

        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();

        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);

        const dashBoardPage = poManager.getDashboardPage();
        await dashBoardPage.searchProductAddCart(data.productName);
        await dashBoardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");
        let orderId: any;
        orderId = await ordersReviewPage.SubmitAndGetOrderId();

        await dashBoardPage.navigateToOrders();

        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

    });

}

for (const data of placeOrderTestData) {

    test(`TS Data: Place Order - ${data.productName}`, async ({ page }) => {

        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();

        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);

        const dashBoardPage = poManager.getDashboardPage();
        await dashBoardPage.searchProductAddCart(data.productName);
        await dashBoardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");
        let orderId: any;
        orderId = await ordersReviewPage.SubmitAndGetOrderId();

        await dashBoardPage.navigateToOrders();

        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

    });

}