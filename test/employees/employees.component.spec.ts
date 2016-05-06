import {provide} from 'angular2/src/core/di/provider';
import {ApplicationRef} from 'angular2/core';
import {RootRouter} from 'angular2/src/router/router';
import {it, describe, expect, inject, beforeEach, beforeEachProviders, MockApplicationRef} from 'angular2/testing';
import {EmployeeService} from '../../app/employees/services/employee.service';
import {EmployeesComponent} from '../../app/employees/employees.component';
import {AppComponent} from '../../app/app.component';
import {Location, Router, ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT, APP_BASE_HREF} from 'angular2/router';
import {SpyLocation} from 'angular2/src/mock/location_mock';

describe('Employee Component Tests', () => {
	let employeesComponent: EmployeesComponent;
	let location:Location;

	beforeEachProviders(() => [
		ROUTER_PROVIDERS,
		provide(Location, {useClass: SpyLocation}),
		provide(Router, {useClass: RootRouter}),
		provide(APP_BASE_HREF, {useValue: '/'}),
		provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
		provide(ApplicationRef, {useClass: MockApplicationRef}),
		provide(EmployeeService, {useClass: EmployeeService}),
		provide(EmployeesComponent, {useClass: EmployeesComponent})
	]);

	beforeEach(inject([EmployeesComponent, Location], (ec, l) => {
		employeesComponent = ec;
		location = l;
	}))
	
	it('should fetch the employee list on init', done => {
		let testEmployees = () => {
			expect(employeesComponent.employees.length).toBe(15);
			done();
		};

		employeesComponent.ngOnInit();

		setTimeout(testEmployees);
	});

	it('should navigate to the edit page', done => {
		let testNavigation = () => {
			expect(location.path()).toBe('/edit/55');
			done();
		};

		employeesComponent.goToEdit(55);

		setTimeout(testNavigation);
	});

	it('should navigate to the add a new employee page', done => {
		let testNavigation = () => {
			expect((location as any).path()).toBe('/add');
			done();
		};

		employeesComponent.goToAdd();

		setTimeout(testNavigation);
	});
});