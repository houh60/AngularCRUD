import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.filteredEmployees = this.employees;
      if (this.route.snapshot.queryParamMap.has('searchTerm')) {
        this.searchTerm = this.route.snapshot.queryParamMap.get('searchTerm');
      } else {
        this.filteredEmployees = this.employees;
      }
    });
  }

  changeEmployeeName() {
    this.employees[0].name = 'Jordan';
    this.filteredEmployees = this.filterEmployees(this.searchTerm);
  }

  employeeDetails(employeeId: number) {
    this.router.navigate(['/employees', employeeId], { queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testValue' } });
  }

  filterEmployees(searchString: string): Employee[] {
    return this.employees?.filter(employee => employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
}
