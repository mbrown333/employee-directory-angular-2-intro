import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { EmployeesComponent } from './employees/employees.component';
import { EmployeeEditComponent } from './employees/edit/employee-edit.component';
import { EmployeeAddComponent } from './employees/add/employee-add.component';

import { EmployeeService } from './employees/services/employee.service';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule
	],
	declarations: [
		AppComponent,
		EmployeesComponent,
		EmployeeEditComponent,
		EmployeeAddComponent
	],
	providers: [
		EmployeeService
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
