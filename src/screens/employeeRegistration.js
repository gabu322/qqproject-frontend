import React, { Fragment, useEffect, useState } from 'react';
import {
    MDBIcon,
} from 'mdb-react-ui-kit';
import EmployeeRegistration from '../components/employeeRegistration';
import axios from 'axios';

const EmployeeRegistrationScreen = () => {
    const [employeeList, setEmployeeList] = useState();
    useEffect(() => {
        axios.get("http://localhost:3001/employeeRegistration").then((response) => {
            setEmployeeList(response.data);
        })
    }, []);

    return (
        <Fragment>
            <div className='searchBar'>
                <input type='text' className='searchInput' value=''></input>
                <MDBIcon fas icon="search" size='2x' />
            </div>
            <div className='accorditionList'>
                {employeeList?.map((employeeValues) => (
                    <EmployeeRegistration key={employeeValues.EmployeeRegistration} data={employeeValues} />
                ))}
            </div>
        </Fragment>
    );
}

export default EmployeeRegistrationScreen;
