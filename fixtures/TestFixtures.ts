import { test as base, expect } from '@playwright/test';

import { POManager as BookingPOManager }
    from '../pageObjects/client-booking/POManager';

import { POManager as OrdersPOManager }
    from '../pageObjects/client-orders/POManager';

import { APIManager } from '../api/APIManager';

type TestFixtures = {
    bookingPOManager: BookingPOManager;
    ordersPOManager: OrdersPOManager;
    apiManager: APIManager;
};

export const test = base.extend<TestFixtures>({

    bookingPOManager: async ({ page }, use) => {

        const bookingPOManager = new BookingPOManager(page);

        await use(bookingPOManager);
    },

    ordersPOManager: async ({ page }, use) => {

        const eventPOManager = new OrdersPOManager(page);

        await use(eventPOManager);
    },

    apiManager: async ({ request }, use) => {

        const apiManager = new APIManager(request);

        await use(apiManager);
    }

});

export { expect };