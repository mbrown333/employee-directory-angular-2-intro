import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeesComponent } from './employees/employees.component';
import { EmployeeEditComponent } from './employees/edit/employee-edit.component';
import { EmployeeAddComponent } from './employees/add/employee-add.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/employees',
		pathMatch: 'full'
	},
	{
		path: 'employees',
		component: EmployeesComponent
	},
	{
		path: 'edit/:id',
		component: EmployeeEditComponent
	},
	{
		path: 'add',
		component: EmployeeAddComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }