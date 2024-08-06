import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../../models/employee.model';
import { Department } from '../../models/department.model';
import * as data from '../../shared/data';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee;
  private id: number;

  departments: Department[] = data.departments;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')
      this.employee = this.employeeService.getEmployee(this.id);
    });
  }

  viewNextEmployee() {
    if (this.id < 3) {
      this.id = this.id + 1;
    } else {
      this.id = 1;
    }
    this.router.navigate(['employees', this.id], { queryParamsHandling: 'preserve' })
  }

}
