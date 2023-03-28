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
        lastThirtheenth: employeeData.lastThirtheenth === null ? '' : employeeData.lastThirtheenth,
        vacationDaysLeft:  employeeData.vacationDaysLeft === null ? '' : employeeData.vacationDaysLeft,
        admissionDate:  employeeData.admissionDate === null ? '' : employeeData.admissionDate
    });
    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const [managerList, setManagerList] = useState();
    useEffect(() => {
        axios.get("http://localhost:3001/employeeRegistration/managers").then((response) => {
            setManagerList(response.data);
        })
    }, []);


    const showValues = () => {
        let managerName = document.getElementById('managerList').value
        axios.get("http://localhost:3001/employeeRegistration/managers/" + managerName).then((response) => {
            formValue.managerId = response.data.employeeId
        })
        console.log(formValue)
    }
    async function updateEmployee() {
        showValues();
        await axios.put("http://localhost:3001/employeeRegistration/" + formValue.employeeId, formValue)
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
                    <MDBValidationItem className='col-md-4 d-flex align-items-center justify-content-center'>
                        <MDBCheckbox  name='isManager' onChange={() => {formValue.permissionEditEmployeeRegistration = !formValue.permissionEditEmployeeRegistration}} label='Permissão para editar cadastro de funcionário' />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput value={formValue.admissionDate} name='admissionDate' onChange={onChange} label='Data de contratação' type='date' />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput value={formValue.lastThirtheenth} name='lastThirtheenth' onChange={onChange} label='Data do último 13º solicitado' type='date'/>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-2 d-flex align-items-center justify-content-center'>
                        <MDBCheckbox  name='isManager'
                       onChange={() => {formValue.isManager = !formValue.isManager}} id='isManagerCheckbox' label='Cargo de Gestor' />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-2 d-flex align-items-center justify-content-around'>
                        <MDBRadio value={"CLT"} name='contractType' label='CLT' onChange={onChange}/>
                        <MDBRadio value={"PJ"} name='contractType' label='PJ' onChange={onChange} />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput value={formValue.vacationDaysLeft} name='vacationDaysLeft' onChange={onChange} label='Dias de férias restantes' />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput name='managerId' onChange={onChange} id='managerList' label='Gerente' list='possibleManagers'/>
                        <datalist id='possibleManagers'>
                            {managerList?.map((manager) => (<option value={manager.name} key={manager.employeeData} id={manager.employeeId}></option>))}
                        </datalist>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-2 d-grid'>
                        <MDBBtn onClick={updateEmployee} type='reset'>Cadastrar</MDBBtn>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-2 d-grid'>
                        <MDBBtn onClick={updateEmployee} type='reset' color='danger'>Deletar cadastro</MDBBtn>
                    </MDBValidationItem>
                </MDBValidation>
            </MDBAccordionItem>
        </MDBAccordion>
    );
}

export default EmployeeRegistration;
