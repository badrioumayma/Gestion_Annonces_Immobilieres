export interface Property {
  id: number;
  titre: string;
  description: string;
  prix: number;
  adresse: string;
  ville: string;
  pays: string;
  chambres: number;
  sallesDeBain: number;
  surface: number;
  type: 'MAISON' | 'APPARTEMENT' | 'VILLA' | 'TERRAIN' | 'COMMERCIAL' | 'BUREAU';
  statut: 'DISPONIBLE' | 'VENDU' | 'LOUE' | 'SOUS_CONTRAT' | 'EN_ATTENTE';
  images: string[];
  localisation: string;
  pieces: number;
  dateCreation: Date;
  dateModification: Date;
} 