import {Component, OnInit} from 'angular2/core';
import {Employee} from '../models/employee';
import {Router} from 'angular2/router';
import {EmployeeService} from '../services/employee.service';

@Component({
	templateUrl: 'app/employees/add/employee-add.component.html'
})

export class EmployeeAddComponent implements OnInit {
	title = 'Add New Employee'
	newEmployee: Employee;

	constructor(
		private _employeeService: EmployeeService,
		private _router: Router
	) {}

	ngOnInit() {
		this.newEmployee = new Employee();
	}

	saveEmployee(event) {
		let _this = this;

		this._employeeService.addEmployee(this.newEmployee)
			.then(function() { 
				_this._router.navigate(['Employees']);
			});
	}

	cancelAdd(event) {
		this._router.navigate(['Employees']);
	}

}