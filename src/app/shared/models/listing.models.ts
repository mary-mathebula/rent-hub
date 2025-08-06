export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  furnished: boolean;
  vegetarianPreferred: boolean;
  amenities: string[]; // e.g. ['WiFi', 'Parking']
  imageUrl?: string;
  createdBy: string; // email of user
}


