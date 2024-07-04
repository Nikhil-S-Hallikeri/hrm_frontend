import React from 'react'
import Sidebar from '../Components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Topnav from '../Components/Topnav'
import LeaveSetting from './LeaveCreation'
import LeavePage from './LeavePage'
import ApprovalPage from './Approval/ApprovalPage'
import HolidayList from './HolidayList'
import LeaveAllHistory from './Approval/LeaveAllHistory'
import Empsidebar from '../Components/Empsidebar'
import Recsidebar from '../Components/Recsidebar'
import ReportingCheck from '../Components/AuthPermissions/ReportingCheck'

const DasRouter = () => {
    let employeeStatus = JSON.parse(sessionStorage.getItem('user')).Disgnation

    return (
        <div>
            <main className='flex'>
                <article className='d-none d-lg-flex'>
                    {employeeStatus && employeeStatus == 'Employee' && <Empsidebar />}
                    {employeeStatus && employeeStatus == 'Recruiter' && <Recsidebar />}
                    {employeeStatus && employeeStatus == 'HR' && <Sidebar />}
                    {employeeStatus && employeeStatus == 'Admin' && <Sidebar />}
                </article>
                <article className='flex-1 container mx-auto'>
                    <Routes>
                        <Route path='/leaveSetting/:id' element={<LeaveSetting />} />
                        <Route path='/leaveCreation' element={<LeavePage />} />
                        <Route path='/approvals' element={<ReportingCheck Child={ApprovalPage}/>} />
                        <Route path='/holidays' element={<HolidayList />} />
                        <Route path='/history' element={<LeaveAllHistory />} />


                    </Routes>

                </article>


            </main>
        </div>
    )
}

export default DasRouter