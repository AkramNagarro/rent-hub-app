import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Apartment } from '../services/apartment.model';
import { ApartmentService } from '../services/apartment';
import { LandlordAuth } from '../services/landlordauth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  selectedRentRange: string = '';
  citySearch: string = '';
  streetSearch: string = '';
  selectedAmenities: string[] = [];

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

  allApartments: any[] = [];
  filteredApartments: any[] = [];

  private svc = inject(ApartmentService);
  landlordAuth = inject(LandlordAuth);
  router = inject(Router);

  private apartmentsSubject = new BehaviorSubject<Apartment[]>([]);
  apartments$ = this.apartmentsSubject.asObservable();

  currentIndex = 0;

  ngOnInit() {
    this.svc.getAll().subscribe(data => {
      this.apartmentsSubject.next(data);
      this.allApartments = data;
      this.filteredApartments = data;
    });
  }

  toggleFavorite(a: Apartment) {

    const newValue = !a.favorite;

    this.allApartments = this.allApartments.map(x =>
      x.id === a.id ? { ...x, favorite: newValue } : x
    );

    this.filteredApartments = this.filteredApartments.map(x =>
      x.id === a.id ? { ...x, favorite: newValue } : x
    );

    this.apartmentsSubject.next(this.allApartments);

    this.svc.updateFavorite(a.id, newValue).subscribe({
      error: () => {
        this.allApartments = this.allApartments.map(x =>
          x.id === a.id ? { ...x, favorite: !newValue } : x
        );

        this.filteredApartments = this.filteredApartments.map(x =>
          x.id === a.id ? { ...x, favorite: !newValue } : x
        );

        this.apartmentsSubject.next(this.allApartments);
      }
    });
  }

  viewDetails(a: Apartment) {
    this.router.navigate(['apartment', a.id]);
  }

  trackById(index: number, item: Apartment) {
    return item.id;
  }

  get featuredList(): Apartment[] {
    return this.apartmentsSubject.value.filter(a => a.featured === true);
  }

  next() {
    if (!this.featuredList.length) return;

    this.currentIndex =
      (this.currentIndex + 1) % this.featuredList.length;
  }

  prev() {
    if (!this.featuredList.length) return;

    this.currentIndex =
      (this.currentIndex - 1 + this.featuredList.length)
      % this.featuredList.length;
  }

  applyFilters() {
    this.filteredApartments = this.allApartments.filter(apartment => {

      // Rent Filter
      if (this.selectedRentRange) {
        const [min, max] = this.selectedRentRange.split('-').map(Number);
        if (apartment.rent < min || apartment.rent > max) {
          return false;
        }
      }

      // City Filter
      if (this.citySearch &&
          !apartment.city?.toLowerCase().includes(this.citySearch.toLowerCase())) {
        return false;
      }

      // Street Filter
      if (this.streetSearch &&
          !apartment.streetAddress?.toLowerCase().includes(this.streetSearch.toLowerCase())) {
        return false;
      }

      // Amenities Filter
      if (this.selectedAmenities.length > 0) {
        const hasAllAmenities = this.selectedAmenities.every(a =>
          apartment.amenities?.includes(a)
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });

  }

  onAmenityFilterChange(event: any) {
    if (event.target.checked) {
      this.selectedAmenities.push(event.target.value);
    } else {
      this.selectedAmenities =
        this.selectedAmenities.filter(a => a !== event.target.value);
    }

    this.applyFilters();
  }
}
