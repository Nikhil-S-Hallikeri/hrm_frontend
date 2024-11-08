import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Topnav from './Topnav'
import axios from 'axios'
import { port } from '../App'
import EmployeeCreation from './Modals/EmployeeCreation'
import { toast } from 'react-toastify'
import { HrmStore } from '../Context/HrmContext'
import { useNavigate } from 'react-router-dom'
import DustbinIcon from '../SVG/DustbinIcon'
import ViewBtn from '../SVG/ViewBtn'
import EditPen from '../SVG/EditPen'
import CreateReligion from './Employee/CreateReligion'
import CreateDepartment from './Modals/CreateDepartment'
import { Modal } from 'react-bootstrap'
import EmployeeSalaryAdding from './Modals/EmployeeSalaryAdding'


const Allemp = () => {
    let { religion } = useContext(HrmStore)
    let Empid = JSON.parse(sessionStorage.getItem('user')).EmployeeId
    let empStatus = JSON.parse(sessionStorage.getItem('user')).Disgnation
    let [addEmpModal, setAddEmpModal] = useState(false)
    let [editModal, setEditModal] = useState(false)
    let [editModalPage, setEditModalPage] = useState('Info')
    const [selectedFile, setSelectedFile] = useState(null);
    let [showreligion, setShowReligion] = useState(false)
    let [showDepartment, setShowDepartment] = useState(false)

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
    let [obj, setobj] = useState({
        'Employeement_Type': '',
        'internship_Duration_From': '',
        'internship_Duration_To': '',
        'probation_status': '',
        'probation_Duration_From': '',
        'probation_Duration_To': '',
    })
    let handleChange = (e) => {
        let { name, value } = e.target
        if (name == 'Employeement_Type' && value == 'intern') {
            setobj((prev) => ({
                ...prev,
                probation_status: '',
                probation_Duration_From: '',
                probation_Duration_To: ''
            }))
        }
        if (name == 'Employeement_Type' && value == 'permanent') {
            setobj((prev) => ({
                ...prev,
                internship_Duration_From: '',
                internship_Duration_To: '',
            }))
        }
        if (name == 'internship_Duration_From' && value > Edit_Data.internship_Duration_To
            && Edit_Data.internship_Duration_To != '') {
            setobj((prev) => ({
                ...prev,
                internship_Duration_From: Edit_Data.internship_Duration_To
            }))
            return
        }
        if (name == 'internship_Duration_To' && value < Edit_Data.internship_Duration_From) {
            setobj((prev) => ({
                ...prev,
                internship_Duration_To: Edit_Data.internship_Duration_From
            }))
            return
        }
        if (name == 'probation_Duration_From' && value > Edit_Data.probation_Duration_To &&
            Edit_Data.probation_Duration_To != '') {
            setobj((prev) => ({
                ...prev,
                probation_Duration_From: Edit_Data.probation_Duration_To
            }))
            return
        }
        if (name == 'probation_Duration_To' && value < Edit_Data.probation_Duration_From) {
            setobj((prev) => ({
                ...prev,
                probation_Duration_To: Edit_Data.probation_Duration_From
            }))
            return
        }
        setobj((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const fetchdata = () => {
        axios.get(`${port}/root/ems/AllEmployeesList/${Empid}/?emp_status=active`).then((res) => {
            console.log("AllEmployee_res", res.data, Empid);
            setAllEmployeelist(res.data)

        }).catch((err) => {
            console.log("AllEmployee_err", err);
        })
    }

    const sentparticularData = (id, emp_id) => {

        console.log(id);
        console.log(emp_id);

        axios.get(`${port}/root/ems/EmployeeProfile/${id}/`)
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

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Function to handle file upload
    const uploadFile = async () => {

        try {
            const excel_file = new FormData();
            excel_file.append('excel_file', selectedFile);

            for (let pair of excel_file.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            const response = await axios.post(`${port}/root/upload-employees-excel-data/`, excel_file, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert('File uploaded successfully!');
            setSelectedFile(null)
            window.location.reload()
            console.log('File_uploaded', response.data);
        } catch (error) {
            alert('File uploaded Failed!');
            console.error('Error uploading file:', error);
        }
    };

    const [downloading, setDownloading] = useState(false);
    const [selectedCandidates, setSelectedCandidates] = useState([]);

    const handleCheckboxChange = (e) => {
        const candidateId = e.target.value;
        if (e.target.checked) {
            setSelectedCandidates([...selectedCandidates, candidateId]);
        } else {
            setSelectedCandidates(selectedCandidates.filter(id => id !== candidateId));
        }
    };

    const handleDownload = async () => {
        let lists = selectedCandidates;
        console.log("setSelectedCandidates", selectedCandidates);
        try {
            const response = await axios.post(`${port}/root/employee-download-excel/`, { 'Employee_ids': lists }, {
                responseType: 'blob' // Important to set the responseType to 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            console.log(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Employee_Data.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.location.reload()
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    // Download Excel Format Start


    const [downloading1, setDownloading1] = useState(false);
    const [Employees_Upload_Formate_Res, setEmployees_Upload_Formate_Res] = useState("");
    console.log("excel_link", Employees_Upload_Formate_Res);
    // console.log("File", Employees_Upload_Formate_Res);

    useEffect(() => {
        try {
            axios.get(`${port}/root/Employees-Upload-Formate/EmployeesUploadFormate/`).then((res) => {
                console.log("Employees_Upload_Formate_Res", res.data);
                setEmployees_Upload_Formate_Res(res.data.TemplateFile)
            })

        } catch (err) {
            console.error('Error downloading file:', err);
        }
    }, [])






    // Download Excel Format End


    const [Name, setName] = useState("");
    const [Email, setEmail] = useState('');
    const [gender, setGender] = useState("");
    const [DOB, setDOB] = useState('');
    const [Phone, setPhone] = useState('');
    const [Weight, setWeight] = useState('');
    const [Height, setHeight] = useState('');
    const [Permanent_Address, setPermanent_Address] = useState('');
    const [Present_Address, setPresent_Address] = useState('');
    const [Hired_Date, setHired_Date] = useState('');
    const [Dashboard, setDashboard] = useState('');
    const [Department, setDepartment] = useState('');
    const [Designation, setDesignation] = useState('');
    const [Reporting_To, setReporting_To] = useState('');



    const [Department_List, set_Department_List] = useState([]);
    const [Desgination_List, set_Desgination_List] = useState([]);


    const [_fullname, set_edit_fullname] = useState('');














    let Add_Employee = (e) => {

        e.preventDefault()


        const formData1 = new FormData()


        formData1.append('full_name', Name);
        formData1.append('email', Email);
        formData1.append('gender', gender);
        formData1.append('date_of_birth', DOB);
        formData1.append('mobile', Phone);
        formData1.append('height', Weight);
        formData1.append('weight', Height);
        formData1.append('permanent_address', Permanent_Address);
        formData1.append('present_address', Present_Address);
        formData1.append('hired_date', Hired_Date);
        formData1.append('Dasboard_Dig', Dashboard);
        //formData1.append('Department', Department);
        formData1.append('Designation', Designation);
        formData1.append('reporting_to', Reporting_To);
        for (let pair of formData1.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        axios.post(`${port}root/ems/NewEmployeesAdding/`, formData1)
            .then((r) => {
                alert('Employee Added')
                console.log("NewEmployeesAdding_res.", r.data)
            })
            .catch((err) => {
                alert('Employee Added Feiled.')

                console.log("NewEmployeesAdding_err", err)
            })
    }
    let getDepart = () => {
        axios.get(`${port}/root/ems/Departments/`)
            .then((r) => {
                set_Department_List(r.data)
                console.log("Departments_List_Res", r.data)
            })
            .catch((err) => {
                console.log("Departments_List_err", err)
            })
    }

    useEffect(() => {
        getDepart()
    }, [])




    // useEffect(() => {
    //     axios.get(`${port}api/Departments`)
    //         .then((r) => {
    //             console.log("Departments_List_Res", r.data)
    //         })
    //         .catch((err) => {
    //             console.log("Departments_List_err", err)
    //         })
    // }, [])






    let Call_Department = (e) => {
        axios.get(`${port}/root/ems/Designation/${e}/`)
            .then((r) => {
                set_Desgination_List(r.data)
                console.log("Designation_List_Res", r.data)
            })
            .catch((err) => {
                console.log("Designation_List_err", err)
            })
    }






    // useEffect(() => {
    //     axios.get(`${port}/root/api/Employee-List/`)
    //         .then((r) => {
    //             console.log("Employee_List_res", r.data)
    //         })
    //         .catch((err) => {
    //             console.log("Employee_List_err", err)
    //         })
    // }, [])

    const [interviewers, setInterviewers] = useState([]);

    useEffect(() => {
        axios.get(`${port}/root/interviewschedule`).then((e) => {
            console.log("Interviewer Data", e.data);
            setInterviewers(e.data)
        })
        // sentparticularData()
    }, [])


    const [Edit_Data, set_Edit_Data] = useState({
        full_name: '',
        employee_attendance_id: '',
        date_of_birth: '',
        gender: '',
        email: '',
        mobile: '',
        weight: '',
        secondary_email: '',
        secondary_mobile_number: '',
        height: '',
        permanent_address: '',
        present_address: '',
        hired_date: '',
        Dashboard: '',
        Department_id: '',
        religion: '',
        Position_id: '',
        Reporting_To: '',
        'Employeement_Type': '',
        'internship_Duration_From': '',
        'internship_Duration_To': '',
        'probation_status': '',
        'probation_Duration_From': '',
        'probation_Duration_To': '',
        interview_shedule_access: '',
        screening_shedule_access: '',
        final_status_access: '',
        applied_list_access: '',
        employee_status: ''

    })

    // console.log("datas",Edit_Data);
    let handleChangeEdit_data = (e) => {
        let { name, value } = e.target
        if (name == 'Employeement_Type' && value == 'intern') {
            setobj((prev) => ({
                ...prev,
                probation_status: '',
                probation_Duration_From: '',
                probation_Duration_To: ''
            }))
        }
        if (name == 'Employeement_Type' && value == 'permanent') {
            setobj((prev) => ({
                ...prev,
                internship_Duration_From: '',
                internship_Duration_To: '',
            }))
        }
        if (name == 'internship_Duration_From' && value > Edit_Data.internship_Duration_To
            && Edit_Data.internship_Duration_To != '') {
            setobj((prev) => ({
                ...prev,
                internship_Duration_From: Edit_Data.internship_Duration_To
            }))
            return
        }
        if (name == 'internship_Duration_To' && value < Edit_Data.internship_Duration_From) {
            setobj((prev) => ({
                ...prev,
                internship_Duration_To: Edit_Data.internship_Duration_From
            }))
            return
        }
        if (name == 'probation_Duration_From' && value > Edit_Data.probation_Duration_To &&
            Edit_Data.probation_Duration_To != '') {
            setobj((prev) => ({
                ...prev,
                probation_Duration_From: Edit_Data.probation_Duration_To
            }))
            return
        }
        if (name == 'probation_Duration_To' && value < Edit_Data.probation_Duration_From) {
            setobj((prev) => ({
                ...prev,
                probation_Duration_To: Edit_Data.probation_Duration_From
            }))
            return
        }
        set_Edit_Data((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const [Edit_id, set_Edit_id] = useState('')
    let [loading, setloading] = useState('')

    let resetEditModal = () => {
        setEditModal(false);
        setEditModalPage('Info')
        set_Edit_Data({
            full_name: '',
            date_of_birth: '',
            gender: '',
            email: '',
            mobile: '',
            weight: '',
            height: '',
            permanent_address: '',
            present_address: '',
            hired_date: '',
            Dashboard: '',
            Department_id: '',
            religion: '',
            Position_id: '',
            Reporting_To: '',
            secondary_mobile_number: '',
            secondary_email: '',
            'Employeement_Type': '',
            'internship_Duration_From': '',
            'internship_Duration_To': '',
            'probation_status': '',
            'probation_Duration_From': '',
            'probation_Duration_To': '',
            interview_shedule_access: '',
            screening_shedule_access: '',
            final_status_access: '',
            applied_list_access: ''
        })
    }
    let Update_Employee = () => {
        console.log("Update_Data1", Edit_Data, Edit_Data.religion);
        setloading('edit')
        axios.patch(`${port}root/ems/Employee-Update/${Edit_id}/`, {
            Update_Data: {
                ...Edit_Data,
                "Department": Edit_Data.Department_id,
                "Position": Edit_Data.Position_id
            }
        }).then((r) => {
            console.log("Update_Data", r.data)
            // toast.success('User Updated successfully')
            setloading('')
            fetchdata()
            setEditModalPage('sal')
        }).catch((err) => {
            console.log("Update_Data", err)
            setloading('')
            toast.error('Error Acquired')

        })
    }




    let Edit_Employee = (id) => {
        set_Edit_id(id)
        console.log("adasdasd", id);
        axios.get(`${port}/root/ems/Get-Employee/${id}/`).then((e) => {
            set_Edit_Data(e.data)
            // console.log('Update_Data', e.data.Department_id);
            console.log('Update_Data', e.data);

            Call_Department(e.data.Department_id)
            console.log("Employee_Data", e.data);
        }).catch((err) => {
            console.log("Employee_Data_err", err.data);
        })
    }

    let Delete_Employee = (id, name) => {

        console.log("adasdasd", id);

        axios.delete(`${port}/root/ems/Employee-Delete/${id}/`).then((e) => {

            console.log("Employee_Data", e.data);
            toast.success(`Employee ${name} Deleted .. `)
            // window.location.reload()
            fetchdata()
        }).catch((err) => {
            console.log("Employee_Data_err", err.data);
        })
    }
    let { setActivePage } = useContext(HrmStore)
    useEffect(() => {
        setActivePage('Employee')
    }, [])
    let navigate = useNavigate()



    return (
        <div className=' d-flex' style={{ width: '100%', minHeight: '100%', }}>

            <div className='d-none d-lg-flex'>

                <Sidebar value={"dashboard"} ></Sidebar>
            </div>
            <div className=' m-0 m-sm-4 flex-1 container mx-auto  ' style={{ borderRadius: '10px' }}>
                <Topnav></Topnav>



                <div className='mt-3 All_emp_Top_btns' >
                    <div>
                        <h6 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>All Employees List</h6>

                    </div>
                    <div>

                        <div className='' style={{ display: 'flex', justifyContent: 'end' }}>



                            <div class="input-group mb-3 me-3">
                                <span class="input-group-text" id="basic-addon1" style={{ width: '40px', height: '32px', outline: 'none', fontSize: '14px' }}> <i class="fa-solid fa-magnifying-glass " ></i>  </span>
                                <input type="text" value={searchValue} style={{ width: '180px', height: '32px', fontSize: '9px', outline: 'none' }}
                                    onChange={(e) => {
                                        handlesearchvalue(e.target.value)
                                    }} class="form-control shadow-none" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <EmployeeCreation show={addEmpModal} id={Edit_id} setid={set_Edit_id}
                                setshow={setAddEmpModal} getEmp={fetchdata} />

                            <div className='' >
                                <button className='btn bg-primary-subtle' onClick={() => { setAddEmpModal(true) }}
                                    style={{ width: '120px', height: '32px', outline: 'none', fontSize: '14px' }}
                                // data-bs-toggle="modal" data-bs-target="#exampleModal232"
                                >
                                    Add Employee
                                </button>



                                <div class="modal fade" id="exampleModal232" tabindex="-1" aria-labelledby="exampleModalLabel232" aria-hidden="true">
                                    <div class="modal-dialog modal-xl">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">

                                                <form>
                                                    {/* Form start */}
                                                    <div className="row justify-content-center m-0">
                                                        <h3 className='mt-2 text-center p-3' style={{ color: 'rgb(76,53,117)' }}>Enter Employee Information</h3>
                                                        <div className="col-lg-12 p-4 mt-2 border rounded-lg">

                                                            <form >
                                                                {/* ---------------------------------PERSONAL DETAILS--------------------------------------------------------- */}
                                                                <div className="row m-0  pb-2">
                                                                    <div className='row m-0 mt-2'>

                                                                        <div className="col-md-6 col-lg-4  mb-3">
                                                                            <label htmlFor="firstName" className="form-label">Name <span class='text-danger'>*</span> </label>
                                                                            <input type="text" className="form-control shadow-none bg-light" id="FirstName" name="FirstName" value={Name} onChange={(e) => setName(e.target.value)} required />
                                                                        </div>
                                                                        <div className="col-md-6 col-lg-4 mb-3">
                                                                            <label htmlFor="lastName" className="form-label">DOB <span class='text-danger'>*</span> </label>
                                                                            <input type="date" className="form-control shadow-none bg-light" id=" LastName" name=" LastName" value={DOB} onChange={(e) => setDOB(e.target.value)} required />
                                                                        </div>
                                                                        <div className="col-md-6 col-lg-4 mb-3">
                                                                            <label htmlFor="gender" className="form-label bg-light">Gender <span class='text-danger'>*</span> </label>
                                                                            <select
                                                                                className="form-control shadow-none bg-light"
                                                                                id="gender"
                                                                                name="gender"
                                                                                value={gender} // Set the value of the select input to gender
                                                                                onChange={(e) => setGender(e.target.value)} // Update gender state when the select input changes
                                                                                required>
                                                                                <option value="">Select Gender <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}
                                                                                <option value="male">Male</option>
                                                                                <option value="female">Female</option>
                                                                                <option value="others">Others</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="col-md-6 col-lg-4 mb-3">
                                                                            <label htmlFor="email" className="form-label">Email <span class='text-danger'>*</span> </label>
                                                                            <input type="email" className="form-control shadow-none bg-light" id=" Email" name=" Email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
                                                                        </div>
                                                                        <div className="col-md-6 col-lg-4 mb-3">
                                                                            <label htmlFor="primaryContact" className="form-label">Phone <span class='text-danger'>*</span> </label>
                                                                            <input type="tel" className="form-control shadow-none bg-light" id="PrimaryContact" name="PrimaryContact" value={Phone} onChange={(e) => setPhone(e.target.value)} required />
                                                                        </div>
                                                                        <div className="col-md-6 col-lg-2 mb-3">
                                                                            <label htmlFor="secondaryContact" className="form-label">Weight  </label>
                                                                            <input type="number" className="form-control shadow-none bg-light" id="SecondaryContact" name="SecondaryContact" value={Weight} onChange={(e) => setWeight(e.target.value)} />
                                                                        </div>
                                                                        <div className="col-md-6 col-lg-2 mb-3">
                                                                            <label htmlFor="secondaryContact" className="form-label">Height <span class='text-danger'>*</span> </label>
                                                                            <input type="number" className="form-control shadow-none bg-light" id="State" name="State" value={Height} onChange={(e) => setHeight(e.target.value)} required />
                                                                        </div>
                                                                        <div className="col-md-6 col-lg-12 mb-3">
                                                                            <label htmlFor="secondaryContact" className="form-label">Permanent Address <span class='text-danger'>*</span> </label>
                                                                            <textarea type="text" className="form-control shadow-none bg-light" id=" District" name=" District" value={Permanent_Address} onChange={(e) => setPermanent_Address(e.target.value)} required />
                                                                        </div>
                                                                        <div className="col-md-6 col-lg-12 mb-3">
                                                                            <label htmlFor="secondaryContact" className="form-label">Present Address  <span class='text-danger'>*</span> </label>
                                                                            <textarea type="text" className="form-control shadow-none bg-light" id=" District" name=" District" value={Present_Address} onChange={(e) => setPresent_Address(e.target.value)} required />
                                                                        </div>
                                                                        <div className="col-md-6 col-lg-4 mb-3">
                                                                            <label htmlFor="secondaryContact" className="form-label">Hired Date <span class='text-danger'>*</span> </label>
                                                                            <input type="date" className="form-control shadow-none bg-light" id="State" name="State " value={Hired_Date} onChange={(e) => setHired_Date(e.target.value)} required />
                                                                        </div>

                                                                        <div className="col-md-6 col-lg-4 mb-3">
                                                                            <label htmlFor="gender" className="form-label bg-light">Dashboard <span class='text-danger'>*</span> </label>
                                                                            <select
                                                                                className="form-control shadow-none bg-light"
                                                                                id="gender"
                                                                                name="gender"
                                                                                value={Dashboard} // Set the value of the select input to gender
                                                                                onChange={(e) => setDashboard(e.target.value)} // Update gender state when the select input changes
                                                                                required>
                                                                                <option value="">Select  <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}
                                                                                <option value="HR">HR</option>
                                                                                <option value="REC">REC</option>
                                                                                <option value="EMP">EMP</option>
                                                                            </select>
                                                                        </div>

                                                                        <div className="col-md-6 col-lg-4 mb-3">
                                                                            <label htmlFor="gender" className="form-label bg-light">Department <span class='text-danger'>*</span> </label>
                                                                            <select
                                                                                className="form-control shadow-none bg-light"
                                                                                id="gender"
                                                                                name="gender"
                                                                                value={Department} // Set the value of the select input to gender
                                                                                onChange={(e) => {

                                                                                    setDepartment(e.target.value)

                                                                                    Call_Department(e.target.value)

                                                                                }} // Update gender state when the select input changes
                                                                                required>
                                                                                <option value="">Select  <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}


                                                                                {Department_List.map(interviewer => (
                                                                                    <option key={interviewer.id} value={interviewer.id}>
                                                                                        {`${interviewer.Dep_Name}`}
                                                                                    </option>
                                                                                ))}


                                                                            </select>
                                                                        </div>
                                                                        <div className="col-md-6 col-lg-4 mb-3">
                                                                            <label htmlFor="gender" className="form-label">Designation <span class='text-danger'>*</span> </label>
                                                                            <select
                                                                                className="form-control shadow-none bg-light"
                                                                                id="gender"
                                                                                name="gender"
                                                                                value={Designation} // Set the value of the select input to gender
                                                                                onChange={(e) => setDesignation(e.target.value)} // Update gender state when the select input changes
                                                                                required>
                                                                                <option value="">Select  <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}
                                                                                {Desgination_List.map(interviewer => (
                                                                                    <option key={interviewer.id} value={interviewer.id}>
                                                                                        {`${interviewer.Name}`}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        </div>

                                                                        <div className="col-md-6 col-lg-4 mb-3">
                                                                            <label htmlFor="gender" className="form-label bg-light">Reporting To <span class='text-danger'>*</span> </label>
                                                                            <select
                                                                                className="form-control shadow-none bg-light"
                                                                                id="gender"
                                                                                name="gender"
                                                                                value={Reporting_To} // Set the value of the select input to gender
                                                                                onChange={(e) => setReporting_To(e.target.value)} // Update gender state when the select input changes
                                                                                required>
                                                                                <option value="">Select  <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}
                                                                                {interviewers.map(interviewer => (
                                                                                    <option key={interviewer.EmployeeId} value={interviewer.EmployeeId}>
                                                                                        {`${interviewer.EmployeeId},${interviewer.Name}`}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        </div>





                                                                    </div>


                                                                </div>




                                                                <div className="col-12 text-end mt-3">
                                                                    <button type="submit" onClick={Add_Employee} data-bs-dismiss="modal"
                                                                        className="btn btn-primary text-white fw-medium px-2 px-lg-5">Submit</button>

                                                                </div>
                                                            </form>

                                                        </div>
                                                    </div>
                                                    {/* form end */}

                                                </form>

                                            </div>

                                        </div>
                                    </div>
                                </div>



                            </div>


                        </div>

                    </div>
                </div >



                {/* <button type="submit" onClick={Click} className="btn btn-primary text-white fw-medium px-2 px-lg-5">CLICK</button> */}


                < div className='row tablebg table-responsive max-h-[60vh] 
                overflow-y-scroll rounded-xl my-3 mt-3 p-0' style={{ width: '100%' }}>
                    <table class="w-full p-0 ">
                        <thead>
                            <tr className='sticky top-0 bgclr1 '>

                                {/* <th scope="col"><span className='fw-medium'>All</span></th> */}
                                <th scope="col">Name</th>
                                <th scope="col">Employee ID</th>
                                <th scope="col">Email</th>
                                <th>Employeement Type </th>
                                <th scope="col">Position</th>

                                <th scope="col">Phone</th>
                                <th scope="col">Join Date</th>
                                <th>Department </th>
                                <th scope="col">Role</th>
                                <th>Qualification </th>
                                <th>Blood group </th>
                                <th>Emergency Contact </th>
                                <th> Marital status</th>
                                <th> AadharCard Number</th>
                                <th> PanCard Number</th>
                                <th> Current Experience </th>
                                <th>Total Experience </th>
                                <th>Current CTC </th>
                                <th className="col sticky right-0 bgclr1 ">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {AllEmployeelist && AllEmployeelist.map((e, index) => {
                                console.log(e, 'empdetails');

                                return (
                                    <tr key={e.id} className={`   `} >
                                        {/* <td scope="row"><input type="checkbox" value={e.employee_Id}
                                            onChange={handleCheckboxChange} /></td> */}
                                        <td
                                            className=' '>
                                            <button className=' '
                                                onClick={() => {
                                                    sentparticularData(e.id, e.employeeProfile);
                                                    navigate(`/dash/employee/${e.employee_Id}`)
                                                }}>
                                                {e.full_name}
                                            </button>
                                        </td>
                                        <td> {e.employee_Id}</td>
                                        <td> {e.email}</td>
                                        <td>{e.Employeement_Type} </td>
                                        <td> {e.Dashboard}</td>

                                        <td> {e.mobile}</td>
                                        <td> {e.hired_date}</td>
                                        <td>{e.Department} </td>
                                        <td> {e.Designation}</td>
                                        <td>{e.EducationDetails && e.EducationDetails[0] && e.EducationDetails[0].Qualification} </td>
                                        <td>{e.EmergencyDetails && e.EmergencyDetails[0] && e.EmergencyDetails[0].blood_group} </td>
                                        <td> {e.EmergencyContactDetails && e.EmergencyContactDetails[0] && `${e.EmergencyContactDetails[0].person_name}
                                         (${e.EmergencyContactDetails[0].phone})`} </td>
                                        <td>{e.PersonalInformation && e.PersonalInformation[0] && e.PersonalInformation[0].marital_status} </td>
                                        <td> {e.EmployeeIdentity && e.EmployeeIdentity[0] && e.EmployeeIdentity[0].aadhar_no} </td>
                                        <td> {e.EmployeeIdentity && e.EmployeeIdentity[0] && e.EmployeeIdentity[0].pan_no} </td>
                                        <td>{e.Currrent_Experience} </td>
                                        <td>{e.Total_Experience} </td>
                                        <td>{e.salary_Template && e.salary_Template.CTC_per_annum} </td>
                                        <td className='flex sticky-right bgclr1 items-center gap-3 '>
                                            <button onClick={() => {
                                                Edit_Employee(e.id);
                                                // set_Edit_id(e.id)
                                                // setAddEmpModal(true)
                                                setEditModal(true)
                                            }}
                                            //  data-bs-toggle="modal" data-bs-target="#exampleModal_Edit" 
                                            >
                                                <EditPen />
                                            </button>
                                            {empStatus == 'Admin' && <button onClick={() => Delete_Employee(e.id, e.full_name)}>

                                                <DustbinIcon />
                                            </button>
                                            }
                                            {empStatus == 'Admin' &&
                                                <button onClick={() => navigate(`/dash/employee/${e.employee_Id}`)}>
                                                    <ViewBtn />
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {showreligion && <CreateReligion show={showreligion} setshow={setShowReligion} />}
                    {showDepartment && <CreateDepartment show={showDepartment} setshow={setShowDepartment} getdept={getDepart} />}
                    <Modal show={editModal} centered size='xl'
                        onHide={() => { resetEditModal() }} >
                        <Modal.Header closeButton>
                            <h3 className='poppins' style={{ color: 'rgb(76,53,117)' }} >
                                Update Employee2 Information </h3>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row justify-content-center m-0">
                                {editModalPage == 'Info' && <div className="col-lg-12 p-4 mt-2 border rounded-lg">


                                    {/* ---------------------------------PERSONAL DETAILS--------------------------------------------------------- */}
                                    <div className="row m-0  pb-2">
                                        <div className='row m-0 mt-2'>

                                            <div className="col-md-6 col-lg-4  mb-3">
                                                <label htmlFor="firstName" className="form-label">Name <span class='text-danger'>*</span> </label>
                                                <input type="text" className="form-control shadow-none bg-light" id="FirstName" name="full_name" value={Edit_Data.full_name} onChange={handleChangeEdit_data} />
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="lastName" className="form-label">DOB <span class='text-danger'>*</span> </label>
                                                <input type="date" className="form-control shadow-none bg-light" id=" LastName" name="date_of_birth" value={Edit_Data.date_of_birth} onChange={handleChangeEdit_data} />
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="gender" className="form-label bg-light">Gender <span class='text-danger'>*</span> </label>
                                                <select
                                                    className="form-control shadow-none bg-light"
                                                    id="gender"
                                                    name="gender"
                                                    onChange={handleChangeEdit_data}
                                                    value={Edit_Data.gender} // Set the value of the select input to gender
                                                // Update gender state when the select input changes
                                                >
                                                    <option value="">Select Gender <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="others">Others</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="email" className="form-label">Primary Email <span class='text-danger'>*</span> </label>
                                                <input type="email" className="form-control shadow-none bg-light" id=" Email" name="email"
                                                    value={Edit_Data.email} onChange={handleChangeEdit_data} />
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="email" className="form-label">Secondary Email <span class='text-danger'></span> </label>
                                                <input type="email" className="form-control shadow-none bg-light" id=" Email" name="secondary_email"
                                                    value={Edit_Data.secondary_email} onChange={handleChangeEdit_data} />
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="email" className="form-label">Attendence Id <span class='text-danger'>*</span> </label>
                                                <input type="text" className="form-control shadow-none bg-light" id=" Email" name="employee_attendance_id"
                                                    value={Edit_Data.employee_attendance_id} onChange={handleChangeEdit_data} />
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="primaryContact" className="form-label">Primary Phone <span class='text-danger'>*</span> </label>
                                                <input type="tel" className="form-control shadow-none bg-light" id="PrimaryContact" name="mobile"
                                                    value={Edit_Data.mobile} onChange={handleChangeEdit_data} />
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="primaryContact" className="form-label">Secondary Phone <span class='text-danger'>*</span> </label>
                                                <input type="tel" className="form-control shadow-none bg-light" id="PrimaryContact" name="secondary_mobile_number"
                                                    value={Edit_Data.secondary_mobile_number} onChange={handleChangeEdit_data} />
                                            </div>
                                            <div className="col-md-6 col-lg-2 mb-3">
                                                <label htmlFor="secondaryContact" className="form-label">Weight  </label>
                                                <input type="number" className="form-control shadow-none bg-light" id="SecondaryContact" name="weight"
                                                    value={Edit_Data.weight} onChange={handleChangeEdit_data} />
                                            </div>
                                            <div className="col-md-6 col-lg-2 mb-3">
                                                <label htmlFor="secondaryContact" className="form-label">Height <span class='text-danger'>*</span> </label>
                                                <input type="number" className="form-control shadow-none bg-light" id="State" name="height" value={Edit_Data.height} onChange={handleChangeEdit_data} />
                                            </div>
                                            <div className="col-md-6 col-lg-12 mb-3">
                                                <label htmlFor="secondaryContact" className="form-label">Permanent Address <span class='text-danger'>*</span> </label>
                                                <textarea type="text" className="form-control shadow-none bg-light" id=" District" name="permanent_address" value={Edit_Data.permanent_address} onChange={handleChangeEdit_data} />
                                            </div>
                                            <div className="col-md-6 col-lg-12 mb-3">
                                                <label htmlFor="secondaryContact" className="form-label">Present Address  <span class='text-danger'>*</span> </label>
                                                <textarea type="text" className="form-control shadow-none bg-light" id=" District" name="present_address" value={Edit_Data.present_address} onChange={handleChangeEdit_data} />
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="secondaryContact" className="form-label">Hired Date <span class='text-danger'>*</span> </label>
                                                <input type="date" className="form-control shadow-none bg-light" id="State" name="hired_date" value={Edit_Data.hired_date} onChange={handleChangeEdit_data} />
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="gender" className="flex justify-between form-label"> Religion
                                                    <button className='text-xs ' onClick={() => setShowReligion(true)} >create Religion </button>
                                                </label>
                                                <select
                                                    className="form-control shadow-none bg-light"
                                                    id="gender"
                                                    name="religion"
                                                    value={Edit_Data.religion}
                                                    onChange={(e) => {
                                                        handleChangeEdit_data(e)
                                                    }}>
                                                    <option value="">Select  <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}
                                                    {religion && religion.map(interviewer => (
                                                        <option key={interviewer.id} value={interviewer.id}>
                                                            {`${interviewer.religion_name}`}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="gender" className="form-label ">Position <span class='text-danger'>*</span> </label>
                                                <select
                                                    className="form-control shadow-none bg-light"
                                                    id="gender"
                                                    name="Dashboard"
                                                    value={Edit_Data.Dashboard}
                                                    onChange={handleChangeEdit_data} // Set the value of the select input to gender
                                                // Update gender state when the select input changes
                                                >
                                                    <option value="">Select  <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}
                                                    <option value="HR">HR head</option>
                                                    <option value="Admin">Admin</option>
                                                    <option value="Employee">Employee</option>
                                                    <option value="Recruiter">Recruiter</option>
                                                </select>
                                            </div>

                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="gender" className="form-label flex justify-between ">Department
                                                    <button className='text-xs ' onClick={() => setShowDepartment(true)} >
                                                        Create Department </button> </label>
                                                <select
                                                    className="form-control shadow-none bg-light"
                                                    id="gender"
                                                    name="Department_id"
                                                    value={Edit_Data.Department_id}
                                                    onChange={(e) => {
                                                        Call_Department(e.target.value)
                                                        handleChangeEdit_data(e)
                                                    }}
                                                // Set the value of the select input to gender
                                                // Update gender state when the select input changes
                                                >
                                                    <option value="">Select  <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}
                                                    {Department_List.map((interviewer, index) => {
                                                        console.log("Update_Data", interviewer);
                                                        return (
                                                            <option key={interviewer.id} value={interviewer.id}>
                                                                {`${interviewer.Dep_Name}`}
                                                            </option>
                                                        )
                                                    })}


                                                </select>
                                            </div>
                                            {console.log(Edit_Data)
                                            }
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="gender" className="form-label">Designation <span class='text-danger'>*</span> </label>
                                                <select
                                                    className="form-control shadow-none bg-light"
                                                    id="gender"
                                                    name="Position_id"
                                                    value={Edit_Data.Position_id}
                                                    onChange={(e) => {
                                                        handleChangeEdit_data(e)
                                                    }}>
                                                    <option value="">Select  <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}
                                                    {Desgination_List.map(interviewer => (
                                                        <option key={interviewer.id} value={interviewer.id}>
                                                            {`${interviewer.Name}`}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="gender" className="form-label ">Reporting To <span class='text-danger'>*</span> </label>
                                                <select
                                                    className="form-control shadow-none bg-light"
                                                    id="gender"
                                                    name="Reporting_To"
                                                    value={Edit_Data.Reporting_To}
                                                    onChange={handleChangeEdit_data} // Set the value of the select input to gender
                                                // Update gender state when the select input changes
                                                >
                                                    <option value="">Select  <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}
                                                    {interviewers.map(interviewer => (
                                                        <option key={interviewer.EmployeeId} value={interviewer.EmployeeId}>
                                                            {`${interviewer.EmployeeId},${interviewer.Name}`}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="gender" className="form-label">Employeement type <span class='text-danger'>*</span> </label>
                                                <select value={Edit_Data.Employeement_Type} onChange={handleChangeEdit_data}
                                                    className="form-control shadow-none bg-light"
                                                    id="gender"
                                                    name="Employeement_Type" // Update gender state when the select input changes
                                                    required>
                                                    <option value="">Select  <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}
                                                    <option value="intern">Intern </option>
                                                    <option value="permanent">Permanent </option>
                                                </select>
                                            </div>
                                            {Edit_Data.Employeement_Type == 'intern' && <section className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="gender" className="form-label">Intern Duration <span class='text-danger'>*</span> </label>
                                                <div>
                                                    <input type="date" value={Edit_Data.internship_Duration_From} name='internship_Duration_From'
                                                        onChange={handleChangeEdit_data} className='outline-none p-2 bg-light rounded border-1 ' /> -
                                                    <input type="date" value={Edit_Data.internship_Duration_To} name='internship_Duration_To'
                                                        onChange={handleChangeEdit_data} className='outline-none p-2 bg-light rounded border-1 ' />
                                                </div>
                                            </section>}
                                            {Edit_Data.Employeement_Type == 'permanent' && <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="gender" className="form-label">Probation type <span class='text-danger'>*</span> </label>
                                                <select value={Edit_Data.probation_status} onChange={handleChangeEdit_data}
                                                    className="form-control shadow-none bg-light"
                                                    id="gender"
                                                    name="probation_status"
                                                    // Update gender state when the select input changes
                                                    required>
                                                    <option value="">Select  <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}
                                                    <option value="probationer">Probationer </option>
                                                    {/* <option value="confirmed"> Confirmed </option> */}
                                                </select>
                                            </div>}
                                            {Edit_Data.probation_status == 'probationer' &&
                                                <section className="col-md-6 col-lg-4 mb-3">
                                                    <label htmlFor="gender" className="form-label">Probation Duration
                                                        <span class='text-danger'>*</span>
                                                    </label>
                                                    <div>
                                                        <input type="date" value={Edit_Data.probation_Duration_From} name='probation_Duration_From'
                                                            onChange={handleChangeEdit_data} className='outline-none p-2 bg-light rounded border-1 ' /> -
                                                        <input type="date" value={Edit_Data.probation_Duration_To} name='probation_Duration_To'
                                                            onChange={handleChangeEdit_data} className='outline-none p-2 bg-light rounded border-1 ' />
                                                    </div>
                                                </section>}

                                            <section>
                                                <label htmlFor="activestatus" className="form-label"> Active status
                                                </label>
                                                <article onClick={() => (
                                                    set_Edit_Data((prev) => ({
                                                        ...prev,
                                                        employee_status: Edit_Data.employee_status == 'active' ? 'in_active' : 'active'
                                                    }))
                                                )}
                                                    className='flex gap-1 items-center ' >
                                                    Block
                                                    <div className={`  ${Edit_Data.employee_status == 'active' ? 'bg-green-100'
                                                        : "bg-red-100"} relative w-10 h-5 rounded-full duration-500 border-2 `}>
                                                        <button className={`  h-4 w-4 absolute ${Edit_Data.employee_status == 'active' && "translate-x-5"} duration-500 rounded-full bg-white `} >

                                                        </button>
                                                    </div>
                                                    Active
                                                </article>


                                            </section>

                                        </div>

                                        <section>
                                            <h4>Permissions </h4>
                                            <article className='flex flex-wrap  '>
                                                <div className="col-md-6 col-lg-4 mb-3">
                                                    <input type="checkbox" className=''
                                                        checked={Edit_Data.interview_shedule_access} id='interview_shedule_access'
                                                        value={Edit_Data.interview_shedule_access}
                                                        onChange={() => set_Edit_Data((prev) => ({
                                                            ...prev,
                                                            interview_shedule_access: !prev.interview_shedule_access
                                                        }))} />
                                                    <label htmlFor="interview_shedule_access">
                                                        Interview shedule access
                                                    </label>
                                                </div>
                                                <div className="col-md-6 col-lg-4 mb-3">
                                                    <input type="checkbox" className='' checked={Edit_Data.applied_list_access} id='applied_list_access'
                                                        value={Edit_Data.applied_list_access}
                                                        onChange={() => set_Edit_Data((prev) => ({
                                                            ...prev,
                                                            applied_list_access: !prev.applied_list_access
                                                        }))} />
                                                    <label htmlFor="applied_list_access">
                                                        Applied list access
                                                    </label>
                                                </div>
                                                <div className="col-md-6 col-lg-4 mb-3">
                                                    <input type="checkbox" className='' checked={Edit_Data.final_status_access} id='final_status_access'
                                                        value={Edit_Data.final_status_access}
                                                        onChange={() => set_Edit_Data((prev) => ({
                                                            ...prev,
                                                            final_status_access: !prev.final_status_access
                                                        }))} />
                                                    <label htmlFor="final_status_access">
                                                        Final status access
                                                    </label>
                                                </div>
                                                <div className="col-md-6 col-lg-4 mb-3">
                                                    <input type="checkbox" className='' checked={Edit_Data.screening_shedule_access} id='screening_shedule_access'
                                                        value={Edit_Data.screening_shedule_access}
                                                        onChange={() => set_Edit_Data((prev) => ({
                                                            ...prev,
                                                            screening_shedule_access: !prev.screening_shedule_access
                                                        }))} />
                                                    <label htmlFor="screening_shedule_access">
                                                        Screening shedule access
                                                    </label>
                                                </div>



                                            </article>


                                        </section>
                                    </div>
                                    <div className="col-12 text-end mt-3">
                                        <button type="submit" disabled={loading == 'edit'} onClick={Update_Employee}
                                            // data-bs-dismiss="modal"  
                                            className="btn btn-primary text-white fw-medium px-2 px-lg-5">
                                            {loading == 'edit' ? 'loading...' : "Next"} </button>
                                    </div>

                                </div>}
                                {editModalPage == 'sal' &&
                                    <EmployeeSalaryAdding id={Edit_Data.id} emp={Edit_Data} setpage={setEditModalPage} />}

                            </div>
                        </Modal.Body>
                    </Modal>




                </div >
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <div className='me-3'>
                        <button style={{ outline: 'none ', backgroundColor: 'rgb(76,53,117)' }} className='btn  btn-sm text-white' data-bs-toggle="modal" data-bs-target="#exampleModal9" >Bulk Employee Upload </button>
                    </div>
                    <div class="modal fade" id="exampleModal9" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h6>Upload Excel File</h6>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {/* File input */}
                                    <input
                                        type="file"
                                        className="form-control-file form-control shadow-none"
                                        onChange={handleFileChange}
                                        accept=".csv, .xlsx, .txt" // Specify allowed file types if needed
                                    />
                                </div>
                                <div className="modal-footer">

                                    <a href={Employees_Upload_Formate_Res}  >

                                        <button
                                            type="button"
                                            className="btn btn-warning  " data-bs-dismiss="modal">

                                            Download Excel Format
                                        </button>
                                    </a>




                                    <button
                                        type="button"
                                        className="btn btn-primary  "
                                        onClick={uploadFile}
                                        disabled={!selectedFile}
                                        data-bs-dismiss="modal"
                                    >
                                        Upload
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <button className='btn  me-3 btn-sm ' style={{ backgroundColor: 'rgb(240,179,100)' }} onClick={handleDownload}>
                        {downloading ? 'Downloading...' : 'Download'}
                    </button>
                    {/* <button className='btn  btn-success '>DownLoad Excel File</button> */}
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

                                </div>

                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >EMPLOYEE PERSONAL INFORMATION</h6>

                                <div className="border p-4">

                                </div>

                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >EMPLOYEE IDENTITY FORM</h6>

                                <div className="border p-4">

                                </div>

                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >BANK ACCOUNT DETAILS</h6>

                                <div className="border p-4">

                                </div>
                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >PF DETAILS</h6>

                                <div className="border p-4">

                                </div>

                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >ADDITIONAL INFORMATION</h6>

                                <div className="border p-4">

                                </div>

                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >ATTACHMENTS</h6>

                                <div className="border p-4">

                                </div>
                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >DOCUMENTS SUBMITED</h6>

                                <div className="border p-4">

                                </div>
                                <h6 class='mt-2 heading nav-link' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} >DECLARATION</h6>

                                <div className="border p-4">

                                </div>


                            </div>
                            <div class="modal-footer d-flex justify-content-between">
                                <button type="button" class="btn btn-secondary " data-bs-dismiss="modal">Close</button>

                                <div className='d-flex gap-2'>

                                    {/* <button type="button" class="btn btn-primary">Assign Task</button> */}

                                    <button type="button" class="btn btn-success" data-bs-target="#exampleModalToggle5" data-bs-toggle="modal">Schudle Interview</button>



                                    {/* <button type="button" class="btn btn-info">Offer Letter</button> */}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* open Particular Data End */}


            </div >



        </div >
    )
}

export default Allemp