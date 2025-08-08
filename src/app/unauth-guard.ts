import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const unauthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userEmail = localStorage.getItem('userEmail');

  if (!userEmail) {
    return true;
  }

  router.navigate(['/home']);
  return false;
};
