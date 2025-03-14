import React, { useContext, useEffect, useState } from 'react'
import { HrmStore } from '../../Context/HrmContext'
import Topnav from '../../Components/Topnav'
import ActivityUploadModal from '../../Components/Modals/ActivityUploadModal'
import ActivityDataTable from '../../Components/ActivityComponents/ActivityDataTable'
import axios from 'axios'
import { port } from '../../App'
import { useNavigate, useParams } from 'react-router-dom'
import InterviewPage from './InterviewPage'
import InterviewDataSection from '../../Components/ActivityComponents/InterviewDataSection'
import BackButton from '../../Components/MiniComponent/BackButton'
import EmpNameCom from '../../Components/MiniComponent/EmpNameCom'

const generateDates = (month, year) => {
    const dates = [];
    const date = new Date(year, month, 1);


    while (date.getMonth() === month) {
        const day = String(date.getDate()).padStart(2, '0');
        const monthFormatted = String(date.getMonth() + 1).padStart(2, '0');
        const yearFormatted = date.getFullYear();

        const formattedDate = `${yearFormatted}-${monthFormatted}-${day}`;
        dates.push(formattedDate);

        date.setDate(date.getDate() + 1);
    }
    return dates;
}
const EmployeeActivitySheet = ({ subpage }) => {
    let { empid } = useParams()
    let { setActivePage, setTopNav } = useContext(HrmStore)
    const currentDate = new Date();
    const [dates, setDates] = useState(generateDates(currentDate.getMonth(), currentDate.getFullYear()));
    const [month, setMonth] = useState(currentDate.getMonth());
    const [year, setYear] = useState(currentDate.getFullYear());
    let [showActivityModal, setShowActivityModal] = useState(false)
    const handle_Month_Change = (e) => {
        const selectedYear = parseInt(e.slice(0, 4));
        const selectedMonth = parseInt(e.slice(5, 7)) - 1;

        setYear(selectedYear);
        setMonth(selectedMonth);

        const newDates = generateDates(selectedMonth, selectedYear);
        setDates(newDates)
    }
    useEffect(() => {
        setActivePage('activity')
        if (!empid)
            setTopNav('perosnal')
        else
            setTopNav('myteam')
    }, [empid])
    let navigate = useNavigate()
    return (
        <div>
            {!subpage && <Topnav name={`Activity Sheet`} />}
            <main className='p-2 poppins ' >

                {/* Activity adding */}
                <div className='flex my-2' >
                    {empid &&
                        <BackButton />
                    }

                    {(!empid || empid == JSON.parse(sessionStorage.getItem('dasid'))) &&
                        <button onClick={() => setShowActivityModal(true)} className='bluebtn rounded p-2 ms-auto ' >
                            Add activity
                        </button>
                    }
                </div>

                <ActivityUploadModal empid={empid} show={showActivityModal} setshow={setShowActivityModal} />
                {empid && <EmpNameCom empid={empid} />}
                {/* Modal page */}
                <input
                    type="month" className='p-2 bgclr rounded outline-none'
                    value={`${year}-${String(month + 1).padStart(2, '0')}`}
                    onChange={(e) => handle_Month_Change(e.target.value)} />
                {/* Tables */}
                <ActivityDataTable empid={empid}
                    generateDates={generateDates}
                    dates={dates} month={month} year={year}
                    getTrigger={showActivityModal} />

                <InterviewDataSection getTrigger={showActivityModal}
                    empid={empid ? empid : JSON.parse(sessionStorage.getItem('dasid'))}
                    dates={dates} month={month} year={year} />

            </main>
        </div>
    )
}

export default EmployeeActivitySheet