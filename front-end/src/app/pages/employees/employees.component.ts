import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: number;
}

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.component.html'
})
export class EmployeesComponent {
  employees: Employee[] = [];
  departmentMap: Record<number, string> = {
    1: 'Engineering',
    2: 'HR',
    3: 'Sales',
    9: 'Marketing'
  };
departmentIds = Object.keys(this.departmentMap).map(k => +k); // convert to numbers
  // Form model for add/edit
  editingEmployee: Employee = { id: 0, firstName: '', lastName: '', email: '', departmentId: 1 };
  isEditing: boolean = false;

  constructor(private http: HttpClient) {
    this.loadEmployees();
  }

  loadEmployees() {
    this.http.get<Employee[]>('http://localhost:5153/api/employees').subscribe({
      next: (res) => {
        this.employees = res;
      },
      error: (err) => console.error('Failed to load employees', err)
    });
  }

  startEdit(emp: Employee) {
    this.isEditing = true;
    this.editingEmployee = { ...emp }; // clone so original list isn't mutated
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingEmployee = { id: 0, firstName: '', lastName: '', email: '', departmentId: 1 };
  }

  saveEmployee() {
    if (this.isEditing) {
      // Update existing employee
      this.http.put(`http://localhost:5153/api/employees/${this.editingEmployee.id}`, this.editingEmployee)
        .subscribe({
          next: () => {
            this.loadEmployees();
            this.cancelEdit();
          },
          error: (err) => console.error('Update failed', err)
        });
    } else {
      // Add new employee
      this.http.post('http://localhost:5153/api/employees', this.editingEmployee)
        .subscribe({
          next: () => {
            this.loadEmployees();
            this.cancelEdit();
          },
          error: (err) => console.error('Add failed', err)
        });
    }
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.http.delete(`http://localhost:5153/api/employees/${id}`)
        .subscribe({
          next: () => this.loadEmployees(),
          error: (err) => console.error('Delete failed', err)
        });
    }
  }
}