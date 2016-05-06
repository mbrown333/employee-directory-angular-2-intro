import {Component, OnInit} from 'angular2/core';
import {Employee} from './models/employee';
import {EmployeeService} from './services/employee.service'
import {Router} from 'angular2/router';

@Component({
	templateUrl: 'app/employees/employees.component.html',
	directives: []
})

export class EmployeesComponent implements OnInit {
	title = 'Employee Directory';
	employees: Employee[];

	constructor(
		private _employeeService: EmployeeService,
		private _router: Router
	) {}

	getEmployees() {
		this._employeeService.getEmployees()
			.then(employees => this.employees = employees);
	}

	ngOnInit() {
		this.getEmployees();
	}

	deleteEmployee(employee: Employee) {
		this._employeeService.removeEmployee(employee);
	}

	goToEdit(id: number) {
		this._router.navigate(['Edit', { id: id }]);
	}

	goToAdd() {
		this._router.navigate(['Add']);
	}
}