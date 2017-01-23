import { Employee } from '../../../app/employees/models/employee';
import { EmployeeService } from '../../../app/employees/services/employee.service';
import { MOCK_DATA } from '../../../app/employees/data/mock-data';

describe('Employee Service Tests', () => {
    let employeeService = new EmployeeService();
    employeeService.data = MOCK_DATA;

	it('returns a list of employees', () => {
        employeeService.getEmployees()
            .then(employees => {
                expect(employees.length).toBeDefined();
                expect(employees.length).toBe(3);
            });
    });

    it('returns a single employee by id', () => {
		let testEmployee = (employee: Employee) => {
            expect(employee).toBeDefined();
            expect(employee.firstName).toBe('Test2');
            expect(employee.lastName).toBe('Employee2');
        };

        employeeService.getEmployee(2)
            .then(testEmployee);
    });

    it('add a new employee', () => {
        let newEmployee: Employee = new Employee();
        let testNewEmployee = (employee: Employee) => {
            expect(employee).toBeDefined();
            expect(employee.firstName).toBe('John');
            expect(employee.lastName).toBe('Doe');
        };

        newEmployee.id = 222;
        newEmployee.firstName = 'John';
        newEmployee.lastName = 'Doe';

        employeeService.addEmployee(newEmployee)
            .then(() => employeeService.getEmployee(222).then(testNewEmployee));
    });

    it('removes an employee', () => {
        let employeeCount = 0;

        let postRemoveCallback = () =>
            employeeService.getEmployees()
                .then(postEmployees => expect(postEmployees.length).toBe(employeeCount - 1));

        let getEmployeeCallback = (employee: Employee) =>
            employeeService.removeEmployee(employee)
                .then(postRemoveCallback);

		let preRemoveCallback = (preEmployees: Employee[]) => {
            employeeCount = preEmployees.length;

            employeeService.getEmployee(1)
                .then(getEmployeeCallback);
		};

        employeeService.getEmployees()
            .then(preRemoveCallback);
    });
});