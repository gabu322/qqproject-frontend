import axios from "axios";
import React, { useEffect, useState } from "react";

const CallendarDays = (props) => {
    const [employee, setEmployee] = useState(JSON.parse(sessionStorage.user))

    const [isInVacation, setIsInVacation] = useState(false)
    const [activeEmployeesList, setActiveEmployeesList] = useState([])
    const [onVacationEmployeesList, setOnVacationEmployeesList] = useState()

    const [counter, setCounter] = useState([])
    useEffect(() => {
        let counting = [];
        axios.get("http://localhost:3001/vacationDate/" + ("2023-" + props.month + "-" + props.day)).then((response) => {
            response.data.forEach((vacation) => {
                if (vacation.employeeId === employee.id && vacation.state === "Accepted") {
                    setIsInVacation(true)
                    document.getElementById("inVacation").innerHTML = "De férias"
                }
                props.employeeList.map((employees) => {
                    if (employees.id === vacation.employeeId && vacation.state === "Accepted") {
                        counting.push('1')
                    }
                })
                setActiveEmployeesList(counting.map(() => {
                    return (<div className="numberOfActiveEmployees"></div>)
                }))
            })
        })
    }, [])
    let testString = "1fr "
    return (
        <div className={'dateCard shadow-3 ' + (props.month === props.currentMonth ? '' : 'disabled')}>
            <div className="basicInfo">
                <div className="date">{props.day == 1 ? props.monthName : props.day}</div>
                <div id="inVacation" className={"vacationInfo " + (isInVacation ? "bgcGreen" : "")}>{isInVacation ? "De férias!" : ""}</div>
            </div>
            {employee.isManager
                ? <div className="dashBoard">
                    <div className="activeEmployees">
                        <div>Funcionários:</div>
                        <div>De férias: {activeEmployeesList.length}</div>
                        <div className="activeEmployeesBar" style={{ "gridTemplateColumns": "repeat(" + props.employeeQuantity + ", 1fr)" }}>
                            {activeEmployeesList}
                        </div>
                    </div>
                </div>

                : ''}
        </div>
    )
}

export default CallendarDays;
