//import { test, expect, request } from '@playwright/test';
//import { POManager } from "../../pageObjects/client-booking/POManager";
import { test, expect } from "../../fixtures/TestFixtures";
import { placeOrderTestData } from '../../test-data/placeOrderTestData';
import { ApiUtils } from '../../helpers/ApiUtils';

for (const data of placeOrderTestData) {


    test.describe(`Booking Tests - ${data.username}`, {tag:['@clientBooking', '@regression']}, () => {

        test.beforeEach(async ({ apiManager }) => {
            const loginClient = apiManager.getLoginClient();
            const authToken = await loginClient.getAuthToken(data.username, data.password);

            const bookingClient = apiManager.getBookingClient();
            const bookingRes = await bookingClient.deleteAllBookings(authToken);
            expect(bookingRes.status()).toBe(200);
        });

        test(`Ticket Refund Test`, {tag:['@smoke']}, async ({ bookingPOManager, page }) => {
            const loginPage = bookingPOManager.getLoginPage();
            await loginPage.goTo();
            await loginPage.validLogin(data.username, data.password);
            expect(await loginPage.browseEventsIsDisplayed()).toBeTruthy();

            const homePage = bookingPOManager.getHomePage();
            await homePage.goToEvent();

            const eventBookPage = bookingPOManager.getEventBookPage();
            await eventBookPage.fillForm(data.username);
            await eventBookPage.goToMyBookings();

            const myBookingsPage = bookingPOManager.getMyBookingsPage();
            await expect(page).toHaveURL(myBookingsPage.getPageUrl());
            await myBookingsPage.viewEventDetails(eventBookPage.getBookingRef());

            const eventDetailPage = bookingPOManager.getEventDetailPage();
            await expect(eventDetailPage.getBookingInfoText()).toBeVisible();

            expect(await eventDetailPage.getBookingIdLetter()).toBe(await eventDetailPage.getEventNameLetter());

            await eventDetailPage.getRefundCheck();

            await expect(eventDetailPage.getRefundSpinner()).toBeVisible();
            await expect(eventDetailPage.getRefundSpinner()).not.toBeVisible({ timeout: 10000 });

            expect(await eventDetailPage.getRefundText()).toContain("Single-ticket bookings qualify for a full refund");
        });


        test(`Ticket Not Eligible for Refund Test`, {tag:['@errorValidation']}, async ({ bookingPOManager, page }) => {
            const loginPage = bookingPOManager.getLoginPage();
            await loginPage.goTo();
            await loginPage.validLogin(data.username, data.password);
            expect(await loginPage.browseEventsIsDisplayed()).toBeTruthy();

            const homePage = bookingPOManager.getHomePage();
            await homePage.goToEvent();

            const eventBookPage = bookingPOManager.getEventBookPage();
            await eventBookPage.fillForm(data.username, 2);
            await eventBookPage.goToMyBookings();

            const myBookingsPage = bookingPOManager.getMyBookingsPage();
            await expect(page).toHaveURL(myBookingsPage.getPageUrl());
            await myBookingsPage.viewEventDetails(eventBookPage.getBookingRef());

            const eventDetailPage = bookingPOManager.getEventDetailPage();
            await expect(eventDetailPage.getBookingInfoText()).toBeVisible();

            expect(await eventDetailPage.getBookingIdLetter()).toBe(await eventDetailPage.getEventNameLetter());

            await eventDetailPage.getRefundCheck();

            await expect(eventDetailPage.getRefundSpinner()).toBeVisible();
            await expect(eventDetailPage.getRefundSpinner()).not.toBeVisible({ timeout: 10000 });

            expect(await eventDetailPage.getRefundText()).toContain("Group bookings (3 tickets) are non-refundable");
        });

    });

}

