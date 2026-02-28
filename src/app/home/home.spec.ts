import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { ApartmentService } from '../services/apartment';
import { LandlordAuth } from '../services/landlordauth';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

describe('Home Component', () => {

  let component: Home;
  let fixture: ComponentFixture<Home>;
  let mockService: any;
  let mockAuth: any;

  const mockApartments = [
    {
      id: 1,
      apartmentName: 'Green Valley Homes',
      customerName: 'Neha Jain',
      streetAddress: 'Sector 62',
      city: 'Noida',
      areaSqFt: 1800,
      rent: 32000,
      stayType: 'LongTerm',
      priceMode: 'Per Month',
      isFurnished: false,
      title: '3BHK Premium Apartment',
      description: 'Spacious apartment',
      featured: true,
      favorite: true,
      amenities: ['Gym'],
      isSharedProperty: false
    }
  ];

  beforeEach(async () => {

    mockService = {
      getAll: vi.fn().mockReturnValue(of(mockApartments)),
      updateFavorite: vi.fn().mockReturnValue(of({}))
    };

    mockAuth = {
      isLandlord: vi.fn().mockReturnValue(true)
    };

    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: vi.fn()
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ApartmentService, useValue: mockService },
        { provide: LandlordAuth, useValue: mockAuth }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load apartments on init', () => {
    expect(component.allApartments.length).toBe(1);
  });

  it('should filter featured apartments', () => {
    expect(component.featuredList.length).toBe(1);
  });

  it('should toggle favorite correctly', () => {
    component.toggleFavorite(component.allApartments[0]);

    expect(mockService.updateFavorite)
      .toHaveBeenCalledWith(1, false);
  });

  it('should navigate on viewDetails()', () => {

    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate');

    component.viewDetails(component.allApartments[0]);

    expect(navigateSpy)
      .toHaveBeenCalledWith(['apartment', 1]);

  });

  it('should filter by city correctly', () => {
    component.citySearch = 'noida';
    component.applyFilters();
    expect(component.filteredApartments.length).toBe(1);
  });

  it('should filter by apartment name correctly', () => {
    component.nameSearch = 'green valley homes';
    component.applyFilters();
    expect(component.filteredApartments.length).toBe(1);
  });

});