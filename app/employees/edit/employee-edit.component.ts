import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Employee } from '../models/employee';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'employee-detail',
	templateUrl: 'app/employees/edit/employee-edit.component.html'
})

export class EmployeeEditComponent implements OnInit {
	employee: Employee;

	constructor(
		private _employeeService: EmployeeService,
		private _route: ActivatedRoute,
		private _location: Location
	) { }

	ngOnInit() {
		this._route.params.subscribe(params => {
			this._employeeService.getEmployee(+params['id'])
				.then(employee => this.employee = employee);
		});
	}

	backToDirectory(event: any) {
		this._location.back();
	}
}
