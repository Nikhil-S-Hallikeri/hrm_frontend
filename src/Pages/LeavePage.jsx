import React, { useContext, useEffect, useState } from 'react'
import Topnav from '../Components/Topnav'
import LeaveaddingModal from '../Components/Leavecomponent/LeaveaddingModal'
import PlusIcon from '../SVG/PlusIcon'
import axios from 'axios'
import { port } from '../App'
import { useNavigate } from 'react-router-dom'
import EditPen from '../SVG/EditPen'
import DustbinIcon from '../SVG/DustbinIcon'
import { HrmStore } from '../Context/HrmContext'

const LeavePage = () => {
    let {setActivePage,leaveData,setLeaveData,getLeaveData}=useContext(HrmStore)
    let [showLeaveAdding, setLeaveAdding] = useState(false)
    let navigate = useNavigate()

 
    useEffect(() => {
        getLeaveData()
        setActivePage('Employee')
    }, [])
    return (
        <div>
            <Topnav name="Leave adding" />
            <button onClick={() => setLeaveAdding(true)} className='flex items-center p-2 rounded-lg btngrd text-white px-3 gap-2 ms-auto '>
                <PlusIcon />  Add leave
            </button>
            <LeaveaddingModal getleave={getLeaveData} show={showLeaveAdding} setShow={setLeaveAdding} />

            <main className='tablebg rounded shadow p-3 my-3  '>
                <h4>Leave setting </h4>
                <div className='table-responsive'>
                    <table className='w-full '>
                        <tr>
                            <th className='w-14 '>SI no </th>
                            <th>Name </th>
                            <th>Description </th>
                            <th>No of Days </th>
                            <th>Action </th>
                        </tr>
                        {leaveData && leaveData.map((obj, index) => (
                            <tr>
                                {console.log(obj)}
                                <td>{index + 1} </td>
                                <td className='text-start'>{obj.leave_name} </td>
                                <td className='text-start'>{obj.description} </td>
                                <td className='w-28 '>  </td>
                                <td className='w-20 flex justify-between '>
                                    <button onClick={() => navigate(`/dash/leaveSetting/${obj.id}`)}>
                                        <EditPen />
                                    </button>
                                    <button className='text-red-600'>
                                        <DustbinIcon />
                                    </button>
                                </td>
                            </tr>
                        ))

                        }

                    </table>

                </div>

            </main>
        </div>
    )
}

export default LeavePage