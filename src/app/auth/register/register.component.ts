import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
interface User {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, BackButtonComponent,ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  registrationFailed = false;
  registrationSuccess = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
    });
  }

  passwordsMatch(): boolean {
    return this.registerForm.value.password === this.registerForm.value.confirmPassword;
  }

  onSubmit() {
    this.registrationFailed = false;
    this.registrationSuccess = false;
    this.errorMessage = '';

    if (this.registerForm.invalid) {
      this.registrationFailed = true;
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    if (!this.passwordsMatch()) {
      this.registrationFailed = true;
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // Get current users from localStorage or initialize empty array
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    console.log('Existing users before registration:', users);

    // Normalize email for case-insensitive check
    const emailToRegister = this.registerForm.value.email.trim().toLowerCase();

    // Check if email already registered
    const emailExists = users.some(user => user.email.toLowerCase() === emailToRegister);

    if (emailExists) {
      this.registrationFailed = true;
      this.errorMessage = 'Email is already registered.';
      console.warn('Registration failed: email already exists:', emailToRegister);
      return;
    }

    // Create new user object
    const newUser: User = {
      name: this.registerForm.value.name.trim(),
      email: emailToRegister,
      password: this.registerForm.value.password,
    };

    // Add new user to array and save to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('User registered successfully:', newUser);
    console.log('Users after registration:', users);

    // Success feedback & reset form
    this.registrationSuccess = true;
    this.registerForm.reset();

    // Redirect to login after short delay
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
