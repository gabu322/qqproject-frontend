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
    //let teste = moment(employee.admissionDate, "YYYY-dd-mm").fromNow()

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

    const [vacationRelations, setVacationRelations] = useState({
        anyPendingVacation: false,
        pendingVacationIndex: -1,
        anyActiveVacation: false,
        aciveVacationIndex: -1,
        fifteenthPeriodDone: false,
        earlyestVacation: ''
    });

    const [vacationList, setVacationList] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/vacation/" + employee.id).then((response) => {
            setVacationList(response.data);
            let prevHighestTime = 730
            response.data.map((vacation) => {
                if (vacation.state === "Unread") {
                    vacationRelations.anyPendingVacation = true;
                    vacationRelations.pendingVacationIndex = vacation;
                }
                if (vacation.state === "Accepted") {
                    vacationRelations.anyActiveVacation = true;
                    vacationRelations.aciveVacationIndex = vacation;
                }
                let startingDate = new Date(vacation.startDate);
                let endingDate = new Date(vacation.endDate);
                if ((Math.ceil((endingDate.getTime() - startingDate.getTime()) / (1000 * 3600 * 24))) >= 15) {
                    vacationRelations.fifteenthPeriodDone = true
                }
                if(vacation.state === 'Accepted' && (Math.ceil((today.getTime() - endingDate.getTime()) / (1000 * 3600 * 24)) < prevHighestTime)) {
                    prevHighestTime = Math.ceil((today.getTime() - endingDate.getTime()) / (1000 * 3600 * 24))
                    vacationRelations.earlyestVacation = vacation
                }
            })
            if(prevHighestTime >= 300) {
                axios.get("http://localhost:3001/notification/" + employee.id).then((response) => {
                    let thirteenthNotification = false
                    response.data.map((notificationData) => {
                        let sentDate = new Date(notificationData.sentDate)
                        let timeUntilNow = Math.ceil((today.getTime() - sentDate.getTime()) / (1000 * 3600 * 24))
                        if(timeUntilNow <= 60 && notificationData.text === "Você está prestes a acumular período de férias") {
                            thirteenthNotification = true
                                console.log(today)
                                console.log(sentDate)
                        }
                    })
                    if(!thirteenthNotification) {
                        axios.post("http://localhost:3001/notification", {
                            employeeId: employee.id,
                            sentDate: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDay(),
                            state: "Unread",
                            text: "Você está prestes a acumular período de férias"
                        })

                    }
                })

            }
        })
    }, [])


    const [openVacationRequest, setopenVacationRequest] = useState(true);
    const toggleShow = () => setopenVacationRequest(!openVacationRequest);

    const dateTest = new Date(vacationRelations.pendingVacationIndex.startDate);
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

    const [daysFromAdmissionDate, setDaysFromAdmissionDate] = useState()
    useEffect(() => {
        const employeeStartDate = new Date(employee.admissionDate);
        setDaysFromAdmissionDate(Math.ceil((today.getTime() - employeeStartDate.getTime()) / (1000 * 3600 * 24)));

    }, [])


    async function requestVacation() {
        document.getElementById("vacationRequestError").innerText = '';

        let startingDate = new Date(vacationRequestForm.startDate);
        let endingDate = new Date(vacationRequestForm.endDate);
        let totalVacationTime = Math.ceil((endingDate.getTime() - startingDate.getTime()) / (1000 * 3600 * 24));

        let vacationCorrect = true

        if ((Math.ceil((startingDate.getTime() - today.getTime()) / (1000 * 3600 * 24))) <= 0) {
            document.getElementById("vacationRequestError").innerText = 'Escolha uma data a partir de hoje'
            vacationCorrect = false
        }
        if ((Math.ceil((endingDate.getTime() - startingDate.getTime()) / (1000 * 3600 * 24))) <= 0) {
            vacationCorrect = false
            document.getElementById("vacationRequestError").innerText = 'Escolha uma data final correta'
        }

        if (totalVacationTime !== 5 && totalVacationTime !== 10 && totalVacationTime !== 15 && totalVacationTime !== 20 && totalVacationTime !== 30) {
            document.getElementById("vacationRequestError").innerText = 'Escolha uma duração de 5, 10, 15, 20 ou 30 dias'
            vacationCorrect = false;
        }
        if (totalVacationTime > employee.vacationDaysLeft) {
            document.getElementById("vacationRequestError").innerText = 'Você não possui dias de férias suficientes'
            vacationCorrect = false;
        }


        if (!vacationRelations.fifteenthPeriodDone && (employee.vacationDaysLeft - totalVacationTime) <= 15 && totalVacationTime < 15) {
            document.getElementById("vacationRequestError").innerText = 'Período de 15 dias não realizado, férias inválida'
            vacationCorrect = false;
        }


        //console.log((Math.ceil((startingDate.getTime() - today.getTime()) / (1000 * 3600 * 24))))
        if (vacationCorrect) {
            await axios.post("http://localhost:3001/vacation", vacationRequestForm)
            employee.vacationDaysLeft = employee.vacationDaysLeft - totalVacationTime

            //setEmployee(employee => ({...employee, vacationDaysLeft: employee.vacationDaysLeft - totalVacationTime}))
            await axios.put("http://localhost:3001/employeeRegistration/" + employee.employeeId, employee)
            sessionStorage.setItem('user', JSON.stringify(employee))
            window.location.reload(false)
        }
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
                    {employee.isManager ?
                        <Fragment>
                            <hr />
                            <MDBBtn className="fullButton" color="success" onClick={goToEmployeeRegistration}>Página principal</MDBBtn>
                            <MDBBtn className="fullButton" color="success" onClick={goToVacationPage}>Verificação de férias</MDBBtn>
                            <MDBBtn className="fullButton" color="success" onClick={goToCallendar}>Calendário</MDBBtn>
                        </Fragment>
                        : ''}
                    {daysFromAdmissionDate >= 365
                        ? <Fragment>
                            <hr />
                            <div className="vacationInfo">
                                <div className="vacationDaysLeftSection shadow-3 mb-3">

                                    <div>Dias de férias restentes</div>
                                    <div className="vacationDaysLeft" id={vacationRelations.anyPendingVacation ? 'yellow' : (employee.vacationDaysLeft > 0 ? 'green' : 'red')}>&nbsp; {employee.vacationDaysLeft} dias &nbsp;</div>
                                </div>
                                <div className="vacationRequestList mb-3">
                                    {vacationRelations.anyPendingVacation
                                        ? <div className='pendingVacation mb-3'>Férias planejadas de  x a x, esperando a verificação do gerente</div>
                                        : "Sem férias solicitadas no momento"}
                                    {vacationRelations.anyActiveVacation
                                        ? <div className='activeVacation mb-3'>
                                            Férias planejadas de  x a x, esperando a verificação do gerente
                                        </div>
                                        : ""}

                                </div>
                                <div className={openVacationRequest ? 'vacationRequestSection closed' : 'vacationRequestSection mb-3'}>
                                    <div className='requestVacation'>
                                        <div className='dates'>
                                            <div className='buttonSizing'><MDBInput value={vacationRequestForm.startDate} onChange={onChange} name='startDate' label='Início' type='date' className='initialDate mb-4' /></div>
                                            <div className='buttonSizing'><MDBInput value={vacationRequestForm.endDate} onChange={onChange} name='endDate' label='Fim' type='date' /></div>

                                            <div id='vacationRequestError'></div>
                                        </div>
                                        <MDBBtn className='requestButton ' color="success" onClick={requestVacation} >Solicitar férias</MDBBtn>
                                    </div>
                                </div>
                                {openVacationRequest ?
                                    <MDBBtn className="vacationRequestButton" color="success" onClick={toggleShow} disabled={vacationRelations.anyPendingVacation ? true : false}>{vacationRelations.anyPendingVacation ? 'Férias em análise' : 'Realizar solicitação de férias'}</MDBBtn>
                                    :
                                    <MDBBtn className="vacationRequestButton" color="danger" onClick={toggleShow}>Fechar solicitação</MDBBtn>
                                }

                            </div>
                        </Fragment>
                        : ''
                    }
                    {employee.contractType === 'CLT' ?
                        <><hr />
                            <div className="bonusSallaryInfo">
                                <div className="bonusSallaryFeedback">Sem solicitações de 13º no momento</div>
                                <MDBBtn className="bonusSallaryRequestButton" color="success" onClick={() => console.log(axios.get("http://localhost:3001/notification/" + employee.employeeId))}>Solicitar 13º</MDBBtn>
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