import { Locator, Page } from "@playwright/test";

export class HomePage {
    page: Page;
    eventCardBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.eventCardBtn = page.getByTestId("event-card").first().getByTestId("book-now-btn");
    }

    async goToEvent() {
        await this.eventCardBtn.waitFor();
        await this.eventCardBtn.click();
    }
}