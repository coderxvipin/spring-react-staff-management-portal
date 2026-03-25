package com.vt.ems_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vt.ems_backend.customexception.ResourceNotFoundException;
import com.vt.ems_backend.dto.EmployeeDto;
import com.vt.ems_backend.service.EmployeeService;

import lombok.AllArgsConstructor;
@CrossOrigin("*") //* means all the clients are able to call the employee related REST API
@AllArgsConstructor
@RestController //Class becomes a spring MVP rest controller (capable to handle HTTP requests).
@RequestMapping("/api/employees") //Base URL (Prefix) for every API inside this controller class.
public class EmployeeController {
	private final EmployeeService employeeService;

	//Create/ Add Employee - REST API
	@PostMapping //to map the incoming HTTP post requests to this method.
	public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){ //ResponseEntity (Generic class). @RequestBody annotation extracts the JSON from the HTTP request and convert it into EmployeeDto java Object.
		EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto); //refer notes for more explanation.
		return ResponseEntity.status(HttpStatus.CREATED).body(savedEmployee);
	}
	
	//Get Employee by ID - REST API
	@GetMapping("{id}") //this Id is called URI template variable (URI - Uniform Resource Identifier)
	public ResponseEntity<?> getEmployeeById(@PathVariable("id") Long empId){
		try {
			//Trying to fetch the Employee and returning it as the response.
			EmployeeDto fetchedEmployee = employeeService.getEmployeeById(empId);
			return ResponseEntity.ok(fetchedEmployee);
		}catch(ResourceNotFoundException e) { //after stack unwinding the call looks for "ResourceNotFoundException" type, match found, JVM itself binds/ assigns the thrown exception object to e variable. This is called "exception object binding".
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	//Get All Employees - REST API
	@GetMapping
	public ResponseEntity<List<EmployeeDto>> getAllEmployee(){
		List<EmployeeDto> employees = employeeService.getAllEmployees();
		return ResponseEntity.ok(employees);	
	}
	
	//Update Employee - REST API
	@PutMapping("{id}")
	public ResponseEntity<?> updateEmployee(@PathVariable("id") Long empId, @RequestBody EmployeeDto updatedEmployee){ //This @RequestBody annotation will extract the updated JSON from the request and convert it into EmployeeDto Java Object.
		try {
			//if employee exists -> update and return object
			EmployeeDto employeeDto = employeeService.updateEmployee(empId, updatedEmployee);
			return ResponseEntity.ok(employeeDto);
					
		}catch(ResourceNotFoundException e) {
			//if employee does not exist 
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	// Delete Employee - REST API
	@DeleteMapping("{id}") //{id} URI Template variable (Uniform Resource Identifier). Maps incoming delete request to the method.
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long empId) {
		try {
			//Trying to delete and returning response.
	        employeeService.deleteEmployee(empId);
	        return ResponseEntity.ok("Employee deleted successfully, associated with ID: " + empId);

	    } catch (ResourceNotFoundException e) {
	        // THIS is HTTP response
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	    }
	}
}
