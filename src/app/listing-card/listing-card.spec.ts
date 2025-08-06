import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListingCardComponent } from './listing-card.component';
import { ListingService } from '../services/listing.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { Listing } from '../shared/models/listing.models';

const testListings = [
  {
    id: 1,
    title: 'Test Listing',
    description: 'Test Description',
    price: 1000,
    location: 'Test Location',
    amenities: ['WiFi'],
    imageUrl: 'data:image/png;base64,...',
    furnished: true,
    vegetarianPreferred: false,
    createdBy: 'test@test.com'
  }
];

describe('ListingCardComponent', () => {
  let component: ListingCardComponent;
  let fixture: ComponentFixture<ListingCardComponent>;
  let listingServiceSpy: jasmine.SpyObj<ListingService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ListingService', ['getCommentsForListing', 'addComment']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule ,ListingCardComponent],
      providers: [{ provide: ListingService, useValue: spy }]
    }).compileComponents();

    listingServiceSpy = TestBed.inject(ListingService) as jasmine.SpyObj<ListingService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingCardComponent);
    component = fixture.componentInstance;

    // Assign a single listing object (not an array)
    component.listing = testListings[0];

    listingServiceSpy.getCommentsForListing.and.returnValue([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load comments on init', () => {
    expect(listingServiceSpy.getCommentsForListing).toHaveBeenCalledWith(testListings[0].id.toString());
  });

  it('should add a comment', () => {
    component.newComment = 'Nice place!';
    spyOn(listingServiceSpy, 'addComment');
    component.addComment();
    expect(listingServiceSpy.addComment).toHaveBeenCalled();
    expect(component.newComment).toBe('');
  });
});
