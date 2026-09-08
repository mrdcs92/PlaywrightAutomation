import { APIRequestContext } from "@playwright/test";

const {test, expect, request} = require('@playwright/test');

export class ApiUtils {

    apiContext: APIRequestContext;
    userName: string;
    password: string;

    constructor(apiContext: APIRequestContext, userName: string, password: string) {
        this.apiContext = apiContext;
        this.userName = userName;
        this.password = password;
    }

    async getToken() {
        const loginPayload = {
            "email": this.userName,
            "password": this.password
        }

        const loginResponse = await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login", {
            data: loginPayload
        })
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();

        const token = loginResponseJson.token;
        return token;
    }

    async clearBookings() {
        let response: {token: string } = {
            token: await this.getToken()
        };

        const deleteResponse = await this.apiContext.delete("https://api.eventhub.rahulshettyacademy.com/api/bookings/", {
            headers: {
                'Authorization': `Bearer ${response.token}`,
                'Accept': 'application/json'
            }
        })
        expect(deleteResponse.ok()).toBeTruthy();
        const deleteResponseJson = await deleteResponse.json();
        const reqSuccess = deleteResponseJson.success;

        return reqSuccess;

    }
}