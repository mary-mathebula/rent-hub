import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Listing } from '../shared/models/listing.models';          
import { Comment } from '../shared/models/comment';          
import { ListingService } from '../services/listing.service';        

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css']
})
export class ListingCardComponent implements OnInit {
  @Input() listing!: Listing;

  comments: Comment[] = [];
  newComment = '';
  userEmail = '';
  isFavorite = false;
  showGoToFavourites = false;


  constructor(private listingService: ListingService) {}

  ngOnInit() {
  this.userEmail = localStorage.getItem('loggedInUser') || '';
  // const userEmail = localStorage.getItem('currentUserEmail');
  const favKey = `favourites_${this.userEmail}`;
  const favouriteIds = JSON.parse(localStorage.getItem(favKey) || '[]');
  this.isFavorite = favouriteIds.includes(this.listing.id);
  this.loadComments();
}

  

  loadComments() {
    this.comments = this.listingService.getCommentsForListing(this.listing.id.toString());
  }

  addComment() {
    if (!this.newComment.trim()) return;

     const loggedInUser = localStorage.getItem('loggedInUser');
     const userEmail = loggedInUser ? JSON.parse(loggedInUser).email : '';

    const comment: Comment = {
      id: Date.now(),
      listingId: this.listing.id.toString(), // ✅ Ensure ID is string
      userEmail: userEmail,
      content: this.newComment.trim(),
      timestamp: new Date().toISOString() // ✅ Epoch timestamp; good for sorting or formatting
    };

    this.listingService.addComment(comment);
    this.newComment = '';
    this.loadComments();
  }
  

  toggleFavorite() {
  const favorites = JSON.parse(localStorage.getItem('favourites') || '[]');
  const index = favorites.findIndex((fav: any) => fav.id === this.listing.id);

  if (index === -1) {
    favorites.push(this.listing);
  } else {
    favorites.splice(index, 1);
  }

  localStorage.setItem('favourites', JSON.stringify(favorites));
  this.isFavorite = !this.isFavorite;
}

}
