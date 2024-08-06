import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListResolverService implements Resolve<Employee[]> {

  constructor(
    private employeeService: EmployeeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[]> {
    return this.employeeService.getEmployees();
  }
}
