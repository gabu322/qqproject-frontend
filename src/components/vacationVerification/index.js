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

const VacationVerification = (props) => {


    let vacationData = props.vacationData
    let employeeData = props.employeeData.find(actualEmployee => actualEmployee.id === vacationData.employeeId)
    const [formValue, setFormValue] = useState({
        id: vacationData.id,
        startDate: vacationData.startDate,
        endDate: vacationData.endDate,
        description: vacationData.description,
        state: vacationData.state
    });
    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };
    const vacationStartDate = new Date(vacationData.startDate)
    const vacationEndDate = new Date(vacationData.endDate)

    async function acceptVacation() {
        formValue.state = 'Accepted'
        axios.put("http://localhost:3001/vacation/" + formValue.id, formValue)
    }

    async function denyVacation() {
        formValue.state = 'Denied'
        await axios.get("http://localhost:3001/getEmployeeById/" + employeeData.id).then((response) => {
            response.data.vacationDaysLeft += (vacationEndDate.getDate() - vacationStartDate.getDate()) + 1
            axios.put("http://localhost:3001/employeeRegistration/" + response.data.employeeId, response.data)
            axios.put("http://localhost:3001/vacation/" + formValue.id, formValue)
        })
    }


    return (
        <MDBAccordion initialActive={0} className='accorditionClass' key={props.key}>
            <MDBAccordionItem collapseId={2} headerTitle={
                <>{employeeData.name} - Férais de {vacationStartDate.getDate() + 1}/{(vacationStartDate.getMonth() + 1) < 10 ? ("0" + (vacationStartDate.getMonth() + 1)) : vacationStartDate.getMonth() + 1}/{vacationStartDate.getFullYear()} a {vacationEndDate.getDate() + 1}/{(vacationEndDate.getMonth() + 1) < 10 ? ("0" + (vacationEndDate.getMonth() + 1)) : vacationEndDate.getMonth() + 1}/{vacationEndDate.getFullYear()}</>} headerClassName='accordionHeader'>
                <MDBValidation className='row g-3'>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput name='name' label='Nome completo' readOnly onChange={onChange} value={employeeData.name} />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput name='startDate' label='Data de início das férias' readOnly onChange={onChange} value={formValue.startDate} />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-4'>
                        <MDBInput name='endDate' label='Data de fim das férias' readOnly onChange={onChange} value={formValue.endDate} />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-8'>
                        <MDBInput name='description' label='Descrição' onChange={onChange} value={formValue.description} disabled={formValue.state === "Accepted" || formValue.state === "Denied" ? true : false}/>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-2 d-grid'>
                        <MDBBtn type='reset' color='success' onClick={acceptVacation} disabled={formValue.state === "Accepted" || formValue.state === "Denied" ? true : false}>Aceitar férias</MDBBtn>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-2 d-grid'>
                        <MDBBtn type='reset' color='danger' onClick={denyVacation} disabled={formValue.state === "Accepted" || formValue.state === "Denied" ? true : false}>Negar férias</MDBBtn>
                    </MDBValidationItem>
                </MDBValidation>
            </MDBAccordionItem>
        </MDBAccordion>
    );
}

export default VacationVerification;
