import { ComponentFixture, TestBed, inject, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import {Employee} from '../../../app/employees/models/employee';
import {EmployeeService} from '../../../app/employees/services/employee.service';
import {EmployeeAddComponent} from '../../../app/employees/add/employee-add.component';

describe('Employee Add Component Tests', () => {
    let comp: EmployeeAddComponent;
    let fixture: ComponentFixture<EmployeeAddComponent>;
    let employeeServiceMock: any;
    let routerMock: any;
    let locationMock: any;
    let locationSpy: any;

    beforeEach(async(() => {
        routerMock = {
            navigate: jasmine.createSpy('navigate')
        };

        locationMock = {
            back: jasmine.createSpy('back')
        };

        employeeServiceMock = {
            addEmployee: jasmine.createSpy('addEmployee')
                .and.returnValue(Promise.resolve())
        };

        TestBed
            .configureTestingModule({
                imports: [
                    RouterTestingModule.withRoutes([]),
                    FormsModule
                ],
                declarations: [EmployeeAddComponent],
                providers: [
                    { provide: EmployeeService, useValue: employeeServiceMock },
                    { provide: Location, useValue: locationMock },
                    { provide: Router, useValue: routerMock }
                ]
            })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(EmployeeAddComponent);
                comp = fixture.componentInstance;
                locationSpy = TestBed.get(Location);
            });
    }));

	it('should create a new employee', () => {
		let employeeCount:number;
		let newEmployee: Employee;

		comp.ngOnInit();
        comp.saveEmployee(null);

        expect(employeeServiceMock.addEmployee).toHaveBeenCalledTimes(1);
        fixture.detectChanges();
        fixture.whenStable()
            .then(() => expect(locationSpy.back).toHaveBeenCalled());
	});

	it('should navigate to the employee list page on cancel', () => {
		comp.cancelAdd(null);
        fixture.whenStable()
            .then(() => expect(locationSpy.back).toHaveBeenCalled());
	});
});