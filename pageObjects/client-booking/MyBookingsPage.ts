import { Locator, Page } from "@playwright/test";

export class MyBookingsPage {
    page: Page;
    pageUrl: string;
    viewDetailsBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageUrl = "https://eventhub.rahulshettyacademy.com/bookings";
        this.viewDetailsBtn = page.getByRole("button", { name: "View Details" }).first();
    }

    getPageUrl() {
        return this.pageUrl;
    }

    async viewEventDetails() {
        await this.viewDetailsBtn.click();
    }
}