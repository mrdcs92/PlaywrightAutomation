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
        "username": "misterdcs92@gmail.com",
        "password": "1999222dst!taN1999222", 
        "eventId": 1,
        "customerName": "Bob Bobbert",
        "customerEmail": "bob1@gmail.com",
        "customerPhone": "1234567890",
        "quantity": 2
    },
    {
        "username": "misterdcs1992@gmail.com",
        "password": "1999222dst!taN1999222",
        "eventId": 2,
        "customerName": "Bill Bibbity",
        "customerEmail": "bill2@gmail.com",
        "customerPhone": "1234567890",
        "quantity": 1
    }
]