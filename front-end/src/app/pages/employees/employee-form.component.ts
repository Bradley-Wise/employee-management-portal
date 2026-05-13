import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent {
  name = '';
  email = '';
  department = '';

  constructor(private http: HttpClient, private router: Router) {}

  saveEmployee() {
    const employee = { name: this.name, email: this.email, departmentName: this.department };
    this.http.post('http://localhost:5153/api/employees', employee)
      .subscribe({
        next: () => {
          alert('Employee saved!');
          this.router.navigate(['/employees']);
        },
        error: err => console.error('Failed to save employee', err)
      });
  }
}