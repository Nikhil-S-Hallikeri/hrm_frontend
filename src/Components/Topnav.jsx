import React, { useEffect, useState } from 'react'
import '../assets/css/main.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { port } from '../App'
import { Offcanvas } from 'react-bootstrap';


const Topnav = ({ name }) => {

    const user = JSON.parse(sessionStorage.getItem('user'))
    let [showNotification, setShowNotification] = useState()
    let logindata = JSON.parse(sessionStorage.getItem('user'))
    let Empid = JSON.parse(sessionStorage.getItem('user')).EmployeeId

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        <div>
            {/* Desktop nav start */}
            <div className='d-lg-block  d-none my-3'>
                <nav className='d-flex flex-wrap justify-between w-full items-center ' >
                    {/* Content */}
                    {!name && <section className='poppins  w-1/4 xl:w-2/6 '>
                        <h5 className='text-2xl poppins fw-semibold ' >Hellow  {user.UserName}</h5>
                        <p className='text-xs  '>Measure How Fast You’re Growing Monthly <br /> Recurring performance management. </p>
                    </section>}
                    {name && <section className='poppins w-1/4 xl:w-2/6 '>
                        <h5 className='text-2xl poppins fw-semibold ' > {name}</h5>
                    </section>}
                    {/* search */}
                    <section class="flex items-center h-fit p-1 rounded-xl bg-white shadow xl:w-72 border">
                        <span class="input-group-text  bg-transparent border-0"
                            id="inputGroup-sizing-lg"><i className="fa-solid text-slate-400  fa-magnifying-glass "
                                style={{ color: '', fontSize: '18px' }}></i>
                        </span>
                        <input type="text" class="bg-transparent outline-none border-0 "
                            aria-describedby="inputGroup-sizing-lg" placeholder='search..' />
                    </section>
                    {/* search end */}
                    <div className="  d-flex justify-content-evenly align-items-center" style={{ width: '18%' }}>
                        {/* notification */}
                        <div onClick={() => setShowNotification(true)} className='p-1 relative rounded bg-slate-200 w-7 h-7 '>
                            <img className='w-5'
                                src={require('../assets/Images/Notification.png')} alt="Notification" />
                            {noti != undefined && noti.length > 0 &&
                                <p className='bg-red-500 m-0 rounded-full w-2 h-2 absolute -top-1 right-0 '>
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
                    <div className="w-[15rem] ms-auto xl:w-[20%] " style={{ width: '' }}>
                        <div className='bg-slate-400 bg-opacity-80 items-center relative h-14 border-2
                         border-slate-50 w-100 rounded-2xl '>
                            <img className='absolute top-[50%] -translate-y-1/2 -left-3 rounded-circle border-2 border-slate-50 object-cover w-14 h-14 '
                                src={profile_info.profile_img} alt="Profile Image" />


                            <div className='ms-auto my-auto w-[85%] poppins ps-4 items-center '
                                style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className=' my-1'>
                                    <p className='mb-0 fw-medium '>{user.UserName}</p>
                                    <small className='text-xs m-0 ' >{user.Disgnation}</small>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div class="dropdown">
                                        <a data-bs-toggle="dropdown" aria-expanded="false">

                                            <i class="fa-solid fa-angle-down text-white" style={{ position: 'relative', right: '25px' }}></i>

                                        </a>

                                        <ul class="dropdown-menu" style={{ width: '200px', position: 'relative', top: '50px' }}>

                                            <div className='d-flex border-bottom'>
                                                <div className='ms-2'>
                                                    <p className='fw-bold ps-1'>{user.UserName}</p>
                                                    <small class="ps-1" style={{ position: 'relative', bottom: "15px", fontSize: '10px' }}>{user.Email}</small>
                                                </div>
                                            </div>
                                            <ul style={{ lineHeight: "40px" }} className='mt-2'>
                                                <Link to='/Employee_Profile' className='text-white side-nav'>
                                                    <li className='nav-link text-secondary' style={{ position: 'relative', right: '12px' }} > <i class="fa-solid fa-user me-4   text-black"></i>My Profile</li>
                                                </Link>

                                                <li className='nav-link text-secondary' style={{ position: 'relative', right: '12px' }}
                                                    onClick={logout}> <i class="fa-solid fa-right-from-bracket me-3  text-black"></i> Log Out</li>
                                            </ul>
                                        </ul>

                                    </div>
                                </div>

                            </div>


                        </div>


                    </div>

                </nav>
            </div >

            <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="false">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel2">Name:</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h1>Candidate Information</h1>
                            {/* <ul class="list-group">
                                                <li class="list-group-item"><strong>Name:</strong> {persondata.FirstName} {persondata.LastName}</li>
                                                <li class="list-group-item"><strong>Email:</strong> {persondata.Email}</li>
                                                <li class="list-group-item"><strong>Gender:</strong> {persondata.Gender}</li>
                                                <li class="list-group-item"><strong>Primary Contact:</strong> {persondata.PrimaryContact}</li>
                                                <li class="list-group-item"><strong>Secondary Contact:</strong> {persondata.SecondaryContact}</li>
                                                <li class="list-group-item"><strong>Location:</strong> {persondata.Location}</li>
                                                <li class="list-group-item ${persondata.Fresher ? '' : 'd-none'}"><strong>Fresher:</strong> Yes</li>
                                                <li class="list-group-item ${persondata.Fresher ? 'd-none' : ''}"><strong>Experience:</strong> Yes</li>
                                                <li class="list-group-item"><strong>Highest Qualification:</strong> {persondata.HighestQualification}</li>
                                                <li class="list-group-item"><strong>University:</strong> {persondata.University}</li>
                                                <li class="list-group-item"><strong>Specialization:</strong> {persondata.Specialization}</li>
                                                <li class="list-group-item"><strong>Percentage:</strong> {persondata.Percentage}</li>
                                                <li class="list-group-item"><strong>Year of Passout:</strong> {persondata.YearOfPassout}</li>
                                                <li class="list-group-item"><strong>Technical Skills:</strong> {persondata.TechnicalSkills}</li>
                                                <li class="list-group-item"><strong>General Skills:</strong> {persondata.GeneralSkills}</li>
                                                <li class="list-group-item"><strong>Soft Skills:</strong> {persondata.SoftSkills}</li>
                                                <li class="list-group-item"><strong>Applied Designation:</strong> {persondata.AppliedDesignation}</li>
                                                <li class="list-group-item"><strong>Expected Salary:</strong> {persondata.ExpectedSalary}</li>
                                                <li class="list-group-item"><strong>Contacted By:</strong> {persondata.ContactedBy}</li>
                                                <li class="list-group-item"><strong>Job Portal Source:</strong> {persondata.JobPortalSource}</li>
                                                <li class="list-group-item"><strong>Applied Date:</strong> {persondata.AppliedDate}</li>
                                            </ul> */}
                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <div class="d-flex gap-2">
                                {/* <button type="button" class="btn btn-primary">Assign Task</button> */}
                                <button type="button" class="btn btn-success" data-bs-target="#exampleModalToggle5" data-bs-toggle="modal">Schedule Interview</button>
                                {/* <button type="button" class="btn btn-info" data-bs-target="#exampleModalToggle7" data-bs-toggle="modal">Offer Letter</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Desktop nav end */}

            {/* Mobile nav start */}
            <nav class="navbar navbar-expand-lg bg-body-tertiary d-lg-none ">
                <div class="container-fluid">
                    <a class="navbar-brand " href="#">
                        <div className="logo p-0 d-flex justify-content-center mt-2 bg-succes " style={{ position: 'sticky', top: '0', zIndex: 1, height: '15%' }}>
                            <img src={require('../assets/logo/merida-logo.b828553ab6c128308899.png')} width={100} alt="" />
                        </div>
                    </a>

                    {/* search start */}
                    <button class="btn " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
                        <img src={require('../assets/Icon/loupe.png')} width={20} alt="" />
                    </button>
                    <div class="offcanvas offcanvas-top p-1" style={{ height: '100px' }} tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                        <div class="offcanvas-header" >
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-bod  p-0" >
                            <input type="search" className='form-control ' placeholder='search here..' />
                        </div>
                    </div>
                    {/* search end */}

                    {/* Notification start */}
                    <button class="btn " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling1" aria-controls="offcanvasScrolling">
                        <img src={require('../assets/Icon/notification.png')} width={20} alt="" />
                    </button>

                    <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling1" aria-labelledby="offcanvasScrollingLabel1">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasScrollingLabel1">Notifications</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">

                            {noti.map((e) => {
                                return (
                                    <div>
                                        <div className='d-flex border-bottom ' style={{ width: '100%' }}>
                                            <div className='' style={{ width: '17%' }}>

                                                <img width={45} className='mt-3' src={require('../assets/Icon/3135715.png')} alt="" />
                                            </div>
                                            <div className='ms-3 ' style={{ width: '60%' }}>
                                                <p>Name <br />
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

                        </div>
                    </div>


                    {/* Notification end */}




                    {/* toggle menu  start */}


                    <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                        <img src={require('../assets/Icon/menu1.png')} width={20} alt="" />
                    </button>

                    <div class="offcanvas offcanvas-end " style={{ transition: '1s ease-in-out' }} tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div class="offcanvas-header">
                            <a class="navbar-brand" href="#">
                                <div className="logo p-0 d-flex justify-content-center mt-2 bg-succes " style={{ position: 'sticky', top: '0', zIndex: 1, height: '15%' }}>
                                    <img src={require('../assets/logo/merida-logo.b828553ab6c128308899.png')} width={100} alt="" />
                                </div>
                            </a>
                            <button type="button" class="btn-close border-0 shadow-none" data-bs-dismiss="offcanvas" aria-label="Close">

                            </button>
                        </div>
                        <div class="offcanvas-body">
                            <main className='' style={{ width: "100%", height: "100vh", position: 'fixed' }}>
                                <div className='m-0' style={{ height: "95%", overflow: 'hidden' }}>

                                    <div className='d-flex justify-content-evenly p-2 align-items-center ' style={{ borderRadius: '15px', width: '85%' }}>
                                        <div className='profile w-100  ' style={{ display: 'flex', borderRadius: '10px', backgroundColor: 'rgb(76,53,117)' }}>

                                            <div className=' w-25' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                                <img className='rounded-circle ms-2' src={profile_info.profile_img} width={38} height={38} alt="" />

                                            </div>
                                            <div className=' w-75 ps-4 ' style={{ display: 'flex', justifyContent: 'space-between' }}>

                                                <div>
                                                    <p style={{ position: 'relative', top: '11px', right: '8px', color: 'white' }}>{user.UserName}</p>
                                                    <small style={{ position: 'relative', bottom: '8px', right: '8px', color: 'white', fontSize: '11px' }}>{user.Disgnation}</small>
                                                </div>

                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <div class="dropdown-center">
                                                        <a data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i class="fa-solid fa-angle-down text-white" style={{ position: 'relative', right: '25px' }}></i>
                                                        </a>

                                                        <ul class="dropdown-menu Top_drop_down" >
                                                            <ul style={{ lineHeight: "40px" }} className='mt-2'>
                                                                <Link to='/Employee_Profile' className='text-white side-nav'>
                                                                    <li className='nav-link text-secondary' style={{ position: 'relative', right: '12px' }} > <i class="fa-solid fa-user me-4   text-black"></i>My Profile</li>
                                                                </Link>

                                                                <li className='nav-link text-secondary' style={{ position: 'relative', right: '12px' }} onClick={logout}> <i class="fa-solid fa-right-from-bracket me-3  text-black"></i> Log Out</li>
                                                            </ul>
                                                        </ul>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                    <div className=' overflow ' style={{ height: '88%', overflow: 'scroll' }}>



                                        <ul className="nav flex-column mx-auto p-4 text-black" style={{ lineHeight: '48px' }} >


                                            <Link to={`/dashboard/${logindata.Disgnation}`} className='text-black side-nav '  >

                                                <li className='ms-2'><i class="fa-solid fa-house me-3"></i> HR Dashboard </li>
                                            </Link>

                                            <Link to="/Applaylist" className='text-black side-nav' >

                                                <li className='ms-2'> <i class="fa-solid fa-list-check me-3"></i> Applyed List</li>
                                            </Link>

                                            <Link to='/Request' className='text-black side-nav' >
                                                <li className='ms-2'><i class="fa-solid fa-flag me-3"></i> Request</li>
                                            </Link>

                                            <Link to='/Sample_acti' className='text-black side-nav' >
                                                <li className='ms-2'><i class="fa-solid fa-door-open me-3"></i> Activites</li>
                                            </Link>

                                            <Link to='/Reporting_team' className='text-black side-nav' >
                                                <li className='ms-2'><i class="fa-solid fa-flag me-3"></i> Reporting Team</li>
                                            </Link>
                                            <li className='text-black ms-2' data-bs-toggle="collapse" href="#multiCollapseExample123" aria-expanded="false" aria-controls="multiCollapseExample1"> <i class="fa-solid fa-bars-progress me-1"></i> Employee Management <span style={{ position: 'relative', left: "10px" }}><i class="fa-solid fa-caret-down text-black"></i></span></li>
                                            <div class="collapse multi-collapse" id="multiCollapseExample123">
                                                <div class=" ">
                                                    <ul className='nav flex-column ms-2' >


                                                        <div class=" ">
                                                            <ul className='nav flex-column ms-2' >


                                                                <Link to='/Employee_Overview' className='text-black side-nav' >
                                                                    <li>Over View</li>
                                                                </Link>

                                                                <Link to='/AllEmployees' className='text-black side-nav' >
                                                                    <li>All Employee</li>
                                                                </Link>

                                                                <Link to='/Employee_Separation' className='text-black side-nav' >
                                                                    <li>Separation</li>
                                                                </Link>

                                                                <Link to='/Mass_Mail' className='text-black side-nav' >
                                                                    <li>Mass Communication</li>
                                                                </Link>

                                                                <Link to='/AllEmployees' className='text-black side-nav' >
                                                                    <li>Approval</li>
                                                                </Link>
                                                                <Link to='/New_Join_Employee' className='text-black side-nav' >
                                                                    <li>Employee New Joining</li>
                                                                </Link>


                                                            </ul>
                                                        </div>

                                                    </ul>
                                                </div>
                                            </div>

                                            <li className='text-black ms-2' data-bs-toggle="collapse" href="#multiCollapseExample133" aria-expanded="false" aria-controls="multiCollapseExample1"> <i class="fa-solid fa-bars-progress me-1"></i> Leave Management <span style={{ position: 'relative', left: "10px" }}><i class="fa-solid fa-caret-down text-black"></i></span></li>
                                            <div class="collapse multi-collapse" id="multiCollapseExample133">
                                                <div class=" ">
                                                    <ul className='nav flex-column ms-2' >
                                                        <Link to='/Leaveapplyform' className='text-black side-nav' >
                                                            <li  >Leave application</li>
                                                        </Link>

                                                        <Link to='/Holidays' className='text-black side-nav' >
                                                            <li>Holidays</li>
                                                        </Link>


                                                    </ul>
                                                </div>
                                            </div>






                                        </ul>
                                    </div>
                                </div>

                            </main >
                        </div>
                    </div>

                    {/* toggle menu  end */}

                </div>
            </nav>
            {/* Mobile nav end */}



            {/* Profile Modal  start*/}

            <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-fullscreen ">
                    <div class="modal-content " style={{ backgroundColor: 'rgb(249,251,253)' }}>
                        <button type="button" class="btn-close p-2" data-bs-dismiss="modal" aria-label="Close"
                            style={{ position: 'absolute', right: '0' }}>

                        </button>

                        {/* Start */}

                        <section className='p-1 m-3 h-100 ' style={{ backgroundColor: 'rgb(249,251,253,.2)' }}>

                            <div class="row m-0 p-1 ">
                                <div className=" col-md-4 col-lg-4  p-2">

                                    <div class="row m-0  ">

                                        <div className="col-sm-12  rounded p-2 border-warning" style={{ backgroundColor: 'rgb(160,217,180)' }}>

                                            <div className='w-100 '>
                                                <div className='d-flex mx-auto mt-2 w-100'>
                                                    <img class="mx-auto rounded-circle" src={profile_info.profile_img} width={100} height={100} alt="" />
                                                </div>


                                                <div className='text-center mt-4'>
                                                    <h4>{profile_info.UserName}</h4>
                                                    <p>{user.Disgnation}</p>
                                                </div>
                                                <div className='mt-3 d-flex justify-content-center '>

                                                    <ul className='d-flex justify-content-around w-75 mt-2 me-3'>
                                                        <li className='nav-link border border-success rounded-circle' style={{ padding: '4px 8px' }}><i class="fa-solid fa-user-tie"></i></li>
                                                        <li className='nav-link border border-success rounded-circle' style={{ padding: '4px 8px' }}><i class="fa-brands fa-github"></i></li>
                                                        <li className='nav-link border border-success rounded-circle' style={{ padding: '4px 8px' }}><i class="fa-brands fa-linkedin"></i></li>
                                                        <li className='nav-link border border-success rounded-circle' style={{ padding: '4px 8px' }}><i class="fa-brands fa-square-instagram"></i></li>
                                                        <li className='nav-link border border-success rounded-circle' style={{ padding: '4px 8px' }}><i class="fa-brands fa-facebook"></i></li>
                                                    </ul>

                                                </div>

                                            </div>
                                            <div style={{ position: 'absolute', left: '263px', top: '110px', width: '25px', height: '25px', backgroundColor: 'rgb(251,239,178)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                                {/* <i class="fa-solid fa-upload " id="fileInput" type="file" accept="image/*" style={{ fontSize: '12px' }}></i> */}
                                                <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} style={{ width: '25px', height: '25px', borderRadius: '50%' }} />
                                            </div>


                                        </div>

                                    </div>
                                </div>
                                <div className=" col-md-8 col-lg-8  p-2">
                                    <div class="row m-0 ms-2">

                                        <div className="col-sm-12 border border-success  rounded" style={{ backgroundColor: 'rgb(255,221,64,.4)' }} >

                                            <div className='w-100  p-3 ' >
                                                <h4 className='text-success '>ABOUT</h4>
                                                <div className='d-flex' style={{ lineHeight: '45px' }}>


                                                    <div>
                                                        <div className='fw-bold'>
                                                            Employee ID
                                                        </div>
                                                        <div className='fw-bold'>
                                                            Name
                                                        </div>
                                                        <div className='fw-bold'>
                                                            Email
                                                        </div>
                                                        <div className='fw-bold'>
                                                            Phone Number
                                                        </div>
                                                    </div>
                                                    <div className='ms-4 ps-5'>
                                                        <div>
                                                            {user.EmployeeId}
                                                        </div>
                                                        <div>
                                                            {user.UserName}
                                                        </div>
                                                        <div>
                                                            {user.Email}
                                                        </div>
                                                        <div>
                                                            {user.PhoneNumber}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className='btn btn-warning btn-sm' data-bs-target="#exampleModal7" data-bs-toggle="modal" >Change Password</button>

                                                {/* <button class="btn btn-primary" data-bs-target="#exampleModal7" data-bs-toggle="modal">
                                                    Launch demo modal
                                                </button> */}





                                            </div>


                                        </div>

                                    </div>
                                </div>

                            </div>



                            <div class="row m-0 p-1 mt-1">
                                <div className=" col-md-5 col-lg-5  p-2">

                                    <div class="row m-0  ">

                                        <div className="col-sm-12  rounded p-3" style={{ backgroundColor: 'rgb(160,217,180)' }}>

                                            <h5>PERSONALITY</h5>
                                            <div className='p-3 '>

                                                <div className='mt-4'>
                                                    <h6> work</h6>

                                                </div>
                                                <div className='mt-4'>

                                                    <h6> Attendance</h6>
                                                </div>
                                                <div className='mt-4'>

                                                    <h6>Punctuality</h6>
                                                </div>
                                                <div className='mt-4'>

                                                    <h6>  Technical Skills</h6>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className=" col-md-7 col-lg-7  p-2">
                                    <div class="row m-0 ms-2">

                                        <div className="col-sm-12 p-2 rounded" style={{ backgroundColor: 'rgb(160,217,180)' }}>

                                            <h5 className='ms-2 mt-1'>PROJECTS STATUS</h5>

                                            <div className='d-flex justify-content-around'>
                                                <div class="  rounded p-4 mt-3  w-25" >


                                                    <Doughnut data={data1}></Doughnut>

                                                </div>
                                                <div class="  rounded p-4 mt-3  w-25" >


                                                    <Doughnut data={data1}></Doughnut>

                                                </div>
                                                <div class="  rounded p-4 mt-3  w-25" >


                                                    <Doughnut data={data1}></Doughnut>

                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-around'>
                                                <small>SLA</small>
                                                <small>HRMS</small>
                                                <small>FTA</small>
                                            </div>


                                        </div>

                                    </div>
                                </div>

                            </div>




                        </section>

                        {/* End */}


                    </div>
                </div>
            </div>
            {/* Profile Modal end */}

            <div class="modal fade" id="exampleModal7" tabindex="-1" aria-labelledby="exampleModalLabel7" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel7">Change Password</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="col-md-12 col-lg-12 mb-3 text-start">
                                <label htmlFor="Name" className="form-label text-start">Old Password </label>
                                <input type="text" className="form-control shadow-none" id="Name" name="Name" value={oldPassword} onChange={(e) => setoldPassword(e.target.value)} />
                            </div>
                            <div className="col-md-12 col-lg-12 mb-3 text-start">
                                <label htmlFor="Name" className="form-label text-start">New Password </label>
                                <input type="text" className="form-control shadow-none" id="Name" name="Name" value={newPassword} onChange={(e) => setnewPassword(e.target.value)} />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onClick={changepassword}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>



        </div >
    )
}

export default Topnav