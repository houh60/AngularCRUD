import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { EmployeeService } from './employee.service';
import { ResolvedEmployeeList } from './resolved-employeelist.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListResolverService implements Resolve<ResolvedEmployeeList> {

  constructor(
    private employeeService: EmployeeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedEmployeeList> {
    return this.employeeService.getEmployees()
      .pipe(
        map((employeeList: any) => new ResolvedEmployeeList(employeeList)),
        catchError(err => of(new ResolvedEmployeeList(null, err)))
      );
  }
}
