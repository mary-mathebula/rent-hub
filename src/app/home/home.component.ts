
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { ListingService } from '../shared/services/listing';
import { Listing } from '../shared/models/listing.models';
import { Comment } from '../shared/models/comment';
import { Location } from '@angular/common';
import { BackButtonComponent } from '../shared/back-button/back-button.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BackButtonComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  logoutMessage: string = '';
  listings: Listing[] = [];
  commentForms : {[key: number]: FormGroup} ={};
  userEmail: string | null = null;
  showWelcomeMessage: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private listingService: ListingService
  ) {}

  ngOnInit(): void {
    // Read logged-in user from localStorage
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.userEmail = user.email || null;

    // Show welcome message if user is logged in
    this.showWelcomeMessage = this.isLoggedIn();
    this.loadListings();
    

  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInUser');
  }
  
  goBack() {
  if (window.history.length > 1) {
    this.location.back();
  } else {
    this.router.navigate(['/home']);  // fallback route
  }
}

  logout(): void {
    this.authService.logout();
    this.userEmail = null;
    this.logoutMessage = 'Successfully logged out. Redirecting to home...';

    setTimeout(() => {
      this.logoutMessage = '';
      this.router.navigate(['/home']);
      this.showWelcomeMessage = false;
    }, 2000);
  }

  toggleFavourite(listing: any): void {
    const currentFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');

    const index = currentFavourites.findIndex((fav: any) => fav.id === listing.id);

    if (index !== -1) {
      currentFavourites.splice(index, 1);
    } else {
      currentFavourites.push(listing);
    }

    localStorage.setItem('favourites', JSON.stringify(currentFavourites));
  }

  isFavourite(listing: any): boolean {
    const currentFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    return currentFavourites.some((fav: any) => fav.id === listing.id);
  }

  goToFavorites() {
  this.router.navigate(['/favourites']);
  }

  loadListings(): void {
    this.listings = this.listingService.getListings();
    console.log('Listings loaded in HomeComponent: ', this.listings);
    if (this.listings.length === 0) {
      console.warn('No listings found in localStorage. Ensure listings are saved under the correct key.');
    }
  }
}