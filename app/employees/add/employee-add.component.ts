import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Employee } from '../models/employee';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
	templateUrl: 'app/employees/add/employee-add.component.html'
})

export class EmployeeAddComponent implements OnInit {
	title = 'Add New Employee'
	newEmployee: Employee;

	constructor(
		private _employeeService: EmployeeService,
		private _location: Location
	) { }

	ngOnInit() {
		this.newEmployee = new Employee();
	}

	saveEmployee(event: any) {
		let _this = this;

		this._employeeService.addEmployee(this.newEmployee)
			.then(function () {
				_this._location.back();
			});
	}

	cancelAdd(event: any) {
		this._location.back();
	}

}