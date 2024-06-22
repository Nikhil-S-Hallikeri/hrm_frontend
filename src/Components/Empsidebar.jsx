import React from 'react'
import "../assets/css/scroll.css"
import '../assets/css/media.css'
import { Link } from 'react-router-dom'


const Empsidebar = () => {
    let logindata = JSON.parse(sessionStorage.getItem('user'))
    return (
        <div >
            <div>
                <main className='side-bar' 
                style={{ width: "20%", height: "100vh", position: 'fixed', backgroundColor: "rgb(249,249,249)" }}>
                    <div className='m-3' style={{ height: "95%", borderRadius: '20px', overflow: 'hidden',
                         backgroundColor: 'rgb(76,53,117)' }}>
                        <div className="logo p-4 d-flex justify-content-center mt-2 bg-succes " style={{ position: 'sticky', top: '0', zIndex: 1, height: '15%' }}>
                            <img src={require('../assets/logo/merida website logo white.9f5c7931c8ddf828808e.png')} width={130} height={48} alt="" />
                        </div>

                        <div className='bg-warnin overflow mt-2' style={{ height: '77%', overflow: 'scroll' }}>



                            <ul className="nav flex-column mx-auto p-4 text-white" style={{ lineHeight: '48px' }} >

                                <Link to={`/dashboard/${logindata.Disgnation}`} className='text-white side-nav '  >

                                    <li className='ms-2'><i class="fa-solid fa-house me-3"></i> EMP Dashboard  </li>
                                </Link>
                                <Link to='/Employee_request_form' className='text-white side-nav' >
                                    <li className='ms-2'><i class="fa-solid fa-flag me-3"></i> Request</li>
                                </Link>
                                <Link to='/Report_Manager_Reporting_team' className={`${logindata.reporting_emp_list ? 'd-block' : 'd-none'} text-white side-nav`}>
                                    <li className='ms-2'><i class="fa-solid fa-flag me-3"></i> Reporting Team</li>
                                </Link>

                                <Link to='/Emp_activity_sheet' className='text-white side-nav' >
                                    <li className='ms-2'><i class="fa-solid fa-door-open me-3"></i> Activites</li>
                                </Link>
                                <Link to="/Employee_interview_applicants" className='text-white side-nav'  >
                                    <li className='ms-2'> <i class="fa-solid fa-list-check me-3"></i> Applicants</li>
                                </Link>

                            </ul>
                        </div>
                    </div>

                </main >
            </div>
        </div>
    )
}

export default Empsidebar