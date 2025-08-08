import { Injectable } from '@angular/core';
import { Listing } from '../../shared/models/listing.models';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private storageKey = 'listings';
  private listings: Listing[] =[];
  

  getAll(): Listing[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  add(listing: Listing): void {
    const listings = this.getAll();
    listing.id = new Date().getTime(); // Simple unique ID
    listings.push(listing);
    localStorage.setItem(this.storageKey, JSON.stringify(listings));
  }

  getById(id: number): Listing | undefined {
    return this.getAll().find(l => l.id === id);
  }

  update(updatedListing: Listing): void {
    const listings = this.getAll().map(listing =>
      listing.id === updatedListing.id ? updatedListing : listing
    );
    localStorage.setItem(this.storageKey, JSON.stringify(listings));
  }
  
  getListings(): Listing[] {
  return this.getAll();
}


}
