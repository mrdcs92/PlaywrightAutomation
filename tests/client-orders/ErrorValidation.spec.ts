import { test, expect, Locator, Page } from "@playwright/test";
import { POManager } from "../../pageObjects/client-orders/POManager";
import { placeOrderTestData } from '../../test-data/placeOrderTestData'

import dataset from '../../test-data/placeOrderTestData.json';

for (const data of dataset) {

    test(`JSON Data: Password Login Error Validation - ${data.username}`, async ({ page }) => {

        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        loginPage.goTo();
        loginPage.validLogin(data.username, "banana");
        const errorMessage = await loginPage.getErrorMessage();
        console.log(errorMessage);
        expect(errorMessage).toEqual("Incorrect email or password.");
    });

    test(`JSON Data: Username Login Error Validation - ${data.username}`, async ({ page }) => {

        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        loginPage.goTo();
        loginPage.validLogin((data.username + ".com"), data.password);
        const errorMessage = await loginPage.getErrorMessage();
        console.log(errorMessage);
        expect(errorMessage).toEqual("Incorrect email or password.");
    });

}

for (const data of placeOrderTestData) {

    test(`TS Data: Password Login Error Validation - ${data.username}`, async ({ page }) => {

        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        loginPage.goTo();
        loginPage.validLogin(data.username, "banana");
        const errorMessage = await loginPage.getErrorMessage();
        console.log(errorMessage);
        expect(errorMessage).toEqual("Incorrect email or password.");
    });

    test(`TS Data: Username Login Error Validation - ${data.username}`, async ({ page }) => {

        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        loginPage.goTo();
        loginPage.validLogin((data.username + ".com"), data.password);
        const errorMessage = await loginPage.getErrorMessage();
        console.log(errorMessage);
        expect(errorMessage).toEqual("Incorrect email or password.");
    });

} 