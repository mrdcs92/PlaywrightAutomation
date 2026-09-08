import { APIRequestContext } from "@playwright/test";
import { BookingClient } from "./BookingClient";
import { EventClient } from "./EventClient";
import { LoginClient } from "./LoginClient";

export class APIManager {

    apiContext: APIRequestContext;
    bookingClient: BookingClient;
    eventClient: EventClient;
    loginClient: LoginClient;

    constructor(apiContext: APIRequestContext) {

        this.apiContext = apiContext;
        this.bookingClient = new BookingClient(this.apiContext);
        this.eventClient = new EventClient(this.apiContext);
        this.loginClient = new LoginClient(this.apiContext);
    }

    getBookingClient() {
        return this.bookingClient;
    }

    getEventClient() {
        return this.eventClient;
    }

    getLoginClient() {
        return this.loginClient;
    }
}