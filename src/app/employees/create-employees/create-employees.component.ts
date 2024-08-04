import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../../models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../../models/employee.model';

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
    password: null,
    confirmPassword: null,
  }

  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' },
    { id: 5, name: 'Admin' },
  ];

  constructor() {
    this.datepickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false
    })
  }

  saveEmployee(newEmployee: Employee) {
    console.log("newEmployee: ", newEmployee);
  }
}
