import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentView } from './apartment-view';

describe('ApartmentView', () => {
  let component: ApartmentView;
  let fixture: ComponentFixture<ApartmentView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApartmentView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
