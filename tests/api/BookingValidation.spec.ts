import { test, expect, request } from '@playwright/test';
import { APIManager } from "../../api/APIManager";
import { bookingTestData } from "../../test-data/bookingTestData";

for (const data of bookingTestData) {

    test.describe(`Booking Creation Tests - ${data.customerName}`, {tag:['@api', '@regression']}, () => {

        test.beforeAll(async ({ }) => {
            const apiContext = await request.newContext();
            const apiManager = new APIManager(apiContext);
            const loginClient = apiManager.getLoginClient();
            const authToken = await loginClient.getAuthToken(data.username, data.password);

            const bookingClient = apiManager.getBookingClient();
            const bookingRes = await bookingClient.deleteAllBookings(authToken);
            expect(bookingRes.status()).toBe(200);
        });

        test('Successful Booking Test', async ({ request }) => {
            const apiManager = new APIManager(request);
            const loginClient = apiManager.getLoginClient();
            const token = await loginClient.getAuthToken(data.username, data.password);

            const bookingClient = apiManager.getBookingClient();
            const bookingRes = await bookingClient.createBooking(data.eventId, data.customerName, data.customerEmail, data.customerPhone, data.quantity, token);
            expect(bookingRes.status()).toBe(201);

            const bookBody = await bookingRes.json();
            expect(bookBody.message).toBe("Booking confirmed!");
        })

        test('Invalid Booking Test', {tag:['@errorValidation']}, async ({ request }) => {
            const apiManager = new APIManager(request);
            const loginClient = apiManager.getLoginClient();
            const token = await loginClient.getAuthToken(data.username, data.password);

            const bookingClient = apiManager.getBookingClient();
            const bookingRes = await bookingClient.createBooking(data.eventId, data.customerName, data.customerEmail, data.customerPhone, 15, token);
            expect(bookingRes.status()).toBe(400);

            const bookBody = await bookingRes.json();
            expect(bookBody.details[0].message).toBe("Quantity must be an integer between 1 and 10");
        })
    })
}
