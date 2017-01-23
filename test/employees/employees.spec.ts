import { ComponentFixture, TestBed, inject, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core'

import { EmployeeService } from '../../app/employees/services/employee.service';
import { EmployeesComponent } from '../../app/employees/employees.component';

describe('Employee Component Tests', () => {
	let comp: EmployeesComponent;
	let fixture: ComponentFixture<EmployeesComponent>;
	let routerMock: any;
	let employeeServiceMock: any;
	let serviceSpy: any;
	let routerSpy: any;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(async(() => {
		routerMock = {
			navigate: jasmine.createSpy('navigate')
		};

		employeeServiceMock = {
			getEmployees: jasmine.createSpy('getEmployees')
				.and.returnValue(Promise.resolve([{}, {}, {}])),

			removeEmployee: jasmine.createSpy('removeEmployee')
		};

		TestBed
			.configureTestingModule({
				declarations: [EmployeesComponent],
				providers: [
					{ provide: EmployeeService, useValue: employeeServiceMock },
					{ provide: Router, useValue: routerMock }
				]
			})
			.compileComponents()
			.then(() => {
				fixture = TestBed.createComponent(EmployeesComponent);
				comp = fixture.componentInstance;
				de = fixture.debugElement.query(By.css('table tbody'));
				el = de.nativeElement;

				serviceSpy = TestBed.get(EmployeeService);
				routerSpy = TestBed.get(Router);
			});
	}));

	it('should fetch the employee list on init', async(() => {
		comp.ngOnInit();
		expect(serviceSpy.getEmployees).toHaveBeenCalled();

		fixture.detectChanges();
		fixture.whenStable()
			.then(() => {
				fixture.detectChanges();
				expect(comp.employees.length).toBe(3);
				expect(el.getElementsByTagName('tr').length).toBe(3);
			});
	}));

	it('should remove employees selected to be deleted', () => {
		comp.deleteEmployee(null);
		expect(employeeServiceMock.removeEmployee).toHaveBeenCalledTimes(1);
	});

	it('should navigate to the edit page', () => {
		comp.goToEdit(55);
		fixture.whenStable()
			.then(() => expect(routerSpy.navigate).toHaveBeenCalledWith(['/edit/55']));
	});

	it('should navigate to the add a new employee page', () => {
		comp.goToAdd();
		fixture.whenStable()
			.then(() => expect(routerSpy.navigate).toHaveBeenCalledWith(['/add']));
	});
});