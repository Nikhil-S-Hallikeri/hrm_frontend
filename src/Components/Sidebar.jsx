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
            <main className='side-bar d-none' style={{ width: "20%", height: "100vh", position: 'fixed', }}>
                <div className='m-0 m-sm-3' style={{ height: "95%", borderRadius: '20px', overflow: 'hidden', backgroundColor: 'rgb(76,53,117)' }}>
                    <div className="logo p-4 d-flex justify-content-center mt-2 bg-succes "
                        style={{ position: 'sticky', top: '0', zIndex: 1, height: '15%' }}>
                        <button><img src={require('../assets/logo/merida website logo white.9f5c7931c8ddf828808e.png')} width={160} className='' alt="" /></button>
                    </div>
                    <div className='bg-warnin overflow mt-2' style={{ height: '77%', overflow: 'scroll' }}>
                        <ul className="nav flex-column mx-auto p-4 text-white" style={{ lineHeight: '48px' }} >
                            <Link to={`/dashboard/${logindata.Disgnation}`} className='text-white side-nav '  >
                                <li className='ms-2'><i class="fa-solid fa-house me-3"></i>
                                    Dashboard </li>
                            </Link>

                            <Link to="/Applaylist" className='text-white side-nav' >

                                <li className='ms-2'> <i class="fa-solid fa-list-check me-3"></i> Applyed List</li>
                            </Link>
                            <Link to='/Reporting_team' className='text-white side-nav' >
                                <li className='ms-2'><i class="fa-solid fa-flag me-3"></i> Reporting Team</li>
                            </Link>
                            <li className='text-white ms-2' onClick={() => setOpenTab(!opentab)}>
                                <i class="fa-solid fa-bars-progress me-3"></i> Employee <span style={{ position: 'relative', left: "10px" }}>
                                    <i class="fa-solid fa-caret-down text-white"></i></span>
                            </li>

                            {opentab && <div class=" ">
                                <ul className='nav flex-column ms-2' >
                                    <div class=" ">
                                        <ul className='nav flex-column ms-2' >
                                            <Link to='/Employee_Overview' className='text-white side-nav' >
                                                <li>Over View</li>
                                            </Link>
                                            <Link to='/AllEmployees' className='text-white side-nav ' >
                                                <li>All Employee</li>
                                            </Link>
                                            <Link to='/Employee_Separation' className='text-white side-nav' >
                                                <li>Separation</li>
                                            </Link>
                                            <Link to='/Mass_Mail' className='text-white side-nav' >
                                                <li>Mass Communication</li>
                                            </Link>
                                            <Link to='/AllEmployees' className='text-white side-nav' >
                                                <li>Approval</li>
                                            </Link>
                                            <Link to='/New_Join_Employee' className='text-white side-nav' >
                                                <li>Employee New Joining</li>
                                            </Link>
                                        </ul>
                                    </div>
                                </ul>
                            </div>
                            }
                            {/* <Link to='/Hr_reporting_team' className='text-white side-nav'>
                                <li className='ms-2'><i class="fa-regular fa-calendar-plus me-3"></i>HR reporting team</li>
                            </Link> */}
                            <Link to='/Sample_acti' className='text-white side-nav' >
                                <li className='ms-2'><i class="fa-solid fa-door-open me-3"></i> Activites</li>
                            </Link>

                            {/* <Link to='/Request' className='text-white side-nav' >
                                <li className='ms-2'><i class="fa-solid fa-flag me-3"></i> Request</li>
                            </Link> */}


                            <Link to='/Testing' className='text-white side-nav'>
                                <li className='ms-2'><i class="fa-regular fa-calendar-plus me-3"></i>Testing</li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </main >
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
                            { name: 'Approval', path: '/dash/approvals' },
                            { name: 'Leave Setting', path: '/dash/leaveCreation' },
                            { name: 'Employee New Joining', path: '/New_Join_Employee' },
                            { name: 'Holidays', path: '/dash/holidays' },
                        ]}
                            label='Employee' active='Employee'
                            img='/assets/Images/Application.png' />
                        {/* <NavbarButton openNavbar={openNavbar} setopen={setNavbar} path={`/Employee_Profile`}
                            label='Paper' active='Paper'
                            img='/assets/Images/Paper.png' /> */}

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