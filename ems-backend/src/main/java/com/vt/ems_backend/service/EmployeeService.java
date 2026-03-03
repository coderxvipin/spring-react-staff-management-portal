package com.vt.ems_backend.service;

import java.util.List;

import com.vt.ems_backend.dto.EmployeeDto;

public interface EmployeeService {
	
	EmployeeDto createEmployee(EmployeeDto employeeDto);
	EmployeeDto getEmployeeById(Long empId);
	List<EmployeeDto> getAllEmployees();
	EmployeeDto updateEmployee(Long empId, EmployeeDto updatedEmployee);
	void deleteEmployee(Long empId);
	
}
