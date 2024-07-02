import React, { useContext, useEffect, useState } from 'react'
import { HrmStore } from '../../Context/HrmContext'
import PlusIcon from '../../SVG/PlusIcon'
import HolidayModal from '../../Components/Modals/HolidayModal'

const ShowHolidays = () => {
    let { activeSetting, setActiveSetting } = useContext(HrmStore)
    let [showHoliday, setShowHoliday] = useState(false)
    let status = JSON.parse(sessionStorage.getItem('user')).Disgnation
    let data = [
        {
            holiday: 'Pongal',
            Dated: '12-23-2024',
            Day: 'Tuesday'
        },
        {
            holiday: 'Diwali',
            Dated: '12-23-2024',
            Day: 'Tuesday'
        },
        {
            holiday: 'Chirstmas',
            Dated: '12-23-2024',
            Day: 'Tuesday'
        },
    ]
    useEffect(() => {
        setActiveSetting('holidays')
    }, [])
    return (
        <div>
            <HolidayModal show={showHoliday} setshow={setShowHoliday} />
            <main className='tablebg rounded p-3'>
                <article className='flex justify-between items-center'>
                    <h5 className=' poppins '>Holiday Lists </h5>
                    {(status == 'HR' || status == 'admin') && <button onClick={() => setShowHoliday(true)} className='flex items-center text-sm px-2 gap-2 btngrd p-1 rounded text-white'>
                        <PlusIcon />
                        Add Holiday
                    </button>}
                </article>
                <section className={`table-responsive `} >
                    <table className='w-full '>
                        <tr>
                            <th>SI NO </th>
                            <th>Holiday</th>
                            <th>Date </th>
                            <th>Day</th>
                            <th>Type </th>
                        </tr>
                        {
                            data.map((obj, index) => (
                                <tr>
                                    <td className=''>{index + 1} </td>
                                    <td>{obj.holiday} </td>
                                    <td>{obj.Dated} </td>
                                    <td>{obj.Day} </td>
                                    <td>Public </td>
                                </tr>
                            ))
                        }
                    </table>
                </section>
            </main>

        </div>
    )
}

export default ShowHolidays