import { Locator, Page } from "@playwright/test";

export class LoginPage {

    page: Page;
    signInButton: Locator;
    userEmail: Locator;
    userPass: Locator;
    errorMessage: Locator;

    constructor(page: Page) {

        this.page = page;
        this.signInButton = page.locator("#login");
        this.userEmail = page.locator("#userEmail");
        this.userPass = page.locator("#userPassword");
        this.errorMessage = page.locator("[class*='flyInOut']");

    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username: string, password: string) {
        await this.userEmail.fill(username);
        await this.userPass.fill(password);
        await this.signInButton.click();

    }

    async getErrorMessage(): Promise<string> {
        await this.errorMessage.waitFor({state: 'visible', timeout: 10000 });
        return this.errorMessage.innerText();
    }

}