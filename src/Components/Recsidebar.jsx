import React from 'react'
import "../assets/css/scroll.css"
import '../assets/css/media.css'
import { Link } from 'react-router-dom'


const Recsidebar = () => {

    let logindata = JSON.parse(sessionStorage.getItem('user'))
    console.log("user", logindata.Disgnation);

    return (
        <div>
            <div>
                <main className='side-bar' style={{ width: "20%", height: "100vh", position: 'fixed', backgroundColor: "rgb(249,249,249)" }}>
                    <div className='m-3' style={{ height: "95%", borderRadius: '20px', overflow: 'hidden', backgroundColor: 'rgb(76,53,117)' }}>
                        <div className="logo p-4 d-flex justify-content-center mt-2 bg-succes " style={{ position: 'sticky', top: '0', zIndex: 1, height: '15%' }}>
                            <img src={require('../assets/logo/merida website logo white.9f5c7931c8ddf828808e.png')} width={130} height={48} alt="" />
                        </div>

                        <div className='bg-warnin overflow mt-2' style={{ height: '77%', overflow: 'scroll' }}>



                            <ul className="nav flex-column mx-auto p-4 text-white" style={{ lineHeight: '48px' }} >

                                <Link to={`/dashboard/${logindata.Disgnation}`} className='text-white side-nav'  >
                                    <li className='ms-2'><i class="fa-solid fa-house me-3"></i> Rec Dashboard </li>
                                </Link>
                                <Link to="/Rec_applyed_list" className='text-white side-nav'  >
                                    <li className='ms-2'> <i class="fa-solid fa-rectangle-list me-3"></i>  Applyed List</li>
                                </Link>
                                <Link to="/Applicants" className='text-white side-nav'  >
                                    <li className='ms-2'> <i class="fa-solid fa-list-check me-3"></i> Applicants</li>
                                </Link>
                                <Link to="/Reporting_team_recuter" className='text-white side-nav'  >
                                    <li className='ms-2'> <i class="fa-solid fa-users-gear me-3"></i> Reporting Team</li>
                                </Link>

                                <Link to='/Recruiter_Activity ' className='text-white side-nav'>

                                    <li className='ms-2'><i class="fa-solid fa-table-cells me-3"></i> Activites</li>
                                </Link>

                                {/* <Link to='/Actii_' className='text-white side-nav'>
                                    <li className=' nav-link'><i class="fa-solid fa-arrows-left-right"></i>Activities</li>
                                </Link>
                                <Link to='/Interview_sche' className='text-white side-nav'>
                                    <li className=' nav-link'><i class="fa-solid fa-arrows-left-right "></i>Interview Scheduled</li>
                                </Link> */}

                            </ul>
                        </div>
                    </div>

                </main >
            </div>
        </div>
    )
}

export default Recsidebar