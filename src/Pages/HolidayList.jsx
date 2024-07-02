import React from 'react'
import Topnav from '../Components/Topnav'
import Holidays from '../Components/Holidays'

const HolidayList = () => {
    return (
        <div>
            <Topnav name="Holidays" />
            <input type="date" className='p-2 '/>
            

        </div>
    )
}

export default HolidayList