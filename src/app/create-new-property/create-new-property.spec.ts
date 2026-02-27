import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewProperty } from './create-new-property';

describe('CreateNewProperty', () => {
  let component: CreateNewProperty;
  let fixture: ComponentFixture<CreateNewProperty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewProperty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewProperty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
