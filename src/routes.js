import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginScreen from './screens/login';
import MainScreen from './screens/main';
import SinginScreen from './screens/singin';

const Routing = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<LoginScreen/>}/>
            <Route exact path='/singin' element={<SinginScreen/>}/>
            <Route exact path='/main' element={<MainScreen/>}/>
        </Routes>
    </BrowserRouter>
)

export default Routing;
