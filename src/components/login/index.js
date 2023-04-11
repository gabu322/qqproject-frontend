import React from 'react';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    let employee = '';

    let navigate = useNavigate();
    const goToSingin = () => {
        navigate('/singin')
    }

    async function doLogin(event) {
        event.preventDefault();

        let loginValue = document.getElementById('login').value;
        document.getElementById('loginError').innerText = '';
        document.getElementById('passwordError').innerText = '';
        if (loginValue !== '') {
            await axios.get("http://localhost:3001/login/email/" + document.getElementById('login').value).then((response) => {
                employee = response.data;
            });

            if (employee == null) {
                await axios.get("http://localhost:3001/login/id/" + document.getElementById('login').value).then((response) => {
                    employee = response.data;
                });
            }

            if (employee == null) {
                document.getElementById('loginError').innerText = 'Email ou matrícula não encontrado'
            } else if (document.getElementById('password').value == employee.password) {
                sessionStorage.setItem('user', JSON.stringify(employee))

                navigate('/callendar')

            } else {
                document.getElementById('passwordError').innerText = 'Senha incorreta';
            }

        } else {
            document.getElementById('loginError').innerText = 'Campo vazio, preencha para entrar'
        }
    }


    return (
        <div className='fullScreenBase'>
            <div className='loginComponent shadow-5 text-dark'>
                <img src='/logo.png' className='img-fluid mb-4' alt='...' />
                <div className='inputs'>
                    <form>
                        <MDBInput id='login' className='mb-4' type='text' label='Email ou matrícula' >
                            <div id='loginError' className='error' ></div>
                        </MDBInput>
                        <MDBInput id='password' className='mb-4' type='password' label='Senha'  >
                            <div id='passwordError' className='error' ></div>
                        </MDBInput>
                        <MDBRow className='mb-4'>
                            <MDBCol className='d-flex justify-content-center'>
                                <MDBCheckbox label='Continuar conectado' defaultChecked />
                            </MDBCol>
                            <MDBCol className='d-flex justify-content-center'>
                                <a href='#!'>Esqueceu sua senha?</a>
                            </MDBCol>
                        </MDBRow>

                        <MDBBtn type='submit' color='success' block onClick={doLogin}>
                            Logar
                        </MDBBtn>
                    </form>
                    <hr></hr>
                    <MDBBtn block color='success' tag='a'
                        onClick={goToSingin}>
                        Cadastrar-se
                    </MDBBtn>
                </div>
            </div>
        </div>

    );
}

export default Login;
