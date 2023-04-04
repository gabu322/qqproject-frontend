import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Callendar from './screens/callendar';
import EmployeeRegistrationScreen from './screens/employeeRegistration';
import LoginScreen from './screens/login';
import SidebarScreen from './screens/sidebar';
import SinginScreen from './screens/singin';
import VacationVerification from './screens/vacationVerification';

const Routing = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<SidebarScreen/>}>
                <Route exact path='/vacation' element={<VacationVerification/>}/>
                <Route exact path='/callendar' element={<Callendar/>}/>
                <Route exact path='/employeeRegistration' element={<EmployeeRegistrationScreen/>}/>
            </Route>
            <Route exact path='/' element={<LoginScreen/>}/>
            <Route exact path='/singin' element={<SinginScreen/>}/>
        </Routes>
    </BrowserRouter>
)

export default Routing;
