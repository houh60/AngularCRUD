import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ResolvedEmployeeList } from '../resolved-employeelist.model';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.css'
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];

  private _searchTerm: string;
  error: any;
  get searchTerm(): string {
    return this._searchTerm;
  };
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filteredEmployees = this.filterEmployees(val);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    const resolvedData: Employee[] = this.route.snapshot.data['employeeList'];
    if (Array.isArray(resolvedData)) {
      this.employees = resolvedData;
    } else {
      this.error = resolvedData;
    }
    if (this.route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this.route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  ngOnInit(): void {
  }

  employeeDetails(employeeId: string) {
    this.router.navigate(['/employees', employeeId], { queryParams: { 'searchTerm': this.searchTerm } });
  }

  filterEmployees(searchString: string): Employee[] {
    return this.employees?.filter(employee => employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  onDelete(id: string) {
    const indexDelete = this.filteredEmployees.findIndex(e => e.id = id);
    if (indexDelete !== -1) {
      this.filteredEmployees.splice(indexDelete, 1);
    }
  }
}
