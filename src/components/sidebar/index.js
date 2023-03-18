import { MDBBtn } from "mdb-react-ui-kit";
import React, {useState} from "react";
import '../../sass/style.css';

const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const handleViewSidebar = () => {
        setSidebarOpen(!sidebarOpen)
        console.log(sidebarOpen)
    }

    return (
        <div className={sidebarOpen ? "sidebarBase open" : "sidebarBase"}>
            <div className="outsideBlur"/>

            <button className="sidebarButton" onClick={handleViewSidebar}>
                teste
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
                <div className="vacationInfo">
                    <div className="vacationDaysLeft">
                        Dias de férias restentes: 10
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
                <MDBBtn color="danger" className="logoutButton">
                    Sair
                </MDBBtn>

            </div>
        </div>
    );
}

export default Sidebar;
