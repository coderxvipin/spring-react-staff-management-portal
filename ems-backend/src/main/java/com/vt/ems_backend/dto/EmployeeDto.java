package com.vt.ems_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto { //Use to move data between different layers of an application.

	private Long id;
	private String firstName;
	private String lastName;
	private String email;
}









