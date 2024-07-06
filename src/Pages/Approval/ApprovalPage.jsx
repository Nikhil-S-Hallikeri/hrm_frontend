import React, { useContext, useEffect, useState } from 'react'
import Topnav from '../../Components/Topnav'
import { HrmStore } from '../../Context/HrmContext'
import axios from 'axios'
import { port } from '../../App'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ApprovalPage = () => {
    let { leaveRequestsReporting, openNavbar, setActivePage, getProperDate, changeDateYear,
        setLeaveRequestReporting, getLeaveRequestsReporting } = useContext(HrmStore)
    let { leaveData, setLeaveData, getLeaveData } = useContext(HrmStore)

    let [filteredRequest, setFilteredRequest] = useState()
    let loginId = JSON.parse(sessionStorage.getItem('Login_Profile_Information'))
    let [loading, setloading] = useState('')
    let [filterOption, setFilterOption] = useState({
        name: "",
        leaveType: ''
    })
    let handleChange = (e) => {
        let { name, value } = e.target
        setFilterOption((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    useEffect(() => {
        setActivePage('Employee')
        getLeaveRequestsReporting()
        getLeaveData()
    }, [])
    useEffect(() => {
        setFilteredRequest(leaveRequestsReporting)
    }, [leaveRequestsReporting])

    let HandleFilterRequest = () => {
        let { name, leaveType } = filterOption
        let lowercaseName = name.toLowerCase()
        let filteredArry = leaveRequestsReporting.filter((obj) => {
            let nameMatching = name ? obj.employee_name.toLowerCase().includes(lowercaseName) : true
            let leavetypeMatchting = leaveType ? obj.LeaveType == leaveType : true
            return nameMatching && leavetypeMatchting
        })
        let uniquearry = Array.from(new Set(filteredArry.map((obj) => obj.id)))
            .map((id) => leaveRequestsReporting.find((obj) => obj.id == id))
        setFilteredRequest(uniquearry)
    }
    let navigate = useNavigate()
    let handleRequest = (obj, status, index) => {
        setloading(`${status}${index}`)
        let boolean = status == 'rejected' ? false : true
        if (obj.is_hr_permission_required) {
            alert('new api')
            axios.patch(`${port}/root/lms/EmployeeLeaves/accepting/By_hr/`, {
                id: obj.id,
                is_approved_by_hr: boolean,
            }).then((response) => {
                console.log(response.data);
                setloading('')
                getLeaveRequestsReporting()
                toast.success(`Request got ${status}!!`)
            }).catch((error) => {
                console.log(error);
                toast.error('Error Acquired')
                setloading('')
            })
        }
        else
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
    return (
        <div className=''>
            <Topnav name="Leave Approval" />
            <main className='flex flex-wrap items-center justify-between'>
                <section className='my-3 flex flex-wrap gap-3'>
                    <div className='rounded p-2 bgclr w-fit '>
                        <input onKeyDown={(e) => {
                            if (e.key == 'Enter')
                                HandleFilterRequest()
                        }}
                            type="text" value={filterOption.name} name='name'
                            onChange={handleChange}
                            placeholder='Employee name' className='outline-none bg-transparent ' />
                    </div>
                    <select name="leaveType" onChange={handleChange}
                        value={filterOption.leaveType}
                        className='p-2 text-slate-500 bgclr rounded w-40 outline-none' id="">
                        <option value="">Leave type </option>
                        {leaveData && leaveData.map((obj, index) => (
                            <option key={index} value={obj.leave_name}>{obj.leave_name}
                            </option>
                        ))}
                    </select>
                    <button onClick={HandleFilterRequest} className='p-2 h-fit px-4 w-40 text-white savebtn rounded border-2 border-green-50 '>
                        Search
                    </button>
                </section>
                <button className='p-1 px-3 btngrd text-white text-sm h-fit rounded border-2 ' onClick={() => navigate('/dash/history')}>
                    History
                </button>
            </main>
            {
                (leaveRequestsReporting && leaveRequestsReporting.length > 0) ?
                    <section className={`rounded-xl tablebg table-responsive `}>
                        <table className='w-full '>
                            <thead>
                                <tr>
                                    <th className='w-20'>SI No</th>
                                    <th>Employee </th>
                                    <th>Leave Type </th>
                                    <th className='w-[300px] '>Leave Reason </th>
                                    <th>No of Days leave </th>
                                    <th>Applied on </th>
                                    <th>Leave Dates </th>
                                    <th> Status</th>
                                    <th>Action </th>
                                </tr>
                            </thead>
                            {filteredRequest && filteredRequest.map((obj, index) => (
                                <tr key={index} className={` `} >
                                    <td className=' '>{index + 1}</td>
                                    <td>{obj.employee_name} </td>
                                    <td> {obj.LeaveType} </td>
                                    <td className='w-[200px] xl:w-[400px] text-wrap '>{obj.reason} </td>
                                    <td>{obj.days} </td>
                                    <td>{changeDateYear(obj.applied_date)} </td>
                                    <td>{changeDateYear(obj.from_date)}{obj.days > 1 ? "-" + changeDateYear(obj.to_date) : ''} </td>
                                    <td>{obj.approved_status} </td>
                                    <td className='flex gap-2'>
                                        <button onClick={() => handleRequest(obj, "rejected", index)} className='p-1 px-2 text-sm shadow-sm rounded bg-red-600 text-white  '>
                                            {loading == `rejected${index}` ? 'Loading..' : "Decline"} </button>
                                        <button onClick={() => handleRequest(obj, "approved", index)} className='p-1 px-2 text-sm shadow-sm rounded bg-green-600 text-white  '>
                                            {loading == `approved${index}` ? 'Loading' : "Accept"} </button>
                                    </td>

                                </tr>
                            ))}
                        </table>
                    </section> :
                    <section className='bgclr min-h-[40vh] rounded-xl flex container  mx-auto  '>
                        <h4 className='m-auto '>No Leave Requests are there!!!</h4>

                    </section>
            }

        </div >
    )
}

export default ApprovalPage