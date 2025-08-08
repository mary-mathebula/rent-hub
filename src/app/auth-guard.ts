import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userEmail = localStorage.getItem('userEmail');

  if (userEmail) {
    return true;
  }
  console.log('Checking authGuard. userEmail:', userEmail);


  router.navigate(['/login']);
  return false;
};
