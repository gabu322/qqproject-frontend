import React, { useEffect, useState } from 'react';
import { MDBCheckbox, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import VacationVerification from '../components/vacationVerification';

const VacationVerificationScreen = () => {
    const [employee, setEmployee] = useState(JSON.parse(sessionStorage.user))

    const [vacationList, setVacationList] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    useEffect(() => {
        vacationList.forEach(() => {
            vacationList.pop()
        })
        vacationList.pop()
        axios.get("http://localhost:3001/vacationVerification/" + employee.id).then((response) => {
            response.data.forEach((employeeData) => {
                setEmployeeList(employeeList => [...employeeList, employeeData])
                axios.get("http://localhost:3001/vacation/" + employeeData.id).then((response) => {
                    response.data.forEach((vacationData) => {
                        setVacationList(vacationList => vacationList.concat(vacationData))
                        //setVacationList(vacationList => [...vacationList, vacationData])
                        //vacationList.push(vacationData)
                    })
                })
            })
        })
    }, []);

    const [filterFormValue, setFilterFormValue] = useState({
        searchName: '',
        pendingVacations: true,
        acceptedVacations: false,
        deniedVacations: false
    })

    /*
        <div className='openAdvancedSearch' onClick={() => { console.log(vacationList) }}>
                                <div className='bar1' />
                                <div className='bar2' />
                            </div>*/

    return (
        <>
            <div className='searchBar'>
                <input type='text' className='searchInput'></input>
                <div className='icons'>
                    <MDBDropdown>
                        <MDBDropdownToggle color="light">Filtros </MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <MDBCheckbox label='Férias pendentes' checked={filterFormValue.pendingVacations} onChange={() => {setFilterFormValue({...filterFormValue, pendingVacations: !filterFormValue.pendingVacations})}} />
                            <MDBCheckbox label='Férias aceitas' checked={filterFormValue.acceptedVacations}  onChange={() => {setFilterFormValue({...filterFormValue, acceptedVacations: !filterFormValue.acceptedVacations})}}/>
                            <MDBCheckbox label='Férias negadas' checked={filterFormValue.deniedVacations} onChange={() => {setFilterFormValue({...filterFormValue, deniedVacations: !filterFormValue.deniedVacations})}}/>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                    <MDBIcon fas icon="search" size='2x' />
                </div>
            </div>
            <div className='accorditionList'>
                {vacationList?.map((vacationData) => (
                    vacationData.state === 'Unread' && filterFormValue.pendingVacations === true ? <VacationVerification vacationData={vacationData} employeeData={employeeList} /> : ''
                ))}
                {vacationList?.map((vacationData) => (
                    vacationData.state === 'Accepted' && filterFormValue.acceptedVacations === true ? <VacationVerification vacationData={vacationData} employeeData={employeeList} /> : ''
                ))}
                {vacationList?.map((vacationData) => (
                    vacationData.state === 'Denied' && filterFormValue.deniedVacations === true ? <VacationVerification vacationData={vacationData} employeeData={employeeList} /> : ''
                ))}
            </div>


        </>
    )
}

export default VacationVerificationScreen;
