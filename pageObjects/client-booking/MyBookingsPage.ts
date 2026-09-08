import { Locator, Page } from "@playwright/test";

export class MyBookingsPage {
    page: Page;
    pageUrl: string;
    clearAllBookings: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageUrl = "https://eventhub.rahulshettyacademy.com/bookings";
        this.clearAllBookings = page.getByRole("button", {name: "Clear All bookings"});
    }

    getPageUrl() {
        return this.pageUrl;
    }

    async viewEventDetails(bookingId: string) {
        const bookingCard = this.page.getByTestId("booking-card")
        .filter({
            has: this.page
            .locator(".booking-ref")
            .filter({
                hasText: bookingId
            })
        });
        await bookingCard.getByRole("button", { name: "View Details" }).click();
    }

    async clearBookings() {
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        })
        await this.clearAllBookings.click();
    }
}