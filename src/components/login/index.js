import React from 'react';
import {
	MDBInput,
	MDBCol,
	MDBRow,
	MDBCheckbox,
	MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    let doSingin = useNavigate();
    function goToSingin() {
        doSingin('/singin')
    }

    let doLogin = useNavigate();
    function goToMain() {
        doLogin('/callendar')
    }

	return (
		<div className='main shadow-5 text-dark'>
			<img src='/logo.png' className='img-fluid mb-4' alt='...' />
			<div className='inputs'>
				<form>
					<MDBInput className='mb-4' type='email' label='Email ou matrícula' />
					<MDBInput className='mb-4' type='password' label='Senha' />

					<MDBRow className='mb-4'>
						<MDBCol className='d-flex justify-content-center'>
							<MDBCheckbox label='Continuar conectado' defaultChecked />
						</MDBCol>
						<MDBCol className='d-flex justify-content-center'>
							<a href='#!'>Esqueceu sua senha?</a>
						</MDBCol>
					</MDBRow>

					<MDBBtn type='submit' color='success' block onClick={goToMain}>
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
	);
}

export default Login;
