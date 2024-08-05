import { Component } from '@angular/core';
import { Department } from '../../models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import * as data from '../../shared/data';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrl: './create-employees.component.css'
})
export class CreateEmployeesComponent {

  datepickerConfig: Partial<BsDatepickerConfig>;
  previewPhoto = false;
  defaultSelection = 'select';

  employee: Employee = {
    id: null,
    name: null,
    gender: null,
    email: null,
    phoneNumber: null,
    contactPreference: null,
    dateOfBirth: null,
    department: this.defaultSelection,
    isActive: false,
    photoPath: null,
  }

  departments: Department[] = data.departments;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.datepickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false
    })
  }

  saveEmployee() {
    this.employeeService.save(this.employee);
    this.router.navigate(['/list']);
  }
}
