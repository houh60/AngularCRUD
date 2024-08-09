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
  employees: Employee[];
  private id: string;

  departments: Department[] = data.departments;
  error: any;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const resolvedData: Employee[] = this.route.snapshot.data['employeeList'];
    if (Array.isArray(resolvedData)) {
      this.employees = resolvedData;
    } else {
      this.error = resolvedData;
    }
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')
      this.employeeService.getEmployee(this.id).subscribe({
        next: employee => this.employee = employee,
        error: err => console.log('Error: ', err)
      });
    });
  }

  viewNextEmployee() {
    let findIndex = this.employees.findIndex(e => e.id === this.employee.id);
    if (findIndex < this.employees.length - 1) {
      findIndex = findIndex + 1;
    } else {
      findIndex = 0;
    }
    const id = this.employees[findIndex].id;
    this.router.navigate(['employees', id], { queryParamsHandling: 'preserve' })
  }

}
