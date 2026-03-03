//Purpose of this Component: 

import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const [errors, setErrors]= useState({
      firstName: '',  
      lastName: '',  
      email: ''                  
  })

  const {id} = useParams(); 

  const navigator = useNavigate();
  
  useEffect( ()=> {
      if(id){
        getEmployee(id).then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        }).catch(error => {
          console.error(error);
        })
      }
    }, [id])

  function handleFirstName(e){
    setFirstName (e.target.value);
  }
  
  function handleLastName(e){
    setLastName(e.target.value);
  }

  function handleEmail(e){
    setEmail(e.target.value);
  }

  function saveOrUpdateEmployee(e){
    e.preventDefault();  //Prevents default activities that will happen while submitting the form

    if(validateForm()){
      const employee = {
      firstName: firstName,
      lastName: lastName,
      email: email
    }
    //object shorthand. Since key name and variable name are same: "const employee = {firstName, lastName, email}"
    console.log(employee)

      if(id){
        updateEmployee(id, employee).then((response) => {
          console.log(response.data);
          navigator('/employees');
        }).catch(error => {
          console.error(error);
        })
    }else {
      createEmployee(employee).then((response) => {
        console.log(response.data);
        navigator('/employees')
        }).catch(error => {
          console.error(error);
      })
    }
  }
}
  
  function resetForm(){
    firstName("");
    lastName("");
    email("");
  }

  function validateForm(){
    let valid = true;

    const errorsCopy = {... errors}  
    
    if (firstName.trim()){
      errorsCopy.firstName = '';
    }else { //string is empty
        errorsCopy.firstName = 'First name is required';
        valid = false;
      }
    
    if (lastName.trim()){
      errorsCopy.lastName = '';
    }else {
        errorsCopy.lastName = 'Last name is required';
        valid = false;
      }
    
    //If condition to validate the email
    if (email.trim()){  //trim the string. email is not empty/ not null
      errorsCopy.email = '';
    }else { //string is empty
        errorsCopy.email = 'Email name is required';
        valid = false;
      }

    setErrors(errorsCopy);
    return valid;
    
    }
  
  function pageTitle(){ //logic: if employee id is present in the title then return the page title as "Update employee"
    if(id){  //we will use "useParams hook" to get the employee id from the URL.
      return <h2 className = 'text-center'>Update Employee</h2>
    }else{
      return <h2 className = 'text-center'>Add Employee</h2>
      }
    }
  return (
    <div className = 'container col-md-6 offset-md-3'> <br/> <br/>
      <div className = 'row'>
        <div className = 'card' >  {/*Used card bcz we want to display our Form within a card*/}
          {/* Dynamically retuning the page title [Add/ Update employee form] */}
          {
            pageTitle()
          }
          <div className = 'card-body'>
            <form>
                <div className = 'form-group mb-2'> {/*mb-2 = margin bottom*/}
                  <label>First Name</label> <br></br>
                  <input 
                    type = 'text' 
                    className={`form-control ${errors.firstName ? 'is-invalid': ''}`}
                    placeholder = 'Enter First Name' 
                    name = 'firstName'
                    onChange={handleFirstName}
                    value = {firstName}
                    >
                  </input>
                  {errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
                </div>

                <div className = 'form-group mb-2'> {/*mb-2 = margin bottom*/}
                  <label>Last Name</label> <br></br>
                  <input 
                    type = 'text' 
                    className={`form-control ${errors.lastName ? 'is-invalid': ''}`}
                    placeholder = 'Enter Last Name' 
                    name = 'lastName' 
                    onChange={handleLastName} //When the user types in the textbox, we use onChange to get the entered value.
                    value = {lastName} //the state variable
                    >
                  </input>
                  {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
                </div>

                <div className = 'form-group mb-2'> {/*mb-2 = margin bottom*/}
                  <label>Email</label> <br></br>
                  <input 
                    type = 'text' 
                    className={`form-control ${errors.email ? 'is-invalid': ''}`}
                    placeholder = 'Enter your Email' 
                    name = 'email' 
                    onChange={handleEmail} //When the user types in the textbox, we use onChange to get the entered value.
                    value = {email} //the state variable
                    >
                  </input>
                  {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                </div>
                                              {/*ms = margin start from LTR (Left to Right)*/} 
                <button className = 'btn btn-secondary ms-2' onClick={resetForm}>Reset</button>
                <button className = "btn btn-success ms-2" onClick={saveOrUpdateEmployee}>Submit</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent