import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { port } from '../../App'
import { HrmStore } from '../../Context/HrmContext'

const LeaveApplyingSection = ({ allocatedLeave, setActiveSection }) => {
    let { leaveData, setLeaveData, getLeaveData } = useContext(HrmStore)
    let empid = JSON.parse(sessionStorage.getItem('user')).EmployeeId
    let [loading, setloading] = useState(false)
    let { activeSetting, setActiveSetting, getProperDate, getPendingLeave, timeValidate } = useContext(HrmStore)
    let reportingTo = JSON.parse(sessionStorage.getItem('Login_Profile_Information')).RepotringTo_Name
    let [obj, setobj] = useState({
        from_date: null,
        employee: empid,
        LeaveType: null,
        to_date: null,
        days: null,
        report_to: reportingTo,
        reason: '',
        Document: null
    })
    let [eligibleLeave, setEligibleLeave] = useState()
    let handleChange = (e) => {
        let { name, value, files } = e.target
        if (name == 'days' && obj.LeaveType != '' && obj.LeaveType != null) {
            let eligibledays = eligibleLeave.find((obj2) => obj2.id == obj.LeaveType).no_of_days
            if (value > eligibledays)
                toast.warning(`The applicable days for this leave criterion is ${eligibledays}`)
            value = value > eligibledays ? eligibledays : value

        }
        if (name == 'LeaveType' && obj.days && value != '') {
            let eligibledays = eligibleLeave.find((obj2) => obj2.id == value).no_of_days
            if (obj.days > eligibledays)
                toast.warning(`The applicable days for this leave criterion is ${eligibledays}`)
            value = obj.days > eligibledays ? '' : value
        }
        if (name == 'from_date' && value < timeValidate()) {
            value = timeValidate()
        }
        if ((name == 'from_date' && obj.days != null)) {
            addFinalDaate(obj.days - 1, value)
        }
        if (name == 'days' && obj.from_date) {
            addFinalDaate(value - 1, obj.from_date)
        }
        setobj((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    let addFinalDaate = (days, from) => {
        const newDate = new Date(from)
        console.log(newDate.getDate() + Number(days))
        let newday = newDate.getDate() + Number(days)
        newDate.setDate(newday)
        setobj((prev) => ({
            ...prev,
            to_date: getProperDate(newDate)
        }))

    }
    let postLeave = () => {
        console.log(obj.LeaveType);
        let formData = new FormData()
        if (obj.Document) {
            formData.append("Document", obj.Document)
        }
        formData.append("LeaveType", obj.LeaveType)
        formData.append("days", obj.days)
        formData.append("employee", obj.employee)
        formData.append("from_date", obj.from_date)
        formData.append("reason", obj.reason)
        // formData.append("restricted_leave_type", null )
        formData.append("to_date", obj.to_date)
        setloading(true)
        axios.post(`${port}/root/lms/Approve_Employee_Leave_Request/`, formData).then((response) => {
            console.log("leave", response.data);
            toast.success('Leave request has been sended')
            setloading(false)
            getPendingLeave()
            setobj({
                from_date: '',
                employee: empid,
                LeaveType: '',
                to_date: '',
                days: '',
                report_to: reportingTo,
                reason: '',
                Document: ''
            })
        }).catch((error) => {
            console.log(error);
            if (error.response.data) {
                toast.error(error.response.data)
            }
            else {
                toast.error('Error acquired')
            }
            setloading(false)
        })
    }
    let getEligibleLeaves = () => {
        axios.get(`${port}/root/lms/Available_Leaves/${empid}/`).then((response) => {
            setEligibleLeave(response.data)
            console.log("leaves", response.data);
        }).catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        console.log(allocatedLeave);
        setActiveSection('apply')
        getEligibleLeaves()
        getLeaveData()
    }, [])

    return (
        <div>
            <main className='bgclr min-h-[10vh] rounded-xl p-4 shadow-sm'>
                <h4>Leave applying </h4>
                <section className='flex flex-wrap justify-between items-start'>
                    <div className='my-2 p-2  col-sm-4'>
                        No of days Leave :
                        <input type="number" value={obj.days}
                            onChange={(e) => { if (e.target.value >= 0 && e.target.value < 367) handleChange(e) }}
                            name='days' className='p-2 block w-full shadow-sm outline-none rounded ' />
                    </div>
                    <div className='my-2 p-2 col-sm-4'>
                        <label htmlFor="">Date : </label>
                        <input type="date" value={obj.from_date}
                            onChange={handleChange} name='from_date'
                            className='p-2 block w-full shadow-sm rounded outline-none' />
                    </div>
                    <div className='my-2 p-2 col-sm-4'>
                        <label htmlFor="">Final Date : </label>
                        <input type="date" value={obj.to_date} disabled
                            onChange={handleChange} name='to_date'
                            className='p-2 block w-full shadow-sm bg-white rounded outline-none' />
                    </div>
                    <div className='my-2 p-2 col-sm-4'>
                        <label htmlFor="">Applicable Leave Type : </label>
                        <select value={obj.LeaveType}
                            className='p-2 block w-full shadow-sm bg-white rounded outline-none'
                            onChange={handleChange} name='LeaveType' id="">
                            <option value="">Select</option>
                            {console.log(allocatedLeave)}
                            {eligibleLeave && eligibleLeave.length > 0 && eligibleLeave.map((x) => (
                                < option value={x.id} >{x.leave_name} </option>
                            ))}
                        </select>
                    </div>

                    <div className='my-2 p-2 col-sm-4'>
                        <label htmlFor="">Document : </label>
                        <input type="file"
                            onChange={(e) => setobj((prev) => ({
                                ...prev,
                                Document: e.target.files[0]
                            }))} name='Document'
                            className='p-2 block w-full bg-white shadow-sm rounded outline-none' />
                    </div>
                    <div className='p-2 my-2 col-sm-4 '>
                        <label htmlFor="" className=''>  Reason:</label>
                        <textarea name="reason" onChange={handleChange} rows={5}
                            className='bg-white rounded p-2 block w-full shadow-sm outline-none' value={obj.reason} id=""></textarea>
                    </div>
                </section>
                <button onClick={postLeave} className='savebtn text-white ms-auto flex p-2 px-3 border-2 border-green-50 rounded'>
                    {loading ? "Loading..." : "Submit"}
                </button>
            </main>

        </div>
    )
}

export default LeaveApplyingSection