import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Topnav from './Topnav'
import axios from 'axios'
import { port } from '../App'


const New_join_emp = () => {

    let Empid = JSON.parse(sessionStorage.getItem('user')).EmployeeId

    const [AllEmployeelist, setAllEmployeelist] = useState([])
    const [EMPLOYEE_INFORMATION, setEMPLOYEE_INFORMATION] = useState([])
    const [EDUCATION_DETAILS, setEDUCATION_DETAILS] = useState([])
    const [FAMILY_DETAILS, setFAMILY_DETAILS] = useState([])
    const [EMERGENCY_DETAILS, setEMERGENCY_DETAILS] = useState([])
    const [CONTACT_EMERGENCY, setCONTACT_EMERGENCY] = useState([])
    const [REFERENCE, setREFERENCE] = useState([])
    const [EXPERIENCE_LAST_POSITION, setEXPERIENCE_LAST_POSITION] = useState([])
    const [LAST_POSITION_HELD, setLAST_POSITION_HELD] = useState([])
    const [PERSONAL_INFORMATION, setPERSONAL_INFORMATION] = useState([])
    const [EMPLOYEEIDENTITY, setEMPLOYEEIDENTITY] = useState([])
    const [BANK_ACCOUNT_DETAILS, setBANK_ACCOUNT_DETAILS] = useState([])
    const [PFDETAILS, setPFDETAILS] = useState([])
    const [ADDITIONAL_INFORMATION, setADDITIONAL_INFORMATION] = useState([])
    const [ATTACHMENTS, setATTACHMENTS] = useState([])
    const [DOCUMENTS_SUBMITED, setDOCUMENTS_SUBMITED] = useState([])
    const [DECLARATION, setDECLARATION] = useState([])

    useEffect(() => {

        fetchdata()

    }, [])

    const fetchdata = () => {
        axios.get(`${port}/root/ems/JoiningFormalityesSubmitedList`).then((res) => {
            console.log("Joining_Formalityes_Submited_List_res", res.data);
            setAllEmployeelist(res.data)

        }).catch((err) => {
            console.log("Joining_Formalityes_Submited_List_err", err.data);
        })
    }

    const sentparticularData = (id) => {

        console.log(id);

        axios.get(`${port}/root/ems/JoiningFormalityesSubmitedList/${id}/`)
            .then(response => {

                console.log('Paticular_Employee_Data_Res', response.data);
                setEMPLOYEE_INFORMATION(response.data.EmployeeInformation)
                setREFERENCE(response.data.CandidateReferenceDetails)
                setEDUCATION_DETAILS(response.data.EducationDetails);
                setCONTACT_EMERGENCY(response.data.EmergencyContactDetails);
                setFAMILY_DETAILS(response.data.FamilyDetails);
                setEMERGENCY_DETAILS(response.data.EmergencyDetails);
                setLAST_POSITION_HELD(response.data.LastPositionHeldDetails);
                setEXPERIENCE_LAST_POSITION(response.data.ExperienceDetails);

            })
            .catch(error => {

                console.error('Paticular_Employee_Data_Err', error.data);
            });
    };


    // SEARCH START

    const [searchValue, setSearchValue] = useState("");

    const handlesearchvalue = (value) => {

        console.log(value);
        setSearchValue(value)

        if (value.length > 0) {

            axios.get(`${port}/root/ems/Employee_search/${value}/`).then((res) => {
                console.log("search_res", res.data);
                setAllEmployeelist(res.data)
            }).catch((err) => {
                console.log("search_res", err.data);
            })
        }
        else {
            fetchdata()
        }
    }
    // SEARCH END

    const [ID, setID] = useState('')

    let setFinalverification = (e) => {



        const formData1 = new FormData()

        formData1.append('ProfileVerification', e);
        formData1.append('id', ID);


        for (let pair of formData1.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        axios.patch(`${port}/root/ems/employee-information`, formData1).then((res) => {
            console.log("setFinalverification", res.data);

        }).catch((err) => {
            console.log("setFinalverification", err.data);
        })




        setTimeout(() => {
            axios.post(`${port}/root/ems/EmployeeCreation/${ID}/`).then((res) => {
                console.log("EmployeeCreation", res.data);
            }).catch((err) => {
                console.log("EmployeeCreation", err.data);
            });
        }, 2000); // 2000 milliseconds = 2 seconds

    }



    let setEmp_Info_Verify = (e, id) => {

        setID(id)
        console.log("setEmp_Info_Verify_result", e);

        const formData1 = new FormData()

        formData1.append('is_verified', e);
        formData1.append('id', id);

        for (let pair of formData1.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        axios.patch(`${port}/root/ems/employee-information`, formData1).then((res) => {
            console.log("Emp_Info_Verify_res", res.data);

        }).catch((err) => {
            console.log("Emp_Info_Verify_err", err.data);
        })

    }

    let setVerify_Education = (e) => {
        console.log("setVerify_Education", e);

        // axios.post(`${port}/root/ems/employee-education/${Empid.id}/`, qualifications).then((res) => {
        //     console.log("EMPLOYEE_Edu_RES", res.data);
        //     // setEmployeeInformation(res.data)


        // }).catch((err) => {
        //     console.log("EMPLOYEE_INFORMATION_ERR", err.data);
        // })
    }
    let setVerify_Family = (e) => {
        console.log("setVerify_Family", e);
        // axios.post(`${port}/root/ems/family-details/${Empid.id}/`, family_details).then((res) => {
        //     console.log("EMPLOYEE_FAMILY_DETAILS_RES", res.data);



        // }).catch((err) => {
        //     console.log("EMPLOYEE_FAMILY_DETAILS_ERR", err.data);
        // })
    }
    let setVerify_Emergency = (e) => {
        console.log("setVerify_Emergency", e);

        // axios.post(`${port}/root/ems/emergency-details/   `, formData2).then((res) => {
        //     console.log("EMERGENCY_DETAILS_RES", res.data);



        // }).catch((err) => {
        //     console.log("EMERGENCY_DETAILS_ERR", err.data);
        // })
    }
    let setVerify_Contact_Emergency = (e) => {
        console.log("setVerify_Contact_Emergency", e);

        // axios.post(`${port}/root/ems/emergency-contact/`, formData3).then((res) => {
        //     console.log("CONTACT_PERSON_EMERGENCY_RES", res.data);



        // }).catch((err) => {
        //     console.log("CONTACT_PERSON_EMERGENCY_ERR", err.data);
        // })
    }
    let setVerify_References = (e) => {
        console.log("setVerify_References", e);

        // axios.post(`${port}/root/ems/candidate-reference/${Empid.id}/`, references).then((res) => {
        //     console.log("REFERENCE_DETAILS_RES", res.data);



        // }).catch((err) => {
        //     console.log("REFERENCE_DETAILS_ERR", err.data);
        // })
    }
    let setVerify_Experience_Details = (e) => {
        console.log("setVerify_Experience_Details", e);

        // axios.post(`${port}/root/ems/experience/${Empid.id}/`, employments).then((res) => {
        //     console.log("EXPERIENCE_CHRONOLOGICAL_RES", res.data);



        // }).catch((err) => {
        //     console.log("EXPERIENCE_CHRONOLOGICAL_ERR", err.data);
        // })
    }
    let setVerify_Last_Postion_Held = (e) => {
        console.log("setVerify_Last_Postion_Held", e);

        // axios.post(`${port}/root/ems/last-position-held/`, formData4).then((res) => {
        //     console.log("LAST_POSITION_HELD_RES", res.data);
        //     setEmployeeInformation(res.data)


        // }).catch((err) => {
        //     console.log("LAST_POSITION_HELD_ERR", err.data);
        // })
    }
    let setVerify_Emp_Personal_Info = (e) => {
        console.log("setVerify_Emp_Personal_Info", e);

        // axios.post(`${port}/root/ems/employee-personal-information/`, formData7).then((res) => {
        //     console.log("employee-Personal-information_res", res.data);



        // }).catch((err) => {
        //     console.log("employee-Personal-information_err", err.data);
        // })
    }
    let setVerify_EMP_Identity = (e) => {
        console.log("setVerify_EMP_Identity", e);
        // axios.post(`${port}/root/ems/employee-identity/`, formData8).then((res) => {
        //     console.log("employee-identity_res", res.data);



        // }).catch((err) => {
        //     console.log("employee-identity_err", err.data);
        // })
    }

    let setVerify_Account_Details = (e) => {
        console.log("setVerify_Account_Details", e);
        // axios.post(`${port}/root/ems/bank-account-details/`, formData9).then((res) => {
        //     console.log("bank-account-details_res", res.data);



        // }).catch((err) => {
        //     console.log("bank-account-details_err", err.data);
        // })
    }
    let setVerify_PF_Details = (e) => {
        console.log("setVerify_PF_Details", e);
        // axios.post(`${port}/root/ems/pf-details/`, formData11).then((res) => {
        //     console.log("pf-details_res", res.data);



        // }).catch((err) => {
        //     console.log("pf-details_err", err.data);
        // })
    }
    let setVerify_Additional_Info = (e) => {
        console.log("setVerify_Additional_Info", e);
        // axios.post(`${port}/root/ems/additional-information/`, formData5).then((res) => {
        //     console.log("ADDITIONAL_INFORMATION_RES", res.data);



        // }).catch((err) => {
        //     console.log("ADDITIONAL_INFORMATION_ERR", err.data);
        // })
    }
    let setVerify_Attachments_Info = (e) => {
        console.log("setVerify_Attachments_Info", e);

        // axios.post(`${port}/root/ems/Attachments/${Empid.id}/`, formDat)
        // .then((res) => {
        //     console.log("DOCUMENT_UPLOAD_RES", res.data);

        // })
        // .catch((err) => {
        //     console.log("DOCUMENT_UPLOAD_ERR", err.data);
        // });
    }
    let setVerify_Documents_Submited_Details = (e) => {
        console.log("setVerify_Documents_Submited_Details", e);

        // axios.post(`${port}/root/ems/family-details/${Empid.id}/`, documents).then((res) => {
        //     console.log("EMPLOYEE_FAMILY_DETAILS_RES", res.data);

        // }).catch((err) => {
        //     console.log("EMPLOYEE_FAMILY_DETAILS_ERR", err.data);
        // })

    }
    let setVerify_Declaration = (e) => {
        console.log("setVerify_Declaration", e);
        // axios.post(`${port}/root/ems/declaration/`, formData6).then((res) => {
        //     console.log("DECLARATION_RES", res.data);


        // }).catch((err) => {
        //     console.log("DECLARATION_ERR", err.data);
        // })
    }




    return (
        <div className=' d-flex' style={{ width: '100%',minHeight : '100%', backgroundColor: "rgb(249,251,253)" }}>

            <div className='side'>

                <Sidebar value={"dashboard"} ></Sidebar>
            </div>
            <div className=' m-0 m-sm-4  side-blog' style={{ borderRadius: '10px' }}>
                <Topnav></Topnav>

                <div className='m-1 p-1' style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <h6 className='mt-3 heading' style={{ color: 'rgb(76,53,117)' }}>New Joining Employees List</h6>

                    <div>
                        <button className='btn btn-sm bg-info-subtle'>Add New</button>
                    </div>
                </div>

                <div className='d-flex justify-content-end mt-2'>
                    <input type="text" value={searchValue}
                        onChange={(e) => handlesearchvalue(e.target.value)} className='form-control w-25' />

                </div>

                <div className='row m-0 p-1 mt-3'>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Employee ID</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Submited On</th>

                                {/* <th scope="col">Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* <tr>
                                <th scope="row">1</th>
                                <td>Rakesh</td>
                                <td>rakkiii49sh8@gmail.com</td>
                                <td>MTM123</td>
                                <td>6381849973</td>
                                <td>12/1/2023</td>
                                <td>FrontEnd Developer</td>
                                <td>
                                    <button>✔</button>
                                    <button>❌</button>
                                </td>
                            </tr> */}
                            {AllEmployeelist != undefined && AllEmployeelist != undefined && AllEmployeelist.map((e, index) => {
                                return (


                                    <tr>

                                        <td key={e.id}> {index + 1}</td>
                                        <td onClick={() => sentparticularData(e.id)} data-bs-toggle="modal" data-bs-target="#exampleModal5" key={e.id} style={{ cursor: 'pointer' }}> {e.full_name}</td>
                                        <td key={e.id}> {e.email}</td>
                                        <td key={e.id}> {e.employee_Id}</td>
                                        <td key={e.id}> {e.mobile}</td>
                                        <td key={e.id}> {e.created_at}</td>

                                        {/* <td>
                                            <button>✔</button>
                                            <button>❌</button>
                                        </td> */}


                                    </tr>


                                )
                            })}



                        </tbody>
                    </table>



                </div>
                {/* open Particular Data Start */}

                <div class="modal fade" id="exampleModal5" tabindex="-1" aria-labelledby="exampleModalLabel5" aria-hidden="true">
                    <div class="modal-dialog modal-fullscreen">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title " id="exampleModalLabel5">Employee All Information</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >EMPLOYEE INFORMATION</h6>

                                <div className="border p-4">

                                    <div>
                                        {/* <li className="list-group-item"><strong>id:</strong> {EMPLOYEE_INFORMATION.id}</li> */}
                                        <li className="list-group-item"><strong>Employee ID:</strong> {EMPLOYEE_INFORMATION.employee_Id}</li>
                                        <li className="list-group-item"><strong>Created At:</strong> {EMPLOYEE_INFORMATION.created_at}</li>
                                        <li className="list-group-item"><strong>Full Name:</strong> {EMPLOYEE_INFORMATION.full_name}</li>
                                        <li className="list-group-item"><strong>Date of Birth:</strong> {EMPLOYEE_INFORMATION.date_of_birth}</li>
                                        <li className="list-group-item"><strong>Gender:</strong> {EMPLOYEE_INFORMATION.gender}</li>
                                        <li className="list-group-item"><strong>Mobile:</strong> {EMPLOYEE_INFORMATION.mobile}</li>
                                        <li className="list-group-item"><strong>Email:</strong> {EMPLOYEE_INFORMATION.email}</li>
                                        <li className="list-group-item"><strong>Weight:</strong> {EMPLOYEE_INFORMATION.weight}</li>
                                        <li className="list-group-item"><strong>Height:</strong> {EMPLOYEE_INFORMATION.height}</li>
                                        <li className="list-group-item"><strong>Permanent Address:</strong> {EMPLOYEE_INFORMATION.permanent_address}</li>
                                        <li className="list-group-item"><strong>Present Address:</strong> {EMPLOYEE_INFORMATION.present_address}</li>
                                        <li className="list-group-item"><strong>Designation:</strong> {EMPLOYEE_INFORMATION.Designation}</li>
                                        <li className="list-group-item"><strong>Profile Verification:</strong> {EMPLOYEE_INFORMATION.ProfileVerification ? "Yes" : "No"}</li>
                                        <li className="list-group-item"><strong>Candidate ID:</strong> {EMPLOYEE_INFORMATION.Candidate_id}</li>
                                        <li className="list-group-item"><strong>Offered Instances:</strong> {EMPLOYEE_INFORMATION.Offered_Instance}</li>
                                    </div>

                                    <div class=" d-flex justify-content-end mt-2">

                                        <div style={{ minWidth: '200px' }}  >

                                            <select id="interviewer" name="interviewer" onChange={(d) => setEmp_Info_Verify(d.target.value, EMPLOYEE_INFORMATION.id)} required class="form-control shadow-none border border-primary">
                                                <option value="" selected>Employee Information Verification</option>
                                                <option value="True" >Success</option>
                                                <option value="False" >Fail</option>

                                            </select>
                                        </div>
                                    </div>



                                </div>

                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >EDUCATION DETAILS</h6>

                                <div className="border p-4">

                                    {EDUCATION_DETAILS != undefined && EDUCATION_DETAILS != undefined && EDUCATION_DETAILS.map((e) => {
                                        return (
                                            <div key={e.id}>
                                                {/* <li class="list-group-item"><strong>id:</strong>{e.id}</li> */}
                                                <li class="list-group-item"><strong>Qualification:</strong> {e.Qualification}</li>
                                                <li class="list-group-item"><strong>University:</strong> {e.University}</li>
                                                <li class="list-group-item"><strong>Year of Passout:</strong> {e.year_of_passout}</li>
                                                <li class="list-group-item"><strong>Percentage:</strong> {e.Persentage}</li>
                                                <li class="list-group-item"><strong>Major Subject:</strong> {e.Major_Subject}</li>
                                                <li class="list-group-item"><strong>EMP Information:</strong> {e.EMP_Information}</li>
                                            </div>
                                        )
                                    })}


                                    <div class=" d-flex justify-content-end mt-2">

                                        <div style={{ minWidth: '200px' }}  >

                                            <select id="interviewer" name="interviewer" onChange={(e) => setVerify_Education(e.target.value, e.id)} required class="form-control shadow-none border border-primary">
                                                <option value="" selected>Employee Education Details Verification</option>
                                                <option value="success" >Success</option>
                                                <option value="fail" >Fail</option>

                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >FAMILY DETAILS</h6>

                                <div className="border p-4">

                                    {FAMILY_DETAILS != undefined && FAMILY_DETAILS.map((e) => {
                                        return (
                                            <div key={e.id}>
                                                {/* <li class="list-group-item"><strong>id:</strong> {e.id}</li> */}
                                                <li class="list-group-item"><strong>Name:</strong> {e.name}</li>
                                                <li class="list-group-item"><strong>Relation:</strong> {e.relation}</li>
                                                <li class="list-group-item"><strong>Date of Birth:</strong> {e.dob}</li>
                                                <li class="list-group-item"><strong>Age:</strong> {e.age}</li>
                                                <li class="list-group-item"><strong>Blood Group:</strong> {e.blood_group}</li>
                                                <li class="list-group-item"><strong>Gender:</strong> {e.gender}</li>
                                                <li class="list-group-item"><strong>Profession:</strong> {e.profession}</li>
                                                <li class="list-group-item"><strong>EMP Information:</strong> {e.EMP_Information}</li>
                                            </div>
                                        );
                                    })}

                                    <div class=" d-flex justify-content-end mt-2">

                                        <div style={{ minWidth: '200px' }}  >

                                            <select id="interviewer" name="interviewer" onChange={(e) => setVerify_Family(e.target.value, e.id)} required class="form-control shadow-none border border-primary">
                                                <option value="" selected>Employee Family Details Verification</option>
                                                <option value="success" >Success</option>
                                                <option value="fail" >Fail</option>

                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >EMERGENCY DETAILS</h6>

                                <div className="border p-4">

                                    {EMERGENCY_DETAILS != undefined && EMERGENCY_DETAILS.map((e) => {
                                        return (
                                            <div key={e.id}>
                                                {/* <li class="list-group-item"><strong>id:</strong> {e.id}</li> */}
                                                <li class="list-group-item"><strong>Blood Group:</strong> {e.blood_group}</li>
                                                <li class="list-group-item"><strong>Allergic To:</strong> {e.allergic_to}</li>
                                                <li class="list-group-item"><strong>Blood Pressure:</strong> {e.blood_pessure}</li>
                                                <li class="list-group-item"><strong>Diabetics:</strong> {e.Diabetics}</li>
                                                <li class="list-group-item"><strong>Other Illness:</strong> {e.other_illness}</li>
                                                <li class="list-group-item"><strong>EMP Information:</strong> {e.EMP_Information}</li>
                                            </div>
                                        );
                                    })}


                                    <div class=" d-flex justify-content-end mt-2">

                                        <div style={{ minWidth: '200px' }}  >

                                            <select id="interviewer" name="interviewer" onChange={(e) => setVerify_Emergency(e.target.value, e.id)} required class="form-control shadow-none border border-primary">
                                                <option value="" selected>Employee Emergency details Verification</option>
                                                <option value="success" >Success</option>
                                                <option value="fail" >Fail</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >CONTACT PERSON IN CASE OF EMERGENCY</h6>

                                <div className="border p-4">


                                    {CONTACT_EMERGENCY != undefined && CONTACT_EMERGENCY.map((e) => {
                                        return (
                                            <div key={e.id}>
                                                {/* <li class="list-group-item"><strong>id:</strong> {e.id}</li> */}
                                                <li class="list-group-item"><strong>Person Name:</strong> {e.person_name}</li>
                                                <li class="list-group-item"><strong>Relation:</strong> {e.relation}</li>
                                                <li class="list-group-item"><strong>Address:</strong> {e.address}</li>
                                                <li class="list-group-item"><strong>Country:</strong> {e.country}</li>
                                                <li class="list-group-item"><strong>State:</strong> {e.state}</li>
                                                <li class="list-group-item"><strong>City:</strong> {e.city}</li>
                                                <li class="list-group-item"><strong>Pincode:</strong> {e.pincode}</li>
                                                <li class="list-group-item"><strong>Phone:</strong> {e.phone}</li>
                                                <li class="list-group-item"><strong>Email:</strong> {e.email}</li>
                                                <li class="list-group-item"><strong>EMP Information:</strong> {e.EMP_Information}</li>
                                            </div>
                                        );
                                    })}


                                    <div class=" d-flex justify-content-end mt-2">

                                        <div style={{ minWidth: '200px' }}  >

                                            <select id="interviewer" name="interviewer" onChange={(e) => setVerify_Contact_Emergency(e.target.value, e.id)} required class="form-control shadow-none border border-primary">
                                                <option value="" selected>Employee Contact Person Details Verification</option>
                                                <option value="success" >Success</option>
                                                <option value="fail" >Fail</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >REFERENCE : NAME & ADDRESS OF AT LEAST TWO REFERENCES NOT RELATED TO YOU</h6>

                                <div className="border p-4">

                                    {REFERENCE != undefined && REFERENCE.map((e) => {
                                        return (
                                            <div key={e.id}>
                                                {/* <li class="list-group-item"><strong>id:</strong> {e.id}</li> */}
                                                <li class="list-group-item"><strong>Person Name:</strong> {e.person_name}</li>
                                                <li class="list-group-item"><strong>Relation:</strong> {e.relation}</li>
                                                <li class="list-group-item"><strong>Address:</strong> {e.address}</li>
                                                <li class="list-group-item"><strong>Country:</strong> {e.country}</li>
                                                <li class="list-group-item"><strong>State:</strong> {e.state}</li>
                                                <li class="list-group-item"><strong>City:</strong> {e.city}</li>
                                                <li class="list-group-item"><strong>Phone:</strong> {e.phone}</li>
                                                <li class="list-group-item"><strong>Email:</strong> {e.email}</li>
                                                <li class="list-group-item"><strong>EMP Information:</strong> {e.EMP_Information}</li>
                                            </div>
                                        );
                                    })}


                                    <div class=" d-flex justify-content-end mt-2">

                                        <div style={{ minWidth: '200px' }}  >

                                            <select id="interviewer" name="interviewer" onChange={(e) => setVerify_References(e.target.value, e.id)} required class="form-control shadow-none border border-primary">
                                                <option value="" selected>Employee Reference Verification</option>
                                                <option value="success" >Success</option>
                                                <option value="fail" >Fail</option>

                                            </select>
                                        </div>

                                    </div>
                                </div>

                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >EXPERIENCE (CHRONOLOGICAL ORDER EXCLUDING LAST POSITION)</h6>

                                <div className="border p-4">

                                    {EXPERIENCE_LAST_POSITION !== undefined && EXPERIENCE_LAST_POSITION.map((employment, index) => (
                                        <div key={index}>
                                            {/* <li className="list-group-item"><strong>ID:</strong> {employment.id}</li> */}
                                            <li className="list-group-item"><strong>Organisation:</strong> {employment.organisation}</li>
                                            <li className="list-group-item"><strong>From Date:</strong> {employment.from_date}</li>
                                            <li className="list-group-item"><strong>To Date:</strong> {employment.to_date}</li>
                                            <li className="list-group-item"><strong>Last Position Held:</strong> {employment.last_position_held}</li>
                                            <li className="list-group-item"><strong>At the Time of Joining:</strong> {employment.at_the_time_of_joining}</li>
                                            <li className="list-group-item"><strong>Job Responsibility:</strong> {employment.job_responsibility}</li>
                                            <li className="list-group-item"><strong>Immediate Superior Designation:</strong> {employment.immediate_superior_designation}</li>
                                            <li className="list-group-item"><strong>Gross Salary Drawn:</strong> {employment.gross_salary_drawn}</li>
                                            <li className="list-group-item"><strong>Reason for Leaving:</strong> {employment.reason_for_leaving}</li>
                                            <li className="list-group-item"><strong>EMP Information:</strong> {employment.EMP_Information}</li>
                                        </div>
                                    ))}

                                    <div class=" d-flex justify-content-end mt-2">
                                        <div style={{ minWidth: '200px' }}  >

                                            <select id="interviewer" name="interviewer" onChange={(e) => setVerify_Experience_Details(e.target.value)} required class="form-control shadow-none border border-primary">
                                                <option value="" selected>Employee Experience Verification</option>
                                                <option value="success" >Success</option>
                                                <option value="fail" >Fail</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >LAST POSITION HELD</h6>

                                <div className="border p-4">
                                    {LAST_POSITION_HELD != undefined && LAST_POSITION_HELD.map((e) => {
                                        return (
                                            <div key={e.id}>
                                                {/* <li class="list-group-item"><strong>id:</strong> {e.id}</li> */}
                                                <li class="list-group-item"><strong>Organisation:</strong> {e.organisation}</li>
                                                <li class="list-group-item"><strong>Designation:</strong> {e.designation}</li>
                                                <li class="list-group-item"><strong>Address:</strong> {e.address}</li>
                                                <li class="list-group-item"><strong>Reporting To Name:</strong> {e.repoting_to_name}</li>
                                                <li class="list-group-item"><strong>Reporting To Designation:</strong> {e.repoting_to_designation}</li>
                                                <li class="list-group-item"><strong>Reporting To Email:</strong> {e.repoting_to_email}</li>
                                                <li class="list-group-item"><strong>Reporting To Phone:</strong> {e.repoting_to_phone}</li>
                                                <li class="list-group-item"><strong>Gross Salary Per Month:</strong> {e.gross_salary_per_month}</li>
                                                <li class="list-group-item"><strong>Basic:</strong> {e.basic}</li>
                                                <li class="list-group-item"><strong>HRA:</strong> {e.HRA}</li>
                                                <li class="list-group-item"><strong>LTA:</strong> {e.LTA}</li>
                                                <li class="list-group-item"><strong>Medical:</strong> {e.medical}</li>
                                                <li class="list-group-item"><strong>Conveyance:</strong> {e.conveyance}</li>
                                                <li class="list-group-item"><strong>Provident Fund:</strong> {e.provident_fund}</li>
                                                <li class="list-group-item"><strong>Gratuity:</strong> {e.gratuity}</li>
                                                <li class="list-group-item"><strong>Others:</strong> {e.others}</li>
                                                <li class="list-group-item"><strong>Total:</strong> {e.total}</li>
                                                <li class="list-group-item"><strong>EMP Information:</strong> {e.EMP_Information}</li>
                                            </div>
                                        );
                                    })}

                                    <div class=" d-flex justify-content-end mt-2">

                                        <div style={{ minWidth: '200px' }}  >

                                            <select id="interviewer" name="interviewer" onChange={(e) => setVerify_Last_Postion_Held(e.target.value, e.id)} required class="form-control shadow-none border border-primary">
                                                <option value="" selected>Employee Last Position Verification</option>
                                                <option value="success" >Success</option>
                                                <option value="fail" >Fail</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >EMPLOYEE PERSONAL INFORMATION</h6>

                                <div className="border p-4">

                                    <div class=" d-flex justify-content-end mt-2">

                                        <div style={{ minWidth: '200px' }}  >

                                            <select id="interviewer" name="interviewer" onChange={(e) => setVerify_Emp_Personal_Info(e.target.value)} required class="form-control shadow-none border border-primary">
                                                <option value="" selected>Employee Personal Details Verification</option>
                                                <option value="success" >Success</option>
                                                <option value="fail" >Fail</option>

                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >EMPLOYEE IDENTITY FORM</h6>

                                <div className="border p-4">

                                    <div class=" d-flex justify-content-end mt-2">

                                        <div style={{ minWidth: '200px' }}  >

                                            <select id="interviewer" name="interviewer" onChange={(e) => setVerify_EMP_Identity(e.target.value)} required class="form-control shadow-none border border-primary">
                                                <option value="" selected>Employee Identity Verification</option>
                                                <option value="success" >Success</option>
                                                <option value="fail" >Fail</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >BANK ACCOUNT DETAILS</h6>

                                <div className="border p-4">

                                    <div class=" d-flex justify-content-end mt-2">

                                        <div style={{ minWidth: '200px' }}  >

                                            <select id="interviewer" name="interviewer" onChange={(e) => setVerify_Account_Details(e.target.value)} required class="form-control shadow-none border border-primary">
                                                <option value="" selected>Employee Back Account Details Verification</option>
                                                <option value="success" >Success</option>
                                                <option value="fail" >Fail</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >PF DETAILS</h6>

                                <div className="border p-4">

                                    <div class=" d-flex justify-content-end mt-2">

                                        <div style={{ minWidth: '200px' }}  >

                                            <select id="interviewer" name="interviewer" onChange={(e) => setVerify_PF_Details(e.target.value)} required class="form-control shadow-none border border-primary">
                                                <option value="" selected>Employee PF Details Verification</option>
                                                <option value="success" >Success</option>
                                                <option value="fail" >Fail</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >ADDITIONAL INFORMATION</h6>

                                <div className="border p-4">

                                    <div class=" d-flex justify-content-end mt-2">

                                        <div style={{ minWidth: '200px' }}  >

                                            <select id="interviewer" name="interviewer" onChange={(e) => setVerify_Additional_Info(e.target.value)} required class="form-control shadow-none border border-primary">
                                                <option value="" selected>Employee Additional Information Verification</option>
                                                <option value="success" >Success</option>
                                                <option value="fail" >Fail</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >ATTACHMENTS</h6>

                                <div className="border p-4">

                                    <div class=" d-flex justify-content-end mt-2">

                                        <div style={{ minWidth: '200px' }}  >

                                            <select id="interviewer" name="interviewer" onChange={(e) => setVerify_Attachments_Info(e.target.value)} required class="form-control shadow-none border border-primary">
                                                <option value="" selected>Attachments Verification</option>
                                                <option value="success" >Success</option>
                                                <option value="fail" >Fail</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >DOCUMENTS SUBMITED</h6>

                                <div className="border p-4">

                                    <div class=" d-flex justify-content-end mt-2">

                                        <div style={{ minWidth: '200px' }}  >

                                            <select id="interviewer" name="interviewer" onChange={(e) => setVerify_Documents_Submited_Details(e.target.value)} required class="form-control shadow-none border border-primary">
                                                <option value="" selected>Document Submited Verification</option>
                                                <option value="success" >Success</option>
                                                <option value="fail" >Fail</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >DECLARATION</h6>

                                <div className="border p-4">


                                    <div class=" d-flex justify-content-end mt-2">

                                        <div style={{ minWidth: '200px' }}  >

                                            <select id="interviewer" name="interviewer" onChange={(e) => setVerify_Declaration(e.target.value)} required class="form-control shadow-none border border-primary">
                                                <option value="" selected>Declaration Verification</option>
                                                <option value="success" >Success</option>
                                                <option value="fail" >Fail</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-4'>
                                    <div style={{ Width: '200px' }}  >
                                        <label htmlFor="">Final Verfication</label>
                                        <select id="interviewer" name="interviewer" onChange={(e) => setFinalverification(e.target.value)} required class="form-control shadow-none border border-primary mt-4" >
                                            <option value="" selected>Final Verification</option>
                                            <option value="success" >Success</option>
                                            <option value="failed" >Fail</option>

                                        </select>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

                {/* open Particular Data End */}


            </div>



        </div>
    )
}

export default New_join_emp