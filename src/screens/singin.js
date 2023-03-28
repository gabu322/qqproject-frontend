import React, { useState } from 'react';
import axios from 'axios';
import {
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const SinginScreen = () => {
    const [formValue, setFormValue] = useState({
        name: '',
        employeeId: '',
        password: '',
        cpf_cnpj: '',
        businessEmail: '',
        personalEmail: '',
        isManager: false,
        permissionEditEmployeeRegistration: false
    });
    const onChange = (e) => { setFormValue({ ...formValue, [e.target.name]: e.target.value }) };

    const navigate = useNavigate();
    function registerEmployee(event) {
        document.getElementById('nameError').innerText = '';
        document.getElementById('employeeIdError').innerText = '';
        document.getElementById('cpf_cnpjError').innerText = '';
        document.getElementById('businessEmailError').innerText = '';
        document.getElementById('passwordError').innerText = '';
        if (document.getElementById('nameConfirmation').value === '') {document.getElementById('nameError').innerText = 'Escreva seu nome para cadastrar'}
        if (document.getElementById('employeeIdConfirmation').value === '') {document.getElementById('employeeIdError').innerText = 'Escreva seu CPF/CNPJ para cadastrar'}
        if (document.getElementById('cpf_cnpjConfirmation').value ==='') {document.getElementById('cpf_cnpjError').innerText = 'Escreva seu CPF/CNPJ para cadastrar'}
        if (document.getElementById('businessEmailConfirmation').value === '') {document.getElementById('businessEmailError').innerText = 'Escreva seu email para cadastrar'}
        if (document.getElementById('passwordConfirmation').value === formValue.password &&
            formValue.name !== '' &&
            formValue.employeeId !== '' &&
            formValue.password !== '' &&
            formValue.cpf_cnpj !== '' &&
            formValue.businessEmail !== '' &&
            formValue.personalEmail !== ''
            ) {
            navigate('/')
            axios.post("http://localhost:3001/singin", formValue)

        } else {
            document.getElementById('passwordError').innerText = 'Senha inválida ou diferente da confirmação'
        }
        event.preventDefault();
    }

    return (
        <div className='fullScreenBase'>

            <div className='loginComponent shadow-5 text-dark'>
                <img src='/logo.png' className='img-fluid mb-4' alt='...' />
                <div className='inputs'>
                    <form>
                        <MDBInput className='mb-4' onChange={onChange} value={formValue.name} name='name' type='text' label='Nome completo*' id='nameConfirmation'>
                            <div id='nameError' className='error' ></div>
                        </MDBInput>
                        <MDBInput className='mb-4' onChange={onChange} value={formValue.employeeId} name='employeeId' type='text' label='Matrícula*' id='employeeIdConfirmation'>
                            <div id='employeeIdError' className='error' ></div>
                        </MDBInput>
                        <MDBInput className='mb-4' onChange={onChange} value={formValue.cpf_cnpj} name='cpf_cnpj' type='text' label='CPF/CNPJ*' id='cpf_cnpjConfirmation'>
                            <div id='cpf_cnpjError' className='error' ></div>
                        </MDBInput>
                        <MDBInput className='mb-4' onChange={onChange} value={formValue.businessEmail} name='businessEmail' type='email' label='Email empresarial*' id='businessEmailConfirmation'>
                            <div id='businessEmailError' className='error' ></div>
                        </MDBInput>
                        <MDBInput className='mb-4' onChange={onChange} value={formValue.personalEmail} name='personalEmail' type='email' label='Email pessoal' />
                        <MDBInput className='mb-4' onChange={onChange} value={formValue.password} name='password' type='password' label='Senha*'>
                            <div id='passwordError' className='error' ></div>
                        </MDBInput>
                        <MDBInput className='mb-4' type='password' label='Confirmar Senha*' id='passwordConfirmation' />

                    </form>
                    <MDBBtn color='success' className='mb-3' onClick={registerEmployee} block >COMPLETAR CADASTRO</MDBBtn>
                </div>
            </div>
        </div>

    );
}

export default SinginScreen;
