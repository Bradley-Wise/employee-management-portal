import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  totalEmployees = 0;

  constructor(private http: HttpClient) {
    this.http.get<any[]>('http://localhost:5153/api/employees')
      .subscribe(data => this.totalEmployees = data.length);
  }
}