import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule], 
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Rent-Hub');
  userEmail: string | null = null;

  isLoggedIn(): boolean {
  return !!localStorage.getItem('authUser');
}

ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.userEmail = user?.email || null;
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.userEmail = null;
    window.location.href = '/home';
  }
}
