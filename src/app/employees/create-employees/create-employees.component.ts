import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../../models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrl: './create-employees.component.css'
})
export class CreateEmployeesComponent {
  fullName = '';
  email = '';
  phoneNumber = '';
  gender = '';
  contactPreference = '';
  dateOfBirth = null;
  department = '';
  isActive = false;
  photoPath = '';

  datepickerConfig: Partial<BsDatepickerConfig>;

  previewPhoto = false;

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
      showWeekNumbers: false,
      minDate: new Date(2018, 0, 1),
      maxDate: new Date(2024, 11, 31),
      dateInputFormat: 'DD/MM/YYYY'
    })
  }

  saveEmployee(employeeForm: NgForm) {
    console.log("employeeForm.value: ", employeeForm.value);
  }
}
