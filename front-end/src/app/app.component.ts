import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav>
      <a routerLink="/login" *ngIf="!auth.isLoggedIn()">Login</a>

      <ng-container *ngIf="auth.isLoggedIn()">
        | <a routerLink="/employees">Employees</a>
        | <a routerLink="/dashboard">Dashboard</a>
        | <button (click)="auth.logout()">Logout</button>
      </ng-container>
    </nav>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(public auth: AuthService) {} 
}