import React, { useContext, useEffect, useState } from 'react'
import Empsidebar from '../../Components/Empsidebar'
import { Route, Routes } from 'react-router-dom'
import LeaveApplying from './LeaveApplying'
import Topnav from '../../Components/Topnav'
import { HrmStore } from '../../Context/HrmContext'
import ScrollButton from '../../Components/SettingComponent/ScrollButton'
import ChangePassword from './ChangePassword'
import Recsidebar from '../../Components/Recsidebar'
import Sidebar from '../../Components/Sidebar'
import ShowHolidays from './ShowHolidays'
import AttendenceInfo from './AttendenceInfo'

const SettingRouter = () => {
    let { setActivePage, activeSetting, setActiveSetting } = useContext(HrmStore)
    let employeeStatus = JSON.parse(sessionStorage.getItem('user')).Disgnation
    useEffect(() => {
        setActivePage('setting')
    }, [])
    return (
        <div className='flex '>
            <div className='d-none d-lg-flex '>
                {employeeStatus && employeeStatus == 'Employee' && <Empsidebar />}
                {employeeStatus && employeeStatus == 'Recruiter' && <Recsidebar />}
                {employeeStatus && employeeStatus == 'HR' && <Sidebar />}
                {employeeStatus && employeeStatus == 'Admin' && <Sidebar />}
            </div>
            <div className='flex-1 container mx-auto '>
                <Topnav />
                <main className='flex gap-3 my-3 scrollmade overflow-x-scroll'>

                    <ScrollButton activeSetting={activeSetting} setActiveSetting={setActiveSetting} name='Apply Leave' path='/settings/leave' active='leave' />
                    <ScrollButton activeSetting={activeSetting} setActiveSetting={setActiveSetting} name='Change Password' path='/settings/password' active='password' />
                    <ScrollButton activeSetting={activeSetting} setActiveSetting={setActiveSetting} name='Holidays' path='/settings/holidays' active='holidays' />
                    <ScrollButton activeSetting={activeSetting} setActiveSetting={setActiveSetting} name='Attendence' path='/settings/attendence' active='attendence' />



                </main>
                <Routes>
                    <Route path='/*' element={<LeaveApplying />} />
                    <Route path='/leave/*' element={<LeaveApplying />} />
                    <Route path='/password' element={<ChangePassword />} />
                    <Route path='/holidays' element={<ShowHolidays />} />
                    <Route path='/attendence' element={<AttendenceInfo />} />

                </Routes>

            </div>

        </div>
    )
}

export default SettingRouter