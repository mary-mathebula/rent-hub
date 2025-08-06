import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateComponent } from './pages/create/create.component';
import { FavouritesComponent } from './favourites/favourites.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'create', loadComponent: () => import('./pages/create/create.component').then(m => m.CreateComponent) },
  { path: 'favourites', loadComponent: () => import('./favourites/favourites.component').then(m => m.FavouritesComponent) },

];
