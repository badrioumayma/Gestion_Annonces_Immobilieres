export interface Property {
  id: number;
}

export interface VisiteRequest {
  id: number;
  propertyId: number;
  propertyTitle: string;
  nom: string;
  email: string;
  telephone: string;
  dateSouhaitee: string;
  message: string;
  status: string;
  createdAt: string;
} 