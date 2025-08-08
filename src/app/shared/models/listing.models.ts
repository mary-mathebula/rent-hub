export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  furnished: boolean;
  vegetarianPreferred: boolean;
  amenities: string[];
  imageUrl?: string;
  createdBy: string; // email of user

  // New fields to add:
  apartmentSelection?: string;
  propertyName?: string;
  isShared?: string;           // could be 'yes' or 'no'
  squareFootage?: number;
  leaseType?: string;          // e.g. 'long', 'short', 'both'
  isNegotiable?: boolean;
}




