export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  type: 'vente' | 'location';
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  createdAt: Date;
  status: 'disponible' | 'vendu' | 'loué';
 
} 