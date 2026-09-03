import { Locator, Page } from "@playwright/test";

export class EventDetailPage {
    page: Page;
    bookingInfo: Locator;
    bookingId: Locator;
    eventName: Locator;
    refundCheck: Locator;
    refundSpinner: Locator;
    refundText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bookingInfo = page.getByText("Booking Information");
        this.bookingId = page.locator("nav").nth(1).locator("span").nth(1);
        this.eventName = page.locator("h1");
        this.refundCheck = page.getByRole("button", { name: "Check eligibility for refund?" });
        this.refundSpinner = page.getByTestId("refund-spinner");
        this.refundText = page.locator("#refund-result");
    }

    async getBookingIdLetter() {
        const bookingIdText = await this.bookingId.textContent();
        const bookingIdLetter = (bookingIdText ?? "").split("-")[0].toLowerCase();
        return bookingIdLetter;
    }

    async getEventNameLetter() {
        const eventNameText = await this.eventName.textContent();
        const eventNameLetter = (eventNameText ?? "").split("")[0].toLowerCase();
        return eventNameLetter;
    }

    async getRefundCheck() {
        await this.refundCheck.click();
    }

    async getRefundText() {
        return await this.refundText.textContent();
    }


    getBookingInfoText() {
        return this.bookingInfo;
    }

    getRefundSpinner() {
        return this.refundSpinner;
    }
}
