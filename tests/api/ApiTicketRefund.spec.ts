import { test, expect, request } from '@playwright/test';
import { APIManager } from "../../api/APIManager";
import { POManager } from '../../pageObjects/client-booking/POManager';
import { bookingTestData } from "../../test-data/bookingTestData";

for (const data of bookingTestData) {

    test.describe(`API Ticket Refund Test - ${data.customerName}`, {tag:['@api', '@regression']}, () => {

        test.beforeEach(async ({ }) => {
            const apiContext = await request.newContext();
            const apiManager = new APIManager(apiContext);
            const loginClient = apiManager.getLoginClient();
            const authToken = await loginClient.getAuthToken(data.username, data.password);
            const bookingClient = apiManager.getBookingClient();
            const bookingRes = await bookingClient.deleteAllBookings(authToken);
            expect(bookingRes.status()).toBe(200);
        });

        test(`API Successful Refund Test`, {tag:['@smoke']}, async ({ page, request }) => {
            const apiManager = new APIManager(request);
            const loginClient = apiManager.getLoginClient();
            const token = await loginClient.getAuthToken(data.username, data.password);

            const bookingClient = apiManager.getBookingClient();

            const bookingRes = await bookingClient.createBooking(data.eventId, data.customerName, data.customerEmail, data.customerPhone, 1, token);
            expect(bookingRes.status()).toBe(201);
            const bookingJson = await bookingRes.json();
            const bookingRef = bookingJson.data.bookingRef;

            const poManager = new POManager(page);
            const loginPage = poManager.getLoginPage();
            await loginPage.goTo();
            await loginPage.validLogin(data.username, data.password);
            expect(await loginPage.browseEventsIsDisplayed()).toBeTruthy();

            const homePage = poManager.getHomePage();
            await homePage.goToMyBookings();

            const bookingPage = poManager.getMyBookingsPage();
            await bookingPage.viewEventDetails(bookingRef);

            const eventDetailPage = poManager.getEventDetailPage();
            await expect(eventDetailPage.getBookingInfoText()).toBeVisible();

            expect(await eventDetailPage.getBookingIdLetter()).toBe(await eventDetailPage.getEventNameLetter());

            await eventDetailPage.getRefundCheck();

            await expect(eventDetailPage.getRefundSpinner()).toBeVisible();
            await expect(eventDetailPage.getRefundSpinner()).not.toBeVisible({ timeout: 10000 });

            expect(await eventDetailPage.getRefundText()).toContain("Single-ticket bookings qualify for a full refund");

        })

        test('API Not Eligible for Refund Test', async ({ page, request }) => {
            const apiManager = new APIManager(request);
            const loginClient = apiManager.getLoginClient();
            const token = await loginClient.getAuthToken(data.username, data.password);

            const bookingClient = apiManager.getBookingClient();

            const bookingRes = await bookingClient.createBooking(data.eventId, data.customerName, data.customerEmail, data.customerPhone, 5, token);
            expect(bookingRes.status()).toBe(201);
            const bookingJson = await bookingRes.json();
            const bookingRef = bookingJson.data.bookingRef;

            const poManager = new POManager(page);
            const loginPage = poManager.getLoginPage();
            await loginPage.goTo();
            await loginPage.validLogin(data.username, data.password);
            expect(await loginPage.browseEventsIsDisplayed()).toBeTruthy();

            const homePage = poManager.getHomePage();
            await homePage.goToMyBookings();

            const bookingPage = poManager.getMyBookingsPage();
            await bookingPage.viewEventDetails(bookingRef);

            const eventDetailPage = poManager.getEventDetailPage();
            await expect(eventDetailPage.getBookingInfoText()).toBeVisible();

            expect(await eventDetailPage.getBookingIdLetter()).toBe(await eventDetailPage.getEventNameLetter());

            await eventDetailPage.getRefundCheck();

            await expect(eventDetailPage.getRefundSpinner()).toBeVisible();
            await expect(eventDetailPage.getRefundSpinner()).not.toBeVisible({ timeout: 10000 });

            expect(await eventDetailPage.getRefundText()).toContain("Group bookings (5 tickets) are non-refundable");
        })
    })
}