import { test, expect } from '@playwright/test';
import { POManager } from "../../pageObjects/client-booking/POManager";
import { placeOrderTestData } from '../../test-data/placeOrderTestData'

for (const data of placeOrderTestData) {
    test(`Ticket Refund Test - ${data.username}`, async ({ page }) => {

        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);
        expect(await loginPage.browseEventsIsDisplayed()).toBeTruthy();

        const homePage = poManager.getHomePage();
        await homePage.goToEvent();

        const eventBookPage = poManager.getEventBookPage();
        await eventBookPage.fillForm(data.username);
        await eventBookPage.goToMyBookings();

        const myBookingsPage = poManager.getMyBookingsPage();
        await expect(page).toHaveURL(myBookingsPage.getPageUrl());
        await myBookingsPage.viewEventDetails();

        const eventDetailPage = poManager.getEventDetailPage();
        await expect(eventDetailPage.getBookingInfoText()).toBeVisible();

        expect(await eventDetailPage.getBookingIdLetter()).toBe(await eventDetailPage.getEventNameLetter());

        await eventDetailPage.getRefundCheck();

        await expect(eventDetailPage.getRefundSpinner()).toBeVisible();
        await expect(eventDetailPage.getRefundSpinner()).not.toBeVisible({ timeout: 10000 });

        expect(await eventDetailPage.getRefundText()).toContain("Single-ticket bookings qualify for a full refund");
    });

    test(`Ticket Not Eligible for Refund Test - ${data.username}`, async ({ page }) => {

        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);
        expect(await loginPage.browseEventsIsDisplayed()).toBeTruthy();

        const homePage = poManager.getHomePage();
        await homePage.goToEvent();

        const eventBookPage = poManager.getEventBookPage();
        await eventBookPage.fillForm(data.username, 2);
        await eventBookPage.goToMyBookings();

        const myBookingsPage = poManager.getMyBookingsPage();
        await expect(page).toHaveURL(myBookingsPage.getPageUrl());
        await myBookingsPage.viewEventDetails();

        const eventDetailPage = poManager.getEventDetailPage();
        await expect(eventDetailPage.getBookingInfoText()).toBeVisible();

        expect(await eventDetailPage.getBookingIdLetter()).toBe(await eventDetailPage.getEventNameLetter());

        await eventDetailPage.getRefundCheck();

        await expect(eventDetailPage.getRefundSpinner()).toBeVisible();
        await expect(eventDetailPage.getRefundSpinner()).not.toBeVisible({ timeout: 10000 });

        expect(await eventDetailPage.getRefundText()).toContain("Group bookings (3 tickets) are non-refundable");


    });

}

