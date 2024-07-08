import React, { useContext, useState } from 'react'
import "../assets/css/scroll.css"
import '../assets/css/media.css'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import { HrmStore } from '../Context/HrmContext'
import NavbarButton from './HomeComponent/NavbarButton'

const Sidebar = () => {
    let [opentab, setOpenTab] = useState(false)
    let logindata = JSON.parse(sessionStorage.getItem('user'))
    console.log("user", logindata.Disgnation);
    let { activePage, setActivePage, openNavbar, setNavbar } = useContext(HrmStore)
    return (
        <div className={` ${openNavbar && ' w-[270px]'} `}>
            
            <main className='sticky top-0 flex'>
                <section className={`h-[100vh] z-10 py-4 w-[80px] rounded-tr-[40px] bg-white `}>
                    {/* <img className='absolute z-0 top-0 ' src={require('../assets/Images/navbar.png')} alt="Navbar" /> */}
                    <button className='flex mx-auto'>
                        <img className='w-6 ' src={require('../assets/Images/favicon.ico')} alt="Merida icon " />
                    </button>
                    <section className='w-fit mx-auto h-[70vh] 
                     gap-4 flex justify-between flex-col my-4 '>
                        <button onClick={() => setNavbar(!openNavbar)} className={`hover:scale-[1.05] w-fit mx-auto rounded p-2 `}>
                            <img style={{ transform: openNavbar ? 'scaleX(1)' : 'scaleX(-1)' }}
                                className={`w-7 duration-700 `} src={require('../assets/Images/Union.png')} alt="Union" />
                        </button>
                        <NavbarButton openNavbar={openNavbar} setopen={setNavbar} path={`/dashboard/${logindata.Disgnation}`}
                            label='Dashboard' active='dashboard'
                            img='/assets/Images/dashboard.png' />
                        <NavbarButton openNavbar={openNavbar} setopen={setNavbar} path={`/Applaylist`}
                            label='Applyed List' active='applylist'
                            img='/assets/Images/report.png' />
                        <NavbarButton openNavbar={openNavbar} setopen={setNavbar} path={`/Reporting_team`}
                            label='Reporting team' active='Reporting_team'
                            img='/assets/Images/profile.png' />
                        <NavbarButton openNavbar={openNavbar} setopen={setNavbar} path={`/Sample_acti`}
                            label='Activities' active='activity'
                            img='/assets/Images/Work.png' />
                        <NavbarButton openNavbar={openNavbar} setopen={setNavbar} drop={[
                            { name: 'Over View', path: '/Employee_Overview' },
                            { name: 'All Employee', path: '/AllEmployees' },
                            { name: 'Employee Seperation', path: '/Employee_Separation' },
                            { name: 'Mass Communication', path: '/Mass_Mail' },
                            { name: 'Employee New Joining', path: '/New_Join_Employee' },
                        ]}
                            label='Employee' active='Employee'
                            img='/assets/Images/Application.png' />
                        <NavbarButton openNavbar={openNavbar} setopen={setNavbar}
                            label='Leave' active='leave'
                            img='/assets/Images/Paper.png'
                            drop={[
                                { name: 'Approval', path: '/dash/approvals' },
                                { name: 'Attendence list', path: '/dash/attendence-list' },

                                { name: 'Leave Setting', path: '/dash/leaveCreation' },
                            ]} />

                        <NavbarButton openNavbar={openNavbar} setopen={setNavbar} path={`/settings`}
                            label='Setting' active='setting'
                            img='/assets/Images/setting.png' />


                        {/* Not used */}
                        {/* <NavbarButton openNavbar={openNavbar} setopen={setNavbar} path={`/Employee_Profile`}
                            label='Graph' active='Graph'
                            img='/assets/Images/Graph.png' />
                        */}





                    </section>
                </section>
                <section className={`${openNavbar ? 'translate-x-0 ' : 'translate-x-[-280px] '} transition duration-700 sideinleft bg-violet-50
                 border-slate-50 border-e-2 absolute left-0 z-0  w-[270px] h-[100vh]`}>
                    <img src={require('../assets/Images/navbar.png')} alt="Navbar " />
                </section>
            </main>
        </div>
    )
}

export default Sidebar