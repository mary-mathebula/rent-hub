import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingCardComponent } from '../listing-card/listing-card.component';
import { BackButtonComponent } from '../shared/back-button/back-button.component';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule,BackButtonComponent ,ListingCardComponent],
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  favouriteListings: any[] = [];

  ngOnInit() {
    this.loadFavouriteListings();
  }

  loadFavouriteListings() {
    const stored = localStorage.getItem('favourites');
    this.favouriteListings = stored ? JSON.parse(stored) : [];
  }
}
