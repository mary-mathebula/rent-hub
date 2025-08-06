import { Injectable } from '@angular/core';
import { Listing } from '../shared/models/listing.models'; 
import { Comment } from '../shared/models/comment'; 

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  private LISTINGS_KEY = 'listings';
  private COMMENTS_KEY = 'comments';

  getListings(): Listing[] {
    const listingsJson = localStorage.getItem(this.LISTINGS_KEY);
    return listingsJson ? JSON.parse(listingsJson) : [];
  }

  saveListings(listings: Listing[]) {
    localStorage.setItem(this.LISTINGS_KEY, JSON.stringify(listings)); // ✅ fixed
  }

  addListing(listing: Listing): void {
    const listings = this.getListings();
    listings.push(listing);
    this.saveListings(listings);
    localStorage.setItem('listings', JSON.stringify(listings));
  }

  getComments(): Comment[] {
    return JSON.parse(localStorage.getItem(this.COMMENTS_KEY) || '[]');
  }

  saveComments(comment: Comment[]) {
    localStorage.setItem(this.COMMENTS_KEY, JSON.stringify(comment));
  }

  getCommentsForListing(listingId: string): Comment[] {
    return this.getComments().filter(c => c.listingId === listingId);
  }

  addComment(comment: Comment) {
    const comments = this.getComments();
    comments.push(comment);
    this.saveComments(comments);
  }

  getFavorites(userEmail: string): string[] {
    return JSON.parse(localStorage.getItem('favorites_' + userEmail) || '[]');
  }

  saveFavorites(userEmail: string, favorites: string[]) {
    localStorage.setItem('favorites_' + userEmail, JSON.stringify(favorites));
  }

  toggleFavorite(userEmail: string, listingId: string): boolean {
    const favorites = this.getFavorites(userEmail);
    const index = favorites.indexOf(listingId);
    if (index >= 0) {
      favorites.splice(index, 1);
      this.saveFavorites(userEmail, favorites);
      return false;
    } else {
      favorites.push(listingId);
      this.saveFavorites(userEmail, favorites);
      return true;
    }
  }

  isFavorited(userEmail: string, listingId: string): boolean {
    return this.getFavorites(userEmail).includes(listingId);
  }
}
