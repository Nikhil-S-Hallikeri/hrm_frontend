import React, { useContext, useEffect, useState } from 'react'
import '../assets/css/main.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { port } from '../App'
import { Offcanvas } from 'react-bootstrap';
import DropDownIcon from './Icons/DropDownIcon';
import SearchIcon from '../SVG/SearchIcon';
import { HrmStore } from '../Context/HrmContext';
import TopNavScrollBar from './MiniComponent/TopNavScrollBar';
import TopSearchBar from './MiniComponent/TopSearchBar';
import GetGeoLocation from './MiniComponent/GetGeoLocation';


const Topnav = ({ name, navbar }) => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    let [showNotification, setShowNotification] = useState()
    let logindata = JSON.parse(sessionStorage.getItem('user'))
    let Empid = JSON.parse(sessionStorage.getItem('user'))?.EmployeeId
    let { topnav, setTopNav } = useContext(HrmStore)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    let [profileDropdown, setProfileDropdown] = useState()

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    // Logout
    const navigate = useNavigate()

    const logout = () => {
        sessionStorage.removeItem('user')
        navigate("/")
        axios.post(`${port}/root/logout/${user.EmployeeId}/`)
            .then((r) => {
                console.log(" Logout Successfull", r.data)
                sessionStorage.removeItem('user')
                navigate("/")
            })
            .catch((err) => {
                console.log("Logout Error", err)
            })
    }

    const [noti, setnoti] = useState([])

    useEffect(() => {
        axios.get(`${port}/root/Candidatenotifications/${Empid}/`)
            .then((res) => {
                console.log("Noti", res.data);
                setnoti(res.data.reverse())
            }).catch((err) => {
                console.log(err.data);
            })
    }, [])




    const removenoti = (x) => {

        axios.get(`${port}/root/AppliedNotifications/Delete/${x}/`)
            .then((res) => {
                console.log(res.data)
                alert("removed")
                window.location.reload()
            }).catch((err) => {
                console.log(err.data);
            })
    }


    const data1 = {

        datasets: [
            {
                data: [25, 35, 40, 20],
                fill: false,
                backgroundColor: ['rgb(51,153,255)', 'rgb(139,207,255)', 'rgb(245,85,141)', 'rgb(241,152,40)'],
                tension: 0.1,
                barThickness: 2,

            }

        ],
    }

    const [selectedFile, setSelectedFile] = useState(null);



    const handleFileChange = (event) => {
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append('profile_img', file);
        console.log("file", file);
        axios.patch(`${port}/root/UserProfileUpload/${Empid}/`, formData).then((res) => {
            console.log("profile_img_res", res);
            window.location.reload()


        }).catch((err) => {
            console.log("profile_img_err", err);

        })
    };

    // Profile Details 

    let [profile_info, setprofile_info] = useState({})

    useEffect(() => {

        axios.get(`${port}/root/loginuser/${Empid}/`).then((res) => {
            console.log("login_res", res.data);
            setprofile_info(res.data)
        }).catch((err) => {
            console.log("login_err", err.data);
        })
    }, [])


    // Change Password

    let [oldPassword, setoldPassword] = useState(" ")
    let [newPassword, setnewPassword] = useState(" ")

    const navigate1 = useNavigate()


    const changepassword = (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('OldPassword', oldPassword);
        formData.append('NewPassword', newPassword);
        formData.append('EmployeeId', Empid);


        axios.post(`${port}/root/changepassword`, formData).then((res) => {
            console.log("changepassword_res", res.data);
            alert(res.data)
            window.location.reload();




        }).catch((err) => {
            console.log("changepassword_res", err);
            alert(err.data)


        })
    };

    // Profile Information start

    useEffect(() => {

        axios.get(`${port}/root/ems/LoginEmployeeProfile/${Empid}/`).then((res) => {
            console.log("EmployeeProfile_ress", res.data.EmployeeInformation);
            sessionStorage.setItem('Login_Profile_Information', JSON.stringify(res.data.EmployeeInformation))
        }).catch((err) => {
            console.log("EmployeeProfile_err", err.data);

        })

    }, [])
    // Profile Information end


    return (
        <div className=' ' >
            {/* Desktop nav start */}
            <div className={`  ${navbar && "bg-white shadow-sm "}  py-2  mx-0 px-2`}>
                <nav className='d-flex  row flex-wrap justify-between w-full items-center ' >
                    {/* Content */}
                    <section className='flex  col-md-5 my-2 my-lg-0 order-2 order-sm-1 
                    felx-wrap gap-3 ' >
                        {
                            navbar ? <TopNavScrollBar navbar={navbar} /> :
                                <div className='w-full ' >
                                    {!name && <h5 className='poppins fw-semibold mb-3 ' >  Dashboard </h5>}
                                    {!name && <section className='poppins  '>
                                        <h5 className='text-2xl poppins fw-semibold ' >Hello  {user?.UserName}</h5>
                                        <p className='text-xs  '>Track Your Monthly Growth and Performance with<br />
                                            Ongoing Performance Management.
                                        </p>
                                    </section>}
                                    {name && <section className='poppins '>
                                        <h5 className='text-2xl poppins fw-semibold ' > {name}</h5>
                                    </section>}
                                </div>
                        }
                    </section>

                    <main className='flex col-md-7  my-2 my-lg-0 order-1 justify-end flex-wrap flex-lg-nowrap mb-3 my-sm-0 order-sm-2 gap-4 items-center ' >
                        {/* search */}
                        <TopSearchBar navbar={navbar} />


                        {/* search end */}
                        {/* Attendance tracking */}
                        <div>
                            <GetGeoLocation/>
                        </div>
                        <div className="  d-flex justify-content-evenly align-items-center" style={{ width: '18%' }}>
                            {/* notification */}
                            <div onClick={() => setShowNotification(true)} className='p-1 relative rounded bg-slate-200 w-7 h-7 '>
                                <img className='w-5'
                                    src={require('../assets/Images/Notification.png')} alt="Notification" />
                                {noti != undefined && noti.length > 0 &&
                                    <p className=' m-0 rounded-full w-2 h-2 absolute -top-1 right-0 '>
                                    </p>}
                            </div>

                            <Offcanvas show={showNotification} placement='end' onHide={() => setShowNotification(false)} >
                                <Offcanvas.Header closeButton>
                                    Notification
                                </Offcanvas.Header>
                                <Offcanvas.Body>

                                    {noti.map((e) => {
                                        return (
                                            <div>
                                                <div className='d-flex border-bottom ' style={{ width: '100%' }}>
                                                    <div className='' style={{ width: '17%' }}>
                                                        <img width={45} className='mt-3' src={require('../assets/Icon/3135715.png')} alt="" />
                                                    </div>
                                                    <div className='ms-3 ' style={{ width: '60%' }}>
                                                        <small>Name</small>
                                                        <p className=''>
                                                            <small style={{ fontSize: '12px', width: '100%', cursor: 'pointer' }}  >{e.message}</small></p>

                                                    </div>
                                                    <div className='ms-2 ' style={{ width: '28%' }}>
                                                        <small style={{ fontSize: '12px' }}>{e.timestamp}</small> <br />
                                                        <small style={{ position: 'relative', top: '15px', left: '30px' }}><i class="fa-regular fa-circle-xmark" onClick={() => removenoti(e.id)}></i></small>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Offcanvas.Body>
                            </Offcanvas>



                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            ...
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary">Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                        {/* Profile */}
                        <section onClick={() => setProfileDropdown(!profileDropdown)}
                            className='d-none d-lg-flex gap-3 relative items-center poppins ' >
                            {profile_info && (
                                <div className="w-14 h-14 rounded-full">
                                    {profile_info.profile_img ? (
                                        <img
                                            src={profile_info.profile_img}
                                            alt="ProfileImage"
                                            className="w-14 h-14 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-full flex items-center justify-center
                                     bg-blue-600 text-slate-50 font-semibold text-xl">
                                            {profile_info.UserName?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            )}
                            <button className='flex gap-2 items-center ' >
                                <p className='mb-0 pb-0 text-wrap w-[130px] text-start ' >
                                    {profile_info.UserName}
                                </p>
                                <DropDownIcon />
                            </button>
                            {profileDropdown && 
                            <article onMouseLeave={() => setProfileDropdown(false)} className='absolute z-10 shadow p-2 bg-white rounded top-16 w-full ' >
                                <button onClick={() => { navigate(`/dash/employee/${Empid}`); setProfileDropdown(false) }}
                                    className=' my-2  ' >
                                    My Profile
                                </button>
                                <button className=' block my-2 ' onClick={logout} >
                                    Log Out
                                </button>
                            </article>}
                        </section>
                        {/* Profile ends */}

                    </main>
                </nav>
            </div >


            {/* Desktop nav end */}




        </div >
    )
}

export default Topnav