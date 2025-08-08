// src/app/listing-details/listing-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Listing } from '../shared/models/listing.models';
import { BackButtonComponent } from '../shared/back-button/back-button.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [ CommonModule,RouterModule, BackButtonComponent],
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {
  listing: Listing | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const listingId = this.route.snapshot.paramMap.get('id');
    if (listingId) {
      const listings: Listing[] = JSON.parse(localStorage.getItem('listings') || '[]');
      this.listing = listings.find(l => String(l.id) === (listingId)) || null;
    }

    if (!this.listing) {
      alert('Listing not found!');
      this.router.navigate(['/home']);
    }
  }
}
