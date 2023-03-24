import React, { useState } from 'react';
import axios from 'axios';
import {
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const SinginScreen = () => {
    const [formValue, setFormValue] = useState({
        name: '',
        employeeId: '',
        password: '',
        cpf_cnpj: '',
        businessEmail: '',
        personalEmail: '',
        contractType: '',
        isManager: 'false',
        permissionEditEmployeeRegistration: 'false',
        lastThirtheenth: '2000-01-01',
        vacationDaysLeft: '0',
        admissionDate: '2000-01-01',
    });
    const onChange = (e) => {setFormValue({ ...formValue, [e.target.name]: e.target.value })};



    function registerEmployee() {
        axios.post("http://localhost:3001/singin", formValue)
    }
    return (
        <div className='main shadow-5 text-dark'>
            <img src='/logo.png' className='img-fluid mb-4' alt='...' />
            <div className='inputs'>
                <form>
                    <MDBInput className='mb-3' onChange={onChange} value={formValue.name} name='name' type='text' label='Nome completo*' />
                    <MDBInput className='mb-3' onChange={onChange} value={formValue.employeeId} name='employeeId' type='text' label='Matrícula*' />
                    <MDBInput className='mb-3' onChange={onChange} value={formValue.cpf_cnpj} name='cpf_cnpj' type='text' label='CPF/CNPJ*' />
                    <MDBInput className='mb-3' onChange={onChange} value={formValue.businessEmail} name='businessEmail' type='email' label='Email empresarial *' />
                    <MDBInput className='mb-3' onChange={onChange} value={formValue.personalEmail} name='personalEmail' type='email' label='Email pessoal' />
                    <MDBInput className='mb-3' onChange={onChange} value={formValue.password} name='password' type='password' label='Senha *' />
                    <MDBInput className='mb-3' type='password' label='Confirmar Senha *' />

                    <Link to="/">
                        <MDBBtn color='success' onClick={registerEmployee} block type='submit'>COMPLETAR CADASTRO</MDBBtn>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default SinginScreen;
