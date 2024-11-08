import React, { useContext, useEffect, useState } from 'react'
import Empsidebar from '../../Components/Empsidebar'
import Recsidebar from '../../Components/Recsidebar'
import Sidebar from '../../Components/Sidebar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Employee_request_form from '../../Components/Employee_request_form'
import Topnav from '../../Components/Topnav'
import ResignationIndex from './ResignationIndex'
import ParticularResignationRequest from './ParticularResignationRequest'
import ExitInterviewForm from './ExitInterviewForm'
import ExitInterviewTable from './ExitInterviewTable'
import { HrmStore } from '../../Context/HrmContext'
import HandOverTables from './HandOverTables'

const ExitProcessRouter = () => {
    let employeeStatus = JSON.parse(sessionStorage.getItem('user')).Disgnation
    let { setActivePage } = useContext(HrmStore)
    let status = JSON.parse(sessionStorage.getItem('status'))
    let [activeSection, setActiveSection] = useState('')
    let navigate = useNavigate()
    useEffect(() => {
        setActivePage('Employee')
    }, [])
    return (
        <main className='flex'>
            <article className='d-none d-lg-flex  '>
                {employeeStatus && employeeStatus == 'Employee' && <Empsidebar />}
                {employeeStatus && employeeStatus == 'Recruiter' && <Recsidebar />}
                {employeeStatus && employeeStatus == 'HR' && <Sidebar />}
                {employeeStatus && employeeStatus == 'Admin' && <Sidebar />}
            </article>
            <article className='flex-1 container mx-auto '>
                <Topnav />
                {/* Navigation */}
                <section className='my-3 ' >
                    <button onClick={() => navigate('/Employee_request_form')} className={`duration-500  ${activeSection == 'request' ? "bgclr1" : ''}
                     px-3 fw-semibold text-slate-800  p-2 rounded `} >
                        Requests
                    </button>
                    {employeeStatus && (employeeStatus == 'HR' || employeeStatus == 'Admin') &&
                        <button onClick={() => navigate('/Employee_request_form/interview')} className={` duration-500 ${activeSection == 'interview' ? "bgclr1" : ''}
                     px-3 fw-semibold text-slate-800  p-2 rounded `} >
                            Exit Interview
                        </button>}
                    <button onClick={() => navigate('/Employee_request_form/handover')} className={` duration-500 ${activeSection == 'handover' ? "bgclr1" : ''}
                     px-3 fw-semibold text-slate-800  p-2 rounded `} >
                        Handovers
                    </button>
                </section>

                <Routes>
                    <Route path='/*' element={
                        // employeeStatus && (employeeStatus == 'HR' || employeeStatus == 'Admin') ?
                        < ResignationIndex setActiveSection={setActiveSection} />
                        //    : <Employee_request_form setActiveSection={setActiveSection} />
                    } >

                    </Route>
                    <Route path='/request/:id' element={<Employee_request_form setActiveSection={setActiveSection} />} />
                    <Route path='/apply' element={<Employee_request_form setActiveSection={setActiveSection} />} />
                    <Route path='/interview/*' element={<ExitInterviewTable setActiveSection={setActiveSection} />} />
                    <Route path='/interview/:id' element={<ExitInterviewForm setActiveSection={setActiveSection} />} />
                    <Route path='/handover' element={<HandOverTables setActiveSection={setActiveSection} />} />
                </Routes>

            </article>
        </main >
    )
}

export default ExitProcessRouter