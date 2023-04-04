import React, { useEffect, useState } from 'react';
import {
    MDBAccordion,
    MDBAccordionItem,
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
        vacationDaysLeft: employeeData.vacationDaysLeft === null ? '' : employeeData.vacationDaysLeft,
        admissionDate: employeeData.admissionDate === null ? '' : employeeData.admissionDate
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

    async function updateEmployee() {
        let checkForm = false;

        if(formValue.name === "") {
            document.getElementsByName('nameError' + formValue.employeeId)[0].innerText = 'Nome completo (campo vazio)';
            checkForm = true;
        } else {
            document.getElementsByName('nameError' + formValue.employeeId)[0].innerText = '';
        }
        if(formValue.employeeId === "") {
            document.getElementsByName('employeeIdError' + formValue.employeeId)[0].innerText = 'Matrícula (campo vazio)';
            checkForm = true;
        } else {
            document.getElementsByName('employeeIdError' + formValue.employeeId)[0].innerText = '';
        }
        if(formValue.cpf_cnpj === "") {
            document.getElementsByName('cpf_cnpjError' + formValue.employeeId)[0].innerText = 'CPF/CNPJ (campo vazio)';
            checkForm = true;
        } else {
            document.getElementsByName('cpf_cnpjError' + formValue.employeeId)[0].innerText = '';
        }
        if(formValue.businessEmail === "") {
            document.getElementsByName('businessEmailError' + formValue.employeeId)[0].innerText = 'Email empresarial (campo vazio)';
            checkForm = true;
        } else {
            document.getElementsByName('businessEmailError' + formValue.employeeId)[0].innerText = '';
        }

        if(formValue.personalEmail === "") {
            document.getElementsByName('personalEmailError' + formValue.employeeId)[0].innerText = 'Email pessoal (campo vazio)';
            checkForm = true;
        } else {
            document.getElementsByName('personalEmailError' + formValue.employeeId)[0].innerText = '';
        }
        if(formValue.admissionDate === "") {
            document.getElementsByName('admissionDateError' + formValue.employeeId)[0].innerText = 'Data de contratação (campo vazio)';
            checkForm = true;
        } else {
            document.getElementsByName('admissionDateError' + formValue.employeeId)[0].innerText = '';
        }
        if(formValue.vacationDaysLeft === "") {
            document.getElementsByName('vacationDaysLeftError' + formValue.employeeId)[0].innerText = 'Dias de férias restantes (campo vazio)';
            checkForm = true;
        } else {
            document.getElementsByName('vacationDaysLeftError' + formValue.employeeId)[0].innerText = '';
        }
        if(!checkForm) {
            console.log(formValue)
            if(typeof(formValue.managerId) == 'string') {
                await axios.get("http://localhost:3001/employeeRegistration/managers/" + formValue.managerId).then((response => {
                    formValue.managerId = response.data.id
                }))
            }
            if(formValue.lastThirtheenth === '') {
                formValue.lastThirtheenth = null
            }
            await axios.put("http://localhost:3001/employeeRegistration/" + formValue.employeeId, formValue)
        }
    }

    return (
        <MDBAccordion initialActive={0} className='accorditionClass' key={props.key}>
            <MDBAccordionItem collapseId={2} headerTitle={<>{employeeData.name} - {employeeData.employeeId}</>} headerClassName='accordionHeader'>
                <MDBValidation className='row g-3'>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput value={formValue.name} name='name' onChange={onChange} label='Nome completo'>
                            <div id='error' name={'nameError' + formValue.employeeId}/>
                        </MDBInput>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput value={formValue.employeeId} name='employeeId' onChange={onChange} label='Matricula'>
                            <div id='error' name={'employeeIdError' + formValue.employeeId}/>
                        </MDBInput>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput value={formValue.cpf_cnpj} name='cpf_cnpj' onChange={onChange} label='CPF/CNPJ'>
                            <div id='error' name={'cpf_cnpjError' + formValue.employeeId}/>
                        </MDBInput>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput value={formValue.businessEmail} name='businessEmail' onChange={onChange} label='Email empresarial'>
                            <div id='error' name={'businessEmailError' + formValue.employeeId}/>
                        </MDBInput>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput value={formValue.personalEmail} name='personalEmail' onChange={onChange} label='Email pessoal'>
                            <div id='error' name={'personalEmailError' + formValue.employeeId}/>
                        </MDBInput>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4 d-flex align-items-center justify-content-center'>
                        <MDBCheckbox name='isManager' onChange={() => { formValue.permissionEditEmployeeRegistration = !formValue.permissionEditEmployeeRegistration }} label='Permissão para editar cadastro de funcionário' defaultChecked={formValue.permissionEditEmployeeRegistration}/>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput value={formValue.admissionDate} name='admissionDate' onChange={onChange} label='Data de contratação' type='date'>
                            <div id='error' name={'admissionDateError' + formValue.employeeId}/>
                        </MDBInput>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput value={formValue.lastThirtheenth} name='lastThirtheenth' onChange={onChange} label='Data do último 13º solicitado' type='date'/>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-2 d-flex align-items-center justify-content-center'>
                        <MDBCheckbox name='isManager'
                            onChange={() => { formValue.isManager = !formValue.isManager }} id='isManagerCheckbox' label='Cargo de Gestor' defaultChecked={formValue.isManager}/>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-2 d-flex align-items-center justify-content-around'>
                        <MDBRadio value={"CLT"} labelClass={'contractTypeCLT' + formValue.employeeId} name='contractType' label='CLT' onChange={onChange} defaultChecked={formValue.contractType === 'CLT' ? true : false}/>
                        <MDBRadio value={"PJ"} labelId={'contractTypePJ' + formValue.employeeId} name='contractType' label='PJ' onChange={onChange} defaultChecked={formValue.contractType === 'PJ' ? true : false}/>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput value={formValue.vacationDaysLeft} name='vacationDaysLeft' onChange={onChange} label='Dias de férias restantes'>
                            <div id='error' name={'vacationDaysLeftError' + formValue.employeeId}/>
                        </MDBInput>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput name='managerId' onChange={onChange} id='managerList' label='Gerente' list='possibleManagers' />
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
