import React, { useContext, useEffect, useState } from 'react'
import { HrmStore } from '../../Context/HrmContext'
import SwipingDetails from '../../Components/Modals/SwipingDetails'

const AttendenceInfo = () => {
    let { setActiveSetting, getProperDate } = useContext(HrmStore)
    let [show, setshow] = useState('')
    let [filterObj, setFilterObj] = useState({
        fromtime: '',
        totime: ''
    })
    let handleChange = (e) => {
        let { name, value } = e.target
        setFilterObj((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    function currentMonthDates() {
        const currentDate = new Date()
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const startDate = getProperDate(new Date(year, month, 1));
        const endDate = getProperDate(new Date(year, month + 1, 0));
        setFilterObj({
            fromtime: startDate,
            totime: endDate
        })
        console.log(startDate, endDate);
    }
    useEffect(() => {
        currentMonthDates()
    }, [])
    let data = [{
        date: '01 Apr 2024',
        shift: '9:0(GS)',
        attendenceScheme: 'General',
        firstIn: '9:30',
        lastout: '10-30',
        workhrs: '09:48',
        status: 'P',
    },
    {
        date: '02 Apr 2024',
        shift: '9:0(GS)',
        attendenceScheme: 'General',
        firstIn: '9:30',
        lastout: '10-30',
        workhrs: '09:48',
        status: 'P',
    },
    {
        date: '03 Apr 2024',
        shift: '9:0(GS)',
        attendenceScheme: 'General',
        firstIn: '9:30',
        lastout: '10-30',
        workhrs: '09:48',
        status: 'A',
    },
    {
        date: '04 Apr 2024',
        shift: '9:0(GS)',
        attendenceScheme: 'General',
        firstIn: '9:30',
        lastout: '10-30',
        workhrs: '09:48',
        status: 'P',
    },
    {
        date: '05 Apr 2024',
        shift: '9:0(GS)',
        attendenceScheme: 'General',
        firstIn: '9:30',
        lastout: '10-30',
        workhrs: '09:48',
        status: 'A',
    },
    ]

    useEffect(() => {
        setActiveSetting('attendence')
    }, [])

    return (
        <div>
            <section className='flex flex-wrap items-center gap-3'>
                <div className='bgclr w-fit rounded ps-3'>
                    From :
                    <input onChange={handleChange} name='fromtime' value={filterObj.fromtime}
                        type="date" className='p-2 bg-transparent rounded outline-none' />
                </div>
                <div className='bgclr w-fit rounded ps-3'>
                    To :
                    <input onChange={handleChange} name='totime' value={filterObj.totime}
                        type="date" className='p-2 bg-transparent rounded outline-none' />
                </div>
                <button className='savebtn p-2 rounded border-2 border-green-50 text-white w-40'>
                    Search
                </button>
            </section>
            {/* Table */}

            <main className='bgclr my-3 rounded p-2'>
                <h6>Attendence report </h6>
                <section className='tablebg px-0 border-0 h-[50vh] table-responsive'>
                    <table className='w-full bgclr1'>
                        <tr className='sticky bgclr1 top-0'>
                            <th className='sticky top-0 left-0 bgclr1 z-10'>Date</th>
                            <th>shift</th>
                            <th>Attendence Scheme</th>
                            <th>First IN</th>
                            <th>Last out</th>
                            <th>Work hrs </th>
                            <th>Status</th>
                            <th>Swipe Details </th>
                        </tr>
                        {data.map((obj, index) => (
                            <tr key={index} className={`${obj.status == 'P' ? 'bg-green-50' : 'bg-red-50'} sticky top-11`} >
                                <td className={`sticky ${obj.status == 'P' ? 'bg-green-50' : 'bg-red-50'} left-0`}>{obj.date}</td>
                                <td className=''>{obj.shift}</td>
                                <td>{obj.attendenceScheme}</td>
                                <td>{obj.firstIn}</td>
                                <td>{obj.lastout}</td>
                                <td>{obj.workhrs}</td>
                                <td>{obj.status}</td>
                                <td className='' onClick={() => setshow(index)}><button className='text-blue-500'> Info </button> </td>

                            </tr>
                        ))
                        }
                    </table>
                </section>
            </main>
            <SwipingDetails show={show} setshow={setshow} />
        </div>
    )
}

export default AttendenceInfo