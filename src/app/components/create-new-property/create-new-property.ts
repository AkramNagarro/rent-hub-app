import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-create-new-property',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-new-property.html',
  styleUrls: ['./create-new-property.scss']
})


export class CreateNewProperty {

  amenitiesList = [
    'Gym/Fitness Center',
    'Swimming Pool',
    'Car Park',
    'Visitors Parking',
    'Power Backup',
    'Garbage Disposal',
    'Private Lawn',
    'Water Heater',
    'Security System',
    'Laundry Service',
    'Elevator',
    'Club House'
  ];
  apartmentForm : FormGroup;
  router= inject(Router);

  constructor(private fb: FormBuilder, private http: HttpClient) {

  this.apartmentForm = this.fb.group({
    apartmentName: ['', Validators.required],
    customerName: ['', Validators.required],

    isSharedProperty: [false],
    featured: [false],

    streetAddress: ['', Validators.required],
    city: ['', Validators.required],

    areaSqFt: [null, [Validators.required, Validators.min(1)]],
    rent: [null, [Validators.required, Validators.min(1)]],

    photos: [[]],
    stayType: ['', Validators.required],
    priceMode: ['', Validators.required],

    isFurnished: [false],
    
    title: [''],
    description: [''],
    amenities: [[]]
  });
}

  c(name: string) {
    return this.apartmentForm.get(name);
  }

  submit() {
    if (this.apartmentForm.invalid) {
      this.apartmentForm.markAllAsTouched();
      return;
    }

    this.http.post('http://localhost:3000/apartments', this.apartmentForm.value)
      .subscribe(() => {
        alert('Property Added');
        this.router.navigate(['/home']);
      });
  }

  onAmenityChange(event: any) {
    const selectedAmenities = this.apartmentForm.value.amenities || [];

    if (event.target.checked) {
      selectedAmenities.push(event.target.value);
    } else {
      const index = selectedAmenities.indexOf(event.target.value);
      if (index > -1) {
        selectedAmenities.splice(index, 1);
      }
    }

    this.apartmentForm.patchValue({
      amenities: selectedAmenities
    });
  }

  onPhotosSelected(event: any) {
    const files = Array.from(event.target.files);
    this.apartmentForm.patchValue({
      photos: files
    });
  }
  getPreview(file: File): string {
    return window.URL.createObjectURL(file);
  }

}
