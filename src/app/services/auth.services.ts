import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';  // Import Router

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:57542/api'; // Replace with your backend URL

  constructor(private http: HttpClient, private router: Router) {}  // Inject Router

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  logout() {
  localStorage.removeItem('userEmail');
    localStorage.removeItem('loggedInUser');  }
}
