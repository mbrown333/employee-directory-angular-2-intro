import { ComponentFixture, TestBed, inject, async } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser';

import { EmployeeService } from '../../../app/employees/services/employee.service';
import { EmployeeEditComponent } from '../../../app/employees/edit/employee-edit.component';
import { Employee } from '../../../app/employees/models/employee';

describe('Employee Edit Component Tests', () => {
    let comp: EmployeeEditComponent;
    let fixture: ComponentFixture<EmployeeEditComponent>;
    let employeeServiceMock: any;
    let routerMock: any;
    let employeeMock: Employee;
    let locationMock: any;
    let locationSpy: any;

    beforeEach(async(() => {
        employeeMock = new Employee();
        employeeMock.firstName = 'John';
        employeeMock.lastName = 'Doe';
        employeeMock.phone = '111-222-3344';
        employeeMock.email = 'jdoe@test.com';

        routerMock = {
            navigate: jasmine.createSpy('navigate')
        };

        locationMock = {
            back: jasmine.createSpy('back')
        };

        employeeServiceMock = {
            getEmployee: jasmine.createSpy('getEmployee')
                .and.returnValue(Promise.resolve(employeeMock))
        };

        TestBed
            .configureTestingModule({
                imports: [
                    RouterTestingModule.withRoutes([]),
                    FormsModule
                ],
                declarations: [EmployeeEditComponent],
                providers: [
                    { provide: EmployeeService, useValue: employeeServiceMock },
                    { provide: Location, useValue: locationMock },
                    { provide: Router, useValue: routerMock },
                    {
                        provide: ActivatedRoute,
                        useValue: {
                            params: {
                                subscribe: (fn: (value: Data) => void) => fn({
                                    id: 1
                                })
                            }
                        }
                    }
                ]
            })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(EmployeeEditComponent);
                comp = fixture.componentInstance;
                locationSpy = TestBed.get(Location);
            });
    }));

    it('should fetch an employee object on init', async(() => {
        comp.ngOnInit();
        fixture.whenStable()
            .then(() => {
                expect(comp.employee).toBeDefined();
                expect(comp.employee.firstName).toBe('John');
                expect(comp.employee.lastName).toBe('Doe');
            });
    }));

    it('should navigate to the employee list page', () => {
        comp.backToDirectory({});
        fixture.whenStable()
            .then(() => expect(locationSpy.back).toHaveBeenCalled());
    });
});