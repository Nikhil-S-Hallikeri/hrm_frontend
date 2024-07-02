import React from 'react'
import Sidebar from '../Components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Topnav from '../Components/Topnav'
import LeaveSetting from './LeaveCreation'
import LeavePage from './LeavePage'
import ApprovalPage from './Approval/ApprovalPage'
import HolidayList from './HolidayList'

const DasRouter = () => {
    return (
        <div>
            <main className='flex'>
                <article className='d-none d-lg-flex'>
                    <Sidebar />
                </article>
                <article className='flex-1 container mx-auto'>
                    <Routes>
                        <Route path='/leaveSetting/:id' element={<LeaveSetting />} />
                        <Route path='/leaveCreation' element={<LeavePage />} />
                        <Route path='/approvals' element={<ApprovalPage />} />
                        <Route path='/holidays' element={<HolidayList/>}/>


                    </Routes>

                </article>


            </main>
        </div>
    )
}

export default DasRouter