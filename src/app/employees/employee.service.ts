import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [
    {
      id: 1,
      name: 'Mark',
      gender: 'Male',
      contactPreference: 'Email',
      email: 'mark@pragimtech.com',
      dateOfBirth: new Date('10/25/1988'),
      department: '3',
      isActive: true,
      photoPath: 'assets/images/mark.png',
    },
    {
      id: 2,
      name: 'Mary',
      gender: 'Female',
      contactPreference: 'Phone',
      phoneNumber: '2345978640',
      dateOfBirth: new Date('11/20/1979'),
      department: '2',
      isActive: true,
      photoPath: 'assets/images/mary.png',
    },
    {
      id: 3,
      name: 'John',
      gender: 'Male',
      contactPreference: 'Phone',
      phoneNumber: '5432978640',
      dateOfBirth: new Date('3/25/1976'),
      department: '3',
      isActive: false,
      photoPath: 'assets/images/john.png',
    },
  ];

  constructor() {}

  getEmployees(): Observable<Employee[]> {
    return of(this.employees).pipe(delay(1000));
  }

  getEmployee(id: number): Employee {
    return this.employees.find(employee => employee.id === id);
  }

  save(employee: Employee) {
    this.employees.push(employee);
  }
}
