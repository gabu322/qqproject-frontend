import React from 'react';
import {
	MDBInput,
	MDBBtn
} from 'mdb-react-ui-kit';

const Singin = () => {
	return (
		<div className='main shadow-5 text-dark'>
			<img src='/logo.png' className='img-fluid mb-4' alt='...' />
			<div className='inputs'>
				<form>
					<MDBInput className='mb-3' type='text' label='Matrícula' />
					<MDBInput className='mb-3' type='email' label='Email' />
					<MDBInput className='mb-3' type='password' label='Senha' />
					<MDBInput className='mb-3' type='password' label='Confirmar Senha' />

					<MDBBtn type='submit' color='success' block>
						COMPLETAR CADASTRO
					</MDBBtn>
				</form>
			</div>
		</div>
	);
}

export default Singin;
