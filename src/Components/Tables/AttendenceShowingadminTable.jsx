import React, { useContext, useState } from 'react'
import SwipingDetails from '../Modals/SwipingDetails'
import { HrmStore } from '../../Context/HrmContext'

const AttendenceShowingadminTable = ({ data, type }) => {
    let [showInfo, setShowinfo] = useState(false)
    let { changeDateYear } = useContext(HrmStore)
    return (
        <div className={`h-[50vh] my-3 rounded-xl overflow-y-scroll tablebg table-responsive
         ${type == 'personal' && 'border-0'}`}>
            <table className='w-full '>
                <thead>
                    <tr className='sticky top-0 bgclr1'>
                        <th>SI no </th>
                        {type != 'personal' && <th>Name</th>}
                        {type != 'personal' && <th>Employee ID</th>}
                        <th>Date</th>
                        <th>IN Time</th>
                        <th>Out Time</th>
                        <th>Hours worked </th>
                        <th>Late Arrival </th>
                        <th>Early depature </th>
                        <th>Status </th>
                        <th>Exception </th>
                        <th>Information </th>

                    </tr></thead>
                <tbody >
                    {
                        data && [...data].reverse().map((obj, index) => (
                            <tr className={` ${obj.Status == 'absent' ? 'bg-red-50'
                                : obj.Status == 'week_off' ? 'bg-yellow-50' : 'bg-green-50'} `}>
                                <td>{index + 1} </td>
                                {type != 'personal' && <td>{obj.Emp_Id && obj.Emp_Id.Name} </td>}
                                {type != 'personal' && <td>{obj.Emp_Id && obj.Emp_Id.EmployeeId} </td>}
                                <td>{changeDateYear(obj.date)} </td>
                                <td>{obj.InTime ? obj.InTime : '-'} </td>
                                <td>{obj.OutTime ? obj.OutTime : '-'} </td>
                                <td>{obj.Hours_Worked ? obj.Hours_Worked : '-'} </td>
                                <td> {obj.Late_Arrivals ? obj.Late_Arrivals : '-'} </td>
                                <td>{obj.Early_Depature ? obj.Early_Depature : '-'} </td>
                                <td> {obj.Status}</td>
                                <td>{obj.leave_information} </td>
                                <td onClick={() => setShowinfo(obj)} className='text-blue-600'> <button>
                                    info</button></td>
                            </tr>))
                    }
                </tbody>
            </table>
            <SwipingDetails show={showInfo} setshow={setShowinfo} />



        </div>
    )
}

export default AttendenceShowingadminTable