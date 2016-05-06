import {Component, OnInit} from 'angular2/core';
import {Employee} from '../models/employee';
import {Router, RouteParams} from 'angular2/router';
import {EmployeeService} from '../services/employee.service';

@Component({
	selector: 'employee-detail',
	templateUrl: 'app/employees/edit/employee-edit.component.html'
})

export class EmployeeEditComponent implements OnInit {
	employee: Employee;

	constructor(
		private _employeeService: EmployeeService,
		private _routeParams: RouteParams,
		private _router: Router
	) {}

	ngOnInit() {
		let id = +this._routeParams.get('id');

		this._employeeService.getEmployee(id)
			.then(employee => this.employee = employee);
	}

	backToDirectory(event) {
		this._router.navigate(['Employees']);
	}
}
