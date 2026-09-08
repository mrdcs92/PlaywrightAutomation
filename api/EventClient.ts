import { APIRequestContext, expect } from '@playwright/test';

export class EventClient {

    request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createEvent(title: string, description: string, category: string, venue: string, city: string, eventDate: Date, price: number, totalSeats: number, token: string, imageUrl?: string) {

        const eventPayLoad = {
            "title": title,
            "description": description,
            "category": category,
            "venue": venue,
            "city": city,
            "eventDate": eventDate,
            "price": price,
            "totalSeats": totalSeats,
            "imageUrl": imageUrl
        }

        return await this.request.post("https://api.eventhub.rahulshettyacademy.com/api/events", {
            data: eventPayLoad,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    async deleteEvent(eventId: number, token: string) {

        return await this.request.delete(`https://api.eventhub.rahulshettyacademy.com/api/events/${eventId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            }
        })
    }

    async getEvent(eventId: number, token: string) {

        return await this.request.get(`https://api.eventhub.rahulshettyacademy.com/api/events/${eventId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            }
        })
    }
}