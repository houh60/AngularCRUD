import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeesComponent } from './employees/list-employees/list-employees.component';
import { CreateEmployeesComponent } from './employees/create-employees/create-employees.component';
import { CanDeactivateGuardService } from './employees/can-deactivate-guard.service';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';

const routes: Routes = [
  { path: 'list', component: ListEmployeesComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
  { path: 'create', component: CreateEmployeesComponent, canDeactivate: [CanDeactivateGuardService] },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '**', component: ListEmployeesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
