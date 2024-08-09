import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable, catchError, of, pipe, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [];

  constructor(
    private http: HttpClient
  ) {}

  getEmployees(): Observable<Employee[] | Error> {
    return this.http.get<Employee[]>('http://localhost:3000/employees').pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.log("Client side error: ", errorResponse.error.message);
    } else {
      console.log("Server side error: ", errorResponse);
    }
    return throwError(() => new Error('There is a problem with the service. We are notified and working on it. Please try again later.'));
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>('http://localhost:3000/employees/' + id);
  }

  save(employee: Employee) {
    if (employee.id === null) {
      employee.id = '' + new Date().getTime()
      return this.http.post<Employee>('http://localhost:3000/employees', employee, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(catchError(this.handleError));
    } else {
      const foundIndex = +this.employees.findIndex(e => e.id === employee.id);
      this.employees[foundIndex] = employee;
      return of(employee);
    }
  }

  deteleEmployee(id: string) {
    const indexForDelete = this.employees.findIndex(e => e.id === id);
    if (indexForDelete !== -1) {
      this.employees.splice(indexForDelete, 1);
    }
  }
}
