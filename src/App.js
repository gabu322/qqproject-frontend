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
    <div className='testing shadow-5 text-dark'>
      <img src='/logo.png' className='img-fluid' alt='...' />
      <form>
        <MDBInput className='mb-4' type='email' id='form1Example1' label='Email address' />


        <MDBRow className='mb-4 flex-column'>
          <MDBCol>
          <MDBInput className='mb-4' type='password' id='form1Example2' label='Password' />

          </MDBCol>
          <MDBCol className='d-flex justify-content-end'>
            <a href='#!'>Forgot password?</a>
          </MDBCol>
        </MDBRow>

        <MDBBtn type='submit' block color='success'>
          LOG IN
        </MDBBtn>
      </form>
      <hr></hr>
      <MDBBtn block color='success' tag='a' href='#'>
          Cadastrar-se
        </MDBBtn>

    </div>
  );
}
