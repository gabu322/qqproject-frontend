import axios from "axios";
import React, { useEffect, useState } from "react";

const CallendarDays = (props) => {
    const [employee, setEmployee] = useState(JSON.parse(sessionStorage.user))

    const [isInVacation, setIsInVacation] = useState(false)
    const [activeEmployeesList, setActiveEmployeesList] = useState([])
    const [onVacationEmployeesList, setOnVacationEmployeesList] = useState([])

    const [counter, setCounter] = useState([])
    useEffect(() => {
        let onVacationEmployees = [];
        let activeEmployees = []
        for(let i = 0; i < props.employeeQuantity; i++) {
            activeEmployees.push('')
        }
        axios.get("http://localhost:3001/vacationDate/" + ("2023-" + props.month + "-" + props.day)).then((response) => {
            response.data.forEach((vacation) => {
                if (vacation.employeeId === employee.id && vacation.state === "Accepted") {
                    setIsInVacation(true)
                    document.getElementById("inVacation").innerHTML = "De férias"
                }
                props.employeeList.map((employees) => {
                    if (employees.id === vacation.employeeId && vacation.state === "Accepted") {
                        onVacationEmployees.push('')
                        activeEmployees.pop()
                    }
                })
            })
            setOnVacationEmployeesList(onVacationEmployees.map(() => {
                return (<div className="inactiveEmployees"></div>)
            }))
            setActiveEmployeesList(activeEmployees.map(() => {
                return (<div className="activeEmployees"></div>)
            }))
        })
    }, [])
    let today = new Date()
    return (
        <div className={'dateCard shadow-3 ' + (props.month === props.currentMonth ? '' : 'disabled')}>
            <div className="basicInfo">
                <div className={"date " + (props.month === props.currentMonth && props.day === today.getDate() ? "actualDate" : "")}>{props.day == 1 ? props.monthName : props.day}</div>
                <div id="inVacation" className={"vacationInfo " + (isInVacation ? "bgcGreen" : "")}>{isInVacation ? "De férias!" : ""}</div>
            </div>
            {employee.isManager
                ? <div className="dashBoard">
                    <div>Funcionários:</div>
                    <div className="baseShow">
                        <div>De férias: {onVacationEmployeesList.length}</div>
                        <div className="emplyeesBar" style={{ "gridTemplateColumns": "repeat(" + props.employeeQuantity + ", 1fr)" }}>{onVacationEmployeesList.length >= 1 ? onVacationEmployeesList : <div className="numberOfActiveEmployees" style={{width: '0px'}}></div>}</div>
                    </div>
                    <div className="baseShow">
                        <div>Em atividade: {activeEmployeesList.length}</div>
                        <div className="emplyeesBar" style={{ "gridTemplateColumns": "repeat(" + props.employeeQuantity + ", 1fr)" }}>{activeEmployeesList}</div>
                    </div>
                </div>

                : ''}
        </div>
    )
}

export default CallendarDays;
