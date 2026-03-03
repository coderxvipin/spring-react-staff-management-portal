package com.vt.ems_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;				
import lombok.AllArgsConstructor;				
import lombok.Getter;							
import lombok.NoArgsConstructor;				
import lombok.Setter;

@Getter											//- - Key Notes - - 
@Setter											//Entity class → Database table
@NoArgsConstructor								//Entity object → One row
@AllArgsConstructor								//Entity fields → Columns

@Entity	//To specify this class as a JPA entity.
@Table(name = "employees")
public class Employee { 
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) //uses auto-increment in DB.
	private Long id;	
	
	@Column(name="first_name")	//Explicitly specifies the column name.
	private String firstName;
	
	@Column(name="last_name")
	private String lastName;
	
	@Column(name="email_id", nullable = false, unique = true)
	private String email;
}


