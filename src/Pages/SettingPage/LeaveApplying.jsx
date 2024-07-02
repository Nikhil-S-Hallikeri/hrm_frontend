import React, { useContext, useEffect, useState } from 'react'
import { HrmStore } from '../../Context/HrmContext'
import axios from 'axios'
import { port } from '../../App'
import { toast } from 'react-toastify'
import ScrollButton from '../../Components/SettingComponent/ScrollButton'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LeaveApplyingSection from '../../Components/Leavecomponent/LeaveApplyingSection'
import LeavePengindSection from '../../Components/Leavecomponent/LeavePengindSection'
import LeaveHistorySection from '../../Components/Leavecomponent/LeaveHistorySection'
import Sidebar from '../../Components/Sidebar'

const LeaveApplying = () => {
    let { activeSetting, setActiveSetting, getProperDate, getCurrentDate, timeValidate } = useContext(HrmStore)
    let empid = JSON.parse(sessionStorage.getItem('user')).EmployeeId
    let reportingTo = JSON.parse(sessionStorage.getItem('Login_Profile_Information')).RepotringTo_Name
    let [allocatedLeave, setAllocatedLeave] = useState()
    let [activeSection, setActiveSection] = useState('')

    let navigate = useNavigate()

    useEffect(() => {
        setActiveSetting('leave')
    }, [])
    let getAvailableLeaves = () => {
        axios.get(`${port}/root/lms/EmployeeLeaveEligibility/list/${empid}/`).then((response) => {
            console.log(response.data);
            setAllocatedLeave(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        getAvailableLeaves()
    }, [])

    return (
        <div className=' '>
            <main className='overflow-x-scroll scrollmade my-3 flex gap-3 '>
                {
                    allocatedLeave && [...allocatedLeave].map((obj, index) => (
                        <div className='bgclr p-2 w-[16rem] flex rounded gap-3 items-center ' key='index'>
                            <div className='w-2/3'>
                                <p className='break-words text-sm mb-0 fw-semibold'>{obj.LeaveType}</p>
                                <h4 className='fw-semibold text-4xl'>{obj.Available_leaves} </h4>
                            </div>
                            <img className='w-14 h-fit  ' src={require('../../assets/Images/leavepage.png')} alt="Leave Image" />
                        </div>
                    ))
                }
            </main>

            {/* <section className='flex flex-wrap bgclr rounded-full my-3 mx-auto w-fit'>
                <button>

                </button>
                <ScrollButton css="noBorder" activeSetting={activeSection} setActiveSetting={setActiveSection}
                    name='Apply' path='/leave' active='apply' />
                <ScrollButton css="noBorder" activeSetting={activeSection} setActiveSetting={setActiveSection}
                    name='Pending' path='/leave/pending' active='pending' />
                <ScrollButton css="noBorder" activeSetting={activeSection} setActiveSetting={setActiveSection}
                    name='History' path='/leave/history' active='history' />

            </section> */}
            <section className='my-3 fw-medium '>
                <button onClick={() => { navigate('/settings/leave') }}
                    className={` ${activeSection == 'apply' && 'bgclr border-0 shadow-sm '} rounded-xl duration-500 fw-medium  w-32 p-2 px-2 `} >
                    Apply
                </button>
                <button onClick={() => { navigate('/settings/leave/pending') }} 
                className={` ${activeSection == 'pending' && 'bgclr border-0  shadow-sm '} rounded-xl duration-500 w-32 p-2 px-2 `} >
                    Pending
                </button>
                <button onClick={() => { navigate('/settings/leave/history') }} 
                className={` ${activeSection == 'history' && 'bgclr border-0  shadow-sm '} rounded-xl duration-300 w-32 p-2 px-2 `} >
                    History
                </button>
            </section>

            <Routes>
                <Route path='/*' element={<LeaveApplyingSection setActiveSection={setActiveSection} allocatedLeave={allocatedLeave} />} />
                <Route path='/pending' element={<LeavePengindSection setActiveSection={setActiveSection} />} />
                <Route path='/history' element={<LeaveHistorySection setActiveSection={setActiveSection} />} />
            </Routes>

        </div >
    )
}

export default LeaveApplying