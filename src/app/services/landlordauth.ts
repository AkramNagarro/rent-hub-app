import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegistrationData } from './registration.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LandlordAuth {

  private apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any) {
    return this.http.post(this.apiUrl, user);
  }

  login(email: string, password: string) {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`);
  }

  saveSession(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/landlord/login']);
  }

  isLandlord() : boolean {
    const user = localStorage.getItem('user');
    const registerData: RegistrationData | null = user ? JSON.parse(user) : null;
    return registerData?.role === 'landlord'
  }
}