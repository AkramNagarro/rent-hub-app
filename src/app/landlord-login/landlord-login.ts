import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LandlordAuth } from '../services/landlordauth';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landlord-login',
  imports: [ReactiveFormsModule],
  templateUrl: './landlord-login.html',
  styleUrl: './landlord-login.scss',
})

export class LandlordLogin {

  landlordLoginForm: FormGroup;
  submitted = false;
  authService = inject(LandlordAuth);
  router= inject(Router);

  constructor(private fb: FormBuilder) {
    this.landlordLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.landlordLoginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.landlordLoginForm.invalid) return;

    const { email, password } = this.landlordLoginForm.value;

    this.authService.login(email!, password!)
      .subscribe(users => {
        if (users.length > 0 && users[0].role === 'landlord') {
          this.authService.saveSession(users[0]);
          this.router.navigate(['home']);
        } else {
          alert('Invalid Credentials');
        }
      });
    }
  }