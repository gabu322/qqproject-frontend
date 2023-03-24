import { MDBBtn } from "mdb-react-ui-kit";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../../sass/style.css';

const Sidebar = () => {
    let logOut = useNavigate();
    function doLogout() {logOut('/')}
    let toEmployeeRegistration = useNavigate();
    function gotoEmployeeRegistration() {toEmployeeRegistration('/employeeRegistration')}
    let toVacation = useNavigate();
    function goToVacationPage() {toVacation('/vacation')}
    let toCallendar = useNavigate();
    function goToCallendar() {toCallendar('/callendar')}


    const [sidebarOpen, setSidebarOpen] = useState(false);
    const handleViewSidebar = () => {
        setSidebarOpen(!sidebarOpen)
        console.log(sidebarOpen)
    }

    return (
        <div className={sidebarOpen ? "sidebarBase open" : "sidebarBase"}>
            <div className="outsideBlur"/>

            <button className="sidebarButton" onClick={handleViewSidebar}>
                <div className="bar1"/>
                <div className="bar2"/>
                <div className="bar3"/>
            </button>
            <div className="insideContent">
                <div className="identification">
                    <div className="icon"><img className="img-fluid" src="https://cdn.mos.cms.futurecdn.net/snbrHBRigvvzjxNGuUtcck-970-80.jpg.webp"/></div>
                    <div className="naming">
                        <div className="employeeName">
                            Gabriel Ambrozini
                        </div>
                        <div className="employeeId">
                            123456
                        </div>
                    </div>
                </div>
                <hr/>
                <MDBBtn className="fullButton" color="success" onClick={gotoEmployeeRegistration}>Página principal</MDBBtn>
                <MDBBtn className="fullButton" color="success" onClick={goToVacationPage}>Verificação de férias</MDBBtn>
                <MDBBtn className="fullButton" color="success" onClick={goToCallendar}>Calendário</MDBBtn>
                <hr/>
                <div className="vacationInfo">
                    <div className="vacationDaysLeftSection shadow-3">

                        <div>Dias de férias restentes</div>
                        <div className="vacationDaysLeft">&nbsp; 10 dias &nbsp;</div>
                    </div>
                    <div className="vacationRequest">
                        Sem férias solicitadas no momento
                    </div>
                    <MDBBtn className="vacationRequestButton" color="success">
                        Solicitar férias
                    </MDBBtn>
                </div>
                <hr/>
                <div className="bonusSallaryInfo">
                    <div className="bonusSallaryFeedback">Sem solicitações de 13º no momento</div>
                    <MDBBtn className="bonusSallaryRequestButton" color="success">Solicitar 13º</MDBBtn>
                </div>
                <MDBBtn color="danger" className="logoutButton" onClick={doLogout}>
                    Sair
                </MDBBtn>

            </div>
        </div>
    );
}

export default Sidebar;
