export interface Booking {
    id?: number;
    propertyId: number;
    userId: number;
    date: Date;
    time: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    type: 'viewing' | 'visit' | 'meeting';
    notes?: string;
    createdAt?: Date;
    
  }