import React from 'react';
import {
	MDBInput,
	MDBCol,
	MDBRow,
	MDBCheckbox,
	MDBBtn
} from 'mdb-react-ui-kit';
import './App.css'

export default function App() {
	return (
		<div className='main shadow-5 text-dark'>
			<img src='/logo.png' className='img-fluid mb-4' alt='...' />
			<div className='inputs'>
				<form>
					<MDBInput className='mb-4' type='email' id='form1Example1' label='Email ou matrícula' />
					<MDBInput className='mb-4' type='password' id='form1Example1' label='Senha' />

					<MDBRow className='mb-4'>
						<MDBCol className='d-flex justify-content-center'>
							<MDBCheckbox id='form1Example3' label='Continuar conectado' defaultChecked />
						</MDBCol>
						<MDBCol className='d-flex justify-content-center'>
							<a href='#!'>Esqueceu sua senha?</a>
						</MDBCol>
					</MDBRow>

					<MDBBtn type='submit' color='success' block>
						Logar
					</MDBBtn>
				</form>
				<hr></hr>
				<MDBBtn block color='success' tag='a' href='#'>
					Cadastrar-se
				</MDBBtn>
			</div>
		</div>
	);
}
