import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { Department } from '../../models/department.model';
import * as data from '../../shared/data';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrl: './display-employee.component.css'
})
export class DisplayEmployeeComponent implements OnInit {

  @Input() employee: Employee;
  @Input() searchTerm: string;
  @Output() notifyDelete = new EventEmitter();

  departments: Department[] = data.departments;

  selectedEmployeeId: number;

  constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.selectedEmployeeId = +this.route.snapshot.paramMap.get('id')
  }

  viewEmployee() {
    this.router.navigate(['/employees', this.employee.id], { queryParams: { 'searchTerm': this.searchTerm } });
  }

  editEmployee() {
    this.router.navigate(['/edit', this.employee.id]);
  }

  deteleEmployee() {
    if (confirm('Are you sure you want to delete the employee?')) {
      this.notifyDelete.emit(this.employee.id);
    }
  }

}
