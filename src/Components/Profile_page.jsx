import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { port } from '../App'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/css/Login_.css'




const Profile_page = () => {

    let Empid = JSON.parse(sessionStorage.getItem('user')).EmployeeId
    const user = JSON.parse(sessionStorage.getItem('user'))
    let logindata = JSON.parse(sessionStorage.getItem('user'))
    // Leave applay form start

    const [Employee_Id, setEmployee_Id] = useState("");
    const [Name, setName] = useState("");
    const [phone, setphone] = useState("");
    const [email, setemail] = useState("");
    const [Reporting_manager, setReporting_manager] = useState("");
    const [Employee_type, setEmployee_type] = useState("");
    const [LeaveType, setLeaveType] = useState("");
    const [FromDate, setFromDate] = useState("");
    const [ToDate, setToDate] = useState("");
    const [Days, setDays] = useState("");
    const [Reason, setReason] = useState("");
    const [Any_proof, setAny_proof] = useState("");

    const handle_Leave_apply_form = (e) => {
        e.preventDefault();

        // Convert input date strings to Date objects
        const fromDateObj = new Date(FromDate);
        const toDateObj = new Date(ToDate);

        // Calculate the difference in milliseconds
        const differenceInTime = toDateObj.getTime() - fromDateObj.getTime();

        // Convert milliseconds to days
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        // Set the calculated days
        setDays(differenceInDays);

        // Other form submission logic can follow
        alert("leave Form");

        const formData1 = new FormData();
        formData1.append('Employee_Id', Employee_Id);
        formData1.append('Name', Name);
        formData1.append('phone', phone);
        formData1.append('email', email);
        formData1.append('Reporting_manager', Reporting_manager);
        formData1.append('Employee_type', Employee_type);
        formData1.append('LeaveType', LeaveType);
        formData1.append('FromDate', FromDate);
        formData1.append('ToDate', ToDate);
        formData1.append('Days', differenceInDays); // Here we are sending the calculated difference
        formData1.append('Reason', Reason);
        formData1.append('Any_proof', Any_proof);

        for (let pair of formData1.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
    };
    // Leave applay form end

    // resignation Apply form Start

    let Profile_Info = JSON.parse(sessionStorage.getItem('Login_Profile_Information'))

    // EMPLOYEE RESIGNATION FORM  START

    const [Reason1, setReason1] = useState('');
    const [HRmanager, setHRmanager] = useState('');
    const [resigned_letter_file, setresigned_letter_file] = useState({});
    const [Confirm_resignation, setConfirm_resignation] = useState(false);

    const handle_employee_Resignation_info = (e) => {
        e.preventDefault()
        alert("EMPLOYEE RESIGNATION FORM ")

        // console.log(resigned_letter_file)
        const formData1 = new FormData()

        formData1.append('employee_id', Profile_Info.employee_Id);
        formData1.append('name', Profile_Info.full_name);
        formData1.append('position', Profile_Info.Position);
        formData1.append('reporting_manager_name', Profile_Info.RepotringTo_Id);
        formData1.append('HR_manager_name', HRmanager);
        formData1.append('reason', Reason1);
        formData1.append('resigned_letter_file', resigned_letter_file);
        formData1.append('Confirm_resignation', Confirm_resignation);


        for (let pair of formData1.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        axios.post(`${port}root/ems/ResignationRequest`, formData1).then((res) => {

            console.log("EMPLOYEE_RESIGNATION_FORM_RES", res.data);
            alert(res.data)


        }).catch((err) => {

            console.log("EMPLOYEE_RESIGNATION_FORM_ERR", err.data);

        })

    }
    //  EMPLOYEE RESIGNATION FORM  END

    // HR Manager Start

    const [interviewers, setinterviewers] = useState([])

    useEffect(() => {

        axios.get(`${port}/root/ems/HRList`).then((res) => {
            console.log("HrManager", res.data);
            setinterviewers(res.data)
        }).catch((error) => console.log(error))
    }, [])
    // HR Manager End

    // resignation Apply form end

    // Profile Data START
    let [profile_info, setprofile_info] = useState({})
    useEffect(() => {

        axios.get(`${port}/root/loginuser/${Empid}/`).then((res) => {
            console.log("login_res", res.data);
            setprofile_info(res.data)



        }).catch((err) => {
            console.log("login_err", err.data);

        })

    }, [])
    // Profile Data END

    // Profile Img change Start
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
    // Profile Img change End

    // Change Password

    let [oldPassword, setoldPassword] = useState("")
    let [newPassword, setnewPassword] = useState("")


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

    // Logout
    const navigate = useNavigate()

    const logout = () => {
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

    // Employee Information start
    // const [EMPLOYEE_INFORMATION, setEMPLOYEE_INFORMATION] = useState([])

    // const sentparticularData = (id) => {

    //     console.log(id);

    //     axios.get(`${port}/root/ems/EmployeeProfile/${id}/`)
    //         .then(response => {

    //             console.log('Paticular_Employee_Data_Res', response.data);
    //             setEMPLOYEE_INFORMATION(response.data.EmployeeInformation)
    //             // setREFERENCE(response.data.CandidateReferenceDetails)
    //             // setEDUCATION_DETAILS(response.data.EducationDetails);
    //             // setCONTACT_EMERGENCY(response.data.EmergencyContactDetails);
    //             // setFAMILY_DETAILS(response.data.FamilyDetails);
    //             // setEMERGENCY_DETAILS(response.data.EmergencyDetails);
    //             // setLAST_POSITION_HELD(response.data.LastPositionHeldDetails);
    //             // setEXPERIENCE_LAST_POSITION(response.data.ExperienceDetails);

    //         })
    //         .catch(error => {

    //             console.error('Paticular_Employee_Data_Err', error.data);
    //         });
    // };

    // Employee Information End


    return (
        <div>
            <div style={{ width: '100%',minHeight: '100vh', background: 'rgb(245,245,245)' }}>
                <Link to={`/dashboard/${logindata.Disgnation}`} className='text-black'>

                    <i class="fa-solid fa-arrow-left" style={{ position: 'absolute', left: '47px', top: '35px' }}></i>
                </Link>

                <div className="row  m-0">

                    <div className="col-sm-8  ">

                        <div className='p-2 p-sm-4 m-3 m-sm-4 bg-white rounded'>

                            <div className='d-flex row m-0'>
                                <div className="profile_img col-sm-4  ">

                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <div className='rounded-circle' style={{ width: '150px', height: '150px', backgroundColor: 'rgb(76,53,117)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <img className='rounded-circle object-cover ' style={{ width: '150px', height: '150px' }} src={profile_info.profile_img} alt="Profile Image" />
                                        </div>
                                        <div className='text-center mt-3'>
                                            <h4>{profile_info.UserName} </h4>
                                            <h6 style={{ color: 'rgb(76,53,117)' }}> {user.Position}</h6>

                                        </div>
                                        <div style={{ position: 'relative', left: '63px', bottom: '120px', width: '25px', height: '25px', backgroundColor: 'rgb(251,239,178)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                            {/* <i class="fa-solid fa-upload " id="fileInput" type="file" onChange={handleFileChange} accept="image/*" style={{ fontSize: '12px' }}></i> */}
                                            <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} style={{ width: '25px', height: '25px', borderRadius: '50%', backgroundColor: 'red' }} />
                                        </div>
                                    </div>



                                </div>
                                <div className="details col-sm-6 ">

                                    <div className=' ms-4' style={{ lineHeight: '120px' }}>

                                        <div className='mt-3'>
                                            <h6 className={` rounded-3 border text-white p-1 ${user.is_login ? 'bg-success' : 'bg-red '}`} style={{ width: 'fit-content' }}> Active</h6>
                                        </div>

                                        <div className='mt-4'>
                                            <h6>Employee ID : <span className='text-secondary'> {user.EmployeeId}</span></h6>
                                        </div>
                                        <div className='mt-4'>
                                            <h6>Name :  <span className='text-secondary'>{user.UserName}</span> </h6>
                                        </div>
                                        <div className='mt-4'>
                                            <h6>Email   : <span className='text-secondary'>{user.Email} </span></h6>
                                        </div>
                                        <div className='mt-4'>
                                            <h6>Phone Number : <span className='text-secondary'>+91 {user.PhoneNumber}</span></h6>
                                        </div>




                                    </div>

                                </div>
                                <div className="Media col-sm-2   ">

                                    <div className=' '>

                                        <ul className='mt-3 media-icons me-sm-0  me-5' >
                                            <li className='nav-link border  border-success rounded-circle mt-2' style={{width:'35px',height:'35px',display:'flex',justifyContent:'center',alignItems:'center'}} ><i class="fa-solid fa-user-tie"></i></li>
                                            <li className='nav-link  border  border-success rounded-circle mt-2' style={{width:'35px',height:'35px',display:'flex',justifyContent:'center',alignItems:'center'}} ><i class="fa-brands fa-github"></i></li>
                                            <li className='nav-link  border  border-success rounded-circle mt-2' style={{width:'35px',height:'35px',display:'flex',justifyContent:'center',alignItems:'center'}} ><i class="fa-brands fa-linkedin"></i></li>
                                            <li className='nav-link  border  border-success rounded-circle mt-2'  style={{width:'35px',height:'35px',display:'flex',justifyContent:'center',alignItems:'center'}}><i class="fa-brands fa-square-instagram"></i></li>
                                            <li className='nav-link  border  border-success rounded-circle mt-2'  style={{width:'35px',height:'35px',display:'flex',justifyContent:'center',alignItems:'center'}}><i class="fa-brands fa-facebook"></i></li>
                                        </ul>

                                    </div>

                                </div>

                            </div>

                        </div>

                        

                    </div>
                    <div className="col-sm-4   ">

                        <div className='p-4 m-3 m-sm-4 bg-white rounded'>

                            <h4 className='bg-light p-1'> <i class="fa-solid fa-person-running me-4 " style={{ color: 'rgb(76,53,117)' }}> </i> Action</h4>

                            <ul style={{ position: 'relative', right: '30px' }}>

                                <li className='nav-link mt-4' data-bs-target="#exampleModal7" data-bs-toggle="modal" ><i class="fa-solid fa-key me-2"></i> Change Password</li>
                                <li style={{ position: 'relative', top: '10px' }} className='nav-link mt-2'><i class="fa-solid fa-user me-2"></i> Edit Profile</li>
                                <li style={{ position: 'relative', top: '20px' }} onClick={logout} className='nav-link mt-2'><i class="fa-solid fa-right-from-bracket me-2"></i> Log Out</li>
                            </ul>

                        </div>

                        <div className='p-4 m-3 bg-white rounded'>
                            <div class="dropdown">
                                <h4 className='bg-light p-2 ' data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-person-circle-question me-4 " style={{ color: 'rgb(76,53,117)' }}> </i>  Request <i class="fa-solid fa-angle-down" style={{ position: 'relative', left: '150px' }}></i></h4>
                                <ul class="dropdown-menu w-100 border-0">
                                    <li data-bs-toggle="modal" data-bs-target="#exampleModal1"><a class="dropdown-item" href="#">Leave Request</a></li>
                                    <li data-bs-toggle="modal" data-bs-target="#exampleModal2"><a class="dropdown-item" href="#">Resignation Request</a></li>
                                    <li data-bs-toggle="modal" data-bs-target="#exampleModal3"><a class="dropdown-item" href="#">Work From Home Request</a></li>
                                </ul>
                            </div>

                            {/* Change Password Start */}
                            {/* <div class="modal fade" id="exampleModal7" tabindex="-1" aria-labelledby="exampleModalLabel7" aria-hidden="true">
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
                            </div> */}
                            <div class="modal fade" id="exampleModal7" tabindex="-1" aria-labelledby="exampleModalLabel7" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel7">Change Password</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form>
                                                <div class="mb-1 inputGroup w-100">
                                                    <label for="oldPassword" class="form-label">Old Password</label>
                                                    <input type="password" class="form-control shadow-none" id="oldPassword" name="oldPassword" value={oldPassword} onChange={(e) => setoldPassword(e.target.value)} required />
                                                    <div class="invalid-feedback">
                                                        Please enter your old password.
                                                    </div>
                                                </div>
                                                <div class="mb-3 inputGroup w-100">
                                                    <label for="newPassword" class="form-label">New Password</label>
                                                    <input type="password" class="form-control shadow-none" id="newPassword" name="newPassword" value={newPassword} onChange={(e) => setnewPassword(e.target.value)} required />
                                                    <div class="invalid-feedback">
                                                        Please enter your new password.
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" onClick={changepassword} >Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Change Password End */}

                            {/* Leave Applay Form Start */}
                            <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">

                                            <form>
                                                {/* Form start */}
                                                <div className="row justify-content-center m-0">
                                                    <h3 className='mt-2 text-center p-3' style={{ color: 'rgb(76,53,117)' }}>Leave Apply form</h3>
                                                    <div className="col-lg-12 p-4 mt-2 border rounded-lg">
                                                        <div className="row m-0 pb-2" style={{ lineHeight: '30px' }}>
                                                            {/* Form fields */}
                                                            <div className="col-md-6 col-lg-4 mb-3">
                                                                <label htmlFor="Name" className="form-label">Employee_Id* </label>
                                                                <input type="text" className="form-control shadow-none" id="Name" name="Name" value={Employee_Id} onChange={(e) => setEmployee_Id(e.target.value)} />
                                                            </div>
                                                            <div className="col-md-6 col-lg-4 mb-3">
                                                                <label htmlFor="Name" className="form-label">Name* </label>
                                                                <input type="text" className="form-control shadow-none" id="Name" name="Name" value={Name} onChange={(e) => setName(e.target.value)} />
                                                            </div>
                                                            <div className="col-md-6 col-lg-4 mb-3">
                                                                <label htmlFor="lastName" className="form-label">phone*</label>
                                                                <input type="tel" className="form-control shadow-none" value={phone} onChange={(e) => setphone(e.target.value)} id="LastName" name="LastName" />
                                                            </div>
                                                            <div className="col-md-6 col-lg-4 mb-3">
                                                                <label htmlFor="email" className="form-label">email*</label>
                                                                <input type="email" className="form-control shadow-none" value={email} onChange={(e) => setemail(e.target.value)} id="Email" name="Email" />
                                                            </div>

                                                            <div className="col-md-6 col-lg-4 mb-3">
                                                                <label htmlFor="secondaryContact" className="form-label"> Reporting manager*</label>
                                                                <input type="text" className="form-control shadow-none" value={Reporting_manager} onChange={(e) => setReporting_manager(e.target.value)} id="State" name="State" />
                                                            </div>

                                                            <div className="col-md-6 col-lg-4 mb-3">
                                                                <label htmlFor="ageGroup" className="form-label"> Employee type*</label>
                                                                <select className="form-select" id="ageGroup" value={Employee_type} onChange={(e) => setEmployee_type(e.target.value)}>
                                                                    <option value="">Select</option>
                                                                    <option value="yes">Yes</option>
                                                                    <option value="no">No</option>
                                                                </select>
                                                            </div>


                                                            <div className="col-md-6 col-lg-4 mb-3">
                                                                <label htmlFor="ageGroup" className="form-label">  LeaveType*</label>
                                                                <select className="form-select" id="ageGroup" value={LeaveType} onChange={(e) => setLeaveType(e.target.value)}>
                                                                    <option value="">Select</option>
                                                                    <option value="yes">Yes</option>
                                                                    <option value="no">No</option>
                                                                </select>
                                                            </div>

                                                            <div className="col-md-6 col-lg-3 mb-3">
                                                                <label htmlFor="secondaryContact" className="form-label">FromDate*</label>
                                                                <input type="date" className="form-control shadow-none" value={FromDate} onChange={(e) => setFromDate(e.target.value)} id="State" name="State" />
                                                            </div>
                                                            <div className="col-md-6 col-lg-3 mb-3">
                                                                <label htmlFor="secondaryContact" className="form-label">ToDate*</label>
                                                                <input type="date" className="form-control shadow-none" value={ToDate} onChange={(e) => setToDate(e.target.value)} id="State" name="State" />
                                                            </div>
                                                            <div className="col-md-6 col-lg-2 mb-3">
                                                                <label htmlFor="secondaryContact" className="form-label">Days</label>
                                                                <input type="number" className="form-control shadow-none" value={Days} id="State" name="State" readOnly />
                                                            </div>
                                                            {/* Additional form fields */}
                                                            {/* Add additional form fields here */}
                                                            <div className="col-md-6 col-lg-12 mb-3">
                                                                <label htmlFor="secondaryContact" className="form-label">Reason*</label>
                                                                <textarea type="email" className="form-control shadow-none" style={{ height: '80px' }} value={Reason} onChange={(e) => setReason(e.target.value)} id="State" name="State" />
                                                            </div>
                                                            <div className="col-md-6 col-lg-6 mb-3">
                                                                <label htmlFor="secondaryContact" className="form-label">Any proof*</label>
                                                                <input type="email" className="form-control shadow-none" value={Any_proof} onChange={(e) => setAny_proof(e.target.value)} id="State" name="State" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* form end */}
                                                {/* Button start */}
                                                <div className="d-flex justify-content-end mt-2">
                                                    <div className='d-flex gap-2 p-3'>
                                                        <button type="submit" className="btn btn-success btn-sm" onClick={handle_Leave_apply_form}>Submit</button>
                                                    </div>
                                                </div>
                                                {/* Button end */}
                                            </form>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* Leave Applay Form End */}

                            {/* Resignation Form Start */}
                            <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">

                                            <form>
                                                {/* Form start */}
                                                <div className="row justify-content-center m-0 ">
                                                    <h3 className='mt-2 text-center p-3' style={{ color: 'rgb(76,53,117)' }}>Employee Resignation Form</h3>

                                                    <div className="col-lg-12 p-4 mt-4 border rounded-lg ">
                                                        <div className="row m-0 pb-2">
                                                            <div className="col-md-6 col-lg-6 mb-3">
                                                                <label htmlFor="Name" className="form-label">Employee id* </label>
                                                                <input type="text" className="form-control shadow-none" id="Name" name="Name" value={Profile_Info.employee_Id} />
                                                            </div>
                                                            <div className="col-md-6 col-lg-6 mb-3">
                                                                <label htmlFor="Name" className="form-label">Name* </label>
                                                                <input type="text" className="form-control shadow-none" id="Name" name="Name" value={Profile_Info.full_name} />
                                                            </div>
                                                            <div className="col-md-6 col-lg-6 mb-3">
                                                                <label htmlFor="lastName" className="form-label">Position*</label>
                                                                <input type="text" className="form-control shadow-none" value={Profile_Info.Position} id="LastName" name="LastName" />
                                                            </div>
                                                            <div className="col-md-6 col-lg-6 mb-3">
                                                                <label htmlFor="email" className="form-label">Reporting manager*</label>
                                                                <input type="text" className="form-control shadow-none" value={Profile_Info.RepotringTo_Name === null ? `${Profile_Info.full_name} , ${Profile_Info.RepotringTo_Id}` : `${Profile_Info.RepotringTo_Name} , ${Profile_Info.RepotringTo_Id}`} id="Email" name="Email" />
                                                            </div>


                                                            <div class="col-md-6 col-lg-6 mb-3">
                                                                <label for="interviewer">HR manager*</label>
                                                                <select id="interviewer" name="interviewer" onChange={(e) => setHRmanager(e.target.value)} required class="form-control">
                                                                    <option value="" selected>Select Name</option>
                                                                    {interviewers.map(interviewer => (
                                                                        <option key={interviewer.EmployeeId} value={interviewer.EmployeeId}>
                                                                            {`${interviewer.EmployeeId},${interviewer.Name}`}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="col-md-6 col-lg-6 mb-3">
                                                                <label htmlFor="secondaryContact" className="form-label">resigned_letter file*</label>
                                                                <input type="file" className="form-control shadow-none" onChange={(e) => setresigned_letter_file(e.target.files[0])} id="SecondaryContact" name="SecondaryContact" />
                                                            </div>

                                                            <div className="col-md-6 col-lg-12 mb-3">
                                                                <label htmlFor="primaryContact" className="form-label" style={{ color: 'rgb(76,53,117)' }}>Reason*</label>
                                                                <textarea type="text" className="form-control shadow-none" value={Reason1} onChange={(e) => setReason1(e.target.value)} id="PrimaryContact" name="PrimaryContact" style={{ height: '60px' }} />
                                                            </div>

                                                            <div className="col-md-6 col-lg-4 mb-3 mt-2 pt-3">
                                                                <input type="checkbox" className=" shadow-none" value={Confirm_resignation} onChange={(e) => {
                                                                    setConfirm_resignation(!Confirm_resignation)
                                                                }} id="State" name="State" />
                                                                <label htmlFor="secondaryContact" className="form-label ms-4">Confirm resignation</label>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                                {/* form end */}
                                                {/* Button start */}
                                                <div class=" d-flex justify-content-end mt-2">

                                                    <div className='d-flex gap-2'>


                                                        <button type="submit" class="btn btn-success btn-sm" onClick={handle_employee_Resignation_info}  >Submit</button>



                                                    </div>
                                                </div>
                                                {/* Button end */}
                                            </form>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* Resignation Form End */}

                            {/* Work Form Start */}
                            <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel3" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">

                                            <form>
                                                {/* Form start */}
                                                <div className="row justify-content-center m-0">
                                                    <h3 className='mt-2 text-center p-3' style={{ color: 'rgb(76,53,117)' }}>Leave Apply form</h3>
                                                    <div className="col-lg-12 p-4 mt-2 border rounded-lg">
                                                        <div className="row m-0 pb-2" style={{ lineHeight: '30px' }}>
                                                            {/* Form fields */}
                                                            <div className="col-md-6 col-lg-4 mb-3">
                                                                <label htmlFor="Name" className="form-label">Employee_Id* </label>
                                                                <input type="text" className="form-control shadow-none" id="Name" name="Name" value={Employee_Id} onChange={(e) => setEmployee_Id(e.target.value)} />
                                                            </div>
                                                            <div className="col-md-6 col-lg-4 mb-3">
                                                                <label htmlFor="Name" className="form-label">Name* </label>
                                                                <input type="text" className="form-control shadow-none" id="Name" name="Name" value={Name} onChange={(e) => setName(e.target.value)} />
                                                            </div>
                                                            <div className="col-md-6 col-lg-4 mb-3">
                                                                <label htmlFor="lastName" className="form-label">phone*</label>
                                                                <input type="tel" className="form-control shadow-none" value={phone} onChange={(e) => setphone(e.target.value)} id="LastName" name="LastName" />
                                                            </div>
                                                            <div className="col-md-6 col-lg-4 mb-3">
                                                                <label htmlFor="email" className="form-label">email*</label>
                                                                <input type="email" className="form-control shadow-none" value={email} onChange={(e) => setemail(e.target.value)} id="Email" name="Email" />
                                                            </div>

                                                            <div className="col-md-6 col-lg-4 mb-3">
                                                                <label htmlFor="secondaryContact" className="form-label"> Reporting manager*</label>
                                                                <input type="text" className="form-control shadow-none" value={Reporting_manager} onChange={(e) => setReporting_manager(e.target.value)} id="State" name="State" />
                                                            </div>

                                                            <div className="col-md-6 col-lg-4 mb-3">
                                                                <label htmlFor="ageGroup" className="form-label"> Employee type*</label>
                                                                <select className="form-select" id="ageGroup" value={Employee_type} onChange={(e) => setEmployee_type(e.target.value)}>
                                                                    <option value="">Select</option>
                                                                    <option value="yes">Yes</option>
                                                                    <option value="no">No</option>
                                                                </select>
                                                            </div>


                                                            <div className="col-md-6 col-lg-4 mb-3">
                                                                <label htmlFor="ageGroup" className="form-label">  LeaveType*</label>
                                                                <select className="form-select" id="ageGroup" value={LeaveType} onChange={(e) => setLeaveType(e.target.value)}>
                                                                    <option value="">Select</option>
                                                                    <option value="yes">Yes</option>
                                                                    <option value="no">No</option>
                                                                </select>
                                                            </div>

                                                            <div className="col-md-6 col-lg-3 mb-3">
                                                                <label htmlFor="secondaryContact" className="form-label">FromDate*</label>
                                                                <input type="date" className="form-control shadow-none" value={FromDate} onChange={(e) => setFromDate(e.target.value)} id="State" name="State" />
                                                            </div>
                                                            <div className="col-md-6 col-lg-3 mb-3">
                                                                <label htmlFor="secondaryContact" className="form-label">ToDate*</label>
                                                                <input type="date" className="form-control shadow-none" value={ToDate} onChange={(e) => setToDate(e.target.value)} id="State" name="State" />
                                                            </div>
                                                            <div className="col-md-6 col-lg-2 mb-3">
                                                                <label htmlFor="secondaryContact" className="form-label">Days</label>
                                                                <input type="number" className="form-control shadow-none" value={Days} id="State" name="State" readOnly />
                                                            </div>
                                                            {/* Additional form fields */}
                                                            {/* Add additional form fields here */}
                                                            <div className="col-md-6 col-lg-12 mb-3">
                                                                <label htmlFor="secondaryContact" className="form-label">Reason*</label>
                                                                <textarea type="email" className="form-control shadow-none" style={{ height: '80px' }} value={Reason} onChange={(e) => setReason(e.target.value)} id="State" name="State" />
                                                            </div>
                                                            <div className="col-md-6 col-lg-6 mb-3">
                                                                <label htmlFor="secondaryContact" className="form-label">Any proof*</label>
                                                                <input type="email" className="form-control shadow-none" value={Any_proof} onChange={(e) => setAny_proof(e.target.value)} id="State" name="State" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* form end */}
                                                {/* Button start */}
                                                <div className="d-flex justify-content-end mt-2">
                                                    <div className='d-flex gap-2 p-3'>
                                                        <button type="submit" className="btn btn-success btn-sm" onClick={handle_Leave_apply_form}>Submit</button>
                                                    </div>
                                                </div>
                                                {/* Button end */}
                                            </form>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* Work Form End */}

                        </div>

                    </div>

                </div>

                <div className="row m-0 ">
                    <div className="col-sm-12">

                        <div className='pt-2 p-1 m-3 bg-white rounded' >

                            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" >

                                <li class="nav-item text-primary d-flex " role="presentation">
                                    <h6 class='mt-2 heading nav-link active' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">BIO</h6>
                                </li>

                                <li class="nav-item text-primary d-flex " role="presentation">
                                    <h6 class='mt-2 heading nav-link ' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Tasks</h6>
                                </li>

                                <li class="nav-item text-primary d-flex " role="presentation">
                                    <h6 class='mt-2 heading nav-link ' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Documents</h6>
                                </li>

                                <li class="nav-item text-primary d-flex " role="presentation">
                                    <h6 class='mt-2 heading nav-link ' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} id="pills-contact-tab1" data-bs-toggle="pill" data-bs-target="#pills-contact1" type="button" role="tab" aria-controls="pills-contact1" aria-selected="false">Team</h6>
                                </li>

                                <li class="nav-item text-primary d-flex " role="presentation">
                                    <h6 class='mt-2 heading nav-link ' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} id="pills-contact-tab2" data-bs-toggle="pill" data-bs-target="#pills-contact2" type="button" role="tab" aria-controls="pills-contact2" aria-selected="false">Projects</h6>
                                </li>




                            </ul>
                            <div class="tab-content " id="pills-tabContent" style={{ position: 'relative', bottom: '20px' }}>
                                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">

                                    <div className='p-3'>

                                        {/* EMPLOYEE PROFILE  START */}
                                        <div >



                                            <div className=' mt-2'>

                                                <section className='  h-100 ' style={{ backgroundColor: 'rgb(245,245,245)' }}>

                                                    <div class="row m-0 p-1 mt-1">
                                                        <div className=" col-md-6 col-lg-12  p-2">

                                                            <div class="row m-0  ">

                                                                <h5 className='me-2' style={{color:'rgb(76,53,117)'}}>Personal Informations</h5>
                                                                <div className="col-sm-12  rounded p-3 mt-2" style={{ backgroundColor: 'rgb(255,255,255)' }}>

                                                                    <div className='p-3 '>

                                                                        <div className='mt-1'>
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
                                                        <div className=" col-md-6 col-lg-12  p-2">

                                                            <div class="row m-0  ">

                                                                <h5 style={{color:'rgb(76,53,117)'}}>Emergency Contact</h5>
                                                                <div className="col-sm-12  rounded p-3 mt-2" style={{ backgroundColor: 'rgb(255,255,255)' }}>

                                                                    <div className='p-3 '>

                                                                        <div className='mt-1'>
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
                                                        <div className=" col-md-6 col-lg-12  p-2">

                                                            <div class="row m-0  ">

                                                                <h5 style={{color:'rgb(76,53,117)'}}>Bank information</h5>
                                                                <div className="col-sm-12  rounded p-3 mt-2" style={{ backgroundColor: 'rgb(255,255,255)' }}>

                                                                    <div className='p-3 '>

                                                                        <div className='mt-1'>
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
                                                        <div className=" col-md-6 col-lg-12  p-2">

                                                            <div class="row m-0  ">
                                                                <h5 style={{color:'rgb(76,53,117)'}}>Family Informations</h5>

                                                                <div className="col-sm-12  rounded p-3 mt-2" style={{ backgroundColor: 'rgb(255,255,255)' }}>

                                                                    <div className='p-3 '>

                                                                        <div className='mt-1'>
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
                                                        <div className=" col-md-6 col-lg-12 p-2">

                                                            <div class="row m-0  ">

                                                                <h5 style={{color:'rgb(76,53,117)'}}>Education Informations</h5>
                                                                <div className="col-sm-12  rounded p-3 mt-2" style={{ backgroundColor: 'rgb(255,255,255)' }}>

                                                                    <div className='p-3 '>

                                                                        <div className='mt-1'>
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
                                                        <div className=" col-md-6 col-lg-12  p-2">

                                                            <div class="row m-0  ">

                                                                <h5 style={{color:'rgb(76,53,117)'}}>Experience</h5>
                                                                <div className="col-sm-12  rounded p-3 mt-2" style={{ backgroundColor: 'rgb(255,255,255)' }}>

                                                                    <div className='p-3 '>

                                                                        <div className='mt-1'>
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


                                                    </div>




                                                </section>
                                            </div>
                                        </div>
                                        {/* EMPLOYEE PROFILE  END */}

                                    </div>
                                </div>
                                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">

                                    <div className='p-3'>

                                        <p>
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus culpa assumenda mollitia ipsum doloremque et consectetur ut doloribus minima? Dicta culpa mollitia amet deserunt delectus et quod doloremque reprehenderit maiores.
                                        </p>

                                    </div>
                                </div>
                                <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">

                                    <div className='p-3'>

                                        <p>
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus culpa assumenda mollitia ipsum doloremque et consectetur ut doloribus minima? Dicta culpa mollitia amet deserunt delectus et quod doloremque reprehenderit maiores.
                                        </p>

                                    </div>
                                </div>
                                <div class="tab-pane fade" id="pills-contact1" role="tabpanel" aria-labelledby="pills-contact-tab1" tabindex="0">

                                    <div className='p-3'>

                                        <p>
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus culpa assumenda mollitia ipsum doloremque et consectetur ut doloribus minima? Dicta culpa mollitia amet deserunt delectus et quod doloremque reprehenderit maiores.
                                        </p>

                                    </div>
                                </div>
                                <div class="tab-pane fade" id="pills-contact2" role="tabpanel" aria-labelledby="pills-contact-tab2" tabindex="0">

                                    <div className='p-3'>

                                        <p>
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus culpa assumenda mollitia ipsum doloremque et consectetur ut doloribus minima? Dicta culpa mollitia amet deserunt delectus et quod doloremque reprehenderit maiores.
                                        </p>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile_page