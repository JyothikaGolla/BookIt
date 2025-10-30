export interface Experience {
    _id: string;
    title: string;
    slug: string;
    short: string;
    price: number;
    duration: string;
    image: string;
    description: string;
    category: string;
    location: string;
    slots: Slot[];
}

export interface Slot {
    id: string;
    date: string;
    time: string;
    capacity: number;
    available: boolean;
}

export interface BookingData {
    experience: Experience;
    slot: Slot;
}

export interface PromoResponse {
    valid: boolean;
    discountType?: 'percent' | 'flat';
    amount?: number;
}

export interface BookingResponse {
    success: boolean;
    booking?: {
        confirmationId: string;
        experienceId: string;
        slotId: string;
        user: {
            name: string;
            email: string;
            phone: string;
        };
        createdAt: string;
    };
    error?: string;
}