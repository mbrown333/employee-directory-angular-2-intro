import {Employee} from '../../../app/employees/models/employee';
import {EmployeeService} from '../../../app/employees/services/employee.service';
import {MOCK_DATA} from '../../../app/employees/data/mock-data';

describe('Employee Service Tests', () => {
	let employeeService = new EmployeeService();
	employeeService.data = MOCK_DATA;
	
	it('returns a list of employees', done => {
		employeeService.getEmployees()
			.then(employees => { 
				expect(employees.length).toBeDefined();
				expect(employees.length).toBe(3);
				done(); 
			})
			.catch(error => done.fail('Error') );
	});

	it('returns a single employee by id', done => {

		let testEmployee = employee => {
			expect(employee).toBeDefined();
			expect(employee.firstName).toBe('Test2');
			expect(employee.lastName).toBe('Employee2');
			done();
		};

		employeeService.getEmployee(2)
			.then(testEmployee)
			.catch(error => done.fail('Error') );
	});

	it('add a new employee', done => {
		let newEmployee:Employee = new Employee();

		let testNewEmployee = employee => {
			expect(employee).toBeDefined();
			expect(employee.firstName).toBe('John');
			expect(employee.lastName).toBe('Doe');

			done();
		};

		let addEmployeeCallback = () => {
			employeeService.getEmployee(222)
				.then(testNewEmployee)
				.catch(error => done.fail('Error') );
		};

		newEmployee.id = 222;
		newEmployee.firstName = 'John';
		newEmployee.lastName = 'Doe';

		employeeService.addEmployee(newEmployee)
			.then(addEmployeeCallback)
			.catch(error => done.fail('Error') );
	});

	it('remove an employee', done => {
		let employeeCount = 0;

		let postRemoveCallback = () => {
			employeeService.getEmployees()
				.then(postEmployees => {
					expect(postEmployees.length).toBe(employeeCount - 1);
					done();
				})
				.catch(error => done.fail('Error') );
		};

		let getEmployeeCallback = employee => {
			employeeService.removeEmployee(employee)
				.then(postRemoveCallback)
				.catch(error => done.fail('Error') );
		};

		let preRemoveCallback = preEmployees => {
			employeeCount = preEmployees.length;

			employeeService.getEmployee(1)
				.then(getEmployeeCallback)
				.catch(error => done.fail('Error') );
		}

		employeeService.getEmployees()
			.then(preRemoveCallback)
			.catch(error => done.fail('Error') );
	});
});