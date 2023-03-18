import React, {useState} from 'react';
import {
	MDBAccordion,
	MDBAccordionItem,
	MDBIcon,
	MDBInput,
	MDBValidation,
	MDBValidationItem,
	MDBCheckbox,
	MDBBtn,
	MDBRadio
} from 'mdb-react-ui-kit';
import EmployeeRegistration from '../employeeRegistration';

const Main = () => {
	const [formValue, setFormValue] = useState({
		name: 'Gabriel Ambrozini Biancardi',
		email: 'gabriel.biancardi@verdecard.com',
		matricula: '123456',
		gestor: '',
		cargo: '',
		contrato: '',
		isGerente: '',
		setor: '',
		cpf: '',
		dataContratacao: ''
	  });
	  const onChange = (e) => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	  };
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
