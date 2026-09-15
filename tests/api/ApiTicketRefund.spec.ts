//import { test, expect, request } from '@playwright/test';
//import { APIManager } from "../../api/APIManager";
//import { POManager } from '../../pageObjects/client-booking/POManager';
import { bookingTestData } from "../../test-data/bookingTestData";
import { test, expect } from "../../fixtures/TestFixtures";

for (const data of bookingTestData) {

    test.describe(`API Ticket Refund Test - ${data.customerName}`, {tag:['@api', '@regression']}, () => {

        test.beforeEach(async ({ apiManager }) => {

            const loginClient = apiManager.getLoginClient();
            const authToken = await loginClient.getAuthToken(data.username, data.password);
            const bookingClient = apiManager.getBookingClient();
            const bookingRes = await bookingClient.deleteAllBookings(authToken);
            expect(bookingRes.status()).toBe(200);
        });

        test(`API Successful Refund Test`, {tag:['@smoke']}, async ({ apiManager, bookingPOManager }) => {
           
            const loginClient = apiManager.getLoginClient();
            const token = await loginClient.getAuthToken(data.username, data.password);

            const bookingClient = apiManager.getBookingClient();

            const bookingRes = await bookingClient.createBooking(data.eventId, data.customerName, data.customerEmail, data.customerPhone, 1, token);
            expect(bookingRes.status()).toBe(201);
            const bookingJson = await bookingRes.json();
            const bookingRef = bookingJson.data.bookingRef;

            const loginPage = bookingPOManager.getLoginPage();
            await loginPage.goTo();
            await loginPage.validLogin(data.username, data.password);
            expect(await loginPage.browseEventsIsDisplayed()).toBeTruthy();

            const homePage = bookingPOManager.getHomePage();
            await homePage.goToMyBookings();

            const bookingPage = bookingPOManager.getMyBookingsPage();
            await bookingPage.viewEventDetails(bookingRef);

            const eventDetailPage = bookingPOManager.getEventDetailPage();
            await expect(eventDetailPage.getBookingInfoText()).toBeVisible();

            expect(await eventDetailPage.getBookingIdLetter()).toBe(await eventDetailPage.getEventNameLetter());

            await eventDetailPage.getRefundCheck();

            await expect(eventDetailPage.getRefundSpinner()).toBeVisible();
            await expect(eventDetailPage.getRefundSpinner()).not.toBeVisible({ timeout: 10000 });

            expect(await eventDetailPage.getRefundText()).toContain("Single-ticket bookings qualify for a full refund");

        })

        test('API Not Eligible for Refund Test', async ({ apiManager, bookingPOManager }) => {
            
            const loginClient = apiManager.getLoginClient();
            const token = await loginClient.getAuthToken(data.username, data.password);

            const bookingClient = apiManager.getBookingClient();

            const bookingRes = await bookingClient.createBooking(data.eventId, data.customerName, data.customerEmail, data.customerPhone, 5, token);
            expect(bookingRes.status()).toBe(201);
            const bookingJson = await bookingRes.json();
            const bookingRef = bookingJson.data.bookingRef;

            const loginPage = bookingPOManager.getLoginPage();
            await loginPage.goTo();
            await loginPage.validLogin(data.username, data.password);
            expect(await loginPage.browseEventsIsDisplayed()).toBeTruthy();

            const homePage = bookingPOManager.getHomePage();
            await homePage.goToMyBookings();

            const bookingPage = bookingPOManager.getMyBookingsPage();
            await bookingPage.viewEventDetails(bookingRef);

            const eventDetailPage = bookingPOManager.getEventDetailPage();
            await expect(eventDetailPage.getBookingInfoText()).toBeVisible();

            expect(await eventDetailPage.getBookingIdLetter()).toBe(await eventDetailPage.getEventNameLetter());

            await eventDetailPage.getRefundCheck();

            await expect(eventDetailPage.getRefundSpinner()).toBeVisible();
            await expect(eventDetailPage.getRefundSpinner()).not.toBeVisible({ timeout: 10000 });

            expect(await eventDetailPage.getRefundText()).toContain("Group bookings (5 tickets) are non-refundable");
        })
    })
}