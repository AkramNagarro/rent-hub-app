import { Component } from '@angular/core';
import { FormBuilder, FormGroup,  Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { inject } from '@angular/core';
import { LandlordAuth } from '../services/landlordauth';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.html'
})
export class Registration {

  registerForm: FormGroup;
  authService = inject(AuthService);
  router= inject(Router);
  landlordAuth = inject(LandlordAuth);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['renter', Validators.required] 
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    if (this.registerForm.value.role === 'renter') {
      this.authService.register(this.registerForm.value)
        .subscribe(() => {
          alert('Registration Successful');
          this.router.navigate(['/login']);
        });
    }
    if (this.registerForm.value.role === 'landlord') {
      this.landlordAuth.register(this.registerForm.value)
        .subscribe(() => {
          alert('Registration Successful');
          this.router.navigate(['/login']);
        });
    }
  }
}