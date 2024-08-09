import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable, catchError, of, pipe, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [];

  constructor(
    private http: HttpClient
  ) {}

  getEmployees(): Observable<Employee[] | Error> {
    return this.http.get<Employee[]>('http://localhost:3000/employees1').pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.log("Client side error: ", errorResponse.error.message);
    } else {
      console.log("Server side error: ", errorResponse);
    }
    return throwError(() => new Error('There is a problem with the service. We are notified and working on it. Please try again later.'));
  }

  getEmployee(id: number): Employee {
    return this.employees.find(employee => employee.id === id);
  }

  save(employee: Employee) {
    if (employee.id === null) {
      const maxId = this.employees.reduce((e1, e2) => {
        return (e1.id > e2.id) ? e1 : e2;
      }).id;
      employee.id = maxId + 1;
      this.employees.push(employee);
    } else {
      const foundIndex = +this.employees.findIndex(e => e.id === employee.id);
      this.employees[foundIndex] = employee;
    }
  }

  deteleEmployee(id: number) {
    const indexForDelete = this.employees.findIndex(e => e.id === id);
    if (indexForDelete !== -1) {
      this.employees.splice(indexForDelete, 1);
    }
  }
}
