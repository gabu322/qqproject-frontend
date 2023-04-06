import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import React, { Fragment, useState, useEffect } from 'react';
import CallendarDays from '../components/callendarDays';


const Callendar = () => {
    let yearCallendar = [
        {
            monthName: 'Janeiro',
            monthSize: 31,
            firstDayWeekDay: '1'
        }, {
            monthName: 'Fevereiro',
            monthSize: 28,
            firstDayWeekDay: 'Quarta'
        }, {
            monthName: 'Março',
            monthSize: 31,
            firstDayWeekDay: 'Quarta'
        }, {
            monthName: 'Abril',
            monthSize: 30,
            firstDayWeekDay: 'Sábado'
        }, {
            monthName: 'Maio',
            monthSize: 31,
            firstDayWeekDay: 'Segunda'
        }, {
            monthName: 'Junho',
            monthSize: 30,
            firstDayWeekDay: 'Quinta'
        }, {
            monthName: 'Julho',
            monthSize: 31,
            firstDayWeekDay: 'Sábado'
        }, {
            monthName: 'Agosto',
            monthSize: 31,
            firstDayWeekDay: 'Terça'
        }, {
            monthName: 'Setembro',
            monthSize: 30,
            firstDayWeekDay: 'Sexta'
        }, {
            monthName: 'Outubro',
            monthSize: 31,
            firstDayWeekDay: 'Domingo'
        }, {
            monthName: 'Novembro',
            monthSize: 30,
            firstDayWeekDay: 'Quarta'
        }, {
            monthName: 'Dezembro',
            monthSize: 31,
            firstDayWeekDay: 'Sexta'
        }];
    let newDate = new Date()
    let currentMonth = newDate.getMonth() + 1;

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {





        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <Fragment>
            <MDBContainer className='teste rounded-pill shadow'>
                <MDBRow className='fullHeight'>
                    <MDBCol size='md' className='text-center' onClick={() => console.log(currentMonth)}>Domingo</MDBCol>
                    <MDBCol size='md' className='text-center'>Segunda</MDBCol>
                    <MDBCol size='md' className='text-center'>Terça</MDBCol>
                    <MDBCol size='md' className='text-center'>Quarta</MDBCol>
                    <MDBCol size='md' className='text-center'>Quinta</MDBCol>
                    <MDBCol size='md' className='text-center'>Sexta</MDBCol>
                    <MDBCol size='md' className='text-center'>Sábado</MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className='callendarBase'>
                {yearCallendar?.map((month, index) => {
                    let monthArr = []
                    for (let i = 1; i <= month.monthSize; i++) {
                        monthArr.push(
                            <CallendarDays index={index} currentMonth={currentMonth} monthName={month.monthName} i={i}></CallendarDays>
                        )
                    }

                    return monthArr
                })}

            </div>
        </Fragment>
    )
}

export default Callendar
