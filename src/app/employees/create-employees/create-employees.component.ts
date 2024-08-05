import { Component, ViewChild } from '@angular/core';
import { Department } from '../../models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import * as data from '../../shared/data';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrl: './create-employees.component.css'
})
export class CreateEmployeesComponent {

  @ViewChild('employeeForm') public createEmployeeForm: NgForm;

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
    const tempEmployee: Employee = Object.assign({}, this.employee);
    this.employeeService.save(tempEmployee);
    this.createEmployeeForm.reset();
    this.router.navigate(['/list']);
  }
}
