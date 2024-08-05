import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { Department } from '../../models/department.model';
import * as data from '../../shared/data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrl: './display-employee.component.css'
})
export class DisplayEmployeeComponent implements OnInit {

  @Input() employee: Employee;

  departments: Department[] = data.departments;

  selectedEmployeeId: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectedEmployeeId = +this.route.snapshot.paramMap.get('id')
  }

}
