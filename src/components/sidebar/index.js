import axios from 'axios';
import {
    MDBBtn,
    MDBInput
} from 'mdb-react-ui-kit';
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../sass/style.css';

const Sidebar = () => {
    const [employee, setEmployee] = useState(JSON.parse(sessionStorage.user))


    let logOut = useNavigate();
    function doLogout() { logOut('/') }

    let toEmployeeRegistration = useNavigate();
    function goToEmployeeRegistration() { toEmployeeRegistration('/employeeRegistration') }

    let toVacation = useNavigate();
    function goToVacationPage() { toVacation('/vacation') }

    let toCallendar = useNavigate();
    function goToCallendar() { toCallendar('/callendar') }


    const [sidebarOpen, setSidebarOpen] = useState(false);
    const handleViewSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const [vacationList, setVacationList] = useState();
    useEffect(() => {
        axios.get("http://localhost:3001/vacation/" + employee.id).then((response) => {
            setVacationList(response.data);
        })
    }, [])


    const [basicModal, setBasicModal] = useState(true);
    const toggleShow = () => setBasicModal(!basicModal);


    const today = new Date();
    const [vacationRequestForm, setVacationRequestForm] = useState({
        employeeId: JSON.parse(sessionStorage.getItem('user')).id,
        requestDate: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
        startDate: '',
        endDate: '',
        state: 'Unread',
        description: ''
    })
    const onChange = (e) => { setVacationRequestForm({ ...vacationRequestForm, [e.target.name]: e.target.value }) };

    const show = () => {
        axios.post("http://localhost:3001/vacation", vacationRequestForm)
    }
    return (
        <Fragment>
            <div className={sidebarOpen ? "sidebarBase open" : "sidebarBase"}>

                <div className="outsideBlur" />

                <button className="sidebarButton" onClick={handleViewSidebar}>
                    <div className="bar2" />
                    <div className="bar1" />
                    <div className="bar3" />
                </button>
                <div className="insideContent">
                    <div className="identification">

                        <div className="naming">
                            <div className="employeeName">
                                {employee.name}
                            </div>
                            <div className="employeeId">{employee.employeeId}</div>
                        </div>
                    </div>
                    <hr />
                    {employee.isManager ?
                        <Fragment>
                            <MDBBtn className="fullButton" color="success" onClick={goToEmployeeRegistration}>Página principal</MDBBtn>
                            <MDBBtn className="fullButton" color="success" onClick={goToVacationPage}>Verificação de férias</MDBBtn>
                            <MDBBtn className="fullButton" color="success" onClick={goToCallendar}>Calendário</MDBBtn>
                            <hr />
                        </Fragment>
                        : ''}
                    <div className="vacationInfo">
                        <div className="vacationDaysLeftSection shadow-3 mb-3">

                            <div>Dias de férias restentes</div>
                            <div className="vacationDaysLeft" id={employee.vacationDaysLeft > 0 ? 'green' : 'red'}>&nbsp; {employee.vacationDaysLeft} dias &nbsp;</div>
                        </div>
                        <div className="vacationRequestList mb-3">
                            Sem férias solicitadas no momento
                        </div>
                        <div className={basicModal ? 'vacationRequestSection closed' : 'vacationRequestSection mb-3'}>
                            <div className='requestVacation'>
                                <div className='dates'>
                                    <div className='buttonSizing'><MDBInput value={vacationRequestForm.startDate} onChange={onChange} name='startDate' label='Início' type='date' className='initialDate mb-3' /></div>
                                    <div className='buttonSizing'><MDBInput value={vacationRequestForm.endDate} onChange={onChange} name='endDate' label='Fim' type='date' /></div>

                                </div>
                                <MDBBtn className='requestButton' color="success" onClick={show}>Solicitar férias</MDBBtn>
                            </div>
                        </div>
                        {basicModal ?
                            <MDBBtn className="vacationRequestButton" color="success" onClick={toggleShow}>Realizar solicitação de férias</MDBBtn>
                            :
                            <MDBBtn className="vacationRequestButton" color="danger" onClick={toggleShow}>Fechar solicitação</MDBBtn>
                        }

                    </div>
                    {employee.contractType === 'CLT' ?
                        <><hr />
                            <div className="bonusSallaryInfo">
                                <div className="bonusSallaryFeedback">Sem solicitações de 13º no momento</div>
                                <MDBBtn className="bonusSallaryRequestButton" color="success" onClick={() => vacationList.map((value) => {
                                    console.log(value)
                                })}>Solicitar 13º</MDBBtn>
                            </div>
                        </> : ''
                    }
                    <MDBBtn color="danger" className="logoutButton" onClick={doLogout}>
                        Sair
                    </MDBBtn>

                </div>
            </div>
        </Fragment>
    );
}


export default Sidebar;
