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

    async function acceptVacation() {
        formValue.state = 'Accepted'
        //setFormValue({...formValue, state: 'Accepted'})
        console.log(formValue)
        axios.put("http://localhost:3001/vacation/" + formValue.id, formValue)
    }

    async function denyVacation() {
        formValue.state = 'Denied'
        //setFormValue({...formValue, state: 'Accepted'})
        console.log(formValue)
        axios.put("http://localhost:3001/vacation/" + formValue.id, formValue)
    }

    return (
        <MDBAccordion initialActive={0} className='accorditionClass' key={props.key}>
            <MDBAccordionItem collapseId={2} headerTitle={<>{employeeData.name} - {employeeData.employeeId} - Férais de {vacationData.startDate} a {vacationData.endDate}</>} headerClassName='accordionHeader'>
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
                        <MDBInput name='description' label='Descrição' onChange={onChange} value={formValue.description} />
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-2 d-grid'>
                        <MDBBtn type='reset' color='success' onClick={acceptVacation}>Aceitar férias</MDBBtn>
                    </MDBValidationItem>
                    <MDBValidationItem className='col-md-2 d-grid'>
                        <MDBBtn type='reset' color='danger' onClick={denyVacation}>Negar férias</MDBBtn>
                    </MDBValidationItem>
                </MDBValidation>
            </MDBAccordionItem>
        </MDBAccordion>
    );
}

export default VacationVerification;
