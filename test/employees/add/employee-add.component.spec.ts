import {provide} from 'angular2/src/core/di/provider';
import {ApplicationRef} from 'angular2/core';
import {RootRouter} from 'angular2/src/router/router';
import {it, describe, expect, inject, beforeEach, beforeEachProviders, MockApplicationRef} from 'angular2/testing';
import {Employee} from '../../../app/employees/models/employee';
import {EmployeeService} from '../../../app/employees/services/employee.service';
import {EmployeeAddComponent} from '../../../app/employees/add/employee-add.component';
import {AppComponent} from '../../../app/app.component';
import {Location, Router, ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT, APP_BASE_HREF} from 'angular2/router';
import {SpyLocation} from 'angular2/src/mock/location_mock';

describe('Employee Add Component Tests', () => {
	let employeeAddComponent: EmployeeAddComponent;
	let employeeService: EmployeeService;
	let location:Location;

	beforeEachProviders(() => [
		ROUTER_PROVIDERS,
		provide(Location, {useClass: SpyLocation}),
		provide(Router, {useClass: RootRouter}),
		provide(APP_BASE_HREF, {useValue: '/'}),
		provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
		provide(ApplicationRef, {useClass: MockApplicationRef}),
		provide(EmployeeService, {useClass: EmployeeService}),
		provide(EmployeeAddComponent, {useClass: EmployeeAddComponent})
	]);

	beforeEach(inject([EmployeeAddComponent, EmployeeService, Location], (eac, es, l) => {
		employeeAddComponent = eac;
		employeeService = es;
		location = l;
	}))
	
	it('should create a new employee', done => {
		let employeeCount:number;
		let newEmployee: Employee;

		let testNavigation = () => {
			expect(location.path()).toBe('/employees');
			done();
		};

		let postAddCallback = employees => {
			expect(employees.length).toBe(16);
			
			setTimeout(testNavigation);

			employeeService.removeEmployee(newEmployee);
		};

		let preAddCallback = employees => {
			employeeCount = employees.length;
			newEmployee = employeeAddComponent.newEmployee;
			employeeAddComponent.saveEmployee({});

			employeeService.getEmployees()
				.then(postAddCallback)
				.catch(error => done.fail('Error') );
		};

		employeeAddComponent.ngOnInit();
		employeeService.getEmployees()
			.then(preAddCallback)
			.catch(error => done.fail('Error') );
	});

	it('should navigate to the employee list page on cancel', done => {
		let testNavigation = () => {
			expect(location.path()).toBe('/employees');
			done();
		};

		employeeAddComponent.cancelAdd({});

		setTimeout(testNavigation);
	});
});