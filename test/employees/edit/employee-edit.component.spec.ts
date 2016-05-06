import {provide} from 'angular2/src/core/di/provider';
import {ApplicationRef} from 'angular2/core';
import {RootRouter} from 'angular2/src/router/router';
import {it, describe, expect, inject, beforeEach, beforeEachProviders, MockApplicationRef} from 'angular2/testing';
import {EmployeeService } from '../../../app/employees/services/employee.service';
import {EmployeeEditComponent } from '../../../app/employees/edit/employee-edit.component';
import {AppComponent} from '../../../app/app.component';
import {Location, Router, ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT, APP_BASE_HREF, RouteParams} from 'angular2/router';
import {SpyLocation} from 'angular2/src/mock/location_mock';

describe('Employee Edit Component Tests', () => {
	let employeeEditComponent: EmployeeEditComponent;
	let location:Location;

	beforeEachProviders(() => [
		ROUTER_PROVIDERS,
		provide(Location, {useClass: SpyLocation}),
		provide(Router, {useClass: RootRouter}),
		provide(RouteParams, { useValue: new RouteParams({ id: '2' }) }),
		provide(APP_BASE_HREF, {useValue: '/'}),
		provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
		provide(ApplicationRef, {useClass: MockApplicationRef}),
		provide(EmployeeService, {useClass: EmployeeService}),
		provide(EmployeeEditComponent, {useClass: EmployeeEditComponent})
	]);

	beforeEach(inject([EmployeeEditComponent, Location], (eec, l) => {
		employeeEditComponent = eec;
		location = l;
	}))
	
	it('should fetch an employee object on init', done => {
		let testEmployeePopulated = () => {
			expect(employeeEditComponent.employee).toBeDefined();
			expect(employeeEditComponent.employee.firstName).toBe('Dwight');
			expect(employeeEditComponent.employee.lastName).toBe('Schrute');
			done();
		};

		employeeEditComponent.ngOnInit();

		setTimeout(testEmployeePopulated);
	});

	it('should navigate to the employee list page', done => {
		let testNavigation = () => {
			expect(location.path()).toBe('/employees');
			done();
		};

		employeeEditComponent.backToDirectory({});

		setTimeout(testNavigation);
	});
});