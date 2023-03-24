import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

const EmployeeRegistration = (props) => {
    let employeeData = props.data
    const [formValue, setFormValue] = useState({
        name: employeeData.name,
        employeeId: employeeData.employeeId,
        cpf_cnpj: employeeData.cpf_cnpj,
        businessEmail: employeeData.businessEmail,
        personalEmail: employeeData.personalEmail,
        contractType: employeeData.contractType,
        managerId: employeeData.managerId,
        isManager: employeeData.isManager,
        permissionEditEmployeeRegistration: employeeData.permissionEditEmployeeRegistration,
        lastThirtheenth: employeeData.lastThirtheenth,
        vacationDaysLeft: employeeData.vacationDaysLeft,
        admissionDate: employeeData.admissionDate
    });
    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };
    const showValues = () => {
        console.log(formValue)
    }
    const updateEmployee = () => {
        axios.put("http://localhost:3001/employeeRegistration/" + formValue.employeeId, formValue)
    }


    return (
        <MDBAccordion initialActive={0} className='accorditionClass' >
            <MDBAccordionItem collapseId={2} headerTitle={<><MDBIcon fas icon="question-circle" /> &nbsp; {employeeData.name} - {employeeData.employeeId} </>} headerClassName='accordionHeader'>
                <MDBValidation className='row g-3'>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput value={formValue.name} name='name' onChange={onChange} label='Nome completo' />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput value={formValue.employeeId} name='employeeId' onChange={onChange} label='Matricula' />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput value={formValue.cpf_cnpj} name='cpf_cnpj' onChange={onChange} label='CPF/CNPJ' />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput value={formValue.businessEmail} name='businessEmail' onChange={onChange} label='Email empresarial' />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput value={formValue.personalEmail} name='personalEmail' onChange={onChange} label='Email pessoal' />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-2 d-flex align-items-center justify-content-between'>
                        <MDBRadio value={"CLT"} name='contractType' label='CLT' onChange={onChange} />
                        <MDBRadio value={"PJ"} name='contractType' label='PJ' onChange={onChange} />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-2 d-flex align-items-center justify-content-center'>
                        <MDBCheckbox  name='isManager' onChange={onChange} label='Cargo de Gestor' />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput value={formValue.dataContratacao} name='dataContratacao' onChange={onChange} label='Data de contratação' type='date' />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput value={formValue.cpf} name='cpf' onChange={onChange} label='CPF/CNPJ' />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-2 d-grid'>
                        <MDBBtn onClick={showValues} type='reset'>Cadastrar</MDBBtn>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-2 row-md-2 d-grid'>
                        <MDBBtn type='reset'>Reiniciar</MDBBtn>
                    </MDBValidationItem>
                </MDBValidation>
            </MDBAccordionItem>
        </MDBAccordion>
    );
}

export default EmployeeRegistration;
