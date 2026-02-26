import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LandlordAuth } from '../services/landlordauth';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  landlordAuth = inject(LandlordAuth);
  authService = inject(AuthService);
}
