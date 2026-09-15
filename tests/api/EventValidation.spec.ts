//import { test, expect, request } from '@playwright/test';
//import { APIManager } from "../../api/APIManager";
import { test, expect } from "../../fixtures/TestFixtures";
import { eventTestData } from "../../test-data/eventTestData";

for (const data of eventTestData) {

    test.describe(`Event Creation Tests - ${data.title}`, {tag:['@api', '@regression']}, () => {

        test(`Successful Event Setup/Teardown`, async ({ apiManager }) => {
            const loginClient = apiManager.getLoginClient();
            const token = await loginClient.getAuthToken(data.username, data.password);

            const eventClient = apiManager.getEventClient();

            const eventResponse = await eventClient.createEvent(data.title, data.description, data.category, data.venue, data.city, data.eventDate, data.price, data.totalSeats, token);

            expect(eventResponse.status()).toBe(201);

            const resBody = await eventResponse.json();
            expect(resBody.message).toBe("Event created successfully");

            const eventId = resBody.data.id;

            const deleteResponse = await eventClient.deleteEvent(eventId, token);
            expect(deleteResponse.status()).toBe(200);

            const delBody = await deleteResponse.json();
            expect(delBody.message).toBe("Event deleted successfully");
        })

        test('Event Validation Error', {tag:['@errorValidation']}, async ({ apiManager }) => {
            const eventClient = apiManager.getEventClient();

            const eventResponse = await eventClient.createEvent(data.title, data.description, data.category, data.venue, data.city, data.eventDate, data.price, data.totalSeats, "blah");

            expect(eventResponse.status()).toBe(401);
            const resBody = await eventResponse.json();
            expect(resBody.error).toBe("Invalid or expired token");
        })

    })
}


