import { Component, OnInit, ViewChild } from '@angular/core';
import { Department } from '../../models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as data from '../../shared/data';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrl: './create-employees.component.css'
})
export class CreateEmployeesComponent implements OnInit {

  @ViewChild('employeeForm') public createEmployeeForm: NgForm;

  datepickerConfig: Partial<BsDatepickerConfig>;
  previewPhoto = false;
  defaultSelection = 'select';
  panelTitle: string;

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
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.datepickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(parameterMap => {
      const id = parameterMap.get('id');
      this.getEmployee(id);
    })
  }

  getEmployee(id: string) {
    if (id === '0') {
      this.employee = {
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
      };
      this.panelTitle = 'Create';
      this.createEmployeeForm?.reset();
    } else {
      this.panelTitle = 'Edit';
      // this.employee = Object.assign({}, this.employeeService.getEmployee(id));
    }
  }

  saveEmployee() {
    this.employeeService.save(this.employee).subscribe({
      next: (data: Employee) => {
        this.createEmployeeForm.reset();
        this.router.navigate(['/list']);
      },
      error: (error: any) => console.log('error', error)
    });
  }
}
