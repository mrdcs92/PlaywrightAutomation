import { Locator, Page } from "@playwright/test";

export class HomePage {
    page: Page;
    eventCardBtn: Locator;
    navBookings: Locator;

    constructor(page: Page) {
        this.page = page;
        this.eventCardBtn = page.getByTestId("event-card").first().getByTestId("book-now-btn");
        this.navBookings = page.getByTestId("nav-bookings");
    }

    async goToEvent() {
        await this.eventCardBtn.waitFor();
        await this.eventCardBtn.click();
    }

    async goToMyBookings() {
        await this.navBookings.click();
    }
}