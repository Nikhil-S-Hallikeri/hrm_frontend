import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HrmStore } from '../../Context/HrmContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { port } from '../../App'
import WeekLeaveAprovedEmp from './WeekLeaveAprovedEmp'

const LeaveApprovalBox = () => {
    let [activeSection, setActiveSection] = useState('request')
    let [loading, setloading] = useState(false)
    let loginId = JSON.parse(sessionStorage.getItem('Login_Profile_Information'))
    let { getLeaveRequestsReporting, leaveRequestsReporting, changeDateYear } = useContext(HrmStore)
    let navigate = useNavigate()
    let [weekofHistory, setWeekOfHistory] = useState()
    useEffect(() => {
        getLeaveRequestsReporting()
    }, [])
    let handleRequest = (obj, status, index) => {
        setloading(`${status}${index}`)
        axios.patch(`${port}/root/lms/Approve_Employee_Leave_Request/`, {
            id: obj.id,
            approved_status: status,
            approved_by: loginId.id
        }).then((response) => {
            console.log(response.log);
            setloading('')
            getLeaveRequestsReporting()
            toast.success(`Request got ${status}!!`)
        }).catch((error) => {
            console.log(error);
            toast.error('Error Acquired')
            setloading('')
        })
    }
    let getApprovedEmployee = () => {
        axios.get(`${port}/root/lms/WeeklyLeaves/Approvals/${JSON.parse(sessionStorage.getItem('user')).EmployeeId}/`)
            .then((response) => {
                console.log(response.data);
                setWeekOfHistory(response.data)
            }).catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        getApprovedEmployee()
    }, [])
    return (
        <div className='col-sm-4 bgclr rounded-xl p-3' >
            <h6 className='poppins text-center'>Reporting Team</h6>
            <section className='p-2 flex justify-center gap-3 my-1'>
                <button onClick={() => { setActiveSection('request') }} className={`duration-500 ${activeSection == 'request' && 'btngrd text-white'} rounded text-xs p-1 `}>Request </button>
                <button onClick={() => { setActiveSection('report') }} className={`duration-500 rounded text-xs p-1 ${activeSection == 'report' && 'btngrd text-white'}`}    >Report </button>
            </section>
            {activeSection == 'request' &&
                <main className='h-[75%]'>
                    {leaveRequestsReporting && leaveRequestsReporting.length > 0 ?
                        <article className='h-[90%] max-h-[30vh] min-h-[10vh] overflow-y-scroll table-responsive tablebg rounded '>
                            <table className='w-full text-xs'>
                                <tr className='sticky top-0 bgclr1' >
                                    <th> SI NO </th>
                                    <th>Employee</th>
                                    <th>Leave Type </th>
                                    <th> Reason</th>
                                    <th>Days </th>
                                    <th>Applied Date </th>
                                    <th> Dates </th>
                                    <th>Action</th>
                                </tr>
                                {leaveRequestsReporting && leaveRequestsReporting.map((obj, index) => {
                                    return (
                                        <tr key={index} className={` `} >
                                            <td className=' '>{index + 1}</td>
                                            <td>{obj.employee_name} </td>
                                            <td> {obj.LeaveType} </td>
                                            <td className='w-[200px] xl:w-[400px] text-wrap '>{obj.reason} </td>
                                            <td>{obj.days} </td>
                                            <td>{changeDateYear(obj.applied_date)} </td>
                                            <td>{changeDateYear(obj.from_date)}{obj.days > 1 ? "-" + changeDateYear(obj.to_date) : ''} </td>
                                            {/* <td>{obj.approved_status} </td> */}
                                            <td className='flex gap-2'>
                                                <button onClick={() => handleRequest(obj, "rejected", index)} className='p-1 px-2 text-sm shadow-sm rounded bg-red-600 text-white  '>
                                                    {loading == `rejected${index}` ? 'Loading..' : "Decline"} </button>
                                                <button onClick={() => handleRequest(obj, "approved", index)} className='p-1 px-2 text-sm shadow-sm rounded bg-green-600 text-white  '>
                                                    {loading == `approved${index}` ? 'Loading' : "Accept"} </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </article> : <div className=' h-[90%] min-h-[5vh] flex'>
                            <p className='m-auto'>No leave request are there!!! </p>
                        </div>}
                    <button onClick={() => navigate('/dash/approvals')} className='mx-auto w-fit px-2 p-1 my-1 flex text-xs  savebtn 
                rounded border-2 border-green-50 text-white'>
                        Check page </button>
                </main>}
            {activeSection == 'report' &&
                <main className='h-[75%] min-h-[10vh] '>
                    {weekofHistory && weekofHistory.length > 0 ?
                        < section >
                            <WeekLeaveAprovedEmp approvedHistory={weekofHistory} />
                        </section> :
                        <div className='h-[90%] flex'>
                            <p className='m-auto'>No Leave approved for this Week </p>
                        </div>
                    }
                    <button onClick={()=>navigate('/dash/history')} className='savebtn text-xs rounded border-2 border-green-50 p-1 px-2 
                    mx-auto flex text-white my-2'>
                        Check Page
                    </button>

                </main>
            }
        </div >
    )
}

export default LeaveApprovalBox