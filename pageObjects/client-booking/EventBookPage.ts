import { Locator, Page } from "@playwright/test";

export class EventBookPage {
    page: Page;
    fullName: Locator;
    email: Locator;
    phoneNumber: Locator;
    confirmBtn: Locator;
    myBookings: Locator;
    ticketCount: Locator;
    bookingRef: Locator;
    bookingRefText: string;

    constructor(page: Page) {
        this.page = page;
        this.fullName = page.getByLabel("Full Name");
        this.email = page.getByLabel("Email");
        this.phoneNumber = page.getByLabel("Phone Number");
        this.confirmBtn = page.locator(".confirm-booking-btn");
        this.myBookings = page.getByRole('button', { name: 'View My Bookings' });
        this.ticketCount = page.getByRole("button", {name: "+"});
        this.bookingRef = page.locator(".booking-ref");
        this.bookingRefText = "";
    }

    async fillForm(email: string, clickCount?: number) {

        await this.fullName.waitFor({state: 'visible'});
        await this.email.waitFor({state: 'visible'});
        await this.phoneNumber.waitFor({state: 'visible'});
        
        await this.fullName.fill("John Doe");
        await this.email.fill(email);
        await this.phoneNumber.fill("1234567890");
        
        if (clickCount !== undefined) {
            for (let i = 0; i < clickCount; i++) {
                await this.ticketCount.click();
            }
        }

        await this.confirmBtn.isVisible();
        await this.confirmBtn.click();
    }

    async goToMyBookings() {
        this.bookingRefText = (await this.bookingRef.textContent()) ?? "";
        await this.myBookings.click();
    }
    
    getBookingRef() {
        return this.bookingRefText;
    }


}