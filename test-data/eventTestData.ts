type EventData = {
    username: string;
    password: string;
    title: string;
    description: string;
    category: string;
    venue: string;
    city: string;
    eventDate: string;
    price: number;
    totalSeats: number;
    imageUrl: string
}

export const eventTestData: EventData[] = [
    {
        "username": "dylanplaywright1@gmail.com",
        "password": "Dylanplaywright1!",
        "title": "Burger Summit 2027",
        "description": "A prestigious event bringing burger enjoyers together.",
        "category": "Festival",
        "venue": "Anaheim Convention Center",
        "city": "Anaheim",
        "eventDate": getDateOneMonthAhead(),
        "price": 500,
        "totalSeats": 1000,
        "imageUrl": ""
    },
    {
        "username": "dylanplaywright2@gmail.com",
        "password": "Dylanplaywright2!",
        "title": "Hotdog Bananza 2027",
        "description": "A fierce hotdog-eating competition.",
        "category": "Sports",
        "venue": "San Diego Convention Center",
        "city": "San Diego",
        "eventDate": getDateOneMonthAhead(),
        "price": 600,
        "totalSeats": 2000,
        "imageUrl": ""
    }
]

export function getDateOneMonthAhead(): string {
    const date = new Date();

    date.setUTCMonth(date.getUTCMonth() + 1);

    return date.toISOString();
}