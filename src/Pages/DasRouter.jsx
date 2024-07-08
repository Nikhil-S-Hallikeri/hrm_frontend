import React from 'react'
import Sidebar from '../Components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Topnav from '../Components/Topnav'
import LeaveSetting from './LeaveCreation'
import LeavePage from './LeavePage'
import ApprovalPage from './Approval/ApprovalPage'
import LeaveAllHistory from './Approval/LeaveAllHistory'
import Empsidebar from '../Components/Empsidebar'
import Recsidebar from '../Components/Recsidebar'
import ReportingCheck from '../Components/AuthPermissions/ReportingCheck'
import AttendenceAdmin from './AttendenceAdmin'

const DasRouter = () => {
    let employeeStatus = JSON.parse(sessionStorage.getItem('user')).Disgnation
    // let employeeStatus = 'HR'


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
                        <Route path='/history' element={<LeaveAllHistory />} />
                        <Route path='/attendence-list' element={<AttendenceAdmin/>} />


                    </Routes>

                </article>


            </main>
        </div>
    )
}

export default DasRouter