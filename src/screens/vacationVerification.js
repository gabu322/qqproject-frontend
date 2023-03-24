import React from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import Sidebar from '../components/sidebar';

const VacationVerification = () => {
    return (
		<>
			<div className='searchBar'>
				<input type='text' className='searchInput'></input>
				<MDBIcon fas icon="search" size='2x'/>
			</div>
			<div className='accorditionList'>
            </div>


        </>
    )
}

export default VacationVerification;
