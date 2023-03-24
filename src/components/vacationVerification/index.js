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
	MDBRadio,
    MDBTextArea
} from 'mdb-react-ui-kit';

const EmployeeRegistration = () => {
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
		dataContratacao: '2023-03-08'
	  });
	  const onChange = (e) => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	  };
	return (
        <MDBAccordion initialActive={0} className='accorditionClass' >
            <MDBAccordionItem collapseId={2} headerTitle={<><MDBIcon fas icon="question-circle" /> &nbsp; Gabriel Ambrozini - 123456</>} headerClassName='accordionHeader'>
                <MDBValidation className='row g-3'>
                    <MDBValidationItem className='col-md-4' feedback='Please choose a username.' invalid>
                        <MDBInput value={formValue.name} name='name' onChange={onChange} label='Nome completo'/>
                    </MDBValidationItem>
                    <MDBValidationItem feedback='Please choose a username.' invalid className='col-md-4'>
                        <MDBInput value={formValue.email} name='email' onChange={onChange} label='Email' />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4' feedback='Please choose a username.' invalid>
                        <MDBInput value={formValue.matricula} name='matricula'  onChange={onChange}  id='validationCustom02' label='Matricula'/>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4' feedback='Please choose a username.' invalid>
                        <MDBInput value={formValue.setor} name='setor' onChange={onChange} label='Setor'/>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput value={formValue.cargo} name='cargo'  onChange={onChange}  id='validationCustom02' label='Cargo'/>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-2 d-flex align-items-center justify-content-between'>
                        <MDBRadio name='flexRadioDefault' id='flexRadioDefault1' label='CLT' />
                        <MDBRadio name='flexRadioDefault' id='flexRadioDefault2' label='PJ' defaultChecked />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-2 d-flex align-items-center justify-content-center'>
                        <MDBCheckbox value={formValue.isGerente} name='isGerente' onChange={onChange} label='Cargo de Gestor'/>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4' feedback='Please choose a username.' invalid>
                        <MDBInput value={formValue.dataContratacao} name='dataContratacao' onChange={onChange} label='Data de contratação' type='date'/>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4' feedback='Please choose a username.' invalid>
                        <MDBInput value={formValue.cpf} name='cpf' onChange={onChange} label='CPF/CNPJ'/>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-2 d-grid'>
                        <MDBBtn type='submit'>Cadastrar</MDBBtn>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-2 d-grid'>
                        <MDBBtn type='reset'>Reiniciar</MDBBtn>
                    </MDBValidationItem>
                </MDBValidation>
            </MDBAccordionItem>
        </MDBAccordion>
	);
}

export default EmployeeRegistration;
