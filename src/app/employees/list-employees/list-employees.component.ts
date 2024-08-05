import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.css'
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
  }

  employeeDetails(employeeId: number) {
    this.router.navigate(['/employees', employeeId]);
  }
}
