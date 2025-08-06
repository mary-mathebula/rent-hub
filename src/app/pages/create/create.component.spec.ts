import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CreateComponent],  // standalone component
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;

    // Mock logged in user in localStorage before ngOnInit()
    localStorage.setItem('loggedInUser', JSON.stringify({ email: 'testuser@example.com' }));

    fixture.detectChanges(); // triggers ngOnInit
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component and form', () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeTruthy();
  });

  it('should have empty form fields initially', () => {
    expect(component.form.get('title')?.value).toBe('');
    expect(component.form.get('description')?.value).toBe('');
    expect(component.form.get('price')?.value).toBe('');
    expect(component.form.get('location')?.value).toBe('');
    expect(component.selectedAmenities.length).toBe(0);
    expect(component.userEmail).toBe('testuser@example.com');
  });

  it('should invalidate the form if required fields are empty', () => {
    component.form.patchValue({
      title: '',
      description: '',
      price: '',
      location: ''
    });
    expect(component.form.valid).toBeFalse();
  });

  it('should validate the form if required fields are filled correctly', () => {
    component.form.patchValue({
      title: 'Nice Apartment',
      description: 'A very nice apartment description.',
      price: 1000,
      location: 'Pretoria'
    });
    expect(component.form.valid).toBeTrue();
  });

  it('should update selectedAmenities when amenities checkbox changes', () => {
    expect(component.selectedAmenities).toEqual([]);

    // Simulate checking an amenity
    component.onAmenityChange({ target: { checked: true, value: 'WiFi' } });
    expect(component.selectedAmenities).toContain('WiFi');

    // Simulate unchecking the amenity
    component.onAmenityChange({ target: { checked: false, value: 'WiFi' } });
    expect(component.selectedAmenities).not.toContain('WiFi');
  });

  it('should update imageBase64 when image is selected', (done) => {
    const dummyFile = new File(['dummy content'], 'photo.png', { type: 'image/png' });

    // Create fake FileReader with onload call
    spyOn(window as any, 'FileReader').and.returnValue({
      readAsDataURL: function () {
        this.onload({ target: { result: 'data:image/png;base64,dummybase64data' } });
      },
      onload: null
    });

    const event = { target: { files: [dummyFile] } };
    component.onImageSelected(event);

    // Wait a tick for FileReader onload to be called
    setTimeout(() => {
      expect(component.imageBase64).toContain('data:image/png;base64');
      done();
    }, 0);
  });

  it('should alert and not submit if userEmail is null', () => {
    spyOn(window, 'alert');
    component.userEmail = null;

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('You must be logged in to submit.');
  });

  it('should alert and not submit if form is invalid', () => {
    spyOn(window, 'alert');
    component.userEmail = 'testuser@example.com';
    component.form.patchValue({
      title: '',
      description: '',
      price: '',
      location: ''
    });

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Please fill out the form correctly.');
  });

  it('should save new listing to localStorage and navigate after successful submit', () => {
    spyOn(window, 'alert');
    component.userEmail = 'testuser@example.com';
    component.form.patchValue({
      title: 'Test Title',
      description: 'Test description with enough length',
      price: 1500,
      location: 'Johannesburg',
      furnished: true,
      vegetarianPreferred: false
    });

    component.selectedAmenities = ['WiFi', 'Parking'];
    component.imageBase64 = 'data:image/png;base64,imagedata';

    // Clear localStorage listings first
    localStorage.setItem('listings', JSON.stringify([]));

    component.onSubmit();

    const listings = JSON.parse(localStorage.getItem('listings') || '[]');

    expect(listings.length).toBe(1);
    expect(listings[0].title).toBe('Test Title');
    expect(listings[0].amenities).toEqual(['WiFi', 'Parking']);
    expect(listings[0].imageUrl).toBe('data:image/png;base64,imagedata');
    expect(window.alert).toHaveBeenCalledWith('Listing created successfully!');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
