import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { port } from '../App'
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import Empsidebar from './Empsidebar';
import Recsidebar from './Recsidebar';
import ReactQuill from 'react-quill';


const Mass_mail = () => {
    let [loading, setLoading] = useState(false)
    let employeeStatus = JSON.parse(sessionStorage.getItem('user')).Disgnation
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
        formData1.append('Reason', Reason);
        formData1.append('Any_proof', Any_proof);

        for (let pair of formData1.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
    };

    const [Department, setDepartment] = useState("");
    const [Departments, setDepartments] = useState([]);
    const [Designation, setDesignation] = useState([]);
    const [_Designation, set_Designation] = useState("");

    const [Employeelist, setEmployeelist] = useState([]);

    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [Subject, setSubject] = useState("");
    const [Type, setType] = useState("");
    const [Date, setDate] = useState("");
    const [Message, setMessage] = useState("");
    const [search, setsearch] = useState("");

    console.log("sas", Employeelist);


    const getAllemp = () => {
        axios.get(`${port}/root/ems/MassMails`).then((res) => {
            console.log("Departments_res", res.data);
            setDepartments(res.data.Departments)
            setEmployeelist(res.data.EmployeeMails)
        }).catch((err) => {
            console.log("Departments_err", err.data);

        })
    }



    useEffect(() => {

        getAllemp()

    }, [])




    const handleDepartmentChange = (e) => {

        const selectedDepartment = e.target.value;
        setDepartment(selectedDepartment);


        if (e.target.value != '')
            axios.get(`${port}/root/ems/Department_Mail/${e.target.value}/`).then((res) => {
                console.log("Department_Employee_res :", e.target.value, res.data);
                setDesignation(res.data.Designations)
                setEmployeelist(res.data.EmployeeMails)
            }).catch((err) => {
                console.log("Department_err", err.data);

            })
        else {
            getAllemp()
            setDesignation([])
        }


    };

    const handleDesignationChange = (e) => {

        const selectedDesignation = e.target.value;
        set_Designation(selectedDesignation);

        axios.get(`${port}/root/ems/Designation_Mail/${e.target.value}/`).then((res) => {
            console.log("Designation_Employee_res :", e.target.value, res.data);
            setEmployeelist(res.data.EmployeeMails)
        }).catch((err) => {
            console.log("Department_err", err.data);
        })

    };


    const handleCheckboxChange = (e) => {
        const candidateId = e.target.value;
        if (e.target.checked) {
            setSelectedCandidates([...selectedCandidates, candidateId]);
        } else {
            setSelectedCandidates(selectedCandidates.filter(id => id !== candidateId));
        }
    };


    const sendSelectedDataToApi = (e) => {
        e.preventDefault()

        const formData2 = new FormData();
        // formData2.append('Department', Department);
        formData2.append('subject', Subject);
        // formData2.append('subject', Date);
        formData2.append('message', Message);
        formData2.append('mail_sentby', JSON.parse(sessionStorage.getItem('dasid')));

        for (let index = 0; index < selectedCandidates.length; index++) {
            formData2.append('employee_mails_list', selectedCandidates[index]);

        }
        for (let pair of formData2.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        setLoading(true)
        // return
        axios.post(`${port}/root/ems/MassMails`, formData2).then((response) => {
            toast.success('Email Sended')
            setLoading(false)
            console.log(response.data, 'mail');
            setSubject('')
            setMessage('')
            setSelectedCandidates([])

        }).catch((error) => {
            console.log(error, 'mail');
            toast.error('Error occured')
            setLoading(false)

        })


        // axios.post(`${port}/root/ScreeningAssigning/`, { Candidates: selectedCandidates, Recruiterid: id, login_user: Empid })
        //     .then(response => {
        //         console.log('API response:', response.data);
        //         setcount(count + 1)
        //         setSuccessAlert(true);


        //     })
        //     .catch(error => {
        //         console.error('Error sending data to API:', error);

        //     });
    };

    const [employeeId, setEmployeeId] = useState('');

    const handleChange = (event) => {
        setEmployeeId(event.target.value);
    };

    const sendDataToAPI = () => {

        console.log(employeeId);

        axios.get(`${port}/root/ems/EmployeeId/Mail/${employeeId}/`).then((res) => {
            console.log("Search_Employee_res :", employeeId, res.data);
            setEmployeelist(res.data.EmployeeMails)
        }).catch((err) => {
            console.log("Department_err", err.data);

        })

    };



    return (
        <div className='flex '>
            <div className='d-none d-lg-flex '>
                {employeeStatus && employeeStatus == 'Employee' && <Empsidebar />}
                {employeeStatus && employeeStatus == 'Recruiter' && <Recsidebar />}
                {employeeStatus && employeeStatus == 'HR' && <Sidebar />}
                {employeeStatus && employeeStatus == 'Admin' && <Sidebar />}
            </div>
            <div className='flex-1 container mx-auto '>
                <form>
                    {/* Form start */}
                    <div className="row  justify-content-center m-0">
                        <h3 className='mt-2 text-center p-3' style={{ color: 'rgb(76,53,117)' }}>Mass Mail</h3>
                        <div className="col-lg-12 container mx-auto formbg p-4 mt-2 border rounded-lg">
                            <div className="row m-0 pb-2" style={{ lineHeight: '30px' }}>
                                {/* Form fields */}

                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="ageGroup" className="form-label" style={{ color: 'rgb(76,53,117)' }}>Department* </label>

                                    <select className="form-select shadow-none" id="ageGroup" value={Department} onChange={handleDepartmentChange}>
                                        <option value="">Select</option>

                                        {Departments != undefined && Departments != undefined && Departments.map((e) => {
                                            return (
                                                <option value={e}> {e} </option>
                                            )
                                        })}
                                    </select>

                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="ageGroup" className="form-label" style={{ color: 'rgb(76,53,117)' }}>Designation* </label>
                                    <select className="form-select shadow-none" id="ageGroup" value={_Designation} onChange={handleDesignationChange}  >
                                        {/* <option value="">Select</option> */}

                                        {Designation.map((e) => {
                                            return (
                                                <option value={e}>{e}</option>
                                            )
                                        })}

                                    </select>
                                </div>
                                {/* <div class="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="ageGroup" className="form-label" style={{ color: 'rgb(76,53,117)' }}>Search* </label>

                                    <div class="input-group ">
                                        <input type="text" value={employeeId} onChange={handleChange} class="form-control shadow-none" aria-label="Recipient's username" placeholder='Type Employee ID' aria-describedby="button-addon2" />
                                        <button class="btn btn-outline-secondary" onClick={sendDataToAPI} type="button" id="button-addon2">Button</button>
                                    </div>
                                </div> */}

                                <div className="col-md-6 col-lg-12 mb-3">
                                    <label htmlFor="lastName" className="form-label" style={{ color: 'rgb(76,53,117)' }}>EmployeeFilter*</label>
                                    <div className='rounded tablebg border table-responsive  m-1'>
                                        <table class="w-full ">
                                            <thead >
                                                <tr >
                                                    {/* <th scope="col"></th> */}
                                                    <th scope="col"><span className='fw-medium'></span> Select  </th>
                                                    <th>Employee ID </th>
                                                    <th>Name </th>
                                                    <th scope="col" className='fw-medium'>Email</th>
                                                    <th>Department </th>
                                                    <th>Designation </th>
                                                    <th>Phone </th>

                                                </tr>
                                            </thead>
                                            {Employeelist != undefined && Employeelist.map((e) => {
                                                return (

                                                    <tbody>
                                                        <tr className='cursor-pointer hover:bg-blue-50 ' onClick={() => {
                                                            if (selectedCandidates.find((obj) => obj == e.email))
                                                                setSelectedCandidates(selectedCandidates.filter((obj) => obj != e.email))
                                                            else
                                                                setSelectedCandidates((prev) => [...prev, e.email])
                                                        }} >
                                                            <td scope="row">

                                                                <input type="checkbox" checked={selectedCandidates.find((obj) => obj == e.email)} /></td>

                                                            <td>{e.employee_Id} </td>
                                                            <td> {e.full_name} </td>
                                                            <td > {e.email} </td>
                                                            <td>{e.Department} </td>
                                                            <td>{e.Designation} </td>
                                                            <td>{e.mobile} </td>
                                                        </tr>
                                                    </tbody>

                                                )
                                            })}
                                        </table>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-8 mb-3">
                                    <label htmlFor="lastName" className="form-label" style={{ color: 'rgb(76,53,117)' }}>Subject*</label>
                                    <input type="tel" className="form-control shadow-none" value={Subject} onChange={(e) => setSubject(e.target.value)} id="LastName" name="LastName" />
                                </div>

                                {/* <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="ageGroup" className="form-label" style={{ color: 'rgb(76,53,117)' }}>Type*</label>
                                    <select className="form-select" id="ageGroup" value={Type} onChange={(e) => setType(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div> */}

                                {/* <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label" style={{ color: 'rgb(76,53,117)' }}>Date *</label>
                                    <input type="date" className="form-control shadow-none" value={Date} onChange={(e) => setDate(e.target.value)} id="State" name="State" />
                                </div> */}

                                <div className="col-md-6 col-lg-12 mb-3">
                                    <label htmlFor="ageGroup" className="form-label" style={{ color: 'rgb(76,53,117)' }}>Message*</label>
                                    <ReactQuill theme="snow" className='bg-white  ' value={Message} onChange={setMessage} />
                                    {/* <textarea type="text" className="form-control shadow-none" style={{ lineHeight: '50px' }}
                                        value={Message} onChange={(e) => setMessage(e.target.value)} id="State" name="State" /> */}

                                </div>


                            </div>
                        </div>
                    </div>
                    {/* form end */}
                    {/* Button start */}
                    <div className="d-flex justify-content-end mt-2">
                        <div className='d-flex gap-2 p-3'>
                            <button disabled={loading} type="submit" className="btn btn-success btn-sm"
                                onClick={sendSelectedDataToApi}>
                                {loading ? "Loading" : " Send Mail "}
                            </button>
                        </div>
                    </div>
                    {/* Button end */}
                </form>
            </div>
            {/* LEAVE APPLY END */}
        </div>
    );
};

export default Mass_mail;
