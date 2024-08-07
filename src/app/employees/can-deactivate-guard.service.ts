import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CreateEmployeesComponent } from './create-employees/create-employees.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService implements CanDeactivate<CreateEmployeesComponent> {

  constructor() {}

  canDeactivate(component: CreateEmployeesComponent): boolean {
    if (component.createEmployeeForm.dirty) {
      return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }

}
