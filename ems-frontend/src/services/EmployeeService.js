//Purpose of this Component: 

import axios from "axios"; //import axios object from axios library in order to call it's APIs.

const REST_API_BASE_URL = "/api/employees";   //For deployed server
//const REST_API_BASE_URL = "http://localhost:8080/api/employees"; //For localhost

export function listEmployees(){
    return axios.get(REST_API_BASE_URL);
}

export const createEmployee =  (employee) => {
   return axios.post(REST_API_BASE_URL, employee);
}

//Written the REST client code to call getEmployee REST API using axios.get() method
//in order to append the employeeId to the URL we use '/'
export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL + '/' + employeeId);

//"employee" is updated employee object
export const updateEmployee = (employeeId, employee) => axios.put(REST_API_BASE_URL + '/' + employeeId, employee);

export const deleteEmployee = (employeeId) => axios.delete(REST_API_BASE_URL + '/' + employeeId);