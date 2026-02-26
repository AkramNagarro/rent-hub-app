import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordLogin } from './landlord-login';

describe('LandlordLogin', () => {
  let component: LandlordLogin;
  let fixture: ComponentFixture<LandlordLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandlordLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandlordLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
