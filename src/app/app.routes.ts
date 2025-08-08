import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateComponent } from './pages/create/create.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { unauthGuard } from './unauth-guard';
import { authGuard } from './auth-guard';
import { ListingDetailsComponent } from './listing-details/listing-details.component';



export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent), canActivate:[unauthGuard]},
  { path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent), canActivate:[unauthGuard] },
  { path: 'create', loadComponent: () => import('./pages/create/create.component').then(m => m.CreateComponent), canActivate:[authGuard]},
  { path: 'favourites', loadComponent: () => import('./favourites/favourites.component').then(m => m.FavouritesComponent), canActivate:[authGuard] },
  {path: 'listing/:id', loadComponent:() => import ('./listing-details/listing-details.component').then(m => m.ListingDetailsComponent)},
];
