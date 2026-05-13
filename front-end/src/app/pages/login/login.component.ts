import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private authService: AuthService) {}


login() {
  const credentials = {
    username: this.email, 
    password: this.password
  };

  this.authService.login(credentials).subscribe({
    next: (res) => {
      console.log('Login success', res);      
      localStorage.setItem('token', res.token);

      alert('Login successful! Token stored.');
    },
    error: (err) => {
      console.error('Login failed', err);
      alert('Login failed. Check console.');
    }
  });
}
}
