//Purpose of this Component: 

import './App.css'      
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponent from './components/FooterComponent'              
import HeaderComponent from './components/HeaderComponent'             
import ListOfEmployeesComponent from './components/ListOfEmployeesComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
                                                              
function App() {
  return ( 
    <> 
    <BrowserRouter>
      <HeaderComponent/>
      <div className="main-content">
        <Routes>
            {/*Configuring route for ListOfEmployeesComponent */}
            {/*http://localhost:3000 */}  
            <Route path='/' element = {<ListOfEmployeesComponent/>}> </Route> 

            {/*http://localhost:3000/employees */}
            <Route path='/employee-list' element = {<ListOfEmployeesComponent/>}> </Route>

            {/*http://localhost:3000/add-employee */}
            <Route path='/add-employee' element = {<EmployeeComponent/>}></Route>

            {/*http://localhost:3000/edit-employee/1 */}
            <Route path='/edit-employee/:id' element={<EmployeeComponent/>}></Route> 
                 
        </Routes>
      </div>
      <FooterComponent/>
    </BrowserRouter>
    </>
  )
}
export default App

