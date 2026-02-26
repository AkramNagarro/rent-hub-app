import { TestBed } from '@angular/core/testing';

import { LandlordAuth } from './landlordauth';

describe('LandlordAuth', () => {
  let service: LandlordAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandlordAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
