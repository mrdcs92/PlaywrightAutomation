import { Locator, Page } from "@playwright/test";

export class LoginPage {

    page: Page;
    loginButton: Locator;
    userEmail: Locator;
    userPass: Locator;
    browseEvents: Locator;

    constructor(page: Page) {

        this.page = page;
        this.loginButton = page.locator('#login-btn');
        this.userEmail = page.getByPlaceholder('you@email.com');
        this.userPass = page.getByLabel('Password');
        this.browseEvents = page.getByRole('link', { name: 'Browse Events →' });

    }

    async goTo() {
        await this.page.goto("https://eventhub.rahulshettyacademy.com");
    }

    async validLogin(username: string, password: string) {
        await this.userEmail.fill(username);
        await this.userPass.fill(password);
        await this.loginButton.click();

    }

    async browseEventsIsDisplayed(): Promise<boolean> {

        await this.browseEvents.waitFor();
        return await this.browseEvents.isVisible();
    }

}