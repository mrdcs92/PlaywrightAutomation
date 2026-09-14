type BookingData = {
    username: string;
    password: string;
    eventId: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    quantity: number;
}

export const bookingTestData: BookingData[] = [
    {
        "username": "dylanplaywright1@gmail.com",
        "password": "Dylanplaywright1!", 
        "eventId": 285,
        "customerName": "Bob Bobbert",
        "customerEmail": "bob1@gmail.com",
        "customerPhone": "1234567890",
        "quantity": 2
    },
    {
        "username": "dylanplaywright2@gmail.com",
        "password": "Dylanplaywright2!",
        "eventId": 283,
        "customerName": "Bill Bibbity",
        "customerEmail": "bill2@gmail.com",
        "customerPhone": "1234567890",
        "quantity": 1
    }
]