package com.vt.ems_backend.customexception;

public class ResourceNotFoundException extends RuntimeException{ //RuntimeException is a class,By extending it, you are saying: “This class IS-A RuntimeException”. 
	
	public ResourceNotFoundException (String message) {
		super(message);
	}
}
