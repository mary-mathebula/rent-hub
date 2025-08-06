import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { ListingService } from '../services/listing.service';
import { Listing } from '../shared/models/listing.models';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let listingServiceSpy: jasmine.SpyObj<ListingService>;

  const mockListings: Listing[] = [
  {
    id: 1,
    title: 'Test Apartment',
    description: 'Nice place',
    location: 'Cape Town',
    price: 1000,
    amenities: ['WiFi', 'Pool'],
    imageUrl: 'image.jpg',
    furnished: true,
    vegetarianPreferred: false,
    createdBy: 'testuser@example.com',
  }
];


  beforeEach(async () => {
    listingServiceSpy = jasmine.createSpyObj('ListingService', ['getListings']);
    listingServiceSpy.getListings.and.returnValue(mockListings);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: ListingService, useValue: listingServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load listings from service', () => {
    expect(component.listings.length).toBe(2);
    expect(listingServiceSpy.getListings).toHaveBeenCalled();
  });

  it('should render listing titles in template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.card-title')[0].textContent).toContain('Apt 1');
    expect(compiled.querySelectorAll('.card-title')[1].textContent).toContain('Apt 2');
  });
});
