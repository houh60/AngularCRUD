import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsGuardService implements CanActivate {

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.employeeService.getEmployee(route.paramMap.get('id'))
      .pipe(map(employee => {
        const employeeExists = !!employee;
        if (employeeExists) {
          return true;
        } else {
          this.router.navigate(['notfound']);
          return false;
        }
      }),
        catchError(error => {
          console.log("error: ", error);
          return of(error);
        })
      );
  }
}
