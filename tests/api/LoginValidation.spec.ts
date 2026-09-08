import { test, expect, request } from '@playwright/test';
import { APIManager } from "../../api/APIManager";
import { placeOrderTestData } from '../../test-data/placeOrderTestData';

for (const data of placeOrderTestData) {

    test.describe(`Login Validation Tests - ${data.username}`, () => {

        test('Positive Login Test', async ({ request }) => {
            const apiManager = new APIManager(request);

            const loginClient = apiManager.getLoginClient();
            const loginResponse = await loginClient.login(data.username, data.password);

            expect(loginResponse.status()).toBe(200);
        })

        test('Invalid Credentials Test', async ({ request }) => {
            const apiManager = new APIManager(request);

            const loginClient = apiManager.getLoginClient();
            const loginResponse = await loginClient.login(data.username, "banana");

            expect(loginResponse.status()).toBe(400);

            const resBody = await loginResponse.json();
            expect(resBody.error).toBe("Invalid email or password");
        })

    })

}

test('Empty Credentials Test', async ({ request }) => {
    const apiManager = new APIManager(request);

    const loginClient = apiManager.getLoginClient();
    const loginResponse = await loginClient.login("", "");

    expect(loginResponse.status()).toBe(400);
    const resBody = await loginResponse.json();

    expect(resBody.error).toBe("Validation failed");
    expect(resBody.details[0].message).toBe("A valid email is required");
    expect(resBody.details[1].message).toBe("Password must be at least 6 characters");

})