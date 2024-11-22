import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { das, port } from '../../App'
import InfoButton from '../SettingComponent/InfoButton'
import { Modal } from 'react-bootstrap'
import EmployeeTable from '../Tables/EmployeeTable'
import HolidayTable from '../Tables/HolidayTable'

const HROverviewReport = () => {
    let [data, setData] = useState()
    let getData = () => {
        axios.get(`${port}/root/DisplayEmployeeCelebrations`).then((response) => {
            console.log(response.data, 'celeration');
            setData(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div>
            <main className=' container-fluid
            mx-auto min-h-[30vh] row rounded my-5 mb-2 px-0 poppins' >
                <section className='my-2 col-lg-4  ' >
                    <article className='p-3 rounded bg-white h-full ' >
                        <h5 className=' fw-semibold flex relative w-fit ' >Birthday
                            <span className='absolute -top-2 -right-3 ' >
                                <InfoButton size={13}
                                    content="Birthday date for the one week period." />
                            </span>
                        </h5>
                        {/* BirthdayTable */}
                        {data && < EmployeeTable data={data.today_birthdays} />}

                    </article>
                </section>
                <section className='my-2 col-lg-4 ' >
                    <article className='p-3 rounded bg-white h-full ' >
                        <h5 className=' fw-semibold flex relative w-fit ' >Work anniversary
                            <span className='absolute -top-2 -right-3 ' >
                                <InfoButton size={13}
                                    content="Work anniversary for the one week period." />
                            </span>

                        </h5>
                        {data && <EmployeeTable data={data.today_work_anniversaries} />}
                    </article>
                </section>
                {/* Upcoming holiday */}
                <section className='my-2 col-lg-4 ' >
                    <article className='p-3 rounded bg-white h-full ' >
                        <h5 className=' fw-semibold flex relative w-fit ' >Upcoming holidays
                            <span className='absolute -top-2 -right-3 ' >
                                <InfoButton size={13}
                                    content="Holiday date for the one week period." />
                            </span>
                        </h5>
                        {data && <HolidayTable data={data.upcoming_holidays} />}
                    </article>
                </section>

                {/* Today Hires */}
                <section className='my-2 col-lg-4 ' >
                    <article className='p-3 rounded bg-white h-full ' >
                        <h5 className=' fw-semibold flex relative w-fit ' >Today Hires
                            <span className='absolute -top-2 -right-3 ' >
                                <InfoButton size={13}
                                    content="Today hire of employees" />
                            </span>
                        </h5>
                        {data && <EmployeeTable data={data.new_hires} />}
                    </article>
                </section>

                {/* Upcoming holiday */}
                <section className='my-2 col-lg-3 ' >
                    <article className='p-3 rounded bg-white h-full ' >
                        <h5 className=' fw-semibold flex relative w-fit ' >Quick Links
                            <span className='absolute -top-2 -right-3 ' >
                                <InfoButton size={13}
                                    content="Quick Links for our portals" />
                            </span>
                        </h5>
                        <div className=' poppins flex flex-col ' >
                            <a href="https://crm.skilllearningacademy.com/" target='_blank'
                                className=' text-slate-700 my-1 text-decoration-none ' > CRM </a>
                            <a href={`${das}/hrms?user=${JSON.parse(sessionStorage.getItem('dasid'))}&password=${JSON.parse(sessionStorage.getItem('user')).Password}`} target='_blank'
                                className=' text-slate-700 my-1 text-decoration-none ' > DAS </a>
                        </div>
                    </article>
                </section>

                <section className='my-2 col-lg-5 ' >
                    <article className='p-3 rounded bg-white h-full ' >
                        <h5 className=' fw-semibold flex relative w-fit ' >On Leave
                            <span className='absolute -top-2 -right-3 ' >
                                <InfoButton size={13}
                                    content="On leave employee for the one week period." />
                            </span>
                        </h5>
                        {data && <EmployeeTable data={data.on_leaves} />}
                    </article>
                </section>

            </main>

        </div >
    )
}

export default HROverviewReport