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
  filteredEmployees: Employee[];

  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  };
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filteredEmployees = this.filterEmployees(val);
  }

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
    this.filteredEmployees = this.employees;
  }

  changeEmployeeName() {
    this.employees[0].name = 'Jordan';
    this.filteredEmployees = this.filterEmployees(this.searchTerm);
  }

  employeeDetails(employeeId: number) {
    this.router.navigate(['/employees', employeeId]);
  }

  filterEmployees(searchString: string): Employee[] {
    return this.employees.filter(employee => employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
}
