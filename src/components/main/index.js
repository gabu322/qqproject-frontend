import React, {useState} from 'react';
import {
	MDBIcon,
} from 'mdb-react-ui-kit';
import EmployeeRegistration from '../employeeRegistration';

const Main = () => {
	return (
		<div>
			<div className='searchBar'>
				<input type='text' className='searchInput'></input>
				<MDBIcon fas icon="search" size='2x'/>
			</div>
			<div className='accorditionList'>
				<EmployeeRegistration/>
				<EmployeeRegistration/>
				<EmployeeRegistration/>
				<EmployeeRegistration/>
				<EmployeeRegistration/>
				<EmployeeRegistration/>
				<EmployeeRegistration/>
				<EmployeeRegistration/>
				<EmployeeRegistration/>
				<EmployeeRegistration/>

			</div>


		</div>


	);
}

export default Main;
