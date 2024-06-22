import React, { useState } from 'react'
import "../assets/css/scroll.css"
import '../assets/css/media.css'
import { Link, useNavigate } from 'react-router-dom'

const Sidebar = () => {
    let [opentab, setOpenTab] = useState(false)

    let logindata = JSON.parse(sessionStorage.getItem('user'))
    console.log("user", logindata.Disgnation);


    return (
        <div>
            <main className='side-bar' style={{ width: "20%", height: "100vh", position: 'fixed', backgroundColor: "rgb(249,249,249)" }}>
                <div className='m-0 m-sm-3' style={{ height: "95%", borderRadius: '20px', overflow: 'hidden', backgroundColor: 'rgb(76,53,117)' }}>
                    <div className="logo p-4 d-flex justify-content-center mt-2 bg-succes " style={{ position: 'sticky', top: '0', zIndex: 1, height: '15%' }}>
                        <img src={require('../assets/logo/merida website logo white.9f5c7931c8ddf828808e.png')} width={160} className='' alt="" />
                    </div>

                    <div className='bg-warnin overflow mt-2' style={{ height: '77%', overflow: 'scroll' }}>
                        <ul className="nav flex-column mx-auto p-4 text-white" style={{ lineHeight: '48px' }} >
                            <Link to={`/dashboard/${logindata.Disgnation}`} className='text-white side-nav '  >

                                <li className='ms-2'><i class="fa-solid fa-house me-3"></i>  Dashboard </li>
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
        </div>
    )
}

export default Sidebar