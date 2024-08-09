import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable, catchError, of, pipe, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [];
  baseUrl = 'http://localhost:3000/employees/';

  constructor(
    private http: HttpClient
  ) {}

  getEmployees(): Observable<Employee[] | Error> {
    return this.http.get<Employee[]>(this.baseUrl).pipe(catchError(this.handleError));
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
    return this.http.get<Employee>(this.baseUrl + id).pipe(catchError(this.handleError));
  }

  addEmployee(employee: Employee) {
    employee.id = '' + new Date().getTime()
    return this.http.post<Employee>(this.baseUrl, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
  }

  updateEmployee(employee: Employee): Observable<void> {
    return this.http.put<void>(this.baseUrl + employee.id, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
  }

  deteleEmployee(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + id)
      .pipe(catchError(this.handleError));
  }
}
