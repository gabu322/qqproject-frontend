import axios from 'axios';
import {
    MDBBtn,
    MDBInput
} from 'mdb-react-ui-kit';
import React, { Fragment, useCallback, useEffect, useState } from "react";
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
        axios.get("http://localhost:3001/vacations/" + employee.id).then((response) => {
            setVacationList(response.data);
            let prevHighestTime;
            if (response.data.length === 0) {
                prevHighestTime = 0
            } else {
                prevHighestTime = 730
            }
            response.data.map((vacation) => {
                let startingDate = new Date(vacation.startDate);
                let endingDate = new Date(vacation.endDate);
                if (vacation.state === "Unread") {
                    vacationRelations.anyPendingVacation = true;
                    vacationRelations.pendingVacationIndex = vacation;
                }
                if (vacation.state === "Accepted" && endingDate > today) {
                    vacationRelations.anyActiveVacation = true;
                    vacationRelations.aciveVacationIndex = vacation;
                }
                if ((Math.ceil((endingDate.getTime() - startingDate.getTime()) / (1000 * 3600 * 24))) >= 15) {
                    vacationRelations.fifteenthPeriodDone = true
                }
                if (vacation.state === 'Accepted' && (Math.ceil((today.getTime() - endingDate.getTime()) / (1000 * 3600 * 24)) < prevHighestTime)) {
                    prevHighestTime = Math.ceil((today.getTime() - endingDate.getTime()) / (1000 * 3600 * 24))
                    vacationRelations.earlyestVacation = vacation
                }
            })
            if (prevHighestTime >= 300) {
                axios.get("http://localhost:3001/notification/" + employee.id).then((response) => {
                    let vacationTimeExpiring = true
                    response.data.map((notificationData) => {
                        let sentDate = new Date(notificationData.sentDate)
                        let timeUntilNow = Math.ceil((today.getTime() - sentDate.getTime()) / (1000 * 3600 * 24))
                        if (timeUntilNow <= 60 && notificationData.text === "Atenção! Você está prestes a acumular período de férias, converse com seu gerente ou realize uma solicitação de férias") {
                            vacationTimeExpiring = false
                        }
                    })
                    if (vacationTimeExpiring) {
                        axios.post("http://localhost:3001/notification", {
                            employeeId: employee.id,
                            sentDate: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
                            state: "Unread",
                            text: "Atenção! Você está prestes a acumular período de férias, converse com seu gerente ou realize uma solicitação de férias"
                        })
                        axios.post("http://localhost:3001/notification", {
                            employeeId: employee.managerId,
                            sentDate: today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
                            state: "Unread",
                            text: "Atenção! Seu funcionário " + employee.name + " está prestes a acumular período de férias"
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
        let totalVacationTime = Math.ceil((endingDate.getTime() - startingDate.getTime()) / (1000 * 3600 * 24)) + 1;

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


        if (vacationCorrect) {
            await axios.post("http://localhost:3001/vacation", vacationRequestForm)

            employee.vacationDaysLeft = employee.vacationDaysLeft - totalVacationTime
            await axios.put("http://localhost:3001/employeeRegistration/" + employee.employeeId, employee)
            sessionStorage.setItem('user', JSON.stringify(employee))
            //setEmployee(employee)
            await axios.post("http://localhost:8000/workplace", {
                name: employee.name,
                start: (startingDate.getDate() + 1) + "/" + ((startingDate.getMonth() + 1) < 10 ? ("0" + (startingDate.getMonth() + 1)) : (startingDate.getMonth() + 1)) + "/" + startingDate.getFullYear(),
                end: (endingDate.getDate() + 1) + "/" + ((endingDate.getMonth() + 1) < 10 ? ("0" + (endingDate.getMonth() + 1)) : (endingDate.getMonth() + 1)) + "/" + endingDate.getFullYear()
            }).then((response) => { console.log(response.data) })
            window.location.reload(false)
        }
    }

    const generateReport = () => {
        axios.get(`http://localhost:8000/generateReport`, { responseType: 'blob' })
            .then(response => {
                console.log(response)
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'report.csv');
                document.body.appendChild(link);
                link.click();
            });
    };

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
                    {employee.isManager || employee.permissionEditEmployeeRegistration ?
                        <Fragment>
                            <hr />
                            <MDBBtn className="fullButton" color="success" onClick={goToCallendar}>Calendário</MDBBtn>
                            {employee.isManager ? <><MDBBtn className="fullButton" color="success" onClick={goToVacationPage}>Verificação de férias</MDBBtn><MDBBtn className="fullButton" color="success" onClick={generateReport}>Gerar relatório</MDBBtn></> : ""}
                            {employee.permissionEditEmployeeRegistration ? <MDBBtn className="fullButton" color="success" onClick={goToEmployeeRegistration}>Página de cadastro de funcionários</MDBBtn> : ""}

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
                                        ? <div className='vacation mb-2'>
                                            <div className='inputs'>
                                                <div className='date'><MDBInput type='date' value={vacationRelations.pendingVacationIndex.startDate} disabled label="Começo das férias" /></div>
                                                <div className='date'><MDBInput type='date' value={vacationRelations.pendingVacationIndex.endDate} disabled label="Fim das férias" /></div>
                                            </div>
                                            <div className='extraText'> Férias solicitadas, aguarde a confirmação do seu gerente</div>

                                        </div>
                                        : <div className='noVacationRequested mb-3'>Sem férias solicitadas no momento</div>}
                                    {vacationRelations.anyActiveVacation
                                        ? <div className='vacation mb-2'>
                                            <div className='inputs'>
                                                <div className='date'><MDBInput type='date' value={vacationRelations.aciveVacationIndex.startDate} disabled label="Começo das férias" /></div>
                                                <div className='date'><MDBInput type='date' value={vacationRelations.aciveVacationIndex.endDate} disabled label="Fim das férias" /></div>
                                            </div>
                                            <div className='extraText'>Próximas férias aceitas marcadas na data acima, agora só aguardar até o dia :)</div>

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
                                {employee.lastThirtheenth === null ?
                                    <div className='thirteenthSolicitation'>
                                        <div>Décimo terceito solicitado na data</div>
                                        <div className='dateLastThirteenth'>
                                            <MDBInput disabled type='date' value={"2023-04-10"}></MDBInput>
                                        </div>
                                    </div>

                                    : <div className="bonusSallaryFeedback">Sem solicitações de 13º no momento</div>}
                                <MDBBtn className="bonusSallaryRequestButton" color="success" onClick={() => {
                                    let today = new Date()
                                    console.log(today)
                                    employee.lastThirtheenth = today
                                    axios.put("http://localhost:3001/employeeRegistration/" + employee.employeeId, employee)
                                    setEmployee(employee)
                                }}>Solicitar 13º</MDBBtn>
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
