import { test, expect } from '@playwright/test';
import { APIManager } from "../../api/APIManager";
import { bookingTestData } from "../../test-data/bookingTestData";
import { DatabaseUtils } from '../../utils/DatabaseUtils';
import mysql, { RowDataPacket } from 'mysql2/promise';


interface EventRecord extends RowDataPacket {
    eventid: number,
    title: string,
    category: string,
    totalSeats: number
}

for (const testData of bookingTestData) {

    test.describe(`SQL Record Event Validation - ${testData.customerName}`, { tag: ['@database'] }, () => {

        test(`Validate SQL Records`, async ({ request }) => {

            const apiManager = new APIManager(request);
            const loginClient = apiManager.getLoginClient();
            const token = await loginClient.getAuthToken(testData.username, testData.password);

            const eventClient = apiManager.getEventClient();
            const eventResponse = await eventClient.getAllEvents(token);
            const eventJson = await eventResponse.json();

            const rows = await DatabaseUtils.query<EventRecord[]>("SELECT * FROM eventinfo");
            expect(rows).toHaveLength(3);

            for (const row of rows) {

                const matchingEvent = eventJson.data.find(
                    (event: { id: number }) => event.id === row.eventid
                );

                expect(matchingEvent).toBeDefined();

                expect(matchingEvent.title).toBe(row.title);
                expect(matchingEvent.category).toBe(row.category);
                expect(matchingEvent.totalSeats).toBe(row.totalSeats);
            }

        })

    })

}

test.afterAll(async () => {
    await DatabaseUtils.closePool();
});