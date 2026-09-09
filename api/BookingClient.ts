import { APIRequestContext, expect } from '@playwright/test';

export class BookingClient {

    request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createBooking(eventId: number, customerName: string, customerEmail: string, customerPhone: string, quantity: number, token: string) {

        const bookingPayload = {
            "eventId": eventId,
            "customerName": customerName,
            "customerEmail": customerEmail,
            "customerPhone": customerPhone,
            "quantity": quantity
        }

        return await this.request.post("https://api.eventhub.rahulshettyacademy.com/api/bookings", {
            data: bookingPayload,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    async getBookingByRef(bookingRef: string, token: string) {

        return await this.request.get(`https://api.eventhub.rahulshettyacademy.com/api/bookings/ref/${bookingRef}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
    }

    async deleteBooking(bookingId: number, token: string) {
        
        return await this.request.delete(`https://api.eventhub.rahulshettyacademy.com/api/bookings/${bookingId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
    }

        async deleteAllBookings(token: string) {
        
        return await this.request.delete(`https://api.eventhub.rahulshettyacademy.com/api/bookings/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
    }

}