import { Routes } from '@angular/router';
import { Login } from './login/login';
import { authGuard } from './auth-guard';
import { LandlordLogin } from './landlord-login/landlord-login';
import { ApartmentView } from './apartment-view/apartment-view';
import { Home } from './home/home';

export const routes: Routes = [
  
  { path: 'login', component: Login },
  { path: 'landlord/login', component: LandlordLogin },

  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./home/home').then(m => m.Home),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./registration/registration').then(m => m.Registration)
  },

  {
    path: 'add-property',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./create-new-property/create-new-property')
        .then(m => m.CreateNewProperty)
  },

  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/profile/profile').then(m => m.Profile)
  },

  {
    path: 'apartment/:id',
    canActivate: [authGuard],
    component: ApartmentView
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', redirectTo: 'login' }
];