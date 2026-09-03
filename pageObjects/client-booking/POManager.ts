import { LoginPage } from "./LoginPage";
import {HomePage } from "./HomePage";
import {EventBookPage} from "./EventBookPage";
import {MyBookingsPage} from "./MyBookingsPage";
import {EventDetailPage} from "./EventDetailPage";

import { Page } from "@playwright/test";

export class POManager {

    page: Page;
    loginPage: LoginPage;
    homePage: HomePage;
    eventBookPage: EventBookPage;
    myBookingsPage: MyBookingsPage;
    eventDetailPage: EventDetailPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.homePage = new HomePage(this.page);
        this.eventBookPage = new EventBookPage(this.page);
        this.myBookingsPage = new MyBookingsPage(this.page);
        this.eventDetailPage = new EventDetailPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getHomePage() {
        return this.homePage;
    }

    getEventBookPage() {
        return this.eventBookPage;
    }

    getMyBookingsPage() {
        return this.myBookingsPage;
    }

    getEventDetailPage() {
        return this.eventDetailPage;
    }

}