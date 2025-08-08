import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, BackButtonComponent ,ReactiveFormsModule],
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  availableAmenities = ['WiFi', 'Parking', 'Balcony', 'Laundry', 'Gym', 'Pet Friendly', 'Swimming Pool'];
  selectedAmenities: string[] = [];
  userEmail: string | null = null;
  imageBase64: string= '';

  constructor(private fb: FormBuilder, private router: Router) {
  this.form = this.fb.group({
    apartmentSelection: ['', Validators.required],
    propertyName: ['', Validators.required],
    isShared: ['', Validators.required],
    squareFootage: ['', [Validators.required, Validators.min(1)]],
    leaseType: ['', Validators.required],
    isNegotiable: [false],
    priceMode: ['', Validators.required],

    description: ['', [Validators.required, Validators.minLength(10)]],
    price: ['', [Validators.required, Validators.min(1)]],
    location: ['', Validators.required],
    furnished: [false],
    vegetarianPreferred: [false]
  });
}


  ngOnInit(): void {
    const userJson = localStorage.getItem('loggedInUser');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.userEmail = user.email || null;
      } catch (err) {
        console.error('Invalid user JSON:', err);
      }
    }

    if (!this.userEmail) {
      alert('You must be logged in to add a listing.');
      this.router.navigate(['/login']);
    }
  }

  onAmenityChange(event: any) {
    const amenity = event.target.value;
    if (event.target.checked) {
      if (!this.selectedAmenities.includes(amenity)) {
        this.selectedAmenities.push(amenity);
      }
    } else {
      this.selectedAmenities = this.selectedAmenities.filter(a => a !== amenity);
    }
  }

  onImageSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageBase64 = reader.result as string;
    };
    reader.readAsDataURL(file); // converts image to base64 string
  }
}
  onSubmit() {
    if (!this.userEmail) {
      alert('You must be logged in to submit.');
      return;
    }

    if (this.form.invalid) {
      alert('Please fill out the form correctly.');
      return;
    }

    const newListing = {
      id: Date.now().toString(), // make sure it's string
      ...this.form.value,
      amenities: this.selectedAmenities,
      createdBy: this.userEmail,
      createdAt: new Date().toISOString(),
      imageUrl: this.imageBase64,
    };

   const existingListings = JSON.parse(localStorage.getItem('listings') || '[]');
   existingListings.push(newListing);
   localStorage.setItem('listings', JSON.stringify(existingListings));


    console.log('New listing added:', newListing);
    console.log('All listings after save:', JSON.parse(localStorage.getItem('listings') || '[]'));

    alert('Listing created successfully!');
    this.router.navigate(['/']);
  }
}
