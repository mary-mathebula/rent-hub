import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { AuthService } from '../../services/auth.services';

interface User {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, BackButtonComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError = '';

  constructor(private fb: FormBuilder, private router: Router, private authService:AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
  if (this.loginForm.invalid) return;

  const email = this.loginForm.value.email.trim().toLowerCase();
  const password = this.loginForm.value.password;

  const usersJson = localStorage.getItem('users');
  const users: User[] = usersJson ? JSON.parse(usersJson) : [];

  const user = users.find(u => u.email === email && u.password === password);

  console.log('Login email:', email);
  console.log('Users:', users);

  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    localStorage.setItem('userEmail', user.email); // ✅ Add this line

    this.authService.login(user);
    this.loginError = '';
    this.router.navigate(['/home']);
  } else {
    this.loginError = 'Invalid email or password';
  }
}


}
