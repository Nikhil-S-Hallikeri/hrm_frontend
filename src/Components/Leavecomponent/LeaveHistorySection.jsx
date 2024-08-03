import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { port } from '../../App'
import { HrmStore } from '../../Context/HrmContext'

const LeaveHistorySection = ({ setActiveSection }) => {
    let { changeDateYear } = useContext(HrmStore)
    let [historyRequest, setHistoryRequest] = useState()
    let empid = JSON.parse(sessionStorage.getItem('user')).EmployeeId
    let getHistoryLeave = () => {
        axios.get(`${port}/root/lms/Leaves/History/${empid}/`).then((response) => {
            setHistoryRequest(response.data)
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        getHistoryLeave()
        setActiveSection('history')
    }, [])
    return (
        <div>
            {historyRequest && historyRequest.length > 0 ?
                <section className='rounded-xl  h-[45vh] overflow-y-scroll table-responsive tablebg'>
                    <table className='w-full  '>
                        <thead>
                            <tr className='sticky top-0 bgclr1 '>
                                <th className='w-20'>SI No</th>
                                <th>Leave Type </th>
                                <th>Leave Reason </th>
                                <th>Applied Date </th>
                                <th>Leave Date </th>
                                <th>No of Days leave </th>
                                <th className=' '>Process reason </th>
                                <th> Status</th>
                            </tr>
                        </thead>
                        <tbody className=''>

                            {console.log(historyRequest)}
                            {[...historyRequest].reverse().map((obj, index) => (
                                <tr key={index} className={` `} >
                                    <td>{index + 1}</td>
                                    <td> {obj.LeaveType} </td>
                                    <td className='mb-0 w-[300px] text-start  text-wrap '>{obj.reason} </td>
                                    <td>{obj.applied_date && changeDateYear(obj.applied_date)} </td>
                                    <td>{obj.from_date && changeDateYear(obj.from_date)}
                                        {obj.days > 1 && obj.to_date ? " to " + changeDateYear(obj.to_date) : ''} </td>
                                    <td>{obj.days} </td>
                                    <td className=' text-wrap'> 
                                        {obj.rm_reason && <p className='fw-semibold w-[300px]'>Reporting Manager : <span className='fw-normal '>
                                            {obj.rm_reason}</span>  </p>}
                                        {obj.hr_reason && <p className='fw-semibold w-[300px]'>HR Manager :  <span className='fw-normal '>{obj.hr_reason} </span></p>}
                                    </td>
                                    <td>{obj.approved_status} </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section> :
                <section className='min-h-[40vh] bgclr rounded-xl flex w-full'>
                    <h4 className='poppins m-auto'> No Leave Request have been made so for!!! </h4>
                </section>
            }
        </div>
    )
}

export default LeaveHistorySection