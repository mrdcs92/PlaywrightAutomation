import { APIRequestContext, expect } from '@playwright/test';

export class LoginClient {

    request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async login(userName: string, password: string) {

        const loginPayload = {
            "email": userName,
            "password": password
        }
        return await this.request.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login", {
            data: loginPayload
        });

    }

    async getAuthToken(userName: string, password: string) {

        const loginPayload = {
            "email": userName,
            "password": password
        }
        
        const loginResponse = await this.request.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login", {
            data: loginPayload
        })
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();

        const token = loginResponseJson.token;
        return token;

    }

}