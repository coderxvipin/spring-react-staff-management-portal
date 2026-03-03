package com.vt.ems_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vt.ems_backend.entity.*;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{

}
